// src/pages/PlaybooksPage.tsx
import { Zap, Play, Clock, CheckCircle2, AlertTriangle, ArrowRight, Settings, FileText } from 'lucide-react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { PageHeader } from '@/components/layout/PageHeader';

const PLAYBOOKS = [
  { id: 'PB-001', name: 'Phishing Response', category: 'Incident Response', steps: 6, avgTime: '22 min', lastExecuted: '2 hr ago', executions: 34, successRate: 97, trigger: 'User report / EOP alert', autoRemediate: false },
  { id: 'PB-002', name: 'Ransomware Containment', category: 'Incident Response', steps: 8, avgTime: '5 min', lastExecuted: '1 hr ago', executions: 3, successRate: 100, trigger: 'Falcon critical detection', autoRemediate: true },
  { id: 'PB-003', name: 'Impossible Travel Response', category: 'Identity', steps: 4, avgTime: '8 min', lastExecuted: '8 min ago', executions: 12, successRate: 100, trigger: 'Azure AD Protection alert', autoRemediate: true },
  { id: 'PB-004', name: 'Suspicious DNS Activity', category: 'Network', steps: 5, avgTime: '15 min', lastExecuted: '1 hr ago', executions: 8, successRate: 88, trigger: 'Palo Alto DNS alert', autoRemediate: false },
  { id: 'PB-005', name: 'New Domain Admin Alert', category: 'Identity', steps: 3, avgTime: '10 min', lastExecuted: '3 hr ago', executions: 2, successRate: 100, trigger: 'Sentinel analytics rule', autoRemediate: true },
  { id: 'PB-006', name: 'UPI Fraud Containment', category: 'Financial', steps: 7, avgTime: '3 min', lastExecuted: '3 days ago', executions: 5, successRate: 100, trigger: 'Velocity anomaly rule', autoRemediate: true },
];

const EXECUTION_HISTORY = [
  { playbook: 'PB-002', name: 'Ransomware Containment', time: '14:22:03', triggered: 'Falcon DET-4201', result: 'success', actions: ['Isolated host', 'Captured memory', 'Blocked C2 IP', 'Created IR ticket'], duration: '4m 12s' },
  { playbook: 'PB-003', name: 'Impossible Travel', time: '08:45:12', triggered: 'Azure AD Protection', result: 'success', actions: ['Disabled account', 'Revoked sessions', 'Notified manager', 'Created ticket'], duration: '7m 45s' },
  { playbook: 'PB-004', name: 'Suspicious DNS', time: '13:45:00', triggered: 'Palo Alto Alert', result: 'partial', actions: ['Sinkholed domain', 'Isolated host', '⚠ Auto-remediation failed — manual step needed'], duration: '14m 22s' },
];

export function PlaybooksPage() {
  return (
    <div className="space-y-4">
      <PageHeader
        icon={<Zap className="w-5 h-5 text-[var(--color-gfs-accent)]" />}
        title="SOAR Playbooks"
        subtitle="Automated response — 6 playbooks, 64 total executions, 98% success rate"
      />

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        {/* Playbook List */}
        <div className="xl:col-span-2">
          <div className="space-y-3">
            {PLAYBOOKS.map((pb, i) => (
              <motion.div key={pb.id} initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                <Card delay={0} className="!p-4 hover:bg-[var(--color-gfs-hover)] transition-colors cursor-pointer">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <Zap className="w-3.5 h-3.5 text-[var(--color-gfs-accent)]" />
                        <span className="text-[11px] font-semibold text-[var(--color-gfs-text)]">{pb.name}</span>
                        <Badge variant="default">{pb.category}</Badge>
                        {pb.autoRemediate && <Badge variant="accent">Auto</Badge>}
                      </div>
                      <p className="text-[10px] text-[var(--color-gfs-text-muted)] mt-0.5">Trigger: {pb.trigger}</p>
                      <div className="flex items-center gap-3 mt-2 text-[9px] text-[var(--color-gfs-text-muted)]">
                        <span>{pb.steps} steps</span>
                        <span>Avg: {pb.avgTime}</span>
                        <span>Executed: {pb.executions}x</span>
                        <span>Success: {pb.successRate}%</span>
                        <span>Last: {pb.lastExecuted}</span>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Execution History */}
        <Card delay={0.1} className="!p-4">
          <div className="flex items-center gap-2 mb-3">
            <Clock className="w-3.5 h-3.5 text-[var(--color-gfs-blue)]" />
            <span className="text-xs font-semibold text-[var(--color-gfs-text)]">Recent Executions</span>
          </div>
          <div className="space-y-3">
            {EXECUTION_HISTORY.map((exec, i) => (
              <motion.div key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.05 }}
                className="p-3 rounded-lg bg-[var(--color-gfs-elevated)] border border-[var(--color-gfs-border-light)]">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-semibold text-[var(--color-gfs-text)]">{exec.name}</span>
                  <Badge variant={exec.result === 'success' ? 'success' : 'high'}>{exec.result}</Badge>
                </div>
                <div className="text-[9px] text-[var(--color-gfs-text-muted)] mt-0.5">{exec.time} • {exec.triggered} • {exec.duration}</div>
                <div className="mt-2 space-y-0.5">
                  {exec.actions.map((action, j) => (
                    <div key={j} className="text-[9px] text-[var(--color-gfs-text-secondary)] flex items-center gap-1">
                      <CheckCircle2 className="w-2.5 h-2.5 text-[var(--color-gfs-green)]" /> {action}
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
