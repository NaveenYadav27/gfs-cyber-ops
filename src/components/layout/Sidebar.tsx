import { motion, AnimatePresence } from 'framer-motion';
import clsx from 'clsx';
import {
  LayoutDashboard, Activity, Monitor, AlertTriangle, Search, FileText, Brain,
  Bug, Shield, Radar, Scan, Globe, Server, Cloud, Network, Building2, Users,
  KeyRound, ShieldCheck, Scale, BookOpen, ClipboardList, Layers, Crosshair,
  Target, Blend, Trophy, Zap, Award, Settings, ChevronLeft, LogOut, Clock,
  MessageSquare, Briefcase, MapPin, Newspaper, Package, User, Play, BarChart3,
  ShieldAlert, BugPlay, NetworkIcon, ShieldAlertIcon, Database
} from 'lucide-react';
import { useStore } from '@/store/useStore';
import { useLearningEngine } from '@/store/useLearningEngine';
import type { LucideIcon } from 'lucide-react';

interface NavItem {
  id: string;
  label: string;
  icon: LucideIcon;
  section: string;
}

const NAV_ITEMS: NavItem[] = [
  // ITSM
  { id: 'itsm-dashboard', label: 'Dashboard', icon: LayoutDashboard, section: 'ITSM' },
  { id: 'itsm-incidents', label: 'Incidents', icon: AlertTriangle, section: 'ITSM' },
  { id: 'itsm-requests', label: 'Service Requests', icon: ClipboardList, section: 'ITSM' },
  { id: 'itsm-problems', label: 'Problems', icon: Bug, section: 'ITSM' },
  { id: 'itsm-change', label: 'Change Management', icon: Layers, section: 'ITSM' },
  { id: 'itsm-cmdb', label: 'CMDB', icon: Database, section: 'ITSM' },

  // NOC
  { id: 'noc-dashboard', label: 'Operations Dashboard', icon: Activity, section: 'NOC' },
  { id: 'noc-network', label: 'Network Monitoring', icon: Network, section: 'NOC' },
  { id: 'noc-servers', label: 'Server Monitoring', icon: Server, section: 'NOC' },
  { id: 'noc-cloud', label: 'Cloud Monitoring', icon: Cloud, section: 'NOC' },

  // SOC
  { id: 'soc-dashboard', label: 'Dashboard', icon: Shield, section: 'SOC' },
  { id: 'soc-alerts', label: 'Alert Queue', icon: AlertTriangle, section: 'SOC' },
  { id: 'soc-cases', label: 'Cases', icon: Briefcase, section: 'SOC' },
  { id: 'soc-hunting', label: 'Threat Hunting', icon: Crosshair, section: 'SOC' },
  { id: 'soc-siem', label: 'SIEM', icon: Radar, section: 'SOC' },

  // GRC
  { id: 'grc-dashboard', label: 'Dashboard', icon: Scale, section: 'GRC' },
  { id: 'grc-risk', label: 'Risk Register', icon: AlertTriangle, section: 'GRC' },
  { id: 'grc-compliance', label: 'Compliance', icon: ShieldCheck, section: 'GRC' },
  { id: 'grc-audit', label: 'Audit', icon: ClipboardList, section: 'GRC' },

  // OFFENSIVE SECURITY
  { id: 'off-dashboard', label: 'Dashboard', icon: Crosshair, section: 'OFFENSIVE SECURITY' },
  { id: 'off-engagements', label: 'Engagements', icon: Briefcase, section: 'OFFENSIVE SECURITY' },

  // PURPLE TEAM
  { id: 'purple-dashboard', label: 'Dashboard', icon: Blend, section: 'PURPLE TEAM' },
  { id: 'purple-sim', label: 'Attack Simulation', icon: Play, section: 'PURPLE TEAM' },

  // EXECUTIVE OPERATIONS
  { id: 'exec-dashboard', label: 'Executive Dashboard', icon: LayoutDashboard, section: 'EXECUTIVE OPERATIONS' },
  { id: 'exec-risk', label: 'Risk Overview', icon: Scale, section: 'EXECUTIVE OPERATIONS' },
];

export function Sidebar() {
  const { sidebarCollapsed, toggleSidebar, currentPage, setCurrentPage, logout } = useStore();
  const { currentMissionId, setCurrentMission, totalXP, level } = useLearningEngine();

  const sections = [...new Set(NAV_ITEMS.map((i) => i.section))];

  return (
    <motion.aside
      animate={{ width: sidebarCollapsed ? 56 : 240 }}
      transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
      className="fixed left-0 top-12 h-[calc(100vh-48px)] bg-[var(--color-gfs-deep)] border-r border-[var(--color-gfs-border-light)] flex flex-col z-[var(--z-sticky)] overflow-hidden"
    >
      {/* Collapse toggle */}
      <div className="h-8 flex items-center justify-end px-2 border-b border-[var(--color-gfs-border-light)] flex-shrink-0">
        <button onClick={toggleSidebar}
          className="w-6 h-6 rounded flex items-center justify-center text-[var(--color-gfs-text-muted)] hover:text-[var(--color-gfs-text)] hover:bg-[var(--color-gfs-hover)] transition-colors">
          <ChevronLeft className={`w-3.5 h-3.5 transition-transform ${sidebarCollapsed ? 'rotate-180' : ''}`} />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-1 px-1.5">
        {sections.map((section) => (
          <div key={section} className="mb-0.5">
            {!sidebarCollapsed && (
              <div className="px-2.5 py-1.5 gfs-text-label text-[9px]">{section}</div>
            )}
            {NAV_ITEMS.filter((i) => i.section === section).map((item) => {
              const Icon = item.icon;
              const active = currentPage === item.id || (currentMissionId && item.id === 'missions');
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    if (currentMissionId && item.id !== 'missions') setCurrentMission(null);
                    setCurrentPage(item.id);
                  }}
                  className={clsx(
                    'w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-md text-[11px] transition-all duration-100 group relative',
                    active
                      ? 'bg-[var(--color-gfs-accent-dim)] text-[var(--color-gfs-accent)]'
                      : 'text-[var(--color-gfs-text-secondary)] hover:text-[var(--color-gfs-text)] hover:bg-[var(--color-gfs-hover)]',
                    sidebarCollapsed && 'justify-center px-0'
                  )}
                  title={sidebarCollapsed ? item.label : undefined}
                >
                  {active && (
                    <motion.div layoutId="sidebar-active"
                      className="absolute left-0 top-1/2 -translate-y-1/2 w-[2px] h-4 rounded-r-full bg-[var(--color-gfs-accent)]"
                      transition={{ type: 'spring', stiffness: 500, damping: 35 }} />
                  )}
                  <Icon className="w-4 h-4 flex-shrink-0" />
                  {!sidebarCollapsed && <span className="truncate">{item.label}</span>}
                </button>
              );
            })}
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className="border-t border-[var(--color-gfs-border-light)] p-2 flex-shrink-0">
        <button onClick={logout}
          className={clsx(
            'w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-md text-[11px] text-[var(--color-gfs-text-muted)] hover:text-[var(--color-gfs-red)] hover:bg-[var(--color-gfs-red-dim)] transition-colors',
            sidebarCollapsed && 'justify-center px-0'
          )}>
          <LogOut className="w-4 h-4" />
          {!sidebarCollapsed && <span>Sign Out</span>}
        </button>
        {!sidebarCollapsed && (
          <div className="px-2.5 pt-1.5">
            <div className="text-[9px] text-[var(--color-gfs-text-muted)] font-mono">v2.5.0 • Hyderabad SOC</div>
          </div>
        )}
      </div>
    </motion.aside>
  );
}
