import { useState } from 'react';
import { Clock, Users, Calendar, AlertTriangle, ArrowRight, Coffee, Shield } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { PageHeader } from '@/components/layout/PageHeader';

const TEAM_MEMBERS = [
  { id: 'emp-020', name: 'Suresh Reddy', role: 'SOC Manager', shift: 'morning', status: 'active', alerts: 0, cases: 2, avatar: 'SR' },
  { id: 'emp-021', name: 'Arjun Sharma', role: 'T2 Analyst', shift: 'morning', status: 'active', alerts: 2, cases: 1, avatar: 'AS' },
  { id: 'emp-022', name: 'Priya Nair', role: 'T1 Analyst', shift: 'morning', status: 'break', alerts: 1, cases: 0, avatar: 'PN' },
  { id: 'emp-023', name: 'Raghav Sharma', role: 'T2 Analyst', shift: 'morning', status: 'active', alerts: 1, cases: 1, avatar: 'RS' },
  { id: 'emp-025', name: 'Harsha Vardhan', role: 'T3 Analyst', shift: 'morning', status: 'active', alerts: 1, cases: 1, avatar: 'HV' },
];

export function SOCShiftManagement() {
  return (
    <div className="space-y-4">
      <PageHeader 
        icon={<Clock className="w-5 h-5 text-[var(--color-gfs-accent)]" />} 
        title="SOC Shift Management" 
        subtitle="Current Shift Operations & Analyst Workload" 
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card delay={0.1} className="!p-4">
          <h3 className="text-sm font-semibold text-[var(--color-gfs-text)] mb-2">Active Shift</h3>
          <Badge variant="success">Morning Shift (06:00 - 14:00)</Badge>
        </Card>
        <Card delay={0.2} className="!p-4">
          <h3 className="text-sm font-semibold text-[var(--color-gfs-text)] mb-2">Team Readiness</h3>
          <p className="text-2xl font-bold text-[var(--color-gfs-accent)]">98%</p>
        </Card>
        <Card delay={0.3} className="!p-4">
          <h3 className="text-sm font-semibold text-[var(--color-gfs-text)] mb-2">Total Analysts</h3>
          <p className="text-2xl font-bold text-[var(--color-gfs-text)]">{TEAM_MEMBERS.length}</p>
        </Card>
        <Card delay={0.4} className="!p-4">
          <h3 className="text-sm font-semibold text-[var(--color-gfs-text)] mb-2">Active Escalations</h3>
          <p className="text-2xl font-bold text-[var(--color-gfs-red)]">2</p>
        </Card>
      </div>

      <div className="space-y-3">
        <h2 className="text-lg font-bold text-[var(--color-gfs-text)] border-b border-[var(--color-gfs-border-light)] pb-2">Shift Roster</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {TEAM_MEMBERS.map((member, idx) => (
            <Card key={member.id} delay={0.1 * idx} hover className="!p-4 border-l-2 border-l-[var(--color-gfs-accent)]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[var(--color-gfs-surface)] flex items-center justify-center text-sm font-bold text-[var(--color-gfs-accent)] border border-[var(--color-gfs-accent)]/20">
                  {member.avatar}
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-bold text-[var(--color-gfs-text)]">{member.name}</h4>
                  <p className="text-xs text-[var(--color-gfs-text-muted)]">{member.role}</p>
                </div>
                <Badge variant={member.status === 'active' ? 'success' : 'medium'}>
                  {member.status === 'active' ? 'On Duty' : 'On Break'}
                </Badge>
              </div>
              <div className="mt-4 flex gap-4 text-xs text-[var(--color-gfs-text-secondary)] bg-[var(--color-gfs-elevated)] p-2 rounded">
                <div className="flex items-center gap-1">
                  <AlertTriangle className="w-3 h-3 text-[var(--color-gfs-amber)]" />
                  <span>{member.alerts} Alerts</span>
                </div>
                <div className="flex items-center gap-1">
                  <Shield className="w-3 h-3 text-[var(--color-gfs-accent)]" />
                  <span>{member.cases} Cases</span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
