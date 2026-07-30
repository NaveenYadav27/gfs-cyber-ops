import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  LayoutDashboard, Bell, FileText, Search, Target, Zap, Radio, Database, Shield,
  Mail, Clock, BookOpen, Terminal, Settings, ChevronRight, Eye, AlertTriangle,
  Server, Globe, Cloud, Key, Bug, Wrench, BarChart3, Users,
} from 'lucide-react';
import { Badge } from '@/components/ui/Badge';

interface SOCSection {
  id: string;
  label: string;
  icon: React.ElementType;
  category: string;
}

const SOC_SECTIONS: SOCSection[] = [
  { id: 'soc-console', label: 'SOC Console', icon: LayoutDashboard, category: 'OPERATIONS' },
  { id: 'alert-queue', label: 'Alert Queue', icon: Bell, category: 'OPERATIONS' },
  { id: 'investigations', label: 'Investigations', icon: Search, category: 'OPERATIONS' },
  { id: 'cases', label: 'Cases', icon: FileText, category: 'OPERATIONS' },
  { id: 'shift', label: 'My Shift', icon: Clock, category: 'OPERATIONS' },
  { id: 'internal-mail', label: 'Internal Mail', icon: Mail, category: 'OPERATIONS' },
  { id: 'reports', label: 'Reports', icon: BarChart3, category: 'OPERATIONS' },
  { id: 'soar', label: 'SOAR Playbooks', icon: Zap, category: 'ANALYSIS' },
  { id: 'siem', label: 'SIEM Analytics', icon: Database, category: 'ANALYSIS' },
  { id: 'edr', label: 'EDR Console', icon: Shield, category: 'ANALYSIS' },
  { id: 'threat-intel', label: 'Threat Intelligence', icon: Globe, category: 'ANALYSIS' },
  { id: 'threat-hunting', label: 'Threat Hunting', icon: Target, category: 'ANALYSIS' },
  { id: 'detection-eng', label: 'Detection Engineering', icon: Radio, category: 'ANALYSIS' },
  { id: 'firewall-mgmt', label: 'Firewall Management', icon: Server, category: 'ANALYSIS' },
  { id: 'email-sec', label: 'Email Security', icon: Mail, category: 'ANALYSIS' },
  { id: 'ad-sec', label: 'AD Security', icon: Key, category: 'ANALYSIS' },
  { id: 'cloud-sec', label: 'Cloud Security', icon: Cloud, category: 'ANALYSIS' },
  { id: 'vuln-mgmt', label: 'Vulnerability Mgmt', icon: Bug, category: 'DEFENSE' },
  { id: 'asset-inv', label: 'Asset Inventory', icon: Server, category: 'DEFENSE' },
  { id: 'knowledge', label: 'Knowledge Base', icon: BookOpen, category: 'RESOURCES' },
  { id: 'runbooks', label: 'Runbooks', icon: FileText, category: 'RESOURCES' },
  { id: 'soc-labs', label: 'Labs', icon: Terminal, category: 'RESOURCES' },
  { id: 'training', label: 'Training', icon: BookOpen, category: 'RESOURCES' },
  { id: 'cheat-sheets', label: 'Cheat Sheets', icon: Wrench, category: 'RESOURCES' },
];

interface SOCWorkspaceProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
  children: React.ReactNode;
}

export function SOCWorkspace({ activeSection, onSectionChange, children }: SOCWorkspaceProps) {
  const [collapsed, setCollapsed] = useState(false);
  const categories = [...new Set(SOC_SECTIONS.map((s) => s.category))];

  return (
    <div className="flex gap-4 -m-4 min-h-[calc(100vh-140px)]">
      <motion.div animate={{ width: collapsed ? 48 : 200 }} className="flex-shrink-0 bg-[var(--color-gfs-deep)] border border-[var(--color-gfs-border-light)] rounded-xl overflow-hidden">
        <div className="px-3 py-2.5 border-b border-[var(--color-gfs-border-light)] flex items-center justify-between">
          {!collapsed && <span className="text-[11px] font-display font-bold text-[var(--color-gfs-text)]">SOC Workspace</span>}
          <button onClick={() => setCollapsed(!collapsed)} className="w-5 h-5 rounded flex items-center justify-center text-[var(--color-gfs-text-muted)] hover:text-[var(--color-gfs-text)]">
            <ChevronRight className={`w-3 h-3 transition-transform ${collapsed ? '' : 'rotate-180'}`} />
          </button>
        </div>
        <nav className="overflow-y-auto py-1" style={{ maxHeight: 'calc(100vh - 200px)' }}>
          {categories.map((cat) => (
            <div key={cat}>
              {!collapsed && <div className="px-2.5 py-1.5 gfs-text-label text-[8px]">{cat}</div>}
              {SOC_SECTIONS.filter((s) => s.category === cat).map((section) => {
                const Icon = section.icon;
                const active = activeSection === section.id;
                return (
                  <button key={section.id} onClick={() => onSectionChange(section.id)}
                    className={`w-full flex items-center gap-2 px-2.5 py-1.5 text-[11px] transition-colors ${
                      active ? 'bg-[var(--color-gfs-accent-dim)] text-[var(--color-gfs-accent)]' : 'text-[var(--color-gfs-text-secondary)] hover:text-[var(--color-gfs-text)] hover:bg-[var(--color-gfs-hover)]'
                    } ${collapsed ? 'justify-center px-0' : ''}`}>
                    <Icon className="w-3.5 h-3.5 flex-shrink-0" />
                    {!collapsed && <span className="truncate">{section.label}</span>}
                  </button>
                );
              })}
            </div>
          ))}
        </nav>
      </motion.div>
      <div className="flex-1 min-w-0">{children}</div>
    </div>
  );
}
