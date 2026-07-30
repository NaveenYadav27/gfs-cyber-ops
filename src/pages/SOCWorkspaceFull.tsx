import { useState } from 'react';
import { SOCWorkspace } from './SOCWorkspace';
import { SOCOperations } from './SOCOperations';
import { AlertQueuePage } from './AlertQueuePage';
import { InvestigationWorkspace } from './InvestigationWorkspace';
import { SOARCenter } from './SOARCenter';
import { SIEMWorkspace } from './SIEMWorkspace';
import { EDRConsole } from './EDRConsole';
import { ThreatIntelPage } from './ThreatIntelPage';
import { ThreatHuntingPage } from './ThreatHuntingPage';
import { FirewallManagement } from './FirewallManagement';
import { VulnerabilityDashboard } from './VulnerabilityDashboard';
import { ActiveDirectoryPage } from './ActiveDirectoryPage';
import { CloudSecurity } from './CloudSecurity';
import { AccessManagementPage } from './AccessManagementPage';
import { PAMPage } from './PAMPage';
import { PlaybooksPage } from './PlaybooksPage';
import { InternalMessaging } from './InternalMessaging';
import { AuditLogPage } from './AuditLogPage';
import { BlueTeamLabs } from './BlueTeamLabs';
import { SOCCheatSheets } from './SOCCheatSheets';
import { FrameworksPage } from './FrameworksPage';
import { EthicalHackingWorkspaceFull } from './EthicalHackingWorkspaceFull';
import { Card } from '@/components/ui/Card';
import { PageHeader } from '@/components/layout/PageHeader';
import { BookOpen, FileText, Clock, Radio, Users, BarChart3, Server, Shield } from 'lucide-react';

function PlaceholderPage({ title, icon: Icon }: { title: string; icon: React.ElementType }) {
  return (
    <div>
      <PageHeader icon={<Icon className="w-5 h-5 text-[var(--color-gfs-accent)]" />} title={title} />
      <Card delay={0} className="!p-8 text-center">
        <Icon className="w-8 h-8 text-[var(--color-gfs-text-muted)] mx-auto mb-3 opacity-30" />
        <p className="text-[11px] text-[var(--color-gfs-text-muted)]">{title} — integrated from SOC workspace</p>
      </Card>
    </div>
  );
}

export function SOCWorkspaceFull() {
  const [activeSection, setActiveSection] = useState('soc-console');

  const renderContent = () => {
    switch (activeSection) {
      case 'soc-console': return <SOCOperations />;
      case 'alert-queue': return <AlertQueuePage />;
      case 'investigations': return <InvestigationWorkspace />;
      case 'cases': return <InvestigationWorkspace />;
      case 'shift': return <PlaceholderPage title="My Shift" icon={Clock} />;
      case 'internal-mail': return <InternalMessaging />;
      case 'reports': return <PlaceholderPage title="Reports" icon={BarChart3} />;
      case 'soar': return <SOARCenter />;
      case 'siem': return <SIEMWorkspace />;
      case 'edr': return <EDRConsole />;
      case 'threat-intel': return <ThreatIntelPage />;
      case 'threat-hunting': return <ThreatHuntingPage />;
      case 'detection-eng': return <PlaceholderPage title="Detection Engineering" icon={Radio} />;
      case 'firewall-mgmt': return <FirewallManagement />;
      case 'email-sec': return <PlaceholderPage title="Email Security" icon={Shield} />;
      case 'ad-sec': return <ActiveDirectoryPage />;
      case 'cloud-sec': return <CloudSecurity />;
      case 'vuln-mgmt': return <VulnerabilityDashboard />;
      case 'asset-inv': return <PlaceholderPage title="Asset Inventory" icon={Server} />;
      case 'knowledge': return <PlaceholderPage title="Knowledge Base" icon={BookOpen} />;
      case 'runbooks': return <PlaceholderPage title="Runbooks" icon={FileText} />;
      case 'soc-labs': return <BlueTeamLabs />;
      case 'training': return <PlaceholderPage title="Training" icon={BookOpen} />;
      case 'cheat-sheets': return <SOCCheatSheets />;
      default: return <SOCOperations />;
    }
  };

  return (
    <SOCWorkspace activeSection={activeSection} onSectionChange={setActiveSection}>
      {renderContent()}
    </SOCWorkspace>
  );
}
