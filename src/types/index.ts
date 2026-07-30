export type CareerRank =
  | 'security-intern'
  | 'soc-analyst'
  | 'ethical-hacker'
  | 'vapt-consultant'
  | 'security-engineer'
  | 'threat-hunter'
  | 'incident-responder'
  | 'security-architect';

export type AlertSeverity = 'critical' | 'high' | 'medium' | 'low' | 'info';
export type AlertStatus = 'new' | 'investigating' | 'contained' | 'resolved' | 'false-positive';
export type SystemStatus = 'online' | 'degraded' | 'offline' | 'maintenance';

export interface User {
  id: string;
  employeeId: string;
  name: string;
  email: string;
  role: string;
  rank: CareerRank;
  department: string;
  team: string;
  manager: string;
  buddy?: string;
  avatarInitials: string;
  startDate: string;
  location: string;
  clearanceLevel: number;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  rank: CareerRank;
  department: string;
  avatarInitials: string;
  status: 'online' | 'away' | 'offline';
  currentTask?: string;
}

export interface SecurityAlert {
  id: string;
  timestamp: string;
  severity: AlertSeverity;
  type: string;
  source: string;
  sourceIp: string;
  description: string;
  status: AlertStatus;
  assignee?: string;
  mitreId?: string;
  mitreTactic?: string;
  mitreTechnique?: string;
  affectedAssets: string[];
  logs: LogEntry[];
  timeline: TimelineEvent[];
  recommendation?: string;
}

export interface LogEntry {
  timestamp: string;
  source: string;
  level: string;
  message: string;
  raw: string;
}

export interface TimelineEvent {
  timestamp: string;
  event: string;
  actor: string;
  detail: string;
}

export interface EnterpriseSystem {
  id: string;
  name: string;
  type: string;
  category: 'network' | 'compute' | 'security' | 'identity' | 'data' | 'cloud' | 'application' | 'endpoint';
  status: SystemStatus;
  ip: string;
  location: string;
  owner: string;
  description: string;
  dependencies: string[];
  threats: string[];
  lastScan: string;
  uptime: string;
  criticality: 'critical' | 'high' | 'medium' | 'low';
  ports: number[];
  services: string[];
  lastPatch: string;
  osVersion?: string;
}

export interface GfsModule {
  id: string;
  number: number;
  title: string;
  category: string;
  description: string;
  estimatedHours: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  prerequisites: string[];
  objectives: string[];
  unlocked: boolean;
  completed: boolean;
  progress: number;
  assignment: ModuleAssignment;
  systemsInvolved: string[];
  mitreMapping: string[];
}

export interface ModuleAssignment {
  briefing: string;
  context: string;
  priority: 'urgent' | 'high' | 'normal';
  requestedBy: string;
  deadline: string;
}

export interface Department {
  id: string;
  name: string;
  head: string;
  headTitle: string;
  employees: number;
  description: string;
  type: 'business' | 'technology' | 'security' | 'operations' | 'support';
}

export interface OnboardingStep {
  id: string;
  title: string;
  subtitle: string;
  description: string;
}

export interface ActivityEvent {
  id: string;
  timestamp: string;
  type: 'alert' | 'investigation' | 'deployment' | 'scan' | 'user' | 'system' | 'change' | 'meeting';
  message: string;
  severity: AlertSeverity | 'success';
  user?: string;
}

export interface MetricData {
  label: string;
  value: number;
  change: number;
  changeLabel: string;
  trend: 'up' | 'down' | 'flat';
}

export interface InternalMessage {
  id: string;
  from: string;
  fromRole: string;
  to: string;
  subject: string;
  body: string;
  timestamp: string;
  read: boolean;
  priority: 'urgent' | 'high' | 'normal';
}

export interface Ticket {
  id: string;
  title: string;
  type: 'incident' | 'service-request' | 'change-request' | 'problem';
  status: 'open' | 'in-progress' | 'pending' | 'resolved' | 'closed' | 'approved';
  priority: 'p1-critical' | 'p2-high' | 'p3-medium' | 'p4-low';
  assignee: string;
  reporter: string;
  created: string;
  updated: string;
  description: string;
  category: string;
}

export interface ChangeRequest {
  id: string;
  title: string;
  type: 'standard' | 'normal' | 'emergency';
  status: 'draft' | 'submitted' | 'approved' | 'scheduled' | 'implemented' | 'closed';
  changeManager: string;
  requester: string;
  risk: 'high' | 'medium' | 'low';
  plannedDate: string;
  description: string;
  justification: string;
  rollbackPlan: string;
  affectedSystems: string[];
}

export * from './learning';
