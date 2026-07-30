// src/pages/EthicalHackingPage.tsx
import { Crosshair, Target, Globe, Shield, AlertTriangle, CheckCircle2, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { PageHeader } from '@/components/layout/PageHeader';

const PEN_TESTS = [
  { id: 'PT-2025-003', name: 'Internet Banking External Test', scope: 'ibanking.gfs.com, mobile API', status: 'in-progress', start: 'Jan 15', end: 'Jan 25', findings: 7, critical: 2, team: 'Internal Red Team', type: 'External' },
  { id: 'PT-2025-002', name: 'UPI Gateway API Test', scope: 'UPI API endpoints, merchant portal', status: 'completed', start: 'Jan 5', end: 'Jan 12', findings: 12, critical: 1, team: 'ShadowXLab', type: 'API' },
  { id: 'PT-2025-001', name: 'Network Perimeter Test', scope: 'DMZ, Edge firewalls, VPN gateways', status: 'completed', start: 'Dec 15', end: 'Dec 28', findings: 9, critical: 0, team: 'Internal Red Team', type: 'Network' },
  { id: 'PT-2024-012', name: 'Physical Security Test', scope: 'Hyderabad DC, Mumbai DC', status: 'completed', start: 'Nov 20', end: 'Nov 25', findings: 4, critical: 0, team: 'ShadowXLab', type: 'Physical' },
];

const FINDINGS = [
  { severity: 'critical', title: 'SQL Injection on Internet Banking Login', cwe: 'CWE-89', status: 'remediation', cvss: 9.8, affected: 'ibanking.gfs.com/login' },
  { severity: 'critical', title: 'Authentication Bypass on UPI API', cwe: 'CWE-287', status: 'remediation', cvss: 9.4, affected: 'api.gfs.com/v2/upi/*' },
  { severity: 'high', title: 'Stored XSS in Account Statement', cwe: 'CWE-79', status: 'open', cvss: 8.2, affected: 'ibanking.gfs.com/statements' },
  { severity: 'medium', title: 'Information Disclosure in Error Pages', cwe: 'CWE-200', status: 'fixed', cvss: 5.3, affected: '*.gfs.com/error' },
];

const ATTACK_SURFACE = [
  { asset: 'ibanking.gfs.com', type: 'Web Application', ports: '443', risk: 'high', lastTested: 'Jan 2025' },
  { asset: 'api.gfs.com', type: 'API Gateway', ports: '443, 8443', risk: 'critical', lastTested: 'Jan 2025' },
  { asset: 'mail.gfs.com', type: 'Email', ports: '443, 993', risk: 'medium', lastTested: 'Dec 2024' },
  { asset: 'vpn.gfs.com', type: 'VPN Gateway', ports: '443, 1194', risk: 'high', lastTested: 'Dec 2024' },
  { asset: 'careers.gfs.com', type: 'Careers Portal', ports: '443', risk: 'low', lastTested: 'Nov 2024' },
];

const sevColor: Record<string, 'critical' | 'high' | 'medium' | 'success'> = {
  critical: 'critical', high: 'high', medium: 'medium', low: 'success',
};

export function EthicalHackingPage() {
  return (
    <div className="space-y-4">
      <PageHeader
        icon={<Crosshair className="w-5 h-5 text-[var(--color-gfs-accent)]" />}
        title="Ethical Hacking"
        subtitle="Red Team Operations — 4 engagements, 32 findings, 3 critical"
      />

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        {/* Pen Tests */}
        <div className="xl:col-span-2">
          <Card delay={0} className="!p-0 overflow-hidden">
            <div className="px-4 py-2.5 border-b border-[var(--color-gfs-border-light)] flex items-center gap-2">
              <Target className="w-3.5 h-3.5 text-[var(--color-gfs-red)]" />
              <span className="text-xs font-semibold text-[var(--color-gfs-text)]">Penetration Tests</span>
            </div>
            <div className="divide-y divide-[var(--color-gfs-border-light)]">
              {PEN_TESTS.map((pt, i) => (
                <motion.div key={pt.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.05 }}
                  className="px-4 py-3 hover:bg-[var(--color-gfs-hover)]">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] font-semibold text-[var(--color-gfs-text)]">{pt.name}</span>
                        <Badge variant={pt.status === 'in-progress' ? 'accent' : 'success'}>{pt.status}</Badge>
                        <Badge variant="default">{pt.type}</Badge>
                      </div>
                      <p className="text-[10px] text-[var(--color-gfs-text-muted)] mt-0.5">Scope: {pt.scope}</p>
                      <div className="flex items-center gap-3 mt-1 text-[9px] text-[var(--color-gfs-text-muted)]">
                        <span>{pt.start} → {pt.end}</span>
                        <span>Team: {pt.team}</span>
                        <span>{pt.findings} findings ({pt.critical} critical)</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </Card>
        </div>

        <div className="space-y-4">
          {/* Attack Surface */}
          <Card delay={0.1} className="!p-4">
            <div className="flex items-center gap-2 mb-3">
              <Globe className="w-3.5 h-3.5 text-[var(--color-gfs-blue)]" />
              <span className="text-xs font-semibold text-[var(--color-gfs-text)]">Attack Surface</span>
            </div>
            <div className="space-y-2">
              {ATTACK_SURFACE.map((a) => (
                <div key={a.asset} className="p-2.5 rounded-lg bg-[var(--color-gfs-elevated)]">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono text-[var(--color-gfs-text)]">{a.asset}</span>
                    <Badge variant={sevColor[a.risk]}>{a.risk}</Badge>
                  </div>
                  <div className="text-[9px] text-[var(--color-gfs-text-muted)]">{a.type} • Ports: {a.ports}</div>
                </div>
              ))}
            </div>
          </Card>

          {/* Open Findings */}
          <Card delay={0.15} className="!p-4">
            <span className="text-[10px] text-[var(--color-gfs-text-muted)] uppercase tracking-wider">Open Findings</span>
            <div className="space-y-2 mt-2">
              {FINDINGS.filter((f) => f.status !== 'fixed').map((f, i) => (
                <div key={i} className="p-2 rounded bg-[var(--color-gfs-elevated)]">
                  <div className="flex items-center gap-1">
                    <Badge variant={sevColor[f.severity]}>{f.severity}</Badge>
                    <span className="text-[10px] font-semibold text-[var(--color-gfs-text)]">{f.title}</span>
                  </div>
                  <div className="text-[9px] text-[var(--color-gfs-text-muted)] mt-0.5">{f.cwe} • CVSS: {f.cvss} • {f.affected}</div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
