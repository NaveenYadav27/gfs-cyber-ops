// src/pages/MissionDashboard.tsx
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Clock, Star, Filter, BookOpen, TrendingUp, Map } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { ProgressRing } from '@/components/ui/ProgressRing';
import { MissionCard } from '@/components/learning/MissionCard';
import { PageHeader } from '@/components/layout/PageHeader';
import { useLearningEngine } from '@/store/useLearningEngine';
import { MISSIONS } from '@/data/missions';

export function MissionDashboard() {
  const { missions, totalXP, level, currentMissionId, setCurrentMission } = useLearningEngine();
  const [filter, setFilter] = useState<string>('all');
  const [storyFilter, setStoryFilter] = useState<string>('all');

  const statusCounts = {
    available: missions.filter((m) => m.status === 'available').length,
    inProgress: missions.filter((m) => m.status === 'in-progress').length,
    completed: missions.filter((m) => m.status === 'completed').length,
    locked: missions.filter((m) => m.status === 'locked').length,
  };

  const filtered = missions.filter((m) => {
    if (filter !== 'all' && m.status !== filter) return false;
    if (storyFilter !== 'all' && m.storyWeek !== parseInt(storyFilter)) return false;
    return true;
  });

  return (
    <div className="space-y-4">
      <PageHeader
        icon={<Play className="w-5 h-5 text-[var(--color-gfs-accent)]" />}
        title="Enterprise Missions"
        subtitle="Operation DarkShadow — Your investigation journey at GFS"
        badge={<Badge variant="accent">Level {level} • {totalXP.toLocaleString()} XP</Badge>}
      />

      {/* Progress Overview */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <Card delay={0} className="!p-4">
          <div className="flex items-center gap-3">
            <ProgressRing progress={(statusCounts.completed / missions.length) * 100} size={50} strokeWidth={3} />
            <div>
              <div className="text-lg font-display font-bold text-[var(--color-gfs-text)]">{statusCounts.completed}/{missions.length}</div>
              <div className="text-[10px] text-[var(--color-gfs-text-muted)]">Missions Complete</div>
            </div>
          </div>
        </Card>
        <Card delay={0.05} className="!p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[var(--color-gfs-accent-dim)] flex items-center justify-center">
              <Star className="w-5 h-5 text-[var(--color-gfs-accent)]" />
            </div>
            <div>
              <div className="text-lg font-display font-bold text-[var(--color-gfs-accent)]">{totalXP.toLocaleString()}</div>
              <div className="text-[10px] text-[var(--color-gfs-text-muted)]">Total XP</div>
            </div>
          </div>
        </Card>
        <Card delay={0.1} className="!p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[var(--color-gfs-green-dim)] flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-[var(--color-gfs-green)]" />
            </div>
            <div>
              <div className="text-lg font-display font-bold text-[var(--color-gfs-text)]">Level {level}</div>
              <div className="text-[10px] text-[var(--color-gfs-text-muted)]">Current Level</div>
            </div>
          </div>
        </Card>
        <Card delay={0.15} className="!p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[var(--color-gfs-amber-dim)] flex items-center justify-center">
              <Map className="w-5 h-5 text-[var(--color-gfs-amber)]" />
            </div>
            <div>
              <div className="text-lg font-display font-bold text-[var(--color-gfs-text)]">Week {Math.min(statusCounts.completed + 1, 8)}</div>
              <div className="text-[10px] text-[var(--color-gfs-text-muted)]">Story Progress</div>
            </div>
          </div>
        </Card>
      </div>

      {/* Story Arc */}
      <Card delay={0.2} glow="accent" className="!p-4">
        <div className="flex items-center gap-2 mb-3">
          <Map className="w-4 h-4 text-[var(--color-gfs-accent)]" />
          <span className="text-xs font-semibold text-[var(--color-gfs-text)]">Operation DarkShadow — Story Arc</span>
        </div>
        <div className="flex items-center gap-1 overflow-x-auto pb-2">
          {Array.from({ length: 8 }, (_, i) => {
            const weekMission = missions.find((m) => m.storyWeek === i + 1);
            const isCompleted = weekMission?.status === 'completed';
            const isCurrent = weekMission?.status === 'in-progress' || weekMission?.status === 'available';
            return (
              <div key={i} className="flex items-center gap-1 flex-shrink-0">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-mono transition-colors ${
                  isCompleted ? 'bg-[var(--color-gfs-green)] text-[var(--color-gfs-base)]' :
                  isCurrent ? 'bg-[var(--color-gfs-accent)] text-[var(--color-gfs-base)] animate-pulse-gfs' :
                  'bg-[var(--color-gfs-elevated)] text-[var(--color-gfs-text-muted)]'
                }`}>
                  {i + 1}
                </div>
                {i < 7 && <div className={`w-4 h-0.5 ${isCompleted ? 'bg-[var(--color-gfs-green)]' : 'bg-[var(--color-gfs-elevated)]'}`} />}
              </div>
            );
          })}
        </div>
      </Card>

      {/* Filters */}
      <div className="flex items-center gap-3 flex-wrap">
        <div className="flex items-center gap-1">
          {['all', 'available', 'in-progress', 'completed', 'locked'].map((s) => (
            <button key={s} onClick={() => setFilter(s)}
              className={`px-2.5 py-1 rounded-lg text-[10px] capitalize transition-colors ${
                filter === s ? 'bg-[var(--color-gfs-accent-dim)] text-[var(--color-gfs-accent)]' : 'text-[var(--color-gfs-text-muted)] hover:text-[var(--color-gfs-text)]'
              }`}>{s.replace('-', ' ')}</button>
          ))}
        </div>
        <span className="text-[var(--color-gfs-border)]">|</span>
        <div className="flex items-center gap-1">
          {['all', '1', '2', '3', '4', '5', '6', '7', '8'].map((w) => (
            <button key={w} onClick={() => setStoryFilter(w)}
              className={`px-2 py-1 rounded-lg text-[10px] transition-colors ${
                storyFilter === w ? 'bg-[var(--color-gfs-accent-dim)] text-[var(--color-gfs-accent)]' : 'text-[var(--color-gfs-text-muted)] hover:text-[var(--color-gfs-text)]'
              }`}>{w === 'all' ? 'All Weeks' : `W${w}`}</button>
          ))}
        </div>
      </div>

      {/* Mission List */}
      <div className="space-y-3">
        {filtered.map((mission, i) => (
          <MissionCard key={mission.id} mission={mission} delay={i * 0.03}
            onClick={() => setCurrentMission(mission.id)} />
        ))}
      </div>
    </div>
  );
}
