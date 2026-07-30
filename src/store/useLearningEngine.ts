// src/store/useLearningEngine.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type {
  Mission, NotebookEntry, SkillCompetency, Reflection,
  LearningAnalytics, AIConversation, MissionStatus
} from '@/types/learning';
import { MISSIONS } from '@/data/missions';

interface LearningState {
  missions: Mission[];
  notebook: NotebookEntry[];
  skills: SkillCompetency[];
  reflections: Reflection[];
  aiConversations: AIConversation[];
  currentMissionId: string | null;
  currentStepIndex: number;
  totalXP: number;
  level: number;
  showAI: boolean;

  // Mission actions
  startMission: (missionId: string) => void;
  completeStep: (missionId: string, stepId: string) => void;
  advanceStep: (missionId: string) => void;
  completeMission: (missionId: string, score: number) => void;
  setCurrentMission: (missionId: string | null) => void;

  // Notebook actions
  addNotebookEntry: (entry: Omit<NotebookEntry, 'id' | 'timestamp'>) => void;
  clearNotebook: () => void;

  // Skill actions
  updateSkill: (skillId: string, xpGain: number) => void;

  // Reflection actions
  addReflection: (reflection: Reflection) => void;

  // AI actions
  addAIConversation: (msg: Omit<AIConversation, 'timestamp'>) => void;
  toggleAI: () => void;

  // Analytics
  getAnalytics: () => LearningAnalytics;
}

const INITIAL_SKILLS: SkillCompetency[] = [
  { id: 'sk-network', name: 'Networking', category: 'Infrastructure', level: 40, xp: 400, maxLevel: 100, confidence: 'medium', relatedMissions: [], description: 'TCP/IP, DNS, HTTP/S, routing, switching, network segmentation', subSkills: [{ name: 'TCP/IP', level: 50, xp: 150 }, { name: 'DNS', level: 35, xp: 100 }, { name: 'Firewalls', level: 30, xp: 90 }, { name: 'Packet Analysis', level: 25, xp: 75 }] },
  { id: 'sk-windows', name: 'Windows Security', category: 'Operating Systems', level: 30, xp: 300, maxLevel: 100, confidence: 'low', relatedMissions: [], description: 'Windows event logs, PowerShell, Group Policy, Active Directory', subSkills: [{ name: 'Event Logs', level: 25, xp: 75 }, { name: 'PowerShell', level: 20, xp: 60 }, { name: 'Active Directory', level: 30, xp: 90 }, { name: 'Group Policy', level: 20, xp: 60 }] },
  { id: 'sk-linux', name: 'Linux Security', category: 'Operating Systems', level: 25, xp: 250, maxLevel: 100, confidence: 'low', relatedMissions: [], description: 'Linux permissions, log analysis, hardening, forensics', subSkills: [{ name: 'File Permissions', level: 30, xp: 90 }, { name: 'Log Analysis', level: 20, xp: 60 }, { name: 'Hardening', level: 20, xp: 60 }, { name: 'Forensics', level: 15, xp: 45 }] },
  { id: 'sk-siem', name: 'SIEM & KQL', category: 'SOC', level: 20, xp: 200, maxLevel: 100, confidence: 'low', relatedMissions: [], description: 'Microsoft Sentinel, KQL queries, alert correlation, detection rules', subSkills: [{ name: 'KQL Basics', level: 25, xp: 75 }, { name: 'Alert Triage', level: 20, xp: 60 }, { name: 'Detection Rules', level: 10, xp: 30 }, { name: 'Dashboards', level: 15, xp: 45 }] },
  { id: 'sk-edr', name: 'EDR & Falcon', category: 'SOC', level: 15, xp: 150, maxLevel: 100, confidence: 'low', relatedMissions: [], description: 'CrowdStrike Falcon, endpoint investigation, live response', subSkills: [{ name: 'Alert Investigation', level: 15, xp: 45 }, { name: 'Live Response', level: 10, xp: 30 }, { name: 'Threat Hunting', level: 10, xp: 30 }, { name: 'Remediation', level: 15, xp: 45 }] },
  { id: 'sk-investigation', name: 'Investigation', category: 'SOC', level: 15, xp: 150, maxLevel: 100, confidence: 'low', relatedMissions: [], description: 'Alert triage, timeline building, evidence collection, documentation', subSkills: [{ name: 'Triage', level: 20, xp: 60 }, { name: 'Timeline Analysis', level: 15, xp: 45 }, { name: 'Evidence Collection', level: 10, xp: 30 }, { name: 'Documentation', level: 15, xp: 45 }] },
  { id: 'sk-incident-response', name: 'Incident Response', category: 'Operations', level: 0, xp: 0, maxLevel: 100, confidence: 'low', relatedMissions: [], description: 'NIST IR lifecycle, containment, eradication, recovery, communication', subSkills: [{ name: 'Containment', level: 0, xp: 0 }, { name: 'Eradication', level: 0, xp: 0 }, { name: 'Recovery', level: 0, xp: 0 }, { name: 'Communication', level: 0, xp: 0 }] },
  { id: 'sk-threat-hunting', name: 'Threat Hunting', category: 'Operations', level: 0, xp: 0, maxLevel: 100, confidence: 'low', relatedMissions: [], description: 'Hypothesis-driven hunting, advanced queries, behavioral analysis', subSkills: [{ name: 'Hypothesis Development', level: 0, xp: 0 }, { name: 'Advanced Queries', level: 0, xp: 0 }, { name: 'Behavioral Analysis', level: 0, xp: 0 }, { name: 'IOC Extraction', level: 0, xp: 0 }] },
  { id: 'sk-business', name: 'Business Knowledge', category: 'Business', level: 10, xp: 100, maxLevel: 100, confidence: 'low', relatedMissions: [], description: 'Banking operations, payment systems, regulatory requirements, business impact assessment', subSkills: [{ name: 'UPI/Payments', level: 15, xp: 45 }, { name: 'NEFT/RTGS', level: 10, xp: 30 }, { name: 'Risk Assessment', level: 10, xp: 30 }, { name: 'Regulatory', level: 10, xp: 30 }] },
  { id: 'sk-communication', name: 'Communication', category: 'Soft Skills', level: 20, xp: 200, maxLevel: 100, confidence: 'medium', relatedMissions: [], description: 'Report writing, executive briefings, shift handovers, documentation', subSkills: [{ name: 'Report Writing', level: 25, xp: 75 }, { name: 'Executive Briefing', level: 10, xp: 30 }, { name: 'Documentation', level: 25, xp: 75 }] },
];

export const useLearningEngine = create<LearningState>()(
  persist(
    (set, get) => ({
      missions: MISSIONS,
      notebook: [],
      skills: INITIAL_SKILLS,
      reflections: [],
      aiConversations: [],
      currentMissionId: null,
      currentStepIndex: 0,
      totalXP: 0,
      level: 1,
      showAI: false,

      startMission: (missionId) => {
        set((s) => ({
          missions: s.missions.map((m) =>
            m.id === missionId
              ? { ...m, status: 'in-progress' as const, startedAt: new Date().toISOString(), currentStep: 0, progress: 0 }
              : m
          ),
          currentMissionId: missionId,
          currentStepIndex: 0,
        }));
      },

      completeStep: (missionId, stepId) => {
        set((s) => ({
          missions: s.missions.map((m) => {
            if (m.id !== missionId) return m;
            const steps = m.steps.map((st) =>
              st.id === stepId ? { ...st, completed: true } : st
            );
            const completedCount = steps.filter((st) => st.completed).length;
            const progress = (completedCount / steps.length) * 100;
            return { ...m, steps, progress, currentStep: completedCount };
          }),
        }));
      },

      advanceStep: (missionId) => {
        const state = get();
        const mission = state.missions.find((m) => m.id === missionId);
        if (!mission) return;
        const nextIndex = Math.min(state.currentStepIndex + 1, mission.steps.length - 1);
        set({ currentStepIndex: nextIndex });
      },

      completeMission: (missionId, score) => {
        set((s) => {
          const mission = s.missions.find((m) => m.id === missionId);
          const newXP = s.totalXP + (mission?.xpReward || 0);
          const newLevel = Math.floor(newXP / 1000) + 1;

          // Unlock next missions
          const newMissions = s.missions.map((m) => {
            if (m.id === missionId) {
              return { ...m, status: 'completed' as const, completedAt: new Date().toISOString(), score, progress: 100 };
            }
            if (m.prerequisiteMissions.includes(missionId) || m.prerequisiteMissions.every((pre) =>
              s.missions.some((pm) => pm.id === pre && (pm.status === 'completed' || pm.id === missionId))
            )) {
              const allPrereqsMet = m.prerequisiteMissions.every((pre) =>
                newMissions?.some((pm) => pm.id === pre && pm.status === 'completed') ||
                pre === missionId
              );
              if (m.status === 'locked' && allPrereqsMet) {
                return { ...m, status: 'available' as const };
              }
            }
            return m;
          });

          return {
            missions: newMissions,
            totalXP: newXP,
            level: newLevel,
            currentMissionId: null,
            currentStepIndex: 0,
          };
        });
      },

      setCurrentMission: (missionId) => set({ currentMissionId: missionId, currentStepIndex: 0 }),

      addNotebookEntry: (entry) => {
        set((s) => ({
          notebook: [
            { ...entry, id: `nb-${Date.now()}`, timestamp: new Date().toISOString() },
            ...s.notebook,
          ].slice(0, 200),
        }));
      },

      clearNotebook: () => set({ notebook: [] }),

      updateSkill: (skillId, xpGain) => {
        set((s) => ({
          skills: s.skills.map((sk) => {
            if (sk.id !== skillId) return sk;
            const newXP = sk.xp + xpGain;
            const newLevel = Math.min(Math.floor(newXP / 30) + 1, sk.maxLevel);
            return { ...sk, xp: newXP, level: newLevel, lastUsed: new Date().toISOString() };
          }),
        }));
      },

      addReflection: (reflection) => {
        set((s) => ({ reflections: [...s.reflections, reflection] }));
      },

      addAIConversation: (msg) => {
        set((s) => ({
          aiConversations: [...s.aiConversations, { ...msg, timestamp: new Date().toISOString() }].slice(-50),
        }));
      },

      toggleAI: () => set((s) => ({ showAI: !s.showAI })),

      getAnalytics: () => {
        const state = get();
        const completed = state.missions.filter((m) => m.status === 'completed');
        const inProgress = state.missions.filter((m) => m.status === 'in-progress');
        const avgScore = completed.length > 0
          ? completed.reduce((sum, m) => sum + (m.score || 0), 0) / completed.length
          : 0;

        return {
          totalHours: completed.length * 0.75,
          missionsCompleted: completed.length,
          missionsInProgress: inProgress.length,
          averageScore: Math.round(avgScore),
          investigationQuality: Math.min(60 + completed.length * 5, 100),
          responseTime: completed.length > 3 ? '12 min' : '25 min',
          skillGrowthPercent: Math.round(state.skills.reduce((sum, sk) => sum + sk.level, 0) / state.skills.length),
          knowledgeRetention: Math.min(70 + completed.length * 4, 98),
          toolProficiency: {
            'Sentinel': Math.min(20 + completed.length * 10, 90),
            'Falcon': Math.min(15 + completed.length * 8, 85),
            'KQL': Math.min(25 + completed.length * 9, 88),
            'Wireshark': Math.min(10 + completed.length * 7, 75),
            'ServiceNow': Math.min(20 + completed.length * 8, 85),
          },
          promotionReadiness: Math.min(completed.length * 12, 100),
          weeklyProgress: Array.from({ length: 8 }, (_, i) => ({
            week: `Week ${i + 1}`,
            missions: completed.filter((m) => m.storyWeek === i + 1).length,
            xp: completed.filter((m) => m.storyWeek === i + 1).reduce((sum, m) => sum + m.xpReward, 0),
            hours: completed.filter((m) => m.storyWeek === i + 1).length * 0.75,
          })),
          skillRadar: state.skills.slice(0, 8).map((sk) => ({
            skill: sk.name,
            level: sk.level,
            target: Math.min(sk.level + 20, 100),
          })),
        };
      },
    }),
    {
      name: 'gfs-learning-engine',
      partialize: (s) => ({
        missions: s.missions.map((m) => ({
          id: m.id, status: m.status, progress: m.progress,
          currentStep: m.currentStep, score: m.score,
          startedAt: m.startedAt, completedAt: m.completedAt,
        })),
        notebook: s.notebook,
        skills: s.skills,
        reflections: s.reflections,
        totalXP: s.totalXP,
        level: s.level,
      }),
    }
  )
);
