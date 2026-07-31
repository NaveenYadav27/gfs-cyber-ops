
import React, { useState, useEffect } from 'react';
import { useStore } from '@/store/useStore';
import { PageHeader } from '@/components/layout/PageHeader';
import NetworkTopology from '@/components/enterprise/NetworkTopology';
import ActiveDirectoryTree from '@/components/enterprise/ActiveDirectoryTree';
import { UnifiedTimeline } from '@/components/enterprise/UnifiedTimeline';
import { InvestigationGraph } from '@/components/enterprise/InvestigationGraph';
import ExecutiveCommandCenter from '@/components/enterprise/ExecutiveCommandCenter';
import EnterpriseAssistant from '@/components/ai/EnterpriseAssistant';
import { Globe, Shield, Activity, Scale } from 'lucide-react';
import '@/components/enterprise/UnifiedTimeline.css';

export function OperationalWorkspace() {
  const { currentPage, setCurrentPage } = useStore();
  const [activeTab, setActiveTab] = useState(currentPage === 'ent-ad' ? 'ad' : 'topology');

  // Sync sidebar navigation with inner tabs
  useEffect(() => {
    if (currentPage === 'ent-topology') setActiveTab('topology');
    if (currentPage === 'ent-ad') setActiveTab('ad');
  }, [currentPage]);

  const handleTabChange = (tab: 'topology' | 'ad') => {
    setActiveTab(tab);
    setCurrentPage(tab === 'topology' ? 'ent-topology' : 'ent-ad');
  };

  // Intelligent Routing based on the requested Enterprise Domain
  const renderContent = () => {
    if (currentPage === 'ent-exec') {
      return <ExecutiveCommandCenter />;
    }
    if (currentPage === 'ent-topology' || currentPage === 'ent-ad') {
      return (
        <div className="space-y-6">
          <div className="flex gap-4 border-b border-[var(--color-gfs-border-light)] pb-2">
            <button onClick={() => handleTabChange('topology')} className={`px-4 py-2 text-sm font-medium rounded-md ${activeTab === 'topology' ? 'bg-[var(--color-gfs-accent)] text-white' : 'text-[var(--color-gfs-text-muted)] hover:bg-[var(--color-gfs-hover)]'}`}>Network Topology</button>
            <button onClick={() => handleTabChange('ad')} className={`px-4 py-2 text-sm font-medium rounded-md ${activeTab === 'ad' ? 'bg-[var(--color-gfs-accent)] text-white' : 'text-[var(--color-gfs-text-muted)] hover:bg-[var(--color-gfs-hover)]'}`}>Active Directory</button>
          </div>
          {activeTab === 'topology' ? <NetworkTopology /> : <ActiveDirectoryTree />}
        </div>
      );
    }
    if (currentPage === 'ent-investigation') {
      return (
        <div className="grid grid-cols-2 gap-6 h-[800px]">
          <div className="h-full overflow-hidden"><InvestigationGraph /></div>
          <div className="h-full overflow-hidden border border-[var(--color-gfs-border)] rounded-lg bg-[var(--color-gfs-bg)]"><UnifiedTimeline /></div>
        </div>
      );
    }
    
    // Default Fallback
    return <ExecutiveCommandCenter />;
  };

  const getHeader = () => {
    if (currentPage === 'ent-exec') return { title: 'Executive Command Center', icon: Globe };
    if (currentPage === 'ent-topology' || currentPage === 'ent-ad') return { title: 'Enterprise Digital Twin', icon: Activity };
    if (currentPage === 'ent-investigation') return { title: 'Enterprise Investigation Engine', icon: Shield };
    return { title: 'Enterprise Intelligence', icon: Globe };
  };

  const header = getHeader();
  const Icon = header.icon;

  return (
    <div className="space-y-6 relative pb-20">
      <PageHeader 
        icon={<Icon className="w-5 h-5 text-[var(--color-gfs-accent)]" />}
        title={header.title}
        subtitle="Connected Enterprise Graph Database"
      />
      {renderContent()}
      
      {/* Pervasive Enterprise AI Assistant Overlay */}
      <EnterpriseAssistant />
    </div>
  );
}
