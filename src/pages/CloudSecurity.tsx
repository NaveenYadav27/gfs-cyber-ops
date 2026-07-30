// src/pages/CloudSecurity.tsx
import { Cloud, Shield, AlertTriangle, Server, Database, Lock, CheckCircle2, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { PageHeader } from '@/components/layout/PageHeader';

const CLOUD_STATS = [
  { label: 'Azure Subscriptions', value: '4', color: 'var(--color-gfs-blue)' },
  { label: 'Virtual Machines', value: '186', color: 'var(--color-gfs-accent)' },
  { label: 'Storage Accounts', value: '47', color: 'var(--color-gfs-green)' },
  { label: 'Databases', value: '32', color: 'var(--color-gfs-amber)' },
  { label: 'Security Alerts (7d)', value: '8', color: 'var(--color-gfs-red)' },
  { label: 'Compliance Score', value: '87%', color: 'var(--color-gfs-green)' },
];

const SUBSCRIPTIONS = [
  { name: 'GFS-PROD-INDIA', resources: 89, cost: '₹42L/month', security: 92, compliance: 95, alerts: 2 },
  { name: 'GFS-DEV-TEST', resources: 47, cost: '₹8L/month', security: 78, compliance: 82, alerts: 4 },
  { name: 'GFS-DR-SITE', resources: 34, cost: '₹18L/month', security: 95, compliance: 91, alerts: 0 },
  { name: 'GFS-SOC-TOOLS', resources: 16, cost: '₹6L/month', security: 88, compliance: 85, alerts: 2 },
];

const CLOUD_ALERTS = [
  { title: 'Storage account publicly accessible', resource: 'gfslogsprod', severity: 'high', status: 'open', service: 'Blob Storage' },
  { title: 'Unusual sign-in from new country', resource: 'svc-neft-ops', severity: 'critical', status: 'investigating', service: 'Azure AD' },
  { title: 'NSG rule allows SSH from 0.0.0.0/0', resource: 'VM-DEV-012', severity: 'high', status: 'remediation', service: 'Network' },
  { title: 'Key Vault access policy too permissive', resource: 'GFS-KeyVault-Prod', severity: 'medium', status: 'open', service: 'Key Vault' },
  { title: 'VM without encryption at rest', resource: 'VM-TEST-003', severity: 'medium', status: 'open', service: 'Compute' },
];

export function CloudSecurity() {
  return (
    <div className="space-y-4">
      <PageHeader
        icon={<Cloud className="w-5 h-5 text-[var(--color-gfs-accent)]" />}
        title="Cloud Security"
        subtitle="Azure India — 286 resources across 4 subscriptions"
      />

      <div className="grid grid-cols-3 lg:grid-cols-6 gap-3">
        {CLOUD_STATS.map((s, i) => (
          <Card key={s.label} delay={i * 0.03} className="!p-3 text-center">
            <div className="text-lg font-display font-bold" style={{ color: s.color }}>{s.value}</div>
            <div className="text-[10px] text-[var(--color-gfs-text-muted)]">{s.label}</div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        {/* Subscriptions */}
        <Card delay={0.1} className="!p-0 overflow-hidden">
          <div className="px-4 py-2.5 border-b border-[var(--color-gfs-border-light)] flex items-center gap-2">
            <Cloud className="w-3.5 h-3.5 text-[var(--color-gfs-blue)]" />
            <span className="text-xs font-semibold text-[var(--color-gfs-text)]">Azure Subscriptions</span>
          </div>
          <div className="divide-y divide-[var(--color-gfs-border-light)]">
            {SUBSCRIPTIONS.map((sub, i) => (
              <motion.div key={sub.name} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.05 }}
                className="px-4 py-3 hover:bg-[var(--color-gfs-hover)]">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono font-semibold text-[var(--color-gfs-text)]">{sub.name}</span>
                  <span className="text-[10px] text-[var(--color-gfs-text-muted)]">{sub.resources} resources • {sub.cost}</span>
                </div>
                <div className="flex items-center gap-4 mt-2">
                  <div>
                    <span className="text-[9px] text-[var(--color-gfs-text-muted)]">Security</span>
                    <div className="h-1.5 w-20 bg-[var(--color-gfs-elevated)] rounded-full mt-0.5">
                      <div className="h-full rounded-full" style={{ width: `${sub.security}%`, background: sub.security > 85 ? 'var(--color-gfs-green)' : 'var(--color-gfs-amber)' }} />
                    </div>
                  </div>
                  <div>
                    <span className="text-[9px] text-[var(--color-gfs-text-muted)]">Compliance</span>
                    <div className="h-1.5 w-20 bg-[var(--color-gfs-elevated)] rounded-full mt-0.5">
                      <div className="h-full rounded-full bg-[var(--color-gfs-blue)]" style={{ width: `${sub.compliance}%` }} />
                    </div>
                  </div>
                  {sub.alerts > 0 && <Badge variant="high">{sub.alerts} alerts</Badge>}
                </div>
              </motion.div>
            ))}
          </div>
        </Card>

        {/* Cloud Alerts */}
        <Card delay={0.15} className="!p-0 overflow-hidden">
          <div className="px-4 py-2.5 border-b border-[var(--color-gfs-border-light)] flex items-center gap-2">
            <AlertTriangle className="w-3.5 h-3.5 text-[var(--color-gfs-amber)]" />
            <span className="text-xs font-semibold text-[var(--color-gfs-text)]">Cloud Security Alerts</span>
          </div>
          <div className="divide-y divide-[var(--color-gfs-border-light)]">
            {CLOUD_ALERTS.map((alert, i) => (
              <motion.div key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.05 }}
                className="px-4 py-3 hover:bg-[var(--color-gfs-hover)]">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <span className="text-[11px] text-[var(--color-gfs-text)]">{alert.title}</span>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-[9px] text-[var(--color-gfs-text-muted)]">{alert.resource} • {alert.service}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge variant={alert.severity === 'critical' ? 'critical' : alert.severity === 'high' ? 'high' : 'medium'}>{alert.severity}</Badge>
                    <div className="text-[9px] text-[var(--color-gfs-text-muted)] mt-0.5">{alert.status}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
