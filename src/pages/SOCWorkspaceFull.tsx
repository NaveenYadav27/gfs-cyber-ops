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
import { EthicalHackingWorkspace } from './EthicalHackingWorkspace';
import { SOCShiftManagement } from './SOCShiftManagement';
import { SOCReports } from './SOCReports';
import { DetectionEngineeringPage } from './DetectionEngineeringPage';
import { EmailSecurityPage } from './EmailSecurityPage';
import { AssetInventoryPage } from './AssetInventoryPage';
import { SOCKnowledgeBase } from './SOCKnowledgeBase';
import { SOCRunbooks } from './SOCRunbooks';
import { SOCTraining } from './SOCTraining';
import { Card } from '@/components/ui/Card';
import { PageHeader } from '@/components/layout/PageHeader';
import { BookOpen, FileText, Clock, Radio, Users, BarChart3, Server, Shield } from 'lucide-react';

export function SOCWorkspaceFull() {
  const [activeSection, setActiveSection] = useState('soc-console');

  const renderContent = () => {
    switch (activeSection) {
      case 'soc-console': return <SOCOperations />;
      case 'alert-queue': return <AlertQueuePage />;
      case 'investigations': return <InvestigationWorkspace />;
      case 'cases': return <InvestigationWorkspace />;
      case 'shift': return <SOCShiftManagement />;
      case 'internal-mail': return <InternalMessaging />;
      case 'reports': return <SOCReports />;
      case 'soar': return <SOARCenter />;
      case 'siem': return <SIEMWorkspace />;
      case 'edr': return <EDRConsole />;
      case 'threat-intel': return <ThreatIntelPage />;
      case 'threat-hunting': return <ThreatHuntingPage />;
      case 'detection-eng': return <DetectionEngineeringPage />;
      case 'firewall-mgmt': return <FirewallManagement />;
      case 'email-sec': return <EmailSecurityPage />;
      case 'ad-sec': return <ActiveDirectoryPage />;
      case 'cloud-sec': return <CloudSecurity />;
      case 'vuln-mgmt': return <VulnerabilityDashboard />;
      case 'asset-inv': return <AssetInventoryPage />;
      case 'knowledge': return <SOCKnowledgeBase />;
      case 'runbooks': return <SOCRunbooks />;
      case 'soc-labs': return <BlueTeamLabs />;
      case 'training': return <SOCTraining />;
      case 'cheat-sheets': return <SOCCheatSheets />;
      case 'audit': return <AuditLogPage />;
      default: return <SOCOperations />;
    }
  };

  return (
    <SOCWorkspace activeSection={activeSection} onSectionChange={setActiveSection}>
      {renderContent()}
    </SOCWorkspace>
  );
}
