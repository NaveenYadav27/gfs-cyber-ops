// src/types/learning.ts
export type MissionType =
  | 'investigation'
  | 'configuration'
  | 'incident-response'
  | 'threat-hunting'
  | 'risk-assessment'
  | 'architecture-review'
  | 'compliance'
  | 'ethical-hacking'
  | 'forensics'
  | 'executive-briefing';

export type MissionStatus = 'locked' | 'available' | 'in-progress' | 'completed' | 'failed';

export type DifficultyLevel = 'beginner' | 'intermediate' | 'advanced' | 'expert';

export interface Mission {
  id: string;
  number: number;
  title: string;
  type: MissionType;
  status: MissionStatus;
  difficulty: DifficultyLevel;
  estimatedMinutes: number;
  xpReward: number;

  // Business context
  businessProblem: string;
  whyItMatters: string;
  businessUnit: string;
  assignedBy: string;
  assignedByRole: string;

  // Technical context
  affectedSystems: string[];
  affectedAssets: string[];
  attackStory: string;

  // Learning
  learningObjectives: string[];
  skillsRequired: string[];
  toolsUsed: string[];
  conceptsIntroduced: string[];

  // Story arc
  storyWeek: number;
  storyArc: string;
  prerequisiteMissions: string[];

  // Mission steps
  steps: MissionStep[];

  // Metrics
  threatLevel?: 'none' | 'low' | 'medium' | 'high' | 'critical';
  promotionWeight?: number;

  // Adaptive
  roleRecommendation: string;
  expectedDeliverables: string[];

  // Current state
  currentStep: number;
  progress: number;
  startedAt?: string;
  completedAt?: string;
  score?: number;
}

export interface MissionStep {
  id: string;
  order: number;
  title: string;
  type: 'context' | 'architecture' | 'investigation' | 'lab' | 'analysis' | 'decision' | 'evidence' | 'reflection' | 'debrief';
  description: string;
  content: StepContent;
  completed: boolean;
}

export interface StepContent {
  narrative?: string;
  diagram?: ArchitectureDiagram;
  questions?: QuizQuestion[];
  logEntries?: LogSnippet[];
  terminalCommands?: TerminalTask[];
  evidenceItems?: EvidenceTemplate[];
  decisions?: Decision[];
  reflections?: ReflectionPrompt[];
  knowledgeCards?: KnowledgeCard[];
  mitreMapping?: string[];
}

export interface ArchitectureDiagram {
  title: string;
  nodes: DiagramNode[];
  connections: DiagramConnection[];
  annotations: DiagramAnnotation[];
}

export interface DiagramNode {
  id: string;
  label: string;
  type: 'server' | 'firewall' | 'database' | 'endpoint' | 'cloud' | 'network' | 'user' | 'application' | 'security' | 'external';
  ip?: string;
  location?: string;
  status?: 'normal' | 'compromised' | 'suspicious' | 'offline';
  description: string;
  threats?: string[];
  dependencies?: string[];
}

export interface DiagramConnection {
  from: string;
  to: string;
  label: string;
  protocol?: string;
  port?: number;
  status?: 'normal' | 'suspicious' | 'blocked';
}

export interface DiagramAnnotation {
  nodeId: string;
  text: string;
  type: 'info' | 'warning' | 'danger' | 'success';
}

export interface QuizQuestion {
  id: string;
  question: string;
  type: 'multiple-choice' | 'short-answer' | 'investigation';
  options?: { id: string; text: string; correct: boolean; explanation: string }[];
  correctAnswer?: string;
  explanation: string;
  points: number;
  difficulty: DifficultyLevel;
}

export interface LogSnippet {
  source: string;
  timestamp: string;
  level: string;
  message: string;
  highlight?: boolean;
  explanation?: string;
  mitreTag?: string;
}

export interface TerminalTask {
  description: string;
  command: string;
  output: string;
  explanation: string;
  category?: string;
}

export interface EvidenceTemplate {
  id: string;
  name: string;
  type: 'log' | 'pcap' | 'memory' | 'disk' | 'network' | 'cloud' | 'email' | 'ioc' | 'screenshot' | 'document';
  source: string;
  description: string;
  content: string;
  mitreMapping?: string;
  businessImpact?: string;
  collectedAt?: string;
}

export interface Decision {
  id: string;
  scenario: string;
  options: { id: string; text: string; consequence: string; correct: boolean; risk: 'low' | 'medium' | 'high' }[];
  businessContext: string;
}

export interface ReflectionPrompt {
  question: string;
  type: 'technical' | 'business' | 'career' | 'communication';
}

export interface KnowledgeCard {
  id: string;
  title: string;
  category: string;
  content: string;
  keyPoints: string[];
  relatedConcepts: string[];
  mitreMapping?: string;
  practicalApplication: string;
}

export interface NotebookEntry {
  id: string;
  missionId: string;
  timestamp: string;
  type: 'evidence' | 'note' | 'command' | 'screenshot' | 'mitre' | 'discovery' | 'reflection';
  title: string;
  content: string;
  tags: string[];
  mitreTags?: string[];
  importance: 'low' | 'medium' | 'high';
}

export interface SkillCompetency {
  id: string;
  name: string;
  category: string;
  level: number;
  xp: number;
  maxLevel: number;
  confidence: 'low' | 'medium' | 'high';
  lastUsed?: string;
  relatedMissions: string[];
  description: string;
  subSkills: SubSkill[];
}

export interface SubSkill {
  name: string;
  level: number;
  xp: number;
}

export interface Reflection {
  missionId: string;
  whatHappened: string;
  rootCause: string;
  missedSignals: string;
  prevention: string;
  businessImpact: string;
  technicalLessons: string;
  careerTakeaway: string;
  managerFeedback?: string;
  score: number;
  timestamp: string;
}

export interface LearningAnalytics {
  totalHours: number;
  missionsCompleted: number;
  missionsInProgress: number;
  averageScore: number;
  investigationQuality: number;
  responseTime: string;
  skillGrowthPercent: number;
  knowledgeRetention: number;
  toolProficiency: Record<string, number>;
  promotionReadiness: number;
  weeklyProgress: { week: string; missions: number; xp: number; hours: number }[];
  skillRadar: { skill: string; level: number; target: number }[];
}

export interface AIConversation {
  role: 'user' | 'mentor' | 'system';
  content: string;
  timestamp: string;
}
