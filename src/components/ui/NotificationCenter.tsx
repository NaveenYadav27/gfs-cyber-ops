import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, AlertTriangle, Shield, MessageSquare, Target, TrendingUp, Clock, Settings, X, Check } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { useStore } from '@/store/useStore';

interface Notification {
  id: string;
  type: 'security' | 'system' | 'mission' | 'message' | 'career' | 'compliance';
  title: string;
  body: string;
  time: string;
  read: boolean;
  priority: 'critical' | 'high' | 'medium' | 'low';
  actionPage?: string;
}

const MOCK_NOTIFICATIONS: Notification[] = [
  { id: 'n1', type: 'security', title: 'Ransomware Detected', body: 'WRK-LOAN-047 — LockBit 3.0 containment in progress', time: '2 min ago', read: false, priority: 'critical', actionPage: 'incidents' },
  { id: 'n2', type: 'security', title: 'Impossible Travel Alert', body: 'svc-neft-ops@gfs.com — login from Singapore', time: '8 min ago', read: false, priority: 'high', actionPage: 'incidents' },
  { id: 'n3', type: 'mission', title: 'Mission 2 Available', body: 'Phishing Email Investigation is now unlocked', time: '1 hr ago', read: false, priority: 'medium', actionPage: 'missions' },
  { id: 'n4', type: 'compliance', title: 'RBI Report Due', body: 'Cyber incident report must be filed within 6 hours', time: '3 hr ago', read: false, priority: 'high', actionPage: 'audit' },
  { id: 'n5', type: 'message', title: 'Suresh Reddy', body: 'Great work on the UPI investigation. Let us discuss your findings.', time: '4 hr ago', read: true, priority: 'low', actionPage: 'messaging' },
  { id: 'n6', type: 'system', title: 'Sentinel Update', body: 'Analytics rules updated — 3 new rules deployed', time: '6 hr ago', read: true, priority: 'low' },
  { id: 'n7', type: 'career', title: 'Promotion Eligibility', body: 'You are 60% ready for SOC Analyst L1 promotion', time: '1 day ago', read: true, priority: 'medium', actionPage: 'career' },
];

const typeConfig: Record<string, { icon: React.ElementType; color: string }> = {
  security: { icon: Shield, color: 'var(--color-gfs-red)' },
  system: { icon: Settings, color: 'var(--color-gfs-blue)' },
  mission: { icon: Target, color: 'var(--color-gfs-accent)' },
  message: { icon: MessageSquare, color: 'var(--color-gfs-purple)' },
  career: { icon: TrendingUp, color: 'var(--color-gfs-green)' },
  compliance: { icon: AlertTriangle, color: 'var(--color-gfs-amber)' },
};

const priorityBadge: Record<string, 'critical' | 'high' | 'medium' | 'default'> = {
  critical: 'critical', high: 'high', medium: 'medium', low: 'default',
};

export function NotificationCenter() {
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS);
  const panelRef = useRef<HTMLDivElement>(null);
  const { setCurrentPage } = useStore();

  const unread = notifications.filter((n) => !n.read).length;

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) setOpen(false);
    };
    window.addEventListener('mousedown', handler);
    return () => window.removeEventListener('mousedown', handler);
  }, [open]);

  const markRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => n.id === id ? { ...n, read: true } : n));
  };

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  return (
    <div className="relative" ref={panelRef}>
      <button onClick={() => setOpen(!open)}
        className="relative w-8 h-8 rounded-lg flex items-center justify-center text-[var(--color-gfs-text-muted)] hover:text-[var(--color-gfs-text)] hover:bg-[var(--color-gfs-hover)] transition-colors">
        <Bell className="w-4 h-4" />
        {unread > 0 && (
          <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-[var(--color-gfs-red)] text-[8px] font-bold text-white flex items-center justify-center">
            {unread}
          </span>
        )}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, y: -8, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.95 }}
            className="absolute right-0 top-full mt-2 w-[380px] bg-[var(--color-gfs-deep)] border border-[var(--color-gfs-border)] rounded-xl shadow-xl z-[var(--z-dropdown)] overflow-hidden">
            {/* Header */}
            <div className="px-4 py-2.5 border-b border-[var(--color-gfs-border-light)] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-[var(--color-gfs-text)]">Notifications</span>
                {unread > 0 && <Badge variant="critical">{unread} new</Badge>}
              </div>
              <button onClick={markAllRead} className="text-[10px] text-[var(--color-gfs-accent)] hover:underline">Mark all read</button>
            </div>

            {/* List */}
            <div className="max-h-[400px] overflow-y-auto">
              {notifications.map((notif) => {
                const config = typeConfig[notif.type] || typeConfig.system;
                const Icon = config.icon;
                return (
                  <button key={notif.id} onClick={() => { markRead(notif.id); if (notif.actionPage) { setCurrentPage(notif.actionPage); setOpen(false); } }}
                    className={`w-full flex items-start gap-3 px-4 py-3 text-left transition-colors hover:bg-[var(--color-gfs-hover)] border-b border-[var(--color-gfs-border-light)] ${
                      !notif.read ? 'bg-[var(--color-gfs-accent-dim)]' : ''
                    }`}>
                    <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: `${config.color}15` }}>
                      <Icon className="w-3.5 h-3.5" style={{ color: config.color }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="text-[11px] font-semibold text-[var(--color-gfs-text)]">{notif.title}</span>
                        <Badge variant={priorityBadge[notif.priority]}>{notif.priority}</Badge>
                      </div>
                      <p className="text-[10px] text-[var(--color-gfs-text-secondary)] mt-0.5 line-clamp-2">{notif.body}</p>
                      <span className="text-[9px] text-[var(--color-gfs-text-muted)] mt-0.5 block">{notif.time}</span>
                    </div>
                    {!notif.read && <div className="w-2 h-2 rounded-full bg-[var(--color-gfs-accent)] flex-shrink-0 mt-2" />}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
