import React from 'react';
import { Shield, Activity, Target, Zap, Crosshair, AlertTriangle, Terminal, Database, Server } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { PageHeader } from '@/components/layout/PageHeader';
import { Badge } from '@/components/ui/Badge';

export function OffSecDashboard() {
  return (
    <div className="space-y-6">
      <PageHeader 
        icon={<Crosshair className="w-6 h-6 text-[var(--color-gfs-accent)]" />}
        title="Offensive Security Dashboard"
        subtitle="High-level metrics for engagements, red team activity, and attack chains."
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="!p-4">
          <div className="text-sm font-semibold text-[var(--color-gfs-text-muted)] mb-2 flex items-center gap-2 uppercase tracking-wider">
            <Target className="w-4 h-4 text-[var(--color-gfs-accent)]" /> Active Engagements
          </div>
          <div className="text-3xl font-bold text-white">4</div>
          <div className="text-xs text-[var(--color-gfs-green)] mt-1">+1 this week</div>
        </Card>
        <Card className="!p-4">
          <div className="text-sm font-semibold text-[var(--color-gfs-text-muted)] mb-2 flex items-center gap-2 uppercase tracking-wider">
            <AlertTriangle className="w-4 h-4 text-[var(--color-gfs-yellow)]" /> Vulnerabilities Found
          </div>
          <div className="text-3xl font-bold text-white">142</div>
          <div className="text-xs text-[var(--color-gfs-red)] mt-1">12 Critical</div>
        </Card>
        <Card className="!p-4">
          <div className="text-sm font-semibold text-[var(--color-gfs-text-muted)] mb-2 flex items-center gap-2 uppercase tracking-wider">
            <Terminal className="w-4 h-4 text-[var(--color-gfs-accent)]" /> Active Shells
          </div>
          <div className="text-3xl font-bold text-white">8</div>
          <div className="text-xs text-[var(--color-gfs-text-muted)] mt-1">Across 3 targets</div>
        </Card>
        <Card className="!p-4">
          <div className="text-sm font-semibold text-[var(--color-gfs-text-muted)] mb-2 flex items-center gap-2 uppercase tracking-wider">
            <Database className="w-4 h-4 text-[var(--color-gfs-blue)]" /> Credentials Dumped
          </div>
          <div className="text-3xl font-bold text-white">3,204</div>
          <div className="text-xs text-[var(--color-gfs-text-muted)] mt-1">NTLM & Cleartext</div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card className="!p-6">
            <h2 className="text-xl font-bold text-white flex items-center gap-2 mb-6 pb-3 border-b border-[var(--color-gfs-border-light)]">
              <Zap className="w-5 h-5 text-[var(--color-gfs-accent)]" /> Recent Attack Chains
            </h2>
            <div className="space-y-4 relative before:content-[''] before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-[var(--color-gfs-border-light)]">
              <div className="relative pl-8">
                <div className="absolute left-1 top-1.5 w-3 h-3 bg-[var(--color-gfs-green)] rounded-full border-2 border-[var(--color-gfs-surface)]"></div>
                <div className="font-semibold text-white">Initial Access: Spearphishing</div>
                <div className="text-xs text-[var(--color-gfs-text-muted)] mt-1">2 hours ago • Project Phoenix</div>
              </div>
              <div className="relative pl-8">
                <div className="absolute left-1 top-1.5 w-3 h-3 bg-[var(--color-gfs-accent)] rounded-full border-2 border-[var(--color-gfs-surface)]"></div>
                <div className="font-semibold text-white">Privilege Escalation: PrintNightmare</div>
                <div className="text-xs text-[var(--color-gfs-text-muted)] mt-1">45 mins ago • DC-PROD-01</div>
              </div>
              <div className="relative pl-8">
                <div className="absolute left-1 top-1.5 w-3 h-3 bg-[var(--color-gfs-accent)] rounded-full border-2 border-[var(--color-gfs-surface)]"></div>
                <div className="font-semibold text-white">Lateral Movement: Pass-the-Hash</div>
                <div className="text-xs text-[var(--color-gfs-text-muted)] mt-1">10 mins ago • ADMIN-WS-05</div>
              </div>
            </div>
          </Card>
        </div>
        
        <div>
          <Card className="!p-6 h-full">
            <h2 className="text-xl font-bold text-white flex items-center gap-2 mb-6 pb-3 border-b border-[var(--color-gfs-border-light)]">
              <Activity className="w-5 h-5 text-[var(--color-gfs-accent)]" /> Tool Activity
            </h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center pb-3 border-b border-[var(--color-gfs-border-light)]">
                <div className="flex items-center gap-2 text-white">
                  <span className="p-1.5 bg-[var(--color-gfs-accent)]/10 rounded"><Target size={14} className="text-[var(--color-gfs-accent)]" /></span> Nmap
                </div>
                <span className="font-semibold text-[var(--color-gfs-accent)]">24 scans</span>
              </div>
              <div className="flex justify-between items-center pb-3 border-b border-[var(--color-gfs-border-light)]">
                <div className="flex items-center gap-2 text-white">
                  <span className="p-1.5 bg-[var(--color-gfs-red)]/10 rounded"><Terminal size={14} className="text-[var(--color-gfs-red)]" /></span> Metasploit
                </div>
                <span className="font-semibold text-[var(--color-gfs-accent)]">12 exploits</span>
              </div>
              <div className="flex justify-between items-center pb-3 border-b border-[var(--color-gfs-border-light)]">
                <div className="flex items-center gap-2 text-white">
                  <span className="p-1.5 bg-[var(--color-gfs-blue)]/10 rounded"><Database size={14} className="text-[var(--color-gfs-blue)]" /></span> SQLMap
                </div>
                <span className="font-semibold text-[var(--color-gfs-accent)]">5 targets</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
