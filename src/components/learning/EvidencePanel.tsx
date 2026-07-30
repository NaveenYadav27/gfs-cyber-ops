// src/components/learning/EvidencePanel.tsx
import { useState } from 'react';
import { FileText, ChevronDown, Shield, AlertTriangle, Download } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Badge } from '@/components/ui/Badge';
import type { EvidenceTemplate } from '@/types/learning';
import { useLearningEngine } from '@/store/useLearningEngine';

interface EvidencePanelProps {
  items: EvidenceTemplate[];
  missionId: string;
}

const typeIcons: Record<string, string> = {
  log: '📄', pcap: '🌐', memory: '🧠', disk: '💾', network: '📡',
  cloud: '☁️', email: '📧', ioc: '🎯', screenshot: '📸', document: '📋',
};

export function EvidencePanel({ items, missionId }: EvidencePanelProps) {
  const { addNotebookEntry } = useLearningEngine();
  const [expanded, setExpanded] = useState<string | null>(null);
  const [collected, setCollected] = useState<Set<string>>(new Set());

  const handleCollect = (item: EvidenceTemplate) => {
    if (collected.has(item.id)) return;
    setCollected((prev) => new Set([...prev, item.id]));
    addNotebookEntry({
      missionId, type: 'evidence', title: item.name,
      content: item.content, tags: [item.type, item.source],
      mitreTags: item.mitreMapping ? [item.mitreMapping] : [],
      importance: 'high',
    });
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <FileText className="w-4 h-4 text-[var(--color-gfs-blue)]" />
        <span className="text-xs font-semibold text-[var(--color-gfs-text)]">Evidence</span>
        <Badge variant="default">{collected.size}/{items.length} collected</Badge>
      </div>
      {items.map((item) => (
        <div key={item.id}>
          <button onClick={() => setExpanded(expanded === item.id ? null : item.id)}
            className="w-full p-3 rounded-lg bg-[var(--color-gfs-elevated)] border border-[var(--color-gfs-border-light)] text-left hover:bg-[var(--color-gfs-hover)] transition-colors">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span>{typeIcons[item.type]}</span>
                <span className="text-xs font-medium text-[var(--color-gfs-text)]">{item.name}</span>
                <Badge variant="default">{item.type}</Badge>
                {collected.has(item.id) && <Badge variant="success">Collected</Badge>}
              </div>
              <ChevronDown className={`w-3 h-3 text-[var(--color-gfs-text-muted)] transition-transform ${expanded === item.id ? 'rotate-180' : ''}`} />
            </div>
          </button>
          <AnimatePresence>
            {expanded === item.id && (
              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                <div className="p-3 mt-1 rounded-lg bg-[var(--color-gfs-surface)] border border-[var(--color-gfs-border-light)] space-y-2">
                  <p className="text-[10px] text-[var(--color-gfs-text-muted)]">{item.description}</p>
                  <div className="p-2 rounded bg-[var(--color-gfs-base)] font-mono text-[9px] text-[var(--color-gfs-text-muted)] whitespace-pre-wrap max-h-24 overflow-y-auto">
                    {item.content}
                  </div>
                  {item.businessImpact && (
                    <div className="p-2 rounded bg-[var(--color-gfs-amber-dim)]">
                      <span className="text-[9px] text-[var(--color-gfs-amber)] uppercase font-semibold">Business Impact</span>
                      <p className="text-[10px] text-[var(--color-gfs-text-secondary)]">{item.businessImpact}</p>
                    </div>
                  )}
                  <button onClick={() => handleCollect(item)} disabled={collected.has(item.id)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-medium transition-colors ${
                      collected.has(item.id) ? 'bg-[var(--color-gfs-green-dim)] text-[var(--color-gfs-green)]' : 'bg-[var(--color-gfs-accent-dim)] text-[var(--color-gfs-accent)] hover:bg-[var(--color-gfs-accent)]/20'
                    }`}>
                    {collected.has(item.id) ? <><Shield className="w-3 h-3" /> Collected to Notebook</> : <><Download className="w-3 h-3" /> Collect Evidence</>}
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}
