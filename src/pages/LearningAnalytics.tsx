// src/pages/LearningAnalytics.tsx
import { motion } from 'framer-motion';
import { BarChart3, Clock, Target, TrendingUp, Brain, Award, BookOpen, Star } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { ProgressRing } from '@/components/ui/ProgressRing';
import { PageHeader } from '@/components/layout/PageHeader';
import { useLearningEngine } from '@/store/useLearningEngine';

export function LearningAnalytics() {
  const getAnalytics = useLearningEngine((s) => s.getAnalytics);
  const analytics = getAnalytics();
  const { skills, totalXP, level, missions, reflections } = useLearningEngine();
  const completedMissions = missions.filter((m) => m.status === 'completed');

  return (
    <div className="space-y-4">
      <PageHeader
        icon={<BarChart3 className="w-5 h-5 text-[var(--color-gfs-accent)]" />}
        title="Learning Analytics"
        subtitle="Your performance dashboard — Executive view"
      />

      {/* Top Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <Card delay={0} className="!p-4">
          <div className="flex items-center gap-3">
            <ProgressRing progress={analytics.promotionReadiness} size={50} strokeWidth={3} />
            <div>
              <div className="text-lg font-display font-bold text-[var(--color-gfs-text)]">{analytics.promotionReadiness}%</div>
              <div className="text-[10px] text-[var(--color-gfs-text-muted)]">Promotion Ready</div>
            </div>
          </div>
        </Card>
        <Card delay={0.05} className="!p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[var(--color-gfs-accent-dim)] flex items-center justify-center">
              <Clock className="w-5 h-5 text-[var(--color-gfs-accent)]" />
            </div>
            <div>
              <div className="text-lg font-display font-bold text-[var(--color-gfs-text)]">{analytics.totalHours.toFixed(1)}h</div>
              <div className="text-[10px] text-[var(--color-gfs-text-muted)]">Hours Invested</div>
            </div>
          </div>
        </Card>
        <Card delay={0.1} className="!p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[var(--color-gfs-green-dim)] flex items-center justify-center">
              <Target className="w-5 h-5 text-[var(--color-gfs-green)]" />
            </div>
            <div>
              <div className="text-lg font-display font-bold text-[var(--color-gfs-text)]">{analytics.averageScore}%</div>
              <div className="text-[10px] text-[var(--color-gfs-text-muted)]">Avg Score</div>
            </div>
          </div>
        </Card>
        <Card delay={0.15} className="!p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[var(--color-gfs-amber-dim)] flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-[var(--color-gfs-amber)]" />
            </div>
            <div>
              <div className="text-lg font-display font-bold text-[var(--color-gfs-text)]">{analytics.skillGrowthPercent}%</div>
              <div className="text-[10px] text-[var(--color-gfs-text-muted)]">Skill Growth</div>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        {/* Skills Radar */}
        <Card delay={0.2} className="!p-4 xl:col-span-2">
          <h3 className="text-xs font-semibold text-[var(--color-gfs-text-secondary)] mb-4">Skills Radar</h3>
          <div className="space-y-3">
            {analytics.skillRadar.map((skill) => (
              <div key={skill.skill}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[11px] text-[var(--color-gfs-text)]">{skill.skill}</span>
                  <span className="text-[10px] text-[var(--color-gfs-text-muted)] font-mono">{skill.level}% → {skill.target}%</span>
                </div>
                <div className="h-2 bg-[var(--color-gfs-elevated)] rounded-full overflow-hidden relative">
                  <motion.div initial={{ width: 0 }} animate={{ width: `${skill.level}%` }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                    className="h-full rounded-full bg-[var(--color-gfs-accent)] absolute" />
                  <div className="h-full rounded-full border border-dashed border-[var(--color-gfs-border)] absolute"
                    style={{ width: `${skill.target}%` }} />
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Quick Stats */}
        <div className="space-y-3">
          <Card delay={0.25} className="!p-4">
            <h3 className="text-xs font-semibold text-[var(--color-gfs-text-secondary)] mb-3">Performance</h3>
            <div className="space-y-2">
              {[
                { label: 'Missions Completed', value: `${analytics.missionsCompleted}/${missions.length}` },
                { label: 'In Progress', value: analytics.missionsInProgress },
                { label: 'Knowledge Retention', value: `${analytics.knowledgeRetention}%` },
                { label: 'Response Time', value: analytics.responseTime },
                { label: 'Investigation Quality', value: `${analytics.investigationQuality}%` },
                { label: 'Notebook Entries', value: '12' },
                { label: 'Reflections', value: reflections.length },
              ].map((stat) => (
                <div key={stat.label} className="flex items-center justify-between text-[11px]">
                  <span className="text-[var(--color-gfs-text-muted)]">{stat.label}</span>
                  <span className="text-[var(--color-gfs-text)] font-mono font-semibold">{stat.value}</span>
                </div>
              ))}
            </div>
          </Card>

          <Card delay={0.3} className="!p-4">
            <h3 className="text-xs font-semibold text-[var(--color-gfs-text-secondary)] mb-3">Tool Proficiency</h3>
            <div className="space-y-2">
              {Object.entries(analytics.toolProficiency).map(([tool, score]) => (
                <div key={tool}>
                  <div className="flex items-center justify-between mb-0.5">
                    <span className="text-[10px] text-[var(--color-gfs-text-muted)]">{tool}</span>
                    <span className="text-[10px] text-[var(--color-gfs-text)] font-mono">{score}%</span>
                  </div>
                  <div className="h-1 bg-[var(--color-gfs-elevated)] rounded-full overflow-hidden">
                    <motion.div initial={{ width: 0 }} animate={{ width: `${score}%` }}
                      transition={{ delay: 0.4, duration: 0.5 }}
                      className="h-full rounded-full bg-[var(--color-gfs-accent)]" />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
