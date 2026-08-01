import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Search, MapPin, Shield, Briefcase, Mail, Phone, Laptop, Key, Clock, ChevronRight, Eye } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { PageHeader } from '@/components/layout/PageHeader';
import EmployeeDigitalTwin from '@/components/enterprise/EmployeeDigitalTwin';
import { useEnterprise } from '@/store/useEnterprise';
import type { Employee } from '@/types/enterprise';

const statusColor: Record<string, { dot: string; label: string; badge: 'success' | 'default' | 'medium' | 'critical' }> = {
  active: { dot: 'var(--color-gfs-green)', label: 'Online', badge: 'success' },
  'in-meeting': { dot: 'var(--color-gfs-amber)', label: 'In Meeting', badge: 'medium' },
  away: { dot: 'var(--color-gfs-text-muted)', label: 'Away', badge: 'default' },
  offline: { dot: 'var(--color-gfs-text-disabled)', label: 'Offline', badge: 'default' },
  'on-leave': { dot: 'var(--color-gfs-red)', label: 'On Leave', badge: 'critical' },
};

export function EmployeeDirectory() {
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<Employee | null>(null);
  const [filter, setFilter] = useState('all');
  const { employees } = useEnterprise();

  const filtered = employees.filter((e) => {
    if (search && !e.name.toLowerCase().includes(search.toLowerCase()) && !e.designation.toLowerCase().includes(search.toLowerCase()) && !e.department.toLowerCase().includes(search.toLowerCase())) return false;
    if (filter === 'leadership' && e.level > 3) return false;
    if (filter === 'soc' && !e.department.includes('SOC') && !e.department.includes('Threat')) return false;
    if (filter === 'online' && e.status !== 'active') return false;
    return true;
  });

  return (
    <div className="space-y-4">
      <PageHeader
        icon={<Users className="w-5 h-5 text-[var(--color-gfs-accent)]" />}
        title="Employee Directory"
        subtitle={`${employees.length} employees across GFS — ${employees.filter((e) => e.status === 'active').length} currently online`}
      />

      <div className="flex items-center gap-3">
        <div className="relative flex-1">
          <Search className="w-3.5 h-3.5 text-[var(--color-gfs-text-muted)] absolute left-3 top-1/2 -translate-y-1/2" />
          <input value={search} onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, designation, department..."
            className="w-full pl-9 pr-4 py-2 rounded-lg bg-[var(--color-gfs-surface)] border border-[var(--color-gfs-border-light)] text-xs text-[var(--color-gfs-text)] placeholder:text-[var(--color-gfs-text-muted)] focus:outline-none focus:border-[var(--color-gfs-accent)] transition-colors" />
        </div>
        <div className="flex items-center gap-1">
          {['all', 'leadership', 'soc', 'online'].map((f) => (
            <button key={f} onClick={() => setFilter(f)}
              className={`px-2.5 py-1 rounded text-[10px] capitalize transition-colors ${
                filter === f ? 'bg-[var(--color-gfs-accent-dim)] text-[var(--color-gfs-accent)]' : 'text-[var(--color-gfs-text-muted)] hover:text-[var(--color-gfs-text)]'
              }`}>{f}</button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
        {filtered.map((emp, i) => {
          const sc = statusColor[emp.status];
          return (
            <motion.div key={emp.id} initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.03 }}>
              <Card delay={0} hover onClick={() => setSelected(emp)} className="!p-4">
                <div className="flex items-start gap-3">
                  {/* Avatar */}
                  <div className="w-10 h-10 rounded-full bg-[var(--color-gfs-elevated)] flex items-center justify-center flex-shrink-0 relative">
                    <span className="text-sm font-display font-bold text-[var(--color-gfs-accent)]">
                      {emp.name.split(' ').map((n) => n[0]).join('')}
                    </span>
                    <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-[var(--color-gfs-surface)]"
                      style={{ background: sc.dot }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-semibold text-[var(--color-gfs-text)]">{emp.name}</span>
                    </div>
                    <div className="text-[10px] text-[var(--color-gfs-text-secondary)]">{emp.designation}</div>
                    <div className="text-[9px] text-[var(--color-gfs-text-muted)]">{emp.department} • {emp.location}</div>
                    <div className="flex items-center gap-1.5 mt-1.5">
                      <Badge variant={sc.badge}>{sc.label}</Badge>
                      {emp.vpnSession && <Badge variant="accent">VPN</Badge>}
                      {emp.securityClearance === 'privileged' && <Badge variant="high">Privileged</Badge>}
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-[var(--color-gfs-text-muted)] flex-shrink-0 mt-1" />
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {selected && (
        <EmployeeDigitalTwin employee={selected} onClose={() => setSelected(null)} />
      )}
    </div>
  );
}
