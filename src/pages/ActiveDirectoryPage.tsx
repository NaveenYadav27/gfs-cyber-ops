// src/pages/ActiveDirectoryPage.tsx
import { Building2, Users, Shield, Key, Clock, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { PageHeader } from '@/components/layout/PageHeader';

const AD_STATS = [
  { label: 'Total Users', value: '42,100', color: 'var(--color-gfs-accent)' },
  { label: 'Service Accounts', value: '847', color: 'var(--color-gfs-blue)' },
  { label: 'Disabled', value: '1,203', color: 'var(--color-gfs-text-muted)' },
  { label: 'Domain Controllers', value: '6', color: 'var(--color-gfs-green)' },
  { label: 'GPOs', value: '234', color: 'var(--color-gfs-amber)' },
  { label: 'Trust Relationships', value: '4', color: 'var(--color-gfs-purple)' },
];

const CRITICAL_ACCOUNTS = [
  { name: 'svc-neft-ops', type: 'Service', dept: 'NEFT Operations', lastLogon: 'Singapore ⚠', status: 'compromised', risk: 'Critical — Credential theft detected', mfa: 'No' },
  { name: 'svc-swift-alliance', type: 'Service', dept: 'SWIFT Messaging', lastLogon: 'Mumbai DC', status: 'normal', risk: 'None', mfa: 'Certificate' },
  { name: 'svc-upi-gateway', type: 'Service', dept: 'UPI Payments', lastLogon: 'Hyderabad', status: 'normal', risk: 'None', mfa: 'Managed Identity' },
  { name: 'Domain Admin — Suresh R.', type: 'Privileged', dept: 'SOC', lastLogon: 'Hyderabad', status: 'normal', risk: 'None', mfa: 'Yes — Authenticator' },
  { name: 'Domain Admin — CISO Office', type: 'Privileged', dept: 'CISO', lastLogon: 'Mumbai', status: 'normal', risk: 'None', mfa: 'Yes — FIDO2' },
  { name: 'svc-qualys-scanner', type: 'Service', dept: 'Vulnerability Mgmt', lastLogon: 'Hyderabad', status: 'normal', risk: 'None', mfa: 'GMSA' },
];

const GPO_POLICIES = [
  { name: 'GFS-PWD-COMPLEXITY', scope: 'All Users', status: 'applied', description: 'Min 12 chars, complexity, 90-day rotation' },
  { name: 'GFS-MFA-ALL-USERS', scope: 'All Users', status: 'applied', description: 'Azure MFA enforced for all interactive logins' },
  { name: 'GFS-SVC-RESTRICT', scope: 'Service Accounts', status: 'applied', description: 'No interactive logon, no internet access' },
  { name: 'GFS-PAM-ESCALATION', scope: 'Privileged Users', status: 'applied', description: 'Just-in-time elevation with 4-hour expiry' },
  { name: 'GFS-BLOCK-LEGACY', scope: 'All Users', status: 'warning', description: 'Block NTLMv1, LM — 3 accounts still using NTLMv1' },
];

const statusColor: Record<string, { badge: 'critical' | 'high' | 'medium' | 'success'; text: string }> = {
  compromised: { badge: 'critical', text: 'var(--color-gfs-red)' },
  warning: { badge: 'high', text: 'var(--color-gfs-amber)' },
  normal: { badge: 'success', text: 'var(--color-gfs-green)' },
};

export function ActiveDirectoryPage() {
  return (
    <div className="space-y-4">
      <PageHeader
        icon={<Building2 className="w-5 h-5 text-[var(--color-gfs-accent)]" />}
        title="Active Directory"
        subtitle="GFS India Domain — gfs-india.com — 6 Domain Controllers, 42,100 objects"
      />

      <div className="grid grid-cols-3 lg:grid-cols-6 gap-3">
        {AD_STATS.map((s, i) => (
          <Card key={s.label} delay={i * 0.03} className="!p-3 text-center">
            <div className="text-lg font-display font-bold" style={{ color: s.color }}>{s.value}</div>
            <div className="text-[10px] text-[var(--color-gfs-text-muted)]">{s.label}</div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        {/* Critical Accounts */}
        <Card delay={0.1} className="!p-0 overflow-hidden">
          <div className="px-4 py-2.5 border-b border-[var(--color-gfs-border-light)] flex items-center gap-2">
            <Key className="w-3.5 h-3.5 text-[var(--color-gfs-amber)]" />
            <span className="text-xs font-semibold text-[var(--color-gfs-text)]">Privileged & Service Accounts</span>
          </div>
          <div className="divide-y divide-[var(--color-gfs-border-light)]">
            {CRITICAL_ACCOUNTS.map((acc, i) => {
              const sc = statusColor[acc.status];
              return (
                <motion.div key={acc.name} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.04 }}
                  className="px-4 py-3 hover:bg-[var(--color-gfs-hover)] transition-colors">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] font-mono font-semibold text-[var(--color-gfs-text)]">{acc.name}</span>
                        <Badge variant="default">{acc.type}</Badge>
                        <Badge variant={sc.badge}>{acc.status}</Badge>
                      </div>
                      <p className="text-[10px] text-[var(--color-gfs-text-muted)] mt-0.5">{acc.dept} • Last Logon: {acc.lastLogon}</p>
                      {acc.risk !== 'None' && <p className="text-[10px] mt-0.5" style={{ color: sc.text }}>{acc.risk}</p>}
                    </div>
                    <span className="text-[9px] text-[var(--color-gfs-text-muted)]">MFA: {acc.mfa}</span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </Card>

        {/* GPO Policies */}
        <Card delay={0.15} className="!p-4">
          <div className="flex items-center gap-2 mb-3">
            <Shield className="w-3.5 h-3.5 text-[var(--color-gfs-green)]" />
            <span className="text-xs font-semibold text-[var(--color-gfs-text)]">Group Policy Objects</span>
          </div>
          <div className="space-y-2">
            {GPO_POLICIES.map((gpo) => (
              <div key={gpo.name} className="p-2.5 rounded-lg bg-[var(--color-gfs-elevated)] border border-[var(--color-gfs-border-light)]">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-semibold text-[var(--color-gfs-text)]">{gpo.name}</span>
                  <Badge variant={gpo.status === 'applied' ? 'success' : 'high'}>{gpo.status}</Badge>
                </div>
                <p className="text-[10px] text-[var(--color-gfs-text-secondary)] mt-0.5">{gpo.description}</p>
                <span className="text-[9px] text-[var(--color-gfs-text-muted)]">Scope: {gpo.scope}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
