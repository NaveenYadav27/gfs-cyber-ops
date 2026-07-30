import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, ChevronDown, Shield, CheckCircle2, AlertTriangle, FileText } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { PageHeader } from '@/components/layout/PageHeader';
import { COMPANY_POLICIES } from '@/data/enterprise-organization';

export function CompanyPolicies() {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <div className="space-y-4">
      <PageHeader
        icon={<BookOpen className="w-5 h-5 text-[var(--color-gfs-accent)]" />}
        title="GFS Policies & Culture"
        subtitle="Information Security policies, Code of Conduct, and company culture"
      />

      <div className="space-y-2">
        {COMPANY_POLICIES.map((policy, i) => {
          const isExpanded = expanded === policy.id;
          return (
            <motion.div key={policy.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}>
              <Card hover onClick={() => setExpanded(isExpanded ? null : policy.id)}
                className={`!p-4 cursor-pointer ${isExpanded ? '!border-[var(--color-gfs-accent)]/30' : ''}`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[var(--color-gfs-accent-dim)] flex items-center justify-center flex-shrink-0">
                      <FileText className="w-4 h-4 text-[var(--color-gfs-accent)]" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-semibold text-[var(--color-gfs-text)]">{policy.title}</h4>
                        <Badge variant="default">v{policy.version}</Badge>
                        <Badge variant="accent">{policy.category}</Badge>
                      </div>
                      <p className="text-[10px] text-[var(--color-gfs-text-muted)] mt-0.5">Owner: {policy.owner} • Applies to: {policy.applicableTo}</p>
                    </div>
                  </div>
                  <ChevronDown className={`w-4 h-4 text-[var(--color-gfs-text-muted)] transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                </div>

                <AnimatePresence>
                  {isExpanded && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
                      className="mt-4 pt-4 border-t border-[var(--color-gfs-border-light)] space-y-3">
                      <p className="text-xs text-[var(--color-gfs-text-secondary)] leading-relaxed">{policy.summary}</p>
                      <div>
                        <h5 className="text-[10px] text-[var(--color-gfs-text-muted)] uppercase tracking-wider mb-2">Key Points</h5>
                        <div className="space-y-1.5">
                          {policy.keyPoints.map((point, pi) => (
                            <div key={pi} className="flex items-start gap-2 text-[11px] text-[var(--color-gfs-text-secondary)]">
                              <CheckCircle2 className="w-3 h-3 text-[var(--color-gfs-green)] mt-0.5 flex-shrink-0" />
                              {point}
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="flex items-center gap-3 text-[10px] text-[var(--color-gfs-text-muted)]">
                        <span>Last Updated: {policy.lastUpdated}</span>
                        <span>Version: {policy.version}</span>
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
