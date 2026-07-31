import React, { useState } from 'react';
import { 
  Shield, Mail, AlertTriangle, Activity, Lock, Users, Search, Paperclip, 
  Link as LinkIcon, FileText, CheckCircle, XCircle, Clock, Eye, BarChart2,
  Inbox, Send, ArrowRight, Zap, Target
} from 'lucide-react';

const mockPhishingEmails = [
  { id: 'PHISH-001', subject: 'URGENT: Payroll Update Required', sender: 'hr@company-update.com', recipient: 'john.doe@enterprise.com', date: '2026-07-31 09:12:00', status: 'Quarantined', severity: 'High' },
  { id: 'PHISH-002', subject: 'Invoice #9982 Overdue', sender: 'billing@vendor-services.net', recipient: 'finance@enterprise.com', date: '2026-07-31 11:45:00', status: 'Delivered', severity: 'Critical' },
  { id: 'PHISH-003', subject: 'Password Expiry Notification', sender: 'it-support@enteprise.com', recipient: 'sarah.smith@enterprise.com', date: '2026-07-31 14:30:00', status: 'Blocked', severity: 'Medium' }
];

const mockStats = {
  totalScanned: '1,245,892',
  inbound: '985,234',
  outbound: '260,658',
  spamBlocked: '142,500',
  phishingBlocked: '12,450',
  malwareBlocked: '3,892',
};

export const EmailSecurityPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedPhish, setSelectedPhish] = useState<any>(null);

  const renderDashboard = () => (
    <div style={styles.grid}>
      <div style={styles.card}>
        <h3 style={styles.cardTitle}><Activity size={18} /> Executive Dashboard</h3>
        <div style={styles.statsGrid}>
          <div style={styles.statBox}>
            <div style={styles.statLabel}>Total Emails Scanned</div>
            <div style={styles.statValue}>{mockStats.totalScanned}</div>
          </div>
          <div style={styles.statBox}>
            <div style={styles.statLabel}>Inbound Mail</div>
            <div style={styles.statValue}>{mockStats.inbound}</div>
          </div>
          <div style={styles.statBox}>
            <div style={styles.statLabel}>Outbound Mail</div>
            <div style={styles.statValue}>{mockStats.outbound}</div>
          </div>
          <div style={styles.statBox}>
            <div style={styles.statLabel}>Threats Blocked</div>
            <div style={styles.statValue} className="text-red">158,842</div>
          </div>
        </div>
      </div>

      <div style={styles.card}>
        <h3 style={styles.cardTitle}><Shield size={18} /> Authentication (DMARC, DKIM, SPF)</h3>
        <div style={styles.authList}>
          <div style={styles.authItem}>
            <span>SPF Validation</span>
            <span style={styles.badgeSuccess}>99.8% Pass</span>
          </div>
          <div style={styles.authItem}>
            <span>DKIM Status</span>
            <span style={styles.badgeSuccess}>99.5% Pass</span>
          </div>
          <div style={styles.authItem}>
            <span>DMARC Dashboard</span>
            <span style={styles.badgeWarning}>Policy: Quarantine</span>
          </div>
        </div>
      </div>
    </div>
  );

  const renderThreats = () => (
    <div style={styles.grid}>
      <div style={styles.card}>
        <h3 style={styles.cardTitle}><AlertTriangle size={18} /> Phishing Campaigns</h3>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>ID</th>
              <th style={styles.th}>Subject</th>
              <th style={styles.th}>Sender</th>
              <th style={styles.th}>Severity</th>
              <th style={styles.th}>Action</th>
            </tr>
          </thead>
          <tbody>
            {mockPhishingEmails.map(email => (
              <tr key={email.id} style={styles.tr}>
                <td style={styles.td}>{email.id}</td>
                <td style={styles.td}>{email.subject}</td>
                <td style={styles.td}>{email.sender}</td>
                <td style={styles.td}>
                  <span style={email.severity === 'Critical' ? styles.badgeDanger : styles.badgeWarning}>{email.severity}</span>
                </td>
                <td style={styles.td}>
                  <button style={styles.button} onClick={() => setSelectedPhish(email)}>Investigate</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div style={styles.card}>
        <h3 style={styles.cardTitle}><Lock size={18} /> Protection Status</h3>
        <div style={styles.protectionList}>
          <div style={styles.protectionItem}><CheckCircle size={16} color="#10b981" /> Exchange Online Protection: Active</div>
          <div style={styles.protectionItem}><CheckCircle size={16} color="#10b981" /> Microsoft Defender for Office: Active</div>
          <div style={styles.protectionItem}><Clock size={16} color="#f59e0b" /> Safe Links: Scanning (24ms avg)</div>
          <div style={styles.protectionItem}><Clock size={16} color="#f59e0b" /> Safe Attachments: Sandbox Active</div>
        </div>
      </div>
    </div>
  );

  const renderInvestigation = () => {
    if (!selectedPhish) return null;
    return (
      <div style={styles.investigationContainer}>
        <div style={styles.invHeader}>
          <h2>Investigation: {selectedPhish.id}</h2>
          <button style={styles.closeBtn} onClick={() => setSelectedPhish(null)}><XCircle /></button>
        </div>
        
        <div style={styles.grid}>
          <div style={styles.card}>
            <h3 style={styles.cardTitle}><Search size={18} /> Email Header Analyzer</h3>
            <pre style={styles.codeBlock}>
              Return-Path: &lt;{selectedPhish.sender}&gt;{'\n'}
              Received: from mail.vendor-services.net (192.168.1.105){'\n'}
              DKIM-Signature: v=1; a=rsa-sha256; d=vendor-services.net;{'\n'}
              Authentication-Results: spf=fail (sender IP is 192.168.1.105)
            </pre>
          </div>
          <div style={styles.card}>
            <h3 style={styles.cardTitle}><Paperclip size={18} /> Attachment Sandbox</h3>
            <div style={styles.sandboxResult}>
              <div><strong>invoice_update.pdf.exe</strong></div>
              <div style={{color: '#ef4444'}}>Malicious - Ransomware detected (LockBit variant)</div>
              <div>Static Analysis: Suspicious API calls found</div>
            </div>
          </div>
          <div style={styles.card}>
            <h3 style={styles.cardTitle}><LinkIcon size={18} /> URL Reputation</h3>
            <div style={styles.urlResult}>
              <div>http://company-update.com/login</div>
              <div style={{color: '#ef4444'}}>Phishing Site - Credential Harvester</div>
              <div>Registered: 2 days ago</div>
            </div>
          </div>
          <div style={styles.card}>
            <h3 style={styles.cardTitle}><Users size={18} /> Correlation</h3>
            <div><strong>Related Users:</strong> 5 (2 VIPs)</div>
            <div><strong>Related Devices:</strong> 3 Endpoints</div>
            <div><strong>Incident Correlation:</strong> INC-29938 (BEC Monitoring)</div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.pageTitle}><Mail size={28} /> Email Security Operations Center</h1>
        <div style={styles.tabs}>
          <button style={activeTab === 'dashboard' ? styles.activeTab : styles.tab} onClick={() => setActiveTab('dashboard')}>Dashboard</button>
          <button style={activeTab === 'threats' ? styles.activeTab : styles.tab} onClick={() => setActiveTab('threats')}>Threat Campaigns</button>
          <button style={activeTab === 'investigations' ? styles.activeTab : styles.tab} onClick={() => setActiveTab('investigations')}>Investigations</button>
        </div>
      </header>
      
      <main style={styles.main}>
        {selectedPhish ? renderInvestigation() : (
          <>
            {activeTab === 'dashboard' && renderDashboard()}
            {activeTab === 'threats' && renderThreats()}
            {activeTab === 'investigations' && (
              <div style={styles.card}>
                <h3 style={styles.cardTitle}><Target size={18} /> Active Investigations (BEC & VIPs)</h3>
                <p style={{color: '#9ca3af'}}>Select a threat from the Threat Campaigns tab to begin a detailed investigation.</p>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: {
    backgroundColor: '#0f172a',
    color: '#f8fafc',
    minHeight: '100vh',
    fontFamily: 'Inter, system-ui, sans-serif',
    padding: '2rem',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '2rem',
    borderBottom: '1px solid #1e293b',
    paddingBottom: '1rem',
  },
  pageTitle: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    margin: 0,
    fontSize: '1.75rem',
    fontWeight: 600,
    color: '#38bdf8',
  },
  tabs: {
    display: 'flex',
    gap: '0.5rem',
  },
  tab: {
    backgroundColor: 'transparent',
    border: 'none',
    color: '#94a3b8',
    padding: '0.5rem 1rem',
    cursor: 'pointer',
    fontSize: '1rem',
    fontWeight: 500,
    borderRadius: '0.375rem',
    transition: 'all 0.2s',
  },
  activeTab: {
    backgroundColor: '#1e293b',
    border: 'none',
    color: '#38bdf8',
    padding: '0.5rem 1rem',
    cursor: 'pointer',
    fontSize: '1rem',
    fontWeight: 500,
    borderRadius: '0.375rem',
    boxShadow: '0 1px 3px rgba(0,0,0,0.3)',
  },
  main: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
    gap: '1.5rem',
  },
  card: {
    backgroundColor: '#1e293b',
    borderRadius: '0.75rem',
    padding: '1.5rem',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    border: '1px solid #334155',
  },
  cardTitle: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    margin: '0 0 1.25rem 0',
    fontSize: '1.125rem',
    color: '#e2e8f0',
    borderBottom: '1px solid #334155',
    paddingBottom: '0.75rem',
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '1rem',
  },
  statBox: {
    backgroundColor: '#0f172a',
    padding: '1rem',
    borderRadius: '0.5rem',
    border: '1px solid #334155',
  },
  statLabel: {
    fontSize: '0.875rem',
    color: '#94a3b8',
    marginBottom: '0.25rem',
  },
  statValue: {
    fontSize: '1.5rem',
    fontWeight: 700,
    color: '#f8fafc',
  },
  authList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem',
  },
  authItem: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '0.75rem',
    backgroundColor: '#0f172a',
    borderRadius: '0.375rem',
    border: '1px solid #334155',
  },
  badgeSuccess: {
    backgroundColor: 'rgba(16, 185, 129, 0.2)',
    color: '#34d399',
    padding: '0.25rem 0.5rem',
    borderRadius: '9999px',
    fontSize: '0.75rem',
    fontWeight: 600,
  },
  badgeWarning: {
    backgroundColor: 'rgba(245, 158, 11, 0.2)',
    color: '#fbbf24',
    padding: '0.25rem 0.5rem',
    borderRadius: '9999px',
    fontSize: '0.75rem',
    fontWeight: 600,
  },
  badgeDanger: {
    backgroundColor: 'rgba(239, 68, 68, 0.2)',
    color: '#f87171',
    padding: '0.25rem 0.5rem',
    borderRadius: '9999px',
    fontSize: '0.75rem',
    fontWeight: 600,
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  th: {
    textAlign: 'left',
    padding: '0.75rem',
    borderBottom: '1px solid #334155',
    color: '#94a3b8',
    fontSize: '0.875rem',
    fontWeight: 600,
  },
  tr: {
    borderBottom: '1px solid #334155',
  },
  td: {
    padding: '0.75rem',
    fontSize: '0.875rem',
    color: '#e2e8f0',
  },
  button: {
    backgroundColor: '#0284c7',
    color: '#fff',
    border: 'none',
    padding: '0.4rem 0.75rem',
    borderRadius: '0.25rem',
    cursor: 'pointer',
    fontSize: '0.75rem',
    fontWeight: 600,
  },
  protectionList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  protectionItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    fontSize: '0.9rem',
  },
  investigationContainer: {
    animation: 'fadeIn 0.3s ease',
  },
  invHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1.5rem',
    backgroundColor: '#1e293b',
    padding: '1rem 1.5rem',
    borderRadius: '0.75rem',
    border: '1px solid #334155',
  },
  closeBtn: {
    background: 'none',
    border: 'none',
    color: '#94a3b8',
    cursor: 'pointer',
  },
  codeBlock: {
    backgroundColor: '#0f172a',
    padding: '1rem',
    borderRadius: '0.375rem',
    fontSize: '0.8rem',
    fontFamily: 'monospace',
    color: '#a5b4fc',
    overflowX: 'auto',
  },
  sandboxResult: {
    backgroundColor: '#0f172a',
    padding: '1rem',
    borderRadius: '0.375rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
    fontSize: '0.875rem',
  },
  urlResult: {
    backgroundColor: '#0f172a',
    padding: '1rem',
    borderRadius: '0.375rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
    fontSize: '0.875rem',
  }
};

export default EmailSecurityPage;
