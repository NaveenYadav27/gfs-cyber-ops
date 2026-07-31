import React from 'react';
import { Globe, Map, Target, Server, Database, Eye } from 'lucide-react';

const ReconDashboard = () => {
  return (
    <div style={{ backgroundColor: '#0f172a', color: '#f8fafc', minHeight: '100vh', padding: '2rem', fontFamily: 'Inter, sans-serif' }}>
      <header style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2rem', borderBottom: '1px solid #1e293b', paddingBottom: '1rem' }}>
        <Globe size={28} color="#38bdf8" />
        <h1 style={{ margin: 0, fontSize: '1.75rem', fontWeight: 600, color: '#38bdf8' }}>Reconnaissance Dashboard</h1>
      </header>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '1.5rem' }}>
        <div style={{ backgroundColor: '#1e293b', padding: '1.5rem', borderRadius: '0.75rem', border: '1px solid #334155' }}>
          <h3 style={{ margin: '0 0 1rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#e2e8f0' }}><Target size={18}/> OSINT Targets</h3>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, color: '#94a3b8' }}>
            <li style={{ padding: '0.75rem 0', borderBottom: '1px solid #334155', display: 'flex', justifyContent: 'space-between' }}>
              <span>enterprise.com</span>
              <span style={{ color: '#10b981', fontWeight: 600 }}>Active</span>
            </li>
            <li style={{ padding: '0.75rem 0', borderBottom: '1px solid #334155', display: 'flex', justifyContent: 'space-between' }}>
              <span>corp.enterprise.com</span>
              <span style={{ color: '#10b981', fontWeight: 600 }}>Active</span>
            </li>
            <li style={{ padding: '0.75rem 0', display: 'flex', justifyContent: 'space-between' }}>
              <span>dev.enterprise.com</span>
              <span style={{ color: '#f59e0b', fontWeight: 600 }}>Investigating</span>
            </li>
          </ul>
        </div>
        <div style={{ backgroundColor: '#1e293b', padding: '1.5rem', borderRadius: '0.75rem', border: '1px solid #334155' }}>
          <h3 style={{ margin: '0 0 1rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#e2e8f0' }}><Map size={18}/> Domain Map</h3>
          <div style={{ backgroundColor: '#0f172a', padding: '1rem', borderRadius: '0.375rem', fontFamily: 'monospace', color: '#a5b4fc', fontSize: '0.875rem', lineHeight: 1.5 }}>
            [*] Enumerating subdomains...<br/>
            [+] Found 142 subdomains<br/>
            [+] Mapping DNS records...<br/>
            [*] MX: mail.enterprise.com<br/>
            [*] TXT: v=spf1 include:_spf.enterprise.com ~all
          </div>
        </div>
      </div>
    </div>
  );
};
export { ReconDashboard };
