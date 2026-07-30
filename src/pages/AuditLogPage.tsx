// src/pages/AuditLogPage.tsx
import { ClipboardList, Search, Filter, Download, Clock, User, Shield, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { PageHeader } from '@/components/layout/PageHeader';

const AUDIT_ENTRIES = [
  { time: '14:22:03', user: 'Falcon SOC Playbook', action: 'Host Isolation', target: 'WRK-LOAN-047', category: 'Containment', severity: 'high' },
  { time: '14:22:01', user: 'System', action: 'Alert Triggered', target: 'ALT-2025-9102', category: 'Detection', severity: 'critical' },
  { time: '08:45:12', user: 'Azure AD Protection', action: 'Account Disabled', target: 'svc-neft-ops@gfs.com', category: 'Identity', severity: 'high' },
  { time: '08:45:01', user: 'System', action: 'Impossible Travel Detected', target: 'svc-neft-ops@gfs.com', category: 'Detection', severity: 'high' },
  { time: '06:00:00', user: 'Qualys Scanner', action: 'Vulnerability Scan Complete', target: 'Domain Controllers', category: 'Vulnerability', severity: 'info' },
  { time: '03:00:00', user: 'Qualys Scanner', action: 'Vulnerability Scan Complete', target: 'Internet-Facing', category: 'Vulnerability', severity: 'info' },
  { time: 'Yesterday 22:15', user: 'Deepa Krishnan', action: 'Shift Handover', target: 'Night → Morning', category: 'Operations', severity: 'info' },
  { time: 'Yesterday 16:30', user: 'Suresh Reddy', action: 'Alert Escalated', target: 'ALT-2025-9088', category: 'Escalation', severity: 'medium' },
  { time: 'Yesterday 10:15', user: 's.reddy', action: 'Phishing Report Submitted', target: 'SR-2025-34201', category: 'User Report', severity: 'low' },
];

const catColors: Record<string, string> = {
  Detection: 'var(--color-gfs-red)', Containment: 'var(--color-gfs-amber)', Identity: 'var(--color-gfs-purple)',
  Vulnerability: 'var(--color-gfs-blue)', Operations: 'var(--color-gfs-green)', Escalation: 'var(--color-gfs-amber)',
  'User Report': 'var(--color-gfs-accent)',
};

export function AuditLogPage() {
  const [search, setSearch] = useState('');

  return (
    <div className="space-y-4">
      <PageHeader
        icon={<ClipboardList className="w-5 h-5 text-[var(--color-gfs-accent)]" />}
        title="Audit Log"
        subtitle="Complete audit trail — SOC operations, system changes, user actions"
        badge={<button className="flex items-center gap-1 px-2 py-0.5 rounded bg-[var(--color-gfs-accent-dim)] text-[10px] text-[var(--color-gfs-accent)]"><Download className="w-2.5 h-2.5" /> Export</button>}
      />

      <div className="flex items-center gap-3">
        <div className="relative flex-1">
          <Search className="w-3.5 h-3.5 text-[var(--color-gfs-text-muted)] absolute left-3 top-1/2 -translate-y-1/2" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search audit logs..."
            className="w-full pl-9 pr-4 py-2 rounded-lg bg-[var(--color-gfs-surface)] border border-[var(--color-gfs-border-light)] text-xs text-[var(--color-gfs-text)] placeholder:text-[var(--color-gfs-text-muted)] focus:outline-none focus:border-[var(--color-gfs-accent)]" />
        </div>
      </div>

      <Card delay={0} className="!p-0 overflow-hidden">
        <div className="divide-y divide-[var(--color-gfs-border-light)]">
          {AUDIT_ENTRIES.filter((e) => !search || e.action.toLowerCase().includes(search.toLowerCase()) || e.user.toLowerCase().includes(search.toLowerCase()) || e.target.toLowerCase().includes(search.toLowerCase()))
            .map((entry, i) => (
            <motion.div key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }}
              className="px-4 py-3 hover:bg-[var(--color-gfs-hover)] transition-colors">
              <div className="flex items-center gap-4">
                <span className="text-[10px] font-mono text-[var(--color-gfs-text-muted)] w-32 flex-shrink-0">{entry.time}</span>
                <div className="w-1 h-6 rounded-full flex-shrink-0" style={{ background: catColors[entry.category] || 'var(--color-gfs-text-muted)' }} />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-semibold text-[var(--color-gfs-text)]">{entry.action}</span>
                    <Badge variant="default">{entry.category}</Badge>
                  </div>
                  <p className="text-[10px] text-[var(--color-gfs-text-muted)]">{entry.target} • by {entry.user}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Card>
    </div>
  );
}
