// src/pages/ModulePage.tsx
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BookOpen, Clock, BarChart3, ChevronRight, CheckCircle2, Lock,
  Star, Target, ArrowRight, Zap,
} from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { ProgressRing } from '@/components/ui/ProgressRing';
import { useStore } from '@/store/useStore';

export function ModulePage() {
  const { modules, completedModules } = useStore();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [expandedModule, setExpandedModule] = useState<string | null>(null);

  const categories = ['all', ...new Set(modules.map((m) => m.category))];
  const filtered = selectedCategory === 'all' ? modules : modules.filter((m) => m.category === selectedCategory);

  const difficultyColors: Record<string, string> = {
    beginner: 'var(--color-gfs-green)',
    intermediate: 'var(--color-gfs-blue)',
    advanced: 'var(--color-gfs-amber)',
    expert: 'var(--color-gfs-red)',
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-display font-bold text-[var(--color-gfs-text)]">Training Modules</h2>
          <p className="text-xs text-[var(--color-gfs-text-muted)] mt-0.5">
            {completedModules.length} of {modules.length} modules completed
          </p>
        </div>
        <div className="flex items-center gap-2">
          <ProgressRing
            progress={(completedModules.length / modules.length) * 100}
            size={50}
            strokeWidth={3}
          />
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1.5 rounded-lg text-[11px] whitespace-nowrap transition-colors capitalize ${
              selectedCategory === cat
                ? 'bg-[var(--color-gfs-accent-dim)] text-[var(--color-gfs-accent)] border border-[var(--color-gfs-accent)]/30'
                : 'bg-[var(--color-gfs-surface)] text-[var(--color-gfs-text-muted)] hover:text-[var(--color-gfs-text)] border border-transparent'
            }`}
          >
            {cat === 'all' ? `All (${modules.length})` : cat}
          </button>
        ))}
      </div>

      {/* Module Grid */}
      <div className="space-y-2">
        {filtered.map((mod, i) => {
          const isCompleted = completedModules.includes(mod.id);
          const isExpanded = expandedModule === mod.id;
          const isLocked = !mod.unlocked && !isCompleted;

          return (
            <motion.div
              key={mod.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.02 }}
            >
              <Card
                hover
                onClick={() => !isLocked && setExpandedModule(isExpanded ? null : mod.id)}
                className={`!p-4 ${isLocked ? 'opacity-50' : ''} ${isExpanded ? 'border-[var(--color-gfs-accent)]/30' : ''}`}
              >
                <div className="flex items-center gap-4">
                  {/* Module Number */}
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                    isCompleted ? 'bg-[var(--color-gfs-green-dim)]' :
                    isLocked ? 'bg-[var(--color-gfs-elevated)]' :
                    'bg-[var(--color-gfs-accent-dim)]'
                  }`}>
                    {isLocked ? (
                      <Lock className="w-4 h-4 text-[var(--color-gfs-text-muted)]" />
                    ) : isCompleted ? (
                      <CheckCircle2 className="w-4 h-4 text-[var(--color-gfs-green)]" />
                    ) : (
                      <span className="text-sm font-mono font-bold text-[var(--color-gfs-accent)]">{String(mod.number).padStart(2, '0')}</span>
                    )}
                  </div>

                  {/* Module Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-semibold text-[var(--color-gfs-text)]">{mod.title}</h4>
                      <Badge variant="default">{mod.category}</Badge>
                      <Badge variant={
                        mod.difficulty === 'beginner' ? 'success' :
                        mod.difficulty === 'intermediate' ? 'medium' :
                        mod.difficulty === 'advanced' ? 'high' : 'critical'
                      }>
                        {mod.difficulty}
                      </Badge>
                    </div>
                    <p className="text-[11px] text-[var(--color-gfs-text-muted)] mt-0.5 line-clamp-1">{mod.description}</p>
                  </div>

                  {/* Meta */}
                  <div className="flex items-center gap-4 flex-shrink-0">
                    <div className="text-right hidden md:block">
                      <div className="text-[10px] text-[var(--color-gfs-text-muted)] flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {mod.estimatedHours}h
                      </div>
                    </div>
                    <ChevronRight className={`w-4 h-4 text-[var(--color-gfs-text-muted)] transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
                  </div>
                </div>

                {/* Expanded Content */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="pt-4 mt-4 border-t border-[var(--color-gfs-border-light)]">
                        <p className="text-xs text-[var(--color-gfs-text-secondary)] leading-relaxed mb-4">{mod.description}</p>

                        <h5 className="text-[10px] text-[var(--color-gfs-text-muted)] uppercase tracking-wider mb-2">Learning Objectives</h5>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-4">
                          {mod.objectives.map((obj) => (
                            <div key={obj} className="flex items-start gap-2 text-xs text-[var(--color-gfs-text-secondary)]">
                              <Target className="w-3 h-3 text-[var(--color-gfs-accent)] mt-0.5 flex-shrink-0" />
                              {obj}
                            </div>
                          ))}
                        </div>

                        {mod.prerequisites.length > 0 && (
                          <div className="mb-4">
                            <h5 className="text-[10px] text-[var(--color-gfs-text-muted)] uppercase tracking-wider mb-2">Prerequisites</h5>
                            <div className="flex flex-wrap gap-1.5">
                              {mod.prerequisites.map((pre) => {
                                const prereqMod = modules.find((m) => m.id === pre);
                                return (
                                  <Badge key={pre} variant="default">
                                    {prereqMod ? `#${prereqMod.number} ${prereqMod.title}` : pre}
                                  </Badge>
                                );
                              })}
                            </div>
                          </div>
                        )}

                        <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-[var(--color-gfs-accent)] to-[var(--color-gfs-blue)] text-[var(--color-gfs-base)] text-xs font-medium hover:opacity-90 transition-opacity">
                          {isCompleted ? 'Review Module' : 'Start Module'} <ArrowRight className="w-3 h-3" />
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
