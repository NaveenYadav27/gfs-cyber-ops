import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Crosshair, LayoutDashboard, Target, Radio, Globe, Terminal, Eye, Wifi, Server,
  Key, Bug, Search, FileText, BookOpen, Wrench, Zap, Shield, ChevronDown, ChevronRight,
  Database, Lock, AlertTriangle, CheckCircle2, Play, Settings,
} from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { PageHeader } from '@/components/layout/PageHeader';

interface WorkspaceSection {
  id: string;
  label: string;
  icon: React.ElementType;
  category?: string;
}

const WORKSPACE_SECTIONS: WorkspaceSection[] = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, category: 'OVERVIEW' },
  { id: 'engagements', label: 'Engagements', icon: Target, category: 'OVERVIEW' },
  { id: 'recon', label: 'Reconnaissance', icon: Globe, category: 'PHASE 1 — RECON' },
  { id: 'scanning', label: 'Network Scanning', icon: Radio, category: 'PHASE 1 — RECON' },
  { id: 'enum', label: 'Enumeration', icon: Database, category: 'PHASE 2 — ENUM' },
  { id: 'vuln-assess', label: 'Vulnerability Assessment', icon: Bug, category: 'PHASE 2 — ENUM' },
  { id: 'webapp', label: 'Web App Testing', icon: Globe, category: 'PHASE 3 — EXPLOIT' },
  { id: 'api-sec', label: 'API Security', icon: Server, category: 'PHASE 3 — EXPLOIT' },
  { id: 'wireless', label: 'Wireless Security', icon: Wifi, category: 'PHASE 3 — EXPLOIT' },
  { id: 'ad-assess', label: 'AD Assessment', icon: Lock, category: 'PHASE 3 — EXPLOIT' },
  { id: 'password-sec', label: 'Password Security', icon: Key, category: 'PHASE 3 — EXPLOIT' },
  { id: 'exploitation', label: 'Exploitation', icon: Zap, category: 'PHASE 4 — EXPLOIT' },
  { id: 'post-exploit', label: 'Post Exploitation', icon: Shield, category: 'PHASE 4 — EXPLOIT' },
  { id: 'reporting', label: 'Reporting', icon: FileText, category: 'PHASE 5 — REPORT' },
  { id: 'tools', label: 'Tool Repository', icon: Wrench, category: 'RESOURCES' },
  { id: 'labs', label: 'Labs', icon: Target, category: 'RESOURCES' },
  { id: 'terminal', label: 'Interactive Terminal', icon: Terminal, category: 'RESOURCES' },
  { id: 'cheat-sheets', label: 'Cheat Sheets', icon: BookOpen, category: 'RESOURCES' },
  { id: 'playbooks', label: 'Playbooks', icon: Settings, category: 'RESOURCES' },
  { id: 'attack-chains', label: 'Attack Chains', icon: Zap, category: 'RESOURCES' },
  { id: 'evidence', label: 'Evidence', icon: Eye, category: 'RESOURCES' },
  { id: 'knowledge', label: 'Knowledge Base', icon: BookOpen, category: 'RESOURCES' },
];

interface EthicalHackingWorkspaceProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
  children: React.ReactNode;
}

export function EthicalHackingWorkspace({ activeSection, onSectionChange, children }: EthicalHackingWorkspaceProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const categories = [...new Set(WORKSPACE_SECTIONS.map((s) => s.category))];

  return (
    <div className="flex gap-4 -m-4 min-h-[calc(100vh-140px)]">
      {/* Workspace Sidebar */}
      <motion.div animate={{ width: sidebarCollapsed ? 48 : 220 }}
        className="flex-shrink-0 bg-[var(--color-gfs-deep)] border border-[var(--color-gfs-border-light)] rounded-xl overflow-hidden">
        {/* Header */}
        <div className="px-3 py-2.5 border-b border-[var(--color-gfs-border-light)] flex items-center justify-between">
          {!sidebarCollapsed && (
            <div className="flex items-center gap-2">
              <Crosshair className="w-4 h-4 text-[var(--color-gfs-red)]" />
              <span className="text-[11px] font-display font-bold text-[var(--color-gfs-text)]">Red Team</span>
            </div>
          )}
          <button onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="w-6 h-6 rounded flex items-center justify-center text-[var(--color-gfs-text-muted)] hover:text-[var(--color-gfs-text)] hover:bg-[var(--color-gfs-hover)]">
            <ChevronRight className={`w-3 h-3 transition-transform ${sidebarCollapsed ? '' : 'rotate-180'}`} />
          </button>
        </div>

        {/* Nav */}
        <nav className="overflow-y-auto py-1" style={{ maxHeight: 'calc(100vh - 240px)' }}>
          {categories.map((cat) => (
            <div key={cat}>
              {!sidebarCollapsed && (
                <div className="px-3 py-1.5 gfs-text-label text-[8px]">{cat}</div>
              )}
              {WORKSPACE_SECTIONS.filter((s) => s.category === cat).map((section) => {
                const Icon = section.icon;
                const active = activeSection === section.id;
                return (
                  <button key={section.id} onClick={() => onSectionChange(section.id)}
                    className={`w-full flex items-center gap-2 px-2.5 py-1.5 text-[11px] transition-colors ${
                      active ? 'bg-[var(--color-gfs-red-dim)] text-[var(--color-gfs-red)]' : 'text-[var(--color-gfs-text-secondary)] hover:text-[var(--color-gfs-text)] hover:bg-[var(--color-gfs-hover)]'
                    } ${sidebarCollapsed ? 'justify-center px-0' : ''}`}
                    title={sidebarCollapsed ? section.label : undefined}>
                    <Icon className="w-3.5 h-3.5 flex-shrink-0" />
                    {!sidebarCollapsed && <span className="truncate">{section.label}</span>}
                  </button>
                );
              })}
            </div>
          ))}
        </nav>
      </motion.div>

      {/* Main Content */}
      <div className="flex-1 min-w-0">
        {children}
      </div>
    </div>
  );
}
