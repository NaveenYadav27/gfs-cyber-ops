import { useState } from 'react';
import { Trophy, Briefcase, Wrench, GraduationCap, TrendingUp, DollarSign, Award, ChevronRight, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { PageHeader } from '@/components/layout/PageHeader';
import { CAREER_PATH } from '@/data/enterprise';
import type { CareerRole } from '@/types/enterprise';

export function CareerJourney() {
  const [selectedRole, setSelectedRole] = useState<CareerRole | null>(null);

  return (
    <div className="space-y-4">
      <PageHeader
        icon={<Trophy className="w-5 h-5 text-[var(--color-gfs-accent)]" />}
        title="Cyber Defense Career Journey"
        subtitle="From Security Intern to Director — your path in GFS Cyber Defense"
      />

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        {/* Career Path */}
        <div className="xl:col-span-2">
          <div className="space-y-2">
            {CAREER_PATH.map((role, i) => (
              <motion.div key={role.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}>
                <Card delay={0} hover onClick={() => setSelectedRole(selectedRole?.id === role.id ? null : role)}
                  className={`!p-4 ${selectedRole?.id === role.id ? '!border-[var(--color-gfs-accent)]/30 !shadow-[0_0_20px_rgba(0,229,199,0.06)]' : ''}`}>
                  <div className="flex items-center gap-4">
                    {/* Level indicator */}
                    <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{
                        background: `linear-gradient(135deg, var(--color-gfs-accent) ${role.level * 12}%, var(--color-gfs-elevated) ${role.level * 12}%)`,
                        border: '2px solid var(--color-gfs-border-light)',
                      }}>
                      <span className="text-[10px] font-mono font-bold text-[var(--color-gfs-text)]">L{role.level}</span>
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[12px] font-semibold text-[var(--color-gfs-text)]">{role.title}</span>
                        <Badge variant="default">{role.department}</Badge>
                        {role.currentHolders > 0 && (
                          <span className="text-[9px] text-[var(--color-gfs-text-muted)]">{role.currentHolders} current</span>
                        )}
                      </div>
                      <div className="flex items-center gap-3 mt-1 text-[9px] text-[var(--color-gfs-text-muted)]">
                        <span className="flex items-center gap-1"><DollarSign className="w-2.5 h-2.5" /> {role.salaryRange}</span>
                        <span className="flex items-center gap-1"><Clock className="w-2.5 h-2.5" /> {role.timeToPromotion}</span>
                        <span>{role.tools.length} tools</span>
                        <span>{role.certifications.length} certs needed</span>
                      </div>
                    </div>

                    <ChevronRight className={`w-4 h-4 text-[var(--color-gfs-text-muted)] transition-transform ${selectedRole?.id === role.id ? 'rotate-90' : ''}`} />
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Role Detail Panel */}
        <div className="xl:col-span-1">
          <AnimatePresence mode="wait">
            {selectedRole ? (
              <motion.div key={selectedRole.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}>
                <Card delay={0} className="!p-5 sticky top-4">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-full bg-[var(--color-gfs-accent-dim)] flex items-center justify-center">
                      <span className="text-sm font-display font-bold text-[var(--color-gfs-accent)]">L{selectedRole.level}</span>
                    </div>
                    <div>
                      <h3 className="gfs-text-h3 text-[var(--color-gfs-text)]">{selectedRole.title}</h3>
                      <p className="text-[10px] text-[var(--color-gfs-text-muted)]">{selectedRole.department} • {selectedRole.salaryRange}</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <span className="gfs-text-label">Daily Work</span>
                      <div className="mt-1 space-y-1">
                        {selectedRole.dailyWork.map((w) => (
                          <div key={w} className="text-[10px] text-[var(--color-gfs-text-secondary)] flex items-center gap-1.5">
                            <div className="w-1 h-1 rounded-full bg-[var(--color-gfs-accent)]" /> {w}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <span className="gfs-text-label">Key Tools</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {selectedRole.tools.map((t) => <Badge key={t} variant="accent">{t}</Badge>)}
                      </div>
                    </div>

                    <div>
                      <span className="gfs-text-label">Skills Required</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {selectedRole.skills.map((s) => <Badge key={s} variant="default">{s}</Badge>)}
                      </div>
                    </div>

                    <div>
                      <span className="gfs-text-label">Certifications</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {selectedRole.certifications.map((c) => <Badge key={c} variant="success">{c}</Badge>)}
                      </div>
                    </div>

                    <div>
                      <span className="gfs-text-label">Promotion Criteria</span>
                      <div className="mt-1 space-y-1">
                        {selectedRole.promotionCriteria.map((c) => (
                          <div key={c} className="text-[10px] text-[var(--color-gfs-text-secondary)] flex items-center gap-1.5">
                            <div className="w-1 h-1 rounded-full bg-[var(--color-gfs-green)]" /> {c}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="p-3 rounded-lg bg-[var(--color-gfs-accent-dim)]">
                      <span className="text-[10px] text-[var(--color-gfs-accent)] font-semibold">Time to Promotion: {selectedRole.timeToPromotion}</span>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ) : (
              <Card delay={0.1} className="!p-8 text-center">
                <Trophy className="w-8 h-8 text-[var(--color-gfs-text-muted)] mx-auto mb-3 opacity-30" />
                <p className="text-[11px] text-[var(--color-gfs-text-muted)]">Select a role from the career path to view details</p>
              </Card>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
