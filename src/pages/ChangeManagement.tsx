import { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Clock, User, Shield, CheckCircle2, AlertTriangle } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { useStore } from '@/store/useStore';
import { PageHeader } from '@/components/layout/PageHeader';

export function ChangeManagement() {
  const { changes } = useStore();
  const [selected, setSelected] = useState(changes[0]);

  return (
    <div className="space-y-4">
      <PageHeader
        icon={<FileText className="w-5 h-5 text-[var(--color-gfs-accent)]" />}
        title="Change Management"
        subtitle="ServiceNow — Change Requests & Approval Workflow"
      />

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <Card delay={0.05} className="!p-0 overflow-hidden max-h-[600px] overflow-y-auto">
          {changes.map((change, i) => (
            <motion.div key={change.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }}
              onClick={() => setSelected(change)}
              className={`px-4 py-3 border-b border-[var(--color-gfs-border-light)] cursor-pointer transition-colors ${
                selected?.id === change.id ? 'bg-[var(--color-gfs-accent-dim)]' : 'hover:bg-[var(--color-gfs-hover)]'
              }`}>
              <div className="flex items-center gap-2 mb-1">
                <Badge variant={change.type === 'emergency' ? 'critical' : change.type === 'normal' ? 'medium' : 'default'}>
                  {change.type.toUpperCase()}
                </Badge>
                <span className="text-[10px] font-mono text-[var(--color-gfs-text-muted)]">{change.id}</span>
              </div>
              <p className="text-xs text-[var(--color-gfs-text)] font-medium">{change.title}</p>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant={change.status === 'implemented' ? 'success' : change.status === 'approved' ? 'accent' : 'default'}>
                  {change.status}
                </Badge>
                <span className="text-[10px] text-[var(--color-gfs-text-muted)]">Risk: {change.risk}</span>
              </div>
            </motion.div>
          ))}
        </Card>

        <Card delay={0.1} className="xl:col-span-2 !p-5 max-h-[600px] overflow-y-auto">
          {selected && (
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-mono text-[var(--color-gfs-accent)]">{selected.id}</span>
                  <h3 className="text-sm font-semibold text-[var(--color-gfs-text)] mt-1">{selected.title}</h3>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={selected.type === 'emergency' ? 'critical' : 'default'}>{selected.type.toUpperCase()}</Badge>
                  <Badge variant={selected.status === 'implemented' ? 'success' : selected.status === 'approved' ? 'accent' : 'default'}>{selected.status.toUpperCase()}</Badge>
                </div>
              </div>

              <div className="p-3 rounded-lg bg-[var(--color-gfs-surface)] border border-[var(--color-gfs-border-light)]">
                <h4 className="text-[10px] text-[var(--color-gfs-text-muted)] uppercase mb-2">Description</h4>
                <p className="text-xs text-[var(--color-gfs-text-secondary)] leading-relaxed">{selected.description}</p>
              </div>

              <div className="p-3 rounded-lg bg-[var(--color-gfs-surface)] border border-[var(--color-gfs-border-light)]">
                <h4 className="text-[10px] text-[var(--color-gfs-text-muted)] uppercase mb-2">Justification</h4>
                <p className="text-xs text-[var(--color-gfs-text-secondary)] leading-relaxed">{selected.justification}</p>
              </div>

              <div className="p-3 rounded-lg bg-[var(--color-gfs-surface)] border border-[var(--color-gfs-border-light)]">
                <h4 className="text-[10px] text-[var(--color-gfs-text-muted)] uppercase mb-2">Rollback Plan</h4>
                <p className="text-xs text-[var(--color-gfs-text-secondary)] leading-relaxed">{selected.rollbackPlan}</p>
              </div>

              <div>
                <h4 className="text-[10px] text-[var(--color-gfs-text-muted)] uppercase mb-2">Affected Systems</h4>
                <div className="flex flex-wrap gap-1.5">
                  {selected.affectedSystems.map((sys) => (
                    <Badge key={sys} variant="default">{sys}</Badge>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3 pt-2">
                <div className="p-2 rounded-lg bg-[var(--color-gfs-elevated)]">
                  <div className="text-[9px] text-[var(--color-gfs-text-muted)] uppercase">Risk Level</div>
                  <div className="text-xs text-[var(--color-gfs-text)] mt-0.5 capitalize">{selected.risk}</div>
                </div>
                <div className="p-2 rounded-lg bg-[var(--color-gfs-elevated)]">
                  <div className="text-[9px] text-[var(--color-gfs-text-muted)] uppercase">Planned Date</div>
                  <div className="text-xs text-[var(--color-gfs-text)] mt-0.5">{new Date(selected.plannedDate).toLocaleString()}</div>
                </div>
                <div className="p-2 rounded-lg bg-[var(--color-gfs-elevated)]">
                  <div className="text-[9px] text-[var(--color-gfs-text-muted)] uppercase">Change Manager</div>
                  <div className="text-xs text-[var(--color-gfs-text)] mt-0.5">{selected.changeManager}</div>
                </div>
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
