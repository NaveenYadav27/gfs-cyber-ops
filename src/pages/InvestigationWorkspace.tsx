import { useState } from 'react';
import { Search, Clock, Shield, Server, User, Mail, Eye, FileText, Target, BookOpen, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { PageHeader } from '@/components/layout/PageHeader';
import { Timeline, type TimelineEvent } from '@/components/ui/Timeline';
import { SOC_INCIDENTS } from '@/data/soc';
import type { SOCIncident } from '@/types/soc';

const priorityColor: Record<string, 'critical' | 'high' | 'medium' | 'default'> = { P1: 'critical', P2: 'high', P3: 'medium', P4: 'default' };
const statusColor: Record<string, 'critical' | 'high' | 'medium' | 'success' | 'default'> = { open: 'default', 'in-progress': 'medium', escalated: 'critical', containment: 'high', eradication: 'high', recovery: 'medium', closed: 'success' };

export function InvestigationWorkspace() {
  const [selectedCase, setSelectedCase] = useState<SOCIncident | null>(SOC_INCIDENTS[0]);
  const [activeTab, setActiveTab] = useState<'timeline' | 'evidence' | 'tasks' | 'notes'>('timeline');

  return (
    <div className="space-y-4">
      <PageHeader icon={<Search className="w-5 h-5 text-[var(--color-gfs-accent)]" />} title="Investigations" subtitle={`${SOC_INCIDENTS.length} active cases`} />

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-4">
        {/* Case List */}
        <div className="xl:col-span-1 space-y-2">
          {SOC_INCIDENTS.map((inc) => (
            <Card key={inc.id} delay={0} hover onClick={() => setSelectedCase(inc)}
              className={`!p-3 cursor-pointer ${selectedCase?.id === inc.id ? '!border-[var(--color-gfs-accent)]/30' : ''}`}>
              <div className="flex items-center gap-2">
                <Badge variant={priorityColor[inc.severity]}>{inc.severity}</Badge>
                <Badge variant={statusColor[inc.status]}>{inc.status}</Badge>
              </div>
              <p className="text-[11px] font-semibold text-[var(--color-gfs-text)] mt-1">{inc.title}</p>
              <div className="text-[9px] text-[var(--color-gfs-text-muted)] mt-0.5">{inc.id} • {inc.owner}</div>
            </Card>
          ))}
        </div>

        {/* Investigation Detail */}
        <div className="xl:col-span-3">
          {selectedCase ? (
            <div className="space-y-4">
              {/* Case Header */}
              <Card delay={0} className="!p-4">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono text-[var(--color-gfs-text-muted)]">{selectedCase.id}</span>
                      <Badge variant={priorityColor[selectedCase.severity]}>{selectedCase.severity}</Badge>
                      <Badge variant={statusColor[selectedCase.status]}>{selectedCase.status}</Badge>
                    </div>
                    <h2 className="text-sm font-display font-bold text-[var(--color-gfs-text)] mt-1">{selectedCase.title}</h2>
                  </div>
                </div>
                <div className="grid grid-cols-4 gap-3 text-[10px]">
                  <div><span className="text-[var(--color-gfs-text-muted)]">Owner</span><p className="text-[var(--color-gfs-text)]">{selectedCase.owner}</p></div>
                  <div><span className="text-[var(--color-gfs-text-muted)]">Business Unit</span><p className="text-[var(--color-gfs-text)]">{selectedCase.businessUnit}</p></div>
                  <div><span className="text-[var(--color-gfs-text-muted)]">Systems</span><p className="text-[var(--color-gfs-text)]">{selectedCase.affectedSystems.join(', ')}</p></div>
                  <div><span className="text-[var(--color-gfs-text-muted)]">Impact</span><p className="text-[var(--color-gfs-text)]">{selectedCase.businessImpact.slice(0, 80)}...</p></div>
                </div>
              </Card>

              {/* Tabs */}
              <div className="flex items-center gap-0 border-b border-[var(--color-gfs-border-light)]">
                {(['timeline', 'evidence', 'tasks', 'notes'] as const).map((tab) => (
                  <button key={tab} onClick={() => setActiveTab(tab)}
                    className={`flex items-center gap-1.5 px-3 py-2 text-[11px] font-medium border-b-2 capitalize transition-colors ${
                      activeTab === tab ? 'text-[var(--color-gfs-accent)] border-[var(--color-gfs-accent)]' : 'text-[var(--color-gfs-text-muted)] border-transparent hover:text-[var(--color-gfs-text)]'
                    }`}>{tab}</button>
                ))}
              </div>

              {/* Tab Content */}
              {activeTab === 'timeline' && (
                <Card delay={0} className="!p-4">
                  <Timeline events={selectedCase.timeline.map((e, i) => ({
                    id: `ti-${i}`, timestamp: e.timestamp, title: e.event, description: '',
                    category: e.category as any, source: e.actor,
                  } as TimelineEvent))} />
                </Card>
              )}

              {activeTab === 'evidence' && (
                <div className="space-y-2">
                  {selectedCase.evidence.map((ev) => (
                    <Card key={ev.id} delay={0} className="!p-3">
                      <div className="flex items-center gap-2">
                        <FileText className="w-3.5 h-3.5 text-[var(--color-gfs-blue)]" />
                        <span className="text-[11px] font-semibold text-[var(--color-gfs-text)]">{ev.name}</span>
                        <Badge variant="default">{ev.type}</Badge>
                      </div>
                      <pre className="text-[10px] font-mono text-[var(--color-gfs-text-secondary)] mt-2 p-2 rounded bg-[var(--color-gfs-elevated)] whitespace-pre-wrap">{ev.content}</pre>
                      <div className="flex items-center gap-2 mt-1.5">
                        <span className="text-[9px] text-[var(--color-gfs-text-muted)]">Collected by {ev.collectedBy} at {ev.timestamp}</span>
                        {ev.tags.map((t) => <Badge key={t} variant="default">{t}</Badge>)}
                      </div>
                    </Card>
                  ))}
                </div>
              )}

              {activeTab === 'tasks' && (
                <div className="space-y-1.5">
                  {selectedCase.tasks.map((task) => (
                    <div key={task.id} className="flex items-center gap-3 p-2.5 rounded bg-[var(--color-gfs-surface)] border border-[var(--color-gfs-border-light)]">
                      <div className={`w-4 h-4 rounded border flex items-center justify-center ${task.status === 'completed' ? 'bg-[var(--color-gfs-green)] border-[var(--color-gfs-green)]' : task.status === 'in-progress' ? 'border-[var(--color-gfs-amber)]' : 'border-[var(--color-gfs-border)]'}`}>
                        {task.status === 'completed' && <span className="text-[8px] text-white">✓</span>}
                      </div>
                      <span className={`text-[11px] flex-1 ${task.status === 'completed' ? 'text-[var(--color-gfs-text-muted)] line-through' : 'text-[var(--color-gfs-text)]'}`}>{task.title}</span>
                      <span className="text-[9px] text-[var(--color-gfs-text-muted)]">{task.assignee}</span>
                      <Badge variant={task.status === 'completed' ? 'success' : task.status === 'in-progress' ? 'medium' : 'default'}>{task.status}</Badge>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'notes' && (
                <Card delay={0} className="!p-4">
                  <div className="space-y-2">
                    {selectedCase.comments.map((c) => (
                      <div key={c.id} className="p-2.5 rounded bg-[var(--color-gfs-elevated)]">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-semibold text-[var(--color-gfs-text)]">{c.author}</span>
                          <span className="text-[9px] text-[var(--color-gfs-text-muted)]">{c.timestamp}</span>
                        </div>
                        <p className="text-[10px] text-[var(--color-gfs-text-secondary)] mt-1">{c.content}</p>
                      </div>
                    ))}
                    {selectedCase.comments.length === 0 && (
                      <p className="text-[10px] text-[var(--color-gfs-text-muted)] text-center py-4">No comments yet</p>
                    )}
                  </div>
                </Card>
              )}
            </div>
          ) : (
            <Card delay={0} className="!p-12 text-center">
              <Search className="w-8 h-8 text-[var(--color-gfs-text-muted)] mx-auto mb-3 opacity-30" />
              <p className="text-[11px] text-[var(--color-gfs-text-muted)]">Select a case to begin investigation</p>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
