// src/pages/PurpleTeamPage.tsx
import { Blend, Target, Shield, CheckCircle2, AlertTriangle, TrendingUp, BarChart3 } from 'lucide-react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { PageHeader } from '@/components/layout/PageHeader';

const EMULATION_PLANS = [
  { name: 'Phishing + Lateral Movement', status: 'completed', date: 'Jan 10, 2025', detections: { total: 6, detected: 4, missed: 2 }, description: 'Simulated Silk Typhoon phishing campaign with credential harvesting and lateral movement' },
  { name: 'Ransomware Deployment', status: 'completed', date: 'Jan 5, 2025', detections: { total: 4, detected: 4, missed: 0 }, description: 'Controlled LockBit 3.0 deployment to test Falcon containment and SOAR response' },
  { name: 'DNS Tunneling C2', status: 'in-progress', date: 'Jan 18, 2025', detections: { total: 5, detected: 2, missed: 3 }, description: 'Simulated DNS-based C2 channel to test Palo Alto and Sentinel detection rules' },
  { name: 'SQL Injection + WAF Bypass', status: 'planned', date: 'Jan 25, 2025', detections: { total: 0, detected: 0, missed: 0 }, description: 'Test WAF rule effectiveness against advanced SQL injection encoding techniques' },
];

const DETECTION_MATRIX = [
  { technique: 'T1566 — Phishing', covered: true, detected: true, mitre: 'Initial Access', coverage: 100 },
  { technique: 'T1059.001 — PowerShell', covered: true, detected: true, mitre: 'Execution', coverage: 95 },
  { technique: 'T1110 — Brute Force', covered: true, detected: true, mitre: 'Credential Access', coverage: 100 },
  { technique: 'T1021 — Remote Services', covered: true, detected: false, mitre: 'Lateral Movement', coverage: 60 },
  { technique: 'T1486 — Ransomware', covered: true, detected: true, mitre: 'Impact', coverage: 100 },
  { technique: 'T1071.004 — DNS C2', covered: true, detected: false, mitre: 'C2', coverage: 45 },
  { technique: 'T1190 — Exploit Public App', covered: true, detected: true, mitre: 'Initial Access', coverage: 80 },
  { technique: 'T1048 — Exfil Alt Protocol', covered: true, detected: false, mitre: 'Exfiltration', coverage: 35 },
];

export function PurpleTeamPage() {
  return (
    <div className="space-y-4">
      <PageHeader
        icon={<Blend className="w-5 h-5 text-[var(--color-gfs-accent)]" />}
        title="Purple Team Operations"
        subtitle="Detection validation — 4 emulation plans, 86% overall detection rate"
      />

      {/* Emulation Plans */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {EMULATION_PLANS.map((plan, i) => (
          <motion.div key={plan.name} initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
            <Card delay={0} className="!p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-semibold text-[var(--color-gfs-text)]">{plan.name}</span>
                <Badge variant={plan.status === 'completed' ? 'success' : plan.status === 'in-progress' ? 'accent' : 'default'}>{plan.status}</Badge>
              </div>
              <p className="text-[10px] text-[var(--color-gfs-text-muted)]">{plan.description}</p>
              {plan.detections.total > 0 && (
                <div className="mt-3 flex items-center gap-4">
                  <div className="flex-1 h-2 bg-[var(--color-gfs-elevated)] rounded-full overflow-hidden">
                    <div className="h-full bg-[var(--color-gfs-green)] rounded-full" style={{ width: `${(plan.detections.detected / plan.detections.total) * 100}%` }} />
                  </div>
                  <span className="text-[10px] text-[var(--color-gfs-text-muted)]">
                    {plan.detections.detected}/{plan.detections.total} detected
                  </span>
                  {plan.detections.missed > 0 && (
                    <span className="text-[10px] text-[var(--color-gfs-red)]">{plan.detections.missed} missed</span>
                  )}
                </div>
              )}
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Detection Matrix */}
      <Card delay={0.1} className="!p-0 overflow-hidden">
        <div className="px-4 py-2.5 border-b border-[var(--color-gfs-border-light)] flex items-center gap-2">
          <Target className="w-3.5 h-3.5 text-[var(--color-gfs-purple)]" />
          <span className="text-xs font-semibold text-[var(--color-gfs-text)]">MITRE ATT&CK Detection Coverage</span>
        </div>
        <div className="divide-y divide-[var(--color-gfs-border-light)]">
          {DETECTION_MATRIX.map((det, i) => (
            <motion.div key={det.technique} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }}
              className="px-4 py-2.5 flex items-center gap-4 hover:bg-[var(--color-gfs-hover)]">
              <span className="text-[11px] text-[var(--color-gfs-text)] flex-1">{det.technique}</span>
              <span className="text-[10px] text-[var(--color-gfs-text-muted)] w-24">{det.mitre}</span>
              <div className="w-24 h-1.5 bg-[var(--color-gfs-elevated)] rounded-full overflow-hidden">
                <div className="h-full rounded-full" style={{
                  width: `${det.coverage}%`,
                  background: det.coverage > 80 ? 'var(--color-gfs-green)' : det.coverage > 50 ? 'var(--color-gfs-amber)' : 'var(--color-gfs-red)',
                }} />
              </div>
              <span className="text-[10px] font-mono w-10 text-right" style={{
                color: det.coverage > 80 ? 'var(--color-gfs-green)' : det.coverage > 50 ? 'var(--color-gfs-amber)' : 'var(--color-gfs-red)',
              }}>{det.coverage}%</span>
              {det.detected ? (
                <CheckCircle2 className="w-3.5 h-3.5 text-[var(--color-gfs-green)]" />
              ) : (
                <AlertTriangle className="w-3.5 h-3.5 text-[var(--color-gfs-red)]" />
              )}
            </motion.div>
          ))}
        </div>
      </Card>
    </div>
  );
}
