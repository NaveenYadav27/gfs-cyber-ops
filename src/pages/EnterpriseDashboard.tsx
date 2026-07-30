import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Shield, Users, Server, Activity, AlertTriangle, TrendingUp, Clock, Globe,
  Building2, Cloud, Eye, Zap, Radio, ArrowUpRight, ChevronRight, BarChart3,
  Mail, Database, Wifi, Target, Brain, Lock,
} from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { PageHeader } from '@/components/layout/PageHeader';
import { Timeline, type TimelineEvent } from '@/components/ui/Timeline';
import { useEnterprise } from '@/store/useEnterprise';
import { generateEnterpriseEvent, CYBER_UNITS, TECHNOLOGIES, INFRASTRUCTURE } from '@/data/enterprise';
import { useStore } from '@/store/useStore';

// ── KPI Data ──
const ENTERPRISE_KPI = [
  { label: 'Active Employees', value: '47,842', icon: Users, color: 'var(--color-gfs-accent)', trend: '+12 today', trendUp: true },
  { label: 'Endpoints Protected', value: '42,100', icon: Shield, color: 'var(--color-gfs-green)', trend: '99.7% healthy', trendUp: true },
  { label: 'Daily Transactions', value: '1.8 Cr', icon: TrendingUp, color: 'var(--color-gfs-blue)', trend: '+2.3% vs yesterday', trendUp: true },
  { label: 'Customers', value: '75M+', icon: Globe, color: 'var(--color-gfs-amber)', trend: 'Across 12 countries', trendUp: true },
  { label: 'Active Threats', value: '3', icon: AlertTriangle, color: 'var(--color-gfs-red)', trend: 'Being investigated', trendUp: false },
  { label: 'SOC Alerts (24h)', value: '147', icon: Eye, color: 'var(--color-gfs-purple)', trend: 'Mean triage: 3.2 min', trendUp: true },
];

const SECURITY_STATUS = [
  { label: 'Threat Level', value: 'ELEVATED', color: 'var(--color-gfs-amber)', icon: Shield },
  { label: 'SOC Status', value: 'OPERATIONAL', color: 'var(--color-gfs-green)', icon: Radio },
  { label: 'SIEM Health', value: '99.99%', color: 'var(--color-gfs-green)', icon: Database },
  { label: 'EDR Coverage', value: '99.7%', color: 'var(--color-gfs-green)', icon: Shield },
  { label: 'Patch Compliance', value: '94.2%', color: 'var(--color-gfs-amber)', icon: Server },
  { label: 'MFA Coverage', value: '99.2%', color: 'var(--color-gfs-green)', icon: Lock },
];

export function EnterpriseDashboard() {
  const { events, addEvent } = useEnterprise();
  const { setCurrentPage } = useStore();
  const [liveTime, setLiveTime] = useState(new Date());

  // Generate live events
  useEffect(() => {
    const interval = setInterval(() => {
      addEvent(generateEnterpriseEvent());
    }, 3000 + Math.random() * 4000);

    const timer = setInterval(() => setLiveTime(new Date()), 1000);

    return () => { clearInterval(interval); clearInterval(timer); };
  }, []);

  const recentEvents = events.slice(0, 15);

  return (
    <div className="space-y-4">
      <PageHeader
        icon={<Building2 className="w-5 h-5 text-[var(--color-gfs-accent)]" />}
        title="GFS Enterprise Dashboard"
        subtitle="Global Financial Services — Live Enterprise Overview"
        badge={
          <div className="flex items-center gap-2">
            <Badge variant="success">ALL SYSTEMS NOMINAL</Badge>
            <span className="text-[10px] text-[var(--color-gfs-text-muted)] font-mono">
              {liveTime.toLocaleString('en-IN', { timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false })} IST
            </span>
          </div>
        }
      />

      {/* Enterprise KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3">
        {ENTERPRISE_KPI.map((kpi, i) => (
          <Card key={kpi.label} delay={i * 0.03} className="!p-3">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: `${kpi.color}12` }}>
                <kpi.icon className="w-3.5 h-3.5" style={{ color: kpi.color }} />
              </div>
              <span className="text-[10px] text-[var(--color-gfs-text-muted)]">{kpi.label}</span>
            </div>
            <div className="text-xl font-display font-bold" style={{ color: kpi.color }}>{kpi.value}</div>
            <div className="text-[9px] text-[var(--color-gfs-text-muted)] mt-0.5">{kpi.trend}</div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        {/* Live Activity Feed */}
        <div className="xl:col-span-2">
          <Card delay={0.15} className="!p-0 overflow-hidden">
            <div className="px-4 py-2.5 border-b border-[var(--color-gfs-border-light)] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Activity className="w-3.5 h-3.5 text-[var(--color-gfs-accent)]" />
                <span className="text-xs font-semibold text-[var(--color-gfs-text)]">Live Enterprise Activity</span>
                <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-gfs-green)] animate-gfs-pulse-dot" />
              </div>
              <button onClick={() => setCurrentPage('activity')} className="text-[10px] text-[var(--color-gfs-accent)]">View All →</button>
            </div>
            <div className="max-h-[500px] overflow-y-auto divide-y divide-[var(--color-gfs-border-light)]">
              <AnimatePresence initial={false}>
                {recentEvents.map((event) => {
                  const sevColors: Record<string, string> = {
                    info: 'var(--color-gfs-text-muted)', low: 'var(--color-gfs-green)',
                    medium: 'var(--color-gfs-amber)', high: 'var(--color-gfs-red)', critical: 'var(--color-gfs-red)',
                  };
                  return (
                    <motion.div key={event.id} initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}
                      className="px-4 py-2.5 hover:bg-[var(--color-gfs-hover)] transition-colors">
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0" style={{ background: sevColors[event.severity] }} />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="text-[11px] font-semibold text-[var(--color-gfs-text)]">{event.title}</span>
                            <Badge variant={event.severity === 'critical' ? 'critical' : event.severity === 'high' ? 'high' : event.severity === 'medium' ? 'medium' : 'default'}>
                              {event.severity}
                            </Badge>
                          </div>
                          <p className="text-[10px] text-[var(--color-gfs-text-secondary)] mt-0.5">{event.description}</p>
                          <div className="flex items-center gap-2 mt-0.5">
                            <span className="text-[9px] text-[var(--color-gfs-text-muted)]">{event.source}</span>
                            <span className="text-[9px] text-[var(--color-gfs-text-muted)] font-mono">
                              {new Date(event.timestamp).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit', timeZone: 'Asia/Kolkata' })}
                            </span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
              {recentEvents.length === 0 && (
                <div className="px-4 py-12 text-center">
                  <div className="w-6 h-6 rounded-full border-2 border-[var(--color-gfs-border)] border-t-[var(--color-gfs-accent)] animate-spin mx-auto" />
                  <p className="text-[10px] text-[var(--color-gfs-text-muted)] mt-2">Generating enterprise activity...</p>
                </div>
              )}
            </div>
          </Card>
        </div>

        {/* Right sidebar */}
        <div className="space-y-4">
          {/* Security Status */}
          <Card delay={0.2} className="!p-4">
            <div className="flex items-center gap-2 mb-3">
              <Shield className="w-3.5 h-3.5 text-[var(--color-gfs-accent)]" />
              <span className="text-xs font-semibold text-[var(--color-gfs-text)]">Security Posture</span>
            </div>
            <div className="space-y-2">
              {SECURITY_STATUS.map((s) => (
                <div key={s.label} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <s.icon className="w-3 h-3" style={{ color: s.color }} />
                    <span className="text-[11px] text-[var(--color-gfs-text-secondary)]">{s.label}</span>
                  </div>
                  <span className="text-[10px] font-mono font-semibold" style={{ color: s.color }}>{s.value}</span>
                </div>
              ))}
            </div>
          </Card>

          {/* Cyber Defense Units */}
          <Card delay={0.25} className="!p-4">
            <div className="flex items-center gap-2 mb-3">
              <Brain className="w-3.5 h-3.5 text-[var(--color-gfs-purple)]" />
              <span className="text-xs font-semibold text-[var(--color-gfs-text)]">Cyber Defense</span>
            </div>
            <div className="space-y-1.5">
              {CYBER_UNITS.slice(0, 5).map((unit) => (
                <button key={unit.id} onClick={() => setCurrentPage('soc')}
                  className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-[var(--color-gfs-hover)] transition-colors text-left">
                  <div>
                    <span className="text-[10px] font-semibold text-[var(--color-gfs-text)]">{unit.name}</span>
                    <div className="flex items-center gap-2 text-[9px] text-[var(--color-gfs-text-muted)]">
                      <span>{unit.teamSize} members</span>
                      {unit.openAlerts > 0 && <span className="text-[var(--color-gfs-amber)]">{unit.openAlerts} alerts</span>}
                    </div>
                  </div>
                  <Badge variant={unit.status === 'critical' ? 'critical' : unit.status === 'elevated' ? 'medium' : 'success'}>
                    {unit.status}
                  </Badge>
                </button>
              ))}
            </div>
          </Card>

          {/* Key Technologies */}
          <Card delay={0.3} className="!p-4">
            <div className="flex items-center gap-2 mb-3">
              <Zap className="w-3.5 h-3.5 text-[var(--color-gfs-amber)]" />
              <span className="text-xs font-semibold text-[var(--color-gfs-text)]">Key Technologies</span>
            </div>
            <div className="space-y-1.5">
              {TECHNOLOGIES.slice(0, 5).map((tech) => (
                <div key={tech.id} className="flex items-center justify-between text-[10px]">
                  <span className="text-[var(--color-gfs-text-secondary)]">{tech.name}</span>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[var(--color-gfs-text-muted)] font-mono">{tech.logsPerDay}</span>
                    <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-gfs-green)]" />
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Infrastructure Health */}
          <Card delay={0.35} className="!p-4">
            <div className="flex items-center gap-2 mb-3">
              <Server className="w-3.5 h-3.5 text-[var(--color-gfs-blue)]" />
              <span className="text-xs font-semibold text-[var(--color-gfs-text)]">Infrastructure</span>
            </div>
            <div className="space-y-1.5">
              {INFRASTRUCTURE.slice(0, 4).map((infra) => (
                <div key={infra.id} className="flex items-center justify-between text-[10px]">
                  <span className="text-[var(--color-gfs-text-secondary)] truncate">{infra.name}</span>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[var(--color-gfs-text-muted)] font-mono">{infra.health}%</span>
                    <div className="w-1.5 h-1.5 rounded-full" style={{
                      background: infra.health > 95 ? 'var(--color-gfs-green)' : infra.health > 85 ? 'var(--color-gfs-amber)' : 'var(--color-gfs-red)',
                    }} />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
