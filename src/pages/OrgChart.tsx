import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronRight, X, MapPin, Briefcase, Wrench, ArrowRight, Users } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { PageHeader } from '@/components/layout/PageHeader';
import { ORG_CHART } from '@/data/enterprise-organization';

function OrgNodeCard({ node, onClick, isHighlighted }: { node: typeof ORG_CHART[0]; onClick: () => void; isHighlighted: boolean }) {
  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
      onClick={onClick}
      className={`p-3 rounded-xl border cursor-pointer transition-all group ${
        isHighlighted
          ? 'bg-[var(--color-gfs-accent-dim)] border-[var(--color-gfs-accent)]/30 gfs-glow'
          : 'bg-[var(--color-gfs-surface)] border-[var(--color-gfs-border-light)] hover:bg-[var(--color-gfs-elevated)] hover:border-[var(--color-gfs-border)]'
      }`}>
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-110"
          style={{ background: node.avatarColor }}>
          <span className="text-xs font-bold text-white">{node.avatarInitials}</span>
        </div>
        <div className="min-w-0">
          <div className="text-sm font-semibold text-[var(--color-gfs-text)] truncate">{node.name}</div>
          <div className="text-[10px] text-[var(--color-gfs-accent)] truncate">{node.title}</div>
          <div className="text-[10px] text-[var(--color-gfs-text-muted)] flex items-center gap-1">
            <MapPin className="w-2.5 h-2.5" /> {node.location}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function OrgDetailPanel({ node, onClose }: { node: typeof ORG_CHART[0]; onClose: () => void }) {
  const directReports = ORG_CHART.filter((n) => node.directReports.includes(n.id));

  return (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}
      className="fixed right-0 top-0 h-screen w-[440px] bg-[var(--color-gfs-deep)] border-l border-[var(--color-gfs-border-light)] z-50 overflow-y-auto shadow-2xl">
      <div className="p-6 space-y-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: node.avatarColor }}>
              <span className="text-sm font-bold text-white">{node.avatarInitials}</span>
            </div>
            <div>
              <h2 className="text-sm font-semibold text-[var(--color-gfs-text)]">{node.name}</h2>
              <p className="text-[10px] text-[var(--color-gfs-accent)]">{node.title}</p>
              <p className="text-[10px] text-[var(--color-gfs-text-muted)]">{node.department}</p>
            </div>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-[var(--color-gfs-elevated)] text-[var(--color-gfs-text-muted)]">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-3 rounded-lg bg-[var(--color-gfs-surface)] border border-[var(--color-gfs-border-light)]">
          <p className="text-xs text-[var(--color-gfs-text-secondary)] leading-relaxed">{node.description}</p>
        </div>

        <div>
          <h4 className="text-[10px] text-[var(--color-gfs-text-muted)] uppercase tracking-wider mb-2">Responsibilities</h4>
          <div className="space-y-1.5">
            {node.responsibilities.map((r) => (
              <div key={r} className="flex items-center gap-2 text-[11px] text-[var(--color-gfs-text-secondary)]">
                <div className="w-1 h-1 rounded-full bg-[var(--color-gfs-accent)] flex-shrink-0" />
                {r}
              </div>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-[10px] text-[var(--color-gfs-text-muted)] uppercase tracking-wider mb-2">Tools</h4>
          <div className="flex flex-wrap gap-1.5">
            {node.tools.map((t) => <Badge key={t} variant="default">{t}</Badge>)}
          </div>
        </div>

        <div>
          <h4 className="text-[10px] text-[var(--color-gfs-text-muted)] uppercase tracking-wider mb-2">Location</h4>
          <p className="text-xs text-[var(--color-gfs-text)] flex items-center gap-1"><MapPin className="w-3 h-3" /> {node.location}</p>
        </div>

        {directReports.length > 0 && (
          <div>
            <h4 className="text-[10px] text-[var(--color-gfs-text-muted)] uppercase tracking-wider mb-2">
              Direct Reports ({directReports.length})
            </h4>
            <div className="space-y-2">
              {directReports.map((report) => (
                <div key={report.id} className="flex items-center gap-2 p-2 rounded-lg bg-[var(--color-gfs-elevated)]">
                  <div className="w-7 h-7 rounded flex items-center justify-center flex-shrink-0" style={{ background: report.avatarColor }}>
                    <span className="text-[8px] font-bold text-white">{report.avatarInitials}</span>
                  </div>
                  <div>
                    <div className="text-[11px] text-[var(--color-gfs-text)]">{report.name}</div>
                    <div className="text-[9px] text-[var(--color-gfs-text-muted)]">{report.title}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}

export function OrgChart() {
  const [selectedNode, setSelectedNode] = useState<typeof ORG_CHART[0] | null>(null);
  const ceo = ORG_CHART.find((n) => n.id === 'org-ceo')!;
  const ciso = ORG_CHART.find((n) => n.id === 'org-ciso')!;
  const socDir = ORG_CHART.find((n) => n.id === 'org-soc-director')!;
  const socMgr = ORG_CHART.find((n) => n.id === 'org-soc-mgr')!;
  const teamLead = ORG_CHART.find((n) => n.id === 'org-team-lead')!;

  const reportingLine = [
    ORG_CHART.find((n) => n.id === 'org-board')!,
    ceo, ORG_CHART.find((n) => n.id === 'org-cto')!, ciso, socDir, socMgr, teamLead,
  ];

  return (
    <div className="space-y-4">
      <PageHeader
        icon={<Users className="w-5 h-5 text-[var(--color-gfs-accent)]" />}
        title="Organizational Structure"
        subtitle="Global Financial Services — India Operations"
      />

      {/* Your reporting line */}
      <Card delay={0} glow="accent">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xs font-semibold text-[var(--color-gfs-accent)]">Your Reporting Line</span>
        </div>
        <div className="flex items-center gap-1 flex-wrap">
          {reportingLine.map((node, i) => (
            <div key={node.id} className="flex items-center gap-1">
              <button onClick={() => setSelectedNode(node)}
                className="flex items-center gap-2 px-2 py-1 rounded-lg hover:bg-[var(--color-gfs-elevated)] transition-colors">
                <div className="w-6 h-6 rounded flex items-center justify-center flex-shrink-0" style={{ background: node.avatarColor }}>
                  <span className="text-[7px] font-bold text-white">{node.avatarInitials}</span>
                </div>
                <div className="text-left hidden sm:block">
                  <div className="text-[10px] text-[var(--color-gfs-text)] font-medium leading-none">{node.name}</div>
                  <div className="text-[8px] text-[var(--color-gfs-text-muted)] leading-none mt-0.5">{node.title}</div>
                </div>
              </button>
              {i < reportingLine.length - 1 && <ChevronRight className="w-3 h-3 text-[var(--color-gfs-text-muted)] flex-shrink-0" />}
            </div>
          ))}
        </div>
      </Card>

      {/* Full org chart hierarchy */}
      <div className="space-y-3">
        {/* CEO Level */}
        <div className="flex justify-center">
          <div className="w-80"><OrgNodeCard node={ceo} onClick={() => setSelectedNode(ceo)} isHighlighted={selectedNode?.id === ceo.id} /></div>
        </div>
        <div className="flex justify-center"><div className="w-px h-4 bg-[var(--color-gfs-border)]" /></div>

        {/* C-Level */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 max-w-5xl mx-auto">
          {[ORG_CHART.find(n => n.id === 'org-coo')!, ORG_CHART.find(n => n.id === 'org-cfo')!, ORG_CHART.find(n => n.id === 'org-cto')!, ciso].filter(Boolean).map((node) => (
            <OrgNodeCard key={node.id} node={node} onClick={() => setSelectedNode(node)} isHighlighted={selectedNode?.id === node.id} />
          ))}
        </div>

        {/* Under CISO */}
        <div className="flex justify-center"><div className="w-px h-4 bg-[var(--color-gfs-border)]" /></div>
        <div className="text-center">
          <Badge variant="accent">Under CISO — Cybersecurity Division</Badge>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 max-w-5xl mx-auto">
          {[socDir, ORG_CHART.find(n => n.id === 'org-risk-mgr')!, ORG_CHART.find(n => n.id === 'org-compliance-ho')!, ORG_CHART.find(n => n.id === 'org-vp-offensive')!].filter(Boolean).map((node) => (
            <OrgNodeCard key={node.id} node={node} onClick={() => setSelectedNode(node)} isHighlighted={selectedNode?.id === node.id} />
          ))}
        </div>

        {/* Under SOC Director */}
        <div className="flex justify-center"><div className="w-px h-4 bg-[var(--color-gfs-border)]" /></div>
        <div className="text-center">
          <Badge variant="accent">Under SOC Director — Hyderabad</Badge>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 max-w-5xl mx-auto">
          {[socMgr, ORG_CHART.find(n => n.id === 'org-ir-lead')!, ORG_CHART.find(n => n.id === 'org-ti-lead')!, ORG_CHART.find(n => n.id === 'org-eng-lead')!].filter(Boolean).map((node) => (
            <OrgNodeCard key={node.id} node={node} onClick={() => setSelectedNode(node)} isHighlighted={selectedNode?.id === node.id} />
          ))}
        </div>

        {/* Under SOC Manager */}
        <div className="flex justify-center"><div className="w-px h-4 bg-[var(--color-gfs-border)]" /></div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-3xl mx-auto">
          <OrgNodeCard node={teamLead} onClick={() => setSelectedNode(teamLead)} isHighlighted={selectedNode?.id === teamLead.id} />
          <Card delay={0.2} className="!p-3 opacity-70">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[var(--color-gfs-elevated)] flex items-center justify-center">
                <span className="text-xs text-[var(--color-gfs-text-muted)]">👥</span>
              </div>
              <div>
                <div className="text-sm font-semibold text-[var(--color-gfs-text)]">SOC Analysts (Tier 1)</div>
                <div className="text-[10px] text-[var(--color-gfs-text-muted)]">Raghav, Ananya, Meera + You</div>
              </div>
            </div>
          </Card>
        </div>
      </div>

      <AnimatePresence>
        {selectedNode && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40" onClick={() => setSelectedNode(null)} />
            <OrgDetailPanel node={selectedNode} onClose={() => setSelectedNode(null)} />
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
