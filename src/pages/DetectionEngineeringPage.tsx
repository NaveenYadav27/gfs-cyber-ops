import React, { useState } from 'react';
import { Radio, Activity, Search, Server, GitBranch, Target, Crosshair, ChevronRight } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { PageHeader } from '@/components/layout/PageHeader';
import { Badge } from '@/components/ui/Badge';

export function DetectionEngineeringPage() {
  const [activeTab, setActiveTab] = useState('analytics');

  const RULES = [
    { id: 'DET-001', name: 'Suspicious PowerShell Download Cradle', status: 'Active', severity: 'High', type: 'Analytics', logSource: 'Sysmon' },
    { id: 'DET-002', name: 'Pass-the-Hash Activity', status: 'Tuning', severity: 'Critical', type: 'Correlation', logSource: 'Windows Security' },
    { id: 'DET-003', name: 'Ransomware File Extension', status: 'Active', severity: 'Critical', type: 'YARA', logSource: 'EDR' },
  ];

  return (
    <div className="space-y-6">
      <PageHeader 
        icon={<Radio className="w-6 h-6 text-[var(--color-gfs-accent)]" />}
        title="Detection Engineering Portal"
        subtitle="Manage analytics rules, correlation, and MITRE ATT&CK coverage"
      />
      <div className="flex border-b border-[var(--color-gfs-border-light)] mb-4 gap-4">
        <button onClick={() => setActiveTab('analytics')} className={`pb-2 text-sm font-semibold transition-colors ${activeTab === 'analytics' ? 'text-[var(--color-gfs-accent)] border-b-2 border-[var(--color-gfs-accent)]' : 'text-[var(--color-gfs-text-muted)]'}`}>Analytics Rules</button>
        <button onClick={() => setActiveTab('coverage')} className={`pb-2 text-sm font-semibold transition-colors ${activeTab === 'coverage' ? 'text-[var(--color-gfs-accent)] border-b-2 border-[var(--color-gfs-accent)]' : 'text-[var(--color-gfs-text-muted)]'}`}>MITRE Coverage</button>
      </div>

      {activeTab === 'analytics' ? (
        <div className="space-y-4">
          <div className="bg-[var(--color-gfs-surface)] p-3 rounded-lg border border-[var(--color-gfs-border-light)] flex gap-2">
            <Search className="w-5 h-5 text-[var(--color-gfs-text-muted)]" />
            <input placeholder="Search detection rules..." className="bg-transparent border-none outline-none text-white w-full" />
          </div>
          {RULES.map(rule => (
            <Card key={rule.id} className="!p-4 hover:border-[var(--color-gfs-accent)] transition-all cursor-pointer group">
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-bold text-lg text-white">{rule.name}</h3>
                    <Badge variant={rule.severity === 'Critical' ? 'critical' : 'high'}>{rule.severity}</Badge>
                    <Badge variant={rule.status === 'Active' ? 'success' : 'medium'}>{rule.status}</Badge>
                  </div>
                  <div className="flex gap-4 text-sm text-[var(--color-gfs-text-muted)]">
                    <span className="flex items-center gap-1"><Activity size={14} /> Type: {rule.type}</span>
                    <span className="flex items-center gap-1"><Server size={14} /> Source: {rule.logSource}</span>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-[var(--color-gfs-text-muted)] group-hover:text-[var(--color-gfs-accent)] transition-colors" />
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="!p-8 text-center text-[var(--color-gfs-text-muted)]">
          <Target className="w-12 h-12 mx-auto mb-4 opacity-50 text-[var(--color-gfs-accent)]" />
          <h2 className="text-xl font-bold text-white mb-2">MITRE ATT&CK Coverage Matrix</h2>
          <p>The heat map visualization is currently loading matrix data...</p>
        </Card>
      )}
    </div>
  );
}
