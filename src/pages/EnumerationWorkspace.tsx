import React from 'react';
import { Users, FolderTree, Key, HardDrive, Share2 } from 'lucide-react';

const EnumerationWorkspace = () => {
  return (
    <div style={{ backgroundColor: '#0f172a', color: '#f8fafc', minHeight: '100vh', padding: '2rem', fontFamily: 'Inter, sans-serif' }}>
      <header style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2rem', borderBottom: '1px solid #1e293b', paddingBottom: '1rem' }}>
        <FolderTree size={28} color="#38bdf8" />
        <h1 style={{ margin: 0, fontSize: '1.75rem', fontWeight: 600, color: '#38bdf8' }}>Enumeration Workspace</h1>
      </header>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '1.5rem' }}>
        <div style={{ backgroundColor: '#1e293b', padding: '1.5rem', borderRadius: '0.75rem', border: '1px solid #334155' }}>
          <h3 style={{ margin: '0 0 1rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#e2e8f0' }}><Share2 size={18}/> SMB Enumeration</h3>
          <div style={{ backgroundColor: '#0f172a', padding: '1rem', borderRadius: '0.375rem', fontFamily: 'monospace', color: '#a5b4fc', fontSize: '0.875rem', lineHeight: 1.5 }}>
            Sharename       Type      Comment<br/>
            ---------       ----      -------<br/>
            IPC$            IPC       IPC Service<br/>
            Finance         Disk      Restricted<br/>
            Public          Disk      Public Share (READ ONLY)
          </div>
        </div>
        <div style={{ backgroundColor: '#1e293b', padding: '1.5rem', borderRadius: '0.75rem', border: '1px solid #334155' }}>
          <h3 style={{ margin: '0 0 1rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#e2e8f0' }}><HardDrive size={18}/> Directory Bruteforcing (Gobuster)</h3>
          <div style={{ backgroundColor: '#0f172a', padding: '1rem', borderRadius: '0.375rem', fontFamily: 'monospace', color: '#10b981', fontSize: '0.875rem', lineHeight: 1.5 }}>
            /admin                (Status: 401)<br/>
            /uploads              (Status: 200)<br/>
            /api                  (Status: 301)<br/>
            /.git/HEAD            (Status: 200) <span style={{ color: '#ef4444' }}>[!]</span>
          </div>
        </div>
      </div>
    </div>
  );
};
export { EnumerationWorkspace };
