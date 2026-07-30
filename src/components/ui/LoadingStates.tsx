import { motion } from 'framer-motion';
import { AlertTriangle, RefreshCw, ArrowRight, FileText, Search } from 'lucide-react';

/* ── Skeleton Loader ── */
interface SkeletonProps { className?: string; style?: React.CSSProperties; }

export function SkeletonBlock({ className = '', style }: SkeletonProps) {
  return <div className={`gfs-skeleton ${className}`} style={style} />;
}

export function SkeletonCard() {
  return (
    <div className="p-4 rounded-xl border border-[var(--color-gfs-border-light)] bg-[var(--color-gfs-surface)]">
      <SkeletonBlock className="gfs-skeleton-title" />
      <SkeletonBlock className="gfs-skeleton-text" style={{ width: '80%' }} />
      <SkeletonBlock className="gfs-skeleton-text" style={{ width: '60%' }} />
      <div className="flex gap-2 mt-3">
        <SkeletonBlock className="h-6 w-16 rounded-full" />
        <SkeletonBlock className="h-6 w-12 rounded-full" />
      </div>
    </div>
  );
}

export function SkeletonPage() {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <SkeletonBlock className="w-10 h-10 rounded-lg" />
        <div>
          <SkeletonBlock className="gfs-skeleton-title" style={{ width: 200 }} />
          <SkeletonBlock className="gfs-skeleton-text" style={{ width: 140 }} />
        </div>
      </div>
      <div className="grid grid-cols-4 gap-3">
        {[1, 2, 3, 4].map((i) => <SkeletonCard key={i} />)}
      </div>
      <SkeletonBlock className="h-48 rounded-xl" />
    </div>
  );
}

/* ── Empty State ── */
interface EmptyStateProps {
  icon?: React.ElementType;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
}

export function EmptyState({ icon: Icon = FileText, title, description, actionLabel, onAction }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-8 text-center">
      <div className="w-16 h-16 rounded-2xl bg-[var(--color-gfs-elevated)] flex items-center justify-center mb-4">
        <Icon className="w-7 h-7 text-[var(--color-gfs-text-muted)] opacity-40" />
      </div>
      <h3 className="gfs-text-h3 text-[var(--color-gfs-text)] mb-1">{title}</h3>
      <p className="text-xs text-[var(--color-gfs-text-muted)] max-w-sm leading-relaxed">{description}</p>
      {actionLabel && onAction && (
        <button onClick={onAction}
          className="mt-4 flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[var(--color-gfs-accent-dim)] text-[var(--color-gfs-accent)] text-xs font-medium hover:bg-[var(--color-gfs-accent)]/15 transition-colors">
          {actionLabel} <ArrowRight className="w-3 h-3" />
        </button>
      )}
    </div>
  );
}

/* ── Error State ── */
interface ErrorStateProps {
  title: string;
  message: string;
  severity?: 'critical' | 'high' | 'medium';
  onRetry?: () => void;
  owner?: string;
}

export function ErrorState({ title, message, severity = 'high', onRetry, owner }: ErrorStateProps) {
  return (
    <div className="p-6 rounded-xl border border-[var(--color-gfs-red)]/20 bg-[var(--color-gfs-red-dim)]">
      <div className="flex items-start gap-3">
        <AlertTriangle className="w-5 h-5 text-[var(--color-gfs-red)] flex-shrink-0 mt-0.5" />
        <div>
          <h3 className="text-sm font-semibold text-[var(--color-gfs-text)]">{title}</h3>
          <p className="text-[11px] text-[var(--color-gfs-text-secondary)] mt-1">{message}</p>
          {owner && <p className="text-[10px] text-[var(--color-gfs-text-muted)] mt-2">Owner: {owner}</p>}
          {onRetry && (
            <button onClick={onRetry}
              className="mt-3 flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[var(--color-gfs-surface)] text-[var(--color-gfs-text)] text-[11px] hover:bg-[var(--color-gfs-elevated)] transition-colors">
              <RefreshCw className="w-3 h-3" /> Retry
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

/* ── Loading Spinner ── */
interface LoadingSpinnerProps { message?: string; size?: 'sm' | 'md' | 'lg'; }

export function LoadingSpinner({ message, size = 'md' }: LoadingSpinnerProps) {
  const s = size === 'sm' ? 'w-4 h-4' : size === 'lg' ? 'w-8 h-8' : 'w-6 h-6';
  return (
    <div className="flex flex-col items-center justify-center py-8 gap-3">
      <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
        className={`${s} rounded-full border-2 border-[var(--color-gfs-border)] border-t-[var(--color-gfs-accent)]`} />
      {message && <span className="text-[11px] text-[var(--color-gfs-text-muted)]">{message}</span>}
    </div>
  );
}
