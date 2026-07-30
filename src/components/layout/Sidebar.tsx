import { motion, AnimatePresence } from 'framer-motion';
import clsx from 'clsx';
import {
  LayoutDashboard, Activity, Monitor, AlertTriangle, Search, FileText, Brain,
  Bug, Shield, Radar, Scan, Globe, Server, Cloud, Network, Building2, Users,
  KeyRound, ShieldCheck, Scale, BookOpen, ClipboardList, Layers, Crosshair,
  Target, Blend, Trophy, Zap, Award, Settings, ChevronLeft, LogOut, Clock,
  MessageSquare, Briefcase, MapPin, Newspaper, Package, User, Play, BarChart3,
  ShieldAlert, BugPlay, NetworkIcon, ShieldAlertIcon,
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
  // OVERVIEW
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, section: 'OVERVIEW' },
  { id: 'schedule', label: 'My Schedule', icon: Clock, section: 'OVERVIEW' },
  { id: 'news', label: 'Enterprise News', icon: Newspaper, section: 'OVERVIEW' },
  { id: 'activity', label: 'Activity Feed', icon: Activity, section: 'OVERVIEW' },

  // SOC WORKSPACE
  { id: 'soc', label: 'SOC Console', icon: Monitor, section: 'SOC WORKSPACE' },
  { id: 'incidents', label: 'Incidents', icon: AlertTriangle, section: 'SOC WORKSPACE' },
  { id: 'playbooks', label: 'SOAR Playbooks', icon: Zap, section: 'SOC WORKSPACE' },
  { id: 'messaging', label: 'Internal Mail', icon: MessageSquare, section: 'SOC WORKSPACE' },

  // SECURITY
  { id: 'threat-intel', label: 'Threat Intelligence', icon: Brain, section: 'SECURITY' },
  { id: 'vulnerabilities', label: 'Vulnerabilities', icon: Bug, section: 'SECURITY' },
  { id: 'siem', label: 'SIEM Analytics', icon: Radar, section: 'SECURITY' },
  { id: 'edr', label: 'EDR Console', icon: Scan, section: 'SECURITY' },
  { id: 'firewall', label: 'Firewall Mgmt', icon: Shield, section: 'SECURITY' },

  // INFRASTRUCTURE
  { id: 'enterprise-map', label: 'Infrastructure', icon: Globe, section: 'INFRASTRUCTURE' },
  { id: 'ad', label: 'Active Directory', icon: Building2, section: 'INFRASTRUCTURE' },
  { id: 'cloud', label: 'Cloud (Azure / AWS)', icon: Cloud, section: 'INFRASTRUCTURE' },
  { id: 'network', label: 'Network', icon: Network, section: 'INFRASTRUCTURE' },

  // IDENTITY & ACCESS
  { id: 'users', label: 'Employee Directory', icon: Users, section: 'IDENTITY' },
  { id: 'access', label: 'Access Requests', icon: KeyRound, section: 'IDENTITY' },
  { id: 'pam', label: 'Privileged Access', icon: ShieldCheck, section: 'IDENTITY' },

  // COMPLIANCE
  { id: 'risk', label: 'Risk Register', icon: Scale, section: 'COMPLIANCE' },
  { id: 'audit', label: 'Audit Log', icon: ClipboardList, section: 'COMPLIANCE' },
  { id: 'frameworks', label: 'Frameworks', icon: ShieldCheck, section: 'COMPLIANCE' },

  // OFFENSIVE
  { id: 'ethical-hacking', label: 'Ethical Hacking', icon: Crosshair, section: 'OFFENSIVE' },
  { id: 'vapt', label: 'VAPT', icon: Target, section: 'OFFENSIVE' },
  { id: 'purple-team', label: 'Purple Team', icon: Blend, section: 'OFFENSIVE' },

  // ENTERPRISE
  { id: 'business-units', label: 'Business Units', icon: Briefcase, section: 'GFS ENTERPRISE' },
  { id: 'departments', label: 'Departments', icon: Layers, section: 'GFS ENTERPRISE' },
  { id: 'office-tour', label: 'Office Tour', icon: MapPin, section: 'GFS ENTERPRISE' },
  { id: 'policies', label: 'Policies & Culture', icon: BookOpen, section: 'GFS ENTERPRISE' },

  // MY CAREER
  { id: 'missions', label: 'Missions', icon: Play, section: 'MY CAREER' },
  { id: 'modules', label: 'Training', icon: BookOpen, section: 'MY CAREER' },
  { id: 'career', label: 'Career Center', icon: Trophy, section: 'MY CAREER' },
  { id: 'skills', label: 'Skills Matrix', icon: Zap, section: 'MY CAREER' },
  { id: 'notebook', label: 'Notebook', icon: FileText, section: 'MY CAREER' },
  { id: 'analytics', label: 'Analytics', icon: BarChart3, section: 'MY CAREER' },
  { id: 'profile', label: 'My Profile', icon: User, section: 'MY CAREER' },
  { id: 'equipment', label: 'My Equipment', icon: Package, section: 'MY CAREER' },

  // SYSTEM
  { id: 'settings', label: 'Settings', icon: Settings, section: 'SYSTEM' },
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
