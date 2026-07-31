const fs = require('fs');
const path = require('path');

const content = `
// ============================================================================
// GFS ENTERPRISE DIGITAL TWIN GRAPH
// ============================================================================
// Deeply relational Enterprise Intelligence Layer.
// ============================================================================

export interface Employee { id: string; name: string; title: string; deptId: string; email: string; deviceIds: string[]; managerId?: string; riskScore: number; }
export interface Department { id: string; name: string; headId: string; budget: string; location: string; complianceScore: number; cyberRisk: 'Low' | 'Medium' | 'High' | 'Critical'; }
export interface Server { id: string; hostname: string; ip: string; type: 'windows' | 'linux' | 'mainframe' | 'appliance'; ownerId: string; deptId: string; status: 'online' | 'offline' | 'degraded'; os: string; openPorts: number[]; vulnerabilities: string[]; services: string[]; networkZone: string; }
export interface Application { id: string; name: string; ownerId: string; criticality: 'low' | 'medium' | 'high' | 'critical'; serverIds: string[]; businessImpact: string; }
export interface Incident { id: string; title: string; status: 'new' | 'active' | 'resolved'; severity: 'low' | 'medium' | 'high' | 'critical'; assignedToId?: string; relatedEntityIds: string[]; description: string; timestamp: string; }
export interface Alert { id: string; title: string; severity: 'low' | 'medium' | 'high' | 'critical'; source: string; relatedEntityId: string; timestamp: string; mitreTactic?: string; mitreTechnique?: string; }
export interface Policy { id: string; name: string; type: 'ISO27001' | 'PCI-DSS' | 'Internal'; status: 'compliant' | 'non-compliant' | 'auditing'; ownerId: string; }
export interface TimelineEvent { id: string; timestamp: string; type: 'auth' | 'system' | 'business' | 'security' | 'network'; title: string; description: string; source: string; relatedIds: string[]; }

export const DEPARTMENTS: Record<string, Department> = {
  'dept-it': { id: 'dept-it', name: 'Information Technology', headId: 'emp-2', budget: '$12M', location: 'Hyderabad DC', complianceScore: 92, cyberRisk: 'Medium' },
  'dept-sec': { id: 'dept-sec', name: 'Cyber Security', headId: 'emp-1', budget: '$8M', location: 'Amaravati HQ', complianceScore: 98, cyberRisk: 'Low' },
  'dept-ops': { id: 'dept-ops', name: 'Network Operations', headId: 'emp-3', budget: '$6M', location: 'Mumbai DR', complianceScore: 85, cyberRisk: 'High' },
  'dept-exec': { id: 'dept-exec', name: 'Executive Board', headId: 'emp-5', budget: '$20M', location: 'Amaravati HQ', complianceScore: 100, cyberRisk: 'Low' },
};

export const EMPLOYEES: Record<string, Employee> = {
  'emp-1': { id: 'emp-1', name: 'Sai Krishna', title: 'CISO', deptId: 'dept-sec', email: 'sai.krishna@gfs.com', deviceIds: ['dev-lpt-1'], riskScore: 15 },
  'emp-2': { id: 'emp-2', name: 'Rajesh Sharma', title: 'CIO', deptId: 'dept-it', email: 'rajesh.s@gfs.com', deviceIds: ['dev-lpt-2'], riskScore: 20 },
  'emp-3': { id: 'emp-3', name: 'Priya Patel', title: 'Head of NOC', deptId: 'dept-ops', email: 'priya.p@gfs.com', deviceIds: ['dev-lpt-3'], managerId: 'emp-2', riskScore: 45 },
  'emp-4': { id: 'emp-4', name: 'John Doe', title: 'SOC Analyst', deptId: 'dept-sec', email: 'john.d@gfs.com', deviceIds: ['dev-lpt-4'], managerId: 'emp-1', riskScore: 10 },
  'emp-5': { id: 'emp-5', name: 'Naveen Yadav', title: 'CEO', deptId: 'dept-exec', email: 'naveen.y@gfs.com', deviceIds: ['dev-exec-1'], riskScore: 85 },
};

export const SERVERS: Record<string, Server> = {
  'srv-web-01': { id: 'srv-web-01', hostname: 'WEB-01', ip: '10.10.1.10', type: 'linux', ownerId: 'emp-3', deptId: 'dept-ops', status: 'online', os: 'RHEL 8', openPorts: [80, 443], vulnerabilities: ['CVE-2023-1021', 'CVE-2021-44228'], services: ['httpd', 'sshd'], networkZone: 'DMZ' },
  'srv-db-01': { id: 'srv-db-01', hostname: 'DB-01', ip: '10.10.50.20', type: 'linux', ownerId: 'emp-2', deptId: 'dept-it', status: 'online', os: 'Oracle Linux 8', openPorts: [1521, 22], vulnerabilities: [], services: ['oracle', 'sshd'], networkZone: 'Internal LAN' },
  'srv-ad-01': { id: 'srv-ad-01', hostname: 'AD-01', ip: '10.10.50.1', type: 'windows', ownerId: 'emp-2', deptId: 'dept-it', status: 'online', os: 'Windows Server 2022', openPorts: [53, 88, 389], vulnerabilities: ['CVE-2020-1472'], services: ['ADDS', 'DNS'], networkZone: 'Identity' },
  'fw-ext-01': { id: 'fw-ext-01', hostname: 'FW-EXT-01', ip: '203.0.113.1', type: 'appliance', ownerId: 'emp-3', deptId: 'dept-ops', status: 'online', os: 'PAN-OS 10.1', openPorts: [443, 500, 4500], vulnerabilities: [], services: ['GlobalProtect', 'IPSec'], networkZone: 'Internet Edge' },
};

export const APPLICATIONS: Record<string, Application> = {
  'app-ibanking': { id: 'app-ibanking', name: 'iBanking Portal', ownerId: 'emp-2', criticality: 'critical', serverIds: ['srv-web-01', 'srv-db-01'], businessImpact: '$5M/hour' },
  'app-hr': { id: 'app-hr', name: 'Workday HRIS', ownerId: 'emp-2', criticality: 'high', serverIds: [], businessImpact: '$100k/hour' },
};

export const INCIDENTS: Record<string, Incident> = {
  'inc-1001': { id: 'inc-1001', title: 'High CPU on WEB-01', status: 'active', severity: 'high', assignedToId: 'emp-3', relatedEntityIds: ['srv-web-01', 'app-ibanking'], description: 'WEB-01 is operating at 99% CPU for 30 minutes.', timestamp: new Date(Date.now() - 3600000).toISOString() },
  'inc-1002': { id: 'inc-1002', title: 'Failed Logins on AD-01', status: 'active', severity: 'critical', assignedToId: 'emp-4', relatedEntityIds: ['srv-ad-01', 'emp-5'], description: 'Multiple failed authentication attempts detected from unknown IP.', timestamp: new Date(Date.now() - 7200000).toISOString() },
};

export const ALERTS: Record<string, Alert> = {
  'alt-5001': { id: 'alt-5001', title: 'Suspicious PowerShell Execution', severity: 'high', source: 'CrowdStrike', relatedEntityId: 'srv-ad-01', timestamp: new Date().toISOString(), mitreTactic: 'Execution', mitreTechnique: 'T1059.001' },
  'alt-5002': { id: 'alt-5002', title: 'WAF Block: SQL Injection', severity: 'medium', source: 'Imperva', relatedEntityId: 'srv-web-01', timestamp: new Date(Date.now() - 3600000).toISOString(), mitreTactic: 'Initial Access', mitreTechnique: 'T1190' },
  'alt-5003': { id: 'alt-5003', title: 'Impossible Travel: CEO Account', severity: 'critical', source: 'Azure AD', relatedEntityId: 'emp-5', timestamp: new Date(Date.now() - 7200000).toISOString(), mitreTactic: 'Credential Access', mitreTechnique: 'T1078' },
};

export const TIMELINE: Record<string, TimelineEvent> = {
  'evt-1': { id: 'evt-1', timestamp: new Date(Date.now() - 8000000).toISOString(), type: 'auth', title: 'Successful Login: CEO', description: 'Interactive login from Amaravati HQ.', source: 'Active Directory', relatedIds: ['emp-5', 'srv-ad-01'] },
  'evt-2': { id: 'evt-2', timestamp: new Date(Date.now() - 7200000).toISOString(), type: 'security', title: 'Failed Login Burst', description: '150 failed logins from 45.33.22.11.', source: 'Azure AD', relatedIds: ['emp-5'] },
  'evt-3': { id: 'evt-3', timestamp: new Date(Date.now() - 3600000).toISOString(), type: 'system', title: 'CPU Spike Detected', description: 'CPU utilization reached 99%.', source: 'Dynatrace', relatedIds: ['srv-web-01'] },
  'evt-4': { id: 'evt-4', timestamp: new Date(Date.now() - 1000000).toISOString(), type: 'business', title: 'Q3 Board Meeting', description: 'Exec presentation on cyber risk.', source: 'Exchange', relatedIds: ['emp-5', 'dept-exec'] },
};

export const GRAPH = {
  getRelatedIncidents: (id: string) => Object.values(INCIDENTS).filter(i => i.relatedEntityIds.includes(id)),
  getRelatedAlerts: (id: string) => Object.values(ALERTS).filter(a => a.relatedEntityId === id),
  getRelatedEvents: (id: string) => Object.values(TIMELINE).filter(e => e.relatedIds.includes(id)),
  getEntityOwner: (id: string) => EMPLOYEES[SERVERS[id]?.ownerId || APPLICATIONS[id]?.ownerId || id] || null,
};
`;

fs.writeFileSync(path.join(__dirname, '../src/data/enterprise/index.ts'), content);
console.log('Enterprise Graph Expanded.');
