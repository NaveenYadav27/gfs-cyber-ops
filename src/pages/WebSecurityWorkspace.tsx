import React from 'react';
import { Shield, AlertTriangle, Code, Network, Globe } from 'lucide-react';

const WebSecurityWorkspace = () => {
  return (
    <div style={{ backgroundColor: '#0f172a', color: '#f8fafc', minHeight: '100vh', padding: '2rem', fontFamily: 'Inter, sans-serif' }}>
      <header style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2rem', borderBottom: '1px solid #1e293b', paddingBottom: '1rem' }}>
        <Shield size={28} color="#38bdf8" />
        <h1 style={{ margin: 0, fontSize: '1.75rem', fontWeight: 600, color: '#38bdf8' }}>Web Security Workspace</h1>
      </header>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '1.5rem' }}>
        <div style={{ backgroundColor: '#1e293b', padding: '1.5rem', borderRadius: '0.75rem', border: '1px solid #334155', gridColumn: '1 / -1' }}>
          <h3 style={{ margin: '0 0 1rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#e2e8f0' }}><Network size={18}/> Intercepted Requests (Burp Mock)</h3>
          <div style={{ backgroundColor: '#0f172a', padding: '1rem', borderRadius: '0.375rem', fontFamily: 'monospace', color: '#e2e8f0', fontSize: '0.875rem', lineHeight: 1.5 }}>
            <span style={{ color: '#38bdf8', fontWeight: 600 }}>POST</span> /api/v1/auth/login HTTP/1.1<br/>
            Host: app.enterprise.com<br/>
            Content-Type: application/json<br/><br/>
            <span style={{ color: '#10b981' }}>{`{"username": "admin' OR '1'='1", "password": "password"}`}</span>
          </div>
        </div>
        <div style={{ backgroundColor: '#1e293b', padding: '1.5rem', borderRadius: '0.75rem', border: '1px solid #334155' }}>
          <h3 style={{ margin: '0 0 1rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#e2e8f0' }}><AlertTriangle size={18}/> OWASP Top 10 Findings</h3>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, color: '#94a3b8' }}>
            <li style={{ padding: '0.75rem 0', borderBottom: '1px solid #334155', display: 'flex', justifyContent: 'space-between' }}>
              <span>A03:2021-Injection</span>
              <span style={{ color: '#ef4444', fontWeight: 600 }}>Critical</span>
            </li>
            <li style={{ padding: '0.75rem 0', borderBottom: '1px solid #334155', display: 'flex', justifyContent: 'space-between' }}>
              <span>A01:2021-Broken Access Control</span>
              <span style={{ color: '#f59e0b', fontWeight: 600 }}>High</span>
            </li>
            <li style={{ padding: '0.75rem 0', display: 'flex', justifyContent: 'space-between' }}>
              <span>A05:2021-Security Misconfiguration</span>
              <span style={{ color: '#f59e0b', fontWeight: 600 }}>High</span>
            </li>
          </ul>
        </div>
        <div style={{ backgroundColor: '#1e293b', padding: '1.5rem', borderRadius: '0.75rem', border: '1px solid #334155' }}>
          <h3 style={{ margin: '0 0 1rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#e2e8f0' }}><Code size={18}/> API Security Testing</h3>
          <div style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: 1.5 }}>
            <p style={{ margin: '0 0 0.5rem 0' }}>Testing <code>/api/v2/users/1/profile</code>...</p>
            <div style={{ padding: '0.75rem', backgroundColor: 'rgba(239, 68, 68, 0.1)', border: '1px solid #ef4444', borderRadius: '0.375rem', color: '#fca5a5' }}>
              <strong>BOLA (IDOR) detected:</strong> User ID 2 profile accessed with User ID 1 token.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export { WebSecurityWorkspace };
