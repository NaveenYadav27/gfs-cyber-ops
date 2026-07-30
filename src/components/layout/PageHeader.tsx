import { motion } from 'framer-motion';

interface PageHeaderProps {
  icon: React.ReactNode;
  title: string;
  subtitle?: string;
  badge?: React.ReactNode;
  actions?: React.ReactNode;
}

export function PageHeader({ icon, title, subtitle, badge, actions }: PageHeaderProps) {
  return (
    <motion.div initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }}
      className="flex items-center justify-between mb-4">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-lg bg-[var(--color-gfs-surface)] border border-[var(--color-gfs-border-light)] flex items-center justify-center flex-shrink-0">
          {icon}
        </div>
        <div>
          <h1 className="gfs-text-h2 text-[var(--color-gfs-text)]">{title}</h1>
          {subtitle && <p className="gfs-text-caption mt-0.5">{subtitle}</p>}
        </div>
        {badge && <div className="ml-2">{badge}</div>}
      </div>
      {actions && <div className="flex items-center gap-2">{actions}</div>}
    </motion.div>
  );
}
