import { motion } from 'framer-motion';
import { ArrowRight, ExternalLink, ChevronRight } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';

export interface RelationshipNode {
  id: string;
  label: string;
  type: string;
  status?: 'healthy' | 'warning' | 'critical';
  direction?: 'inbound' | 'outbound' | 'bidirectional';
  relationship?: string;
}

interface RelationshipExplorerProps {
  nodeId: string;
  nodeLabel: string;
  nodeType: string;
  relationships: RelationshipNode[];
  onNodeClick?: (nodeId: string) => void;
}

const statusColors: Record<string, string> = {
  healthy: 'var(--color-gfs-green)', warning: 'var(--color-gfs-amber)',
  critical: 'var(--color-gfs-red)',
};

export function RelationshipExplorer({ nodeId, nodeLabel, nodeType, relationships, onNodeClick }: RelationshipExplorerProps) {
  return (
    <div>
      <div className="gfs-text-label mb-3">Relationships</div>
      <div className="space-y-1">
        {relationships.map((rel, i) => (
          <motion.button key={rel.id} initial={{ opacity: 0, x: -5 }} animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.03 }}
            onClick={() => onNodeClick?.(rel.id)}
            className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-[var(--color-gfs-hover)] transition-colors text-left group">
            <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: rel.status ? statusColors[rel.status] : 'var(--color-gfs-text-muted)' }} />
            <div className="flex-1 min-w-0">
              <span className="text-[11px] text-[var(--color-gfs-text)]">{rel.label}</span>
              {rel.relationship && (
                <span className="text-[9px] text-[var(--color-gfs-text-muted)] ml-1.5">{rel.relationship}</span>
              )}
            </div>
            <Badge variant="default">{rel.type}</Badge>
            <ChevronRight className="w-3 h-3 text-[var(--color-gfs-text-muted)] opacity-0 group-hover:opacity-100 transition-opacity" />
          </motion.button>
        ))}
      </div>
    </div>
  );
}
