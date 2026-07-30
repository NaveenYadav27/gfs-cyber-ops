import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight, Shield, AlertTriangle, Server, Database, Users, IndianRupee, Clock } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { PageHeader } from '@/components/layout/PageHeader';
import { BUSINESS_UNITS } from '@/data/enterprise-organization';
import type { BusinessUnit } from '@/data/enterprise-organization';

function BusinessUnitDetail({ unit, onClose }: { unit: BusinessUnit; onClose: () => void }) {
  return (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}
      className="fixed right-0 top-0 h-screen w-[440px] bg-[var(--color-gfs-deep)] border-l border-[var(--color-gfs-border-light)] z-50 overflow-y-auto shadow-2xl">
      <div className="p-6 space-y-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl">{unit.icon}</span>
            <div>
              <h2 className="text-sm font-semibold text-[var(--color-gfs-text)]">{unit.name}</h2>
              <p className="text-[10px] text-[var(--color-gfs-text-muted)]">{unit.headTitle} — {unit.head}</p>
            </div>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-[var(--color-gfs-elevated)] text-[var(--color-gfs-text-muted)]">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-2 gap-2">
          {[
            { label: 'Customers', value: unit.customers, icon: Users },
            { label: 'Revenue', value: unit.revenue, icon: IndianRupee },
            { label: 'Daily Volume', value: unit.dailyTransactions, icon: Clock },
            { label: 'Employees', value: unit.employees.toLocaleString(), icon: Users },
          ].map((f) => (
            <div key={f.label} className="p-2.5 rounded-lg bg-[var(--color-gfs-surface)]">
              <div className="flex items-center gap-1 mb-0.5">
                <f.icon className="w-2.5 h-2.5 text-[var(--color-gfs-text-muted)]" />
                <span className="text-[9px] text-[var(--color-gfs-text-muted)] uppercase">{f.label}</span>
              </div>
              <div className="text-[11px] text-[var(--color-gfs-text)] font-mono">{f.value}</div>
            </div>
          ))}
        </div>

        <div className="p-3 rounded-lg bg-[var(--color-gfs-surface)] border border-[var(--color-gfs-border-light)]">
          <h4 className="text-[10px] text-[var(--color-gfs-text-muted)] uppercase tracking-wider mb-2">Overview</h4>
          <p className="text-xs text-[var(--color-gfs-text-secondary)] leading-relaxed">{unit.description}</p>
        </div>

        <div className="p-3 rounded-lg bg-[var(--color-gfs-accent-dim)] border border-[var(--color-gfs-accent)]/20">
          <h4 className="text-[10px] text-[var(--color-gfs-accent)] uppercase tracking-wider mb-2 font-semibold">Security Importance</h4>
          <p className="text-xs text-[var(--color-gfs-text-secondary)] leading-relaxed">{unit.securityImportance}</p>
        </div>

        <div>
          <h4 className="text-[10px] text-[var(--color-gfs-text-muted)] uppercase tracking-wider mb-2">Critical Applications</h4>
          <div className="flex flex-wrap gap-1.5">
            {unit.criticalApps.map((app) => <Badge key={app} variant="accent">{app}</Badge>)}
          </div>
        </div>

        <div>
          <h4 className="text-[10px] text-[var(--color-gfs-text-muted)] uppercase tracking-wider mb-2">Critical Data</h4>
          <div className="flex flex-wrap gap-1.5">
            {unit.criticalData.map((d) => <Badge key={d} variant="default">{d}</Badge>)}
          </div>
        </div>

        <div>
          <h4 className="text-[10px] text-[var(--color-gfs-text-muted)] uppercase tracking-wider mb-2">Common Threats</h4>
          <div className="space-y-1.5">
            {unit.commonThreats.map((t) => (
              <div key={t} className="flex items-center gap-2 p-2 rounded-lg bg-[var(--color-gfs-red-dim)]">
                <AlertTriangle className="w-3 h-3 text-[var(--color-gfs-red)] flex-shrink-0" />
                <span className="text-[11px] text-[var(--color-gfs-text)]">{t}</span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-[10px] text-[var(--color-gfs-text-muted)] uppercase tracking-wider mb-2">Infrastructure</h4>
          <div className="space-y-1">
            {unit.infrastructure.map((infra) => (
              <div key={infra} className="flex items-center gap-2 text-[11px] text-[var(--color-gfs-text-secondary)]">
                <Server className="w-3 h-3 text-[var(--color-gfs-text-muted)] flex-shrink-0" />
                {infra}
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function BusinessUnits() {
  const [selectedUnit, setSelectedUnit] = useState<BusinessUnit | null>(null);

  return (
    <div className="space-y-4">
      <PageHeader
        icon={<IndianRupee className="w-5 h-5 text-[var(--color-gfs-accent)]" />}
        title="GFS Business Units"
        subtitle="Understanding how Global Financial Services generates revenue and serves customers"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
        {BUSINESS_UNITS.map((unit, i) => (
          <Card key={unit.id} delay={i * 0.03} hover onClick={() => setSelectedUnit(unit)} className="!p-4 group">
            <div className="flex items-start gap-3">
              <span className="text-2xl flex-shrink-0 mt-0.5">{unit.icon}</span>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-semibold text-[var(--color-gfs-text)]">{unit.name}</h4>
                <p className="text-[10px] text-[var(--color-gfs-text-muted)] mt-0.5">{unit.head} — {unit.headTitle}</p>
                <p className="text-[11px] text-[var(--color-gfs-text-secondary)] mt-1.5 line-clamp-2">{unit.description}</p>
              </div>
            </div>
            <div className="flex items-center justify-between mt-3 pt-3 border-t border-[var(--color-gfs-border-light)]">
              <div className="flex items-center gap-3">
                <span className="text-[10px] text-[var(--color-gfs-text-muted)]">{unit.employees.toLocaleString()} employees</span>
                <span className="text-[10px] text-[var(--color-gfs-text-muted)]">{unit.location}</span>
              </div>
              <span className="flex items-center gap-1 text-[10px] text-[var(--color-gfs-accent)] opacity-0 group-hover:opacity-100 transition-opacity">
                Explore <ArrowRight className="w-3 h-3" />
              </span>
            </div>
          </Card>
        ))}
      </div>

      <AnimatePresence>
        {selectedUnit && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40" onClick={() => setSelectedUnit(null)} />
            <BusinessUnitDetail unit={selectedUnit} onClose={() => setSelectedUnit(null)} />
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
