import { useState } from 'react';
import { motion } from 'framer-motion';
import { Target, Crosshair } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { PageHeader } from '@/components/layout/PageHeader';
import { EthicalHackingWorkspace } from './EthicalHackingWorkspace';
import { ToolRepository } from './ToolRepository';
import { ToolDetailPage } from './ToolDetailPage';
import { EngagementDetail } from './EngagementDetail';
import { AttackChainsPage } from './AttackChainsPage';
import { GFS_LAB_HOSTS } from '@/data/gfsLab';
import { ENGAGEMENTS } from '@/data/engagements';
import { OFFENSIVE_TOOLS } from '@/data/tools';
import type { OffensiveTool, Engagement } from '@/types/offensive';
import { Globe, Radio, Database, Bug, Shield, Terminal, BookOpen, Target as TargetIcon, Zap, FileText, Eye, AlertTriangle } from 'lucide-react';

export function EthicalHackingWorkspaceFull() {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [selectedTool, setSelectedTool] = useState<OffensiveTool | null>(null);
  const [selectedEngagement, setSelectedEngagement] = useState<Engagement | null>(null);

  const renderContent = () => {
    // Tool detail
    if (selectedTool) return <ToolDetailPage tool={selectedTool} onBack={() => setSelectedTool(null)} />;
    // Engagement detail
    if (selectedEngagement) return <EngagementDetail engagement={selectedEngagement} onBack={() => setSelectedEngagement(null)} />;

    switch (activeSection) {
      case 'dashboard':
        return <OffSecDashboard onSelectEngagement={setSelectedEngagement} onSelectTool={setSelectedTool} onNavigate={setActiveSection} />;
      case 'engagements':
        return <EngagementsList onSelect={setSelectedEngagement} />;
      case 'tools':
        return <ToolRepository onSelectTool={setSelectedTool} />;
      case 'attack-chains':
        return <AttackChainsPage />;
      case 'labs':
        return <LabsPage />;
      case 'terminal':
        return <GlobalTerminal />;
      case 'cheat-sheets':
        return <CheatSheetsGlobal />;
      case 'recon':
      case 'scanning':
      case 'enum':
      case 'vuln-assess':
        return <ReconPhase section={activeSection} onSelectTool={setSelectedTool} />;
      case 'webapp':
      case 'api-sec':
      case 'wireless':
      case 'ad-assess':
      case 'password-sec':
        return <ExploitPhase section={activeSection} onSelectTool={setSelectedTool} />;
      case 'exploitation':
      case 'post-exploit':
        return <ExploitPhase section={activeSection} onSelectTool={setSelectedTool} />;
      case 'reporting':
        return <ReportingPage />;
      default:
        return <OffSecDashboard onSelectEngagement={setSelectedEngagement} onSelectTool={setSelectedTool} onNavigate={setActiveSection} />;
    }
  };

  return (
    <EthicalHackingWorkspace activeSection={activeSection} onSectionChange={(s) => { setActiveSection(s); setSelectedTool(null); setSelectedEngagement(null); }}>
      {renderContent()}
    </EthicalHackingWorkspace>
  );
}

// ── Dashboard ──
function OffSecDashboard({ onSelectEngagement, onSelectTool, onNavigate }: { onSelectEngagement: (e: Engagement) => void; onSelectTool: (t: OffensiveTool) => void; onNavigate: (s: string) => void }) {
  return (
    <div className="space-y-4">
      <PageHeader icon={<Crosshair className="w-5 h-5 text-[var(--color-gfs-red)]" />} title="Red Team Operations Center" subtitle="GFS Offensive Security — Authorized Penetration Testing" badge={<Badge variant="critical">ENGAGEMENT ACTIVE</Badge>} />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { label: 'Active Engagements', value: ENGAGEMENTS.filter((e) => e.status === 'active').length.toString(), color: 'var(--color-gfs-accent)', icon: Target },
          { label: 'Critical Findings', value: ENGAGEMENTS.flatMap((e) => e.findings).filter((f) => f.severity === 'critical').length.toString(), color: 'var(--color-gfs-red)', icon: AlertTriangle },
          { label: 'Tools Available', value: OFFENSIVE_TOOLS.length.toString(), color: 'var(--color-gfs-blue)', icon: Terminal },
          { label: 'Lab Hosts', value: GFS_LAB_HOSTS.length.toString(), color: 'var(--color-gfs-green)', icon: Globe },
        ].map((kpi, i) => (
          <Card key={kpi.label} delay={i * 0.03} className="!p-3">
            <div className="text-[10px] text-[var(--color-gfs-text-muted)]">{kpi.label}</div>
            <div className="text-xl font-display font-bold mt-0.5" style={{ color: kpi.color }}>{kpi.value}</div>
          </Card>
        ))}
      </div>

      {/* Active Engagements */}
      <Card delay={0.1} className="!p-4">
        <div className="flex items-center gap-2 mb-3">
          <Target className="w-3.5 h-3.5 text-[var(--color-gfs-accent)]" />
          <span className="text-xs font-semibold text-[var(--color-gfs-text)]">Active Engagements</span>
        </div>
        {ENGAGEMENTS.filter((e) => e.status === 'active').map((eng) => (
          <div key={eng.id} onClick={() => onSelectEngagement(eng)} className="p-3 rounded-lg bg-[var(--color-gfs-elevated)] border border-[var(--color-gfs-border-light)] mb-2 cursor-pointer hover:border-[var(--color-gfs-accent)]/30 transition-colors">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[11px] font-semibold text-[var(--color-gfs-text)]">{eng.name}</span>
                <div className="text-[10px] text-[var(--color-gfs-text-muted)]">{eng.code} • {eng.type}</div>
              </div>
              <Badge variant="accent">{eng.findings.length} findings</Badge>
            </div>
          </div>
        ))}
      </Card>

      {/* GFS Lab Infrastructure */}
      <Card delay={0.15} className="!p-4">
        <div className="flex items-center gap-2 mb-3">
          <Globe className="w-3.5 h-3.5 text-[var(--color-gfs-blue)]" />
          <span className="text-xs font-semibold text-[var(--color-gfs-text)]">GFS Lab Infrastructure</span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-2">
          {GFS_LAB_HOSTS.map((host) => (
            <div key={host.id} className="p-2.5 rounded-lg bg-[var(--color-gfs-elevated)] border border-[var(--color-gfs-border-light)]">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-semibold text-[var(--color-gfs-text)]">{host.hostname}</span>
                <div className="w-2 h-2 rounded-full" style={{
                  background: host.status === 'online' ? 'var(--color-gfs-green)' : host.status === 'vulnerable' ? 'var(--color-gfs-amber)' : host.status === 'compromised' ? 'var(--color-gfs-red)' : 'var(--color-gfs-text-muted)',
                }} />
              </div>
              <div className="text-[9px] text-[var(--color-gfs-text-muted)]">{host.ip}</div>
              <div className="text-[9px] text-[var(--color-gfs-text-muted)]">{host.os}</div>
              <Badge variant={host.status === 'vulnerable' ? 'medium' : host.status === 'online' ? 'success' : 'default'}>{host.status}</Badge>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

// ── Engagements List ──
function EngagementsList({ onSelect }: { onSelect: (e: Engagement) => void }) {
  return (
    <div className="space-y-3">
      <PageHeader icon={<Target className="w-5 h-5 text-[var(--color-gfs-accent)]" />} title="Engagements" subtitle={`${ENGAGEMENTS.length} penetration testing engagements`} />
      {ENGAGEMENTS.map((eng, i) => (
        <Card key={eng.id} delay={i * 0.05} hover onClick={() => onSelect(eng)} className="!p-4">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-semibold text-[var(--color-gfs-text)]">{eng.name}</span>
                <Badge variant="default">{eng.code}</Badge>
                <Badge variant={eng.status === 'active' ? 'accent' : 'success'}>{eng.status}</Badge>
              </div>
              <p className="text-[10px] text-[var(--color-gfs-text-muted)] mt-0.5">{eng.type} • {eng.startDate} → {eng.endDate}</p>
              <div className="flex items-center gap-3 mt-1 text-[9px] text-[var(--color-gfs-text-muted)]">
                <span>{eng.findings.length} findings</span>
                <span>{eng.team.join(', ')}</span>
                <span>Severity: {eng.severity}</span>
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}

// ── Recon Phase ──
function ReconPhase({ section, onSelectTool }: { section: string; onSelectTool: (t: OffensiveTool) => void }) {
  const sectionTools: Record<string, string[]> = {
    recon: ['tool-nmap', 'tool-gobuster', 'tool-nikto'],
    scanning: ['tool-nmap'],
    enum: ['tool-gobuster', 'tool-nikto'],
    'vuln-assess': ['tool-nmap', 'tool-nikto'],
  };
  const toolIds = sectionTools[section] || ['tool-nmap'];
  const tools = OFFENSIVE_TOOLS.filter((t) => toolIds.includes(t.id));
  const sectionNames: Record<string, string> = { recon: 'Reconnaissance', scanning: 'Network Scanning', enum: 'Enumeration', 'vuln-assess': 'Vulnerability Assessment' };

  return (
    <div className="space-y-4">
      <PageHeader icon={<Globe className="w-5 h-5 text-[var(--color-gfs-accent)]" />} title={sectionNames[section] || section} subtitle="Phase 1-2: Reconnaissance & Enumeration" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {tools.map((tool) => (
          <Card key={tool.id} delay={0} hover onClick={() => onSelectTool(tool)} className="!p-4">
            <div className="flex items-start gap-3">
              <span className="text-2xl">{tool.icon}</span>
              <div>
                <span className="text-[11px] font-semibold text-[var(--color-gfs-text)]">{tool.name}</span>
                <p className="text-[10px] text-[var(--color-gfs-text-muted)] mt-0.5">{tool.description}</p>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="accent">{tool.commands.length} commands</Badge>
                  <Badge variant="default">{tool.labs.length} labs</Badge>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

// ── Exploit Phase ──
function ExploitPhase({ section, onSelectTool }: { section: string; onSelectTool: (t: OffensiveTool) => void }) {
  const sectionTools: Record<string, string[]> = {
    webapp: ['tool-burp', 'tool-sqlmap', 'tool-nikto'],
    'api-sec': ['tool-burp', 'tool-sqlmap'],
    wireless: ['tool-nmap'],
    'ad-assess': ['tool-nmap', 'tool-metasploit', 'tool-hashcat', 'tool-hydra'],
    'password-sec': ['tool-hydra', 'tool-hashcat'],
    exploitation: ['tool-metasploit', 'tool-sqlmap'],
    'post-exploit': ['tool-metasploit'],
  };
  const toolIds = sectionTools[section] || ['tool-metasploit'];
  const tools = OFFENSIVE_TOOLS.filter((t) => toolIds.includes(t.id));

  return (
    <div className="space-y-4">
      <PageHeader icon={<Zap className="w-5 h-5 text-[var(--color-gfs-red)]" />} title={section.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())} subtitle="Phase 3-4: Exploitation & Post-Exploitation" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {tools.map((tool) => (
          <Card key={tool.id} delay={0} hover onClick={() => onSelectTool(tool)} className="!p-4">
            <div className="flex items-start gap-3">
              <span className="text-2xl">{tool.icon}</span>
              <div>
                <span className="text-[11px] font-semibold text-[var(--color-gfs-text)]">{tool.name}</span>
                <p className="text-[10px] text-[var(--color-gfs-text-muted)] mt-0.5">{tool.description}</p>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="accent">{tool.commands.length} commands</Badge>
                  <Badge variant="default">{tool.labs.length} labs</Badge>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

// ── Global Terminal ──
function GlobalTerminal() {
  const [history, setHistory] = useState<{ cmd: string; output: string }[]>([]);
  const [input, setInput] = useState('');
  const exec = (cmd: string) => {
    if (!cmd.trim()) return;
    setHistory((h) => [...h, { cmd, output: `root@KALI-ATTACKER:~# ${cmd}\n\n[Simulated output — switch to a specific tool terminal for interactive sessions]` }]);
    setInput('');
  };
  return (
    <div className="space-y-4">
      <PageHeader icon={<Terminal className="w-5 h-5 text-[var(--color-gfs-green)]" />} title="Interactive Terminal" subtitle="KALI-ATTACKER — GFS Red Team Workstation" badge={<Badge variant="success">CONNECTED</Badge>} />
      <div className="rounded-xl border border-[var(--color-gfs-border-light)] overflow-hidden bg-[#0d1117]">
        <div className="px-4 py-2 border-b border-[var(--color-gfs-border-light)] flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[var(--color-gfs-red)]" />
          <div className="w-3 h-3 rounded-full bg-[var(--color-gfs-amber)]" />
          <div className="w-3 h-3 rounded-full bg-[var(--color-gfs-green)]" />
          <span className="text-[10px] font-mono text-[var(--color-gfs-text-muted)] ml-2">root@KALI-ATTACKER — bash</span>
        </div>
        <div className="p-4 font-mono text-[11px] min-h-[500px] max-h-[600px] overflow-y-auto">
          <div className="text-[var(--color-gfs-green)] mb-1">root@KALI-ATTACKER:~# uname -a</div>
          <div className="text-[var(--color-gfs-text-secondary)] mb-3">Linux KALI-ATTACKER 6.5.0-kali3-amd64 #1 SMP Debian x86_64 GNU/Linux</div>
          {history.map((h, i) => (
            <div key={i} className="mb-3">
              <div className="text-[var(--color-gfs-green)]">$ {h.cmd}</div>
              <pre className="text-[var(--color-gfs-text-secondary)] whitespace-pre-wrap mt-1 text-[10px]">{h.output}</pre>
            </div>
          ))}
          <div className="flex items-center gap-2">
            <span className="text-[var(--color-gfs-green)]">$</span>
            <input value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && exec(input)}
              className="flex-1 bg-transparent text-[var(--color-gfs-text)] focus:outline-none font-mono" placeholder="root@KALI-ATTACKER:~#" autoFocus />
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Labs Page ──
function LabsPage() {
  return (
    <div className="space-y-4">
      <PageHeader icon={<Target className="w-5 h-5 text-[var(--color-gfs-accent)]" />} title="Enterprise Labs" subtitle="GFS simulated infrastructure for offensive security practice" />
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
        {GFS_LAB_HOSTS.filter((h) => h.type !== 'attacker').map((host) => (
          <Card key={host.id} delay={0} className="!p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-mono font-bold text-[var(--color-gfs-text)]">{host.hostname}</span>
              <Badge variant={host.status === 'vulnerable' ? 'medium' : 'success'}>{host.status}</Badge>
            </div>
            <div className="text-[10px] text-[var(--color-gfs-text-muted)]">{host.ip} • {host.os}</div>
            <div className="text-[10px] text-[var(--color-gfs-text-secondary)] mt-1">{host.businessPurpose}</div>
            <div className="mt-2">
              <span className="gfs-text-label text-[8px]">Open Ports</span>
              <div className="flex flex-wrap gap-1 mt-1">
                {host.openPorts.map((p) => <Badge key={p.port} variant="default">{p.port}/{p.service}</Badge>)}
              </div>
            </div>
            {host.vulnerabilities.length > 0 && (
              <div className="mt-2">
                <span className="gfs-text-label text-[8px]">Known Vulnerabilities</span>
                <div className="space-y-0.5 mt-1">
                  {host.vulnerabilities.map((v) => <div key={v} className="text-[9px] text-[var(--color-gfs-amber)]">• {v}</div>)}
                </div>
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}

// ── Cheat Sheets Global ──
function CheatSheetsGlobal() {
  const [search, setSearch] = useState('');
  const allCommands = OFFENSIVE_TOOLS.flatMap((t) => t.cheatSheet.flatMap((cs) => cs.commands.map((c) => ({ ...c, tool: t.name }))));
  const filtered = search ? allCommands.filter((c) => c.syntax.toLowerCase().includes(search.toLowerCase()) || c.description.toLowerCase().includes(search.toLowerCase()) || c.tool.toLowerCase().includes(search.toLowerCase())) : allCommands;

  return (
    <div className="space-y-4">
      <PageHeader icon={<BookOpen className="w-5 h-5 text-[var(--color-gfs-accent)]" />} title="Cheat Sheets" subtitle={`${allCommands.length} commands across ${OFFENSIVE_TOOLS.length} tools`} />
      <div className="relative">
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search commands... (e.g., smb, nmap, brute)"
          className="w-full px-4 py-2.5 rounded-lg bg-[var(--color-gfs-surface)] border border-[var(--color-gfs-border-light)] text-xs text-[var(--color-gfs-text)] placeholder:text-[var(--color-gfs-text-muted)] focus:outline-none focus:border-[var(--color-gfs-accent)]" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
        {filtered.slice(0, 30).map((cmd, i) => (
          <div key={i} className="p-2.5 rounded-lg bg-[var(--color-gfs-surface)] border border-[var(--color-gfs-border-light)]">
            <div className="flex items-center gap-2 mb-1">
              <Badge variant="accent">{cmd.tool}</Badge>
            </div>
            <code className="text-[10px] font-mono text-[var(--color-gfs-accent)]">{cmd.syntax}</code>
            <p className="text-[9px] text-[var(--color-gfs-text-muted)] mt-0.5">{cmd.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Reporting Page ──
function ReportingPage() {
  return (
    <div className="space-y-4">
      <PageHeader icon={<FileText className="w-5 h-5 text-[var(--color-gfs-accent)]" />} title="Reporting" subtitle="Generate penetration test reports" />
      <Card delay={0} className="!p-8 text-center">
        <FileText className="w-8 h-8 text-[var(--color-gfs-text-muted)] mx-auto mb-3 opacity-30" />
        <p className="text-[11px] text-[var(--color-gfs-text-muted)]">Select an engagement from the Engagements section to generate a report.</p>
      </Card>
    </div>
  );
}
