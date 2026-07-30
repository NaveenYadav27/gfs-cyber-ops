export type AlertSeverity = 'critical' | 'high' | 'medium' | 'low' | 'informational';
export type AlertStatus = 'new' | 'assigned' | 'investigating' | 'escalated' | 'contained' | 'resolved' | 'closed' | 'false-positive';
export type CasePriority = 'P1' | 'P2' | 'P3' | 'P4';
export type CaseStatus = 'open' | 'in-progress' | 'escalated' | 'containment' | 'eradication' | 'recovery' | 'closed';
export type ShiftType = 'morning' | 'afternoon' | 'night';

export interface SOCAlert {
  id: string;
  title: string;
  severity: AlertSeverity;
  status: AlertStatus;
  source: string;
  timestamp: string;
  assignee?: string;
  assigneeId?: string;
  sla: string;
  slaBreached: boolean;
  affectedAsset: string;
  affectedAssetIp?: string;
  mitreTactic: string;
  mitreTechnique: string;
  mitreId: string;
  description: string;
  riskScore: number;
  iocs: IOC[];
  relatedAlerts: string[];
  caseId?: string;
  notes: AnalystNote[];
  timeline: AlertTimelineEvent[];
  recommendation: string;
  playbookId?: string;
  logSnippet?: string;
}

export interface AlertTimelineEvent {
  timestamp: string;
  title: string;
  description: string;
  source: string;
  severity: string;
}

export interface AnalystNote {
  id: string;
  author: string;
  timestamp: string;
  content: string;
  type: 'observation' | 'action' | 'escalation' | 'resolution';
}

export interface IOC {
  type: 'ip' | 'domain' | 'hash' | 'url' | 'email' | 'filename';
  value: string;
  confidence: 'high' | 'medium' | 'low';
  context: string;
}

export interface SOCIncident {
  id: string;
  title: string;
  severity: CasePriority;
  status: CaseStatus;
  owner: string;
  ownerId: string;
  createdAt: string;
  updatedAt: string;
  affectedSystems: string[];
  businessUnit: string;
  stakeholders: string[];
  alertIds: string[];
  timeline: IncidentTimelineEvent[];
  evidence: EvidenceItem[];
  tasks: IncidentTask[];
  comments: IncidentComment[];
  escalations: Escalation[];
  businessImpact: string;
  executiveSummary?: string;
  rootCause?: string;
  lessonsLearned?: string;
  mitreMapping: string[];
}

export interface IncidentTimelineEvent {
  timestamp: string;
  event: string;
  actor: string;
  category: 'detection' | 'response' | 'communication' | 'containment' | 'escalation' | 'resolution';
}

export interface EvidenceItem {
  id: string;
  name: string;
  type: 'log' | 'screenshot' | 'pcap' | 'memory' | 'file' | 'ioc' | 'email' | 'query-result';
  content: string;
  collectedBy: string;
  timestamp: string;
  tags: string[];
}

export interface IncidentTask {
  id: string;
  title: string;
  assignee: string;
  status: 'pending' | 'in-progress' | 'completed';
  dueDate?: string;
}

export interface IncidentComment {
  id: string;
  author: string;
  timestamp: string;
  content: string;
}

export interface Escalation {
  timestamp: string;
  from: string;
  to: string;
  reason: string;
}

export interface SOARPlaybook {
  id: string;
  name: string;
  description: string;
  category: string;
  trigger: string;
  status: 'active' | 'inactive' | 'testing';
  autoRemediate: boolean;
  steps: PlaybookStep[];
  executionCount: number;
  successRate: number;
  avgDuration: string;
  lastExecuted?: string;
}

export interface PlaybookStep {
  order: number;
  action: string;
  type: 'automated' | 'manual' | 'approval';
  tool?: string;
  description: string;
  parameters?: string;
}

export interface HuntMission {
  id: string;
  title: string;
  status: 'active' | 'completed' | 'paused';
  hypothesis: string;
  mitreTactic: string;
  queries: HuntQuery[];
  findings: string[];
  analyst: string;
  startDate: string;
}

export interface HuntQuery {
  id: string;
  title: string;
  query: string;
  platform: 'sentinel' | 'splunk' | 'elastic';
  result: string;
  explanation: string;
  mitreMapping?: string;
}

export interface SOCMessage {
  id: string;
  from: string;
  fromId: string;
  subject: string;
  body: string;
  timestamp: string;
  read: boolean;
  category: 'incident' | 'shift' | 'advisory' | 'announcement' | 'bulletin' | 'ticket' | 'escalation';
  priority: 'urgent' | 'normal' | 'low';
}

export interface KBArticle {
  id: string;
  title: string;
  category: string;
  content: string;
  detectionLogic: string;
  investigationSteps: string[];
  responseWorkflow: string[];
  mitreMapping: string[];
  relatedPlaybooks: string[];
  relatedLabs: string[];
  cheatSheet: { syntax: string; description: string }[];
}

export interface SOCLab {
  id: string;
  title: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  category: string;
  objective: string;
  missionSteps: MissionStep[];
}

export interface MissionStep {
  order: number;
  title: string;
  instruction: string;
  command?: string;
  expectedOutput: string;
  explanation: string;
  hint?: string;
  blueTeamContext?: string;
}
