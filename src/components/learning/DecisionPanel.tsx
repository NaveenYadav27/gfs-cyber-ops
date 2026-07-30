// src/components/learning/DecisionPanel.tsx
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, CheckCircle2, XCircle, Shield, ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import type { Decision } from '@/types/learning';

interface DecisionPanelProps {
  decisions: Decision[];
  onDecision?: (decisionId: string, optionId: string) => void;
}

export function DecisionPanel({ decisions, onDecision }: DecisionPanelProps) {
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});
  const [revealed, setRevealed] = useState<Record<string, boolean>>({});

  const handleSelect = (decisionId: string, optionId: string) => {
    if (revealed[decisionId]) return;
    setSelectedOptions((prev) => ({ ...prev, [decisionId]: optionId }));
    setRevealed((prev) => ({ ...prev, [decisionId]: true }));
    onDecision?.(decisionId, optionId);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <AlertTriangle className="w-4 h-4 text-[var(--color-gfs-amber)]" />
        <span className="text-xs font-semibold text-[var(--color-gfs-text)]">Decision Point</span>
      </div>
      {decisions.map((decision) => (
        <div key={decision.id} className="rounded-xl border border-[var(--color-gfs-border-light)] overflow-hidden">
          <div className="px-4 py-3 bg-[var(--color-gfs-amber-dim)]">
            <p className="text-xs text-[var(--color-gfs-text)] leading-relaxed font-medium">{decision.scenario}</p>
            <p className="text-[10px] text-[var(--color-gfs-text-muted)] mt-1">Business Context: {decision.businessContext}</p>
          </div>
          <div className="p-4 space-y-2">
            {decision.options.map((option) => {
              const isSelected = selectedOptions[decision.id] === option.id;
              const isRevealed = revealed[decision.id];
              return (
                <motion.button key={option.id}
                  whileHover={!isRevealed ? { scale: 1.01 } : {}}
                  onClick={() => handleSelect(decision.id, option.id)}
                  className={`w-full p-3 rounded-lg border text-left transition-all ${
                    isRevealed && option.correct ? 'bg-[var(--color-gfs-green-dim)] border-[var(--color-gfs-green)]/30' :
                    isRevealed && isSelected && !option.correct ? 'bg-[var(--color-gfs-red-dim)] border-[var(--color-gfs-red)]/30' :
                    isSelected ? 'bg-[var(--color-gfs-accent-dim)] border-[var(--color-gfs-accent)]/30' :
                    'bg-[var(--color-gfs-surface)] border-[var(--color-gfs-border-light)] hover:bg-[var(--color-gfs-elevated)]'
                  }`}>
                  <div className="flex items-start gap-2">
                    {isRevealed && option.correct ? <CheckCircle2 className="w-4 h-4 text-[var(--color-gfs-green)] flex-shrink-0 mt-0.5" /> :
                     isRevealed && isSelected ? <XCircle className="w-4 h-4 text-[var(--color-gfs-red)] flex-shrink-0 mt-0.5" /> :
                     <div className="w-4 h-4 rounded-full border border-[var(--color-gfs-border)] flex-shrink-0 mt-0.5" />}
                    <div>
                      <span className="text-[11px] text-[var(--color-gfs-text)]">{option.text}</span>
                      <Badge variant={option.risk === 'low' ? 'success' : option.risk === 'medium' ? 'medium' : 'critical'} className="ml-2">
                        {option.risk} risk
                      </Badge>
                      {isRevealed && (
                        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                          className="text-[10px] text-[var(--color-gfs-text-muted)] mt-1">{option.consequence}</motion.p>
                      )}
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
