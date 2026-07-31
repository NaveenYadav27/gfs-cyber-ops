import React, { useState } from 'react';
import { Server, Cloud, Database, Network, Shield, AlertTriangle, Search } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { PageHeader } from '@/components/layout/PageHeader';
import { Badge } from '@/components/ui/Badge';

export function AssetInventoryPage() {
  const ASSETS = [
    { id: 'SRV-001', name: 'DC-PROD-01', type: 'Server', os: 'Windows Server 2022', status: 'Online', risk: 'High', owner: 'IT Ops' },
    { id: 'CLD-102', name: 'AWS-EKS-Cluster', type: 'Cloud', os: 'Linux', status: 'Online', risk: 'Medium', owner: 'Cloud Arch' },
    { id: 'NET-441', name: 'FW-EDGE-01', type: 'Network', os: 'PAN-OS', status: 'Online', risk: 'Critical', owner: 'Network Sec' },
  ];

  return (
    <div className="space-y-6">
      <PageHeader 
        icon={<Server className="w-6 h-6 text-[var(--color-gfs-accent)]" />}
        title="Asset Inventory"
        subtitle="Enterprise CMDB and Asset Risk Posture"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="!p-4">
          <div className="text-sm font-semibold text-[var(--color-gfs-text-muted)] mb-2 uppercase">Total Assets</div>
          <div className="text-3xl font-bold text-white">4,281</div>
        </Card>
        <Card className="!p-4 border-l-4 border-l-[var(--color-gfs-red)]">
          <div className="text-sm font-semibold text-[var(--color-gfs-text-muted)] mb-2 uppercase">Critical Assets</div>
          <div className="text-3xl font-bold text-white">124</div>
        </Card>
        <Card className="!p-4 border-l-4 border-l-[var(--color-gfs-orange)]">
          <div className="text-sm font-semibold text-[var(--color-gfs-text-muted)] mb-2 uppercase">Internet Facing</div>
          <div className="text-3xl font-bold text-white">45</div>
        </Card>
        <Card className="!p-4 border-l-4 border-l-[var(--color-gfs-yellow)]">
          <div className="text-sm font-semibold text-[var(--color-gfs-text-muted)] mb-2 uppercase">Unsupported OS</div>
          <div className="text-3xl font-bold text-white">12</div>
        </Card>
      </div>
      <div className="bg-[var(--color-gfs-surface)] rounded-xl border border-[var(--color-gfs-border-light)] overflow-hidden">
        <div className="p-4 border-b border-[var(--color-gfs-border-light)] flex gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-gfs-text-muted)]" />
            <input placeholder="Search assets by name, IP, or owner..." className="w-full bg-[#0b0f19] border border-[var(--color-gfs-border-light)] rounded pl-10 pr-4 py-2 text-white text-sm" />
          </div>
        </div>
        <table className="w-full text-left text-sm text-[var(--color-gfs-text)]">
          <thead className="bg-[#0b0f19] text-[var(--color-gfs-text-muted)] border-b border-[var(--color-gfs-border-light)]">
            <tr>
              <th className="p-4 font-semibold">Name</th>
              <th className="p-4 font-semibold">Type</th>
              <th className="p-4 font-semibold">OS</th>
              <th className="p-4 font-semibold">Risk</th>
              <th className="p-4 font-semibold">Owner</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--color-gfs-border-light)]">
            {ASSETS.map(asset => (
              <tr key={asset.id} className="hover:bg-[var(--color-gfs-hover)]">
                <td className="p-4 font-bold text-white">{asset.name}</td>
                <td className="p-4"><Badge variant="default">{asset.type}</Badge></td>
                <td className="p-4">{asset.os}</td>
                <td className="p-4"><Badge variant={asset.risk === 'Critical' ? 'critical' : asset.risk === 'High' ? 'high' : 'medium'}>{asset.risk}</Badge></td>
                <td className="p-4 text-[var(--color-gfs-text-muted)]">{asset.owner}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
