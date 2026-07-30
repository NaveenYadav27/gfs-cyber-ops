import { useState } from 'react';
import { Zap, Play, Clock, CheckCircle2, AlertTriangle, ChevronRight, Settings, History } from 'lucide-react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { PageHeader } from '@/components/layout/PageHeader';
import { SOAR_PLAYBOOKS } from '@/data/soc';

export function SOARCenter() {
  const [selectedPB, setSelectedPB] = useState<string | null>(null);
  const activePB = SOAR_PLAYBOOKS.find((p) => p.id === selectedPB);

  return (
    <div className="space-y-4">
      <PageHeader icon={<Zap className="w-5 h-5 text-[var(--color-gfs-accent)]" />} title="SOAR Playbooks" subtitle={`${SOAR_PLAYBOOKS.length} playbooks — ${SOAR_PLAYBOOKS.filter((p) => p.status === 'active').length} active`} />

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <div className="xl:col-span-2 space-y-2">
          {SOAR_PLAYBOOKS.map((pb, i) => (
            <motion.div key={pb.id} initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}>
              <Card delay={0} hover onClick={() => setSelectedPB(selectedPB === pb.id ? null : pb.id)}
                className={`!p-4 cursor-pointer ${selectedPB === pb.id ? '!border-[var(--color-gfs-accent)]/30' : ''}`}>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <Zap className="w-3.5 h-3.5 text-[var(--color-gfs-accent)]" />
                      <span className="text-[11px] font-semibold text-[var(--color-gfs-text)]">{pb.name}</span>
                      <Badge variant="default">{pb.category}</Badge>
                      {pb.autoRemediate && <Badge variant="accent">Auto</Badge>}
                    </div>
                    <p className="text-[10px] text-[var(--color-gfs-text-muted)] mt-0.5">{pb.description}</p>
                    <div className="flex items-center gap-3 mt-1.5 text-[9px] text-[var(--color-gfs-text-muted)]">
                      <span>Trigger: {pb.trigger.slice(0, 60)}...</span>
                      <span>{pb.steps.length} steps</span>
                      <span>{pb.executionCount}x executed</span>
                      <span>{pb.successRate}% success</span>
                      <span>Avg: {pb.avgDuration}</span>
                    </div>
                  </div>
                  <Badge variant={pb.status === 'active' ? 'success' : 'default'}>{pb.status}</Badge>
                </div>

                {selectedPB === pb.id && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} className="mt-3 pt-3 border-t border-[var(--color-gfs-border-light)]">
                    <span className="gfs-text-label">Workflow</span>
                    <div className="mt-2 space-y-1.5">
                      {pb.steps.map((step) => (
                        <div key={step.order} className="flex items-start gap-3 p-2 rounded bg-[var(--color-gfs-elevated)]">
                          <span className="w-5 h-5 rounded-full bg-[var(--color-gfs-accent-dim)] flex items-center justify-center text-[8px] font-mono font-bold text-[var(--color-gfs-accent)] flex-shrink-0">
                            {step.order}
                          </span>
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <span className="text-[10px] font-semibold text-[var(--color-gfs-text)]">{step.action}</span>
                              <Badge variant={step.type === 'automated' ? 'success' : step.type === 'approval' ? 'medium' : 'default'}>{step.type}</Badge>
                              {step.tool && <Badge variant="accent">{step.tool}</Badge>}
                            </div>
                            <p className="text-[9px] text-[var(--color-gfs-text-muted)] mt-0.5">{step.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="space-y-4">
          <Card delay={0.1} className="!p-4">
            <div className="flex items-center gap-2 mb-3">
              <History className="w-3.5 h-3.5 text-[var(--color-gfs-blue)]" />
              <span className="text-xs font-semibold text-[var(--color-gfs-text)]">Recent Executions</span>
            </div>
            <div className="space-y-2">
              {[
                { name: 'Ransomware Containment', time: '14:22', result: 'success', duration: '4m 12s' },
                { name: 'Impossible Travel', time: '08:46', result: 'success', duration: '7m 45s' },
                { name: 'IOC Bulk Block', time: '15 min ago', result: 'success', duration: '2m' },
                { name: 'DNS Tunneling Response', time: '1 hr ago', result: 'partial', duration: '15m' },
                { name: 'Brute Force Response', time: '41 min ago', result: 'success', duration: '8m' },
              ].map((exec, i) => (
                <div key={i} className="p-2 rounded bg-[var(--color-gfs-elevated)]">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-semibold text-[var(--color-gfs-text)]">{exec.name}</span>
                    <Badge variant={exec.result === 'success' ? 'success' : 'medium'}>{exec.result}</Badge>
                  </div>
                  <div className="text-[9px] text-[var(--color-gfs-text-muted)]">{exec.time} • {exec.duration}</div>
                </div>
              ))}
            </div>
          </Card>

          <Card delay={0.15} className="!p-4">
            <span className="text-[10px] text-[var(--color-gfs-text-muted)] uppercase tracking-wider">Automation Stats</span>
            <div className="mt-2 space-y-2 text-[11px]">
              <div className="flex justify-between"><span className="text-[var(--color-gfs-text-muted)]">Total Executions</span><span className="text-[var(--color-gfs-text)] font-mono">{SOAR_PLAYBOOKS.reduce((s, p) => s + p.executionCount, 0)}</span></div>
              <div className="flex justify-between"><span className="text-[var(--color-gfs-text-muted)]">Success Rate</span><span className="text-[var(--color-gfs-green)] font-mono">97%</span></div>
              <div className="flex justify-between"><span className="text-[var(--color-gfs-text-muted)]">MTTR Reduction</span><span className="text-[var(--color-gfs-accent)] font-mono">68%</span></div>
              <div className="flex justify-between"><span className="text-[var(--color-gfs-text-muted)]">Manual Hours Saved</span><span className="text-[var(--color-gfs-text)] font-mono">342 hrs</span></div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
