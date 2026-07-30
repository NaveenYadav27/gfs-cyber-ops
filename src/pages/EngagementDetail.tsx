import { Shield, Target, Users, Clock, FileText, AlertTriangle, CheckCircle2, Eye, ExternalLink } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { PageHeader } from '@/components/layout/PageHeader';
import { ProgressRing } from '@/components/ui/ProgressRing';
import type { Engagement } from '@/types/offensive';

interface EngagementDetailProps {
  engagement: Engagement;
  onBack: () => void;
}

const severityColors: Record<string, 'critical' | 'high' | 'medium' | 'default'> = {
  critical: 'critical', high: 'high', medium: 'medium', low: 'default', informational: 'default',
};

export function EngagementDetail({ engagement, onBack }: EngagementDetailProps) {
  const completedFindings = engagement.findings.filter((f) => f.status === 'remediation' || f.status === 'verified-fixed');
  const critCount = engagement.findings.filter((f) => f.severity === 'critical').length;
  const highCount = engagement.findings.filter((f) => f.severity === 'high').length;

  return (
    <div className="space-y-4">
      <button onClick={onBack} className="text-[11px] text-[var(--color-gfs-accent)] hover:underline">← Engagements</button>
      <PageHeader
        icon={<Target className="w-5 h-5 text-[var(--color-gfs-accent)]" />}
        title={engagement.name}
        subtitle={engagement.code}
        badge={<Badge variant={engagement.status === 'active' ? 'accent' : 'success'}>{engagement.status}</Badge>}
      />

      {/* Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
        <Card delay={0} className="!p-3 text-center">
          <div className="text-lg font-display font-bold text-[var(--color-gfs-red)]">{critCount}</div>
          <div className="text-[9px] text-[var(--color-gfs-text-muted)]">Critical</div>
        </Card>
        <Card delay={0.03} className="!p-3 text-center">
          <div className="text-lg font-display font-bold text-[var(--color-gfs-amber)]">{highCount}</div>
          <div className="text-[9px] text-[var(--color-gfs-text-muted)]">High</div>
        </Card>
        <Card delay={0.06} className="!p-3 text-center">
          <div className="text-lg font-display font-bold text-[var(--color-gfs-text)]">{engagement.findings.length}</div>
          <div className="text-[9px] text-[var(--color-gfs-text-muted)]">Total Findings</div>
        </Card>
        <Card delay={0.09} className="!p-3 text-center">
          <ProgressRing progress={(completedFindings.length / Math.max(engagement.findings.length, 1)) * 100} size={40} strokeWidth={3} />
          <div className="text-[9px] text-[var(--color-gfs-text-muted)] mt-1">Remediated</div>
        </Card>
        <Card delay={0.12} className="!p-3 text-center">
          <div className="text-lg font-display font-bold text-[var(--color-gfs-text)]">{engagement.team.length}</div>
          <div className="text-[9px] text-[var(--color-gfs-text-muted)]">Team Members</div>
        </Card>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <div className="xl:col-span-2 space-y-4">
          {/* Executive Summary */}
          <Card delay={0.1} className="!p-4">
            <h3 className="gfs-text-label mb-2">Executive Summary</h3>
            <p className="text-[11px] text-[var(--color-gfs-text-secondary)] leading-relaxed">{engagement.executiveSummary}</p>
          </Card>

          {/* Findings */}
          <Card delay={0.15} className="!p-0 overflow-hidden">
            <div className="px-4 py-2.5 border-b border-[var(--color-gfs-border-light)]">
              <span className="text-xs font-semibold text-[var(--color-gfs-text)]">Findings ({engagement.findings.length})</span>
            </div>
            <div className="divide-y divide-[var(--color-gfs-border-light)]">
              {engagement.findings.map((finding) => (
                <div key={finding.id} className="px-4 py-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] font-semibold text-[var(--color-gfs-text)]">{finding.title}</span>
                        <Badge variant={severityColors[finding.severity]}>{finding.severity} — CVSS {finding.cvss}</Badge>
                      </div>
                      <p className="text-[10px] text-[var(--color-gfs-text-muted)] mt-0.5">{finding.description}</p>
                      <div className="mt-2 p-2 rounded bg-[var(--color-gfs-elevated)]">
                        <span className="text-[9px] text-[var(--color-gfs-text-muted)] uppercase">Proof of Concept</span>
                        <pre className="text-[10px] text-[var(--color-gfs-text-secondary)] font-mono mt-1">{finding.proof}</pre>
                      </div>
                      <div className="mt-2 p-2 rounded bg-[var(--color-gfs-green-dim)]">
                        <span className="text-[9px] text-[var(--color-gfs-green)] uppercase font-semibold">Remediation</span>
                        <p className="text-[10px] text-[var(--color-gfs-text-secondary)] mt-0.5">{finding.remediation}</p>
                      </div>
                      <div className="flex items-center gap-1.5 mt-2 flex-wrap">
                        {finding.mitreMapping.map((m) => <Badge key={m} variant="default">{m}</Badge>)}
                        {finding.owaspMapping.map((o) => <Badge key={o} variant="accent">{o}</Badge>)}
                        {finding.pciDssMapping.map((p) => <Badge key={p} variant="medium">PCI DSS {p}</Badge>)}
                      </div>
                    </div>
                    <Badge variant={finding.status === 'open' ? 'critical' : finding.status === 'remediation' ? 'medium' : 'success'}>{finding.status}</Badge>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="space-y-4">
          <Card delay={0.15} className="!p-4">
            <h3 className="gfs-text-label mb-2">Engagement Details</h3>
            <div className="space-y-2 text-[11px]">
              <div className="flex justify-between"><span className="text-[var(--color-gfs-text-muted)]">Type</span><span className="text-[var(--color-gfs-text)]">{engagement.type}</span></div>
              <div className="flex justify-between"><span className="text-[var(--color-gfs-text-muted)]">Period</span><span className="text-[var(--color-gfs-text)]">{engagement.startDate} → {engagement.endDate}</span></div>
              <div className="flex justify-between"><span className="text-[var(--color-gfs-text-muted)]">Severity</span><Badge variant={severityColors[engagement.severity]}>{engagement.severity}</Badge></div>
            </div>
          </Card>
          <Card delay={0.2} className="!p-4">
            <h3 className="gfs-text-label mb-2">Scope</h3>
            <div className="flex flex-wrap gap-1">
              {engagement.scope.map((s) => <Badge key={s} variant="accent">{s}</Badge>)}
            </div>
          </Card>
          <Card delay={0.25} className="!p-4">
            <h3 className="gfs-text-label mb-2">Team</h3>
            <div className="flex flex-wrap gap-1">
              {engagement.team.map((t) => <Badge key={t} variant="default">{t}</Badge>)}
            </div>
          </Card>
          <Card delay={0.3} className="!p-4">
            <h3 className="gfs-text-label mb-2">Rules of Engagement</h3>
            <div className="space-y-1">
              {engagement.rulesOfEngagement.map((r) => (
                <div key={r} className="text-[10px] text-[var(--color-gfs-text-secondary)] flex items-start gap-1.5">
                  <div className="w-1 h-1 rounded-full bg-[var(--color-gfs-accent)] mt-1.5 flex-shrink-0" /> {r}
                </div>
              ))}
            </div>
          </Card>
          <Card delay={0.35} className="!p-4">
            <h3 className="gfs-text-label mb-2">Methodology</h3>
            <div className="flex flex-wrap gap-1">
              {engagement.methodology.map((m) => <Badge key={m} variant="default">{m}</Badge>)}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
