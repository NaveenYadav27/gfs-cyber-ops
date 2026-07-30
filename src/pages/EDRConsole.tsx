// src/pages/EDRConsole.tsx
import { useState } from 'react';
import {
  Shield, Monitor, AlertTriangle, Search, Terminal, Wifi, WifiOff,
  CheckCircle2, XCircle, Clock, Eye, Zap, ChevronRight,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { PageHeader } from '@/components/layout/PageHeader';

const FLEET_STATS = [
  { label: 'Total Endpoints', value: '42,100', color: 'var(--color-gfs-text)' },
  { label: 'Protected', value: '41,892', color: 'var(--color-gfs-green)' },
  { label: 'Unhealthy', value: '187', color: 'var(--color-gfs-amber)' },
  { label: 'Offline', value: '21', color: 'var(--color-gfs-red)' },
  { label: 'Detected Threats (24h)', value: '7', color: 'var(--color-gfs-red)' },
  { label: 'Blocked (24h)', value: '342', color: 'var(--color-gfs-accent)' },
];

const DETECTION_EVENTS = [
  { id: 'DET-4201', time: '14:22:03', severity: 'critical', host: 'WRK-LOAN-047', user: 'system', technique: 'T1486 — Data Encrypted for Impact', action: 'CONTAINED', details: 'LockBit 3.0 ransomware — file encryption halted by Falcon. 4,200 files affected.' },
  { id: 'DET-4200', time: '14:21:58', severity: 'high', host: 'WRK-LOAN-047', user: 'system', technique: 'T1059.001 — PowerShell', action: 'KILLED', details: 'Encoded PowerShell launched by Outlook.exe — stage2.ps1 downloaded from cdn-gfs-updates.com' },
  { id: 'DET-4199', time: '13:45:12', severity: 'high', host: 'WRK-TREASURY-023', user: 'SYSTEM', technique: 'T1071.004 — DNS', action: 'BLOCKED', details: 'DNS tunneling detected — 14,200 TXT queries to ddns-resolver.net' },
  { id: 'DET-4198', time: '11:30:00', severity: 'medium', host: 'SRV-APP-015', user: 'svc-webapp', technique: 'T1053.005 — Scheduled Task', action: 'MONITORING', details: 'New scheduled task created — investigating legitimacy' },
  { id: 'DET-4197', time: '10:15:00', severity: 'low', host: 'WRK-CARDS-012', user: 's.reddy', technique: 'T1204.002 — User Execution', action: 'INVESTIGATING', details: 'User executed unknown PowerShell script from email attachment' },
];

const HOST_DETAILS = [
  { hostname: 'WRK-LOAN-047', ip: '10.20.5.47', os: 'Windows 11 23H2', dept: 'Loans & Advances', user: 'Loan Processing', status: 'contained', falcon: '6.45.16204', lastSeen: '14:22:05', threats: 3 },
  { hostname: 'WRK-TREASURY-023', ip: '10.10.20.23', os: 'Windows 10 22H2', dept: 'Treasury', user: 'Treasury Ops', status: 'suspicious', falcon: '6.45.16204', lastSeen: '14:20:00', threats: 1 },
  { hostname: 'WRK-CARDS-012', ip: '10.10.15.203', os: 'Windows 11 23H2', dept: 'Cards & Payments', user: 's.reddy', status: 'investigating', falcon: '6.45.16204', lastSeen: '14:18:00', threats: 1 },
  { hostname: 'SRV-APP-015', ip: '10.30.0.15', os: 'Windows Server 2022', dept: 'Digital Banking', user: 'svc-webapp', status: 'monitoring', falcon: '6.45.16204', lastSeen: '14:10:00', threats: 0 },
];

const hostStatusColor: Record<string, { bg: string; text: string; badge: 'critical' | 'high' | 'medium' | 'success' }> = {
  contained: { bg: 'var(--color-gfs-red-dim)', text: 'var(--color-gfs-red)', badge: 'critical' },
  suspicious: { bg: 'var(--color-gfs-amber-dim)', text: 'var(--color-gfs-amber)', badge: 'high' },
  investigating: { bg: 'var(--color-gfs-blue-dim)', text: 'var(--color-gfs-blue)', badge: 'medium' },
  monitoring: { bg: 'var(--color-gfs-surface)', text: 'var(--color-gfs-text-muted)', badge: 'success' },
  healthy: { bg: 'var(--color-gfs-green-dim)', text: 'var(--color-gfs-green)', badge: 'success' },
};

export function EDRConsole() {
  const [selectedHost, setSelectedHost] = useState<string | null>(null);

  return (
    <div className="space-y-4">
      <PageHeader
        icon={<Shield className="w-5 h-5 text-[var(--color-gfs-accent)]" />}
        title="EDR Console"
        subtitle="CrowdStrike Falcon — 42,100 endpoints protected"
        badge={<Badge variant="success">FALCON ACTIVE</Badge>}
      />

      {/* Fleet Stats */}
      <div className="grid grid-cols-3 lg:grid-cols-6 gap-3">
        {FLEET_STATS.map((s, i) => (
          <Card key={s.label} delay={i * 0.03} className="!p-3">
            <div className="text-[10px] text-[var(--color-gfs-text-muted)]">{s.label}</div>
            <div className="text-lg font-display font-bold mt-0.5" style={{ color: s.color }}>{s.value}</div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-5 gap-4">
        {/* Detection Events */}
        <div className="xl:col-span-3">
          <Card delay={0.1} className="!p-0 overflow-hidden">
            <div className="px-4 py-2.5 border-b border-[var(--color-gfs-border-light)] flex items-center gap-2">
              <AlertTriangle className="w-3.5 h-3.5 text-[var(--color-gfs-amber)]" />
              <span className="text-xs font-semibold text-[var(--color-gfs-text)]">Detection Events</span>
              <Badge variant="default">{DETECTION_EVENTS.length} in 24h</Badge>
            </div>
            <div className="divide-y divide-[var(--color-gfs-border-light)]">
              {DETECTION_EVENTS.map((evt, i) => (
                <motion.div key={evt.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.04 }}
                  className="px-4 py-3 hover:bg-[var(--color-gfs-hover)] transition-colors cursor-pointer">
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-mono text-[var(--color-gfs-text-muted)] w-16 flex-shrink-0">{evt.time}</span>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-[11px] font-semibold text-[var(--color-gfs-text)]">{evt.technique}</span>
                        <Badge variant={
                          evt.action === 'CONTAINED' ? 'critical' : evt.action === 'KILLED' ? 'high' :
                          evt.action === 'BLOCKED' ? 'medium' : 'default'
                        }>{evt.action}</Badge>
                      </div>
                      <p className="text-[10px] text-[var(--color-gfs-text-muted)] mt-0.5">{evt.host} • {evt.user}</p>
                      <p className="text-[10px] text-[var(--color-gfs-text-secondary)] mt-0.5">{evt.details}</p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-[var(--color-gfs-text-muted)] flex-shrink-0" />
                  </div>
                </motion.div>
              ))}
            </div>
          </Card>
        </div>

        {/* Host Fleet */}
        <div className="xl:col-span-2">
          <Card delay={0.15} className="!p-0 overflow-hidden">
            <div className="px-4 py-2.5 border-b border-[var(--color-gfs-border-light)] flex items-center gap-2">
              <Monitor className="w-3.5 h-3.5 text-[var(--color-gfs-blue)]" />
              <span className="text-xs font-semibold text-[var(--color-gfs-text)]">Flagged Hosts</span>
            </div>
            <div className="divide-y divide-[var(--color-gfs-border-light)]">
              {HOST_DETAILS.map((host, i) => {
                const sc = hostStatusColor[host.status];
                return (
                  <motion.div key={host.hostname} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.05 }}
                    onClick={() => setSelectedHost(selectedHost === host.hostname ? null : host.hostname)}
                    className={`px-4 py-3 cursor-pointer transition-colors ${selectedHost === host.hostname ? 'bg-[var(--color-gfs-elevated)]' : 'hover:bg-[var(--color-gfs-hover)]'}`}>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-[11px] font-mono font-semibold text-[var(--color-gfs-text)]">{host.hostname}</span>
                        <div className="text-[9px] text-[var(--color-gfs-text-muted)]">{host.ip} • {host.os}</div>
                        <div className="text-[9px] text-[var(--color-gfs-text-muted)]">{host.dept}</div>
                      </div>
                      <div className="text-right">
                        <Badge variant={sc.badge}>{host.status}</Badge>
                        {host.threats > 0 && (
                          <div className="text-[10px] text-[var(--color-gfs-red)] mt-1 font-mono">{host.threats} threats</div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </Card>

          {/* Live Response */}
          <Card delay={0.2} className="!p-4 mt-4">
            <div className="flex items-center gap-2 mb-3">
              <Terminal className="w-3.5 h-3.5 text-[var(--color-gfs-green)]" />
              <span className="text-xs font-semibold text-[var(--color-gfs-text)]">Live Response</span>
            </div>
            <div className="rounded-lg bg-[var(--color-gfs-base)] p-3 font-mono text-[10px]">
              <div className="text-[var(--color-gfs-green)] mb-1">falcon-cli host info --target WRK-LOAN-047</div>
              <div className="text-[var(--color-gfs-text-muted)]">Platform: Windows 11 23H2 x64</div>
              <div className="text-[var(--color-gfs-text-muted)]">Agent Version: 6.45.16204</div>
              <div className="text-[var(--color-gfs-text-muted)]">Status: Contained (Network Isolated)</div>
              <div className="text-[var(--color-gfs-red)] mt-1">⚠ Host is network-isolated. Live response available via direct connection.</div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
