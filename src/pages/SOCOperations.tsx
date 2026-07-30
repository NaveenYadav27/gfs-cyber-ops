// src/pages/SOCOperations.tsx
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Monitor, Clock, AlertTriangle, CheckCircle2, Users, Radio, Shield,
  ChevronRight, MessageSquare, ArrowUpRight, Bell, RefreshCw,
} from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { PageHeader } from '@/components/layout/PageHeader';
import { useStore } from '@/store/useStore';

const SHIFTS = [
  { name: 'Morning', time: '06:00–14:00', lead: 'Priya Nair', analysts: 5, status: 'active' },
  { name: 'Afternoon', time: '14:00–22:00', lead: 'Rahul Verma', analysts: 5, status: 'upcoming' },
  { name: 'Night', time: '22:00–06:00', lead: 'Deepa Krishnan', analysts: 4, status: 'upcoming' },
];

const ALERT_QUEUE = [
  { id: 'ALT-2025-9102', severity: 'critical', title: 'Ransomware detected — WRK-LOAN-047', source: 'Falcon EDR', time: '2 min ago', assignee: null, sla: '5 min' },
  { id: 'ALT-2025-9101', severity: 'high', title: 'Impossible travel — svc-neft-ops', source: 'Sentinel', time: '8 min ago', assignee: 'Arjun Sharma', sla: '15 min' },
  { id: 'ALT-2025-9098', severity: 'medium', title: 'Phishing report — Cards team', source: 'User Report', time: '23 min ago', assignee: 'Raghav Sharma', sla: '30 min' },
  { id: 'ALT-2025-9095', severity: 'low', title: 'Failed login lockout — 3 accounts', source: 'Azure AD', time: '41 min ago', assignee: 'Sai Krishna', sla: '60 min' },
  { id: 'ALT-2025-9093', severity: 'medium', title: 'Anomalous DNS — Treasury segment', source: 'Palo Alto', time: '1 hr ago', assignee: null, sla: '30 min' },
  { id: 'ALT-2025-9090', severity: 'info', title: 'Scheduled scan complete — SWIFT server', source: 'Qualys', time: '1.5 hr ago', assignee: 'System', sla: 'N/A' },
  { id: 'ALT-2025-9088', severity: 'high', title: 'WAF bypass detected — ibanking.gfs.com', source: 'Azure WAF', time: '2 hr ago', assignee: 'Nikhil Joshi', sla: '15 min' },
  { id: 'ALT-2025-9085', severity: 'medium', title: 'New admin account created — Domain Admin', source: 'Sentinel', time: '3 hr ago', assignee: 'Resolved', sla: '—' },
];

const SHIFT_METRICS = [
  { label: 'Alerts Today', value: '147', trend: '+12%', color: 'var(--color-gfs-accent)' },
  { label: 'Mean Triage', value: '3.2 min', trend: '-8%', color: 'var(--color-gfs-green)' },
  { label: 'Escalations', value: '4', trend: '+1', color: 'var(--color-gfs-amber)' },
  { label: 'Closed', value: '98', trend: '+22%', color: 'var(--color-gfs-blue)' },
  { label: 'Open SLA Breach', value: '1', trend: '0', color: 'var(--color-gfs-red)' },
  { label: 'Active Incidents', value: '2', trend: '0', color: 'var(--color-gfs-purple)' },
];

const sevColors: Record<string, string> = {
  critical: 'var(--color-gfs-red)', high: 'var(--color-gfs-amber)',
  medium: 'var(--color-gfs-blue)', low: 'var(--color-gfs-text-muted)', info: 'var(--color-gfs-text-muted)',
};

const sevBadge: Record<string, 'critical' | 'high' | 'medium' | 'default' | 'success'> = {
  critical: 'critical', high: 'high', medium: 'medium', low: 'default', info: 'default',
};

export function SOCOperations() {
  const [autoRefresh, setAutoRefresh] = useState(true);
  const { user } = useStore();

  return (
    <div className="space-y-4">
      <PageHeader
        icon={<Monitor className="w-5 h-5 text-[var(--color-gfs-accent)]" />}
        title="SOC Console"
        subtitle="Security Operations Center — Hyderabad India SOC"
        badge={
          <div className="flex items-center gap-2">
            <Badge variant="success">SHIFT ACTIVE</Badge>
            <button onClick={() => setAutoRefresh(!autoRefresh)}
              className={`flex items-center gap-1 px-2 py-0.5 rounded text-[10px] transition-colors ${
                autoRefresh ? 'bg-[var(--color-gfs-green-dim)] text-[var(--color-gfs-green)]' : 'text-[var(--color-gfs-text-muted)]'
              }`}>
              <RefreshCw className={`w-2.5 h-2.5 ${autoRefresh ? 'animate-spin' : ''}`} />
              Auto-refresh {autoRefresh ? 'ON' : 'OFF'}
            </button>
          </div>
        }
      />

      {/* Metrics */}
      <div className="grid grid-cols-3 lg:grid-cols-6 gap-3">
        {SHIFT_METRICS.map((m, i) => (
          <Card key={m.label} delay={i * 0.03} className="!p-3">
            <div className="text-[10px] text-[var(--color-gfs-text-muted)] mb-1">{m.label}</div>
            <div className="text-lg font-display font-bold" style={{ color: m.color }}>{m.value}</div>
            <div className="text-[10px] text-[var(--color-gfs-text-muted)]">{m.trend}</div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        {/* Alert Queue */}
        <div className="xl:col-span-2">
          <Card delay={0.15} className="!p-0 overflow-hidden">
            <div className="px-4 py-2.5 border-b border-[var(--color-gfs-border-light)] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Bell className="w-3.5 h-3.5 text-[var(--color-gfs-amber)]" />
                <span className="text-xs font-semibold text-[var(--color-gfs-text)]">Alert Triage Queue</span>
                <Badge variant="default">{ALERT_QUEUE.length} open</Badge>
              </div>
              <button className="text-[10px] text-[var(--color-gfs-accent)]">View All →</button>
            </div>
            <div className="divide-y divide-[var(--color-gfs-border-light)]">
              {ALERT_QUEUE.map((alert, i) => (
                <motion.div key={alert.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }}
                  className="px-4 py-3 hover:bg-[var(--color-gfs-hover)] transition-colors cursor-pointer">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0" style={{ background: sevColors[alert.severity] }} />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono text-[var(--color-gfs-text-muted)]">{alert.id}</span>
                        <Badge variant={sevBadge[alert.severity]}>{alert.severity}</Badge>
                        {alert.sla !== 'N/A' && alert.assignee === null && (
                          <span className="text-[10px] text-[var(--color-gfs-red)] font-mono">SLA: {alert.sla}</span>
                        )}
                      </div>
                      <p className="text-xs text-[var(--color-gfs-text)] mt-0.5">{alert.title}</p>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="text-[10px] text-[var(--color-gfs-text-muted)]">{alert.source}</span>
                        <span className="text-[10px] text-[var(--color-gfs-text-muted)]">{alert.time}</span>
                        <span className="text-[10px] text-[var(--color-gfs-text-muted)]">
                          {alert.assignee ? `→ ${alert.assignee}` : '⚡ UNASSIGNED'}
                        </span>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-[var(--color-gfs-text-muted)] flex-shrink-0" />
                  </div>
                </motion.div>
              ))}
            </div>
          </Card>
        </div>

        {/* Right sidebar */}
        <div className="space-y-4">
          {/* Current Shift */}
          <Card delay={0.2} className="!p-4">
            <div className="flex items-center gap-2 mb-3">
              <Radio className="w-3.5 h-3.5 text-[var(--color-gfs-green)]" />
              <span className="text-xs font-semibold text-[var(--color-gfs-text)]">Current Shift</span>
            </div>
            {SHIFTS.map((shift) => (
              <div key={shift.name} className={`p-2.5 rounded-lg mb-2 ${shift.status === 'active' ? 'bg-[var(--color-gfs-green-dim)] border border-[var(--color-gfs-green)]/20' : 'bg-[var(--color-gfs-elevated)]'}`}>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[11px] font-semibold text-[var(--color-gfs-text)]">{shift.name}</span>
                    <span className="text-[10px] text-[var(--color-gfs-text-muted)] ml-2">{shift.time}</span>
                  </div>
                  {shift.status === 'active' && <Badge variant="success">NOW</Badge>}
                </div>
                <div className="flex items-center gap-2 mt-1 text-[10px] text-[var(--color-gfs-text-muted)]">
                  <Users className="w-2.5 h-2.5" /> Lead: {shift.lead} • {shift.analysts} analysts
                </div>
              </div>
            ))}
          </Card>

          {/* Quick Actions */}
          <Card delay={0.25} className="!p-4">
            <span className="text-[10px] text-[var(--color-gfs-text-muted)] uppercase tracking-wider">Quick Actions</span>
            <div className="mt-2 space-y-1.5">
              {[
                { label: 'Declare Major Incident', color: 'var(--color-gfs-red)', icon: AlertTriangle },
                { label: 'Open War Room', color: 'var(--color-gfs-accent)', icon: Radio },
                { label: 'Shift Handover Notes', color: 'var(--color-gfs-blue)', icon: MessageSquare },
                { label: 'Run Threat Hunt', color: 'var(--color-gfs-purple)', icon: Shield },
                { label: 'Export Daily Report', color: 'var(--color-gfs-green)', icon: ArrowUpRight },
              ].map((action) => (
                <button key={action.label} className="w-full flex items-center gap-2 px-3 py-2 rounded-lg bg-[var(--color-gfs-elevated)] hover:bg-[var(--color-gfs-hover)] transition-colors text-left">
                  <action.icon className="w-3.5 h-3.5" style={{ color: action.color }} />
                  <span className="text-[11px] text-[var(--color-gfs-text-secondary)]">{action.label}</span>
                </button>
              ))}
            </div>
          </Card>

          {/* Live Stats */}
          <Card delay={0.3} className="!p-4">
            <span className="text-[10px] text-[var(--color-gfs-text-muted)] uppercase tracking-wider">Live Environment</span>
            <div className="mt-2 space-y-1.5 text-[11px]">
              <div className="flex justify-between"><span className="text-[var(--color-gfs-text-muted)]">Endpoints Monitored</span><span className="text-[var(--color-gfs-text)] font-mono">42,100</span></div>
              <div className="flex justify-between"><span className="text-[var(--color-gfs-text-muted)]">Log Ingestion Rate</span><span className="text-[var(--color-gfs-text)] font-mono">3.2 TB/day</span></div>
              <div className="flex justify-between"><span className="text-[var(--color-gfs-text-muted)]">Analytics Rules</span><span className="text-[var(--color-gfs-text)] font-mono">420</span></div>
              <div className="flex justify-between"><span className="text-[var(--color-gfs-text-muted)]">Last SIEM Refresh</span><span className="text-[var(--color-gfs-text)] font-mono">12s ago</span></div>
              <div className="flex justify-between"><span className="text-[var(--color-gfs-text-muted)]">Falcon Heartbeat</span><span className="text-[var(--color-gfs-green)] font-mono">● OK</span></div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
