import io

import pandas as pd

from app.services.evidence_engine import (
    compute_sha256,
    generate_demo_datasets,
    get_claimed_values_for_demo,
    recalculate_kpis,
    run_quality_checks,
)


def _analyse(name):
    csv_text = generate_demo_datasets()[name]
    frame = pd.read_csv(io.StringIO(csv_text))
    return frame, recalculate_kpis(frame, get_claimed_values_for_demo(name)), run_quality_checks(frame)


def test_demo_datasets_are_reproducible_and_cover_expected_outcomes():
    first = generate_demo_datasets()
    assert first == generate_demo_datasets()
    assert compute_sha256(io.BytesIO(first['hero_problematic'].encode())) == compute_sha256(io.BytesIO(first['hero_problematic'].encode()))
    _, clean_kpis, clean_findings = _analyse('clean_pass')
    _, hero_kpis, hero_findings = _analyse('hero_problematic')
    _, corrected_kpis, corrected_findings = _analyse('corrected_resubmission')
    assert all(k['outcome'] == 'passed' for k in clean_kpis)
    assert not clean_findings
    hero = {k['kpi_key']: k for k in hero_kpis}
    assert hero['reduction_pct']['claimed_value'] == 40.0
    assert hero['reduction_pct']['recomputed_value'] < 30
    assert hero['marathi_accuracy_pct']['outcome'] == 'missing_evidence'
    assert {'excluded_failed_cases', 'sample_size_adequacy', 'duplicate_rows', 'missing_periods'} <= {f['check_name'] for f in hero_findings}
    assert all(k['outcome'] == 'passed' for k in corrected_kpis)
    assert not any(f['severity'] == 'critical' for f in corrected_findings)


def test_processing_time_reduction_keeps_failed_attempts_in_denominator():
    frame = pd.DataFrame({
        'processing_time_before': [10.0] * 10,
        'processing_time_after': [5.0] * 6 + [15.0] * 4,
        'outcome': ['success'] * 6 + ['failed'] * 4,
        'error_flag': [0] * 10,
        'language': ['Marathi'] * 10,
        'low_bandwidth': [True] * 10,
    })
    reduction = recalculate_kpis(frame, {})[0]
    assert reduction['recomputed_value'] == 50.0
    assert reduction['rows_used'] == 10


def test_missing_and_failed_are_distinct_outcomes():
    frame = pd.DataFrame({
        'processing_time_before': [10.0] * 10,
        'processing_time_after': [10.0] * 10,
        'outcome': ['success'] * 10,
        'error_flag': [0] * 10,
        'language': ['Hindi'] * 10,
        'low_bandwidth': [False] * 10,
    })
    outcomes = {k['kpi_key']: k['outcome'] for k in recalculate_kpis(frame, {})}
    assert outcomes['reduction_pct'] == 'failed'
    assert outcomes['marathi_accuracy_pct'] == 'missing_evidence'
    assert outcomes['low_bandwidth_pct'] == 'missing_evidence'
