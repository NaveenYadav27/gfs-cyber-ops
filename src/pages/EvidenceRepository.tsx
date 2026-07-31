import React from 'react';
import { Lock, FileText, Image as ImageIcon, Database, Download } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { PageHeader } from '@/components/layout/PageHeader';
import { Badge } from '@/components/ui/Badge';

export function EvidenceRepository() {
  const EVIDENCE = [
    { id: 'EVD-001', type: 'Hash Dump', target: 'DC-PROD-01', size: '2.4 MB', date: '2026-07-31', icon: Database },
    { id: 'EVD-002', type: 'Screenshot', target: 'EXCH-PROD-01', size: '4.1 MB', date: '2026-07-30', icon: ImageIcon },
    { id: 'EVD-003', type: 'Config File', target: 'FIREWALL-EDGE', size: '124 KB', date: '2026-07-29', icon: FileText },
  ];

  return (
    <div className="space-y-6">
      <PageHeader 
        icon={<Lock className="w-6 h-6 text-[var(--color-gfs-accent)]" />}
        title="Evidence Repository"
        subtitle="Secure vault for exfiltrated mock data, screenshots, and command logs"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {EVIDENCE.map((evd) => (
          <Card key={evd.id} className="!p-6 flex flex-col justify-between hover:border-[var(--color-gfs-accent)] transition-all">
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 bg-[var(--color-gfs-accent)]/10 rounded-lg">
                <evd.icon className="w-6 h-6 text-[var(--color-gfs-accent)]" />
              </div>
              <Badge variant="default">{evd.type}</Badge>
            </div>
            <h3 className="font-bold text-lg text-[var(--color-gfs-text)] mb-1">{evd.target}</h3>
            <div className="flex justify-between text-sm text-[var(--color-gfs-text-muted)] mb-4">
              <span>Size: {evd.size}</span>
              <span>Date: {evd.date}</span>
            </div>
            <button className="flex items-center justify-center gap-2 w-full bg-[var(--color-gfs-surface)] hover:bg-[var(--color-gfs-hover)] py-2 rounded border border-[var(--color-gfs-border-light)] transition-colors text-sm font-semibold">
              <Download className="w-4 h-4" /> Download Evidence
            </button>
          </Card>
        ))}
      </div>
    </div>
  );
}
