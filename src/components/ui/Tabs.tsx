import React, { useState } from 'react';
import clsx from 'clsx';
import { motion } from 'framer-motion';

export interface TabItem {
  id: string;
  label: string;
  icon?: React.ElementType;
}

export interface TabsProps {
  tabs: TabItem[];
  activeTab: string;
  onChange: (id: string) => void;
  className?: string;
}

export function Tabs({ tabs, activeTab, onChange, className }: TabsProps) {
  return (
    <div className={clsx('flex items-center border-b border-[var(--color-gfs-border)] w-full', className)}>
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        const Icon = tab.icon;

        return (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={clsx(
              'relative flex items-center gap-2 h-[36px] px-[12px] text-[13px] font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-[var(--color-gfs-border-focus)]',
              isActive
                ? 'text-[var(--color-gfs-text)]'
                : 'text-[var(--color-gfs-text-secondary)] hover:text-[var(--color-gfs-text)] hover:bg-[var(--color-gfs-hover)]'
            )}
          >
            {Icon && <Icon className="w-[16px] h-[16px]" />}
            {tab.label}
            {isActive && (
              <motion.div
                layoutId="activeTabIndicator"
                className="absolute bottom-[-1px] left-0 right-0 h-[2px] bg-[var(--color-gfs-blue)]"
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              />
            )}
          </button>
        );
      })}
    </div>
  );
}
