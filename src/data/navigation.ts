import {
  LayoutDashboard, Building2, Users, Layers, Shield, Eye, Brain, Cloud, Key,
  Monitor, Database, Scale, FileText, BookOpen, Trophy, Settings, ChevronDown,
  Globe, Server, Zap, Radar, Crosshair, Target, Blend, ShieldAlert, Building,
  MapPin, Briefcase,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export interface NavChild {
  id: string;
  label: string;
  page: string;
  description: string;
}

export interface NavGroup {
  id: string;
  label: string;
  icon: LucideIcon;
  children: NavChild[];
}

export const topNavigation: NavGroup[] = [
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
