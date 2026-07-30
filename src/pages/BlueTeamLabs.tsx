import { useState } from 'react';
import { Terminal, ChevronRight, CheckCircle2, Lightbulb, Shield, BookOpen, Target } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { PageHeader } from '@/components/layout/PageHeader';
import { SOCLabs } from '@/data/soc';
import type { SOCLab } from '@/types/soc';

export function BlueTeamLabs() {
  const [selectedLab, setSelectedLab] = useState<SOCLab | null>(null);
  const [expandedStep, setExpandedStep] = useState<number | null>(null);
  const [completedSteps, setCompletedSteps] = useState<Set<string>>(new Set());

  const completeStep = (labId: string, stepOrder: number) => {
    const key = `${labId}-${stepOrder}`;
    setCompletedSteps((prev) => new Set([...prev, key]));
    if (selectedLab && stepOrder < selectedLab.missionSteps.length) {
      setExpandedStep(stepOrder + 1);
    }
  };

  return (
    <div className="space-y-4">
      <PageHeader icon={<Terminal className="w-5 h-5 text-[var(--color-gfs-accent)]" />} title="SOC Labs" subtitle="Guided investigations — learn by doing real SOC work" />

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        {/* Lab List */}
        <div className="xl:col-span-1 space-y-2">
          {SOCLabs.map((lab) => (
            <Card key={lab.id} delay={0} hover onClick={() => { setSelectedLab(lab); setExpandedStep(1); }}
              className={`!p-3 cursor-pointer ${selectedLab?.id === lab.id ? '!border-[var(--color-gfs-accent)]/30' : ''}`}>
              <div className="flex items-center gap-2">
                <Badge variant={lab.difficulty === 'beginner' ? 'success' : lab.difficulty === 'intermediate' ? 'medium' : lab.difficulty === 'advanced' ? 'high' : 'critical'}>{lab.difficulty}</Badge>
                <Badge variant="default">{lab.category}</Badge>
              </div>
              <p className="text-[11px] font-semibold text-[var(--color-gfs-text)] mt-1">{lab.title}</p>
              <div className="text-[9px] text-[var(--color-gfs-text-muted)] mt-0.5">{lab.missionSteps.length} steps</div>
            </Card>
          ))}
        </div>

        {/* Lab Detail */}
        <div className="xl:col-span-2">
          {selectedLab ? (
            <div className="space-y-3">
              <Card delay={0} className="!p-4">
                <h2 className="text-sm font-display font-bold text-[var(--color-gfs-text)]">{selectedLab.title}</h2>
                <p className="text-[11px] text-[var(--color-gfs-text-secondary)] mt-1">{selectedLab.objective}</p>
                <div className="flex items-center gap-2 mt-2">
                  <Badge variant={selectedLab.difficulty === 'beginner' ? 'success' : 'medium'}>{selectedLab.difficulty}</Badge>
                  <Badge variant="default">{selectedLab.category}</Badge>
                  {/* Progress */}
                  <div className="flex-1 h-1.5 bg-[var(--color-gfs-elevated)] rounded-full overflow-hidden ml-4">
                    <div className="h-full bg-[var(--color-gfs-accent)] rounded-full transition-all"
                      style={{ width: `${(completedSteps.size / selectedLab.missionSteps.length) * 100}%` }} />
                  </div>
                  <span className="text-[9px] text-[var(--color-gfs-text-muted)]">{completedSteps.size}/{selectedLab.missionSteps.length}</span>
                </div>
              </Card>

              {selectedLab.missionSteps.map((step) => {
                const key = `${selectedLab.id}-${step.order}`;
                const isCompleted = completedSteps.has(key);
                const isExpanded = expandedStep === step.order;

                return (
                  <motion.div key={step.order} initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: step.order * 0.05 }}>
                    <Card delay={0} className={`!p-4 ${isCompleted ? 'border-[var(--color-gfs-green)]/20' : isExpanded ? 'border-[var(--color-gfs-accent)]/30' : ''}`}>
                      <div className="flex items-center gap-3 cursor-pointer" onClick={() => setExpandedStep(isExpanded ? null : step.order)}>
                        <span className={`w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-mono font-bold flex-shrink-0 ${
                          isCompleted ? 'bg-[var(--color-gfs-green)] text-white' : 'bg-[var(--color-gfs-accent-dim)] text-[var(--color-gfs-accent)]'
                        }`}>
                          {isCompleted ? '✓' : step.order}
                        </span>
                        <div className="flex-1">
                          <span className="text-[11px] font-semibold text-[var(--color-gfs-text)]">{step.title}</span>
                        </div>
                        <ChevronRight className={`w-4 h-4 text-[var(--color-gfs-text-muted)] transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
                      </div>

                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                            <div className="mt-3 pt-3 border-t border-[var(--color-gfs-border-light)] space-y-3">
                              <p className="text-[10px] text-[var(--color-gfs-text-secondary)] leading-relaxed">{step.instruction}</p>

                              {step.command && (
                                <div className="p-3 rounded bg-[#0d1117] font-mono text-[10px] text-[var(--color-gfs-green)]">$ {step.command}</div>
                              )}

                              <div className="p-3 rounded bg-[var(--color-gfs-elevated)]">
                                <span className="text-[9px] text-[var(--color-gfs-text-muted)] uppercase">Expected Output</span>
                                <pre className="text-[10px] font-mono text-[var(--color-gfs-text-secondary)] mt-1 whitespace-pre-wrap">{step.expectedOutput}</pre>
                              </div>

                              <div className="p-3 rounded bg-[var(--color-gfs-accent-dim)]">
                                <div className="flex items-center gap-1 mb-1">
                                  <Lightbulb className="w-3 h-3 text-[var(--color-gfs-accent)]" />
                                  <span className="text-[9px] text-[var(--color-gfs-accent)] uppercase font-semibold">Explanation</span>
                                </div>
                                <p className="text-[10px] text-[var(--color-gfs-text-secondary)] leading-relaxed">{step.explanation}</p>
                              </div>

                              {step.blueTeamContext && (
                                <div className="p-3 rounded bg-[var(--color-gfs-blue-dim)] border border-[var(--color-gfs-blue)]/20">
                                  <div className="flex items-center gap-1 mb-1">
                                    <Shield className="w-3 h-3 text-[var(--color-gfs-blue)]" />
                                    <span className="text-[9px] text-[var(--color-gfs-blue)] uppercase font-semibold">Blue Team Context</span>
                                  </div>
                                  <p className="text-[10px] text-[var(--color-gfs-text-secondary)]">{step.blueTeamContext}</p>
                                </div>
                              )}

                              {!isCompleted && (
                                <button onClick={() => completeStep(selectedLab.id, step.order)}
                                  className="px-3 py-1.5 rounded bg-[var(--color-gfs-accent-dim)] text-[10px] text-[var(--color-gfs-accent)] font-medium hover:bg-[var(--color-gfs-accent)]/20 transition-colors">
                                  Step Complete — Continue
                                </button>
                              )}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          ) : (
            <Card delay={0} className="!p-12 text-center">
              <Target className="w-8 h-8 text-[var(--color-gfs-text-muted)] mx-auto mb-3 opacity-30" />
              <p className="text-[11px] text-[var(--color-gfs-text-muted)]">Select a lab to begin your guided investigation</p>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
