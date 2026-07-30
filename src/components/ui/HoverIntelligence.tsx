import { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Server, Database, Globe, Monitor, Cloud, Network, AlertTriangle, Target, Clock } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';

export interface HoverData {
  title: string;
  type: 'server' | 'firewall' | 'database' | 'endpoint' | 'cloud' | 'network' | 'user' | 'application' | 'alert' | 'asset';
  status?: 'healthy' | 'warning' | 'critical' | 'offline';
  ip?: string;
  location?: string;
  owner?: string;
  criticality?: 'critical' | 'high' | 'medium' | 'low';
  businessPurpose?: string;
  technicalRole?: string;
  dependencies?: string[];
  recentAlerts?: number;
  mitreMapping?: string[];
  linkedMissions?: string[];
  lastSeen?: string;
}

const typeIcons: Record<string, React.ElementType> = {
  server: Server, firewall: Shield, database: Database, endpoint: Monitor,
  cloud: Cloud, network: Network, user: Target, application: Monitor,
  alert: AlertTriangle, asset: Globe,
};

const statusColors: Record<string, string> = {
  healthy: 'var(--color-gfs-green)', warning: 'var(--color-gfs-amber)',
  critical: 'var(--color-gfs-red)', offline: 'var(--color-gfs-text-muted)',
};

interface HoverIntelligenceProps {
  data: HoverData;
  children: React.ReactNode;
  onClick?: () => void;
  delay?: number;
}

export function HoverIntelligence({ data, children, onClick, delay = 400 }: HoverIntelligenceProps) {
  const [show, setShow] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const posRef = useRef({ x: 0, y: 0 });

  const handleEnter = useCallback((e: React.MouseEvent) => {
    posRef.current = { x: e.clientX, y: e.clientY };
    timeoutRef.current = setTimeout(() => setShow(true), delay);
  }, [delay]);

  const handleLeave = useCallback(() => {
    clearTimeout(timeoutRef.current);
    setShow(false);
  }, []);

  const handleMove = useCallback((e: React.MouseEvent) => {
    const dx = Math.abs(e.clientX - posRef.current.x);
    const dy = Math.abs(e.clientY - posRef.current.y);
    if (dx > 5 || dy > 5) {
      clearTimeout(timeoutRef.current);
      posRef.current = { x: e.clientX, y: e.clientY };
      timeoutRef.current = setTimeout(() => setShow(true), delay);
    }
  }, [delay]);

  const Icon = typeIcons[data.type] || Server;

  return (
    <div
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      onMouseMove={handleMove}
      onClick={onClick}
      className="relative inline-block w-full"
    >
      {children}

      <AnimatePresence>
        {show && (
          <motion.div
            initial={{ opacity: 0, y: 4, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.97 }}
            transition={{ duration: 0.15 }}
            className="fixed z-[var(--z-tooltip)] pointer-events-none"
            style={{
              left: Math.min(posRef.current.x + 12, window.innerWidth - 340),
              top: Math.min(posRef.current.y - 8, window.innerHeight - 280),
            }}
          >
            <div className="w-80 rounded-xl bg-[var(--color-gfs-deep)] border border-[var(--color-gfs-border)] shadow-xl overflow-hidden">
              {/* Header */}
              <div className="px-3 py-2.5 border-b border-[var(--color-gfs-border-light)] flex items-center gap-2 bg-[var(--color-gfs-surface)]">
                <Icon className="w-4 h-4" style={{ color: data.status ? statusColors[data.status] : 'var(--color-gfs-text-muted)' }} />
                <span className="text-[11px] font-semibold text-[var(--color-gfs-text)] flex-1 truncate">{data.title}</span>
                {data.status && (
                  <div className="w-2 h-2 rounded-full" style={{ background: statusColors[data.status] }} />
                )}
              </div>

              {/* Body */}
              <div className="px-3 py-2 space-y-1.5">
                {data.ip && (
                  <div className="flex items-center gap-2 text-[10px]">
                    <span className="text-[var(--color-gfs-text-muted)] w-16">IP</span>
                    <span className="text-[var(--color-gfs-text)] font-mono">{data.ip}</span>
                  </div>
                )}
                {data.location && (
                  <div className="flex items-center gap-2 text-[10px]">
                    <span className="text-[var(--color-gfs-text-muted)] w-16">Location</span>
                    <span className="text-[var(--color-gfs-text)]">{data.location}</span>
                  </div>
                )}
                {data.owner && (
                  <div className="flex items-center gap-2 text-[10px]">
                    <span className="text-[var(--color-gfs-text-muted)] w-16">Owner</span>
                    <span className="text-[var(--color-gfs-text)]">{data.owner}</span>
                  </div>
                )}
                {data.criticality && (
                  <div className="flex items-center gap-2 text-[10px]">
                    <span className="text-[var(--color-gfs-text-muted)] w-16">Criticality</span>
                    <Badge variant={data.criticality === 'critical' ? 'critical' : data.criticality === 'high' ? 'high' : data.criticality === 'medium' ? 'medium' : 'default'}>
                      {data.criticality}
                    </Badge>
                  </div>
                )}
                {data.businessPurpose && (
                  <div className="mt-1 p-2 rounded bg-[var(--color-gfs-elevated)] text-[10px] text-[var(--color-gfs-text-secondary)]">
                    <span className="text-[var(--color-gfs-accent)] font-semibold">Business: </span>{data.businessPurpose}
                  </div>
                )}
                {data.recentAlerts !== undefined && data.recentAlerts > 0 && (
                  <div className="flex items-center gap-1 text-[10px] text-[var(--color-gfs-amber)]">
                    <AlertTriangle className="w-3 h-3" /> {data.recentAlerts} active alert{data.recentAlerts > 1 ? 's' : ''}
                  </div>
                )}
                {data.dependencies && data.dependencies.length > 0 && (
                  <div className="flex items-center gap-1 flex-wrap mt-1">
                    <span className="text-[9px] text-[var(--color-gfs-text-muted)]">Depends on:</span>
                    {data.dependencies.slice(0, 3).map((d) => <Badge key={d} variant="default">{d}</Badge>)}
                    {data.dependencies.length > 3 && <span className="text-[9px] text-[var(--color-gfs-text-muted)]">+{data.dependencies.length - 3}</span>}
                  </div>
                )}
                {data.mitreMapping && data.mitreMapping.length > 0 && (
                  <div className="flex items-center gap-1 flex-wrap mt-1">
                    <span className="text-[9px] text-[var(--color-gfs-text-muted)]">MITRE:</span>
                    {data.mitreMapping.slice(0, 3).map((m) => <Badge key={m} variant="default">{m}</Badge>)}
                  </div>
                )}
                {data.linkedMissions && data.linkedMissions.length > 0 && (
                  <div className="flex items-center gap-1 text-[9px] text-[var(--color-gfs-accent)] mt-1">
                    <Target className="w-2.5 h-2.5" /> {data.linkedMissions.length} linked mission{data.linkedMissions.length > 1 ? 's' : ''}
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="px-3 py-1.5 border-t border-[var(--color-gfs-border-light)] flex items-center justify-between">
                <span className="text-[9px] text-[var(--color-gfs-text-muted)] uppercase">{data.type}</span>
                {data.lastSeen && (
                  <span className="text-[9px] text-[var(--color-gfs-text-muted)] flex items-center gap-1">
                    <Clock className="w-2.5 h-2.5" /> {data.lastSeen}
                  </span>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
