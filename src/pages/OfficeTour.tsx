import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, X, Users, Shield, Server, Building2, Monitor, Clock } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { StatusIndicator } from '@/components/ui/StatusIndicator';
import { PageHeader } from '@/components/layout/PageHeader';
import { OFFICE_LOCATIONS } from '@/data/enterprise-organization';
import type { OfficeLocation } from '@/data/enterprise-organization';

const typeIcons: Record<string, React.ElementType> = {
  headquarters: Building2, soc: Shield, datacenter: Server, 'cloud-ops': Monitor,
  'dr-site': Server, regional: MapPin, 'branch-hub': MapPin,
};

const typeColors: Record<string, string> = {
  headquarters: 'var(--color-gfs-amber)', soc: 'var(--color-gfs-accent)',
  datacenter: 'var(--color-gfs-blue)', cloudOps: 'var(--color-gfs-purple)',
  'dr-site': 'var(--color-gfs-red)', regional: 'var(--color-gfs-green)',
  'branch-hub': 'var(--color-gfs-text-muted)',
};

function OfficeDetail({ office, onClose }: { office: OfficeLocation; onClose: () => void }) {
  const Icon = typeIcons[office.type] || MapPin;
  return (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}
      className="fixed right-0 top-0 h-screen w-[440px] bg-[var(--color-gfs-deep)] border-l border-[var(--color-gfs-border-light)] z-50 overflow-y-auto shadow-2xl">
      <div className="p-6 space-y-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: `${typeColors[office.type]}20` }}>
              <Icon className="w-5 h-5" style={{ color: typeColors[office.type] }} />
            </div>
            <div>
              <h2 className="text-sm font-semibold text-[var(--color-gfs-text)]">{office.name}</h2>
              <p className="text-[10px] text-[var(--color-gfs-text-muted)]">{office.city}</p>
            </div>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-[var(--color-gfs-elevated)] text-[var(--color-gfs-text-muted)]">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-3 gap-2">
          <div className="p-2.5 rounded-lg bg-[var(--color-gfs-surface)] text-center">
            <div className="text-lg font-display font-bold text-[var(--color-gfs-text)]">{office.floors}</div>
            <div className="text-[9px] text-[var(--color-gfs-text-muted)] uppercase">Floors</div>
          </div>
          <div className="p-2.5 rounded-lg bg-[var(--color-gfs-surface)] text-center">
            <div className="text-lg font-display font-bold text-[var(--color-gfs-text)]">{office.employees.toLocaleString()}</div>
            <div className="text-[9px] text-[var(--color-gfs-text-muted)] uppercase">Employees</div>
          </div>
          <div className="p-2.5 rounded-lg bg-[var(--color-gfs-surface)] text-center">
            <div className="text-lg font-display font-bold text-[var(--color-gfs-text)]">{office.type.toUpperCase()}</div>
            <div className="text-[9px] text-[var(--color-gfs-text-muted)] uppercase">Type</div>
          </div>
        </div>

        <div className="p-3 rounded-lg bg-[var(--color-gfs-surface)] border border-[var(--color-gfs-border-light)]">
          <p className="text-xs text-[var(--color-gfs-text-secondary)] leading-relaxed">{office.description}</p>
        </div>

        <div className="p-3 rounded-lg bg-[var(--color-gfs-accent-dim)] border border-[var(--color-gfs-accent)]/20">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-[var(--color-gfs-accent)]" />
            <span className="text-[11px] text-[var(--color-gfs-accent)] font-semibold">{office.securityLevel}</span>
          </div>
        </div>

        <div>
          <h4 className="text-[10px] text-[var(--color-gfs-text-muted)] uppercase tracking-wider mb-2">Critical Systems</h4>
          <div className="flex flex-wrap gap-1.5">
            {office.criticalSystems.map((sys) => <Badge key={sys} variant="accent">{sys}</Badge>)}
          </div>
        </div>

        <div>
          <h4 className="text-[10px] text-[var(--color-gfs-text-muted)] uppercase tracking-wider mb-2">Highlights</h4>
          <div className="space-y-1.5">
            {office.highlights.map((h) => (
              <div key={h} className="flex items-center gap-2 text-[11px] text-[var(--color-gfs-text-secondary)]">
                <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-gfs-accent)]" /> {h}
              </div>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-[10px] text-[var(--color-gfs-text-muted)] uppercase tracking-wider mb-2">Address</h4>
          <p className="text-[11px] text-[var(--color-gfs-text-secondary)]">{office.address}</p>
        </div>
      </div>
    </motion.div>
  );
}

export function OfficeTour() {
  const [selected, setSelected] = useState<OfficeLocation | null>(null);

  return (
    <div className="space-y-4">
      <PageHeader
        icon={<Building2 className="w-5 h-5 text-[var(--color-gfs-accent)]" />}
        title="Office Tour"
        subtitle="GFS India — 9 locations across India"
      />

      {/* Map overview */}
      <Card delay={0} className="!p-0 overflow-hidden relative">
        <div className="h-64 gfs-grid-bg relative" style={{
          background: 'radial-gradient(ellipse at 40% 50%, rgba(0,229,199,0.05) 0%, transparent 50%), var(--color-gfs-surface)',
        }}>
          {/* Simplified India map positions */}
          {OFFICE_LOCATIONS.map((loc, i) => (
            <motion.button key={loc.id}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 + i * 0.05, type: 'spring' }}
              onClick={() => setSelected(loc)}
              className="absolute group"
              style={{ left: `${loc.mapPosition.x}%`, top: `${loc.mapPosition.y}%`, transform: 'translate(-50%, -50%)' }}>
              <div className={`w-3 h-3 rounded-full transition-all group-hover:scale-150 ${loc.id === 'loc-hyd' ? 'bg-[var(--color-gfs-accent)] animate-pulse-gfs' : 'bg-[var(--color-gfs-blue)]'}`} />
              <div className="absolute top-4 left-1/2 -translate-x-1/2 whitespace-nowrap bg-[var(--color-gfs-elevated)] px-2 py-1 rounded text-[8px] text-[var(--color-gfs-text)] opacity-0 group-hover:opacity-100 transition-opacity border border-[var(--color-gfs-border)]">
                {loc.city} — {loc.type}
              </div>
            </motion.button>
          ))}
          {/* Title */}
          <div className="absolute bottom-3 left-4 text-[10px] text-[var(--color-gfs-text-muted)] font-mono">GFS India — All Locations</div>
          <div className="absolute bottom-3 right-4 text-[10px] text-[var(--color-gfs-accent)] font-mono">YOUR LOCATION: Hyderabad SOC</div>
        </div>
      </Card>

      {/* Office cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
        {OFFICE_LOCATIONS.map((loc, i) => {
          const Icon = typeIcons[loc.type] || MapPin;
          return (
            <Card key={loc.id} delay={0.1 + i * 0.03} hover onClick={() => setSelected(loc)}
              className={`!p-4 group ${loc.id === 'loc-hyd' ? '!border-[var(--color-gfs-accent)]/30' : ''}`}>
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: `${typeColors[loc.type]}15` }}>
                  <Icon className="w-5 h-5" style={{ color: typeColors[loc.type] }} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-semibold text-[var(--color-gfs-text)] truncate">{loc.name}</h4>
                    {loc.id === 'loc-hyd' && <Badge variant="accent">YOUR LOC</Badge>}
                  </div>
                  <p className="text-[10px] text-[var(--color-gfs-text-muted)]">{loc.city} • {loc.floors} floors • {loc.employees.toLocaleString()} employees</p>
                  <p className="text-[10px] text-[var(--color-gfs-accent)] mt-0.5">{loc.securityLevel}</p>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      <AnimatePresence>
        {selected && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40" onClick={() => setSelected(null)} />
            <OfficeDetail office={selected} onClose={() => setSelected(null)} />
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
