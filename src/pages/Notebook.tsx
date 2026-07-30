// src/pages/Notebook.tsx
import { useState } from 'react';
import { BookOpen, Filter, Search, Trash2, Shield, FileText, Terminal, Lightbulb, Eye, MessageCircle } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { PageHeader } from '@/components/layout/PageHeader';
import { useLearningEngine } from '@/store/useLearningEngine';
import type { NotebookEntry } from '@/types/learning';

const typeIcons: Record<string, React.ElementType> = {
  evidence: FileText, note: BookOpen, command: Terminal, screenshot: Eye,
  mitre: Shield, discovery: Lightbulb, reflection: MessageCircle,
};

const typeColors: Record<string, string> = {
  evidence: 'var(--color-gfs-blue)', note: 'var(--color-gfs-accent)', command: 'var(--color-gfs-green)',
  screenshot: 'var(--color-gfs-purple)', mitre: 'var(--color-gfs-red)', discovery: 'var(--color-gfs-amber)',
  reflection: 'var(--color-gfs-accent)',
};

export function Notebook() {
  const { notebook, clearNotebook } = useLearningEngine();
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');

  const types = ['all', ...new Set(notebook.map((n) => n.type))];
  const filtered = notebook.filter((n) => {
    if (typeFilter !== 'all' && n.type !== typeFilter) return false;
    if (search && !n.title.toLowerCase().includes(search.toLowerCase()) && !n.content.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="space-y-4">
      <PageHeader
        icon={<BookOpen className="w-5 h-5 text-[var(--color-gfs-accent)]" />}
        title="Investigation Notebook"
        subtitle={`Your personal knowledge base — ${notebook.length} entries`}
      />

      <div className="flex items-center gap-3">
        <div className="relative flex-1">
          <Search className="w-3.5 h-3.5 text-[var(--color-gfs-text-muted)] absolute left-3 top-1/2 -translate-y-1/2" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search notes, evidence, commands..."
            className="w-full pl-9 pr-4 py-2 rounded-lg bg-[var(--color-gfs-surface)] border border-[var(--color-gfs-border-light)] text-xs text-[var(--color-gfs-text)] placeholder:text-[var(--color-gfs-text-muted)] focus:outline-none focus:border-[var(--color-gfs-accent)] transition-colors" />
        </div>
        <div className="flex items-center gap-1">
          {types.map((t) => (
            <button key={t} onClick={() => setTypeFilter(t)}
              className={`px-2 py-1 rounded text-[10px] capitalize transition-colors ${
                typeFilter === t ? 'bg-[var(--color-gfs-accent-dim)] text-[var(--color-gfs-accent)]' : 'text-[var(--color-gfs-text-muted)] hover:text-[var(--color-gfs-text)]'
              }`}>{t}</button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <Card delay={0} className="!p-12 text-center">
          <BookOpen className="w-8 h-8 text-[var(--color-gfs-text-muted)] mx-auto mb-3 opacity-30" />
          <p className="text-sm text-[var(--color-gfs-text-muted)]">
            {notebook.length === 0 ? 'Your notebook is empty. Start a mission to collect evidence and notes.' : 'No entries match your search.'}
          </p>
        </Card>
      ) : (
        <div className="space-y-2">
          {filtered.map((entry, i) => {
            const Icon = typeIcons[entry.type] || FileText;
            return (
              <Card key={entry.id} delay={i * 0.02} className="!p-3">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: `${typeColors[entry.type]}15` }}>
                    <Icon className="w-4 h-4" style={{ color: typeColors[entry.type] }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h4 className="text-xs font-semibold text-[var(--color-gfs-text)]">{entry.title}</h4>
                      <Badge variant="default">{entry.type}</Badge>
                      {entry.importance === 'high' && <Badge variant="critical">High Importance</Badge>}
                    </div>
                    <p className="text-[11px] text-[var(--color-gfs-text-secondary)] mt-1 line-clamp-3 whitespace-pre-wrap">{entry.content}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-[10px] text-[var(--color-gfs-text-muted)] font-mono">
                        {new Date(entry.timestamp).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}
                      </span>
                      {entry.tags.map((tag) => <Badge key={tag} variant="default">{tag}</Badge>)}
                      {entry.mitreTags && entry.mitreTags.map((mt) => <Badge key={mt} variant="default">{mt}</Badge>)}
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
