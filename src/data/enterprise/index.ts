// ============================================================================
// GFS ENTERPRISE DATA ENGINE (DIGITAL TWIN)
// ============================================================================
// Single source of truth for the entire GFS Operating System.
// ============================================================================

export interface Employee { id: string; name: string; title: string; deptId: string; email: string; deviceIds: string[]; managerId?: string; }
export interface Department { id: string; name: string; headId: string; budget: string; location: string; }
export interface Server { id: string; hostname: string; ip: string; type: 'windows' | 'linux' | 'mainframe'; ownerId: string; deptId: string; status: 'online' | 'offline' | 'degraded'; os: string; openPorts: number[]; vulnerabilities: string[]; services: string[]; }
export interface Application { id: string; name: string; ownerId: string; criticality: 'low' | 'medium' | 'high' | 'critical'; serverIds: string[]; }
export interface Incident { id: string; title: string; status: 'new' | 'active' | 'resolved'; severity: 'low' | 'medium' | 'high' | 'critical'; assignedToId?: string; relatedServerIds: string[]; description: string; }
export interface Alert { id: string; title: string; severity: 'low' | 'medium' | 'high' | 'critical'; source: string; relatedServerId: string; timestamp: string; }

export const DEPARTMENTS: Record<string, Department> = {
  'dept-it': { id: 'dept-it', name: 'Information Technology', headId: 'emp-2', budget: '$12M', location: 'Hyderabad DC' },
  'dept-sec': { id: 'dept-sec', name: 'Cyber Security', headId: 'emp-1', budget: '$8M', location: 'Amaravati HQ' },
  'dept-ops': { id: 'dept-ops', name: 'Network Operations', headId: 'emp-3', budget: '$6M', location: 'Mumbai DR' },
};

export const EMPLOYEES: Record<string, Employee> = {
  'emp-1': { id: 'emp-1', name: 'Sai Krishna', title: 'CISO', deptId: 'dept-sec', email: 'sai.krishna@gfs.com', deviceIds: ['dev-lpt-1'] },
  'emp-2': { id: 'emp-2', name: 'Rajesh Sharma', title: 'CIO', deptId: 'dept-it', email: 'rajesh.s@gfs.com', deviceIds: ['dev-lpt-2'] },
  'emp-3': { id: 'emp-3', name: 'Priya Patel', title: 'Head of NOC', deptId: 'dept-ops', email: 'priya.p@gfs.com', deviceIds: ['dev-lpt-3'], managerId: 'emp-2' },
  'emp-4': { id: 'emp-4', name: 'John Doe', title: 'SOC Analyst', deptId: 'dept-sec', email: 'john.d@gfs.com', deviceIds: ['dev-lpt-4'], managerId: 'emp-1' },
};

export const SERVERS: Record<string, Server> = {
  'srv-web-01': { id: 'srv-web-01', hostname: 'WEB-01', ip: '10.10.1.10', type: 'linux', ownerId: 'emp-3', deptId: 'dept-ops', status: 'online', os: 'RHEL 8', openPorts: [80, 443], vulnerabilities: ['vuln-1', 'vuln-2'], services: ['httpd', 'sshd'] },
  'srv-db-01': { id: 'srv-db-01', hostname: 'DB-01', ip: '10.10.50.20', type: 'linux', ownerId: 'emp-2', deptId: 'dept-it', status: 'online', os: 'Oracle Linux 8', openPorts: [1521, 22], vulnerabilities: [], services: ['oracle', 'sshd'] },
  'srv-ad-01': { id: 'srv-ad-01', hostname: 'AD-01', ip: '10.10.50.1', type: 'windows', ownerId: 'emp-2', deptId: 'dept-it', status: 'online', os: 'Windows Server 2022', openPorts: [53, 88, 389], vulnerabilities: ['vuln-3'], services: ['ADDS', 'DNS'] },
};

export const APPLICATIONS: Record<string, Application> = {
  'app-ibanking': { id: 'app-ibanking', name: 'iBanking Portal', ownerId: 'emp-2', criticality: 'critical', serverIds: ['srv-web-01', 'srv-db-01'] },
  'app-hr': { id: 'app-hr', name: 'Workday HRIS', ownerId: 'emp-2', criticality: 'high', serverIds: [] },
};

export const INCIDENTS: Record<string, Incident> = {
  'inc-1001': { id: 'inc-1001', title: 'High CPU on WEB-01', status: 'active', severity: 'high', assignedToId: 'emp-3', relatedServerIds: ['srv-web-01'], description: 'WEB-01 is operating at 99% CPU for 30 minutes.' },
  'inc-1002': { id: 'inc-1002', title: 'Failed Logins on AD-01', status: 'active', severity: 'critical', assignedToId: 'emp-4', relatedServerIds: ['srv-ad-01'], description: 'Multiple failed authentication attempts detected from unknown IP.' },
};

export const ALERTS: Record<string, Alert> = {
  'alt-5001': { id: 'alt-5001', title: 'Suspicious PowerShell Execution', severity: 'high', source: 'CrowdStrike', relatedServerId: 'srv-ad-01', timestamp: new Date().toISOString() },
  'alt-5002': { id: 'alt-5002', title: 'WAF Block: SQL Injection', severity: 'medium', source: 'Imperva', relatedServerId: 'srv-web-01', timestamp: new Date(Date.now() - 3600000).toISOString() },
};

export const GRAPH = {
  getRelatedIncidents: (serverId: string) => Object.values(INCIDENTS).filter(i => i.relatedServerIds.includes(serverId)),
  getRelatedAlerts: (serverId: string) => Object.values(ALERTS).filter(a => a.relatedServerId === serverId),
  getServerOwner: (serverId: string) => EMPLOYEES[SERVERS[serverId]?.ownerId],
  getEmployeeDevices: (empId: string) => EMPLOYEES[empId]?.deviceIds || [],
};
