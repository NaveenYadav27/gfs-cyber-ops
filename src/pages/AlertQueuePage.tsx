import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Bell, Search, Filter, ChevronRight, Shield, Clock, AlertTriangle, Eye,
  User, Server, ExternalLink, X, Copy, FileText,
} from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { PageHeader } from '@/components/layout/PageHeader';
import { Timeline, type TimelineEvent } from '@/components/ui/Timeline';
import { SOC_ALERTS } from '@/data/soc';
import type { SOCAlert } from '@/types/soc';

const sevColor: Record<string, string> = { critical: 'var(--color-gfs-red)', high: 'var(--color-gfs-amber)', medium: 'var(--color-gfs-blue)', low: 'var(--color-gfs-text-muted)', informational: 'var(--color-gfs-text-muted)' };
const sevBadge: Record<string, 'critical' | 'high' | 'medium' | 'default'> = { critical: 'critical', high: 'high', medium: 'medium', low: 'default', informational: 'default' };
const statusBadge: Record<string, 'critical' | 'high' | 'medium' | 'success' | 'default'> = { new: 'medium', assigned: 'default', investigating: 'high', escalated: 'critical', contained: 'medium', resolved: 'success', closed: 'default', 'false-positive': 'default' };

export function AlertQueuePage() {
  const [search, setSearch] = useState('');
  const [sevFilter, setSevFilter] = useState('all');
  const [selectedAlert, setSelectedAlert] = useState<SOCAlert | null>(null);

  const filtered = SOC_ALERTS.filter((a) => {
    if (sevFilter !== 'all' && a.severity !== sevFilter) return false;
    if (search && !a.title.toLowerCase().includes(search.toLowerCase()) && !a.id.toLowerCase().includes(search.toLowerCase()) && !a.affectedAsset.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="space-y-4">
      <PageHeader icon={<Bell className="w-5 h-5 text-[var(--color-gfs-accent)]" />} title="Alert Queue" subtitle={`${SOC_ALERTS.length} alerts — ${SOC_ALERTS.filter((a) => a.slaBreached).length} SLA breaches`}
        badge={<Badge variant={SOC_ALERTS.some((a) => a.severity === 'critical' && a.status !== 'closed') ? 'critical' : 'success'}>
          {SOC_ALERTS.filter((a) => a.severity === 'critical' && a.status !== 'closed').length > 0 ? 'CRITICAL OPEN' : 'ALL CLEAR'}
        </Badge>} />

      <div className="flex items-center gap-3">
        <div className="relative flex-1">
          <Search className="w-3.5 h-3.5 text-[var(--color-gfs-text-muted)] absolute left-3 top-1/2 -translate-y-1/2" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search alerts by ID, title, asset..."
            className="w-full pl-9 pr-4 py-2 rounded-lg bg-[var(--color-gfs-surface)] border border-[var(--color-gfs-border-light)] text-xs text-[var(--color-gfs-text)] placeholder:text-[var(--color-gfs-text-muted)] focus:outline-none focus:border-[var(--color-gfs-accent)]" />
        </div>
        <div className="flex items-center gap-1">
          {['all', 'critical', 'high', 'medium', 'low'].map((s) => (
            <button key={s} onClick={() => setSevFilter(s)} className={`px-2 py-1 rounded text-[10px] capitalize transition-colors ${sevFilter === s ? 'bg-[var(--color-gfs-accent-dim)] text-[var(--color-gfs-accent)]' : 'text-[var(--color-gfs-text-muted)] hover:text-[var(--color-gfs-text)]'}`}>{s}</button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        {/* Alert List */}
        <div className="xl:col-span-2">
          <Card delay={0} className="!p-0 overflow-hidden">
            <div className="divide-y divide-[var(--color-gfs-border-light)]">
              {filtered.map((alert) => (
                <motion.div key={alert.id} layout onClick={() => setSelectedAlert(alert)}
                  className={`px-4 py-3 hover:bg-[var(--color-gfs-hover)] transition-colors cursor-pointer ${selectedAlert?.id === alert.id ? 'bg-[var(--color-gfs-accent-dim)]' : ''}`}>
                  <div className="flex items-start gap-3">
                    <div className="w-2.5 h-2.5 rounded-full mt-1.5 flex-shrink-0" style={{ background: sevColor[alert.severity], animation: alert.severity === 'critical' && alert.status !== 'closed' ? 'gfs-pulse-dot 1.5s ease-in-out infinite' : undefined }} />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-[10px] font-mono text-[var(--color-gfs-text-muted)]">{alert.id}</span>
                        <Badge variant={sevBadge[alert.severity]}>{alert.severity}</Badge>
                        <Badge variant={statusBadge[alert.status]}>{alert.status}</Badge>
                        {alert.slaBreached && <span className="text-[9px] text-[var(--color-gfs-red)] font-mono">SLA BREACHED</span>}
                      </div>
                      <p className="text-[11px] font-semibold text-[var(--color-gfs-text)] mt-0.5">{alert.title}</p>
                      <div className="flex items-center gap-3 mt-1 text-[9px] text-[var(--color-gfs-text-muted)]">
                        <span className="flex items-center gap-1"><Server className="w-2.5 h-2.5" /> {alert.affectedAsset}</span>
                        <span className="flex items-center gap-1"><Shield className="w-2.5 h-2.5" /> {alert.mitreId}</span>
                        {alert.assignee && <span className="flex items-center gap-1"><User className="w-2.5 h-2.5" /> {alert.assignee}</span>}
                        <span>{alert.source}</span>
                      </div>
                      {/* Risk Score */}
                      <div className="flex items-center gap-2 mt-1.5">
                        <span className="text-[9px] text-[var(--color-gfs-text-muted)]">Risk:</span>
                        <div className="h-1.5 w-20 bg-[var(--color-gfs-elevated)] rounded-full overflow-hidden">
                          <div className="h-full rounded-full" style={{ width: `${alert.riskScore}%`, background: alert.riskScore > 80 ? 'var(--color-gfs-red)' : alert.riskScore > 50 ? 'var(--color-gfs-amber)' : 'var(--color-gfs-green)' }} />
                        </div>
                        <span className="text-[9px] font-mono" style={{ color: alert.riskScore > 80 ? 'var(--color-gfs-red)' : 'var(--color-gfs-text-muted)' }}>{alert.riskScore}</span>
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <div className="text-[9px] text-[var(--color-gfs-text-muted)] font-mono">{new Date(alert.timestamp).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', timeZone: 'Asia/Kolkata' })}</div>
                      <div className="text-[9px] text-[var(--color-gfs-text-muted)]">SLA: {alert.sla}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </Card>
        </div>

        {/* Alert Detail Panel */}
        <div>
          <AnimatePresence mode="wait">
            {selectedAlert ? (
              <motion.div key={selectedAlert.id} initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }}>
                <Card delay={0} className="!p-0 overflow-hidden sticky top-4">
                  {/* Header */}
                  <div className="px-4 py-3 border-b border-[var(--color-gfs-border-light)]">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono text-[var(--color-gfs-text-muted)]">{selectedAlert.id}</span>
                      <button onClick={() => setSelectedAlert(null)}><X className="w-3.5 h-3.5 text-[var(--color-gfs-text-muted)]" /></button>
                    </div>
                    <h3 className="text-xs font-semibold text-[var(--color-gfs-text)] mt-1">{selectedAlert.title}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant={sevBadge[selectedAlert.severity]}>{selectedAlert.severity}</Badge>
                      <Badge variant={statusBadge[selectedAlert.status]}>{selectedAlert.status}</Badge>
                    </div>
                  </div>

                  <div className="max-h-[600px] overflow-y-auto">
                    {/* Summary */}
                    <div className="px-4 py-3 border-b border-[var(--color-gfs-border-light)]">
                      <span className="gfs-text-label">Alert Summary</span>
                      <p className="text-[10px] text-[var(--color-gfs-text-secondary)] mt-1 leading-relaxed">{selectedAlert.description}</p>
                    </div>

                    {/* Details */}
                    <div className="px-4 py-3 border-b border-[var(--color-gfs-border-light)] space-y-1.5">
                      <InfoRow label="Source" value={selectedAlert.source} />
                      <InfoRow label="Asset" value={selectedAlert.affectedAsset} />
                      {selectedAlert.affectedAssetIp && <InfoRow label="IP" value={selectedAlert.affectedAssetIp} />}
                      <InfoRow label="MITRE" value={`${selectedAlert.mitreTactic} — ${selectedAlert.mitreTechnique}`} />
                      <InfoRow label="Assignee" value={selectedAlert.assignee || 'Unassigned'} />
                      <InfoRow label="Risk Score" value={`${selectedAlert.riskScore}/100`} />
                      <InfoRow label="Case" value={selectedAlert.caseId || 'None'} />
                    </div>

                    {/* IOCs */}
                    {selectedAlert.iocs.length > 0 && (
                      <div className="px-4 py-3 border-b border-[var(--color-gfs-border-light)]">
                        <span className="gfs-text-label">IOCs</span>
                        <div className="mt-1 space-y-1">
                          {selectedAlert.iocs.map((ioc, i) => (
                            <div key={i} className="p-2 rounded bg-[var(--color-gfs-elevated)]">
                              <div className="flex items-center gap-2">
                                <Badge variant="default">{ioc.type}</Badge>
                                <code className="text-[9px] font-mono text-[var(--color-gfs-accent)] truncate">{ioc.value}</code>
                                <Badge variant={ioc.confidence === 'high' ? 'critical' : 'medium'}>{ioc.confidence}</Badge>
                              </div>
                              <p className="text-[9px] text-[var(--color-gfs-text-muted)] mt-0.5">{ioc.context}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Timeline */}
                    {selectedAlert.timeline.length > 0 && (
                      <div className="px-4 py-3 border-b border-[var(--color-gfs-border-light)]">
                        <span className="gfs-text-label">Timeline</span>
                        <div className="mt-2">
                          <Timeline events={selectedAlert.timeline.map((e, i) => ({
                            id: `te-${i}`, timestamp: e.timestamp, title: e.title, description: e.description,
                            category: e.severity === 'critical' ? 'detection' : e.severity === 'high' ? 'response' : 'evidence',
                            severity: e.severity as any, source: e.source,
                          } as TimelineEvent))} maxEvents={8} />
                        </div>
                      </div>
                    )}

                    {/* Recommendation */}
                    <div className="px-4 py-3 border-b border-[var(--color-gfs-border-light)]">
                      <span className="gfs-text-label">Recommended Actions</span>
                      <p className="text-[10px] text-[var(--color-gfs-text-secondary)] mt-1 leading-relaxed">{selectedAlert.recommendation}</p>
                    </div>

                    {/* Notes */}
                    {selectedAlert.notes.length > 0 && (
                      <div className="px-4 py-3">
                        <span className="gfs-text-label">Analyst Notes</span>
                        <div className="mt-1 space-y-1.5">
                          {selectedAlert.notes.map((note) => (
                            <div key={note.id} className="p-2 rounded bg-[var(--color-gfs-elevated)]">
                              <div className="flex items-center gap-2">
                                <span className="text-[9px] font-semibold text-[var(--color-gfs-text)]">{note.author}</span>
                                <span className="text-[9px] text-[var(--color-gfs-text-muted)]">{note.timestamp}</span>
                                <Badge variant={note.type === 'action' ? 'accent' : note.type === 'resolution' ? 'success' : 'default'}>{note.type}</Badge>
                              </div>
                              <p className="text-[10px] text-[var(--color-gfs-text-secondary)] mt-0.5">{note.content}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Footer */}
                  <div className="px-4 py-2 border-t border-[var(--color-gfs-border-light)] flex items-center gap-2">
                    <button className="flex-1 px-2 py-1.5 rounded bg-[var(--color-gfs-accent-dim)] text-[10px] text-[var(--color-gfs-accent)] font-medium">Take Ownership</button>
                    <button className="flex-1 px-2 py-1.5 rounded bg-[var(--color-gfs-elevated)] text-[10px] text-[var(--color-gfs-text-muted)]">Escalate</button>
                    <button className="flex-1 px-2 py-1.5 rounded bg-[var(--color-gfs-green-dim)] text-[10px] text-[var(--color-gfs-green)] font-medium">Resolve</button>
                  </div>
                </Card>
              </motion.div>
            ) : (
              <Card delay={0.1} className="!p-8 text-center">
                <Eye className="w-8 h-8 text-[var(--color-gfs-text-muted)] mx-auto mb-3 opacity-30" />
                <p className="text-[11px] text-[var(--color-gfs-text-muted)]">Select an alert from the queue to view details</p>
              </Card>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between text-[10px]">
      <span className="text-[var(--color-gfs-text-muted)]">{label}</span>
      <span className="text-[var(--color-gfs-text)]">{value}</span>
    </div>
  );
}
