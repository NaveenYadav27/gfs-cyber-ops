import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, ChevronRight, Star, Lock, Award, BookOpen, Wrench, Target, Code, Briefcase, X } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { ProgressRing } from '@/components/ui/ProgressRing';
import { PageHeader } from '@/components/layout/PageHeader';
import { CAREER_PATH } from '@/data/enterprise-organization';
import { useStore } from '@/store/useStore';
import type { CareerRole } from '@/data/enterprise-organization';

function RoleDetail({ role, onClose }: { role: CareerRole; onClose: () => void }) {
  return (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}
      className="fixed right-0 top-0 h-screen w-[440px] bg-[var(--color-gfs-deep)] border-l border-[var(--color-gfs-border-light)] z-50 overflow-y-auto shadow-2xl">
      <div className="p-6 space-y-5">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl">{role.icon}</span>
              <h2 className="text-sm font-semibold text-[var(--color-gfs-text)]">{role.title}</h2>
            </div>
            <p className="text-[10px] text-[var(--color-gfs-accent)] mt-1">Level {role.level} • {role.duration}</p>
            <p className="text-[10px] text-[var(--color-gfs-text-muted)]">{role.department}</p>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-[var(--color-gfs-elevated)] text-[var(--color-gfs-text-muted)]">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-3 rounded-lg bg-[var(--color-gfs-surface)] border border-[var(--color-gfs-border-light)]">
          <span className="text-xs font-semibold text-[var(--color-gfs-accent)]">{role.salaryRange}</span>
        </div>

        <div>
          <h4 className="text-[10px] text-[var(--color-gfs-text-muted)] uppercase tracking-wider mb-2">Responsibilities</h4>
          <div className="space-y-1.5">
            {role.responsibilities.map((r) => (
              <div key={r} className="flex items-start gap-2 text-[11px] text-[var(--color-gfs-text-secondary)]">
                <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-gfs-accent)] mt-1.5 flex-shrink-0" /> {r}
              </div>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-[10px] text-[var(--color-gfs-text-muted)] uppercase tracking-wider mb-2">Required Skills</h4>
          <div className="flex flex-wrap gap-1.5">
            {role.skills.map((s) => <Badge key={s} variant="accent">{s}</Badge>)}
          </div>
        </div>

        <div>
          <h4 className="text-[10px] text-[var(--color-gfs-text-muted)] uppercase tracking-wider mb-2">Certifications</h4>
          <div className="flex flex-wrap gap-1.5">
            {role.certifications.map((c) => <Badge key={c} variant="default">{c}</Badge>)}
          </div>
        </div>

        <div>
          <h4 className="text-[10px] text-[var(--color-gfs-text-muted)] uppercase tracking-wider mb-2">Tools</h4>
          <div className="flex flex-wrap gap-1.5">
            {role.tools.map((t) => <Badge key={t} variant="default">{t}</Badge>)}
          </div>
        </div>

        <div>
          <h4 className="text-[10px] text-[var(--color-gfs-text-muted)] uppercase tracking-wider mb-2">Sample Projects</h4>
          <div className="space-y-1">
            {role.projects.map((p) => (
              <div key={p} className="text-[11px] text-[var(--color-gfs-text-secondary)] flex items-center gap-2">
                <Target className="w-3 h-3 text-[var(--color-gfs-accent)] flex-shrink-0" /> {p}
              </div>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-[10px] text-[var(--color-gfs-text-muted)] uppercase tracking-wider mb-2">Promotion Requirements</h4>
          <div className="space-y-1.5">
            {role.promotionRequirements.map((pr) => (
              <div key={pr} className="flex items-start gap-2 p-2 rounded-lg bg-[var(--color-gfs-accent-dim)] text-[11px] text-[var(--color-gfs-text-secondary)]">
                <Award className="w-3 h-3 text-[var(--color-gfs-accent)] mt-0.5 flex-shrink-0" /> {pr}
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function CareerCenter() {
  const { xp } = useStore();
  const [selectedRole, setSelectedRole] = useState<CareerRole | null>(null);

  return (
    <div className="space-y-4">
      <PageHeader
        icon={<Trophy className="w-5 h-5 text-[var(--color-gfs-accent)]" />}
        title="Career Center"
        subtitle="Your career roadmap at GFS — from Security Intern to Security Architect"
        badge={<Badge variant="accent">{xp.toLocaleString()} XP</Badge>}
      />

      <div className="space-y-3">
        {CAREER_PATH.map((role, i) => {
          const isCurrent = i === 0;
          const isLocked = role.level > 1 && xp < (role.level - 1) * 3000;

          return (
            <motion.div key={role.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}>
              <Card hover onClick={() => setSelectedRole(role)}
                className={`!p-4 ${isCurrent ? 'border-[var(--color-gfs-accent)]/30 gfs-glow' : isLocked ? 'opacity-60' : ''}`}>
                <div className="flex items-center gap-4">
                  <div className="text-2xl flex-shrink-0">{role.icon}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-semibold text-[var(--color-gfs-text)]">{role.title}</h4>
                      <Badge variant={isCurrent ? 'accent' : isLocked ? 'default' : 'success'}>
                        {isCurrent ? 'Current' : isLocked ? 'Locked' : 'Available'}
                      </Badge>
                    </div>
                    <p className="text-[11px] text-[var(--color-gfs-text-muted)] mt-0.5">{role.duration} • {role.department}</p>
                    <p className="text-[10px] text-[var(--color-gfs-text-secondary)] mt-1 line-clamp-1">{role.responsibilities[0]}</p>
                  </div>
                  <div className="text-right flex-shrink-0 hidden md:block">
                    <div className="text-xs font-mono text-[var(--color-gfs-text-muted)]">{role.salaryRange}</div>
                    <div className="text-[10px] text-[var(--color-gfs-text-muted)] mt-1">Level {role.level}</div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-[var(--color-gfs-text-muted)] flex-shrink-0" />
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>

      <AnimatePresence>
        {selectedRole && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40" onClick={() => setSelectedRole(null)} />
            <RoleDetail role={selectedRole} onClose={() => setSelectedRole(null)} />
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
