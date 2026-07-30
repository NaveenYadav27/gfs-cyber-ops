import { motion } from 'framer-motion';
import { Activity, AlertTriangle, Search, Server, Users, CheckCircle2, FileText, RefreshCw } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { useStore } from '@/store/useStore';
import { PageHeader } from '@/components/layout/PageHeader';
import { useState } from 'react';

const ICON_MAP: Record<string, React.ElementType> = {
  alert: AlertTriangle,
  investigation: Search,
  scan: RefreshCw,
  system: Server,
  user: Users,
  deployment: CheckCircle2,
  change: FileText,
  meeting: Users,
};

const COLOR_MAP: Record<string, string> = {
  critical: 'var(--color-gfs-red)', high: 'var(--color-gfs-amber)',
  medium: 'var(--color-gfs-blue)', low: 'var(--color-gfs-text-muted)',
  info: 'var(--color-gfs-purple)', success: 'var(--color-gfs-green)',
};

export function ActivityFeed() {
  const { activity } = useStore();
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const types = ['all', ...new Set(activity.map((a) => a.type))];
  const filtered = typeFilter === 'all' ? activity : activity.filter((a) => a.type === typeFilter);

  return (
    <div className="space-y-4">
      <PageHeader
        icon={<Activity className="w-5 h-5 text-[var(--color-gfs-accent)]" />}
        title="Activity Feed"
        subtitle="Real-time enterprise activity across all GFS security systems"
      />

      <div className="flex items-center gap-2 flex-wrap">
        {types.map((t) => (
          <button key={t} onClick={() => setTypeFilter(t)}
            className={`px-3 py-1.5 rounded-lg text-[11px] capitalize transition-colors ${
              typeFilter === t ? 'bg-[var(--color-gfs-accent-dim)] text-[var(--color-gfs-accent)]' : 'text-[var(--color-gfs-text-muted)] hover:text-[var(--color-gfs-text)]'
            }`}>
            {t}
          </button>
        ))}
      </div>

      <Card delay={0.05} className="!p-0">
        <div className="divide-y divide-[var(--color-gfs-border-light)]">
          {filtered.map((event, i) => {
            const Icon = ICON_MAP[event.type] || Activity;
            return (
              <motion.div key={event.id} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.03 }}
                className="flex items-start gap-3 px-5 py-3.5 hover:bg-[var(--color-gfs-hover)] transition-colors cursor-pointer">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                  style={{ background: `${COLOR_MAP[event.severity]}15` }}>
                  <Icon className="w-4 h-4" style={{ color: COLOR_MAP[event.severity] }} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-[var(--color-gfs-text)] leading-relaxed">{event.message}</p>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-[10px] text-[var(--color-gfs-text-muted)] font-mono">
                      {new Date(event.timestamp).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                    </span>
                    {event.user && <span className="text-[10px] text-[var(--color-gfs-text-muted)]">{event.user}</span>}
                    <span className="text-[10px] text-[var(--color-gfs-text-muted)] capitalize">{event.type}</span>
                  </div>
                </div>
                <Badge variant={event.severity as any}>{event.severity}</Badge>
              </motion.div>
            );
          })}
        </div>
      </Card>
    </div>
  );
}
