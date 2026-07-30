// src/pages/FirewallManagement.tsx
import { Shield, Globe, AlertTriangle, CheckCircle2, TrendingUp, Clock, Ban, Plus } from 'lucide-react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { PageHeader } from '@/components/layout/PageHeader';

const FIREWALLS = [
  { name: 'FW-EDGE-01', model: 'Palo Alto PA-5260', location: 'Hyderabad DMZ', zone: 'Internet→DMZ', status: 'active', throughput: '34 Gbps', rules: 2847, lastCommit: '15 min ago', haStatus: 'Active' },
  { name: 'FW-EDGE-02', model: 'Palo Alto PA-5260', location: 'Mumbai DC', zone: 'Internet→DMZ', status: 'active', throughput: '28 Gbps', rules: 2654, lastCommit: '1 hr ago', haStatus: 'Active' },
  { name: 'FW-INT-01', model: 'Palo Alto PA-3260', location: 'Hyderabad', zone: 'DMZ→Core', status: 'active', throughput: '18 Gbps', rules: 1923, lastCommit: '2 hr ago', haStatus: 'Active' },
  { name: 'FW-CLOUD-01', model: 'Azure FW Premium', location: 'Azure India', zone: 'Cloud VNet', status: 'active', throughput: '12 Gbps', rules: 412, lastCommit: '30 min ago', haStatus: 'N/A' },
];

const TOP_RULES = [
  { id: 1001, name: 'Block Known C2 IPs', hits: '2,847', action: 'Deny', lastMatch: '8 min ago', severity: 'high' },
  { id: 1002, name: 'Allow UPI Gateway → NPCI', hits: '184,200', action: 'Allow', lastMatch: '<1s ago', severity: 'info' },
  { id: 1003, name: 'Block DNS Tunneling Patterns', hits: '142', action: 'Deny', lastMatch: '1 hr ago', severity: 'high' },
  { id: 1004, name: 'Block Tor Exit Nodes', hits: '1,247', action: 'Deny', lastMatch: '12 min ago', severity: 'medium' },
  { id: 1005, name: 'Allow SWIFT Alliance Traffic', hits: '3,421', action: 'Allow', lastMatch: '2 min ago', severity: 'info' },
  { id: 1006, name: 'Block Cryptocurrency Mining', hits: '89', action: 'Deny', lastMatch: '3 days ago', severity: 'medium' },
];

const POLICY_VIOLATIONS = [
  { source: '10.20.5.47', dest: '45.33.32.156:4444', action: 'Blocked', rule: 'Block Known C2 IPs', time: '14:22:03', host: 'WRK-LOAN-047' },
  { source: '10.10.20.23', dest: 'ddns-resolver.net', action: 'Blocked', rule: 'Block DNS Tunneling', time: '13:45:12', host: 'WRK-TREASURY-023' },
  { source: '10.10.15.203', dest: '103.152.220.41', action: 'Blocked', rule: 'Block Tor Exit Nodes', time: '08:30:00', host: 'WRK-CARDS-012' },
];

export function FirewallManagement() {
  return (
    <div className="space-y-4">
      <PageHeader
        icon={<Shield className="w-5 h-5 text-[var(--color-gfs-accent)]" />}
        title="Firewall Management"
        subtitle="Palo Alto + Azure Firewall — 4 firewalls, 7,836 rules, 92 Gbps capacity"
      />

      {/* Firewall Fleet */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3">
        {FIREWALLS.map((fw, i) => (
          <Card key={fw.name} delay={i * 0.04} className="!p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-mono font-semibold text-[var(--color-gfs-text)]">{fw.name}</span>
              <div className="w-2 h-2 rounded-full bg-[var(--color-gfs-green)]" />
            </div>
            <div className="text-[10px] text-[var(--color-gfs-text-muted)]">{fw.model}</div>
            <div className="text-[10px] text-[var(--color-gfs-text-muted)]">{fw.location}</div>
            <div className="text-[10px] text-[var(--color-gfs-accent)] mt-1">{fw.zone}</div>
            <div className="mt-2 pt-2 border-t border-[var(--color-gfs-border-light)] space-y-1 text-[9px] text-[var(--color-gfs-text-muted)]">
              <div className="flex justify-between"><span>Throughput</span><span className="text-[var(--color-gfs-text)]">{fw.throughput}</span></div>
              <div className="flex justify-between"><span>Rules</span><span className="text-[var(--color-gfs-text)]">{fw.rules.toLocaleString()}</span></div>
              <div className="flex justify-between"><span>Last Commit</span><span className="text-[var(--color-gfs-text)]">{fw.lastCommit}</span></div>
              <div className="flex justify-between"><span>HA Status</span><span className="text-[var(--color-gfs-green)]">{fw.haStatus}</span></div>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        {/* Top Rules */}
        <Card delay={0.1} className="!p-0 overflow-hidden">
          <div className="px-4 py-2.5 border-b border-[var(--color-gfs-border-light)] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Globe className="w-3.5 h-3.5 text-[var(--color-gfs-blue)]" />
              <span className="text-xs font-semibold text-[var(--color-gfs-text)]">Top Rules by Hit Count</span>
            </div>
            <button className="flex items-center gap-1 px-2 py-1 rounded bg-[var(--color-gfs-accent-dim)] text-[10px] text-[var(--color-gfs-accent)]">
              <Plus className="w-2.5 h-2.5" /> Add Rule
            </button>
          </div>
          <div className="divide-y divide-[var(--color-gfs-border-light)]">
            {TOP_RULES.map((rule, i) => (
              <motion.div key={rule.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.04 }}
                className="px-4 py-2.5 hover:bg-[var(--color-gfs-hover)] transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono text-[var(--color-gfs-text-muted)]">#{rule.id}</span>
                    <span className="text-[11px] text-[var(--color-gfs-text)]">{rule.name}</span>
                  </div>
                  <Badge variant={rule.action === 'Deny' ? 'critical' : 'success'}>{rule.action}</Badge>
                </div>
                <div className="flex items-center gap-3 mt-0.5 text-[9px] text-[var(--color-gfs-text-muted)]">
                  <span>Hits: {rule.hits}</span>
                  <span>Last: {rule.lastMatch}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </Card>

        {/* Policy Violations */}
        <Card delay={0.15} className="!p-0 overflow-hidden">
          <div className="px-4 py-2.5 border-b border-[var(--color-gfs-border-light)] flex items-center gap-2">
            <Ban className="w-3.5 h-3.5 text-[var(--color-gfs-red)]" />
            <span className="text-xs font-semibold text-[var(--color-gfs-text)]">Recent Policy Violations (24h)</span>
            <Badge variant="critical">{POLICY_VIOLATIONS.length}</Badge>
          </div>
          <div className="divide-y divide-[var(--color-gfs-border-light)]">
            {POLICY_VIOLATIONS.map((v, i) => (
              <motion.div key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.05 }}
                className="px-4 py-3 hover:bg-[var(--color-gfs-hover)]">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono text-[var(--color-gfs-text)]">{v.source}</span>
                      <span className="text-[var(--color-gfs-text-muted)]">→</span>
                      <span className="text-[10px] font-mono text-[var(--color-gfs-text)]">{v.dest}</span>
                    </div>
                    <p className="text-[10px] text-[var(--color-gfs-text-muted)] mt-0.5">{v.rule} • {v.host}</p>
                  </div>
                  <div className="text-right">
                    <Badge variant="critical">{v.action}</Badge>
                    <div className="text-[9px] text-[var(--color-gfs-text-muted)] mt-0.5">{v.time}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
