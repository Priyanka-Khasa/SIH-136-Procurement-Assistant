import {
  AlertTriangle,
  Building2,
  CircleDashed,
  Hourglass,
  Landmark,
  ShieldCheck,
  Sparkles,
  Workflow,
} from 'lucide-react';
import type { NavItem, Role, StatusType } from '../types';

// ─── Navigation map per role ────────────────────────────────────────────────────

export const roleNavMap: Record<Role, NavItem[]> = {
  Officer: [
    { label: 'Overview', href: '/workspace' },
    { label: 'Evidence', href: '/workspace' },
    { label: 'Timeline', href: '/workspace' },
    { label: 'Recommendation', href: '/workspace' },
  ],
  Startup: [
    { label: 'Overview', href: '/workspace' },
    { label: 'Evidence', href: '/workspace' },
    { label: 'Payments', href: '/workspace' },
    { label: 'Validation', href: '/workspace' },
  ],
  Evaluator: [
    { label: 'Overview', href: '/workspace' },
    { label: 'Evidence', href: '/workspace' },
    { label: 'Standards', href: '/workspace' },
    { label: 'Recommendation', href: '/workspace' },
  ],
  Validator: [
    { label: 'Overview', href: '/workspace' },
    { label: 'Validation', href: '/workspace' },
    { label: 'Evidence', href: '/workspace' },
    { label: 'Payments', href: '/workspace' },
  ],
  Finance: [
    { label: 'Overview', href: '/workspace' },
    { label: 'Payments', href: '/workspace' },
    { label: 'Validation', href: '/workspace' },
    { label: 'Recommendation', href: '/workspace' },
  ],
  'Receiving District': [
    { label: 'Overview', href: '/workspace' },
    { label: 'Evidence', href: '/workspace' },
    { label: 'Timeline', href: '/workspace' },
    { label: 'Recommendation', href: '/workspace' },
  ],
};

export const roleOptions: Role[] = [
  'Officer',
  'Startup',
  'Evaluator',
  'Validator',
  'Finance',
  'Receiving District',
];

// ─── Evidence table rows ────────────────────────────────────────────────────────

export const evidenceTableRows = [
  {
    id: 'EV-1042',
    status: 'Verified' as StatusType,
    source: 'Startup India',
    lastUpdated: '2h ago',
    reason: 'Baseline matched procurement brief',
  },
  {
    id: 'EV-1044',
    status: 'Needs Verification' as StatusType,
    source: 'GeM',
    lastUpdated: '4h ago',
    reason: 'Invoice linked but route not confirmed',
  },
  {
    id: 'EV-1049',
    status: 'AI-Drafted' as StatusType,
    source: 'AI summary',
    lastUpdated: '1d ago',
    reason: 'Human review required before approval',
  },
  {
    id: 'EV-1057',
    status: 'Disputed' as StatusType,
    source: 'Validator',
    lastUpdated: '3d ago',
    reason: 'Evidence mismatch on asset count',
  },
];

// ─── Sparkline chart data ───────────────────────────────────────────────────────

export const sparklineData = [
  { value: 18 },
  { value: 26 },
  { value: 21 },
  { value: 34 },
  { value: 48 },
  { value: 42 },
  { value: 60 },
  { value: 66 },
  { value: 72 },
];

// ─── Procurement lifecycle steps ────────────────────────────────────────────────

export const procurementLifecycleSteps = [
  'Define the problem and baseline',
  'Discover applicant evidence and constraints',
  'Pilot with measurable outputs',
  'Prove outcomes and reconcile payment status',
  'Scale the decision with traceable evidence',
];

// ─── Evidence timeline events ───────────────────────────────────────────────────

export const evidenceTimelineEvents = [
  {
    title: 'Problem statement approved',
    detail: 'Challenge brief and baseline criteria signed.',
    time: '09:30',
  },
  {
    title: 'Eligibility evidence submitted',
    detail: 'Startup files and project commitments checked.',
    time: '10:15',
  },
  {
    title: 'Pilot launched',
    detail: 'Field trial and service logs captured with timestamps.',
    time: '11:00',
  },
  {
    title: 'Independent validation',
    detail: 'District validator confirmed evidence and sample checks.',
    time: '14:30',
  },
  {
    title: 'Payment recommendation',
    detail: 'Outcome and responsibility record reviewed for next stage.',
    time: '18:10',
  },
];

// ─── Status metadata ────────────────────────────────────────────────────────────

export const statusMeta: Record<
  StatusType,
  { label: string; icon: typeof ShieldCheck; tint: string }
> = {
  Verified: { label: 'Verified', icon: ShieldCheck, tint: 'text-teal' },
  Pending: { label: 'Pending', icon: Hourglass, tint: 'text-amber' },
  Disputed: { label: 'Disputed', icon: AlertTriangle, tint: 'text-rose' },
  'Needs Verification': {
    label: 'Needs Verification',
    icon: CircleDashed,
    tint: 'text-amber',
  },
  'AI-Drafted': { label: 'AI-Drafted', icon: Sparkles, tint: 'text-violet' },
  Simulated: { label: 'Simulated', icon: Workflow, tint: 'text-slate-400' },
};

// ─── Role cards for landing page ────────────────────────────────────────────────

export const roleCards = [
  { title: 'Officer', accent: 'bg-saffron/10 text-saffron', icon: ShieldCheck },
  { title: 'Startup', accent: 'bg-teal/10 text-teal', icon: Workflow },
  { title: 'Evaluator', accent: 'bg-violet/10 text-violet', icon: Sparkles },
  { title: 'Validator', accent: 'bg-amber/10 text-amber', icon: AlertTriangle },
  { title: 'Finance', accent: 'bg-rose/10 text-rose', icon: Landmark },
  {
    title: 'Receiving District',
    accent: 'bg-sky-400/10 text-sky-300',
    icon: Building2,
  },
] as const;
