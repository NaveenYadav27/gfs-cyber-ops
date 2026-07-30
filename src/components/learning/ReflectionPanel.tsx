// src/components/learning/ReflectionPanel.tsx
import { motion } from 'framer-motion';
import { MessageCircle, Lightbulb, Briefcase, User, TrendingUp } from 'lucide-react';
import type { ReflectionPrompt } from '@/types/learning';

const typeConfig: Record<string, { icon: React.ElementType; color: string; label: string }> = {
  technical: { icon: Lightbulb, color: 'var(--color-gfs-accent)', label: 'Technical Lesson' },
  business: { icon: Briefcase, color: 'var(--color-gfs-amber)', label: 'Business Impact' },
  career: { icon: TrendingUp, color: 'var(--color-gfs-purple)', label: 'Career Takeaway' },
  communication: { icon: MessageCircle, color: 'var(--color-gfs-blue)', label: 'Communication' },
};

interface ReflectionPanelProps {
  prompts: ReflectionPrompt[];
}

export function ReflectionPanel({ prompts }: ReflectionPanelProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <MessageCircle className="w-4 h-4 text-[var(--color-gfs-accent)]" />
        <span className="text-xs font-semibold text-[var(--color-gfs-text)]">Reflection</span>
      </div>
      {prompts.map((prompt, i) => {
        const config = typeConfig[prompt.type] || typeConfig.technical;
        const Icon = config.icon;
        return (
          <motion.div key={i} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className="p-3 rounded-lg bg-[var(--color-gfs-surface)] border border-[var(--color-gfs-border-light)]">
            <div className="flex items-center gap-2 mb-1.5">
              <Icon className="w-3 h-3" style={{ color: config.color }} />
              <span className="text-[10px] font-semibold" style={{ color: config.color }}>{config.label}</span>
            </div>
            <p className="text-[11px] text-[var(--color-gfs-text-secondary)]">{prompt.question}</p>
          </motion.div>
        );
      })}
    </div>
  );
}
