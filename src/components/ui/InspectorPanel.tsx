import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, ExternalLink } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';

export interface InspectorTab {
  id: string;
  label: string;
  icon: React.ReactNode;
}

export interface InspectorSection {
  id: string;
  title: string;
  content: React.ReactNode;
}

interface InspectorPanelProps {
  open: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  badge?: React.ReactNode;
  tabs: InspectorTab[];
  sections: InspectorSection[];
  activeTab?: string;
  onTabChange?: (tabId: string) => void;
  width?: number;
}

export function InspectorPanel({
  open, onClose, title, subtitle, icon, badge,
  tabs, sections, activeTab: controlledTab, onTabChange, width = 420,
}: InspectorPanelProps) {
  const [internalTab, setInternalTab] = useState(tabs[0]?.id || '');
  const activeTab = controlledTab || internalTab;
  const panelRef = useRef<HTMLDivElement>(null);

  const handleTab = (id: string) => {
    setInternalTab(id);
    onTabChange?.(id);
  };

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [open, onClose]);

  // Click outside
  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        // Don't close if clicking on the element that opened it
      }
    };
    window.addEventListener('mousedown', handler);
    return () => window.removeEventListener('mousedown', handler);
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[var(--z-overlay)]"
            style={{ background: 'rgba(0, 0, 0, 0.3)', backdropFilter: 'blur(2px)' }}
          />

          {/* Panel */}
          <motion.div
            ref={panelRef}
            initial={{ x: width + 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: width + 20, opacity: 0 }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 h-screen z-[var(--z-inspector)] bg-[var(--color-gfs-deep)] border-l border-[var(--color-gfs-border)] flex flex-col shadow-xl"
            style={{ width }}
          >
            {/* Header */}
            <div className="flex items-center gap-3 px-4 py-3 border-b border-[var(--color-gfs-border-light)]">
              {icon && (
                <div className="w-8 h-8 rounded-lg bg-[var(--color-gfs-accent-dim)] flex items-center justify-center flex-shrink-0">
                  {icon}
                </div>
              )}
              <div className="flex-1 min-w-0">
                <div className="text-sm font-semibold text-[var(--color-gfs-text)] truncate">{title}</div>
                {subtitle && <div className="text-[10px] text-[var(--color-gfs-text-muted)] truncate">{subtitle}</div>}
              </div>
              {badge}
              <button onClick={onClose} className="w-7 h-7 rounded-md flex items-center justify-center text-[var(--color-gfs-text-muted)] hover:text-[var(--color-gfs-text)] hover:bg-[var(--color-gfs-hover)] transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Tab bar */}
            <div className="flex items-center gap-0 px-2 border-b border-[var(--color-gfs-border-light)] overflow-x-auto">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => handleTab(tab.id)}
                  className={`flex items-center gap-1.5 px-3 py-2 text-[11px] font-medium border-b-2 transition-colors whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'text-[var(--color-gfs-accent)] border-[var(--color-gfs-accent)]'
                      : 'text-[var(--color-gfs-text-muted)] border-transparent hover:text-[var(--color-gfs-text)] hover:border-[var(--color-gfs-border)]'
                  }`}
                >
                  {tab.icon}
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto">
              {sections.filter((s) => {
                // Show section if it belongs to the active tab, or if it's a general section
                return true;
              }).map((section) => (
                <div key={section.id} className="px-4 py-3 border-b border-[var(--color-gfs-border-light)]">
                  <div className="gfs-text-label mb-2">{section.title}</div>
                  {section.content}
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="px-4 py-2 border-t border-[var(--color-gfs-border-light)] flex items-center justify-between">
              <span className="text-[9px] text-[var(--color-gfs-text-muted)] font-mono">Inspector</span>
              <span className="text-[9px] text-[var(--color-gfs-text-muted)]">ESC to close</span>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
