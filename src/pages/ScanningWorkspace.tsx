import React from 'react';
import { Radar, Activity, Zap, ShieldAlert, Cpu } from 'lucide-react';

const ScanningWorkspace = () => {
  return (
    <div style={{ backgroundColor: '#0f172a', color: '#f8fafc', minHeight: '100vh', padding: '2rem', fontFamily: 'Inter, sans-serif' }}>
      <header style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2rem', borderBottom: '1px solid #1e293b', paddingBottom: '1rem' }}>
        <Radar size={28} color="#38bdf8" />
        <h1 style={{ margin: 0, fontSize: '1.75rem', fontWeight: 600, color: '#38bdf8' }}>Scanning Workspace</h1>
      </header>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '1.5rem' }}>
        <div style={{ backgroundColor: '#1e293b', padding: '1.5rem', borderRadius: '0.75rem', border: '1px solid #334155' }}>
          <h3 style={{ margin: '0 0 1rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#e2e8f0' }}><Activity size={18}/> Nmap Integration</h3>
          <div style={{ backgroundColor: '#0f172a', padding: '1rem', borderRadius: '0.375rem', fontFamily: 'monospace', color: '#10b981', fontSize: '0.875rem', lineHeight: 1.5 }}>
            $ nmap -sV -sC -p- 10.10.10.5<br/>
            Starting Nmap 7.92...<br/>
            22/tcp open  ssh     OpenSSH 8.2p1<br/>
            80/tcp open  http    Apache httpd 2.4.41<br/>
            443/tcp open ssl/http Apache httpd<br/>
            Nmap done: 1 IP address scanned in 45.2s
          </div>
        </div>
        <div style={{ backgroundColor: '#1e293b', padding: '1.5rem', borderRadius: '0.75rem', border: '1px solid #334155' }}>
          <h3 style={{ margin: '0 0 1rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#e2e8f0' }}><ShieldAlert size={18}/> Vulnerability Status</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <div style={{ padding: '1rem', backgroundColor: 'rgba(239, 68, 68, 0.1)', border: '1px solid #ef4444', borderRadius: '0.375rem', color: '#fca5a5' }}>
              <strong>Critical:</strong> CVE-2021-44228 (Log4Shell) on 10.10.10.12
            </div>
            <div style={{ padding: '1rem', backgroundColor: 'rgba(245, 158, 11, 0.1)', border: '1px solid #f59e0b', borderRadius: '0.375rem', color: '#fcd34d' }}>
              <strong>High:</strong> Outdated Apache (2.4.41) on 10.10.10.5
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export { ScanningWorkspace };
