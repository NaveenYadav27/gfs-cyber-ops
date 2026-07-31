import React from 'react';
import { Target, Zap, Award, Flag, ChevronRight } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { PageHeader } from '@/components/layout/PageHeader';

export function PracticeMissions() {
  const MISSIONS = [
    { id: 1, title: 'Web App: SQL Injection', diff: 'Beginner', points: 100, status: 'Completed', flag: 'FLAG{sqli_admin_bypass}' },
    { id: 2, title: 'Network: SMB Relay', diff: 'Intermediate', points: 250, status: 'In Progress', flag: '' },
    { id: 3, title: 'Binary Exploitation', diff: 'Advanced', points: 500, status: 'New', flag: '' },
    { id: 4, title: 'Active Directory: Kerberoasting', diff: 'Intermediate', points: 300, status: 'New', flag: '' },
  ];

  return (
    <div className="space-y-6">
      <PageHeader 
        icon={<Target className="w-6 h-6 text-[var(--color-gfs-accent)]" />}
        title="Training Missions"
        subtitle="Complete scenarios to capture flags and earn points."
      />
      <div className="flex gap-8 bg-[var(--color-gfs-surface)] p-4 rounded-xl border border-[var(--color-gfs-border-light)]">
        <div><div className="text-sm text-[var(--color-gfs-text-muted)]">Total Points</div><div className="text-2xl font-bold text-white">1,450</div></div>
        <div><div className="text-sm text-[var(--color-gfs-text-muted)]">Global Rank</div><div className="text-2xl font-bold text-white">#42</div></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {MISSIONS.map(m => (
          <Card key={m.id} className="!p-6 flex flex-col justify-between hover:border-[var(--color-gfs-accent)] transition-all">
            <div>
              <div className="mb-4">
                <span className={`px-2 py-1 text-xs rounded-full ${m.status === 'Completed' ? 'bg-[var(--color-gfs-green)]/20 text-[var(--color-gfs-green)]' : m.status === 'In Progress' ? 'bg-[var(--color-gfs-accent)]/20 text-[var(--color-gfs-accent)]' : 'bg-gray-800 text-gray-400'}`}>
                  {m.status}
                </span>
              </div>
              <h3 className="font-bold text-lg text-white mb-2">{m.title}</h3>
              <div className="flex items-center gap-4 text-sm text-[var(--color-gfs-text-muted)] mb-6">
                <span className="flex items-center gap-1"><Zap size={14} /> {m.diff}</span>
                <span className="flex items-center gap-1"><Award size={14} /> {m.points} pts</span>
              </div>
            </div>
            {m.status === 'Completed' ? (
              <div className="flex items-center gap-2 bg-[var(--color-gfs-green)]/10 text-[var(--color-gfs-green)] p-3 rounded font-mono text-sm border border-[var(--color-gfs-green)]/30">
                <Flag size={14}/> {m.flag}
              </div>
            ) : (
              <button className="flex items-center justify-between w-full bg-[var(--color-gfs-surface)] hover:bg-[var(--color-gfs-hover)] py-2 px-4 rounded border border-[var(--color-gfs-border-light)] transition-colors text-sm font-semibold text-white">
                {m.status === 'In Progress' ? 'Resume Mission' : 'Start Mission'} <ChevronRight size={16} />
              </button>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}
