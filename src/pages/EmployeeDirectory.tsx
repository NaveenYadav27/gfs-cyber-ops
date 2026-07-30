import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, MapPin, Mail, Phone, Briefcase, Wrench, Shield, Clock, Award, Laptop, MapPinIcon } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { StatusIndicator } from '@/components/ui/StatusIndicator';
import { PageHeader } from '@/components/layout/PageHeader';
import { EMPLOYEE_DIRECTORY } from '@/data/enterprise-organization';
import type { EmployeeProfile } from '@/data/enterprise-organization';

function EmployeeDetail({ employee, onClose }: { employee: EmployeeProfile; onClose: () => void }) {
  return (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}
      className="fixed right-0 top-0 h-screen w-[440px] bg-[var(--color-gfs-deep)] border-l border-[var(--color-gfs-border-light)] z-50 overflow-y-auto shadow-2xl">
      <div className="p-6 space-y-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl flex items-center justify-center" style={{ background: employee.avatarColor }}>
              <span className="text-sm font-bold text-white">{employee.avatarInitials}</span>
            </div>
            <div>
              <h2 className="text-sm font-semibold text-[var(--color-gfs-text)]">{employee.name}</h2>
              <p className="text-[10px] text-[var(--color-gfs-accent)]">{employee.title}</p>
              <p className="text-[10px] text-[var(--color-gfs-text-muted)]">{employee.department}</p>
            </div>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-[var(--color-gfs-elevated)] text-[var(--color-gfs-text-muted)]">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-2">
          {[
            { label: 'Employee ID', value: employee.employeeId },
            { label: 'Manager', value: employee.manager },
            { label: 'Location', value: employee.location },
            { label: 'Experience', value: employee.experience },
            { label: 'Email', value: employee.email },
            { label: 'Phone', value: employee.phone },
          ].map((f) => (
            <div key={f.label} className="p-2 rounded-lg bg-[var(--color-gfs-surface)]">
              <div className="text-[9px] text-[var(--color-gfs-text-muted)] uppercase">{f.label}</div>
              <div className="text-[11px] text-[var(--color-gfs-text)] font-mono mt-0.5">{f.value}</div>
            </div>
          ))}
        </div>

        <div className="p-3 rounded-lg bg-[var(--color-gfs-accent-dim)] border border-[var(--color-gfs-accent)]/20">
          <h4 className="text-[10px] text-[var(--color-gfs-accent)] uppercase tracking-wider mb-1 font-semibold">Current Assignment</h4>
          <p className="text-[11px] text-[var(--color-gfs-text-secondary)]">{employee.currentAssignment}</p>
        </div>

        {employee.activeIncidents.length > 0 && (
          <div>
            <h4 className="text-[10px] text-[var(--color-gfs-text-muted)] uppercase tracking-wider mb-2">Active Incidents</h4>
            <div className="flex flex-wrap gap-1.5">
              {employee.activeIncidents.map((inc) => <Badge key={inc} variant="critical">{inc}</Badge>)}
            </div>
          </div>
        )}

        <div>
          <h4 className="text-[10px] text-[var(--color-gfs-text-muted)] uppercase tracking-wider mb-2">Skills</h4>
          <div className="flex flex-wrap gap-1.5">
            {employee.skills.map((s) => <Badge key={s} variant="accent">{s}</Badge>)}
          </div>
        </div>

        {employee.certifications.length > 0 && (
          <div>
            <h4 className="text-[10px] text-[var(--color-gfs-text-muted)] uppercase tracking-wider mb-2">Certifications</h4>
            <div className="flex flex-wrap gap-1.5">
              {employee.certifications.map((c) => <Badge key={c} variant="default">{c}</Badge>)}
            </div>
          </div>
        )}

        <div>
          <h4 className="text-[10px] text-[var(--color-gfs-text-muted)] uppercase tracking-wider mb-2">Equipment</h4>
          <div className="space-y-1">
            {employee.devices.map((d) => (
              <div key={d} className="flex items-center gap-2 text-[11px] text-[var(--color-gfs-text-secondary)]">
                <Laptop className="w-3 h-3 text-[var(--color-gfs-text-muted)]" /> {d}
              </div>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-[10px] text-[var(--color-gfs-text-muted)] uppercase tracking-wider mb-2">Career Path</h4>
          <p className="text-[11px] text-[var(--color-gfs-accent)]">{employee.careerPath}</p>
        </div>
      </div>
    </motion.div>
  );
}

export function EmployeeDirectory() {
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<EmployeeProfile | null>(null);

  const filtered = EMPLOYEE_DIRECTORY.filter((emp) =>
    emp.name.toLowerCase().includes(search.toLowerCase()) ||
    emp.department.toLowerCase().includes(search.toLowerCase()) ||
    emp.title.toLowerCase().includes(search.toLowerCase()) ||
    emp.employeeId.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <PageHeader
        icon={<Search className="w-5 h-5 text-[var(--color-gfs-accent)]" />}
        title="Employee Directory"
        subtitle={`GFS India — ${EMPLOYEE_DIRECTORY.length} employees`}
      />

      <div className="relative">
        <Search className="w-4 h-4 text-[var(--color-gfs-text-muted)] absolute left-3 top-1/2 -translate-y-1/2" />
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by name, department, title, or employee ID..."
          className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-[var(--color-gfs-surface)] border border-[var(--color-gfs-border-light)] text-sm text-[var(--color-gfs-text)] placeholder:text-[var(--color-gfs-text-muted)] focus:outline-none focus:border-[var(--color-gfs-accent)] transition-colors" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
        {filtered.map((emp, i) => (
          <Card key={emp.id} delay={i * 0.02} hover onClick={() => setSelected(emp)} className="!p-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: emp.avatarColor }}>
                <span className="text-xs font-bold text-white">{emp.avatarInitials}</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-[var(--color-gfs-text)] truncate">{emp.name}</span>
                  <StatusIndicator status={emp.status} size="sm" />
                </div>
                <div className="text-[11px] text-[var(--color-gfs-text-muted)] truncate">{emp.title}</div>
                <div className="text-[10px] text-[var(--color-gfs-text-muted)] flex items-center gap-1 mt-0.5">
                  <MapPin className="w-2.5 h-2.5" /> {emp.location}
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <AnimatePresence>
        {selected && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40" onClick={() => setSelected(null)} />
            <EmployeeDetail employee={selected} onClose={() => setSelected(null)} />
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
