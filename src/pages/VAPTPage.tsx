// src/pages/VAPTPage.tsx
import { Search, Bug, Shield, Clock, AlertTriangle, CheckCircle2, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { PageHeader } from '@/components/layout/PageHeader';
import { ProgressRing } from '@/components/ui/ProgressRing';

const SCAN_SCHEDULES = [
  { target: 'External Perimeter', scanner: 'Qualys', frequency: 'Weekly', lastScan: 'Jan 12, 2025', nextScan: 'Jan 19, 2025', findings: 23, critical: 2 },
  { target: 'Internal Network', scanner: 'Nessus', frequency: 'Weekly', lastScan: 'Jan 10, 2025', nextScan: 'Jan 17, 2025', findings: 47, critical: 0 },
  { target: 'Web Applications', scanner: 'Burp Suite Enterprise', frequency: 'Continuous', lastScan: 'Real-time', nextScan: 'Continuous', findings: 12, critical: 1 },
  { target: 'Cloud Infrastructure', scanner: 'Prisma Cloud', frequency: 'Daily', lastScan: 'Today 04:00', nextScan: 'Tomorrow 04:00', findings: 15, critical: 0 },
  { target: 'Mobile Applications', scanner: 'Checkmarx', frequency: 'Per Release', lastScan: 'Jan 8, 2025', nextScan: 'Next Release', findings: 8, critical: 0 },
];

const REMEDIATION_TRACKER = [
  { vuln: 'SQL Injection — ibanking login', owner: 'Digital Banking', priority: 'Critical', sla: '48h', opened: 'Jan 15', status: 'in-progress', daysLeft: 1 },
  { vuln: 'API Auth Bypass — UPI endpoint', owner: 'Payments Dev', priority: 'Critical', sla: '48h', opened: 'Jan 15', status: 'in-progress', daysLeft: 1 },
  { vuln: 'XSS — Account statement', owner: 'Digital Banking', priority: 'High', sla: '7 days', opened: 'Jan 12', status: 'open', daysLeft: 5 },
  { vuln: 'Missing HSTS headers', owner: 'Platform Team', priority: 'Low', sla: '30 days', opened: 'Jan 5', status: 'open', daysLeft: 24 },
];

export function VAPTPage() {
  return (
    <div className="space-y-4">
      <PageHeader
        icon={<Search className="w-5 h-5 text-[var(--color-gfs-accent)]" />}
        title="Vulnerability Assessment & Penetration Testing"
        subtitle="5 scanner types — continuous assessment across 42,100 assets"
      />

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        {/* Scan Schedules */}
        <div className="xl:col-span-2">
          <Card delay={0} className="!p-0 overflow-hidden">
            <div className="px-4 py-2.5 border-b border-[var(--color-gfs-border-light)] flex items-center gap-2">
              <Search className="w-3.5 h-3.5 text-[var(--color-gfs-accent)]" />
              <span className="text-xs font-semibold text-[var(--color-gfs-text)]">Scan Schedules</span>
            </div>
            <div className="divide-y divide-[var(--color-gfs-border-light)]">
              {SCAN_SCHEDULES.map((scan, i) => (
                <motion.div key={scan.target} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.05 }}
                  className="px-4 py-3 hover:bg-[var(--color-gfs-hover)]">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[11px] font-semibold text-[var(--color-gfs-text)]">{scan.target}</span>
                      <div className="flex items-center gap-3 mt-0.5 text-[9px] text-[var(--color-gfs-text-muted)]">
                        <span>{scan.scanner}</span>
                        <span>{scan.frequency}</span>
                        <span>Last: {scan.lastScan}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-[11px] font-mono text-[var(--color-gfs-text)]">{scan.findings} findings</span>
                      {scan.critical > 0 && <div className="text-[10px] text-[var(--color-gfs-red)]">{scan.critical} critical</div>}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </Card>
        </div>

        {/* Remediation Tracker */}
        <Card delay={0.1} className="!p-4">
          <div className="flex items-center gap-2 mb-3">
            <Clock className="w-3.5 h-3.5 text-[var(--color-gfs-amber)]" />
            <span className="text-xs font-semibold text-[var(--color-gfs-text)]">Remediation Tracker</span>
          </div>
          <div className="space-y-2">
            {REMEDIATION_TRACKER.map((rem, i) => (
              <div key={i} className="p-2.5 rounded-lg bg-[var(--color-gfs-elevated)] border border-[var(--color-gfs-border-light)]">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-semibold text-[var(--color-gfs-text)]">{rem.vuln}</span>
                  <Badge variant={rem.priority === 'Critical' ? 'critical' : rem.priority === 'High' ? 'high' : 'default'}>{rem.priority}</Badge>
                </div>
                <div className="text-[9px] text-[var(--color-gfs-text-muted)] mt-0.5">
                  Owner: {rem.owner} • SLA: {rem.sla} • {rem.daysLeft}d left
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
