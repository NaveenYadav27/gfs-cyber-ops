export interface Employee {
  id: string;
  employeeId: string;
  name: string;
  designation: string;
  department: string;
  division: string;
  manager: string;
  directReports: string[];
  location: string;
  floor: string;
  seat: string;
  email: string;
  phone: string;
  laptop: string;
  photo: string;
  joinedDate: string;
  skills: string[];
  certifications: string[];
  projects: string[];
  currentIncidents: string[];
  ownedAssets: string[];
  assignedSystems: string[];
  shift: string;
  status: 'active' | 'away' | 'offline' | 'in-meeting' | 'on-leave';
  lastLogin: string;
  vpnSession: boolean;
  securityClearance: 'standard' | 'elevated' | 'privileged';
  level: number;
  salaryBand: string;
  bio: string;
}

export interface Department {
  id: string;
  name: string;
  code: string;
  head: string;
  headTitle: string;
  division: string;
  description: string;
  location: string;
  employeeCount: number;
  budget: string;
  kpis: DepartmentKPI[];
  applications: string[];
  projects: string[];
  currentIssues: string[];
  assets: string[];
  techStack: string[];
  businessProcesses: string[];
  meetings: string[];
}

export interface DepartmentKPI {
  name: string;
  value: string;
  target: string;
  status: 'on-track' | 'at-risk' | 'behind';
}

export interface BusinessUnit {
  id: string;
  name: string;
  code: string;
  description: string;
  head: string;
  revenue: string;
  employees: number;
  locations: string[];
  products: string[];
  keyMetrics: { label: string; value: string }[];
}

export interface Technology {
  id: string;
  name: string;
  category: string;
  vendor: string;
  version: string;
  description: string;
  status: 'operational' | 'degraded' | 'maintenance' | 'offline';
  hosts: string[];
  dashboards: string[];
  alerts: { title: string; severity: string; time: string }[];
  logsPerDay: string;
  users: number;
  licenseExpiry: string;
  owner: string;
}

export interface InfrastructureNode {
  id: string;
  name: string;
  type: 'campus' | 'datacenter' | 'branch' | 'office' | 'cloud' | 'firewall' | 'router' | 'switch' | 'server' | 'database' | 'application' | 'endpoint' | 'loadbalancer' | 'vpn';
  status: 'healthy' | 'warning' | 'critical' | 'offline';
  location: string;
  ip?: string;
  owner: string;
  businessPurpose: string;
  technicalRole?: string;
  criticality: 'critical' | 'high' | 'medium' | 'low';
  dependencies: string[];
  connectedTo: string[];
  health: number;
  securityControls: string[];
  knownRisks: string[];
  mitreMapping: string[];
  uptime: string;
  lastIncident?: string;
}

export interface EnterpriseEvent {
  id: string;
  timestamp: string;
  type: 'login' | 'vpn' | 'dns' | 'email' | 'firewall' | 'cloud' | 'server' | 'patch' | 'threat' | 'identity' | 'incident' | 'announcement' | 'deployment' | 'backup' | 'audit';
  title: string;
  description: string;
  source: string;
  severity: 'info' | 'low' | 'medium' | 'high' | 'critical';
  department?: string;
  employee?: string;
  asset?: string;
}

export interface CyberDefenseUnit {
  id: string;
  name: string;
  description: string;
  head: string;
  teamSize: number;
  location: string;
  currentInvestigations: number;
  openAlerts: number;
  kpis: { label: string; value: string }[];
  technologies: string[];
  runbooks: string[];
  status: 'operational' | 'elevated' | 'critical';
}

export interface CareerRole {
  id: string;
  level: number;
  title: string;
  department: string;
  dailyWork: string[];
  responsibilities: string[];
  tools: string[];
  skills: string[];
  projects: string[];
  salaryRange: string;
  certifications: string[];
  promotionCriteria: string[];
  timeToPromotion: string;
  currentHolders: number;
}

export interface WebinarStep {
  id: string;
  order: number;
  title: string;
  description: string;
  page: string;
  highlight?: string;
  narration: string;
  duration: number;
}
