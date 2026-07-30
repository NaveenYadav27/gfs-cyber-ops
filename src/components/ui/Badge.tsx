import clsx from 'clsx';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'success' | 'medium' | 'high' | 'critical' | 'accent' | 'low' | 'info';
  className?: string;
  pulse?: boolean;
}

export function Badge({ children, variant = 'default', className, pulse }: BadgeProps) {
  const styles = {
    default: 'bg-[var(--color-gfs-elevated)] text-[var(--color-gfs-text-secondary)] border-[var(--color-gfs-border-light)]',
    success: 'bg-[var(--color-gfs-green-dim)] text-[var(--color-gfs-green)] border-[rgba(63,185,80,0.15)]',
    medium: 'bg-[var(--color-gfs-amber-dim)] text-[var(--color-gfs-amber)] border-[rgba(210,153,34,0.15)]',
    high: 'bg-[var(--color-gfs-red-dim)] text-[var(--color-gfs-amber)] border-[rgba(248,81,73,0.12)]',
    critical: 'bg-[var(--color-gfs-red-dim)] text-[var(--color-gfs-red)] border-[rgba(248,81,73,0.2)]',
    accent: 'bg-[var(--color-gfs-accent-dim)] text-[var(--color-gfs-accent)] border-[rgba(0,229,199,0.15)]',
    low: 'bg-[var(--color-gfs-blue-dim)] text-[var(--color-gfs-blue)] border-[rgba(88,166,255,0.15)]',
    info: 'bg-[var(--color-gfs-blue-dim)] text-[var(--color-gfs-blue)] border-[rgba(88,166,255,0.15)]',
  };

  return (
    <span className={clsx(
      'inline-flex items-center px-1.5 py-0.5 rounded text-[9px] font-semibold border leading-tight',
      styles[variant],
      pulse && 'animate-pulse',
      className
    )}>
      {children}
    </span>
  );
}
