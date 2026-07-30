import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronDown, Shield, AlertTriangle, Server, Play } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { PageHeader } from '@/components/layout/PageHeader';
import { BUSINESS_PROCESSES } from '@/data/enterprise-organization';
import type { BusinessProcess } from '@/data/enterprise-organization';

export function BusinessProcessViewer() {
  const [selected, setSelected] = useState<BusinessProcess>(BUSINESS_PROCESSES[0]);
  const [expandedStep, setExpandedStep] = useState<string | null>(null);

  return (
    <div className="space-y-4">
      <PageHeader
        icon={<Play className="w-5 h-5 text-[var(--color-gfs-accent)]" />}
        title="Business Processes"
        subtitle="How money and data move through GFS — every step is clickable"
      />

      {/* Process selector */}
      <div className="flex items-center gap-2">
        {BUSINESS_PROCESSES.map((proc) => (
          <button key={proc.id} onClick={() => { setSelected(proc); setExpandedStep(null); }}
            className={`px-4 py-2 rounded-lg text-xs transition-colors ${
              selected.id === proc.id ? 'bg-[var(--color-gfs-accent-dim)] text-[var(--color-gfs-accent)] border border-[var(--color-gfs-accent)]/30' : 'text-[var(--color-gfs-text-muted)] hover:text-[var(--color-gfs-text)] border border-transparent'
            }`}>
            {proc.name}
          </button>
        ))}
      </div>

      {/* Process info */}
      <Card delay={0} glow="accent">
        <h3 className="text-sm font-display font-bold text-[var(--color-gfs-text)] mb-2">{selected.name}</h3>
        <p className="text-xs text-[var(--color-gfs-text-secondary)] mb-3">{selected.description}</p>
        <div className="flex items-center gap-2">
          <span className="text-[10px] text-[var(--color-gfs-text-muted)]">Trigger:</span>
          <span className="text-[10px] text-[var(--color-gfs-accent)]">{selected.trigger}</span>
        </div>
        <div className="flex flex-wrap gap-1.5 mt-2">
          {selected.regulations.map((r) => <Badge key={r} variant="default">{r}</Badge>)}
        </div>
      </Card>

      {/* Flow visualization */}
      <div className="space-y-2">
        {selected.steps.map((step, i) => {
          const isExpanded = expandedStep === step.id;
          return (
            <motion.div key={step.id}
              initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.03 }}>
              <div className="flex items-center gap-2">
                {/* Step number */}
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[var(--color-gfs-accent-dim)] flex items-center justify-center">
                  <span className="text-[10px] font-mono font-bold text-[var(--color-gfs-accent)]">{i + 1}</span>
                </div>
                {/* Connector line */}
                {i < selected.steps.length - 1 && (
                  <div className="absolute ml-[14px] mt-8 w-px h-4 bg-[var(--color-gfs-border)]" />
                )}
              </div>

              <Card delay={0.05 + i * 0.02} hover onClick={() => setExpandedStep(isExpanded ? null : step.id)}
                className={`!p-3 ml-10 ${isExpanded ? '!border-[var(--color-gfs-accent)]/30' : ''}`}>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-xs font-semibold text-[var(--color-gfs-text)]">{step.name}</h4>
                      <Badge variant="default">{step.system}</Badge>
                    </div>
                    <p className="text-[10px] text-[var(--color-gfs-text-muted)] mt-0.5">{step.department}</p>
                  </div>
                  <ChevronDown className={`w-3 h-3 text-[var(--color-gfs-text-muted)] transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                </div>

                {isExpanded && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
                    className="mt-3 pt-3 border-t border-[var(--color-gfs-border-light)] space-y-3">
                    <p className="text-[11px] text-[var(--color-gfs-text-secondary)] leading-relaxed">{step.description}</p>

                    <div>
                      <h5 className="text-[9px] text-[var(--color-gfs-accent)] uppercase tracking-wider mb-1 font-semibold">Security Controls</h5>
                      <div className="space-y-1">
                        {step.securityNotes.map((note) => (
                          <div key={note} className="flex items-center gap-2 text-[10px] text-[var(--color-gfs-text-secondary)]">
                            <Shield className="w-2.5 h-2.5 text-[var(--color-gfs-green)] flex-shrink-0" /> {note}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h5 className="text-[9px] text-[var(--color-gfs-red)] uppercase tracking-wider mb-1 font-semibold">Threats at This Step</h5>
                      <div className="space-y-1">
                        {step.threats.map((threat) => (
                          <div key={threat} className="flex items-center gap-2 text-[10px] text-[var(--color-gfs-text-secondary)]">
                            <AlertTriangle className="w-2.5 h-2.5 text-[var(--color-gfs-red)] flex-shrink-0" /> {threat}
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </Card>

              {i < selected.steps.length - 1 && (
                <div className="flex justify-start ml-3 py-1">
                  <ArrowRight className="w-3 h-3 text-[var(--color-gfs-accent)] rotate-90" />
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
