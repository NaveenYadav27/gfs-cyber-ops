import { useState } from 'react';
import { BookOpen, Award, CheckCircle2, Shield, Play } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { PageHeader } from '@/components/layout/PageHeader';

const TRAINING_MODULES = [
  { id: 'tm-001', title: 'SOC Fundamentals', category: 'Foundation', difficulty: 'beginner', duration: '4 hours', modules: 12, completed: 12, status: 'completed', description: 'Core concepts of security operations, incident classification, and triage procedures.' },
  { id: 'tm-002', title: 'SIEM Operations (Sentinel)', category: 'SIEM', difficulty: 'intermediate', duration: '8 hours', modules: 16, completed: 16, status: 'completed', description: 'KQL queries, log analysis, detection rule creation, and dashboard development.' },
  { id: 'tm-003', title: 'EDR Analysis (Falcon)', category: 'EDR', difficulty: 'intermediate', duration: '6 hours', modules: 14, completed: 11, status: 'in-progress', description: 'Endpoint detection, process analysis, threat hunting with Falcon.' },
  { id: 'tm-004', title: 'Threat Intelligence Analysis', category: 'Intel', difficulty: 'advanced', duration: '10 hours', modules: 18, completed: 8, status: 'in-progress', description: 'IOCs, TTPs, threat actor profiling, intel-driven detection.' },
];

const CERTIFICATIONS = [
  { name: 'GFS SOC Analyst Level 1', status: 'achieved', date: '2024-06-15', progress: 100 },
  { name: 'GFS SOC Analyst Level 2', status: 'in-progress', progress: 68 },
  { name: 'GFS Threat Hunter', status: 'locked', progress: 0 },
];

export function SOCTraining() {
  return (
    <div className="space-y-4">
      <PageHeader 
        icon={<BookOpen className="w-5 h-5 text-[var(--color-gfs-accent)]" />} 
        title="SOC Training" 
        subtitle="Professional Development & Analyst Career Path" 
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {CERTIFICATIONS.map((cert, idx) => (
          <Card key={idx} className="!p-4 border-t-2 border-t-[var(--color-gfs-accent)]">
            <div className="flex items-center gap-2 mb-3">
              <Award className={`w-5 h-5 ${cert.status === 'achieved' ? 'text-[var(--color-gfs-accent)]' : 'text-[var(--color-gfs-text-muted)]'}`} />
              <h3 className="text-sm font-bold text-[var(--color-gfs-text)]">{cert.name}</h3>
            </div>
            <div className="flex items-center justify-between text-xs text-[var(--color-gfs-text-secondary)] mb-1">
              <span>{cert.status === 'achieved' ? `Achieved: ${cert.date}` : 'Progress'}</span>
              <span>{cert.progress}%</span>
            </div>
            <div className="w-full h-1.5 bg-[var(--color-gfs-elevated)] rounded-full overflow-hidden">
              <div 
                className="h-full bg-[var(--color-gfs-accent)] transition-all" 
                style={{ width: `${cert.progress}%` }}
              />
            </div>
          </Card>
        ))}
      </div>

      <div className="space-y-3">
        <h2 className="text-lg font-bold text-[var(--color-gfs-text)] border-b border-[var(--color-gfs-border-light)] pb-2">Available Modules</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {TRAINING_MODULES.map((mod) => (
            <Card key={mod.id} hover className="!p-4 flex flex-col justify-between h-full">
              <div>
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-sm font-bold text-[var(--color-gfs-text)]">{mod.title}</h3>
                  <Badge variant={mod.status === 'completed' ? 'success' : 'medium'}>{mod.status}</Badge>
                </div>
                <div className="flex items-center gap-2 mb-3">
                  <Badge variant="default">{mod.category}</Badge>
                  <Badge variant={mod.difficulty === 'beginner' ? 'success' : 'high'}>{mod.difficulty}</Badge>
                </div>
                <p className="text-xs text-[var(--color-gfs-text-muted)] mb-4">{mod.description}</p>
              </div>
              
              <div>
                <div className="flex justify-between text-xs text-[var(--color-gfs-text-secondary)] mb-1">
                  <span>{mod.completed} / {mod.modules} Modules Completed</span>
                  <span>{Math.round((mod.completed / mod.modules) * 100)}%</span>
                </div>
                <div className="w-full h-1.5 bg-[var(--color-gfs-elevated)] rounded-full overflow-hidden mb-3">
                  <div 
                    className={`h-full ${mod.status === 'completed' ? 'bg-[var(--color-gfs-green)]' : 'bg-[var(--color-gfs-accent)]'}`} 
                    style={{ width: `${(mod.completed / mod.modules) * 100}%` }}
                  />
                </div>
                <button className="w-full py-2 bg-[var(--color-gfs-surface)] hover:bg-[var(--color-gfs-hover)] border border-[var(--color-gfs-border-light)] rounded flex items-center justify-center gap-2 text-xs font-bold text-[var(--color-gfs-text)] transition-colors">
                  {mod.status === 'completed' ? (
                    <><CheckCircle2 className="w-4 h-4 text-[var(--color-gfs-green)]" /> Review Material</>
                  ) : (
                    <><Play className="w-4 h-4 text-[var(--color-gfs-accent)]" /> Continue Course</>
                  )}
                </button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
