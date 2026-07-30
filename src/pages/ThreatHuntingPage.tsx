import { useState } from 'react';
import { Target, Search, Play, Shield, ChevronRight, Copy, Check } from 'lucide-react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { PageHeader } from '@/components/layout/PageHeader';
import { HUNT_MISSIONS } from '@/data/soc';

export function ThreatHuntingPage() {
  const [selectedHunt, setSelectedHunt] = useState(HUNT_MISSIONS[0]);
  const [selectedQuery, setSelectedQuery] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const copyQuery = (query: string) => {
    navigator.clipboard.writeText(query);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-4">
      <PageHeader icon={<Target className="w-5 h-5 text-[var(--color-gfs-accent)]" />} title="Threat Hunting" subtitle={`${HUNT_MISSIONS.length} active hunts — Proactive threat detection`} />

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-4">
        {/* Hunt Missions */}
        <div className="xl:col-span-1 space-y-2">
          {HUNT_MISSIONS.map((hunt) => (
            <Card key={hunt.id} delay={0} hover onClick={() => { setSelectedHunt(hunt); setSelectedQuery(null); }}
              className={`!p-3 cursor-pointer ${selectedHunt.id === hunt.id ? '!border-[var(--color-gfs-accent)]/30' : ''}`}>
              <div className="flex items-center gap-2">
                <Badge variant={hunt.status === 'active' ? 'accent' : 'success'}>{hunt.status}</Badge>
                <span className="text-[10px] text-[var(--color-gfs-text-muted)]">{hunt.queries.length} queries</span>
              </div>
              <p className="text-[11px] font-semibold text-[var(--color-gfs-text)] mt-1">{hunt.title}</p>
              <div className="text-[9px] text-[var(--color-gfs-text-muted)] mt-0.5">{hunt.mitreTactic} • {hunt.analyst}</div>
            </Card>
          ))}
        </div>

        {/* Hunt Detail */}
        <div className="xl:col-span-3 space-y-4">
          {/* Hypothesis */}
          <Card delay={0} className="!p-4">
            <span className="gfs-text-label">Hypothesis</span>
            <p className="text-[11px] text-[var(--color-gfs-text-secondary)] mt-1 leading-relaxed">{selectedHunt.hypothesis}</p>
            <div className="flex items-center gap-2 mt-2">
              <Badge variant="accent">{selectedHunt.mitreTactic}</Badge>
              <Badge variant="default">{selectedHunt.queries.length} queries</Badge>
              <span className="text-[9px] text-[var(--color-gfs-text-muted)]">Started: {selectedHunt.startDate}</span>
            </div>
          </Card>

          {/* Queries */}
          <div className="space-y-3">
            {selectedHunt.queries.map((query) => (
              <Card key={query.id} delay={0} className="!p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-semibold text-[var(--color-gfs-text)]">{query.title}</span>
                    <Badge variant="default">{query.platform}</Badge>
                  </div>
                  <button onClick={() => copyQuery(query.query)} className="flex items-center gap-1 text-[9px] text-[var(--color-gfs-text-muted)] hover:text-[var(--color-gfs-text)]">
                    {copied ? <Check className="w-3 h-3 text-[var(--color-gfs-green)]" /> : <Copy className="w-3 h-3" />} Copy
                  </button>
                </div>
                <div className="p-3 rounded-lg bg-[#0d1117] font-mono text-[10px] text-[var(--color-gfs-text-secondary)] whitespace-pre-wrap">{query.query}</div>
                <div className="mt-2 p-3 rounded bg-[var(--color-gfs-elevated)]">
                  <span className="text-[9px] text-[var(--color-gfs-text-muted)] uppercase">Result</span>
                  <pre className="text-[10px] font-mono text-[var(--color-gfs-text-secondary)] mt-1 whitespace-pre-wrap">{query.result}</pre>
                </div>
                <div className="mt-2 p-2 rounded bg-[var(--color-gfs-accent-dim)]">
                  <span className="text-[10px] text-[var(--color-gfs-text-secondary)]">{query.explanation}</span>
                </div>
                <div className="flex items-center gap-1 mt-2">
                  <Shield className="w-2.5 h-2.5 text-[var(--color-gfs-blue)]" />
                  <span className="text-[9px] text-[var(--color-gfs-blue)]">{query.mitreMapping}</span>
                </div>
              </Card>
            ))}
          </div>

          {/* Findings */}
          {selectedHunt.findings.length > 0 && (
            <Card delay={0.1} className="!p-4">
              <span className="gfs-text-label">Hunt Findings</span>
              <div className="mt-2 space-y-1">
                {selectedHunt.findings.map((f, i) => (
                  <div key={i} className="text-[10px] text-[var(--color-gfs-text-secondary)] flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-gfs-accent)]" />
                    {f}
                  </div>
                ))}
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
