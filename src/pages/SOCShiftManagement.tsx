import { useState } from 'react';
import { Clock, Users, Calendar, AlertTriangle, ArrowRight, Coffee, Shield } from 'lucide-react';
import { AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { PageHeader } from '@/components/layout/PageHeader';
import { useEnterprise } from '@/store/useEnterprise';
import EmployeeDigitalTwin from '@/components/enterprise/EmployeeDigitalTwin';

export function SOCShiftManagement() {
  const [selectedAnalyst, setSelectedAnalyst] = useState<any | null>(null);
  const { employees } = useEnterprise();
  
  // Filter for SOC team members currently on the morning shift
  const TEAM_MEMBERS = employees.filter(emp => emp.department === 'Cyber Defense' && emp.shift === 'morning');

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
            <Card 
              key={member.id} 
              delay={0.1 * idx} 
              hover 
              className="!p-4 border-l-2 border-l-[var(--color-gfs-accent)] cursor-pointer hover:border-[var(--color-gfs-accent)]"
              onClick={() => setSelectedAnalyst(member)}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[var(--color-gfs-surface)] flex items-center justify-center text-sm font-bold text-[var(--color-gfs-accent)] border border-[var(--color-gfs-accent)]/20 overflow-hidden">
                  {member.photo ? <img src={member.photo} alt={member.name} className="w-full h-full object-cover" /> : member.name.substring(0, 2).toUpperCase()}
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-bold text-[var(--color-gfs-text)]">{member.name}</h4>
                  <p className="text-xs text-[var(--color-gfs-text-muted)]">{member.designation}</p>
                </div>
                <Badge variant={member.status === 'active' ? 'success' : 'medium'}>
                  {member.status === 'active' ? 'On Duty' : 'Offline'}
                </Badge>
              </div>
              <div className="mt-4 flex gap-4 text-xs text-[var(--color-gfs-text-secondary)] bg-[var(--color-gfs-elevated)] p-2 rounded">
                <div className="flex items-center gap-1">
                  <AlertTriangle className="w-3 h-3 text-[var(--color-gfs-amber)]" />
                  <span>{member.currentIncidents.length} Alerts</span>
                </div>
                <div className="flex items-center gap-1">
                  <Shield className="w-3 h-3 text-[var(--color-gfs-accent)]" />
                  <span>{member.currentCases.length} Cases</span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
      <>
        {selectedAnalyst && (
          <EmployeeDigitalTwin 
            employee={selectedAnalyst} 
            onClose={() => setSelectedAnalyst(null)} 
          />
        )}
      </>
    </div>
  );
}
