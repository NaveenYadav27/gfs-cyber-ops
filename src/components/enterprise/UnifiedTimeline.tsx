import React from 'react';
import { 
  Briefcase, 
  Server, 
  KeyRound, 
  Cloud, 
  ShieldAlert, 
  Globe, 
  Target, 
  Ticket, 
  Wrench,
  Clock
} from 'lucide-react';
import './UnifiedTimeline.css';

type EventType = 'business' | 'system' | 'auth' | 'cloud' | 'firewall' | 'dns' | 'soc' | 'itsm' | 'patching';

interface TimelineEvent {
  id: string;
  type: EventType;
  timestamp: string;
  title: string;
  description: string;
  source: string;
  user?: string;
  ip?: string;
}

const mockEvents: TimelineEvent[] = [
  {
    id: 'evt-001',
    type: 'business',
    timestamp: '2026-07-31T08:00:00Z',
    title: 'Quarterly Financial Freeze Started',
    description: 'System put into financial freeze mode. Only critical changes permitted.',
    source: 'Change Management System',
    user: 'sys_admin'
  },
  {
    id: 'evt-002',
    type: 'patching',
    timestamp: '2026-07-31T08:15:30Z',
    title: 'Critical Zero-Day Patch Deployed',
    description: 'Emergency deployment of CVE-2026-1049 patch to all edge routers.',
    source: 'SCCM',
  },
  {
    id: 'evt-003',
    type: 'auth',
    timestamp: '2026-07-31T09:45:12Z',
    title: 'Anomalous AD Login',
    description: 'Multiple failed login attempts followed by a successful login from a new IP.',
    source: 'Active Directory',
    user: 'jdoe',
    ip: '198.51.100.23'
  },
  {
    id: 'evt-004',
    type: 'cloud',
    timestamp: '2026-07-31T09:47:05Z',
    title: 'AWS IAM Role Assumed',
    description: 'Role "ProdDBAccess" assumed by federated user jdoe.',
    source: 'AWS CloudTrail',
    user: 'jdoe'
  },
  {
    id: 'evt-005',
    type: 'dns',
    timestamp: '2026-07-31T09:50:22Z',
    title: 'Suspicious DNS Query',
    description: 'Query for known DGA domain (asdjhasd123.xyz).',
    source: 'Infoblox',
    ip: '10.0.5.112'
  },
  {
    id: 'evt-006',
    type: 'firewall',
    timestamp: '2026-07-31T09:52:10Z',
    title: 'Outbound Connection Dropped',
    description: 'Palo Alto firewall dropped connection to malicious C2 server over port 443.',
    source: 'Palo Alto Networks',
    ip: '10.0.5.112'
  },
  {
    id: 'evt-007',
    type: 'soc',
    timestamp: '2026-07-31T09:55:00Z',
    title: 'High Severity Alert: Possible Endpoint Compromise',
    description: 'CrowdStrike Falcon detected suspicious PowerShell execution leading to C2 beaconing attempt.',
    source: 'Splunk SIEM',
  },
  {
    id: 'evt-008',
    type: 'itsm',
    timestamp: '2026-07-31T10:00:15Z',
    title: 'Incident INC-994201 Created',
    description: 'Automated P1 incident created for endpoint isolation and investigation.',
    source: 'ServiceNow',
  },
  {
    id: 'evt-009',
    type: 'system',
    timestamp: '2026-07-31T10:05:00Z',
    title: 'Host Isolated from Network',
    description: 'Endpoint DESKTOP-JDOE successfully isolated from the corporate network.',
    source: 'CrowdStrike',
    ip: '10.0.5.112'
  }
];

const getEventIcon = (type: EventType) => {
  switch (type) {
    case 'business': return <Briefcase size={18} />;
    case 'system': return <Server size={18} />;
    case 'auth': return <KeyRound size={18} />;
    case 'cloud': return <Cloud size={18} />;
    case 'firewall': return <ShieldAlert size={18} />;
    case 'dns': return <Globe size={18} />;
    case 'soc': return <Target size={18} />;
    case 'itsm': return <Ticket size={18} />;
    case 'patching': return <Wrench size={18} />;
  }
};

const getEventLabel = (type: EventType) => {
  switch (type) {
    case 'business': return 'Business';
    case 'system': return 'System';
    case 'auth': return 'Authentication';
    case 'cloud': return 'Cloud';
    case 'firewall': return 'Firewall';
    case 'dns': return 'DNS';
    case 'soc': return 'SOC Alert';
    case 'itsm': return 'ITSM';
    case 'patching': return 'Patching';
  }
};

export const UnifiedTimeline: React.FC = () => {
  return (
    <div className="timeline-container">
      <div className="timeline-header">
        <Clock size={28} color="#60a5fa" />
        Unified Enterprise Investigation Timeline
      </div>
      
      <ul className="timeline">
        {mockEvents.map((event) => (
          <li key={event.id} className={`timeline-item event-${event.type}`}>
            <div className="timeline-icon-wrapper">
              {getEventIcon(event.type)}
            </div>
            
            <div className="timeline-content">
              <div className="timeline-time">
                {new Date(event.timestamp).toLocaleString(undefined, { 
                  timeStyle: 'medium', 
                  dateStyle: 'medium' 
                })}
              </div>
              
              <div className="timeline-title">
                {event.title}
                <span className="timeline-badge">
                  {getEventLabel(event.type)}
                </span>
              </div>
              
              <div className="timeline-desc">
                {event.description}
              </div>
              
              <div className="timeline-metadata">
                <span><strong>Source:</strong> {event.source}</span>
                {event.user && <span><strong>User:</strong> {event.user}</span>}
                {event.ip && <span><strong>IP:</strong> {event.ip}</span>}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
