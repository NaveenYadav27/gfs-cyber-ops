import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LayoutDashboard, X, TrendingUp, TrendingDown, Minus, AlertTriangle, CheckCircle2, Wrench, Shield } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { PageHeader } from '@/components/layout/PageHeader';
import { DEPARTMENT_DASHBOARDS } from '@/data/enterprise-organization';

export function DepartmentDashboards() {
  const [selected, setSelected] = useState<string | null>(null);
  const departments = Object.entries(DEPARTMENT_DASHBOARDS);

  return (
    <div className="space-y-4">
      <PageHeader
        icon={<LayoutDashboard className="w-5 h-5 text-[var(--color-gfs-accent)]" />}
        title="Department Dashboards"
        subtitle="Each department at GFS has its own operational view"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
        {departments.map(([key, dept], i) => (
          <Card key={key} delay={i * 0.03} hover onClick={() => setSelected(key)} className="!p-4 group">
            <div className="flex items-center gap-2 mb-3">
              {key === 'SOC' && <Shield className="w-4 h-4 text-[var(--color-gfs-accent)]" />}
              {key === 'Incident Response' && <AlertTriangle className="w-4 h-4 text-[var(--color-gfs-red)]" />}
              {key === 'Threat Intelligence' && <Shield className="w-4 h-4 text-[var(--color-gfs-blue)]" />}
              {!['SOC', 'Incident Response', 'Threat Intelligence'].includes(key) && <Wrench className="w-4 h-4 text-[var(--color-gfs-text-muted)]" />}
              <h4 className="text-sm font-semibold text-[var(--color-gfs-text)]">{key}</h4>
            </div>
            <div className="grid grid-cols-2 gap-2 mb-3">
              {dept.keyMetrics.slice(0, 4).map((metric) => (
                <div key={metric.label} className="p-2 rounded-lg bg-[var(--color-gfs-elevated)]">
                  <div className="text-[9px] text-[var(--color-gfs-text-muted)] uppercase">{metric.label}</div>
                  <div className="text-xs font-semibold text-[var(--color-gfs-text)] font-mono mt-0.5">{metric.value}</div>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-between text-[10px] text-[var(--color-gfs-text-muted)]">
              <span>{dept.teamSize} team members</span>
              <span>{dept.toolsUsed.length} tools</span>
            </div>
          </Card>
        ))}
      </div>

      {/* Selected Department Detail */}
      <AnimatePresence>
        {selected && DEPARTMENT_DASHBOARDS[selected] && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}>
            <Card delay={0} className="!p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-display font-bold text-[var(--color-gfs-text)]">
                  {DEPARTMENT_DASHBOARDS[selected].department} — Operations Dashboard
                </h3>
                <button onClick={() => setSelected(null)} className="text-[var(--color-gfs-text-muted)] hover:text-[var(--color-gfs-text)]">
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Full Metrics */}
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-2 mb-4">
                {DEPARTMENT_DASHBOARDS[selected].keyMetrics.map((m) => (
                  <div key={m.label} className="p-3 rounded-lg bg-[var(--color-gfs-elevated)]">
                    <div className="text-[10px] text-[var(--color-gfs-text-muted)] uppercase tracking-wider">{m.label}</div>
                    <div className="text-lg font-display font-bold text-[var(--color-gfs-text)] mt-1">{m.value}</div>
                    {m.trend && (
                      <div className={`text-[10px] font-mono mt-0.5 ${m.trend.startsWith('-') ? 'text-[var(--color-gfs-green)]' : 'text-[var(--color-gfs-amber)]'}`}>
                        {m.trend} vs last month
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Recent Activity */}
              <div className="mb-4">
                <h4 className="text-[10px] text-[var(--color-gfs-text-muted)] uppercase tracking-wider mb-2">Recent Activity</h4>
                <div className="space-y-1.5">
                  {DEPARTMENT_DASHBOARDS[selected].recentActivity.map((act, i) => (
                    <div key={i} className="flex items-start gap-2 p-2 rounded-lg bg-[var(--color-gfs-surface)]">
                      <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-gfs-accent)] mt-1.5 flex-shrink-0" />
                      <span className="text-[11px] text-[var(--color-gfs-text-secondary)]">{act}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tools */}
              <div>
                <h4 className="text-[10px] text-[var(--color-gfs-text-muted)] uppercase tracking-wider mb-2">Tools Used</h4>
                <div className="flex flex-wrap gap-1.5">
                  {DEPARTMENT_DASHBOARDS[selected].toolsUsed.map((t) => <Badge key={t} variant="default">{t}</Badge>)}
                </div>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
