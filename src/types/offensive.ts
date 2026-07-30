export interface OffensiveTool {
  id: string;
  name: string;
  category: string;
  icon: string;
  description: string;
  version: string;
  purpose: string;
  offensivePurpose: string;
  defensiveDetection: string;
  installation: string;
  features: string[];
  mitreMapping: string[];
  owaspMapping: string[];
  relatedTools: string[];
  commands: ToolCommand[];
  labs: ToolLab[];
  cheatSheet: CheatSheetEntry[];
}

export interface ToolCommand {
  command: string;
  description: string;
  parameters: { flag: string; description: string; required: boolean }[];
  example: string;
  output: string;
  warning?: string;
  mitreTechnique?: string;
  detectionOpportunity?: string;
}

export interface ToolLab {
  id: string;
  title: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  objective: string;
  steps: LabStep[];
  targetHost: string;
  hints: string[];
}

export interface LabStep {
  order: number;
  title: string;
  instruction: string;
  command?: string;
  expectedOutput: string;
  explanation: string;
  blueTeamView?: {
    windowsEvents?: string[];
    linuxLogs?: string[];
    firewallLogs?: string[];
    siemAlert?: string;
    detectionRule?: string;
    investigation?: string;
  };
}

export interface CheatSheetEntry {
  category: string;
  commands: { syntax: string; description: string }[];
}

export interface Engagement {
  id: string;
  name: string;
  code: string;
  type: string;
  status: 'planning' | 'active' | 'reporting' | 'completed';
  scope: string[];
  objectives: string[];
  rulesOfEngagement: string[];
  targetAssets: string[];
  attackSurface: string[];
  startDate: string;
  endDate: string;
  team: string[];
  severity: 'critical' | 'high' | 'medium' | 'low';
  findings: EngagementFinding[];
  evidence: string[];
  executiveSummary: string;
  methodology: string[];
}

export interface EngagementFinding {
  id: string;
  title: string;
  severity: 'critical' | 'high' | 'medium' | 'low' | 'informational';
  cvss: number;
  cvssVector: string;
  category: string;
  description: string;
  impact: string;
  remediation: string;
  affectedAsset: string;
  proof: string;
  mitreMapping: string[];
  owaspMapping: string[];
  pciDssMapping: string[];
  status: 'open' | 'remediation' | 'verified-fixed' | 'accepted-risk';
}

export interface AttackChain {
  id: string;
  name: string;
  description: string;
  stages: AttackChainStage[];
  mitreMapping: string[];
  totalSteps: number;
}

export interface AttackChainStage {
  order: number;
  tool: string;
  toolId: string;
  objective: string;
  command: string;
  expectedOutcome: string;
  nextStep: string;
}

export interface GFSHost {
  id: string;
  hostname: string;
  ip: string;
  os: string;
  type: 'web' | 'app' | 'db' | 'dc' | 'mail' | 'vpn' | 'file' | 'linux' | 'jump' | 'attacker';
  department: string;
  businessPurpose: string;
  status: 'online' | 'vulnerable' | 'compromised' | 'patched' | 'offline';
  openPorts: { port: number; service: string; version: string; state: string }[];
  vulnerabilities: string[];
  credentials?: string[];
}
