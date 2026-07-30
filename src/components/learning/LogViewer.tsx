// src/components/learning/LogViewer.tsx
import { useState } from 'react';
import { Terminal as TerminalIcon, Copy, Check, Eye } from 'lucide-react';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/Badge';
import type { LogSnippet } from '@/types/learning';

interface LogViewerProps {
  entries: LogSnippet[];
  onHighlight?: (entry: LogSnippet) => void;
}

export function LogViewer({ entries, onHighlight }: LogViewerProps) {
  const [expandedEntry, setExpandedEntry] = useState<number | null>(null);
  const [copied, setCopied] = useState(false);

  const copyAll = () => {
    navigator.clipboard.writeText(entries.map((e) => `[${e.timestamp}] [${e.source}] [${e.level}] ${e.message}`).join('\n'));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-xl border border-[var(--color-gfs-border-light)] overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2 bg-[var(--color-gfs-deep)] border-b border-[var(--color-gfs-border-light)]">
        <div className="flex items-center gap-2">
          <TerminalIcon className="w-3 h-3 text-[var(--color-gfs-green)]" />
          <span className="text-[10px] font-mono text-[var(--color-gfs-text-muted)]">Evidence Logs</span>
          <Badge variant="default">{entries.length} entries</Badge>
        </div>
        <button onClick={copyAll} className="flex items-center gap-1 text-[10px] text-[var(--color-gfs-text-muted)] hover:text-[var(--color-gfs-text)]">
          {copied ? <Check className="w-3 h-3 text-[var(--color-gfs-green)]" /> : <Copy className="w-3 h-3" />}
          {copied ? 'Copied' : 'Copy All'}
        </button>
      </div>
      <div className="max-h-[400px] overflow-y-auto">
        {entries.map((entry, i) => (
          <motion.div key={i}
            initial={{ opacity: 0, x: -5 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.03 }}
            onClick={() => { setExpandedEntry(expandedEntry === i ? null : i); onHighlight?.(entry); }}
            className={`px-4 py-2 border-b border-[var(--color-gfs-border-light)] cursor-pointer transition-colors font-mono text-[10px] ${
              entry.highlight ? 'bg-[var(--color-gfs-amber-dim)]' : 'hover:bg-[var(--color-gfs-hover)]'
            } ${expandedEntry === i ? 'bg-[var(--color-gfs-elevated)]' : ''}`}>
            <div className="flex items-start gap-2">
              <span className="text-[var(--color-gfs-text-muted)] whitespace-nowrap flex-shrink-0">
                {new Date(entry.timestamp).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit', timeZone: 'Asia/Kolkata' })}
              </span>
              <span className={`flex-shrink-0 w-10 text-right ${
                entry.level === 'WARN' ? 'text-[var(--color-gfs-amber)]' :
                entry.level === 'ERROR' ? 'text-[var(--color-gfs-red)]' :
                'text-[var(--color-gfs-text-muted)]'
              }`}>[{entry.level}]</span>
              <span className="text-[var(--color-gfs-accent)] flex-shrink-0">{entry.source}</span>
              <span className="text-[var(--color-gfs-text-secondary)] flex-1">{entry.message}</span>
            </div>
            {expandedEntry === i && entry.explanation && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}
                className="mt-2 pt-2 border-t border-[var(--color-gfs-border-light)] pl-[140px]">
                <div className="p-2 rounded bg-[var(--color-gfs-accent-dim)] text-[10px] text-[var(--color-gfs-text-secondary)] leading-relaxed font-body">
                  <span className="text-[var(--color-gfs-accent)] font-semibold">Analyst Note: </span>{entry.explanation}
                </div>
                {entry.mitreTag && (
                  <Badge variant="default" className="mt-1">{entry.mitreTag}</Badge>
                )}
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
