// src/pages/MissionCanvas.tsx
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft, ArrowRight, ChevronRight, CheckCircle2, Clock, Star,
  Shield, Briefcase, Target, Eye, Play,
} from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { PageHeader } from '@/components/layout/PageHeader';
import { ArchitectureViewer } from '@/components/learning/ArchitectureViewer';
import { KnowledgePanel } from '@/components/learning/KnowledgePanel';
import { InteractiveTerminal } from '@/components/learning/InteractiveTerminal';
import { LogViewer } from '@/components/learning/LogViewer';
import { DecisionPanel } from '@/components/learning/DecisionPanel';
import { EvidencePanel } from '@/components/learning/EvidencePanel';
import { ReflectionPanel } from '@/components/learning/ReflectionPanel';
import { useLearningEngine } from '@/store/useLearningEngine';
import { useStore } from '@/store/useStore';

const stepTypeLabels: Record<string, { icon: React.ElementType; color: string; label: string }> = {
  context: { icon: Briefcase, color: 'var(--color-gfs-amber)', label: 'Briefing' },
  architecture: { icon: Target, color: 'var(--color-gfs-blue)', label: 'Architecture' },
  investigation: { icon: Eye, color: 'var(--color-gfs-accent)', label: 'Investigation' },
  lab: { icon: Play, color: 'var(--color-gfs-purple)', label: 'Lab' },
  analysis: { icon: Shield, color: 'var(--color-gfs-green)', label: 'Analysis' },
  decision: { icon: Target, color: 'var(--color-gfs-red)', label: 'Decision' },
  evidence: { icon: Eye, color: 'var(--color-gfs-blue)', label: 'Evidence' },
  reflection: { icon: CheckCircle2, color: 'var(--color-gfs-accent)', label: 'Reflection' },
  debrief: { icon: CheckCircle2, color: 'var(--color-gfs-green)', label: 'Debrief' },
};

export function MissionCanvas() {
  const {
    missions, currentMissionId, currentStepIndex, setCurrentMission,
    completeStep, advanceStep, completeMission, updateSkill, addNotebookEntry,
  } = useLearningEngine();
  const { setCurrentPage } = useStore();

  const mission = missions.find((m) => m.id === currentMissionId);
  if (!mission) {
    return (
      <div className="text-center py-20">
        <p className="text-sm text-[var(--color-gfs-text-muted)]">No mission selected</p>
        <button onClick={() => setCurrentPage('missions')}
          className="mt-4 px-4 py-2 rounded-lg bg-[var(--color-gfs-accent-dim)] text-[var(--color-gfs-accent)] text-xs">
          Browse Missions
        </button>
      </div>
    );
  }

  const step = mission.steps[currentStepIndex];
  const isLastStep = currentStepIndex === mission.steps.length - 1;
  const stepConfig = stepTypeLabels[step?.type] || stepTypeLabels.context;

  const handleStepComplete = () => {
    if (!step) return;
    completeStep(mission.id, step.id);

    // Award skill XP based on concepts
    mission.skillsRequired.forEach((skill) => {
      const skillMap: Record<string, string> = {
        'Networking Basics': 'sk-network', 'SIEM Basics': 'sk-siem', 'Business Knowledge': 'sk-business',
        'Email Analysis': 'sk-windows', 'Windows Basics': 'sk-windows', 'EDR': 'sk-edr',
        'Incident Response': 'sk-incident-response', 'Threat Hunting': 'sk-threat-hunting',
      };
      const skillId = skillMap[skill] || 'sk-investigation';
      updateSkill(skillId, 30);
    });

    if (isLastStep) {
      completeMission(mission.id, 85);
      updateSkill('sk-business', 50);
      updateSkill('sk-communication', 30);
    } else {
      advanceStep(mission.id);
    }
  };

  const handleBack = () => {
    if (currentStepIndex > 0) {
      useLearningEngine.setState((s) => ({ currentStepIndex: s.currentStepIndex - 1 }));
    } else {
      setCurrentMission(null);
      setCurrentPage('missions');
    }
  };

  if (!step) return null;

  return (
    <div className="space-y-4">
      {/* Mission Header */}
      <Card delay={0} className="!p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={handleBack} className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-[var(--color-gfs-elevated)] text-[var(--color-gfs-text-muted)]">
              <ArrowLeft className="w-4 h-4" />
            </button>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono text-[var(--color-gfs-text-muted)]">MISSION {String(mission.number).padStart(2, '0')}</span>
                <Badge variant={mission.difficulty === 'beginner' ? 'success' : mission.difficulty === 'intermediate' ? 'medium' : 'high'}>{mission.difficulty}</Badge>
              </div>
              <h2 className="text-sm font-display font-bold text-[var(--color-gfs-text)]">{mission.title}</h2>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-[10px] text-[var(--color-gfs-accent)] flex items-center gap-1"><Star className="w-3 h-3" /> +{mission.xpReward} XP</span>
            <span className="text-[10px] text-[var(--color-gfs-text-muted)] flex items-center gap-1"><Clock className="w-3 h-3" /> {mission.estimatedMinutes}min</span>
          </div>
        </div>

        {/* Step progress bar */}
        <div className="mt-3 flex items-center gap-1">
          {mission.steps.map((st, i) => {
            const config = stepTypeLabels[st.type] || stepTypeLabels.context;
            const isActive = i === currentStepIndex;
            const isDone = st.completed;
            return (
              <button key={st.id} onClick={() => useLearningEngine.setState({ currentStepIndex: i })}
                className={`flex-1 h-1.5 rounded-full transition-all ${isDone ? 'bg-[var(--color-gfs-green)]' : isActive ? 'bg-[var(--color-gfs-accent)]' : 'bg-[var(--color-gfs-elevated)]'}`}
                title={st.title} />
            );
          })}
        </div>
      </Card>

      {/* Step Content */}
      <AnimatePresence mode="wait">
        <motion.div key={step.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}>
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
            {/* Main Content */}
            <div className="xl:col-span-2 space-y-4">
              {/* Step Header */}
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `${stepConfig.color}15` }}>
                  <stepConfig.icon className="w-4 h-4" style={{ color: stepConfig.color }} />
                </div>
                <div>
                  <Badge variant="default">{stepConfig.label}</Badge>
                  <h3 className="text-sm font-semibold text-[var(--color-gfs-text)] mt-0.5">{step.title}</h3>
                  <p className="text-[11px] text-[var(--color-gfs-text-muted)]">{step.description}</p>
                </div>
              </div>

              {/* Narrative */}
              {step.content.narrative && (
                <Card delay={0.05} className="!p-4">
                  <div className="text-xs text-[var(--color-gfs-text-secondary)] leading-relaxed whitespace-pre-line">
                    {step.content.narrative.split('\n').map((line, i) => {
                      if (line.startsWith('**') && line.endsWith('**')) {
                        return <p key={i} className="font-semibold text-[var(--color-gfs-text)] mt-2 mb-1">{line.replace(/\*\*/g, '')}</p>;
                      }
                      if (line.startsWith('- ')) {
                        return <p key={i} className="ml-2 mt-0.5">• {line.slice(2)}</p>;
                      }
                      if (line.startsWith('|')) return null;
                      return <p key={i} className="mt-1">{line}</p>;
                    })}
                  </div>
                </Card>
              )}

              {/* Architecture Diagram */}
              {step.content.diagram && (
                <ArchitectureViewer diagram={step.content.diagram} />
              )}

              {/* Log Entries */}
              {step.content.logEntries && step.content.logEntries.length > 0 && (
                <LogViewer entries={step.content.logEntries} />
              )}

              {/* Terminal / Lab */}
              {step.content.terminalCommands && step.content.terminalCommands.length > 0 && (
                <InteractiveTerminal tasks={step.content.terminalCommands} />
              )}

              {/* Decision */}
              {step.content.decisions && step.content.decisions.length > 0 && (
                <DecisionPanel decisions={step.content.decisions} />
              )}

              {/* Evidence */}
              {step.content.evidenceItems && step.content.evidenceItems.length > 0 && (
                <EvidencePanel items={step.content.evidenceItems} missionId={mission.id} />
              )}

              {/* Reflection */}
              {step.content.reflections && step.content.reflections.length > 0 && (
                <ReflectionPanel prompts={step.content.reflections} />
              )}

              {/* Navigation */}
              <div className="flex items-center justify-between pt-4">
                <button onClick={handleBack}
                  className="px-4 py-2 rounded-lg text-xs text-[var(--color-gfs-text-secondary)] hover:bg-[var(--color-gfs-elevated)] transition-colors flex items-center gap-1">
                  <ArrowLeft className="w-3 h-3" /> Back
                </button>
                <button onClick={handleStepComplete}
                  className="px-4 py-2 rounded-lg text-xs font-medium bg-gradient-to-r from-[var(--color-gfs-accent)] to-[var(--color-gfs-blue)] text-[var(--color-gfs-base)] hover:opacity-90 transition-opacity flex items-center gap-1">
                  {isLastStep ? <>Complete Mission <CheckCircle2 className="w-3 h-3" /></> : <>Continue <ArrowRight className="w-3 h-3" /></>}
                </button>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-4">
              {/* Mission Info */}
              <Card delay={0.1} className="!p-3">
                <h4 className="text-[10px] text-[var(--color-gfs-text-muted)] uppercase tracking-wider mb-2">Mission Info</h4>
                <div className="space-y-2 text-[11px]">
                  <div className="flex justify-between"><span className="text-[var(--color-gfs-text-muted)]">Assigned by</span><span className="text-[var(--color-gfs-text)]">{mission.assignedBy}</span></div>
                  <div className="flex justify-between"><span className="text-[var(--color-gfs-text-muted)]">Business Unit</span><span className="text-[var(--color-gfs-text)]">{mission.businessUnit}</span></div>
                  <div className="flex justify-between"><span className="text-[var(--color-gfs-text-muted)]">Threat Level</span><Badge variant={mission.threatLevel === 'critical' ? 'critical' : mission.threatLevel === 'high' ? 'high' : 'default'}>{mission.threatLevel}</Badge></div>
                  <div className="flex justify-between"><span className="text-[var(--color-gfs-text-muted)]">Role Needed</span><span className="text-[var(--color-gfs-text)]">{mission.roleRecommendation}</span></div>
                </div>
              </Card>

              {/* Tools */}
              <Card delay={0.15} className="!p-3">
                <h4 className="text-[10px] text-[var(--color-gfs-text-muted)] uppercase tracking-wider mb-2">Tools</h4>
                <div className="flex flex-wrap gap-1">
                  {mission.toolsUsed.map((t) => <Badge key={t} variant="default">{t}</Badge>)}
                </div>
              </Card>

              {/* Skills Required */}
              <Card delay={0.2} className="!p-3">
                <h4 className="text-[10px] text-[var(--color-gfs-text-muted)] uppercase tracking-wider mb-2">Skills Required</h4>
                <div className="flex flex-wrap gap-1">
                  {mission.skillsRequired.map((s) => <Badge key={s} variant="accent">{s}</Badge>)}
                </div>
              </Card>

              {/* Knowledge Cards */}
              {step.content.knowledgeCards && step.content.knowledgeCards.length > 0 && (
                <KnowledgePanel cards={step.content.knowledgeCards} />
              )}

              {/* MITRE */}
              {step.content.mitreMapping && step.content.mitreMapping.length > 0 && (
                <Card delay={0.25} className="!p-3">
                  <h4 className="text-[10px] text-[var(--color-gfs-text-muted)] uppercase tracking-wider mb-2">MITRE ATT&CK</h4>
                  <div className="flex flex-wrap gap-1">
                    {step.content.mitreMapping.map((m) => <Badge key={m} variant="default">{m}</Badge>)}
                  </div>
                </Card>
              )}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
