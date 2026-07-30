// src/components/ui/StatusIndicator.tsx
import clsx from 'clsx';

interface StatusIndicatorProps {
  status: 'online' | 'degraded' | 'offline' | 'maintenance' | 'away';
  size?: 'sm' | 'md' | 'lg';
  label?: string | boolean;
}

const statusConfig = {
  online: { color: 'bg-[var(--color-gfs-green)]', ring: 'ring-[var(--color-gfs-green-dim)]', label: 'Online' },
  degraded: { color: 'bg-[var(--color-gfs-amber)]', ring: 'ring-[var(--color-gfs-amber-dim)]', label: 'Degraded' },
  offline: { color: 'bg-[var(--color-gfs-red)]', ring: 'ring-[var(--color-gfs-red-dim)]', label: 'Offline' },
  maintenance: { color: 'bg-[var(--color-gfs-blue)]', ring: 'ring-[var(--color-gfs-blue-dim)]', label: 'Maintenance' },
  away: { color: 'bg-[var(--color-gfs-text-muted)]', ring: 'ring-[var(--color-gfs-elevated)]', label: 'Away' },
};

const sizes = {
  sm: 'w-2 h-2',
  md: 'w-2.5 h-2.5',
  lg: 'w-3 h-3',
};

export function StatusIndicator({ status, size = 'md', label }: StatusIndicatorProps) {
  const config = statusConfig[status];
  return (
    <span className="inline-flex items-center gap-2">
      <span className={clsx('rounded-full ring-2 ring-offset-1 ring-offset-[var(--color-gfs-surface)]', sizes[size], config.color, config.ring, status === 'online' && 'animate-pulse-gfs')} />
      {label && <span className="text-xs text-[var(--color-gfs-text-secondary)]">{typeof label === 'string' ? label : config.label}</span>}
    </span>
  );
}
