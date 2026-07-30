import { motion } from 'framer-motion';
import { AlertTriangle, Shield, Server, User, Settings, Clock, CheckCircle2, Play, FileText, Eye } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';

export interface TimelineEvent {
  id: string;
  timestamp: string;
  title: string;
  description: string;
  category: 'detection' | 'response' | 'system' | 'user' | 'configuration' | 'threat' | 'evidence';
  severity?: 'critical' | 'high' | 'medium' | 'low' | 'info';
  source?: string;
  mitreTag?: string;
}

const categoryConfig: Record<string, { icon: React.ElementType; color: string }> = {
  detection: { icon: Eye, color: 'var(--color-gfs-red)' },
  response: { icon: Shield, color: 'var(--color-gfs-amber)' },
  system: { icon: Server, color: 'var(--color-gfs-blue)' },
  user: { icon: User, color: 'var(--color-gfs-purple)' },
  configuration: { icon: Settings, color: 'var(--color-gfs-text-muted)' },
  threat: { icon: AlertTriangle, color: 'var(--color-gfs-red)' },
  evidence: { icon: FileText, color: 'var(--color-gfs-green)' },
};

interface TimelineProps {
  events: TimelineEvent[];
  maxEvents?: number;
}

export function Timeline({ events, maxEvents = 20 }: TimelineProps) {
  const displayEvents = events.slice(0, maxEvents);

  return (
    <div className="relative">
      {/* Vertical line */}
      <div className="absolute left-[15px] top-2 bottom-2 w-px bg-[var(--color-gfs-border-light)]" />

      <div className="space-y-0">
        {displayEvents.map((event, i) => {
          const config = categoryConfig[event.category] || categoryConfig.system;
          const Icon = config.icon;
          return (
            <motion.div key={event.id} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.03 }}
              className="flex items-start gap-3 py-2 relative">
              {/* Dot */}
              <div className="w-[30px] flex-shrink-0 flex justify-center relative z-10">
                <div className="w-[10px] h-[10px] rounded-full border-2 flex items-center justify-center"
                  style={{ borderColor: config.color, background: i === 0 ? config.color : 'var(--color-gfs-deep)' }}>
                  {i === 0 && <div className="w-1.5 h-1.5 rounded-full bg-white animate-gfs-pulse-dot" />}
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-semibold text-[var(--color-gfs-text)]">{event.title}</span>
                  {event.severity && (
                    <Badge variant={
                      event.severity === 'critical' ? 'critical' :
                      event.severity === 'high' ? 'high' :
                      event.severity === 'medium' ? 'medium' : 'default'
                    }>{event.severity}</Badge>
                  )}
                </div>
                <p className="text-[10px] text-[var(--color-gfs-text-secondary)] mt-0.5">{event.description}</p>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-[9px] text-[var(--color-gfs-text-muted)] font-mono">{event.timestamp}</span>
                  {event.source && <span className="text-[9px] text-[var(--color-gfs-text-muted)]">• {event.source}</span>}
                  {event.mitreTag && <Badge variant="default">{event.mitreTag}</Badge>}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
