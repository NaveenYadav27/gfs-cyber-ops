// src/components/layout/Header.tsx
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Bell, Shield, ChevronDown, X, Sun, Moon } from 'lucide-react';
import { useStore } from '@/store/useStore';
import { Badge } from '@/components/ui/Badge';

function Clock() {
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <span className="font-mono text-xs text-[var(--color-gfs-text-secondary)]">
      {time.toLocaleTimeString('en-US', { hour12: false })} UTC
    </span>
  );
}

export function Header() {
  const { user, alerts, searchOpen, setSearchOpen, notificationsOpen, setNotificationsOpen, theme, setTheme } = useStore();
  const [searchQuery, setSearchQuery] = useState('');
  const criticalAlerts = alerts.filter((a) => a.severity === 'critical' && a.status !== 'resolved');

  const PAGES: Record<string, string> = {
    dashboard: 'Dashboard',
    activity: 'Activity Feed',
    soc: 'SOC Console',
    incidents: 'Incidents',
    investigations: 'Investigations',
    playbooks: 'Playbooks',
    'threat-intel': 'Threat Intelligence',
    vulnerabilities: 'Vulnerabilities',
    firewall: 'Firewall Rules',
    siem: 'SIEM',
    edr: 'EDR',
    'enterprise-map': 'Enterprise Map',
    servers: 'Servers',
    cloud: 'Cloud',
    network: 'Network',
    ad: 'Active Directory',
    users: 'Users & Groups',
    access: 'Access Reviews',
    pam: 'Privileged Access',
    risk: 'Risk Register',
    policies: 'Policies',
    audit: 'Audit Log',
    frameworks: 'Frameworks',
    'ethical-hacking': 'Ethical Hacking',
    vapt: 'VAPT',
    'purple-team': 'Purple Team',
    career: 'My Progression',
    skills: 'Skills Matrix',
    certs: 'Certifications',
    settings: 'Settings',
  };

  const { currentPage } = useStore();

  return (
    <header className="h-14 bg-[var(--color-gfs-deep)]/80 backdrop-blur-xl border-b border-[var(--color-gfs-border-light)] flex items-center justify-between px-6 sticky top-0 z-40">
      {/* Left: Page title + breadcrumb */}
      <div className="flex items-center gap-3">
        <h1 className="text-sm font-display font-semibold text-[var(--color-gfs-text)]">
          {PAGES[currentPage] || 'Dashboard'}
        </h1>
        <div className="hidden md:flex items-center gap-1 text-[10px] text-[var(--color-gfs-text-muted)] font-mono">
          <span>GFS</span>
          <span>/</span>
          <span>CyberOps</span>
          <span>/</span>
          <span className="text-[var(--color-gfs-accent)]">{PAGES[currentPage] || 'Dashboard'}</span>
        </div>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-4">
        {/* Threat Level */}
        <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[var(--color-gfs-amber-dim)] border border-[var(--color-gfs-amber)]/20">
          <Shield className="w-3.5 h-3.5 text-[var(--color-gfs-amber)]" />
          <span className="text-[10px] font-semibold text-[var(--color-gfs-amber)] tracking-wider">THREAT LEVEL: ELEVATED</span>
        </div>

        <Clock />

        {/* Theme Toggle */}
        <button
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className="w-8 h-8 rounded-lg flex items-center justify-center text-[var(--color-gfs-text-muted)] hover:text-[var(--color-gfs-text)] hover:bg-[var(--color-gfs-elevated)] transition-colors"
        >
          {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </button>

        {/* Search */}
        <button
          onClick={() => setSearchOpen(!searchOpen)}
          className="w-8 h-8 rounded-lg flex items-center justify-center text-[var(--color-gfs-text-muted)] hover:text-[var(--color-gfs-text)] hover:bg-[var(--color-gfs-elevated)] transition-colors"
        >
          <Search className="w-4 h-4" />
        </button>

        {/* Notifications */}
        <button
          onClick={() => setNotificationsOpen(!notificationsOpen)}
          className="w-8 h-8 rounded-lg flex items-center justify-center text-[var(--color-gfs-text-muted)] hover:text-[var(--color-gfs-text)] hover:bg-[var(--color-gfs-elevated)] transition-colors relative"
        >
          <Bell className="w-4 h-4" />
          {criticalAlerts.length > 0 && (
            <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-[var(--color-gfs-red)] text-[9px] font-bold flex items-center justify-center text-white">
              {criticalAlerts.length}
            </span>
          )}
        </button>

        {/* User Profile */}
        <div className="flex items-center gap-3 pl-3 border-l border-[var(--color-gfs-border-light)]">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[var(--color-gfs-accent)] to-[var(--color-gfs-blue)] flex items-center justify-center">
            <span className="text-[10px] font-bold text-[var(--color-gfs-base)]">{user?.avatarInitials}</span>
          </div>
          <div className="hidden md:block">
            <div className="text-xs font-medium text-[var(--color-gfs-text)] leading-none">{user?.name}</div>
            <div className="text-[10px] text-[var(--color-gfs-text-muted)] leading-none mt-1">{user?.role}</div>
          </div>
          <ChevronDown className="w-3 h-3 text-[var(--color-gfs-text-muted)]" />
        </div>
      </div>

      {/* Search Overlay */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-14 left-1/2 -translate-x-1/2 w-full max-w-lg bg-[var(--color-gfs-elevated)] border border-[var(--color-gfs-border)] rounded-xl shadow-2xl p-4 z-50"
          >
            <div className="flex items-center gap-3">
              <Search className="w-4 h-4 text-[var(--color-gfs-text-muted)]" />
              <input
                autoFocus
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search alerts, systems, people, modules..."
                className="flex-1 bg-transparent text-sm text-[var(--color-gfs-text)] placeholder:text-[var(--color-gfs-text-muted)] outline-none"
              />
              <button onClick={() => setSearchOpen(false)}>
                <X className="w-4 h-4 text-[var(--color-gfs-text-muted)] hover:text-[var(--color-gfs-text)]" />
              </button>
            </div>
            <div className="mt-3 pt-3 border-t border-[var(--color-gfs-border-light)]">
              <div className="text-[10px] text-[var(--color-gfs-text-muted)] uppercase tracking-wider mb-2">Quick Access</div>
              <div className="flex flex-wrap gap-2">
                {['SOC Console', 'Enterprise Map', 'My Progression', 'Vulnerabilities'].map((item) => (
                  <Badge key={item} variant="accent">{item}</Badge>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Notifications Panel */}
      <AnimatePresence>
        {notificationsOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-14 right-6 w-96 bg-[var(--color-gfs-elevated)] border border-[var(--color-gfs-border)] rounded-xl shadow-2xl z-50 overflow-hidden"
          >
            <div className="p-4 border-b border-[var(--color-gfs-border-light)] flex items-center justify-between">
              <span className="text-sm font-semibold">Notifications</span>
              <Badge variant="critical" pulse>{criticalAlerts.length} Critical</Badge>
            </div>
            <div className="max-h-80 overflow-y-auto">
              {alerts.slice(0, 5).map((alert) => (
                <div key={alert.id} className="p-3 border-b border-[var(--color-gfs-border-light)] hover:bg-[var(--color-gfs-hover)] transition-colors">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge variant={alert.severity}>{alert.severity.toUpperCase()}</Badge>
                    <span className="text-[10px] text-[var(--color-gfs-text-muted)] font-mono">{alert.id}</span>
                  </div>
                  <div className="text-xs text-[var(--color-gfs-text)]">{alert.type}</div>
                  <div className="text-[10px] text-[var(--color-gfs-text-muted)] mt-1">{alert.source}</div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
