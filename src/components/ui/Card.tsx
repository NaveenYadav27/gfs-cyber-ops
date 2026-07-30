import { motion } from 'framer-motion';
import clsx from 'clsx';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  glow?: 'accent' | 'red' | 'amber' | 'green' | 'blue';
  hover?: boolean;
  onClick?: () => void;
}

export function Card({ children, className, delay = 0, glow, hover = false, onClick }: CardProps) {
  const glowMap = {
    accent: 'shadow-[0_0_20px_rgba(0,229,199,0.06)] border-[rgba(0,229,199,0.15)]',
    red: 'shadow-[0_0_20px_rgba(248,81,73,0.06)] border-[rgba(248,81,73,0.15)]',
    amber: 'shadow-[0_0_20px_rgba(210,153,34,0.06)] border-[rgba(210,153,34,0.15)]',
    green: 'shadow-[0_0_20px_rgba(63,185,80,0.06)] border-[rgba(63,185,80,0.15)]',
    blue: 'shadow-[0_0_20px_rgba(88,166,255,0.06)] border-[rgba(88,166,255,0.15)]',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      onClick={onClick}
      className={clsx(
        'rounded-xl border border-[var(--color-gfs-border-light)] bg-[var(--color-gfs-surface)] p-4',
        glow && glowMap[glow],
        hover && 'hover:bg-[var(--color-gfs-hover)] hover:border-[var(--color-gfs-border)] transition-all cursor-pointer',
        onClick && 'cursor-pointer',
        className
      )}
    >
      {children}
    </motion.div>
  );
}
