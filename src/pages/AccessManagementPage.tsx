// src/pages/AccessManagementPage.tsx
import { Users, Shield, Key, Clock, AlertTriangle, CheckCircle2, XCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { PageHeader } from '@/components/layout/PageHeader';

const ACCESS_REQUESTS = [
  { id: 'AR-2025-0847', requestor: 'Amit Kumar', dept: 'SOC Tier 1', requested: 'Sentinel Contributor access', approver: 'Suresh Reddy', status: 'pending', urgency: 'normal', date: 'Jan 15' },
  { id: 'AR-2025-0846', requestor: 'Priya Nair', dept: 'SOC Tier 2', requested: 'Falcon EDR Console access', approver: 'Suresh Reddy', status: 'approved', urgency: 'normal', date: 'Jan 14' },
  { id: 'AR-2025-0845', requestor: 'Contractor — DevTeam', dept: 'IT Infrastructure', requested: 'Temporary VPN access (7 days)', approver: 'CISO Office', status: 'denied', urgency: 'high', date: 'Jan 14' },
  { id: 'AR-2025-0844', requestor: 'Sai Krishna', dept: 'SOC Tier 1', requested: 'ServiceNow admin role', approver: 'Raghav Sharma', status: 'approved', urgency: 'low', date: 'Jan 13' },
  { id: 'AR-2025-0843', requestor: 'External Auditor', dept: 'Deloitte', requested: 'Audit read access — PCI scope', approver: 'CISO Office', status: 'in-review', urgency: 'normal', date: 'Jan 12' },
];

const RBAC_ROLES = [
  { name: 'SOC Analyst L1', count: 12, permissions: 'Read-only alerts, Sentinel basic queries', risk: 'low' },
  { name: 'SOC Analyst L2', count: 6, permissions: 'Write alerts, Falcon live response, case management', risk: 'medium' },
  { name: 'SOC Team Lead', count: 3, permissions: 'Full SOC console, rule management, escalation', risk: 'medium' },
  { name: 'Incident Commander', count: 2, permissions: 'Enterprise-wide containment, war room, executive access', risk: 'high' },
  { name: 'Domain Admin', count: 5, permissions: 'Full AD control — highest privilege', risk: 'critical' },
];

const reqStatusBadge: Record<string, 'default' | 'success' | 'critical' | 'medium'> = {
  pending: 'default', approved: 'success', denied: 'critical', 'in-review': 'medium',
};

export function AccessManagementPage() {
  return (
    <div className="space-y-4">
      <PageHeader
        icon={<Users className="w-5 h-5 text-[var(--color-gfs-accent)]" />}
        title="Access Management"
        subtitle="Identity & Access Management — 42,100 users, 847 service accounts"
      />

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        {/* Access Requests */}
        <Card delay={0} className="!p-0 overflow-hidden">
          <div className="px-4 py-2.5 border-b border-[var(--color-gfs-border-light)] flex items-center gap-2">
            <Key className="w-3.5 h-3.5 text-[var(--color-gfs-accent)]" />
            <span className="text-xs font-semibold text-[var(--color-gfs-text)]">Access Requests</span>
            <Badge variant="default">{ACCESS_REQUESTS.filter((r) => r.status === 'pending').length} pending</Badge>
          </div>
          <div className="divide-y divide-[var(--color-gfs-border-light)]">
            {ACCESS_REQUESTS.map((req, i) => (
              <motion.div key={req.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.04 }}
                className="px-4 py-3 hover:bg-[var(--color-gfs-hover)] transition-colors">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono text-[var(--color-gfs-text-muted)]">{req.id}</span>
                      <Badge variant={reqStatusBadge[req.status]}>{req.status}</Badge>
                    </div>
                    <p className="text-[11px] text-[var(--color-gfs-text)] mt-0.5">{req.requested}</p>
                    <p className="text-[10px] text-[var(--color-gfs-text-muted)]">{req.requestor} ({req.dept}) → {req.approver}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </Card>

        {/* RBAC Roles */}
        <Card delay={0.1} className="!p-4">
          <div className="flex items-center gap-2 mb-3">
            <Shield className="w-3.5 h-3.5 text-[var(--color-gfs-blue)]" />
            <span className="text-xs font-semibold text-[var(--color-gfs-text)]">Role-Based Access Control</span>
          </div>
          <div className="space-y-2">
            {RBAC_ROLES.map((role) => (
              <div key={role.name} className="p-2.5 rounded-lg bg-[var(--color-gfs-elevated)] border border-[var(--color-gfs-border-light)]">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-semibold text-[var(--color-gfs-text)]">{role.name}</span>
                  <Badge variant={role.risk === 'critical' ? 'critical' : role.risk === 'high' ? 'high' : role.risk === 'medium' ? 'medium' : 'default'}>
                    {role.count} users • {role.risk}
                  </Badge>
                </div>
                <p className="text-[10px] text-[var(--color-gfs-text-muted)] mt-0.5">{role.permissions}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
