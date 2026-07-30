import { motion } from 'framer-motion';
import { User, Award, Calendar, Shield, Target, Star, BookOpen, Clock, MapPin, Mail, Phone, Briefcase, Zap } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { ProgressRing } from '@/components/ui/ProgressRing';
import { PageHeader } from '@/components/layout/PageHeader';
import { useStore } from '@/store/useStore';

export function MyProfile() {
  const { user, xp, completedModules, modules, currentRank } = useStore();
  const moduleProgress = (completedModules.length / modules.length) * 100;

  return (
    <div className="space-y-4">
      <PageHeader
        icon={<User className="w-5 h-5 text-[var(--color-gfs-accent)]" />}
        title="My Employee Profile"
        subtitle="GFS Employee — Security Intern"
      />

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        {/* Profile Card */}
        <Card delay={0} glow="accent">
          <div className="text-center">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[var(--color-gfs-accent)] to-[var(--color-gfs-blue)] flex items-center justify-center mx-auto mb-3">
              <span className="text-xl font-bold text-[var(--color-gfs-base)]">{user?.avatarInitials}</span>
            </div>
            <h2 className="text-lg font-display font-bold text-[var(--color-gfs-text)]">{user?.name}</h2>
            <p className="text-xs text-[var(--color-gfs-accent)]">{user?.role}</p>
            <p className="text-[10px] text-[var(--color-gfs-text-muted)] mt-1">{user?.department}</p>
            <Badge variant="accent" className="mt-2">{currentRank}</Badge>
          </div>

          <div className="mt-4 space-y-2">
            {[
              { icon: Briefcase, label: 'Employee ID', value: user?.employeeId },
              { icon: Shield, label: 'Manager', value: user?.manager },
              { icon: User, label: 'Buddy', value: user?.buddy },
              { icon: MapPin, label: 'Location', value: user?.location },
              { icon: Mail, label: 'Email', value: user?.email },
              { icon: Calendar, label: 'Start Date', value: user?.startDate },
            ].map((field) => (
              <div key={field.label} className="flex items-center gap-2 py-1.5">
                <field.icon className="w-3 h-3 text-[var(--color-gfs-text-muted)] flex-shrink-0" />
                <span className="text-[10px] text-[var(--color-gfs-text-muted)] w-20">{field.label}</span>
                <span className="text-[11px] text-[var(--color-gfs-text)] truncate">{field.value}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Progress & Stats */}
        <div className="space-y-4">
          <Card delay={0.1}>
            <h4 className="text-xs font-semibold text-[var(--color-gfs-text-secondary)] mb-3">Progress Overview</h4>
            <div className="flex items-center gap-6">
              <ProgressRing progress={moduleProgress} size={80} strokeWidth={5} />
              <div>
                <div className="text-lg font-display font-bold text-[var(--color-gfs-text)]">{completedModules.length}/{modules.length}</div>
                <div className="text-[10px] text-[var(--color-gfs-text-muted)]">Modules Completed</div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 mt-4">
              <div className="p-3 rounded-lg bg-[var(--color-gfs-elevated)] text-center">
                <div className="text-lg font-display font-bold text-[var(--color-gfs-accent)]">{xp.toLocaleString()}</div>
                <div className="text-[10px] text-[var(--color-gfs-text-muted)]">Total XP</div>
              </div>
              <div className="p-3 rounded-lg bg-[var(--color-gfs-elevated)] text-center">
                <div className="text-lg font-display font-bold text-[var(--color-gfs-text)]">Day 1</div>
                <div className="text-[10px] text-[var(--color-gfs-text-muted)]">Internship</div>
              </div>
            </div>
          </Card>

          <Card delay={0.15}>
            <h4 className="text-xs font-semibold text-[var(--color-gfs-text-secondary)] mb-3">Promotion Goal</h4>
            <div className="p-3 rounded-lg bg-[var(--color-gfs-accent-dim)] border border-[var(--color-gfs-accent)]/20">
              <div className="flex items-center gap-2 mb-2">
                <Target className="w-4 h-4 text-[var(--color-gfs-accent)]" />
                <span className="text-sm font-semibold text-[var(--color-gfs-accent)]">SOC Analyst — Tier 1</span>
              </div>
              <p className="text-[10px] text-[var(--color-gfs-text-muted)]">Month 2 — Monitor, triage, and investigate alerts independently</p>
              <div className="mt-2 space-y-1">
                {['Complete Foundation modules', 'Investigate 10 alerts', 'Pass technical assessment'].map((req) => (
                  <div key={req} className="flex items-center gap-2 text-[10px] text-[var(--color-gfs-text-secondary)]">
                    <div className="w-3 h-3 rounded border border-[var(--color-gfs-border)]" /> {req}
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>

        {/* Skills */}
        <Card delay={0.2}>
          <h4 className="text-xs font-semibold text-[var(--color-gfs-text-secondary)] mb-3">Skills Matrix</h4>
          <div className="space-y-3">
            {[
              { name: 'Networking', level: 40, color: 'var(--color-gfs-accent)' },
              { name: 'Windows', level: 30, color: 'var(--color-gfs-blue)' },
              { name: 'Linux', level: 25, color: 'var(--color-gfs-green)' },
              { name: 'Security Fundamentals', level: 35, color: 'var(--color-gfs-purple)' },
              { name: 'SIEM (Sentinel)', level: 20, color: 'var(--color-gfs-amber)' },
              { name: 'EDR (Falcon)', level: 15, color: 'var(--color-gfs-red)' },
              { name: 'KQL', level: 10, color: 'var(--color-gfs-accent)' },
              { name: 'Investigation', level: 15, color: 'var(--color-gfs-blue)' },
            ].map((skill) => (
              <div key={skill.name}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[11px] text-[var(--color-gfs-text-secondary)]">{skill.name}</span>
                  <span className="text-[10px] text-[var(--color-gfs-text-muted)] font-mono">{skill.level}%</span>
                </div>
                <div className="h-1.5 bg-[var(--color-gfs-elevated)] rounded-full overflow-hidden">
                  <motion.div initial={{ width: 0 }} animate={{ width: `${skill.level}%` }}
                    transition={{ delay: 0.3, duration: 0.6 }} className="h-full rounded-full" style={{ background: skill.color }} />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 pt-4 border-t border-[var(--color-gfs-border-light)]">
            <h4 className="text-xs font-semibold text-[var(--color-gfs-text-secondary)] mb-2">Certifications (In Progress)</h4>
            <div className="flex flex-wrap gap-1.5">
              <Badge variant="default">CompTIA Security+ (Studying)</Badge>
              <Badge variant="default">SC-900 (Studying)</Badge>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
