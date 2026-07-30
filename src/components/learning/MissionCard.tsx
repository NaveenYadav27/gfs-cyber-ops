// src/components/learning/MissionCard.tsx
import { motion } from 'framer-motion';
import { Clock, Star, Shield, Briefcase, ArrowRight, Lock, CheckCircle2, Play, AlertTriangle } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { ProgressRing } from '@/components/ui/ProgressRing';
import type { Mission } from '@/types/learning';
import { useLearningEngine } from '@/store/useLearningEngine';

const typeIcons: Record<string, string> = {
  investigation: '🔍', configuration: '⚙️', 'incident-response': '🚨',
  'threat-hunting': '🧠', 'risk-assessment': '📊', 'architecture-review': '🏗️',
  compliance: '📋', 'ethical-hacking': '🎯', 'forensics': '🔬', 'executive-briefing': '👔',
};

const difficultyColors: Record<string, string> = {
  beginner: 'var(--color-gfs-green)', intermediate: 'var(--color-gfs-blue)',
  advanced: 'var(--color-gfs-amber)', expert: 'var(--color-gfs-red)',
};

interface MissionCardProps {
  mission: Mission;
  compact?: boolean;
  delay?: number;
  onClick?: () => void;
}

export function MissionCard({ mission, compact = false, delay = 0, onClick }: MissionCardProps) {
  const { startMission } = useLearningEngine();
  const isLocked = mission.status === 'locked';
  const isCompleted = mission.status === 'completed';
  const isAvailable = mission.status === 'available';

  const handleStart = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isAvailable) {
      startMission(mission.id);
      onClick?.();
    }
  };

  if (compact) {
    return (
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay }} whileHover={{ scale: 1.02 }} onClick={onClick}
        className={`p-3 rounded-xl border cursor-pointer transition-all ${
          isLocked ? 'opacity-40 border-[var(--color-gfs-border-light)] bg-[var(--color-gfs-surface)]' :
          isCompleted ? 'border-[var(--color-gfs-green)]/20 bg-[var(--color-gfs-surface)]' :
          'border-[var(--color-gfs-border-light)] bg-[var(--color-gfs-surface)] hover:bg-[var(--color-gfs-elevated)] hover:border-[var(--color-gfs-border)]'
        }`}>
        <div className="flex items-center gap-3">
          <span className="text-lg">{typeIcons[mission.type]}</span>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-[var(--color-gfs-text)] truncate">{mission.title}</span>
              {isCompleted && <CheckCircle2 className="w-3 h-3 text-[var(--color-gfs-green)] flex-shrink-0" />}
              {isLocked && <Lock className="w-3 h-3 text-[var(--color-gfs-text-muted)] flex-shrink-0" />}
            </div>
            <div className="flex items-center gap-2 mt-0.5">
              <Badge variant="default">Week {mission.storyWeek}</Badge>
              <span className="text-[10px] text-[var(--color-gfs-text-muted)]">{mission.estimatedMinutes}min</span>
              <span className="text-[10px] text-[var(--color-gfs-accent)]">+{mission.xpReward} XP</span>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay }} whileHover={!isLocked ? { scale: 1.01 } : {}} onClick={onClick}
      className={`p-5 rounded-xl border transition-all ${
        isLocked ? 'opacity-50 border-[var(--color-gfs-border-light)] bg-[var(--color-gfs-surface)]' :
        isCompleted ? 'border-[var(--color-gfs-green)]/30 bg-[var(--color-gfs-surface)]' :
        'border-[var(--color-gfs-border-light)] bg-[var(--color-gfs-surface)] hover:bg-[var(--color-gfs-elevated)] hover:border-[var(--color-gfs-accent)]/30 cursor-pointer'
      }`}>
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 text-center">
          <span className="text-2xl">{typeIcons[mission.type]}</span>
          <div className="text-[10px] text-[var(--color-gfs-text-muted)] mt-1 capitalize">{mission.type.replace('-', ' ')}</div>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <span className="text-[10px] font-mono text-[var(--color-gfs-text-muted)]">MISSION {String(mission.number).padStart(2, '0')}</span>
            <Badge variant={mission.difficulty === 'beginner' ? 'success' : mission.difficulty === 'intermediate' ? 'medium' : mission.difficulty === 'advanced' ? 'high' : 'critical'}>
              {mission.difficulty}
            </Badge>
            {mission.storyArc && <Badge variant="accent">{mission.storyArc}</Badge>}
          </div>
          <h3 className="text-sm font-semibold text-[var(--color-gfs-text)]">{mission.title}</h3>
          <p className="text-[11px] text-[var(--color-gfs-text-secondary)] mt-1 line-clamp-2">{mission.businessProblem}</p>
          <div className="flex items-center gap-3 mt-2 flex-wrap">
            <span className="text-[10px] text-[var(--color-gfs-text-muted)] flex items-center gap-1">
              <Clock className="w-2.5 h-2.5" /> {mission.estimatedMinutes} min
            </span>
            <span className="text-[10px] text-[var(--color-gfs-accent)] flex items-center gap-1">
              <Star className="w-2.5 h-2.5" /> +{mission.xpReward} XP
            </span>
            <span className="text-[10px] text-[var(--color-gfs-text-muted)] flex items-center gap-1">
              <Briefcase className="w-2.5 h-2.5" /> {mission.businessUnit}
            </span>
            <span className="text-[10px] text-[var(--color-gfs-text-muted)]">by {mission.assignedBy}</span>
          </div>
          {mission.status === 'in-progress' && (
            <div className="mt-2">
              <div className="h-1.5 bg-[var(--color-gfs-elevated)] rounded-full overflow-hidden">
                <motion.div className="h-full bg-gradient-to-r from-[var(--color-gfs-accent)] to-[var(--color-gfs-blue)] rounded-full"
                  animate={{ width: `${mission.progress}%` }} />
              </div>
              <span className="text-[10px] text-[var(--color-gfs-text-muted)] mt-1">{Math.round(mission.progress)}% complete</span>
            </div>
          )}
        </div>
        <div className="flex-shrink-0">
          {isCompleted ? (
            <div className="w-12 h-12">
              <ProgressRing progress={100} size={48} strokeWidth={3} color="var(--color-gfs-green)" />
            </div>
          ) : isAvailable ? (
            <button onClick={handleStart}
              className="px-3 py-1.5 rounded-lg bg-[var(--color-gfs-accent-dim)] text-[var(--color-gfs-accent)] text-xs font-medium hover:bg-[var(--color-gfs-accent)]/20 transition-colors flex items-center gap-1">
              <Play className="w-3 h-3" /> Start
            </button>
          ) : (
            <Lock className="w-5 h-5 text-[var(--color-gfs-text-muted)]" />
          )}
        </div>
      </div>
    </motion.div>
  );
}
