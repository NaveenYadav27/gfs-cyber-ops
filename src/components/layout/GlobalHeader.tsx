import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Shield, AlertTriangle, Clock, Radio, Search, Settings, ChevronDown, LogOut, User,
  Zap, Wifi, Sun, Moon, MapPin,
} from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { EnterpriseSearch } from '@/components/ui/EnterpriseSearch';
import { NotificationCenter } from '@/components/ui/NotificationCenter';
import { useStore } from '@/store/useStore';
import { useLearningEngine } from '@/store/useLearningEngine';

export function GlobalHeader() {
  const { user, logout, theme, setTheme } = useStore();
  const { totalXP, level, currentMissionId } = useLearningEngine();
  const [showProfile, setShowProfile] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update clock every minute
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  return (
    <header className="h-12 border-b border-[var(--color-gfs-border-light)] bg-[var(--color-gfs-deep)] flex items-center px-4 gap-3 flex-shrink-0 z-[var(--z-sticky)]">
      {/* Brand */}
      <div className="flex items-center gap-2 flex-shrink-0">
        <div className="w-7 h-7 rounded-md bg-gradient-to-br from-[var(--color-gfs-accent)] to-[var(--color-gfs-blue)] flex items-center justify-center">
          <span className="text-[8px] font-display font-extrabold text-[var(--color-gfs-base)]">GFS</span>
        </div>
        <div className="hidden lg:block">
          <span className="text-[10px] font-display font-bold tracking-wider text-[var(--color-gfs-text)]">GFS CYBEROPS</span>
        </div>
      </div>

      {/* Threat Level */}
      <div className="hidden xl:flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[var(--color-gfs-amber-dim)] border border-[var(--color-gfs-amber)]/20">
        <AlertTriangle className="w-3 h-3 text-[var(--color-gfs-amber)]" />
        <span className="text-[10px] font-semibold text-[var(--color-gfs-amber)]">ELEVATED</span>
      </div>

      {/* Mission Status */}
      {currentMissionId && (
        <div className="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[var(--color-gfs-accent-dim)] border border-[var(--color-gfs-accent)]/20">
          <Zap className="w-3 h-3 text-[var(--color-gfs-accent)]" />
          <span className="text-[10px] text-[var(--color-gfs-accent)]">Mission Active</span>
        </div>
      )}

      {/* HQ Badge */}
      <div className="hidden xl:flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[var(--color-gfs-blue-dim)] border border-[var(--color-gfs-blue)]/20">
        <MapPin className="w-3 h-3 text-[var(--color-gfs-blue)]" />
        <span className="text-[10px] font-semibold text-[var(--color-gfs-blue)]">HQ: VIJAYAWADA, AMARAVATI</span>
      </div>

      {/* Search */}
      <div className="flex-1 max-w-md mx-auto">
        <EnterpriseSearch />
      </div>

      {/* System Health */}
      <div className="hidden lg:flex items-center gap-1.5 px-2 py-1 rounded-md bg-[var(--color-gfs-green-dim)]">
        <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-gfs-green)] animate-gfs-pulse-dot" />
        <span className="text-[9px] text-[var(--color-gfs-green)] font-mono">ALL SYSTEMS NOMINAL</span>
      </div>

      {/* Shift Info */}
      <div className="hidden xl:flex items-center gap-1.5 text-[10px] text-[var(--color-gfs-text-muted)]">
        <Radio className="w-3 h-3 text-[var(--color-gfs-green)]" />
        <span>Morning Shift</span>
      </div>

      {/* Enterprise Time */}
      <div className="hidden md:flex items-center gap-1.5 text-[10px] text-[var(--color-gfs-text-muted)] font-mono">
        <Clock className="w-3 h-3" />
        <span>{currentTime.toLocaleString('en-IN', { timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit', hour12: false })} IST</span>
      </div>

      {/* XP */}
      <div className="hidden lg:flex items-center gap-1.5 px-2 py-1 rounded-md bg-[var(--color-gfs-surface)]">
        <span className="text-[10px] text-[var(--color-gfs-accent)] font-semibold">Lv.{level}</span>
        <span className="text-[10px] text-[var(--color-gfs-text-muted)] font-mono">{totalXP} XP</span>
      </div>

      {/* Theme Toggle */}
      <button
        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        className="w-7 h-7 rounded-lg flex items-center justify-center text-[var(--color-gfs-text-muted)] hover:text-[var(--color-gfs-text)] hover:bg-[var(--color-gfs-hover)] transition-colors"
      >
        {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
      </button>

      {/* Notifications */}
      <NotificationCenter />

      {/* Profile */}
      <div className="relative">
        <button onClick={() => setShowProfile(!showProfile)}
          className="flex items-center gap-2 px-2 py-1 rounded-lg hover:bg-[var(--color-gfs-hover)] transition-colors">
          <div className="w-7 h-7 rounded-full bg-[var(--color-gfs-accent-dim)] flex items-center justify-center">
            <User className="w-3.5 h-3.5 text-[var(--color-gfs-accent)]" />
          </div>
          <div className="hidden lg:block text-left">
            <div className="text-[10px] font-semibold text-[var(--color-gfs-text)] leading-tight">{user?.name || 'Security Intern'}</div>
            <div className="text-[9px] text-[var(--color-gfs-text-muted)] leading-tight">{user?.department || 'SOC'}</div>
          </div>
          <ChevronDown className="w-3 h-3 text-[var(--color-gfs-text-muted)]" />
        </button>

        {showProfile && (
          <motion.div initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }}
            className="absolute right-0 top-full mt-1 w-56 bg-[var(--color-gfs-deep)] border border-[var(--color-gfs-border)] rounded-xl shadow-xl z-[var(--z-dropdown)] py-1">
            <div className="px-3 py-2 border-b border-[var(--color-gfs-border-light)]">
              <div className="text-[11px] font-semibold text-[var(--color-gfs-text)]">{user?.name || 'Security Intern'}</div>
              <div className="text-[10px] text-[var(--color-gfs-text-muted)]">{user?.email || 'intern@gfs.com'}</div>
            </div>
            <button className="w-full flex items-center gap-2 px-3 py-2 text-[11px] text-[var(--color-gfs-text-secondary)] hover:bg-[var(--color-gfs-hover)] transition-colors">
              <Settings className="w-3.5 h-3.5" /> Settings
            </button>
            <button onClick={logout} className="w-full flex items-center gap-2 px-3 py-2 text-[11px] text-[var(--color-gfs-red)] hover:bg-[var(--color-gfs-red-dim)] transition-colors">
              <LogOut className="w-3.5 h-3.5" /> Sign Out
            </button>
          </motion.div>
        )}
      </div>
    </header>
  );
}
