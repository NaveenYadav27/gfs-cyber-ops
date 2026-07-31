import { useState } from 'react';
import { BarChart3, FileText, Download, Clock, Filter, TrendingUp, AlertTriangle } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { PageHeader } from '@/components/layout/PageHeader';

const REPORTS = [
  { id: 'RPT-001', title: 'SOC Weekly Report — Week 2, 2025', type: 'weekly', period: 'Jan 6 — Jan 12, 2025', generated: '2025-01-13 08:00', status: 'generated', highlights: '32 incidents, 89% MTTR SLA, 2 P1 cases' },
  { id: 'RPT-002', title: 'SOC Weekly Report — Week 3, 2025', type: 'weekly', period: 'Jan 13 — Jan 19, 2025', generated: '2025-01-20 08:00', status: 'pending', highlights: 'In progress — includes Operation DarkShadow impact' },
  { id: 'RPT-003', title: 'Monthly Threat Landscape — December 2024', type: 'monthly', period: 'December 2024', generated: '2025-01-05 10:00', status: 'generated', highlights: '156 incidents, 4 P1 cases, 12 APT campaigns tracked' },
];

export function SOCReports() {
  const [activeTab, setActiveTab] = useState<'generated' | 'pending' | 'templates'>('generated');
  
  const filteredReports = REPORTS.filter(r => 
    (activeTab === 'generated' && r.status === 'generated') || 
    (activeTab === 'pending' && r.status === 'pending')
  );

  return (
    <div className="space-y-4">
      <PageHeader 
        icon={<BarChart3 className="w-5 h-5 text-[var(--color-gfs-accent)]" />} 
        title="SOC Reports" 
        subtitle="Performance Metrics & Executive Briefings" 
      />

      <div className="flex border-b border-[var(--color-gfs-border-light)] mb-4">
        {['generated', 'pending', 'templates'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab as any)}
            className={`px-4 py-2 text-sm font-semibold capitalize transition-colors ${
              activeTab === tab 
                ? 'text-[var(--color-gfs-accent)] border-b-2 border-[var(--color-gfs-accent)]' 
                : 'text-[var(--color-gfs-text-muted)] hover:text-[var(--color-gfs-text)]'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {activeTab !== 'templates' ? (
          filteredReports.map((report, idx) => (
            <Card key={report.id} delay={0.1 * idx} hover className="!p-4 border-l-2 border-l-[var(--color-gfs-accent)]">
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-sm font-bold text-[var(--color-gfs-text)]">{report.title}</h3>
                    <Badge variant={report.status === 'generated' ? 'success' : 'medium'}>{report.status}</Badge>
                  </div>
                  <p className="text-xs text-[var(--color-gfs-text-muted)]">{report.period}</p>
                </div>
                {report.status === 'generated' && (
                  <button className="p-2 hover:bg-[var(--color-gfs-hover)] rounded text-[var(--color-gfs-accent)]">
                    <Download className="w-4 h-4" />
                  </button>
                )}
              </div>
              <div className="mt-4 p-3 bg-[var(--color-gfs-elevated)] rounded border border-[var(--color-gfs-border-light)]">
                <p className="text-xs text-[var(--color-gfs-text-secondary)]"><strong>Highlights:</strong> {report.highlights}</p>
                <div className="flex justify-between mt-2 pt-2 border-t border-[var(--color-gfs-border-light)] text-[10px] text-[var(--color-gfs-text-muted)]">
                  <span>ID: {report.id}</span>
                  <span>Type: {report.type}</span>
                  <span>Generated: {report.generated}</span>
                </div>
              </div>
            </Card>
          ))
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card className="!p-4 hover:border-[var(--color-gfs-accent)]/50 cursor-pointer transition-colors">
              <FileText className="w-8 h-8 text-[var(--color-gfs-accent)] mb-3" />
              <h4 className="text-sm font-bold mb-1">Weekly Operational Summary</h4>
              <p className="text-xs text-[var(--color-gfs-text-muted)]">Standard metrics for Tier 1/2 performance, incident volume, and SLA compliance.</p>
            </Card>
            <Card className="!p-4 hover:border-[var(--color-gfs-accent)]/50 cursor-pointer transition-colors">
              <FileText className="w-8 h-8 text-[var(--color-gfs-accent)] mb-3" />
              <h4 className="text-sm font-bold mb-1">Executive Threat Briefing</h4>
              <p className="text-xs text-[var(--color-gfs-text-muted)]">High-level summary for CISO. Focuses on APTs, P1 incidents, and financial risk.</p>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
