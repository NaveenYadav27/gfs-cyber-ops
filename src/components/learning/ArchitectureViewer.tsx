// src/components/learning/ArchitectureViewer.tsx
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, AlertTriangle, Shield, Info, Server, Database, Globe, Monitor, Cloud, Network, User, Wifi, Lock, Eye } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import type { ArchitectureDiagram } from '@/types/learning';

const nodeIcons: Record<string, React.ElementType> = {
  server: Server, firewall: Shield, database: Database, endpoint: Monitor,
  cloud: Cloud, network: Network, user: User, application: Monitor,
  security: Shield, external: Globe,
};

const statusColors: Record<string, string> = {
  normal: 'var(--color-gfs-green)', compromised: 'var(--color-gfs-red)',
  suspicious: 'var(--color-gfs-amber)', offline: 'var(--color-gfs-text-muted)',
};

const annotationColors: Record<string, string> = {
  info: 'var(--color-gfs-blue)', warning: 'var(--color-gfs-amber)',
  danger: 'var(--color-gfs-red)', success: 'var(--color-gfs-green)',
};

interface ArchitectureViewerProps {
  diagram: ArchitectureDiagram;
  onNodeClick?: (nodeId: string) => void;
}

export function ArchitectureViewer({ diagram, onNodeClick }: ArchitectureViewerProps) {
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const selected = diagram.nodes.find((n) => n.id === selectedNode);

  return (
    <div className="rounded-xl border border-[var(--color-gfs-border-light)] bg-[var(--color-gfs-surface)] overflow-hidden">
      <div className="px-4 py-2.5 border-b border-[var(--color-gfs-border-light)] flex items-center justify-between">
        <span className="text-xs font-semibold text-[var(--color-gfs-text)]">{diagram.title}</span>
        <div className="flex items-center gap-3 text-[10px] text-[var(--color-gfs-text-muted)]">
          <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-[var(--color-gfs-green)]" /> Normal</span>
          <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-[var(--color-gfs-amber)]" /> Suspicious</span>
          <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-[var(--color-gfs-red)]" /> Compromised</span>
        </div>
      </div>

      {/* Visual diagram */}
      <div className="p-6 gfs-grid-bg relative" style={{ minHeight: 300 }}>
        <div className="grid grid-cols-4 gap-4">
          {diagram.nodes.map((node, i) => {
            const Icon = nodeIcons[node.type] || Server;
            const isSelected = selectedNode === node.id;
            const annotation = diagram.annotations.find((a) => a.nodeId === node.id);

            return (
              <motion.div key={node.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => { setSelectedNode(isSelected ? null : node.id); onNodeClick?.(node.id); }}
                className={`relative p-3 rounded-xl border cursor-pointer transition-all ${
                  isSelected ? 'bg-[var(--color-gfs-elevated)] border-[var(--color-gfs-accent)]/50 ring-2 ring-[var(--color-gfs-accent)]/20' :
                  'bg-[var(--color-gfs-elevated)] border-[var(--color-gfs-border-light)] hover:border-[var(--color-gfs-border)]'
                }`}>
                {/* Status indicator */}
                <div className="absolute top-2 right-2">
                  <div className="w-2 h-2 rounded-full" style={{ background: statusColors[node.status || 'normal'] }} />
                </div>

                <Icon className="w-6 h-6 mb-2" style={{ color: statusColors[node.status || 'normal'] }} />
                <div className="text-[10px] font-semibold text-[var(--color-gfs-text)] leading-tight">{node.label}</div>
                {node.ip && <div className="text-[9px] text-[var(--color-gfs-text-muted)] font-mono mt-0.5">{node.ip}</div>}

                {/* Annotation */}
                {annotation && (
                  <div className="mt-2 p-1.5 rounded text-[9px] leading-tight"
                    style={{ background: `${annotationColors[annotation.type]}15`, color: annotationColors[annotation.type] }}>
                    {annotation.text}
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Connection legend */}
        {diagram.connections.some((c) => c.status === 'suspicious') && (
          <div className="mt-4 flex items-center gap-4 text-[10px]">
            <span className="flex items-center gap-1 text-[var(--color-gfs-amber)]">
              <div className="w-4 h-0.5 bg-[var(--color-gfs-amber)]" style={{ borderStyle: 'dashed' }} /> Suspicious Traffic
            </span>
          </div>
        )}
      </div>

      {/* Selected node detail */}
      <AnimatePresence>
        {selected && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="border-t border-[var(--color-gfs-border-light)] overflow-hidden">
            <div className="p-4 space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-semibold text-[var(--color-gfs-text)]">{selected.label}</h4>
                <button onClick={() => setSelectedNode(null)}><X className="w-3 h-3 text-[var(--color-gfs-text-muted)]" /></button>
              </div>
              <p className="text-[11px] text-[var(--color-gfs-text-secondary)]">{selected.description}</p>
              <div className="grid grid-cols-3 gap-2 text-[10px]">
                {selected.ip && <div><span className="text-[var(--color-gfs-text-muted)]">IP:</span> <span className="text-[var(--color-gfs-text)] font-mono">{selected.ip}</span></div>}
                {selected.location && <div><span className="text-[var(--color-gfs-text-muted)]">Location:</span> <span className="text-[var(--color-gfs-text)]">{selected.location}</span></div>}
                <div><span className="text-[var(--color-gfs-text-muted)]">Status:</span> <span style={{ color: statusColors[selected.status || 'normal'] }}>{selected.status || 'normal'}</span></div>
              </div>
              {selected.threats && selected.threats.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {selected.threats.map((t) => <Badge key={t} variant="critical">{t}</Badge>)}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
