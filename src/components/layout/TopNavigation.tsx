// src/components/layout/TopNavigation.tsx
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard, Building2, Users, Layers, Shield, Eye, Brain, Cloud, Key,
  Monitor, Database, Scale, FileText, BookOpen, Trophy, Settings, ChevronDown,
  Globe, Server, Zap, Radar, Crosshair, Target, Blend, ShieldAlert, Building,
  MapPin, Briefcase,
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
    { id: 'sched', label: 'My Schedule', page: 'schedule', description: 'Daily schedule and meetings' },
    { id: 'news-nav', label: 'Enterprise News', page: 'news', description: 'Company announcements' },
    { id: 'feed', label: 'Activity Feed', page: 'activity', description: 'Live enterprise activity' },
  ]},
  { id: 'inside-gfs', label: 'Inside GFS', icon: Building2, children: [
    { id: 'about', label: 'About GFS', page: 'about-gfs', description: 'Company overview' },
    { id: 'business-units-nav', label: 'Business Units', page: 'business-units', description: 'All business divisions' },
    { id: 'hq', label: 'Corporate HQ', page: 'office-tour', description: 'Amaravati campus' },
    { id: 'culture', label: 'Culture & Policies', page: 'policies', description: 'Values and policies' },
    { id: 'timeline', label: 'Enterprise Timeline', page: 'enterprise-timeline', description: 'Key milestones' },
    { id: 'strategy', label: 'Business Strategy', page: 'business-processes', description: 'Strategic initiatives' },
  ]},
  { id: 'org', label: 'Organization', icon: Users, children: [
    { id: 'leadership', label: 'Executive Leadership', page: 'org-chart', description: 'Board and executives' },
    { id: 'departments-nav', label: 'Departments', page: 'departments', description: 'All departments' },
    { id: 'employees-nav', label: 'Employee Directory', page: 'users', description: '48,000+ employees' },
    { id: 'locations', label: 'Global Locations', page: 'office-tour', description: 'Offices worldwide' },
  ]},
  { id: 'infra', label: 'Infrastructure', icon: Server, children: [
    { id: 'overview-nav', label: 'Infrastructure Overview', page: 'enterprise-map', description: 'All systems' },
    { id: 'servers-nav', label: 'Servers', page: 'servers', description: 'Production servers' },
    { id: 'network-nav', label: 'Network', page: 'network', description: 'Network infrastructure' },
    { id: 'cloud-nav', label: 'Cloud (Azure)', page: 'cloud', description: 'Azure resources' },
    { id: 'ad-nav', label: 'Active Directory', page: 'ad', description: 'Identity store' },
    { id: 'apps-nav', label: 'Applications', page: 'enterprise-map', description: 'Application portfolio' },
  ]},
  { id: 'cyber', label: 'Cyber Defense', icon: Shield, children: [
    { id: 'soc-nav', label: 'SOC Console', page: 'soc', description: 'Security operations' },
    { id: 'incidents-nav', label: 'Incidents', page: 'incidents', description: 'Incident management' },
    { id: 'playbooks-nav', label: 'SOAR Playbooks', page: 'playbooks', description: 'Automated response' },
    { id: 'ti-nav', label: 'Threat Intelligence', page: 'threat-intel', description: 'Threat landscape' },
    { id: 'vulns-nav', label: 'Vulnerabilities', page: 'vulnerabilities', description: 'CVE management' },
    { id: 'siem-nav', label: 'SIEM Analytics', page: 'siem', description: 'Sentinel & KQL' },
    { id: 'edr-nav', label: 'EDR Console', page: 'edr', description: 'CrowdStrike Falcon' },
    { id: 'fw-nav', label: 'Firewall Mgmt', page: 'firewall', description: 'Palo Alto Panorama' },
  ]},
  { id: 'identity-nav', label: 'Identity', icon: Key, children: [
    { id: 'iam-nav', label: 'Access Management', page: 'access', description: 'Access requests & RBAC' },
    { id: 'pam-nav', label: 'Privileged Access', page: 'pam', description: 'CyberArk vault' },
    { id: 'ad-id-nav', label: 'Active Directory', page: 'ad', description: 'Domain management' },
  ]},
  { id: 'risk-nav', label: 'Risk & Compliance', icon: Scale, children: [
    { id: 'risk-nav2', label: 'Risk Register', page: 'risk', description: 'Enterprise risk' },
    { id: 'audit-nav', label: 'Audit Log', page: 'audit', description: 'Audit trail' },
    { id: 'frameworks-nav', label: 'Frameworks', page: 'frameworks', description: 'RBI, PCI, ISO' },
    { id: 'policies-nav', label: 'Policies', page: 'policies', description: 'Security policies' },
  ]},
  { id: 'offensive', label: 'Offensive Security', icon: Crosshair, children: [
    { id: 'eth-nav', label: 'Ethical Hacking', page: 'ethical-hacking', description: 'Red team ops' },
    { id: 'vapt-nav', label: 'VAPT', page: 'vapt', description: 'Vulnerability assessment' },
    { id: 'purple-nav', label: 'Purple Team', page: 'purple-team', description: 'Detection validation' },
  ]},
  { id: 'career-nav', label: 'Career Journey', icon: Trophy, children: [
    { id: 'missions-nav', label: 'Missions', page: 'missions', description: 'Learning missions' },
    { id: 'career-center', label: 'Career Center', page: 'career', description: 'Career progression' },
    { id: 'skills-nav', label: 'Skills Matrix', page: 'skills', description: 'Competency tracking' },
    { id: 'notebook-nav', label: 'Notebook', page: 'notebook', description: 'Investigation notebook' },
    { id: 'analytics-nav', label: 'Analytics', page: 'analytics', description: 'Learning analytics' },
  ]},
  { id: 'settings-nav', label: 'Settings', icon: Settings, children: [
    { id: 'profile-nav', label: 'My Profile', page: 'profile', description: 'Personal settings' },
    { id: 'equip-nav', label: 'My Equipment', page: 'equipment', description: 'Assigned devices' },
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
      <div className="h-9 border-b border-[var(--color-gfs-border-light)] bg-[var(--color-gfs-deep)] flex items-center px-2 overflow-x-auto">
        {NAV_GROUPS.map((group) => (
          <div key={group.id} className="relative"
            onMouseEnter={() => setActiveGroup(group.id)}
            onMouseLeave={() => setActiveGroup(null)}>
            <button className={`flex items-center gap-[8px] px-[12px] h-[36px] rounded-md text-[13px] font-medium transition-colors whitespace-nowrap ${
              activeGroup === group.id
                ? 'text-[var(--color-gfs-accent)] bg-[var(--color-gfs-accent-dim)]'
                : 'text-[var(--color-gfs-text-secondary)] hover:text-[var(--color-gfs-text)] hover:bg-[var(--color-gfs-hover)]'
            }`}>
              <group.icon className="w-[18px] h-[18px]" />
              {group.label}
              <ChevronDown className={`w-[14px] h-[14px] transition-transform ${activeGroup === group.id ? 'rotate-180' : ''}`} />
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
