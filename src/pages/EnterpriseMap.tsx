// src/pages/EnterpriseMap.tsx
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Server, Shield, Cloud, Database, Globe, Wifi, Monitor, Lock, X, ExternalLink,
  AlertTriangle, Clock, ArrowRight,
} from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { StatusIndicator } from '@/components/ui/StatusIndicator';
import { ENTERPRISE_SYSTEMS } from '@/data/enterprise';
import type { EnterpriseSystem } from '@/types';

const categoryIcons: Record<string, React.ElementType> = {
  network: Wifi, compute: Server, security: Shield, identity: Lock,
  data: Database, cloud: Cloud, application: Monitor, endpoint: Monitor,
};

const categoryColors: Record<string, string> = {
  network: 'var(--color-gfs-blue)', compute: 'var(--color-gfs-green)',
  security: 'var(--color-gfs-accent)', identity: 'var(--color-gfs-purple)',
  data: 'var(--color-gfs-amber)', cloud: 'var(--color-gfs-blue)',
  application: 'var(--color-gfs-green)', endpoint: 'var(--color-gfs-text-muted)',
};

function SystemDetailPanel({ system, onClose }: { system: EnterpriseSystem; onClose: () => void }) {
  const Icon = categoryIcons[system.category] || Server;

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className="fixed right-0 top-0 h-screen w-[420px] bg-[var(--color-gfs-deep)] border-l border-[var(--color-gfs-border-light)] z-50 overflow-y-auto"
    >
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: `${categoryColors[system.category]}20` }}>
              <Icon className="w-5 h-5" style={{ color: categoryColors[system.category] }} />
            </div>
            <div>
              <h2 className="text-sm font-semibold text-[var(--color-gfs-text)]">{system.name}</h2>
              <p className="text-[10px] text-[var(--color-gfs-text-muted)]">{system.type}</p>
            </div>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-[var(--color-gfs-elevated)] text-[var(--color-gfs-text-muted)]">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-4">
          {/* Status */}
          <div className="p-3 rounded-lg bg-[var(--color-gfs-surface)] border border-[var(--color-gfs-border-light)]">
            <div className="flex items-center justify-between">
              <span className="text-xs text-[var(--color-gfs-text-muted)]">Status</span>
              <StatusIndicator status={system.status} label />
            </div>
          </div>

          {/* Info */}
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: 'IP Address', value: system.ip },
              { label: 'Location', value: system.location },
              { label: 'Owner', value: system.owner },
              { label: 'Uptime', value: system.uptime },
              { label: 'Criticality', value: system.criticality },
              { label: 'Last Scan', value: system.lastScan },
            ].map((field) => (
              <div key={field.label} className="p-2 rounded-lg bg-[var(--color-gfs-surface)]">
                <div className="text-[10px] text-[var(--color-gfs-text-muted)] uppercase tracking-wider">{field.label}</div>
                <div className="text-xs text-[var(--color-gfs-text)] font-mono mt-0.5 capitalize">{field.value}</div>
              </div>
            ))}
          </div>

          {/* Description */}
          <div>
            <h4 className="text-[10px] text-[var(--color-gfs-text-muted)] uppercase tracking-wider mb-2">Description</h4>
            <p className="text-xs text-[var(--color-gfs-text-secondary)] leading-relaxed">{system.description}</p>
          </div>

          {/* Dependencies */}
          <div>
            <h4 className="text-[10px] text-[var(--color-gfs-text-muted)] uppercase tracking-wider mb-2">Dependencies</h4>
            <div className="flex flex-wrap gap-1.5">
              {system.dependencies.map((dep) => (
                <Badge key={dep} variant="default">{dep}</Badge>
              ))}
            </div>
          </div>

          {/* Known Threats */}
          <div>
            <h4 className="text-[10px] text-[var(--color-gfs-text-muted)] uppercase tracking-wider mb-2">Known Threats</h4>
            <div className="space-y-1.5">
              {system.threats.map((threat) => (
                <div key={threat} className="flex items-center gap-2 p-2 rounded-lg bg-[var(--color-gfs-red-dim)]">
                  <AlertTriangle className="w-3 h-3 text-[var(--color-gfs-red)]" />
                  <span className="text-[11px] text-[var(--color-gfs-text)]">{threat}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function EnterpriseMap() {
  const [selectedSystem, setSelectedSystem] = useState<EnterpriseSystem | null>(null);
  const [filterCategory, setFilterCategory] = useState<string>('all');

  const categories = ['all', ...new Set(ENTERPRISE_SYSTEMS.map((s) => s.category))];
  const filteredSystems = filterCategory === 'all' ? ENTERPRISE_SYSTEMS : ENTERPRISE_SYSTEMS.filter((s) => s.category === filterCategory);

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-display font-bold text-[var(--color-gfs-text)]">Enterprise Infrastructure Map</h2>
          <p className="text-xs text-[var(--color-gfs-text-muted)] mt-0.5">Interactive map of all GFS systems and infrastructure</p>
        </div>
        <div className="flex items-center gap-3 text-xs text-[var(--color-gfs-text-muted)]">
          <div className="flex items-center gap-1"><StatusIndicator status="online" size="sm" /> Online</div>
          <div className="flex items-center gap-1"><StatusIndicator status="degraded" size="sm" /> Degraded</div>
          <div className="flex items-center gap-1"><StatusIndicator status="offline" size="sm" /> Offline</div>
        </div>
      </div>

      {/* Category Filters */}
      <div className="flex items-center gap-2 flex-wrap">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilterCategory(cat)}
            className={`px-3 py-1.5 rounded-lg text-[11px] capitalize transition-colors ${
              filterCategory === cat
                ? 'bg-[var(--color-gfs-accent-dim)] text-[var(--color-gfs-accent)] border border-[var(--color-gfs-accent)]/30'
                : 'bg-[var(--color-gfs-surface)] text-[var(--color-gfs-text-muted)] hover:text-[var(--color-gfs-text)] border border-transparent'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Systems Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
        {filteredSystems.map((system, i) => {
          const Icon = categoryIcons[system.category] || Server;
          return (
            <Card
              key={system.id}
              delay={i * 0.03}
              hover
              onClick={() => setSelectedSystem(system)}
              className="!p-4 group"
            >
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-110" style={{ background: `${categoryColors[system.category]}15` }}>
                  <Icon className="w-5 h-5" style={{ color: categoryColors[system.category] }} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-semibold text-[var(--color-gfs-text)] truncate">{system.name}</h4>
                    <StatusIndicator status={system.status} size="sm" />
                  </div>
                  <p className="text-[10px] text-[var(--color-gfs-text-muted)] mt-0.5">{system.type} — {system.location}</p>
                  <p className="text-[11px] text-[var(--color-gfs-text-secondary)] mt-1.5 line-clamp-2">{system.description}</p>
                </div>
              </div>
              <div className="flex items-center justify-between mt-3 pt-3 border-t border-[var(--color-gfs-border-light)]">
                <div className="flex items-center gap-2">
                  <Badge variant={
                    system.criticality === 'critical' ? 'critical' :
                    system.criticality === 'high' ? 'high' :
                    system.criticality === 'medium' ? 'medium' : 'low'
                  }>
                    {system.criticality}
                  </Badge>
                  <span className="text-[10px] text-[var(--color-gfs-text-muted)] font-mono">{system.uptime}</span>
                </div>
                <div className="flex items-center gap-1 text-[10px] text-[var(--color-gfs-accent)] opacity-0 group-hover:opacity-100 transition-opacity">
                  Details <ArrowRight className="w-3 h-3" />
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Detail Panel */}
      <AnimatePresence>
        {selectedSystem && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 z-40"
              onClick={() => setSelectedSystem(null)}
            />
            <SystemDetailPanel system={selectedSystem} onClose={() => setSelectedSystem(null)} />
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
