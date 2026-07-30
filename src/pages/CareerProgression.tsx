// src/pages/CareerProgression.tsx
import { motion } from 'framer-motion';
import {
  Trophy, Star, Lock, ChevronRight, Zap, Target, Shield, Code, Eye,
  Search, Swords, Brain, Award, BookOpen,
} from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { ProgressRing } from '@/components/ui/ProgressRing';
import { useStore } from '@/store/useStore';

const RANKS = [
  { id: 'security-intern', title: 'Security Intern', level: 1, icon: Eye, xpRequired: 0, color: 'var(--color-gfs-text-muted)', description: 'Your journey begins at GFS.' },
  { id: 'soc-analyst', title: 'SOC Analyst', level: 2, icon: Search, xpRequired: 2000, color: 'var(--color-gfs-accent)', description: 'Monitor, triage, and investigate alerts.' },
  { id: 'ethical-hacker', title: 'Ethical Hacker', level: 3, icon: Target, xpRequired: 5000, color: 'var(--color-gfs-blue)', description: 'Think like an attacker, protect like a defender.' },
  { id: 'vapt-consultant', title: 'VAPT Consultant', level: 4, icon: Shield, xpRequired: 10000, color: 'var(--color-gfs-purple)', description: 'Assess and test the enterprise.' },
  { id: 'security-engineer', title: 'Security Engineer', level: 5, icon: Code, xpRequired: 18000, color: 'var(--color-gfs-green)', description: 'Build and harden security infrastructure.' },
  { id: 'threat-hunter', title: 'Threat Hunter', level: 6, icon: Brain, xpRequired: 28000, color: 'var(--color-gfs-amber)', description: 'Proactively seek hidden threats.' },
  { id: 'incident-responder', title: 'Incident Responder', level: 7, icon: Swords, xpRequired: 40000, color: 'var(--color-gfs-red)', description: 'Lead the defense when seconds matter.' },
  { id: 'security-architect', title: 'Security Architect', level: 8, icon: Trophy, xpRequired: 60000, color: 'var(--color-gfs-accent)', description: 'Design the security of the entire enterprise.' },
];

const SKILLS = [
  { category: 'Network Security', skills: [
    { name: 'TCP/IP & Protocols', level: 65 },
    { name: 'Firewall Management', level: 40 },
    { name: 'Network Analysis', level: 50 },
    { name: 'IDS/IPS', level: 30 },
  ]},
  { category: 'Operating Systems', skills: [
    { name: 'Windows Security', level: 55 },
    { name: 'Linux Administration', level: 45 },
    { name: 'PowerShell', level: 35 },
    { name: 'Bash Scripting', level: 40 },
  ]},
  { category: 'Security Operations', skills: [
    { name: 'SIEM (Sentinel)', level: 60 },
    { name: 'EDR (Falcon)', level: 50 },
    { name: 'Alert Triage', level: 55 },
    { name: 'Incident Response', level: 25 },
  ]},
  { category: 'Offensive Security', skills: [
    { name: 'Reconnaissance', level: 35 },
    { name: 'Vulnerability Scanning', level: 30 },
    { name: 'Exploitation', level: 15 },
    { name: 'Post-Exploitation', level: 10 },
  ]},
  { category: 'Cloud & Identity', skills: [
    { name: 'Azure Security', level: 40 },
    { name: 'AWS Security', level: 30 },
    { name: 'Active Directory', level: 45 },
    { name: 'Zero Trust', level: 20 },
  ]},
  { category: 'Compliance & Risk', skills: [
    { name: 'Risk Assessment', level: 25 },
    { name: 'PCI DSS', level: 15 },
    { name: 'GDPR', level: 20 },
    { name: 'Audit Management', level: 10 },
  ]},
];

export function CareerProgression() {
  const { xp, currentRank, completedModules, modules } = useStore();
  const currentRankIndex = RANKS.findIndex((r) => r.id === currentRank);
  const nextRank = RANKS[currentRankIndex + 1];
  const progressToNext = nextRank ? Math.min((xp / nextRank.xpRequired) * 100, 100) : 100;
  const completedCount = modules.filter((m) => m.completed).length;

  return (
    <div className="space-y-6">
      {/* Career Overview */}
      <Card delay={0} glow="accent" className="relative overflow-hidden">
        <div className="absolute inset-0 gfs-grid-bg opacity-20" />
        <div className="relative z-10 flex items-center gap-6">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200 }}
            className="flex-shrink-0"
          >
            <ProgressRing progress={progressToNext} size={100} strokeWidth={6} label={`Lv.${currentRankIndex + 1}`} />
          </motion.div>
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-1">
              <h2 className="text-xl font-display font-bold text-[var(--color-gfs-text)]">
                {RANKS[currentRankIndex].title}
              </h2>
              <Badge variant="accent">Level {currentRankIndex + 1}</Badge>
            </div>
            <p className="text-sm text-[var(--color-gfs-text-secondary)]">
              {RANKS[currentRankIndex].description}
            </p>
            <div className="flex items-center gap-6 mt-3">
              <div>
                <span className="text-[10px] text-[var(--color-gfs-text-muted)] uppercase">Experience</span>
                <div className="text-sm font-mono font-semibold text-[var(--color-gfs-accent)]">{xp.toLocaleString()} XP</div>
              </div>
              <div>
                <span className="text-[10px] text-[var(--color-gfs-text-muted)] uppercase">Modules</span>
                <div className="text-sm font-mono font-semibold text-[var(--color-gfs-text)]">{completedCount}/{modules.length}</div>
              </div>
              {nextRank && (
                <div>
                  <span className="text-[10px] text-[var(--color-gfs-text-muted)] uppercase">Next Rank</span>
                  <div className="text-sm font-semibold text-[var(--color-gfs-text)] flex items-center gap-1">
                    {nextRank.title} <ChevronRight className="w-3 h-3" />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        {/* Rank Progression */}
        <div className="xl:col-span-2 space-y-3">
          <h3 className="text-sm font-semibold text-[var(--color-gfs-text)]">Career Progression</h3>
          {RANKS.map((rank, i) => {
            const Icon = rank.icon;
            const isCurrent = rank.id === currentRank;
            const isCompleted = i < currentRankIndex;
            const isLocked = i > currentRankIndex;

            return (
              <motion.div
                key={rank.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className={`flex items-center gap-4 p-4 rounded-xl border transition-colors ${
                  isCurrent
                    ? 'bg-[var(--color-gfs-accent-dim)] border-[var(--color-gfs-accent)]/30'
                    : isCompleted
                    ? 'bg-[var(--color-gfs-surface)] border-[var(--color-gfs-border-light)]'
                    : 'bg-[var(--color-gfs-deep)] border-[var(--color-gfs-border-light)] opacity-60'
                }`}
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                  isCurrent ? 'bg-[var(--color-gfs-accent)]/20' : isCompleted ? 'bg-[var(--color-gfs-green-dim)]' : 'bg-[var(--color-gfs-elevated)]'
                }`}>
                  {isLocked ? <Lock className="w-5 h-5 text-[var(--color-gfs-text-muted)]" /> : <Icon className="w-5 h-5" style={{ color: isCompleted ? 'var(--color-gfs-green)' : rank.color }} />}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className={`text-sm font-semibold ${isCurrent ? 'text-[var(--color-gfs-accent)]' : 'text-[var(--color-gfs-text)]'}`}>{rank.title}</span>
                    <span className="text-[10px] text-[var(--color-gfs-text-muted)] font-mono">Lv.{rank.level}</span>
                    {isCompleted && <Badge variant="success">Completed</Badge>}
                    {isCurrent && <Badge variant="accent">Current</Badge>}
                  </div>
                  <p className="text-[11px] text-[var(--color-gfs-text-muted)] mt-0.5">{rank.description}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <div className="text-xs font-mono text-[var(--color-gfs-text-muted)]">{rank.xpRequired.toLocaleString()} XP</div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Skills Matrix */}
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-[var(--color-gfs-text)]">Skills Matrix</h3>
          {SKILLS.map((category, ci) => (
            <Card key={category.category} delay={ci * 0.05} className="!p-3">
              <h4 className="text-[10px] text-[var(--color-gfs-text-muted)] uppercase tracking-wider mb-2">{category.category}</h4>
              <div className="space-y-2">
                {category.skills.map((skill) => (
                  <div key={skill.name}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[11px] text-[var(--color-gfs-text-secondary)]">{skill.name}</span>
                      <span className="text-[10px] text-[var(--color-gfs-text-muted)] font-mono">{skill.level}%</span>
                    </div>
                    <div className="h-1.5 bg-[var(--color-gfs-elevated)] rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${skill.level}%` }}
                        transition={{ delay: ci * 0.05 + 0.3, duration: 0.6 }}
                        className="h-full rounded-full"
                        style={{
                          background: skill.level > 60 ? 'var(--color-gfs-accent)' :
                                     skill.level > 30 ? 'var(--color-gfs-blue)' :
                                     'var(--color-gfs-text-muted)',
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
