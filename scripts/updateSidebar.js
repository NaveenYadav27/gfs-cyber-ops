const fs = require('fs');
const path = require('path');

const sidebarPath = path.join(__dirname, '../src/components/layout/Sidebar.tsx');
let sidebarContent = fs.readFileSync(sidebarPath, 'utf8');

const newNavItems = `
const NAV_ITEMS: NavItem[] = [
  // ITSM
  { id: 'itsm-dashboard', label: 'Dashboard', icon: LayoutDashboard, section: 'ITSM' },
  { id: 'itsm-incidents', label: 'Incidents', icon: AlertTriangle, section: 'ITSM' },
  { id: 'itsm-requests', label: 'Service Requests', icon: ClipboardList, section: 'ITSM' },
  { id: 'itsm-problems', label: 'Problems', icon: Bug, section: 'ITSM' },
  { id: 'itsm-change', label: 'Change Management', icon: Layers, section: 'ITSM' },
  { id: 'itsm-release', label: 'Release Management', icon: Package, section: 'ITSM' },
  { id: 'itsm-cmdb', label: 'CMDB', icon: Database, section: 'ITSM' },
  { id: 'itsm-assets', label: 'Asset Management', icon: Monitor, section: 'ITSM' },
  { id: 'itsm-kb', label: 'Knowledge Base', icon: BookOpen, section: 'ITSM' },
  { id: 'itsm-catalog', label: 'Service Catalog', icon: Briefcase, section: 'ITSM' },

  // NOC
  { id: 'noc-dashboard', label: 'Operations Dashboard', icon: Activity, section: 'NOC' },
  { id: 'noc-network', label: 'Network Monitoring', icon: Network, section: 'NOC' },
  { id: 'noc-servers', label: 'Server Monitoring', icon: Server, section: 'NOC' },
  { id: 'noc-cloud', label: 'Cloud Monitoring', icon: Cloud, section: 'NOC' },
  { id: 'noc-storage', label: 'Storage', icon: Database, section: 'NOC' },
  { id: 'noc-wan', label: 'WAN', icon: Globe, section: 'NOC' },

  // SOC
  { id: 'soc-dashboard', label: 'Dashboard', icon: Shield, section: 'SOC' },
  { id: 'soc-alerts', label: 'Alert Queue', icon: AlertTriangle, section: 'SOC' },
  { id: 'soc-investigations', label: 'Investigations', icon: Search, section: 'SOC' },
  { id: 'soc-cases', label: 'Cases', icon: Briefcase, section: 'SOC' },
  { id: 'soc-hunting', label: 'Threat Hunting', icon: Crosshair, section: 'SOC' },
  { id: 'soc-soar', label: 'SOAR', icon: Zap, section: 'SOC' },
  { id: 'soc-intel', label: 'Threat Intelligence', icon: Brain, section: 'SOC' },
  { id: 'soc-siem', label: 'SIEM', icon: Radar, section: 'SOC' },
  { id: 'soc-edr', label: 'EDR', icon: Scan, section: 'SOC' },

  // GRC
  { id: 'grc-dashboard', label: 'Dashboard', icon: Scale, section: 'GRC' },
  { id: 'grc-risk', label: 'Risk Register', icon: AlertTriangle, section: 'GRC' },
  { id: 'grc-compliance', label: 'Compliance', icon: ShieldCheck, section: 'GRC' },
  { id: 'grc-audit', label: 'Audit', icon: ClipboardList, section: 'GRC' },
  { id: 'grc-policies', label: 'Policies', icon: BookOpen, section: 'GRC' },
  { id: 'grc-frameworks', label: 'Frameworks', icon: Layers, section: 'GRC' },

  // OFFENSIVE SECURITY
  { id: 'off-dashboard', label: 'Dashboard', icon: Crosshair, section: 'OFFENSIVE SECURITY' },
  { id: 'off-engagements', label: 'Engagements', icon: Briefcase, section: 'OFFENSIVE SECURITY' },
  { id: 'off-recon', label: 'Reconnaissance', icon: Search, section: 'OFFENSIVE SECURITY' },
  { id: 'off-scanning', label: 'Scanning', icon: Scan, section: 'OFFENSIVE SECURITY' },

  // PURPLE TEAM
  { id: 'purple-dashboard', label: 'Dashboard', icon: Blend, section: 'PURPLE TEAM' },
  { id: 'purple-sim', label: 'Attack Simulation', icon: Play, section: 'PURPLE TEAM' },
  { id: 'purple-val', label: 'Detection Validation', icon: ShieldCheck, section: 'PURPLE TEAM' },
  { id: 'purple-coverage', label: 'ATT&CK Coverage', icon: Radar, section: 'PURPLE TEAM' },

  // EXECUTIVE OPERATIONS
  { id: 'exec-dashboard', label: 'Executive Dashboard', icon: LayoutDashboard, section: 'EXECUTIVE OPERATIONS' },
  { id: 'exec-health', label: 'Enterprise Health', icon: Activity, section: 'EXECUTIVE OPERATIONS' },
  { id: 'exec-risk', label: 'Risk Overview', icon: Scale, section: 'EXECUTIVE OPERATIONS' },
];
`;

sidebarContent = sidebarContent.replace(/const NAV_ITEMS: NavItem\[\] = \[[\s\S]*?\];/, newNavItems);

// Add missing icon imports
sidebarContent = sidebarContent.replace(/import {[\s\S]*?} from 'lucide-react';/, \`import {
  LayoutDashboard, Activity, Monitor, AlertTriangle, Search, FileText, Brain,
  Bug, Shield, Radar, Scan, Globe, Server, Cloud, Network, Building2, Users,
  KeyRound, ShieldCheck, Scale, BookOpen, ClipboardList, Layers, Crosshair,
  Target, Blend, Trophy, Zap, Award, Settings, ChevronLeft, LogOut, Clock,
  MessageSquare, Briefcase, MapPin, Newspaper, Package, User, Play, BarChart3,
  Database
} from 'lucide-react';\`);

fs.writeFileSync(sidebarPath, sidebarContent);
console.log('Sidebar updated');
