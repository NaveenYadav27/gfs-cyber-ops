import { useState } from 'react';
import { motion } from 'framer-motion';
import { Ticket, AlertTriangle, Clock, User, ChevronRight, Plus, FileText, ArrowUpRight } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { useStore } from '@/store/useStore';
import { PageHeader } from '@/components/layout/PageHeader';

export function ServiceDesk() {
  const { tickets, updateTicketStatus } = useStore();
  const [selectedTicket, setSelectedTicket] = useState(tickets[0]);
  const [typeFilter, setTypeFilter] = useState('all');
  const types = ['all', 'incident', 'change-request', 'service-request', 'problem'];
  const filtered = typeFilter === 'all' ? tickets : tickets.filter((t) => t.type === typeFilter);

  const priorityColors: Record<string, string> = {
    'p1-critical': 'critical', 'p2-high': 'high', 'p3-medium': 'medium', 'p4-low': 'low',
  };

  return (
    <div className="space-y-4">
      <PageHeader
        icon={<Ticket className="w-5 h-5 text-[var(--color-gfs-accent)]" />}
        title="IT Service Management"
        subtitle="ServiceNow — Incidents, Changes, and Service Requests"
        actions={
          <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[var(--color-gfs-accent-dim)] text-[var(--color-gfs-accent)] text-xs font-medium hover:bg-[var(--color-gfs-accent)]/20 transition-colors">
            <Plus className="w-3 h-3" /> New Ticket
          </button>
        }
      />

      <div className="flex items-center gap-2 flex-wrap">
        {types.map((t) => (
          <button key={t} onClick={() => setTypeFilter(t)}
            className={`px-3 py-1.5 rounded-lg text-[11px] capitalize transition-colors ${
              typeFilter === t ? 'bg-[var(--color-gfs-accent-dim)] text-[var(--color-gfs-accent)]' : 'text-[var(--color-gfs-text-muted)] hover:text-[var(--color-gfs-text)]'
            }`}>
            {t === 'all' ? `All (${tickets.length})` : t.replace('-', ' ')}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        {/* Ticket List */}
        <Card delay={0.05} className="!p-0 overflow-hidden max-h-[600px] overflow-y-auto">
          {filtered.map((ticket, i) => (
            <motion.div key={ticket.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }}
              onClick={() => setSelectedTicket(ticket)}
              className={`px-4 py-3 border-b border-[var(--color-gfs-border-light)] cursor-pointer transition-colors ${
                selectedTicket?.id === ticket.id ? 'bg-[var(--color-gfs-accent-dim)]' : 'hover:bg-[var(--color-gfs-hover)]'
              }`}>
              <div className="flex items-center gap-2 mb-1">
                <Badge variant={priorityColors[ticket.priority] as any}>{ticket.priority.toUpperCase()}</Badge>
                <span className="text-[10px] font-mono text-[var(--color-gfs-text-muted)]">{ticket.id}</span>
                <Badge variant="default">{ticket.type.replace('-', ' ')}</Badge>
              </div>
              <p className="text-xs text-[var(--color-gfs-text)] font-medium">{ticket.title}</p>
              <div className="flex items-center gap-2 mt-1 text-[10px] text-[var(--color-gfs-text-muted)]">
                <span>{ticket.assignee}</span>
                <span>•</span>
                <span className="flex items-center gap-0.5"><Clock className="w-2.5 h-2.5" /> {new Date(ticket.updated).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</span>
              </div>
            </motion.div>
          ))}
        </Card>

        {/* Ticket Detail */}
        <Card delay={0.1} className="!p-5 max-h-[600px] overflow-y-auto">
          {selectedTicket ? (
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-mono text-[var(--color-gfs-accent)]">{selectedTicket.id}</span>
                    <Badge variant={priorityColors[selectedTicket.priority] as any}>{selectedTicket.priority.toUpperCase()}</Badge>
                  </div>
                  <h3 className="text-sm font-semibold text-[var(--color-gfs-text)]">{selectedTicket.title}</h3>
                </div>
                <Badge variant={selectedTicket.status === 'resolved' || selectedTicket.status === 'closed' ? 'success' : 'high'}>
                  {selectedTicket.status.toUpperCase().replace('-', ' ')}
                </Badge>
              </div>

              <div className="p-3 rounded-lg bg-[var(--color-gfs-surface)] border border-[var(--color-gfs-border-light)]">
                <p className="text-xs text-[var(--color-gfs-text-secondary)] leading-relaxed">{selectedTicket.description}</p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: 'Assignee', value: selectedTicket.assignee },
                  { label: 'Reporter', value: selectedTicket.reporter },
                  { label: 'Category', value: selectedTicket.category },
                  { label: 'Created', value: new Date(selectedTicket.created).toLocaleString() },
                ].map((f) => (
                  <div key={f.label} className="p-2 rounded-lg bg-[var(--color-gfs-elevated)]">
                    <div className="text-[9px] text-[var(--color-gfs-text-muted)] uppercase mb-0.5">{f.label}</div>
                    <div className="text-[11px] text-[var(--color-gfs-text)]">{f.value}</div>
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-2 pt-2 border-t border-[var(--color-gfs-border-light)]">
                <span className="text-[10px] text-[var(--color-gfs-text-muted)]">Update Status:</span>
                {['open', 'in-progress', 'pending', 'resolved', 'closed'].map((s) => (
                  <button key={s} onClick={() => updateTicketStatus(selectedTicket.id, s as any)}
                    className={`px-2 py-1 rounded text-[10px] capitalize transition-colors ${
                      selectedTicket.status === s ? 'bg-[var(--color-gfs-accent-dim)] text-[var(--color-gfs-accent)]' : 'text-[var(--color-gfs-text-muted)] hover:text-[var(--color-gfs-text)]'
                    }`}>
                    {s}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center py-16 text-[var(--color-gfs-text-muted)]">
              <Ticket className="w-8 h-8 mx-auto mb-3 opacity-30" />
              <p className="text-sm">Select a ticket to view details</p>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
