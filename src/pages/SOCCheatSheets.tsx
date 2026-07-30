import { useState } from 'react';
import { BookOpen, Search, Copy, Check } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { PageHeader } from '@/components/layout/PageHeader';
import { KB_ARTICLES } from '@/data/soc';

const QUICK_REF = [
  { category: 'Windows Event IDs', entries: [
    { syntax: '4624', description: 'Successful logon' }, { syntax: '4625', description: 'Failed logon' },
    { syntax: '4648', description: 'Logon with explicit credentials (runas)' }, { syntax: '4672', description: 'Special privileges assigned' },
    { syntax: '4688', description: 'New process created' }, { syntax: '4720', description: 'User account created' },
    { syntax: '4726', description: 'User account deleted' }, { syntax: '4732', description: 'Member added to security group' },
    { syntax: '4768', description: 'Kerberos TGT requested' }, { syntax: '4769', description: 'Kerberos service ticket requested' },
    { syntax: '4771', description: 'Kerberos pre-authentication failed' }, { syntax: '5140', description: 'Network share accessed' },
  ]},
  { category: 'Sysmon Events', entries: [
    { syntax: '1', description: 'Process Creation' }, { syntax: '3', description: 'Network Connection' },
    { syntax: '7', description: 'Image Loaded' }, { syntax: '8', description: 'CreateRemoteThread' },
    { syntax: '10', description: 'Process Access' }, { syntax: '11', description: 'File Created' },
    { syntax: '13', description: 'Registry Value Set' }, { syntax: '15', description: 'File Stream Created' },
    { syntax: '22', description: 'DNS Query' }, { syntax: '23', description: 'File Delete (archived)' },
  ]},
  { category: 'KQL Quick Reference', entries: [
    { syntax: 'where TimeGenerated > ago(1h)', description: 'Filter last hour' },
    { syntax: 'summarize count() by Field', description: 'Aggregate count by field' },
    { syntax: 'extend NewField = expression', description: 'Add calculated field' },
    { syntax: 'project Field1, Field2', description: 'Select specific columns' },
    { syntax: 'order by Field desc', description: 'Sort results' },
    { syntax: 'top 10 by Count', description: 'Top 10 results' },
    { syntax: 'join kind=inner Table2 on Key', description: 'Join two tables' },
    { syntax: 'bin(TimeGenerated, 5m)', description: 'Time binning (5-min intervals)' },
  ]},
  { category: 'Incident Severity Matrix', entries: [
    { syntax: 'P1 — Critical', description: 'Active ransomware, data breach, system compromise' },
    { syntax: 'P2 — High', description: 'Credential compromise, lateral movement, APT activity' },
    { syntax: 'P3 — Medium', description: 'Phishing with execution, malware detected, policy violation' },
    { syntax: 'P4 — Low', description: 'Failed attacks, policy violation, informational' },
  ]},
];

export function SOCCheatSheets() {
  const [search, setSearch] = useState('');
  const [copied, setCopied] = useState(false);

  const filtered = search
    ? QUICK_REF.map((cat) => ({
        ...cat,
        entries: cat.entries.filter((e) => e.syntax.toLowerCase().includes(search.toLowerCase()) || e.description.toLowerCase().includes(search.toLowerCase())),
      })).filter((cat) => cat.entries.length > 0)
    : QUICK_REF;

  return (
    <div className="space-y-4">
      <PageHeader icon={<BookOpen className="w-5 h-5 text-[var(--color-gfs-accent)]" />} title="SOC Cheat Sheets" subtitle="Quick reference for investigations and detection" />

      <div className="relative">
        <Search className="w-3.5 h-3.5 text-[var(--color-gfs-text-muted)] absolute left-3 top-1/2 -translate-y-1/2" />
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search cheat sheets... (e.g., 4625, ransomware, KQL)"
          className="w-full pl-9 pr-4 py-2.5 rounded-lg bg-[var(--color-gfs-surface)] border border-[var(--color-gfs-border-light)] text-xs text-[var(--color-gfs-text)] placeholder:text-[var(--color-gfs-text-muted)] focus:outline-none focus:border-[var(--color-gfs-accent)]" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map((cat) => (
          <Card key={cat.category} delay={0} className="!p-4">
            <h3 className="gfs-text-label mb-3">{cat.category}</h3>
            <div className="space-y-1.5">
              {cat.entries.map((entry) => (
                <div key={entry.syntax} className="flex items-center gap-2 p-2 rounded bg-[var(--color-gfs-elevated)] group">
                  <code className="text-[10px] font-mono text-[var(--color-gfs-accent)] min-w-[80px]">{entry.syntax}</code>
                  <span className="text-[10px] text-[var(--color-gfs-text-secondary)] flex-1">{entry.description}</span>
                  <button onClick={() => { navigator.clipboard.writeText(entry.syntax); setCopied(true); setTimeout(() => setCopied(false), 1000); }}
                    className="opacity-0 group-hover:opacity-100 transition-opacity">
                    <Copy className="w-3 h-3 text-[var(--color-gfs-text-muted)]" />
                  </button>
                </div>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
