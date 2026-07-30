import { Zap, ChevronRight, ArrowRight, Shield, Terminal } from 'lucide-react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { PageHeader } from '@/components/layout/PageHeader';
import { ATTACK_CHAINS } from '@/data/attackChains';

export function AttackChainsPage() {
  return (
    <div className="space-y-4">
      <PageHeader
        icon={<Zap className="w-5 h-5 text-[var(--color-gfs-accent)]" />}
        title="Attack Chains"
        subtitle="End-to-end offensive workflows — from reconnaissance through reporting"
      />

      {ATTACK_CHAINS.map((chain) => (
        <Card key={chain.id} delay={0} className="!p-4">
          <div className="flex items-center gap-3 mb-4">
            <Zap className="w-4 h-4 text-[var(--color-gfs-accent)]" />
            <div>
              <span className="text-[12px] font-semibold text-[var(--color-gfs-text)]">{chain.name}</span>
              <p className="text-[10px] text-[var(--color-gfs-text-muted)]">{chain.description}</p>
            </div>
          </div>

          <div className="flex items-center gap-1 overflow-x-auto pb-2">
            {chain.stages.map((stage, i) => (
              <div key={stage.order} className="flex items-center gap-1 flex-shrink-0">
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.05 }}
                  className="p-2 rounded-lg bg-[var(--color-gfs-elevated)] border border-[var(--color-gfs-border-light)] min-w-[140px]">
                  <div className="flex items-center gap-1 mb-1">
                    <span className="w-4 h-4 rounded bg-[var(--color-gfs-accent-dim)] flex items-center justify-center text-[7px] font-mono font-bold text-[var(--color-gfs-accent)]">
                      {stage.order}
                    </span>
                    <span className="text-[9px] font-semibold text-[var(--color-gfs-text)]">{stage.tool}</span>
                  </div>
                  <p className="text-[8px] text-[var(--color-gfs-text-muted)] line-clamp-2">{stage.objective}</p>
                  {stage.command && (
                    <code className="text-[7px] font-mono text-[var(--color-gfs-green)] block mt-1 truncate">${stage.command.slice(0, 30)}...</code>
                  )}
                </motion.div>
                {i < chain.stages.length - 1 && (
                  <ArrowRight className="w-3 h-3 text-[var(--color-gfs-border)] flex-shrink-0" />
                )}
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-1 mt-2">
            {chain.mitreMapping.map((m) => <Badge key={m} variant="default">{m}</Badge>)}
          </div>
        </Card>
      ))}
    </div>
  );
}
