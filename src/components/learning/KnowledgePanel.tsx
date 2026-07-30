// src/components/learning/KnowledgePanel.tsx
import { useState } from 'react';
import { BookOpen, ChevronDown, Lightbulb, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Badge } from '@/components/ui/Badge';
import type { KnowledgeCard } from '@/types/learning';

interface KnowledgePanelProps {
  cards: KnowledgeCard[];
}

export function KnowledgePanel({ cards }: KnowledgePanelProps) {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2 mb-2">
        <BookOpen className="w-4 h-4 text-[var(--color-gfs-accent)]" />
        <span className="text-xs font-semibold text-[var(--color-gfs-text)]">Knowledge</span>
        <Badge variant="default">{cards.length} concepts</Badge>
      </div>
      {cards.map((card) => (
        <div key={card.id}>
          <button onClick={() => setExpanded(expanded === card.id ? null : card.id)}
            className="w-full p-3 rounded-lg bg-[var(--color-gfs-elevated)] border border-[var(--color-gfs-border-light)] text-left hover:bg-[var(--color-gfs-hover)] transition-colors">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Lightbulb className="w-3 h-3 text-[var(--color-gfs-accent)]" />
                <span className="text-xs font-semibold text-[var(--color-gfs-text)]">{card.title}</span>
                <Badge variant="default">{card.category}</Badge>
              </div>
              <ChevronDown className={`w-3 h-3 text-[var(--color-gfs-text-muted)] transition-transform ${expanded === card.id ? 'rotate-180' : ''}`} />
            </div>
          </button>
          <AnimatePresence>
            {expanded === card.id && (
              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                <div className="p-3 mt-1 rounded-lg bg-[var(--color-gfs-surface)] border border-[var(--color-gfs-border-light)] space-y-2">
                  <p className="text-[11px] text-[var(--color-gfs-text-secondary)] leading-relaxed">{card.content}</p>
                  <div>
                    <span className="text-[9px] text-[var(--color-gfs-text-muted)] uppercase">Key Points</span>
                    <div className="mt-1 space-y-1">
                      {card.keyPoints.map((kp) => (
                        <div key={kp} className="text-[10px] text-[var(--color-gfs-text-secondary)] flex items-center gap-1.5">
                          <div className="w-1 h-1 rounded-full bg-[var(--color-gfs-accent)]" /> {kp}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="p-2 rounded bg-[var(--color-gfs-accent-dim)]">
                    <span className="text-[9px] text-[var(--color-gfs-accent)] uppercase font-semibold">Practical Application</span>
                    <p className="text-[10px] text-[var(--color-gfs-text-secondary)] mt-0.5">{card.practicalApplication}</p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}
