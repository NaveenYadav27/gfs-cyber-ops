// src/pages/Dashboard.tsx
import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  AlertTriangle, Shield, Eye, Clock, TrendingUp, TrendingDown, Server,
  Activity, ArrowUpRight, CheckCircle2, XCircle, Search, Zap, Globe, Users,
} from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { StatusIndicator } from '@/components/ui/StatusIndicator';
import { useStore } from '@/store/useStore';
import { ENTERPRISE_SYSTEMS, MOCK_ACTIVITY } from '@/data/enterprise';
import type { SecurityAlert, ActivityEvent } from '@/types';

function MetricCard({ label, value, change, changeLabel, trend, icon: Icon, color, delay }: {
  label: string; value: string | number; change: number; changeLabel: string;
  trend: 'up' | 'down' | 'flat'; icon: React.ElementType; color: string; delay: number;
}) {
  return (
    <Card delay={delay} className="relative overflow-hidden group">
      <div className="absolute top-0 right-0 w-24 h-24 opacity-5 group-hover:opacity-10 transition-opacity" style={{
        background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
      }} />
      <div className="flex items-start justify-between">
        <div>
          <p className="text-[11px] text-[var(--color-gfs-text-muted)] uppercase tracking-wider mb-1">{label}</p>
          <p className="text-2xl font-display font-bold text-[var(--color-gfs-text)]">{value}</p>
        </div>
        <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: `${color}15` }}>
          <Icon className="w-5 h-5" style={{ color }} />
        </div>
      </div>
      <div className="flex items-center gap-1.5 mt-3">
        {trend === 'up' && <TrendingUp className="w-3 h-3 text-[var(--color-gfs-red)]" />}
        {trend === 'down' && <TrendingDown className="w-3 h-3 text-[var(--color-gfs-green)]" />}
        <span className={`text-[11px] font-mono ${trend === 'down' ? 'text-[var(--color-gfs-green)]' : trend === 'up' ? 'text-[var(--color-gfs-red)]' : 'text-[var(--color-gfs-text-muted)]'}`}>
          {change > 0 ? '+' : ''}{change}%
        </span>
        <span className="text-[10px] text-[var(--color-gfs-text-muted)]">{changeLabel}</span>
      </div>
    </Card>
  );
}

function AlertRow({ alert, index }: { alert: SecurityAlert; index: number }) {
  const severityColors: Record<string, string> = {
    critical: 'var(--color-gfs-red)', high: 'var(--color-gfs-amber)',
    medium: 'var(--color-gfs-blue)', low: 'var(--color-gfs-text-muted)', info: 'var(--color-gfs-purple)',
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05 }}
      className="flex items-center gap-3 px-4 py-3 border-b border-[var(--color-gfs-border-light)] hover:bg-[var(--color-gfs-hover)] transition-colors cursor-pointer group"
    >
      <div className="w-1 h-8 rounded-full flex-shrink-0" style={{ background: severityColors[alert.severity] }} />
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-0.5">
          <Badge variant={alert.severity as any} pulse={alert.severity === 'critical'}>
            {alert.severity.toUpperCase()}
          </Badge>
          <span className="text-[10px] text-[var(--color-gfs-text-muted)] font-mono">{alert.id}</span>
        </div>
        <p className="text-xs text-[var(--color-gfs-text)] truncate">{alert.type}</p>
        <p className="text-[10px] text-[var(--color-gfs-text-muted)] truncate">{alert.source}</p>
      </div>
      <div className="text-right flex-shrink-0">
        <Badge variant={
          alert.status === 'new' ? 'critical' :
          alert.status === 'investigating' ? 'high' :
          alert.status === 'contained' ? 'medium' : 'success'
        }>
          {alert.status}
        </Badge>
        <p className="text-[10px] text-[var(--color-gfs-text-muted)] mt-1 font-mono">
          {new Date(alert.timestamp).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
        </p>
      </div>
    </motion.div>
  );
}

function MiniAlertChart() {
  const [data] = useState(() => {
    const hours = Array.from({ length: 24 }, (_, i) => i);
    return hours.map((h) => ({
      hour: h,
      critical: Math.floor(Math.random() * 3),
      high: Math.floor(Math.random() * 8) + 2,
      medium: Math.floor(Math.random() * 12) + 5,
      low: Math.floor(Math.random() * 6) + 1,
    }));
  });

  const maxVal = Math.max(...data.map((d) => d.critical + d.high + d.medium + d.low));

  return (
    <div className="flex items-end gap-[2px] h-24">
      {data.map((d, i) => {
        const total = d.critical + d.high + d.medium + d.low;
        const height = (total / maxVal) * 100;
        return (
          <div key={i} className="flex-1 flex flex-col justify-end" style={{ height: '100%' }}>
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: `${height}%` }}
              transition={{ delay: i * 0.02, duration: 0.4 }}
              className="w-full rounded-t-sm relative group cursor-pointer"
              style={{ background: `linear-gradient(to top, var(--color-gfs-accent), var(--color-gfs-blue))` }}
            >
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-[var(--color-gfs-elevated)] px-2 py-1 rounded text-[9px] font-mono text-[var(--color-gfs-text)] opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-[var(--color-gfs-border)]">
                {d.hour}:00 — {total} alerts
              </div>
            </motion.div>
          </div>
        );
      })}
    </div>
  );
}

export function Dashboard() {
  const { alerts, user } = useStore();
  const [liveAlertCount, setLiveAlertCount] = useState(0);
  const metrics = useMemo(() => ({
    openAlerts: alerts.filter((a) => a.status !== 'resolved' && a.status !== 'false-positive').length,
    criticalAlerts: alerts.filter((a) => a.severity === 'critical').length,
    systemsOnline: ENTERPRISE_SYSTEMS.filter((s) => s.status === 'online').length,
    totalSystems: ENTERPRISE_SYSTEMS.length,
    avgResponseTime: '14m',
    mttr: '2.4h',
  }), [alerts]);

  useEffect(() => {
    const interval = setInterval(() => {
      setLiveAlertCount((c) => c + (Math.random() > 0.7 ? 1 : 0));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const greeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <Card delay={0} glow="accent" className="relative overflow-hidden">
        <div className="absolute inset-0 gfs-grid-bg opacity-30" />
        <div className="relative z-10">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-lg font-display font-bold text-[var(--color-gfs-text)]">
                {greeting()}, {user?.name?.split(' ')[0]}
              </h2>
              <p className="text-sm text-[var(--color-gfs-text-secondary)] mt-1">
                Welcome to the GFS Security Operations Center. You have{' '}
                <span className="text-[var(--color-gfs-amber)] font-semibold">{metrics.openAlerts} open alerts</span>
                {' '}requiring attention.
              </p>
            </div>
            <div className="hidden md:flex items-center gap-2 px-3 py-2 rounded-lg bg-[var(--color-gfs-accent-dim)] border border-[var(--color-gfs-accent)]/20">
              <div className="w-2 h-2 rounded-full bg-[var(--color-gfs-accent)] animate-pulse-gfs" />
              <span className="text-[10px] font-mono text-[var(--color-gfs-accent)]">SOC ONLINE — 24/7 MONITORING</span>
            </div>
          </div>
        </div>
      </Card>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard label="Open Alerts" value={metrics.openAlerts} change={12} changeLabel="vs last 24h" trend="up" icon={AlertTriangle} color="var(--color-gfs-amber)" delay={0.1} />
        <MetricCard label="Critical Alerts" value={metrics.criticalAlerts} change={-8} changeLabel="vs last week" trend="down" icon={Shield} color="var(--color-gfs-red)" delay={0.15} />
        <MetricCard label="Systems Online" value={`${metrics.systemsOnline}/${metrics.totalSystems}`} change={0} changeLabel="stable" trend="flat" icon={Server} color="var(--color-gfs-green)" delay={0.2} />
        <MetricCard label="Avg Response" value={metrics.avgResponseTime} change={-15} changeLabel="improvement" trend="down" icon={Clock} color="var(--color-gfs-blue)" delay={0.25} />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        {/* Alert Feed */}
        <Card delay={0.3} className="xl:col-span-2 !p-0 overflow-hidden">
          <div className="px-4 py-3 border-b border-[var(--color-gfs-border-light)] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-[var(--color-gfs-amber)]" />
              <span className="text-sm font-semibold">Alert Queue</span>
              <Badge variant="critical" pulse>{metrics.openAlerts} Active</Badge>
            </div>
            <button className="text-[10px] text-[var(--color-gfs-accent)] hover:underline flex items-center gap-1">
              View All <ArrowUpRight className="w-3 h-3" />
            </button>
          </div>
          <div className="max-h-[420px] overflow-y-auto">
            {alerts.map((alert, i) => (
              <AlertRow key={alert.id} alert={alert} index={i} />
            ))}
          </div>
        </Card>

        {/* Right Column */}
        <div className="space-y-4">
          {/* Alert Trend */}
          <Card delay={0.35}>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-[var(--color-gfs-text-secondary)]">Alert Volume (24h)</span>
              <span className="text-[10px] text-[var(--color-gfs-text-muted)] font-mono">BY HOUR</span>
            </div>
            <MiniAlertChart />
            <div className="flex items-center justify-between mt-2 text-[10px] text-[var(--color-gfs-text-muted)]">
              <span>00:00</span>
              <span>06:00</span>
              <span>12:00</span>
              <span>18:00</span>
              <span>23:59</span>
            </div>
          </Card>

          {/* System Health */}
          <Card delay={0.4}>
            <div className="flex items-center gap-2 mb-3">
              <Server className="w-4 h-4 text-[var(--color-gfs-green)]" />
              <span className="text-xs font-semibold text-[var(--color-gfs-text-secondary)]">Critical Systems</span>
            </div>
            <div className="space-y-2">
              {ENTERPRISE_SYSTEMS.filter((s) => s.criticality === 'critical').slice(0, 6).map((sys) => (
                <div key={sys.id} className="flex items-center gap-2 py-1">
                  <StatusIndicator status={sys.status} size="sm" />
                  <span className="text-xs text-[var(--color-gfs-text)] truncate flex-1">{sys.name}</span>
                  <span className="text-[10px] text-[var(--color-gfs-text-muted)] font-mono">{sys.uptime}</span>
                </div>
              ))}
            </div>
          </Card>

          {/* Quick Actions */}
          <Card delay={0.45}>
            <span className="text-xs font-semibold text-[var(--color-gfs-text-secondary)] mb-3 block">Quick Actions</span>
            <div className="grid grid-cols-2 gap-2">
              {[
                { label: 'SOC Console', icon: Eye, color: 'var(--color-gfs-accent)' },
                { label: 'Threat Intel', icon: Shield, color: 'var(--color-gfs-blue)' },
                { label: 'Vulnerabilities', icon: Zap, color: 'var(--color-gfs-amber)' },
                { label: 'Enterprise Map', icon: Globe, color: 'var(--color-gfs-purple)' },
              ].map((action) => (
                <button
                  key={action.label}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[var(--color-gfs-elevated)] hover:bg-[var(--color-gfs-hover)] transition-colors text-left"
                >
                  <action.icon className="w-3.5 h-3.5" style={{ color: action.color }} />
                  <span className="text-[11px] text-[var(--color-gfs-text-secondary)]">{action.label}</span>
                </button>
              ))}
            </div>
          </Card>
        </div>
      </div>

      {/* Activity Timeline */}
      <Card delay={0.5}>
        <div className="flex items-center gap-2 mb-4">
          <Activity className="w-4 h-4 text-[var(--color-gfs-accent)]" />
          <span className="text-sm font-semibold">Activity Timeline</span>
        </div>
        <div className="space-y-0">
          {MOCK_ACTIVITY.map((event: ActivityEvent, i: number) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + i * 0.05 }}
              className="flex items-start gap-3 py-2.5 border-b border-[var(--color-gfs-border-light)] last:border-0"
            >
              <div className="mt-1">
                {event.type === 'alert' && <AlertTriangle className="w-3.5 h-3.5 text-[var(--color-gfs-amber)]" />}
                {event.type === 'investigation' && <Search className="w-3.5 h-3.5 text-[var(--color-gfs-blue)]" />}
                {event.type === 'scan' && <Eye className="w-3.5 h-3.5 text-[var(--color-gfs-green)]" />}
                {event.type === 'system' && <Server className="w-3.5 h-3.5 text-[var(--color-gfs-amber)]" />}
                {event.type === 'user' && <Users className="w-3.5 h-3.5 text-[var(--color-gfs-purple)]" />}
                {event.type === 'deployment' && <CheckCircle2 className="w-3.5 h-3.5 text-[var(--color-gfs-green)]" />}
              </div>
              <div className="flex-1">
                <p className="text-xs text-[var(--color-gfs-text)]">{event.message}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-[10px] text-[var(--color-gfs-text-muted)] font-mono">
                    {new Date(event.timestamp).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                  </span>
                  {event.user && <span className="text-[10px] text-[var(--color-gfs-text-muted)]">by {event.user}</span>}
                </div>
              </div>
              <Badge variant={event.severity as any}>{event.severity}</Badge>
            </motion.div>
          ))}
        </div>
      </Card>
    </div>
  );
}
