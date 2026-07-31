// src/components/layout/TopNavigation.tsx
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard, Building2, Users, Layers, Shield, Eye, Brain, Cloud, Key,
  Monitor, Database, Scale, FileText, BookOpen, Trophy, Settings, ChevronDown,
  Globe, Server, Zap, Radar, Crosshair, Target, Blend, ShieldAlert, Building,
  MapPin, Briefcase, Activity
} from 'lucide-react';
import { useEnterprise } from '@/store/useEnterprise';
import { useStore } from '@/store/useStore';

interface NavGroup {
  id: string;
  label: string;
  icon: React.ElementType;
  children: { id: string; label: string; page: string; description: string }[];
}


const NAV_GROUPS: NavGroup[] = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, children: [
    { id: 'dash', label: 'Enterprise Dashboard', page: 'dashboard', description: 'Live enterprise overview' },
  ]},
  { id: 'enterprise', label: 'Enterprise', icon: Building2, children: [
    { id: 'business-units-nav', label: 'Business Units', page: 'business-units', description: 'All business divisions' },
    { id: 'org', label: 'Organization', page: 'org-chart', description: 'Executive Leadership' },
  ]},
  { id: 'enterprise-ops', label: 'Enterprise Operations', icon: Activity, children: [
    { id: 'itsm-nav', label: 'ITSM', page: 'itsm-dashboard', description: 'Service Management' },
    { id: 'noc-nav', label: 'NOC', page: 'noc-dashboard', description: 'Network Operations' },
    { id: 'soc-nav', label: 'SOC', page: 'soc-dashboard', description: 'Cyber Defense' },
    { id: 'grc-nav', label: 'GRC', page: 'grc-dashboard', description: 'Risk & Compliance' },
    { id: 'purple-nav', label: 'Purple Team', page: 'purple-dashboard', description: 'Simulation' },
    { id: 'off-nav', label: 'Offensive Security', page: 'off-dashboard', description: 'Red Team' },
    { id: 'exec-nav', label: 'Executive Operations', page: 'exec-dashboard', description: 'Strategy' },
  ]},
  { id: 'infra', label: 'Infrastructure', icon: Server, children: [
    { id: 'noc-servers', label: 'Servers', page: 'noc-servers', description: 'Compute instances' },
    { id: 'noc-network', label: 'Network', page: 'noc-network', description: 'Network topology' },
  ]},
  { id: 'cloud', label: 'Cloud', icon: Cloud, children: [
    { id: 'noc-cloud', label: 'Cloud', page: 'noc-cloud', description: 'Azure & AWS' },
  ]},
  { id: 'career-nav', label: 'Career Journey', icon: Trophy, children: [
    { id: 'career-center', label: 'Career Center', page: 'career', description: 'Career progression' },
  ]},
];


export function TopNavigation() {
  const [activeGroup, setActiveGroup] = useState<string | null>(null);
  const { setPage } = useEnterprise();
  const { setCurrentPage } = useStore();

  const handleNav = (page: string) => {
    setCurrentPage(page);
    setActiveGroup(null);
  };

  return (
    <div className="relative">
      {/* Nav bar */}
      <div className="h-9 border-b border-[var(--color-gfs-border-light)] bg-[var(--color-gfs-deep)] flex items-center px-2 overflow-visible">
        {NAV_GROUPS.map((group) => (
          <div key={group.id} className="relative"
            onMouseEnter={() => setActiveGroup(group.id)}
            onMouseLeave={() => setActiveGroup(null)}>
            <button className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-[11px] font-medium transition-colors whitespace-nowrap ${
              activeGroup === group.id
                ? 'text-[var(--color-gfs-accent)] bg-[var(--color-gfs-accent-dim)]'
                : 'text-[var(--color-gfs-text-secondary)] hover:text-[var(--color-gfs-text)] hover:bg-[var(--color-gfs-hover)]'
            }`}>
              <group.icon className="w-3.5 h-3.5" />
              {group.label}
              <ChevronDown className={`w-3 h-3 transition-transform ${activeGroup === group.id ? 'rotate-180' : ''}`} />
            </button>

            {/* Dropdown */}
            <AnimatePresence>
              {activeGroup === group.id && (
                <motion.div initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }} transition={{ duration: 0.12 }}
                  className="absolute left-0 top-full mt-0.5 w-64 bg-[var(--color-gfs-deep)] border border-[var(--color-gfs-border)] rounded-lg shadow-xl z-[var(--z-dropdown)] py-1">
                  {group.children.map((child) => (
                    <button key={child.id} onClick={() => handleNav(child.page)}
                      className="w-full px-3 py-2 text-left hover:bg-[var(--color-gfs-hover)] transition-colors flex flex-col gap-0.5">
                      <span className="text-[11px] text-[var(--color-gfs-text)]">{child.label}</span>
                      <span className="text-[9px] text-[var(--color-gfs-text-muted)]">{child.description}</span>
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
}
