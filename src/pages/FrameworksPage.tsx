// src/pages/FrameworksPage.tsx
import { Scale, Shield, CheckCircle2, AlertTriangle, FileText, TrendingUp, BookOpen } from 'lucide-react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { PageHeader } from '@/components/layout/PageHeader';
import { ProgressRing } from '@/components/ui/ProgressRing';

const FRAMEWORKS = [
  { name: 'RBI Cybersecurity Framework', code: 'RBI-CSF', compliance: 94, controls: 187, implemented: 176, gaps: 11, status: 'Compliant', auditDate: 'Dec 2024', nextAudit: 'Jun 2025', description: 'Mandatory for all RBI-regulated entities. Covers network security, access control, monitoring, incident response.' },
  { name: 'PCI DSS v4.0', code: 'PCI-DSS', compliance: 89, controls: 312, implemented: 278, gaps: 34, status: 'Compliant', auditDate: 'Oct 2024', nextAudit: 'Oct 2025', description: 'Payment Card Industry Data Security Standard. Required for all entities processing card payments.' },
  { name: 'ISO 27001:2022', code: 'ISO27001', compliance: 91, controls: 93, implemented: 85, gaps: 8, status: 'Certified', auditDate: 'Aug 2024', nextAudit: 'Aug 2025', description: 'International standard for Information Security Management Systems (ISMS).' },
  { name: 'CERT-In Guidelines', code: 'CERT-IN', compliance: 96, controls: 45, implemented: 43, gaps: 2, status: 'Compliant', auditDate: 'Nov 2024', nextAudit: 'May 2025', description: 'Indian Computer Emergency Response Team guidelines for incident reporting and response.' },
  { name: 'NIST CSF 2.0', code: 'NIST-CSF', compliance: 78, controls: 228, implemented: 178, gaps: 50, status: 'In Progress', auditDate: '—', nextAudit: '—', description: 'NIST Cybersecurity Framework — voluntary adoption for global alignment.' },
  { name: 'DPDP Act 2023', code: 'DPDP', compliance: 82, controls: 64, implemented: 52, gaps: 12, status: 'In Progress', auditDate: '—', nextAudit: '—', description: 'Digital Personal Data Protection Act — India\'s data privacy law. Implementation ongoing.' },
];

const RECENT_AUDITS = [
  { framework: 'RBI-CSF', type: 'Annual Audit', auditor: 'KPMG', date: 'Dec 2024', result: 'Pass', findings: 11, severity: 'medium' },
  { framework: 'PCI DSS', type: 'QSA Assessment', auditor: 'Deloitte', date: 'Oct 2024', result: 'Pass', findings: 8, severity: 'low' },
  { framework: 'ISO 27001', type: 'Surveillance Audit', auditor: 'BSI', date: 'Aug 2024', result: 'Pass — Minor NC', findings: 3, severity: 'low' },
];

export function FrameworksPage() {
  return (
    <div className="space-y-4">
      <PageHeader
        icon={<Scale className="w-5 h-5 text-[var(--color-gfs-accent)]" />}
        title="Compliance Frameworks"
        subtitle="GFS regulatory compliance — 6 frameworks, 929 controls"
      />

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        {/* Framework Cards */}
        <div className="xl:col-span-2 space-y-3">
          {FRAMEWORKS.map((fw, i) => (
            <motion.div key={fw.code} initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
              <Card delay={0} className="!p-4">
                <div className="flex items-start gap-4">
                  <ProgressRing progress={fw.compliance} size={56} strokeWidth={4} />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-semibold text-[var(--color-gfs-text)]">{fw.name}</span>
                      <Badge variant={fw.status === 'Compliant' || fw.status === 'Certified' ? 'success' : 'medium'}>{fw.status}</Badge>
                    </div>
                    <p className="text-[10px] text-[var(--color-gfs-text-muted)] mt-0.5">{fw.description}</p>
                    <div className="flex items-center gap-4 mt-2 text-[9px] text-[var(--color-gfs-text-muted)]">
                      <span>{fw.implemented}/{fw.controls} controls</span>
                      <span>{fw.gaps} gaps</span>
                      <span>Last audit: {fw.auditDate}</span>
                      <span>Next: {fw.nextAudit}</span>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Recent Audits */}
        <Card delay={0.1} className="!p-4 h-fit">
          <div className="flex items-center gap-2 mb-3">
            <FileText className="w-3.5 h-3.5 text-[var(--color-gfs-blue)]" />
            <span className="text-xs font-semibold text-[var(--color-gfs-text)]">Recent Audits</span>
          </div>
          <div className="space-y-2">
            {RECENT_AUDITS.map((audit, i) => (
              <div key={i} className="p-2.5 rounded-lg bg-[var(--color-gfs-elevated)]">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-semibold text-[var(--color-gfs-text)]">{audit.framework}</span>
                  <Badge variant={audit.result.includes('NC') ? 'medium' : 'success'}>{audit.result}</Badge>
                </div>
                <div className="text-[9px] text-[var(--color-gfs-text-muted)] mt-0.5">
                  {audit.type} • {audit.auditor} • {audit.date}
                </div>
                <div className="text-[9px] text-[var(--color-gfs-text-muted)]">{audit.findings} findings ({audit.severity})</div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
