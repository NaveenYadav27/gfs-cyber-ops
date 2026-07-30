import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Shield, Terminal, BookOpen, Target, AlertTriangle, CheckCircle2, ChevronRight,
  Copy, Play, Eye, Code, Lightbulb, ExternalLink,
} from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { PageHeader } from '@/components/layout/PageHeader';
import type { OffensiveTool } from '@/types/offensive';

interface ToolDetailPageProps {
  tool: OffensiveTool;
  onBack: () => void;
}

type ToolTab = 'overview' | 'terminal' | 'labs' | 'cheatsheet' | 'blueteam';

export function ToolDetailPage({ tool, onBack }: ToolDetailPageProps) {
  const [activeTab, setActiveTab] = useState<ToolTab>('overview');
  const [activeCommand, setActiveCommand] = useState(0);
  const [terminalHistory, setTerminalHistory] = useState<{ cmd: string; output: string }[]>([]);
  const [currentInput, setCurrentInput] = useState('');
  const [expandedLab, setExpandedLab] = useState<string | null>(null);

  const handleCommand = (cmd: string) => {
    if (!cmd.trim()) return;
    const matchingCmd = tool.commands.find((c) => cmd.includes(c.command.split(' ')[0]));
    setTerminalHistory((prev) => [...prev, {
      cmd,
      output: matchingCmd?.output || `Command executed: ${cmd}\n[Output would appear here in the lab environment]`,
    }]);
    setCurrentInput('');
  };

  const TABS: { id: ToolTab; label: string; icon: React.ElementType }[] = [
    { id: 'overview', label: 'Overview', icon: Eye },
    { id: 'terminal', label: 'Terminal', icon: Terminal },
    { id: 'labs', label: 'Labs', icon: Target },
    { id: 'cheatsheet', label: 'Cheat Sheet', icon: BookOpen },
    { id: 'blueteam', label: 'Blue Team View', icon: Shield },
  ];

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center gap-3">
        <button onClick={onBack} className="text-[11px] text-[var(--color-gfs-accent)] hover:underline">← Tool Repository</button>
      </div>
      <PageHeader
        icon={<span className="text-xl">{tool.icon}</span>}
        title={tool.name}
        subtitle={tool.description}
        badge={<Badge variant="accent">{tool.category}</Badge>}
      />

      {/* Tabs */}
      <div className="flex items-center gap-0 border-b border-[var(--color-gfs-border-light)]">
        {TABS.map((tab) => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-1.5 px-3 py-2 text-[11px] font-medium border-b-2 transition-colors ${
              activeTab === tab.id ? 'text-[var(--color-gfs-accent)] border-[var(--color-gfs-accent)]' : 'text-[var(--color-gfs-text-muted)] border-transparent hover:text-[var(--color-gfs-text)]'
            }`}>
            <tab.icon className="w-3 h-3" /> {tab.label}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div key={activeTab} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.15 }}>

          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
              <div className="xl:col-span-2 space-y-4">
                <Card delay={0} className="!p-4">
                  <h3 className="gfs-text-label mb-2">Purpose</h3>
                  <p className="text-[11px] text-[var(--color-gfs-text-secondary)] leading-relaxed">{tool.purpose}</p>
                </Card>
                <Card delay={0.05} className="!p-4">
                  <h3 className="gfs-text-label mb-2">Offensive Purpose</h3>
                  <p className="text-[11px] text-[var(--color-gfs-text-secondary)] leading-relaxed">{tool.offensivePurpose}</p>
                </Card>
                <Card delay={0.1} className="!p-4">
                  <h3 className="gfs-text-label mb-2">Features</h3>
                  <div className="flex flex-wrap gap-1.5">
                    {tool.features.map((f) => <Badge key={f} variant="default">{f}</Badge>)}
                  </div>
                </Card>
                <Card delay={0.15} className="!p-4">
                  <h3 className="gfs-text-label mb-2">Command Reference</h3>
                  <div className="space-y-2">
                    {tool.commands.map((cmd, i) => (
                      <div key={i} onClick={() => { setActiveCommand(i); setActiveTab('terminal'); }}
                        className="p-3 rounded-lg bg-[var(--color-gfs-elevated)] border border-[var(--color-gfs-border-light)] cursor-pointer hover:border-[var(--color-gfs-accent)]/30 transition-colors">
                        <div className="flex items-center gap-2">
                          <Terminal className="w-3 h-3 text-[var(--color-gfs-green)]" />
                          <code className="text-[10px] font-mono text-[var(--color-gfs-accent)]">{cmd.command}</code>
                        </div>
                        <p className="text-[10px] text-[var(--color-gfs-text-muted)] mt-1">{cmd.description}</p>
                        {cmd.warning && (
                          <div className="mt-2 p-2 rounded bg-[var(--color-gfs-amber-dim)] text-[9px] text-[var(--color-gfs-amber)]">
                            ⚠ {cmd.warning}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
              <div className="space-y-4">
                <Card delay={0.1} className="!p-4">
                  <h3 className="gfs-text-label mb-2">Details</h3>
                  <div className="space-y-2 text-[11px]">
                    <div className="flex justify-between"><span className="text-[var(--color-gfs-text-muted)]">Version</span><span className="text-[var(--color-gfs-text)] font-mono">{tool.version}</span></div>
                    <div className="flex justify-between"><span className="text-[var(--color-gfs-text-muted)]">Category</span><span className="text-[var(--color-gfs-text)]">{tool.category}</span></div>
                  </div>
                </Card>
                <Card delay={0.15} className="!p-4">
                  <h3 className="gfs-text-label mb-2">MITRE ATT&CK</h3>
                  <div className="flex flex-wrap gap-1">
                    {tool.mitreMapping.map((m) => <Badge key={m} variant="default">{m}</Badge>)}
                  </div>
                </Card>
                <Card delay={0.2} className="!p-4">
                  <h3 className="gfs-text-label mb-2">OWASP</h3>
                  <div className="flex flex-wrap gap-1">
                    {tool.owaspMapping.length > 0 ? tool.owaspMapping.map((o) => <Badge key={o} variant="accent">{o}</Badge>) : <span className="text-[10px] text-[var(--color-gfs-text-muted)]">N/A</span>}
                  </div>
                </Card>
                <Card delay={0.25} className="!p-4">
                  <h3 className="gfs-text-label mb-2">Defensive Detection</h3>
                  <p className="text-[10px] text-[var(--color-gfs-text-secondary)] leading-relaxed">{tool.defensiveDetection}</p>
                </Card>
                <Card delay={0.3} className="!p-4">
                  <h3 className="gfs-text-label mb-2">Related Tools</h3>
                  <div className="flex flex-wrap gap-1">
                    {tool.relatedTools.map((t) => <Badge key={t} variant="default">{t}</Badge>)}
                  </div>
                </Card>
                <Card delay={0.35} className="!p-4">
                  <h3 className="gfs-text-label mb-2">Installation</h3>
                  <div className="p-2 rounded bg-[var(--color-gfs-base)] font-mono text-[10px] text-[var(--color-gfs-green)]">{tool.installation}</div>
                </Card>
              </div>
            </div>
          )}

          {/* Terminal Tab */}
          {activeTab === 'terminal' && (
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
              <div className="xl:col-span-2">
                <Card delay={0} className="!p-0 overflow-hidden">
                  <div className="px-4 py-2 border-b border-[var(--color-gfs-border-light)] flex items-center gap-2">
                    <Terminal className="w-3.5 h-3.5 text-[var(--color-gfs-green)]" />
                    <span className="text-xs font-semibold text-[var(--color-gfs-text)]">{tool.name} Terminal</span>
                    <Badge variant="success">KALI-ATTACKER</Badge>
                  </div>
                  <div className="bg-[#0d1117] p-4 font-mono text-[11px] min-h-[400px] max-h-[600px] overflow-y-auto">
                    <div className="text-[var(--color-gfs-text-muted)] mb-2">$ {tool.name.toLowerCase()} --ready</div>
                    <div className="text-[var(--color-gfs-green)] mb-4">[*] {tool.name} v{tool.version} initialized. Type commands to begin.</div>

                    {/* History */}
                    {terminalHistory.map((entry, i) => (
                      <div key={i} className="mb-3">
                        <div className="text-[var(--color-gfs-green)]">$ {entry.cmd}</div>
                        <pre className="text-[var(--color-gfs-text-secondary)] whitespace-pre-wrap mt-1 text-[10px]">{entry.output}</pre>
                      </div>
                    ))}

                    {/* Input */}
                    <div className="flex items-center gap-2">
                      <span className="text-[var(--color-gfs-green)]">$</span>
                      <input value={currentInput} onChange={(e) => setCurrentInput(e.target.value)}
                        onKeyDown={(e) => { if (e.key === 'Enter') handleCommand(currentInput); }}
                        className="flex-1 bg-transparent text-[var(--color-gfs-text)] focus:outline-none font-mono text-[11px]"
                        placeholder="Type a command..." autoFocus />
                    </div>
                  </div>
                </Card>
              </div>
              <div className="space-y-4">
                <Card delay={0.1} className="!p-4">
                  <h3 className="gfs-text-label mb-2">Quick Commands</h3>
                  <div className="space-y-1.5">
                    {tool.commands.map((cmd, i) => (
                      <button key={i} onClick={() => { setActiveCommand(i); handleCommand(cmd.command); }}
                        className="w-full text-left p-2 rounded bg-[var(--color-gfs-elevated)] hover:bg-[var(--color-gfs-hover)] transition-colors">
                        <code className="text-[9px] font-mono text-[var(--color-gfs-accent)]">{cmd.command}</code>
                        <p className="text-[9px] text-[var(--color-gfs-text-muted)] mt-0.5">{cmd.description}</p>
                      </button>
                    ))}
                  </div>
                </Card>
                {tool.commands[activeCommand] && (
                  <Card delay={0.15} className="!p-4">
                    <h3 className="gfs-text-label mb-2">Command Analysis</h3>
                    <div className="space-y-2">
                      <div className="p-2 rounded bg-[var(--color-gfs-base)] font-mono text-[10px] text-[var(--color-gfs-accent)]">{tool.commands[activeCommand].command}</div>
                      <p className="text-[10px] text-[var(--color-gfs-text-secondary)]">{tool.commands[activeCommand].description}</p>
                      {tool.commands[activeCommand].parameters.length > 0 && (
                        <div>
                          <span className="gfs-text-label text-[9px]">Parameters</span>
                          {tool.commands[activeCommand].parameters.map((p) => (
                            <div key={p.flag} className="flex items-start gap-2 mt-1">
                              <code className="text-[9px] font-mono text-[var(--color-gfs-accent)] w-16 flex-shrink-0">{p.flag}</code>
                              <span className="text-[9px] text-[var(--color-gfs-text-secondary)]">{p.description}</span>
                            </div>
                          ))}
                        </div>
                      )}
                      {tool.commands[activeCommand].mitreTechnique && (
                        <div className="flex items-center gap-1 mt-1">
                          <Shield className="w-2.5 h-2.5 text-[var(--color-gfs-red)]" />
                          <span className="text-[9px] text-[var(--color-gfs-red)]">{tool.commands[activeCommand].mitreTechnique}</span>
                        </div>
                      )}
                      {tool.commands[activeCommand].detectionOpportunity && (
                        <div className="p-2 rounded bg-[var(--color-gfs-blue-dim)] mt-1">
                          <span className="text-[9px] text-[var(--color-gfs-blue)] font-semibold">Detection: </span>
                          <span className="text-[9px] text-[var(--color-gfs-text-secondary)]">{tool.commands[activeCommand].detectionOpportunity}</span>
                        </div>
                      )}
                    </div>
                  </Card>
                )}
              </div>
            </div>
          )}

          {/* Labs Tab */}
          {activeTab === 'labs' && (
            <div className="space-y-3">
              {tool.labs.length === 0 ? (
                <Card delay={0} className="!p-8 text-center">
                  <Target className="w-8 h-8 text-[var(--color-gfs-text-muted)] mx-auto mb-3 opacity-30" />
                  <p className="text-[11px] text-[var(--color-gfs-text-muted)]">No labs available for this tool yet.</p>
                </Card>
              ) : tool.labs.map((lab) => (
                <Card key={lab.id} delay={0} className="!p-4">
                  <div className="flex items-start justify-between cursor-pointer" onClick={() => setExpandedLab(expandedLab === lab.id ? null : lab.id)}>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] font-semibold text-[var(--color-gfs-text)]">{lab.title}</span>
                        <Badge variant={lab.difficulty === 'beginner' ? 'success' : lab.difficulty === 'intermediate' ? 'medium' : lab.difficulty === 'advanced' ? 'high' : 'critical'}>
                          {lab.difficulty}
                        </Badge>
                        <Badge variant="default">Target: {lab.targetHost}</Badge>
                      </div>
                      <p className="text-[10px] text-[var(--color-gfs-text-muted)] mt-0.5">{lab.objective}</p>
                    </div>
                    <ChevronRight className={`w-4 h-4 text-[var(--color-gfs-text-muted)] transition-transform ${expandedLab === lab.id ? 'rotate-90' : ''}`} />
                  </div>

                  <AnimatePresence>
                    {expandedLab === lab.id && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                        <div className="mt-4 space-y-3">
                          {lab.steps.map((step) => (
                            <div key={step.order} className="p-3 rounded-lg bg-[var(--color-gfs-elevated)] border border-[var(--color-gfs-border-light)]">
                              <div className="flex items-center gap-2">
                                <span className="w-6 h-6 rounded-full bg-[var(--color-gfs-accent-dim)] flex items-center justify-center text-[9px] font-mono font-bold text-[var(--color-gfs-accent)]">
                                  {step.order}
                                </span>
                                <span className="text-[11px] font-semibold text-[var(--color-gfs-text)]">{step.title}</span>
                              </div>
                              <p className="text-[10px] text-[var(--color-gfs-text-secondary)] mt-2 leading-relaxed">{step.instruction}</p>
                              {step.command && (
                                <div className="mt-2 p-2 rounded bg-[var(--color-gfs-base)] font-mono text-[10px] text-[var(--color-gfs-green)]">
                                  $ {step.command}
                                </div>
                              )}
                              {step.expectedOutput && (
                                <div className="mt-2 p-2 rounded bg-[var(--color-gfs-surface)]">
                                  <span className="text-[9px] text-[var(--color-gfs-text-muted)] uppercase">Expected Output</span>
                                  <pre className="text-[10px] text-[var(--color-gfs-text-secondary)] font-mono mt-1 whitespace-pre-wrap">{step.expectedOutput}</pre>
                                </div>
                              )}
                              <div className="mt-2 p-2 rounded bg-[var(--color-gfs-accent-dim)]">
                                <Lightbulb className="w-3 h-3 text-[var(--color-gfs-accent)] inline mr-1" />
                                <span className="text-[10px] text-[var(--color-gfs-text-secondary)]">{step.explanation}</span>
                              </div>
                              {step.blueTeamView && (
                                <div className="mt-2 p-2 rounded bg-[var(--color-gfs-blue-dim)] border border-[var(--color-gfs-blue)]/20">
                                  <div className="flex items-center gap-1 mb-1">
                                    <Shield className="w-3 h-3 text-[var(--color-gfs-blue)]" />
                                    <span className="text-[9px] text-[var(--color-gfs-blue)] font-semibold">Blue Team View</span>
                                  </div>
                                  {step.blueTeamView.siemAlert && <p className="text-[9px] text-[var(--color-gfs-text-secondary)]">SIEM: {step.blueTeamView.siemAlert}</p>}
                                  {step.blueTeamView.detectionRule && <p className="text-[9px] text-[var(--color-gfs-text-secondary)]">Rule: {step.blueTeamView.detectionRule}</p>}
                                  {step.blueTeamView.investigation && <p className="text-[9px] text-[var(--color-gfs-text-secondary)]">Investigation: {step.blueTeamView.investigation}</p>}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Card>
              ))}
            </div>
          )}

          {/* Cheat Sheet Tab */}
          {activeTab === 'cheatsheet' && (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {tool.cheatSheet.map((section) => (
                <Card key={section.category} delay={0} className="!p-4">
                  <h3 className="gfs-text-label mb-2">{section.category}</h3>
                  <div className="space-y-1.5">
                    {section.commands.map((cmd) => (
                      <div key={cmd.syntax} className="p-2 rounded bg-[var(--color-gfs-elevated)]">
                        <code className="text-[10px] font-mono text-[var(--color-gfs-accent)]">{cmd.syntax}</code>
                        <p className="text-[9px] text-[var(--color-gfs-text-muted)] mt-0.5">{cmd.description}</p>
                      </div>
                    ))}
                  </div>
                </Card>
              ))}
            </div>
          )}

          {/* Blue Team Tab */}
          {activeTab === 'blueteam' && (
            <div className="space-y-4">
              <Card delay={0} className="!p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Shield className="w-4 h-4 text-[var(--color-gfs-blue)]" />
                  <h3 className="gfs-text-h3 text-[var(--color-gfs-text)]">Blue Team Detection Guide for {tool.name}</h3>
                </div>
                <p className="text-[11px] text-[var(--color-gfs-text-secondary)] leading-relaxed">{tool.defensiveDetection}</p>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card delay={0.05} className="!p-4">
                  <h3 className="gfs-text-label mb-2">SIEM Detection Rules</h3>
                  <div className="space-y-2">
                    <div className="p-2 rounded bg-[var(--color-gfs-elevated)]">
                      <span className="text-[10px] text-[var(--color-gfs-text)]">Sentinel: Multiple connection attempts from single source</span>
                      <p className="text-[9px] text-[var(--color-gfs-text-muted)] mt-0.5">Analytics Rule — Port Scanning Detection</p>
                    </div>
                    <div className="p-2 rounded bg-[var(--color-gfs-elevated)]">
                      <span className="text-[10px] text-[var(--color-gfs-text)]">Sigma: Authentication brute force from network segment</span>
                      <p className="text-[9px] text-[var(--color-gfs-text-muted)] mt-0.5">Sigma Rule — Brute Force Detection</p>
                    </div>
                  </div>
                </Card>
                <Card delay={0.1} className="!p-4">
                  <h3 className="gfs-text-label mb-2">Investigation Workflow</h3>
                  <div className="space-y-2">
                    {['Identify source IP and timestamp', 'Check firewall logs for connection pattern', 'Correlate with EDR telemetry', 'Assess scope — how many systems targeted?', 'Check for follow-up activity', 'Escalate if unauthorized'].map((step, i) => (
                      <div key={i} className="flex items-center gap-2 text-[10px] text-[var(--color-gfs-text-secondary)]">
                        <span className="w-5 h-5 rounded-full bg-[var(--color-gfs-blue-dim)] flex items-center justify-center text-[8px] font-mono text-[var(--color-gfs-blue)]">{i + 1}</span>
                        {step}
                      </div>
                    ))}
                  </div>
                </Card>
                <Card delay={0.15} className="!p-4">
                  <h3 className="gfs-text-label mb-2">Windows Event Logs</h3>
                  <div className="space-y-1">
                    <div className="p-2 rounded bg-[var(--color-gfs-elevated)] text-[10px] font-mono text-[var(--color-gfs-text-secondary)]">Event 4625 — Failed logon</div>
                    <div className="p-2 rounded bg-[var(--color-gfs-elevated)] text-[10px] font-mono text-[var(--color-gfs-text-secondary)]">Event 4648 — Logon with explicit credentials</div>
                    <div className="p-2 rounded bg-[var(--color-gfs-elevated)] text-[10px] font-mono text-[var(--color-gfs-text-secondary)]">Event 4720 — User account created</div>
                  </div>
                </Card>
                <Card delay={0.2} className="!p-4">
                  <h3 className="gfs-text-label mb-2">Network Indicators</h3>
                  <div className="space-y-1">
                    {tool.mitreMapping.map((m) => (
                      <div key={m} className="flex items-center gap-2 text-[10px]">
                        <AlertTriangle className="w-3 h-3 text-[var(--color-gfs-amber)]" />
                        <span className="text-[var(--color-gfs-text-secondary)]">{m}</span>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
