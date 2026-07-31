import { useState } from 'react';
import { FileText, Download, ShieldAlert, BarChart, FileCheck, Filter } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { PageHeader } from '@/components/layout/PageHeader';

export function ReportingCenter() {
  const [activeTab, setActiveTab] = useState<'generated' | 'pending'>('generated');

  const REPORTS = [
    { id: 'RPT-01', title: 'External Penetration Test - Q3 2026', type: 'Full Assessment', status: 'Published', date: '2026-07-30', criticals: 2, highs: 5, score: 78 },
    { id: 'RPT-02', title: 'Internal Network Assessment - AD Security', type: 'Targeted Review', status: 'Published', date: '2026-07-28', criticals: 4, highs: 12, score: 62 },
    { id: 'RPT-03', title: 'Web Application Pentest - Project Phoenix', type: 'Web App', status: 'In Draft', date: '2026-07-31', criticals: 0, highs: 1, score: 92 },
  ];

  return (
    <div className="space-y-6">
      <PageHeader 
        icon={<FileText className="w-6 h-6 text-[var(--color-gfs-accent)]" />}
        title="Reporting Center"
        subtitle="Manage assessment reports, vulnerability findings, and executive summaries"
      />

      <div className="flex border-b border-[var(--color-gfs-border-light)] mb-4 gap-4">
        <button onClick={() => setActiveTab('generated')} className={`pb-2 text-sm font-semibold transition-colors ${activeTab === 'generated' ? 'text-[var(--color-gfs-accent)] border-b-2 border-[var(--color-gfs-accent)]' : 'text-[var(--color-gfs-text-muted)]'}`}>Published Reports</button>
        <button onClick={() => setActiveTab('pending')} className={`pb-2 text-sm font-semibold transition-colors ${activeTab === 'pending' ? 'text-[var(--color-gfs-accent)] border-b-2 border-[var(--color-gfs-accent)]' : 'text-[var(--color-gfs-text-muted)]'}`}>Drafts & In-Progress</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {REPORTS.filter(r => (activeTab === 'generated' ? r.status === 'Published' : r.status === 'In Draft')).map((report) => (
          <Card key={report.id} className="!p-6 flex flex-col justify-between hover:border-[var(--color-gfs-accent)] transition-all">
            <div>
              <div className="flex justify-between items-start mb-4">
                <Badge variant="default">{report.type}</Badge>
                <Badge variant={report.status === 'Published' ? 'success' : 'medium'}>{report.status}</Badge>
              </div>
              <h3 className="font-bold text-lg text-[var(--color-gfs-text)] mb-2">{report.title}</h3>
              <p className="text-sm text-[var(--color-gfs-text-muted)] mb-4">Date: {report.date}</p>
              
              <div className="flex items-center gap-4 text-sm font-semibold">
                <div className="flex items-center gap-1.5 text-[var(--color-gfs-red)]">
                  <ShieldAlert className="w-4 h-4" /> {report.criticals} Critical
                </div>
                <div className="flex items-center gap-1.5 text-[var(--color-gfs-orange)]">
                  <ShieldAlert className="w-4 h-4" /> {report.highs} High
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-[var(--color-gfs-border-light)] flex justify-between items-center">
              <div className="text-xs text-[var(--color-gfs-text-muted)]">Score: <span className="text-white font-bold">{report.score}/100</span></div>
              <button className="flex items-center gap-2 bg-[var(--color-gfs-surface)] hover:bg-[var(--color-gfs-hover)] px-3 py-1.5 rounded border border-[var(--color-gfs-border-light)] transition-colors text-sm">
                <Download className="w-4 h-4" /> Export
              </button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
