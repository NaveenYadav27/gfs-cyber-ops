// src/components/learning/InteractiveTerminal.tsx
import { useState } from 'react';
import { Terminal as TerminalIcon, ChevronRight, CheckCircle2, Copy, Eye } from 'lucide-react';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/Badge';
import type { TerminalTask } from '@/types/learning';

interface InteractiveTerminalProps {
  tasks: TerminalTask[];
  onComplete?: (taskIndex: number) => void;
}

export function InteractiveTerminal({ tasks, onComplete }: InteractiveTerminalProps) {
  const [activeTask, setActiveTask] = useState(0);
  const [showOutput, setShowOutput] = useState<Record<number, boolean>>({});
  const [completedTasks, setCompletedTasks] = useState<Set<number>>(new Set());

  const handleShowOutput = (index: number) => {
    setShowOutput((prev) => ({ ...prev, [index]: true }));
    if (!completedTasks.has(index)) {
      const newSet = new Set(completedTasks);
      newSet.add(index);
      setCompletedTasks(newSet);
      onComplete?.(index);
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 mb-2">
        <TerminalIcon className="w-4 h-4 text-[var(--color-gfs-green)]" />
        <span className="text-xs font-semibold text-[var(--color-gfs-text)]">Hands-on Lab</span>
        <Badge variant="default">{completedTasks.size}/{tasks.length} completed</Badge>
      </div>

      {tasks.map((task, i) => (
        <motion.div key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
          <div className="rounded-xl border border-[var(--color-gfs-border-light)] overflow-hidden">
            {/* Description */}
            <div className="px-4 py-2 bg-[var(--color-gfs-elevated)] flex items-center gap-2">
              {completedTasks.has(i) ? (
                <CheckCircle2 className="w-3 h-3 text-[var(--color-gfs-green)]" />
              ) : (
                <span className="w-3 h-3 rounded-full border border-[var(--color-gfs-border)]" />
              )}
              <span className="text-[11px] text-[var(--color-gfs-text-secondary)]">{task.description}</span>
            </div>

            {/* Terminal */}
            <div className="bg-[var(--color-gfs-base)] p-3 font-mono text-[10px]">
              <div className="flex items-center gap-1.5 mb-2">
                <span className="text-[var(--color-gfs-green)]">$</span>
                <span className="text-[var(--color-gfs-text)]">{task.command}</span>
              </div>

              {showOutput[i] ? (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  className="text-[var(--color-gfs-text-muted)] whitespace-pre-wrap border-t border-[var(--color-gfs-border-light)] pt-2 mt-2">
                  {task.output}
                </motion.div>
              ) : (
                <button onClick={() => handleShowOutput(i)}
                  className="flex items-center gap-1.5 text-[var(--color-gfs-accent)] hover:text-[var(--color-gfs-text)] transition-colors mt-2">
                  <Eye className="w-3 h-3" /> Click to execute and see output
                </button>
              )}
            </div>

            {/* Explanation */}
            {showOutput[i] && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className="px-4 py-2.5 bg-[var(--color-gfs-accent-dim)] border-t border-[var(--color-gfs-accent)]/20">
                <span className="text-[9px] text-[var(--color-gfs-accent)] uppercase font-semibold">Analysis</span>
                <p className="text-[10px] text-[var(--color-gfs-text-secondary)] mt-0.5 leading-relaxed">{task.explanation}</p>
              </motion.div>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  );
}
