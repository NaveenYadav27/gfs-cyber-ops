import { useState } from 'react';
import { FileText, ChevronRight, Play, Server, AlertTriangle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { PageHeader } from '@/components/layout/PageHeader';

interface RunbookStep { order: number; title: string; instruction: string; automation?: string; command?: string; expectedResult: string; responsible: string; }

interface Runbook {
  id: string;
  title: string;
  severity: string;
  category: string;
  purpose: string;
  triggers: string[];
  steps: RunbookStep[];
  rollback: string[];
  lastTested: string;
  version: string;
}

const RUNBOOKS: Runbook[] = [
  {
    id: 'RB-001', title: 'Ransomware Response', severity: 'P1', category: 'Endpoint',
    purpose: 'Contain and eradicate ransomware across GFS endpoints and file shares.',
    triggers: ['Falcon critical detection — ransomware family', 'User report — encrypted files', 'File share encryption anomaly'],
    steps: [
      { order: 1, title: 'Validate Alert', instruction: 'Open the Falcon detection in the EDR Console. Confirm ransomware process names, file modification rate, and encryption entropy score.', automation: 'Falcon auto-classifies ransomware family', expectedResult: 'Confirmed: LockBit 3.0 — 4,200 files encrypted at 340 files/min', responsible: 'T1 Analyst' },
      { order: 2, title: 'Isolate Host', instruction: 'Apply network isolation via Falcon. Only management traffic permitted. Host remains running for memory forensics.', automation: 'SOAR: Ransomware Containment playbook auto-triggers', expectedResult: 'Host isolated in <5 seconds. All SMB/RDP connections terminated.', responsible: 'SOAR / T1 Analyst' },
      { order: 3, title: 'Capture Memory', instruction: 'Trigger memory dump via Falcon Real-Time Response. Save to forensic evidence share.', automation: 'Falcon auto-captures on isolation', expectedResult: 'Memory dump saved: WRK-LOAN-047_memdump.raw (2.4 GB)', responsible: 'Forensics Team' },
      { order: 4, title: 'Block IOCs', instruction: 'Add all IOCs (IPs, domains, hashes) to Falcon custom IOCs, Palo Alto block list, and Sentinel TI.', automation: 'SOAR: IOC Bulk Block playbook', expectedResult: 'All IOCs blocked across security controls', responsible: 'SOAR' },
    ],
    rollback: ['If isolation causes business impact, coordinate with business unit before lifting'],
    lastTested: '2025-01-10', version: '3.2',
  },
  {
    id: 'RB-002', title: 'Impossible Travel Response', severity: 'P1', category: 'Identity',
    purpose: 'Respond to Azure AD impossible travel alerts indicating credential compromise.',
    triggers: ['Azure AD Protection — Impossible travel alert', 'User report — unrecognized login'],
    steps: [
      { order: 1, title: 'Disable Account', instruction: 'Immediately disable the compromised Azure AD account.', automation: 'SOAR auto-disables account', expectedResult: 'Account disabled in <2 seconds', responsible: 'SOAR' },
      { order: 2, title: 'Revoke Sessions', instruction: 'Revoke all active sessions and refresh tokens for the account.', automation: 'SOAR auto-revokes', expectedResult: 'All sessions terminated', responsible: 'SOAR' },
    ],
    rollback: ['If legitimate travel confirmed, re-enable account after verification'],
    lastTested: '2025-01-12', version: '2.1',
  }
];

export function SOCRunbooks() {
  const [selectedRunbook, setSelectedRunbook] = useState<Runbook | null>(null);
  const [expandedStep, setExpandedStep] = useState<number | null>(null);

  return (
    <div className="space-y-4">
      <PageHeader icon={<FileText className="w-5 h-5 text-[var(--color-gfs-accent)]" />} title="Runbooks" subtitle="SOC Operational Procedures — Step-by-Step" />

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <div className="space-y-2">
          {RUNBOOKS.map((rb) => (
            <Card key={rb.id} delay={0} hover onClick={() => { setSelectedRunbook(rb); setExpandedStep(null); }}
              className={`!p-3 cursor-pointer ${selectedRunbook?.id === rb.id ? '!border-[var(--color-gfs-accent)]/30' : ''}`}>
              <div className="flex items-center gap-2">
                <Badge variant={rb.severity === 'P1' ? 'critical' : 'high'}>{rb.severity}</Badge>
                <span className="text-[11px] font-semibold text-[var(--color-gfs-text)]">{rb.title}</span>
              </div>
              <div className="text-[9px] text-[var(--color-gfs-text-muted)] mt-0.5">{rb.category} • {rb.steps.length} steps • v{rb.version} • Tested: {rb.lastTested}</div>
            </Card>
          ))}
        </div>

        <div className="xl:col-span-2">
          {selectedRunbook ? (
            <div className="space-y-3">
              <Card delay={0} className="!p-4">
                <h2 className="text-sm font-display font-bold text-[var(--color-gfs-text)]">{selectedRunbook.title}</h2>
                <p className="text-[11px] text-[var(--color-gfs-text-secondary)] mt-1">{selectedRunbook.purpose}</p>
                <div className="mt-2">
                  <span className="gfs-text-label">Triggers</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {selectedRunbook.triggers.map((t, i) => <Badge key={i} variant="default">{t}</Badge>)}
                  </div>
                </div>
              </Card>

              {selectedRunbook.steps.map((step) => (
                <Card key={step.order} delay={0} className="!p-4 cursor-pointer" onClick={() => setExpandedStep(expandedStep === step.order ? null : step.order)}>
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-full bg-[var(--color-gfs-accent-dim)] flex items-center justify-center text-[10px] font-mono font-bold text-[var(--color-gfs-accent)]">{step.order}</span>
                    <div className="flex-1">
                      <span className="text-[11px] font-semibold text-[var(--color-gfs-text)]">{step.title}</span>
                      <span className="text-[9px] text-[var(--color-gfs-text-muted)] ml-2">{step.responsible}</span>
                    </div>
                    {step.automation && <Badge variant="accent">Auto</Badge>}
                    <ChevronRight className={`w-4 h-4 text-[var(--color-gfs-text-muted)] transition-transform ${expandedStep === step.order ? 'rotate-90' : ''}`} />
                  </div>
                  <AnimatePresence>
                    {expandedStep === step.order && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                        <div className="mt-3 pt-3 border-t border-[var(--color-gfs-border-light)] space-y-2">
                          <p className="text-[10px] text-[var(--color-gfs-text-secondary)]">{step.instruction}</p>
                          {step.command && <pre className="p-2 rounded bg-[#0d1117] text-[10px] font-mono text-[var(--color-gfs-green)]">{step.command}</pre>}
                          <div className="p-2 rounded bg-[var(--color-gfs-green-dim)]"><span className="text-[9px] text-[var(--color-gfs-green)]">Expected: </span><span className="text-[10px] text-[var(--color-gfs-text-secondary)]">{step.expectedResult}</span></div>
                          {step.automation && <div className="p-2 rounded bg-[var(--color-gfs-accent-dim)]"><span className="text-[9px] text-[var(--color-gfs-accent)]">Automation: </span><span className="text-[10px] text-[var(--color-gfs-text-secondary)]">{step.automation}</span></div>}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Card>
              ))}
            </div>
          ) : (
            <Card delay={0} className="!p-12 text-center">
              <FileText className="w-8 h-8 text-[var(--color-gfs-text-muted)] mx-auto mb-3 opacity-30" />
              <p className="text-[11px] text-[var(--color-gfs-text-muted)]">Select a runbook to view step-by-step procedures</p>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
