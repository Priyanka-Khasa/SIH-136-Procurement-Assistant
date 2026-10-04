import hashlib
import json
from uuid import UUID
from app.models.audit import AuditEvent
from sqlalchemy import select
from sqlalchemy.orm import Session
from datetime import datetime, timezone

def write_audit_event(db: Session, actor_id: str | None, actor_role: str, action: str, resource_type: str, resource_id: str, detail: str):
    last_event = db.scalar(select(AuditEvent).order_by(AuditEvent.occurred_at.desc(), AuditEvent.id.desc()).limit(1))
    previous_hash = last_event.event_hash if last_event else "genesis"
    occurred_at = datetime.now(timezone.utc).replace(tzinfo=None)
    try:
        normalized_actor = UUID(actor_id) if actor_id else None
    except ValueError:
        normalized_actor = None
    payload = {
        'actor_id': str(normalized_actor) if normalized_actor else None,
        'actor_role': actor_role,
        'action': action,
        'resource_type': resource_type,
        'resource_id': resource_id,
        'detail': detail,
        'previous_hash': previous_hash,
        'occurred_at': occurred_at.isoformat(),
    }
    event_hash = hashlib.sha256(
        json.dumps(payload, sort_keys=True, separators=(',', ':'), ensure_ascii=False).encode('utf-8')
    ).hexdigest()
    event = AuditEvent(
        actor_id=normalized_actor,
        actor_role=actor_role,
        action=action,
        resource_type=resource_type,
        resource_id=resource_id,
        detail=detail,
        previous_hash=previous_hash,
        event_hash=event_hash,
        occurred_at=occurred_at,
    )
    db.add(event)
    db.commit()
    db.refresh(event)
    return event
