import React, { useState } from 'react';
import { useStore } from '@/store/useStore';
import { PageHeader } from '@/components/layout/PageHeader';
import { Card } from '@/components/ui/Card';
import { SERVERS, INCIDENTS, ALERTS, DEPARTMENTS, EMPLOYEES, APPLICATIONS, GRAPH } from '@/data/enterprise';
import { Globe, Shield, AlertTriangle, Scale, Monitor, Search as SearchIcon, Filter, Activity, Server, Users, BrainCircuit } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Badge } from '@/components/ui/Badge';

export function OperationalWorkspace() {
  const { currentPage } = useStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEntity, setSelectedEntity] = useState<any>(null);

  const getPageConfig = () => {
    switch (currentPage) {
      // ITSM
      case 'itsm-incidents': return { title: 'ITSM Incidents', subtitle: 'Global Service Management', icon: AlertTriangle, data: Object.values(INCIDENTS) };
      case 'itsm-cmdb': return { title: 'CMDB', subtitle: 'Configuration Management', icon: Database, data: Object.values(SERVERS) };
      // NOC
      case 'noc-dashboard': return { title: 'NOC Operations', subtitle: 'Real-time Network Health', icon: Activity, data: Object.values(SERVERS) };
      case 'noc-servers': return { title: 'Server Fleet', subtitle: 'Compute Infrastructure', icon: Server, data: Object.values(SERVERS) };
      // SOC
      case 'soc-alerts': return { title: 'Alert Queue', subtitle: 'Active Security Detections', icon: Shield, data: Object.values(ALERTS) };
      // GRC
      case 'grc-dashboard': return { title: 'Risk Register', subtitle: 'Enterprise Compliance', icon: Scale, data: Object.values(DEPARTMENTS) };
      case 'grc-risk': return { title: 'Risk Assessment', subtitle: 'Threat Landscape', icon: AlertTriangle, data: Object.values(ALERTS) };
      // EXEC
      case 'exec-dashboard': return { title: 'Executive Operations', subtitle: 'Enterprise Health', icon: Globe, data: Object.values(DEPARTMENTS) };
      default: return { title: \`Workspace: \${currentPage}\`, subtitle: 'Enterprise Data Engine', icon: Globe, data: [] };
    }
  };

  const config = getPageConfig();
  const Icon = config.icon;

  const filteredData = config.data.filter(item => 
    JSON.stringify(item).toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <PageHeader 
        icon={<Icon className="w-5 h-5 text-[var(--color-gfs-accent)]" />}
        title={config.title}
        subtitle={config.subtitle}
      />

      {/* Global Action Bar */}
      <div className="flex items-center gap-4 bg-[var(--color-gfs-deep)] p-3 rounded-lg border border-[var(--color-gfs-border-light)]">
        <div className="relative flex-1">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-gfs-text-muted)]" />
          <input
            type="text"
            placeholder="Search enterprise graph (e.g. WEB-01, emp-2, Active Directory)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[var(--color-gfs-bg)] border border-[var(--color-gfs-border)] rounded-md pl-9 pr-4 py-2 text-sm focus:outline-none focus:border-[var(--color-gfs-accent)]"
          />
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-[var(--color-gfs-hover)] rounded-md text-sm">
          <Filter className="w-4 h-4" /> Filter
        </button>
        <button className="flex items-center gap-2 px-4 py-2 bg-[var(--color-gfs-accent)]/10 text-[var(--color-gfs-accent)] rounded-md text-sm font-medium border border-[var(--color-gfs-accent)]/30">
          <BrainCircuit className="w-4 h-4" /> Ask GFS AI
        </button>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Main Data Table */}
        <Card className="col-span-2 p-0 overflow-hidden flex flex-col h-[600px]">
          <div className="p-4 border-b border-[var(--color-gfs-border-light)] flex justify-between items-center bg-[var(--color-gfs-bg)]">
            <h3 className="text-sm font-semibold text-[var(--color-gfs-text)]">Operational Data</h3>
            <span className="text-xs text-[var(--color-gfs-text-muted)]">{filteredData.length} records found</span>
          </div>
          <div className="flex-1 overflow-auto">
            <table className="w-full text-left text-xs text-[var(--color-gfs-text-secondary)]">
              <thead className="bg-[var(--color-gfs-bg)] border-b border-[var(--color-gfs-border)] sticky top-0 z-10">
                <tr>
                  <th className="p-3 font-medium">Entity ID</th>
                  <th className="p-3 font-medium">Context / Details</th>
                  <th className="p-3 font-medium">Status</th>
                  <th className="p-3 font-medium">Primary Owner</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((item: any, i: number) => (
                  <motion.tr 
                    key={item.id}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.03 }}
                    onClick={() => setSelectedEntity(item)}
                    className={\`border-b border-[var(--color-gfs-border-light)] hover:bg-[var(--color-gfs-hover)] cursor-pointer \${selectedEntity?.id === item.id ? 'bg-[var(--color-gfs-accent)]/5' : ''}\`}
                  >
                    <td className="p-3 font-mono text-[var(--color-gfs-accent)]">{item.id}</td>
                    <td className="p-3 font-medium text-[var(--color-gfs-text)]">{item.title || item.name || item.hostname || item.description}</td>
                    <td className="p-3">
                      <Badge variant={item.status === 'active' || item.severity === 'critical' ? 'destructive' : 'default'}>
                        {item.status || item.severity || item.type || 'Operational'}
                      </Badge>
                    </td>
                    <td className="p-3">{item.ownerId || item.assignedToId || item.headId || 'System'}</td>
                  </motion.tr>
                ))}
                {filteredData.length === 0 && (
                  <tr>
                    <td colSpan={4} className="p-8 text-center text-[var(--color-gfs-text-muted)]">No relational data matched the query.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Digital Twin / Relationship Explorer */}
        <Card className="col-span-1 p-0 overflow-hidden flex flex-col h-[600px]">
          <div className="p-4 border-b border-[var(--color-gfs-border-light)] bg-[var(--color-gfs-bg)]">
            <h3 className="text-sm font-semibold text-[var(--color-gfs-text)]">Digital Twin Inspector</h3>
          </div>
          <div className="p-4 overflow-y-auto flex-1">
            <AnimatePresence mode="wait">
              {selectedEntity ? (
                <motion.div 
                  key={selectedEntity.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Globe className="w-5 h-5 text-[var(--color-gfs-accent)]" />
                      <h4 className="text-lg font-bold text-[var(--color-gfs-text)]">{selectedEntity.hostname || selectedEntity.title || selectedEntity.name}</h4>
                    </div>
                    <p className="text-sm text-[var(--color-gfs-text-muted)] font-mono">{selectedEntity.id}</p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-xs">
                    <div className="space-y-1">
                      <div className="text-[var(--color-gfs-text-muted)]">IP Address</div>
                      <div className="font-mono text-[var(--color-gfs-text)]">{selectedEntity.ip || 'N/A'}</div>
                    </div>
                    <div className="space-y-1">
                      <div className="text-[var(--color-gfs-text-muted)]">OS / Platform</div>
                      <div className="text-[var(--color-gfs-text)]">{selectedEntity.os || selectedEntity.type || 'N/A'}</div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h5 className="text-xs font-semibold text-[var(--color-gfs-text-muted)] uppercase tracking-wider border-b border-[var(--color-gfs-border-light)] pb-1">Entity Relationships</h5>
                    
                    {selectedEntity.ownerId && (
                      <div className="flex items-center gap-2 p-2 bg-[var(--color-gfs-deep)] rounded-md border border-[var(--color-gfs-border-light)]">
                        <Users className="w-4 h-4 text-blue-400" />
                        <div>
                          <div className="text-xs font-medium text-[var(--color-gfs-text)]">Owner / Assignee</div>
                          <div className="text-[10px] font-mono text-[var(--color-gfs-text-muted)]">{selectedEntity.ownerId || selectedEntity.assignedToId}</div>
                        </div>
                      </div>
                    )}

                    {selectedEntity.relatedServerIds && selectedEntity.relatedServerIds.map((srvId: string) => (
                      <div key={srvId} className="flex items-center gap-2 p-2 bg-[var(--color-gfs-deep)] rounded-md border border-[var(--color-gfs-border-light)]">
                        <Server className="w-4 h-4 text-green-400" />
                        <div>
                          <div className="text-xs font-medium text-[var(--color-gfs-text)]">Impacted Server</div>
                          <div className="text-[10px] font-mono text-[var(--color-gfs-text-muted)]">{srvId}</div>
                        </div>
                      </div>
                    ))}

                    {/* Dynamic Graph Lookups (if it's a server, look for alerts) */}
                    {selectedEntity.hostname && GRAPH.getRelatedAlerts(selectedEntity.id).map((alt: any) => (
                      <div key={alt.id} className="flex items-center gap-2 p-2 bg-[var(--color-gfs-deep)] rounded-md border border-[var(--color-gfs-border-light)] border-l-2 border-l-red-500">
                        <Shield className="w-4 h-4 text-red-500" />
                        <div>
                          <div className="text-xs font-medium text-[var(--color-gfs-text)]">Linked Alert: {alt.title}</div>
                          <div className="text-[10px] font-mono text-[var(--color-gfs-text-muted)]">{alt.source} - {alt.severity}</div>
                        </div>
                      </div>
                    ))}
                    
                    {selectedEntity.hostname && GRAPH.getRelatedIncidents(selectedEntity.id).map((inc: any) => (
                      <div key={inc.id} className="flex items-center gap-2 p-2 bg-[var(--color-gfs-deep)] rounded-md border border-[var(--color-gfs-border-light)] border-l-2 border-l-orange-500">
                        <AlertTriangle className="w-4 h-4 text-orange-500" />
                        <div>
                          <div className="text-xs font-medium text-[var(--color-gfs-text)]">Linked Incident: {inc.title}</div>
                          <div className="text-[10px] font-mono text-[var(--color-gfs-text-muted)]">{inc.status} - {inc.severity}</div>
                        </div>
                      </div>
                    ))}

                  </div>
                </motion.div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-3 opacity-60">
                  <Globe className="w-12 h-12 text-[var(--color-gfs-text-muted)]" />
                  <div>
                    <p className="text-sm font-medium text-[var(--color-gfs-text)]">No Entity Selected</p>
                    <p className="text-xs text-[var(--color-gfs-text-muted)]">Select a record from the table to inspect its Digital Twin relationships.</p>
                  </div>
                </div>
              )}
            </AnimatePresence>
          </div>
        </Card>
      </div>
    </div>
  );
}
