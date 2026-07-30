// src/pages/ThreatIntelPage.tsx
import { useState } from 'react';
import { Brain, Globe, AlertTriangle, Target, ExternalLink, Search, Filter, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { PageHeader } from '@/components/layout/PageHeader';

const THREAT_ACTORS = [
  { name: 'Silk Typhoon', origin: 'China (PRC)', targeting: 'Financial Services, Critical Infrastructure', severity: 'critical', status: 'ACTIVE', campaigns: ['Operation DarkShadow', 'APT-FS-2024-19'], ttps: ['T1566', 'T1059', 'T1071', 'T1486'], lastActivity: 'This week', description: 'Chinese state-sponsored group targeting Indian financial sector for economic espionage and SWIFT compromise.' },
  { name: 'APT38', origin: 'North Korea (DPRK)', targeting: 'SWIFT, Central Banking', severity: 'critical', status: 'MONITORING', campaigns: ['Lazarus Heist'], ttps: ['T1190', 'T1003', 'T1569'], lastActivity: '3 months ago', description: 'North Korean group responsible for the Bangladesh Bank heist. Actively targeting Indian bank SWIFT implementations.' },
  { name: 'OceanLotus', origin: 'Vietnam', targeting: 'Banking, Telecom', severity: 'high', status: 'WATCHING', campaigns: ['APT32-Finance-2024'], ttps: ['T1566.001', 'T1059.001', 'T1027'], lastActivity: '6 weeks ago', description: 'Vietnamese APT group targeting Indian financial institutions for competitive intelligence.' },
  { name: 'Patchwork', origin: 'India (Domestic)', targeting: 'Internal espionage', severity: 'medium', status: 'MONITORING', campaigns: [], ttps: ['T1566', 'T1105'], lastActivity: '2 months ago', description: 'Domestic threat actor — monitoring for insider threat correlation.' },
];

const IOC_FEEDS = [
  { name: 'FIU-India Mule Accounts', type: 'Financial', iocCount: 12847, lastSync: '5 min ago', status: 'active' },
  { name: 'NPCI Fraud Patterns', type: 'Financial', iocCount: 3421, lastSync: '12 min ago', status: 'active' },
  { name: 'MITRE ATT&CK Framework', type: 'Framework', iocCount: 201, lastSync: '1 day ago', status: 'active' },
  { name: 'AlienVault OTX', type: 'Open Source', iocCount: 892471, lastSync: '1 hr ago', status: 'active' },
  { name: 'CISA Known Exploited Vulns', type: 'Government', iocCount: 1142, lastSync: '2 hr ago', status: 'active' },
  { name: 'Microsoft Threat Intelligence', type: 'Vendor', iocCount: 234891, lastSync: '30 min ago', status: 'active' },
];

const ACTIVE_CAMPAIGNS = [
  { id: 'CMP-001', name: 'Operation DarkShadow', actor: 'Silk Typhoon', status: 'active', incidents: 6, startDate: 'Jan 15, 2025', affectedSystems: 4, description: 'Coordinated multi-stage attack targeting GFS payment infrastructure through phishing, credential theft, and ransomware.' },
  { id: 'CMP-002', name: 'APT-FS-2024-19', actor: 'Silk Typhoon', status: 'monitoring', incidents: 2, startDate: 'Dec 8, 2024', affectedSystems: 1, description: 'Suspicious reconnaissance activity targeting SWIFT messaging infrastructure.' },
  { id: 'CMP-003', name: 'UPI Mule Network Sweep', actor: 'Multiple', status: 'investigating', incidents: 3, startDate: 'Jan 20, 2025', affectedSystems: 8, description: 'Large-scale mule account network provisioned through fake merchant terminals.' },
];

export function ThreatIntelPage() {
  const [selectedActor, setSelectedActor] = useState<string | null>(null);

  return (
    <div className="space-y-4">
      <PageHeader
        icon={<Brain className="w-5 h-5 text-[var(--color-gfs-accent)]" />}
        title="Threat Intelligence"
        subtitle="GFS Cyber Threat Intelligence Center — Tracking 4 threat actors, 6 intel feeds"
      />

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        {/* Threat Actors */}
        <div className="xl:col-span-2">
          <Card delay={0} className="!p-0 overflow-hidden">
            <div className="px-4 py-2.5 border-b border-[var(--color-gfs-border-light)] flex items-center gap-2">
              <Target className="w-3.5 h-3.5 text-[var(--color-gfs-red)]" />
              <span className="text-xs font-semibold text-[var(--color-gfs-text)]">Threat Actors</span>
            </div>
            <div className="divide-y divide-[var(--color-gfs-border-light)]">
              {THREAT_ACTORS.map((actor, i) => (
                <motion.div key={actor.name} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.05 }}
                  onClick={() => setSelectedActor(selectedActor === actor.name ? null : actor.name)}
                  className={`px-4 py-3 cursor-pointer transition-colors ${selectedActor === actor.name ? 'bg-[var(--color-gfs-elevated)]' : 'hover:bg-[var(--color-gfs-hover)]'}`}>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] font-semibold text-[var(--color-gfs-text)]">{actor.name}</span>
                        <Badge variant={actor.severity === 'critical' ? 'critical' : actor.severity === 'high' ? 'high' : 'medium'}>{actor.severity}</Badge>
                        <Badge variant={actor.status === 'ACTIVE' ? 'critical' : 'default'}>{actor.status}</Badge>
                      </div>
                      <p className="text-[10px] text-[var(--color-gfs-text-muted)] mt-0.5">{actor.origin} • {actor.targeting}</p>
                      {selectedActor === actor.name && (
                        <div className="mt-2 space-y-1.5">
                          <p className="text-[10px] text-[var(--color-gfs-text-secondary)]">{actor.description}</p>
                          <div className="flex flex-wrap gap-1">
                            {actor.ttps.map((t) => <Badge key={t} variant="default">{t}</Badge>)}
                          </div>
                          {actor.campaigns.length > 0 && (
                            <div className="text-[10px] text-[var(--color-gfs-text-muted)]">Campaigns: {actor.campaigns.join(', ')}</div>
                          )}
                        </div>
                      )}
                    </div>
                    <span className="text-[10px] text-[var(--color-gfs-text-muted)]">{actor.lastActivity}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </Card>
        </div>

        <div className="space-y-4">
          {/* IOC Feeds */}
          <Card delay={0.1} className="!p-4">
            <div className="flex items-center gap-2 mb-3">
              <Globe className="w-3.5 h-3.5 text-[var(--color-gfs-blue)]" />
              <span className="text-xs font-semibold text-[var(--color-gfs-text)]">Intel Feeds</span>
            </div>
            <div className="space-y-2">
              {IOC_FEEDS.map((feed) => (
                <div key={feed.name} className="p-2.5 rounded-lg bg-[var(--color-gfs-elevated)]">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-semibold text-[var(--color-gfs-text)]">{feed.name}</span>
                    <div className="w-2 h-2 rounded-full bg-[var(--color-gfs-green)]" />
                  </div>
                  <div className="flex items-center gap-3 mt-1 text-[9px] text-[var(--color-gfs-text-muted)]">
                    <span>{feed.iocCount.toLocaleString()} IOCs</span>
                    <span>Synced: {feed.lastSync}</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Active Campaigns */}
          <Card delay={0.15} className="!p-4">
            <span className="text-[10px] text-[var(--color-gfs-text-muted)] uppercase tracking-wider">Active Campaigns</span>
            <div className="space-y-2 mt-2">
              {ACTIVE_CAMPAIGNS.map((cmp) => (
                <div key={cmp.id} className="p-2.5 rounded-lg bg-[var(--color-gfs-elevated)] border border-[var(--color-gfs-border-light)]">
                  <span className="text-[10px] font-semibold text-[var(--color-gfs-text)]">{cmp.name}</span>
                  <p className="text-[9px] text-[var(--color-gfs-text-muted)] mt-0.5">{cmp.description}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant={cmp.status === 'active' ? 'critical' : 'medium'}>{cmp.status}</Badge>
                    <span className="text-[9px] text-[var(--color-gfs-text-muted)]">{cmp.incidents} incidents</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
