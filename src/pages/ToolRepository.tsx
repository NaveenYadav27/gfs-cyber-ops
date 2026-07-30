import { useState } from 'react';
import { Wrench, Search, Filter, Terminal, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { PageHeader } from '@/components/layout/PageHeader';
import { OFFENSIVE_TOOLS } from '@/data/tools';
import type { OffensiveTool } from '@/types/offensive';

interface ToolRepositoryProps {
  onSelectTool: (tool: OffensiveTool) => void;
}

const CATEGORIES = ['All', 'Reconnaissance', 'Web Application Testing', 'Exploitation', 'Password Security', 'Network Analysis'];

export function ToolRepository({ onSelectTool }: ToolRepositoryProps) {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');

  const filtered = OFFENSIVE_TOOLS.filter((t) => {
    if (category !== 'All' && t.category !== category) return false;
    if (search && !t.name.toLowerCase().includes(search.toLowerCase()) && !t.description.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="space-y-4">
      <PageHeader
        icon={<Wrench className="w-5 h-5 text-[var(--color-gfs-accent)]" />}
        title="Tool Repository"
        subtitle={`${OFFENSIVE_TOOLS.length} tools — Offensive security toolkit`}
      />

      <div className="flex items-center gap-3">
        <div className="relative flex-1">
          <Search className="w-3.5 h-3.5 text-[var(--color-gfs-text-muted)] absolute left-3 top-1/2 -translate-y-1/2" />
          <input value={search} onChange={(e) => setSearch(e.target.value)}
            placeholder="Search tools..."
            className="w-full pl-9 pr-4 py-2 rounded-lg bg-[var(--color-gfs-surface)] border border-[var(--color-gfs-border-light)] text-xs text-[var(--color-gfs-text)] placeholder:text-[var(--color-gfs-text-muted)] focus:outline-none focus:border-[var(--color-gfs-accent)]" />
        </div>
        <div className="flex items-center gap-1 flex-wrap">
          {CATEGORIES.map((c) => (
            <button key={c} onClick={() => setCategory(c)}
              className={`px-2 py-1 rounded text-[10px] transition-colors ${
                category === c ? 'bg-[var(--color-gfs-accent-dim)] text-[var(--color-gfs-accent)]' : 'text-[var(--color-gfs-text-muted)] hover:text-[var(--color-gfs-text)]'
              }`}>{c}</button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
        {filtered.map((tool, i) => (
          <motion.div key={tool.id} initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}>
            <Card delay={0} hover onClick={() => onSelectTool(tool)} className="!p-4">
              <div className="flex items-start gap-3">
                <span className="text-2xl">{tool.icon}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-[12px] font-semibold text-[var(--color-gfs-text)]">{tool.name}</span>
                    <Badge variant="default">{tool.category}</Badge>
                  </div>
                  <p className="text-[10px] text-[var(--color-gfs-text-muted)] mt-0.5 line-clamp-2">{tool.description}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge variant="accent">v{tool.version}</Badge>
                    <span className="text-[9px] text-[var(--color-gfs-text-muted)]">{tool.commands.length} commands</span>
                    <span className="text-[9px] text-[var(--color-gfs-text-muted)]">{tool.labs.length} labs</span>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
