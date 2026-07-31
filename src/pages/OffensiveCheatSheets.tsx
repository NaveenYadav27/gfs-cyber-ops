import { useState } from 'react';
import { BookOpen, Copy, Check, Search, Terminal, Shield, Network, Bug, Key } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { PageHeader } from '@/components/layout/PageHeader';

const CHEAT_SHEETS = [
  {
    category: 'Nmap', icon: Network, commands: [
      { cmd: 'nmap -sV -sC -O -oA gfs-scan TARGET', desc: 'Full service/version/OS scan' },
      { cmd: 'nmap -sU --top-ports 100 TARGET', desc: 'UDP scan top 100 ports' },
      { cmd: 'nmap -p- --min-rate 5000 TARGET', desc: 'Fast full port scan' },
    ]
  },
  {
    category: 'SQLMap', icon: Bug, commands: [
      { cmd: 'sqlmap -u "https://target.com/login?id=1" --dbs', desc: 'Enumerate databases' },
      { cmd: 'sqlmap -u "https://target.com/login?id=1" -D app --tables', desc: 'Enumerate tables' },
    ]
  }
];

export function OffensiveCheatSheets() {
  const [copiedIndex, setCopiedIndex] = useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(id);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="space-y-6">
      <PageHeader 
        icon={<BookOpen className="w-6 h-6 text-[var(--color-gfs-accent)]" />}
        title="Offensive Security Cheat Sheets"
        subtitle="Quick reference for red team tools and commands"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {CHEAT_SHEETS.map((sheet, i) => (
          <Card key={i} className="!p-6">
            <div className="flex items-center gap-3 mb-6 pb-3 border-b border-[var(--color-gfs-border-light)]">
              <sheet.icon className="w-5 h-5 text-[var(--color-gfs-accent)]" />
              <h2 className="text-xl font-bold text-white">{sheet.category}</h2>
            </div>
            <div className="space-y-4">
              {sheet.commands.map((cmd, j) => {
                const id = `${i}-${j}`;
                return (
                  <div key={j} className="group relative">
                    <div className="text-sm text-[var(--color-gfs-text-muted)] mb-1">{cmd.desc}</div>
                    <div className="bg-[#0b0f19] p-3 rounded font-mono text-sm text-[var(--color-gfs-green)] flex justify-between items-center border border-[var(--color-gfs-border-light)] group-hover:border-[var(--color-gfs-accent)] transition-colors">
                      <span className="break-all pr-4">{cmd.cmd}</span>
                      <button onClick={() => copyToClipboard(cmd.cmd, id)} className="text-[var(--color-gfs-text-muted)] hover:text-white transition-colors">
                        {copiedIndex === id ? <Check className="w-4 h-4 text-[var(--color-gfs-green)]" /> : <Copy className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
