import { useState } from 'react';
import { EthicalHackingWorkspace } from './EthicalHackingWorkspace';
import { ToolRepository } from './ToolRepository';
import { ToolDetailPage } from './ToolDetailPage';
import { EngagementDetail } from './EngagementDetail';
import type { OffensiveTool, Engagement } from '@/types/offensive';

// Import all dedicated enterprise pages built by subagents
import { OffSecDashboard } from './OffSecDashboard';
import { AttackChainsPage } from './AttackChainsPage';
import { PracticeMissions } from './PracticeMissions';
import { InteractiveTerminal } from './InteractiveTerminal';
import { OffensiveCheatSheets } from './OffensiveCheatSheets';
import { ReconDashboard } from './ReconDashboard';
import { ScanningWorkspace } from './ScanningWorkspace';
import { EnumerationWorkspace } from './EnumerationWorkspace';
import { WebSecurityWorkspace } from './WebSecurityWorkspace';
import { ExploitationWorkspace } from './ExploitationWorkspace';
import { PostExploitation } from './PostExploitation';
import { ReportingCenter } from './ReportingCenter';

export function EthicalHackingWorkspaceFull() {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [selectedTool, setSelectedTool] = useState<OffensiveTool | null>(null);
  const [selectedEngagement, setSelectedEngagement] = useState<Engagement | null>(null);

  const renderContent = () => {
    // Tool detail
    if (selectedTool) return <ToolDetailPage tool={selectedTool} onBack={() => setSelectedTool(null)} />;
    // Engagement detail
    if (selectedEngagement) return <EngagementDetail engagement={selectedEngagement} onBack={() => setSelectedEngagement(null)} />;

    switch (activeSection) {
      case 'dashboard': return <OffSecDashboard />;
      case 'engagements': return <OffSecDashboard />; // Reusing dashboard for engagements list
      case 'tools': return <ToolRepository onSelectTool={setSelectedTool} />;
      case 'attack-chains': return <AttackChainsPage />;
      case 'labs': return <PracticeMissions />;
      case 'terminal': return <InteractiveTerminal />;
      case 'cheat-sheets': return <OffensiveCheatSheets />;
      case 'recon': return <ReconDashboard />;
      case 'scanning': return <ScanningWorkspace />;
      case 'enum': return <EnumerationWorkspace />;
      case 'vuln-assess': return <ScanningWorkspace />; // Combined with Scanning
      case 'webapp': return <WebSecurityWorkspace />;
      case 'api-sec': return <WebSecurityWorkspace />; // Combined with WebApp
      case 'wireless': return <ReconDashboard />; // Combined
      case 'ad-assess': return <EnumerationWorkspace />; // Combined
      case 'password-sec': return <ExploitationWorkspace />;
      case 'exploitation': return <ExploitationWorkspace />;
      case 'post-exploit': return <PostExploitation />;
      case 'reporting': return <ReportingCenter />;
      default: return <OffSecDashboard />;
    }
  };

  return (
    <EthicalHackingWorkspace activeSection={activeSection} onSectionChange={(s) => { setActiveSection(s); setSelectedTool(null); setSelectedEngagement(null); }}>
      {renderContent()}
    </EthicalHackingWorkspace>
  );
}
