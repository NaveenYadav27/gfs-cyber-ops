// src/pages/SIEMAnalytics.tsx
import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Search, Play, Save, Copy, Clock, Database, Shield, BarChart3,
  AlertTriangle, CheckCircle2, Filter, Download, BookOpen,
} from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { PageHeader } from '@/components/layout/PageHeader';

const LOG_SOURCES = [
  { name: 'Windows Security Events', tables: 'SecurityEvent', dailyGB: 0.8, eventsPerSec: '12,400', status: 'healthy', lastIngest: '2s ago' },
  { name: 'Azure AD Sign-ins', tables: 'SigninLogs', dailyGB: 0.4, eventsPerSec: '4,200', status: 'healthy', lastIngest: '5s ago' },
  { name: 'Palo Alto Firewall', tables: 'CommonSecurityLog', dailyGB: 0.6, eventsPerSec: '8,700', status: 'healthy', lastIngest: '1s ago' },
  { name: 'CrowdStrike Falcon', tables: 'CrowdStrikeEvents', dailyGB: 0.3, eventsPerSec: '6,100', status: 'healthy', lastIngest: '3s ago' },
  { name: 'GFS UPI Transactions', tables: 'GFS_UPI_CL', dailyGB: 0.5, eventsPerSec: '18,000', status: 'healthy', lastIngest: '<1s ago' },
  { name: 'GFS Core Banking', tables: 'GFS_CoreBank_CL', dailyGB: 0.2, eventsPerSec: '3,100', status: 'warning', lastIngest: '45s ago' },
  { name: 'Exchange Online', tables: 'EmailEvents', dailyGB: 0.15, eventsPerSec: '1,800', status: 'healthy', lastIngest: '8s ago' },
  { name: 'Azure WAF', tables: 'AzureDiagnostics', dailyGB: 0.12, eventsPerSec: '2,400', status: 'healthy', lastIngest: '2s ago' },
];

const ANALYTICS_RULES = [
  { name: 'UPI Velocity Anomaly', severity: 'high', status: 'enabled', lastFired: '2 min ago', fireCount: 3, description: 'Detects when a single merchant exceeds normal transaction velocity by 300%+' },
  { name: 'Impossible Travel Detection', severity: 'high', status: 'enabled', lastFired: '8 min ago', fireCount: 1, description: 'Azure AD sign-ins from geographically impossible locations' },
  { name: 'Ransomware File Activity', severity: 'critical', status: 'enabled', lastFired: '15 min ago', fireCount: 1, description: 'High-volume file encryption detected on endpoints' },
  { name: 'PowerShell Encoded Command', severity: 'medium', status: 'enabled', lastFired: '23 min ago', fireCount: 2, description: 'PowerShell launched with base64-encoded parameters' },
  { name: 'New Domain Admin Created', severity: 'high', status: 'enabled', lastFired: '3 hr ago', fireCount: 0, description: 'New account added to Domain Admins group' },
  { name: 'DNS Tunneling Entropy', severity: 'medium', status: 'enabled', lastFired: '1 hr ago', fireCount: 1, description: 'DNS queries with entropy score above 3.5 threshold' },
  { name: 'Failed Login Burst', severity: 'low', status: 'enabled', lastFired: '41 min ago', fireCount: 1, description: 'More than 10 failed logins from single source in 5 min' },
  { name: 'WAF SQL Injection Bypass', severity: 'critical', status: 'enabled', lastFired: '2 hr ago', fireCount: 1, description: 'SQL injection payload that bypassed WAF inspection' },
  { name: 'SWIFT Transaction Anomaly', severity: 'critical', status: 'enabled', lastFired: 'Never', fireCount: 0, description: 'SWIFT transactions outside business hours or above threshold' },
  { name: 'Privilege Escalation Chain', severity: 'high', status: 'enabled', lastFired: '12 hr ago', fireCount: 0, description: 'Multi-step privilege escalation within 15 min window' },
];

const SAMPLE_QUERIES = [
  { name: 'Top 10 Alert Sources (24h)', query: 'SecurityAlert\n| where TimeGenerated > ago(24h)\n| summarize Count=count() by AlertName\n| top 10 by Count', result: 'Ransomware File Activity: 3\nUPI Velocity Anomaly: 3\nImpossible Travel: 1\n...' },
  { name: 'Failed Logins by Country', query: 'SigninLogs\n| where ResultType != 0\n| summarize Attempts=count() by Location\n| top 10 by Attempts', result: 'Belarus: 1,247\nRussia: 89\nChina: 67\n...' },
  { name: 'High-Entropy DNS Queries', query: 'CommonSecurityLog\n| where DeviceAction == "dns-query"\n| extend Entropy = length(QueryName)\n| where Entropy > 30\n| summarize dcount(QueryName) by SourceIP', result: '10.10.20.23 → 14,200 queries\n...' },
];

const sevBadge: Record<string, 'critical' | 'high' | 'medium' | 'default'> = {
  critical: 'critical', high: 'high', medium: 'medium', low: 'default',
};

export function SIEMAnalytics() {
  const [activeQuery, setActiveQuery] = useState(0);
  const [queryText, setQueryText] = useState(SAMPLE_QUERIES[0].query);

  return (
    <div className="space-y-4">
      <PageHeader
        icon={<Database className="w-5 h-5 text-[var(--color-gfs-accent)]" />}
        title="SIEM Analytics"
        subtitle="Microsoft Sentinel — 3.2 TB daily ingestion from 14,200 log sources"
        badge={<Badge variant="success">CONNECTED</Badge>}
      />

      {/* Log Sources */}
      <Card delay={0} className="!p-4">
        <div className="flex items-center gap-2 mb-3">
          <Database className="w-3.5 h-3.5 text-[var(--color-gfs-blue)]" />
          <span className="text-xs font-semibold text-[var(--color-gfs-text)]">Log Sources</span>
          <Badge variant="default">{LOG_SOURCES.length} active</Badge>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-2">
          {LOG_SOURCES.map((src, i) => (
            <motion.div key={src.name} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }}
              className="p-2.5 rounded-lg bg-[var(--color-gfs-elevated)] border border-[var(--color-gfs-border-light)]">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-semibold text-[var(--color-gfs-text)] truncate">{src.name}</span>
                <div className={`w-2 h-2 rounded-full ${src.status === 'healthy' ? 'bg-[var(--color-gfs-green)]' : 'bg-[var(--color-gfs-amber)]'}`} />
              </div>
              <div className="mt-1 font-mono text-[9px] text-[var(--color-gfs-accent)]">{src.tables}</div>
              <div className="flex items-center justify-between mt-1 text-[9px] text-[var(--color-gfs-text-muted)]">
                <span>{src.dailyGB} GB/day</span>
                <span>{src.eventsPerSec} evt/s</span>
              </div>
              <div className="text-[9px] text-[var(--color-gfs-text-muted)] mt-0.5">Last: {src.lastIngest}</div>
            </motion.div>
          ))}
        </div>
      </Card>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        {/* KQL Query Editor */}
        <Card delay={0.1} className="!p-4">
          <div className="flex items-center gap-2 mb-3">
            <Search className="w-3.5 h-3.5 text-[var(--color-gfs-accent)]" />
            <span className="text-xs font-semibold text-[var(--color-gfs-text)]">KQL Query Editor</span>
          </div>
          <div className="flex gap-1 mb-2 overflow-x-auto">
            {SAMPLE_QUERIES.map((q, i) => (
              <button key={i} onClick={() => { setActiveQuery(i); setQueryText(q.query); }}
                className={`px-2 py-1 rounded text-[10px] whitespace-nowrap transition-colors ${
                  activeQuery === i ? 'bg-[var(--color-gfs-accent-dim)] text-[var(--color-gfs-accent)]' : 'text-[var(--color-gfs-text-muted)] hover:text-[var(--color-gfs-text)]'
                }`}>{q.name}</button>
            ))}
          </div>
          <div className="rounded-lg bg-[var(--color-gfs-base)] border border-[var(--color-gfs-border-light)] overflow-hidden">
            <div className="px-3 py-2 border-b border-[var(--color-gfs-border-light)] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono text-[var(--color-gfs-text-muted)]">KQL</span>
                <Badge variant="default">Last 24h</Badge>
              </div>
              <div className="flex items-center gap-1.5">
                <button className="flex items-center gap-1 px-2 py-1 rounded bg-[var(--color-gfs-green-dim)] text-[var(--color-gfs-green)] text-[10px] font-medium">
                  <Play className="w-2.5 h-2.5" /> Run
                </button>
                <button className="p-1 rounded hover:bg-[var(--color-gfs-elevated)]"><Copy className="w-3 h-3 text-[var(--color-gfs-text-muted)]" /></button>
                <button className="p-1 rounded hover:bg-[var(--color-gfs-elevated)]"><Save className="w-3 h-3 text-[var(--color-gfs-text-muted)]" /></button>
              </div>
            </div>
            <textarea value={queryText} onChange={(e) => setQueryText(e.target.value)}
              className="w-full h-32 px-3 py-2 bg-transparent text-[11px] font-mono text-[var(--color-gfs-text)] resize-none focus:outline-none" />
          </div>
          {/* Results */}
          <div className="mt-3 rounded-lg bg-[var(--color-gfs-elevated)] border border-[var(--color-gfs-border-light)] p-3">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[10px] text-[var(--color-gfs-text-muted)]">Results</span>
              <Badge variant="success">Completed</Badge>
              <span className="text-[10px] text-[var(--color-gfs-text-muted)] font-mono">1.2s</span>
            </div>
            <pre className="text-[10px] font-mono text-[var(--color-gfs-text-secondary)] whitespace-pre-wrap">{SAMPLE_QUERIES[activeQuery].result}</pre>
          </div>
        </Card>

        {/* Analytics Rules */}
        <Card delay={0.15} className="!p-0 overflow-hidden">
          <div className="px-4 py-2.5 border-b border-[var(--color-gfs-border-light)] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Shield className="w-3.5 h-3.5 text-[var(--color-gfs-accent)]" />
              <span className="text-xs font-semibold text-[var(--color-gfs-text)]">Analytics Rules</span>
              <Badge variant="default">{ANALYTICS_RULES.length} active</Badge>
            </div>
          </div>
          <div className="max-h-[500px] overflow-y-auto">
            {ANALYTICS_RULES.map((rule, i) => (
              <motion.div key={rule.name} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }}
                className="px-4 py-3 border-b border-[var(--color-gfs-border-light)] hover:bg-[var(--color-gfs-hover)] transition-colors cursor-pointer">
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-semibold text-[var(--color-gfs-text)]">{rule.name}</span>
                      <Badge variant={sevBadge[rule.severity]}>{rule.severity}</Badge>
                    </div>
                    <p className="text-[10px] text-[var(--color-gfs-text-muted)] mt-0.5">{rule.description}</p>
                    <div className="flex items-center gap-3 mt-1 text-[9px] text-[var(--color-gfs-text-muted)]">
                      <span>Last fired: {rule.lastFired}</span>
                      <span>Fired: {rule.fireCount}x</span>
                    </div>
                  </div>
                  <Badge variant={rule.status === 'enabled' ? 'success' : 'default'}>{rule.status}</Badge>
                </div>
              </motion.div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
