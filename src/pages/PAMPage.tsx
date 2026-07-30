// src/pages/PAMPage.tsx
import { Lock, Shield, Clock, AlertTriangle, Eye, Key, CheckCircle2, XCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { PageHeader } from '@/components/layout/PageHeader';

const PRIVILEGED_ACCOUNTS = [
  { name: 'svc-neft-ops', type: 'Service', vault: 'CyberArk', lastCheckout: 'Compromised ⚠', status: 'locked', sessions: 0 },
  { name: 'svc-swift-alliance', type: 'Service', vault: 'CyberArk', lastCheckout: '2 days ago', status: 'active', sessions: 0 },
  { name: 'svc-upi-gateway', type: 'Service', vault: 'CyberArk', lastCheckout: 'Auto-rotated', status: 'active', sessions: 0 },
  { name: 'admin-domain-01', type: 'Break-glass', vault: 'CyberArk', lastCheckout: '30 days ago', status: 'sealed', sessions: 0 },
  { name: 'root@SRV-DB-01', type: 'System', vault: 'CyberArk', lastCheckout: '5 days ago', status: 'active', sessions: 1 },
  { name: 'sa@SQL-PROD-01', type: 'System', vault: 'CyberArk', lastCheckout: '12 hours ago', status: 'active', sessions: 0 },
];

const ACTIVE_SESSIONS = [
  { user: 'Arjun Sharma', account: 'Domain Admin', target: 'WRK-LOAN-047', startTime: '14:25', duration: '12 min', justification: 'Ransomware IR — live response', recording: true },
  { user: 'Harsha Vardhan', account: 'svc-qualys-scanner', target: '10.20.0.0/16', startTime: '06:00', duration: '8h 37m', justification: 'Scheduled weekly scan', recording: true },
];

const PASSWORD_ROTATION = [
  { account: 'svc-upi-gateway', lastRotation: '2h ago', nextRotation: '22h', status: 'compliant' },
  { account: 'svc-swift-alliance', lastRotation: '2 days ago', nextRotation: '5 days', status: 'compliant' },
  { account: 'svc-neft-ops', lastRotation: '⚠ COMPROMISED', nextRotation: 'FORCE ROTATE', status: 'critical' },
  { account: 'admin-domain-01', lastRotation: '30 days ago', nextRotation: '60 days', status: 'compliant' },
];

export function PAMPage() {
  return (
    <div className="space-y-4">
      <PageHeader
        icon={<Lock className="w-5 h-5 text-[var(--color-gfs-accent)]" />}
        title="Privileged Access Management"
        subtitle="CyberArk Privileged Access Security — 847 accounts vaulted"
      />

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        {/* Vaulted Accounts */}
        <Card delay={0} className="!p-0 overflow-hidden">
          <div className="px-4 py-2.5 border-b border-[var(--color-gfs-border-light)] flex items-center gap-2">
            <Key className="w-3.5 h-3.5 text-[var(--color-gfs-amber)]" />
            <span className="text-xs font-semibold text-[var(--color-gfs-text)]">Privileged Accounts</span>
          </div>
          <div className="divide-y divide-[var(--color-gfs-border-light)]">
            {PRIVILEGED_ACCOUNTS.map((acc, i) => (
              <motion.div key={acc.name} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.04 }}
                className="px-4 py-3 hover:bg-[var(--color-gfs-hover)]">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[11px] font-mono font-semibold text-[var(--color-gfs-text)]">{acc.name}</span>
                    <div className="text-[10px] text-[var(--color-gfs-text-muted)]">{acc.type} • {acc.vault} • Checkout: {acc.lastCheckout}</div>
                  </div>
                  <Badge variant={acc.status === 'locked' ? 'critical' : acc.status === 'sealed' ? 'medium' : 'success'}>{acc.status}</Badge>
                </div>
              </motion.div>
            ))}
          </div>
        </Card>

        <div className="space-y-4">
          {/* Active Sessions */}
          <Card delay={0.1} className="!p-4">
            <div className="flex items-center gap-2 mb-3">
              <Eye className="w-3.5 h-3.5 text-[var(--color-gfs-green)]" />
              <span className="text-xs font-semibold text-[var(--color-gfs-text)]">Active Privileged Sessions</span>
              <Badge variant="success">{ACTIVE_SESSIONS.length} recording</Badge>
            </div>
            {ACTIVE_SESSIONS.map((sess, i) => (
              <div key={i} className="p-3 rounded-lg bg-[var(--color-gfs-elevated)] mb-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-semibold text-[var(--color-gfs-text)]">{sess.user}</span>
                  <Badge variant="success">● Recording</Badge>
                </div>
                <div className="text-[10px] text-[var(--color-gfs-text-muted)] mt-0.5">
                  {sess.account} → {sess.target} • Started {sess.startTime} ({sess.duration})
                </div>
                <div className="text-[10px] text-[var(--color-gfs-text-secondary)] mt-0.5">Justification: {sess.justification}</div>
              </div>
            ))}
          </Card>

          {/* Password Rotation */}
          <Card delay={0.15} className="!p-4">
            <span className="text-[10px] text-[var(--color-gfs-text-muted)] uppercase tracking-wider">Password Rotation Status</span>
            <div className="space-y-2 mt-2">
              {PASSWORD_ROTATION.map((p) => (
                <div key={p.account} className="flex items-center justify-between p-2 rounded bg-[var(--color-gfs-elevated)]">
                  <span className="text-[10px] font-mono text-[var(--color-gfs-text)]">{p.account}</span>
                  <Badge variant={p.status === 'critical' ? 'critical' : 'success'}>{p.nextRotation}</Badge>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
