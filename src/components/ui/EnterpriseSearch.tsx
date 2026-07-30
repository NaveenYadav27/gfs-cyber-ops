import { useState, useRef, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, ArrowRight, Server, Shield, Users, AlertTriangle, FileText, Target, Globe, Database, Monitor, Cloud, Network } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { useStore } from '@/store/useStore';
import { useLearningEngine } from '@/store/useLearningEngine';

interface SearchResult {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  icon: React.ElementType;
  color: string;
  action: () => void;
}

export function EnterpriseSearch() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const { setCurrentPage } = useStore();
  const { missions, notebook } = useLearningEngine();

  // Build search index
  const allResults = useMemo<SearchResult[]>(() => {
    const items: SearchResult[] = [];

    // Pages
    const pages = [
      { id: 'soc', title: 'SOC Console', subtitle: 'Security Operations Center', icon: Shield, color: 'var(--color-gfs-accent)', page: 'soc' },
      { id: 'siem', title: 'SIEM Analytics', subtitle: 'Microsoft Sentinel — KQL Queries', icon: Database, color: 'var(--color-gfs-blue)', page: 'siem' },
      { id: 'edr', title: 'EDR Console', subtitle: 'CrowdStrike Falcon — Endpoint Detection', icon: Monitor, color: 'var(--color-gfs-green)', page: 'edr' },
      { id: 'threat-intel', title: 'Threat Intelligence', subtitle: 'Threat Actors, IOCs, Campaigns', icon: Target, color: 'var(--color-gfs-red)', page: 'threat-intel' },
      { id: 'vulnerabilities', title: 'Vulnerability Management', subtitle: 'Qualys VMDR — CVE Tracker', icon: AlertTriangle, color: 'var(--color-gfs-amber)', page: 'vulnerabilities' },
      { id: 'firewall', title: 'Firewall Management', subtitle: 'Palo Alto — Rules & Policies', icon: Shield, color: 'var(--color-gfs-blue)', page: 'firewall' },
      { id: 'ad', title: 'Active Directory', subtitle: 'GFS India Domain — 42,100 objects', icon: Users, color: 'var(--color-gfs-purple)', page: 'ad' },
      { id: 'cloud', title: 'Cloud Security', subtitle: 'Azure India — 286 resources', icon: Cloud, color: 'var(--color-gfs-blue)', page: 'cloud' },
      { id: 'access', title: 'Access Management', subtitle: 'IAM — Requests & RBAC', icon: Users, color: 'var(--color-gfs-accent)', page: 'access' },
      { id: 'pam', title: 'Privileged Access Management', subtitle: 'CyberArk — 847 vaulted accounts', icon: Shield, color: 'var(--color-gfs-amber)', page: 'pam' },
      { id: 'playbooks', title: 'SOAR Playbooks', subtitle: 'Automated Response — 6 playbooks', icon: Shield, color: 'var(--color-gfs-green)', page: 'playbooks' },
      { id: 'audit', title: 'Audit Log', subtitle: 'Complete audit trail', icon: FileText, color: 'var(--color-gfs-text-muted)', page: 'audit' },
      { id: 'frameworks', title: 'Compliance Frameworks', subtitle: 'RBI, PCI DSS, ISO 27001', icon: Shield, color: 'var(--color-gfs-green)', page: 'frameworks' },
      { id: 'ethical-hacking', title: 'Ethical Hacking', subtitle: 'Red Team Operations', icon: Target, color: 'var(--color-gfs-red)', page: 'ethical-hacking' },
      { id: 'vapt', title: 'VAPT', subtitle: 'Vulnerability Assessment & Pen Testing', icon: Search, color: 'var(--color-gfs-accent)', page: 'vapt' },
      { id: 'purple-team', title: 'Purple Team', subtitle: 'Detection Validation', icon: Shield, color: 'var(--color-gfs-purple)', page: 'purple-team' },
      { id: 'missions', title: 'Enterprise Missions', subtitle: 'Learning Missions — Operation DarkShadow', icon: Target, color: 'var(--color-gfs-accent)', page: 'missions' },
      { id: 'notebook', title: 'Investigation Notebook', subtitle: 'Evidence & Notes', icon: FileText, color: 'var(--color-gfs-accent)', page: 'notebook' },
      { id: 'analytics', title: 'Learning Analytics', subtitle: 'Performance Dashboard', icon: Shield, color: 'var(--color-gfs-accent)', page: 'analytics' },
      { id: 'incident', title: 'Incidents', subtitle: 'ServiceNow — Incident Management', icon: AlertTriangle, color: 'var(--color-gfs-red)', page: 'incidents' },
      { id: 'employees', title: 'Employee Directory', subtitle: '42,100 employees', icon: Users, color: 'var(--color-gfs-accent)', page: 'users' },
      { id: 'news', title: 'Enterprise News', subtitle: 'Company announcements', icon: FileText, color: 'var(--color-gfs-blue)', page: 'news' },
    ];

    pages.forEach((p) => {
      items.push({
        id: p.id,
        title: p.title,
        subtitle: p.subtitle,
        category: 'Pages',
        icon: p.icon,
        color: p.color,
        action: () => { setCurrentPage(p.page); setOpen(false); },
      });
    });

    // Missions
    missions.forEach((m) => {
      items.push({
        id: m.id,
        title: `Mission ${m.number}: ${m.title}`,
        subtitle: `${m.type} • ${m.difficulty} • Week ${m.storyWeek}`,
        category: 'Missions',
        icon: Target,
        color: m.status === 'completed' ? 'var(--color-gfs-green)' : m.status === 'locked' ? 'var(--color-gfs-text-muted)' : 'var(--color-gfs-accent)',
        action: () => { setCurrentPage('missions'); setOpen(false); },
      });
    });

    // Notebook entries
    notebook.forEach((n) => {
      items.push({
        id: n.id,
        title: n.title,
        subtitle: `${n.type} • ${n.tags.join(', ')}`,
        category: 'Notebook',
        icon: FileText,
        color: 'var(--color-gfs-accent)',
        action: () => { setCurrentPage('notebook'); setOpen(false); },
      });
    });

    return items;
  }, [missions, notebook, setCurrentPage]);

  const results = useMemo(() => {
    if (!query.trim()) return allResults.slice(0, 12);
    const q = query.toLowerCase();
    return allResults.filter((r) =>
      r.title.toLowerCase().includes(q) ||
      r.subtitle.toLowerCase().includes(q) ||
      r.category.toLowerCase().includes(q)
    ).slice(0, 20);
  }, [query, allResults]);

  // Group by category
  const grouped = useMemo(() => {
    const groups: Record<string, SearchResult[]> = {};
    results.forEach((r) => {
      if (!groups[r.category]) groups[r.category] = [];
      groups[r.category].push(r);
    });
    return groups;
  }, [results]);

  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
      if (e.key === 'ArrowDown') { e.preventDefault(); setSelectedIndex((i) => Math.min(i + 1, results.length - 1)); }
      if (e.key === 'ArrowUp') { e.preventDefault(); setSelectedIndex((i) => Math.max(i - 1, 0)); }
      if (e.key === 'Enter' && results[selectedIndex]) { results[selectedIndex].action(); }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [open, results, selectedIndex]);

  // Global shortcut: Cmd/Ctrl + K
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setOpen(true);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 100);
      setQuery('');
      setSelectedIndex(0);
    }
  }, [open]);

  let flatIndex = 0;

  return (
    <>
      {/* Trigger */}
      <button onClick={() => setOpen(true)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[var(--color-gfs-surface)] border border-[var(--color-gfs-border-light)] text-[11px] text-[var(--color-gfs-text-muted)] hover:border-[var(--color-gfs-border)] hover:text-[var(--color-gfs-text-secondary)] transition-colors">
        <Search className="w-3 h-3" />
        <span>Search enterprise...</span>
        <kbd className="text-[9px] px-1 py-0.5 rounded bg-[var(--color-gfs-elevated)] border border-[var(--color-gfs-border-light)] ml-4">⌘K</kbd>
      </button>

      {/* Modal */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-[var(--z-modal)]" style={{ background: 'rgba(0, 0, 0, 0.5)', backdropFilter: 'blur(4px)' }} />
            <motion.div initial={{ opacity: 0, y: -20, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.98 }}
              className="fixed left-1/2 top-[15%] -translate-x-1/2 w-[560px] max-h-[70vh] bg-[var(--color-gfs-deep)] border border-[var(--color-gfs-border)] rounded-xl shadow-2xl z-[var(--z-modal)] flex flex-col overflow-hidden">
              {/* Input */}
              <div className="flex items-center gap-3 px-4 py-3 border-b border-[var(--color-gfs-border-light)]">
                <Search className="w-4 h-4 text-[var(--color-gfs-text-muted)]" />
                <input ref={inputRef} value={query} onChange={(e) => { setQuery(e.target.value); setSelectedIndex(0); }}
                  placeholder="Search pages, missions, evidence, employees..."
                  className="flex-1 bg-transparent text-sm text-[var(--color-gfs-text)] placeholder:text-[var(--color-gfs-text-muted)] focus:outline-none" />
                <kbd className="text-[9px] px-1.5 py-0.5 rounded bg-[var(--color-gfs-elevated)] border border-[var(--color-gfs-border-light)] text-[var(--color-gfs-text-muted)]">ESC</kbd>
              </div>

              {/* Results */}
              <div className="flex-1 overflow-y-auto py-2">
                {Object.entries(grouped).map(([category, items]) => (
                  <div key={category}>
                    <div className="px-4 py-1.5 gfs-text-label">{category}</div>
                    {items.map((item) => {
                      const thisIndex = flatIndex++;
                      return (
                        <button key={item.id} onClick={item.action}
                          className={`w-full flex items-center gap-3 px-4 py-2 text-left transition-colors ${
                            thisIndex === selectedIndex ? 'bg-[var(--color-gfs-accent-dim)]' : 'hover:bg-[var(--color-gfs-hover)]'
                          }`}>
                          <item.icon className="w-4 h-4 flex-shrink-0" style={{ color: item.color }} />
                          <div className="flex-1 min-w-0">
                            <span className="text-[11px] text-[var(--color-gfs-text)]">{item.title}</span>
                            <span className="text-[10px] text-[var(--color-gfs-text-muted)] ml-2">{item.subtitle}</span>
                          </div>
                          <ArrowRight className="w-3 h-3 text-[var(--color-gfs-text-muted)]" />
                        </button>
                      );
                    })}
                  </div>
                ))}
                {results.length === 0 && (
                  <div className="px-4 py-8 text-center">
                    <p className="text-[11px] text-[var(--color-gfs-text-muted)]">No results found for "{query}"</p>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="px-4 py-2 border-t border-[var(--color-gfs-border-light)] flex items-center gap-4 text-[9px] text-[var(--color-gfs-text-muted)]">
                <span>↑↓ Navigate</span>
                <span>↵ Open</span>
                <span>ESC Close</span>
                <span className="ml-auto">{results.length} results</span>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
