// src/pages/Onboarding.tsx
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Building2, Globe, DollarSign, Users, Server, Shield, Briefcase, Rocket,
  ChevronRight, CheckCircle2, MapPin, CreditCard, Landmark, Wifi,
} from 'lucide-react';
import { useStore } from '@/store/useStore';
import { DEPARTMENTS, TEAM_MEMBERS, ONBOARDING_STEPS } from '@/data/enterprise';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { StatusIndicator } from '@/components/ui/StatusIndicator';

const stepIcons = [Rocket, Building2, Globe, DollarSign, Users, Server, Shield, Briefcase];

function WelcomeStep() {
  return (
    <div className="text-center max-w-lg mx-auto">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
        className="w-24 h-24 rounded-3xl bg-gradient-to-br from-[var(--color-gfs-accent)] to-[var(--color-gfs-blue)] flex items-center justify-center mx-auto mb-8"
        style={{ boxShadow: '0 20px 60px rgba(0,229,199,0.2)' }}
      >
        <Shield className="w-12 h-12 text-[var(--color-gfs-base)]" />
      </motion.div>
      <h2 className="text-3xl font-display font-bold text-[var(--color-gfs-text)] mb-3">Welcome to GFS</h2>
      <p className="text-sm text-[var(--color-gfs-text-secondary)] leading-relaxed mb-6">
        You have been selected to join the Cybersecurity Division of Global Financial Services as a <strong className="text-[var(--color-gfs-accent)]">Security Intern</strong>.
      </p>
      <p className="text-xs text-[var(--color-gfs-text-muted)]">
        GFS operates in 30+ countries with 40,000+ employees and 350+ branches. You will be part of a team responsible for protecting one of the world's leading financial institutions.
      </p>
      <div className="grid grid-cols-3 gap-4 mt-8">
        {[
          { value: '30+', label: 'Countries' },
          { value: '40K+', label: 'Employees' },
          { value: '350+', label: 'Branches' },
        ].map((stat) => (
          <div key={stat.label} className="p-3 rounded-lg bg-[var(--color-gfs-elevated)]">
            <div className="text-xl font-display font-bold text-[var(--color-gfs-accent)]">{stat.value}</div>
            <div className="text-[10px] text-[var(--color-gfs-text-muted)] mt-1">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function HRStep() {
  const { user } = useStore();
  
  if (!user) return null;
  
  return (
    <div className="max-w-lg mx-auto">
      <div className="text-center mb-6">
        <Building2 className="w-10 h-10 text-[var(--color-gfs-accent)] mx-auto mb-3" />
        <h2 className="text-2xl font-display font-bold text-[var(--color-gfs-text)]">HR Induction</h2>
        <p className="text-sm text-[var(--color-gfs-text-secondary)] mt-1">Employee Registration</p>
      </div>
      <div className="gfs-glass rounded-xl p-6">
        <div className="flex items-center gap-4 mb-6 pb-6 border-b border-[var(--color-gfs-border-light)]">
          <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-[var(--color-gfs-accent)] to-[var(--color-gfs-blue)] flex items-center justify-center">
            <span className="text-lg font-bold text-[var(--color-gfs-base)]">{user.avatarInitials}</span>
          </div>
          <div>
            <div className="text-lg font-semibold text-[var(--color-gfs-text)]">{user.name}</div>
            <div className="text-xs text-[var(--color-gfs-text-muted)]">{user.role} — {user.department}</div>
            <div className="text-[10px] text-[var(--color-gfs-accent)] font-mono mt-1">Employee ID: {user.employeeId}</div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 text-xs">
          {[
            { label: 'Department', value: user.department },
            { label: 'Team', value: user.team },
            { label: 'Manager', value: user.manager },
            { label: 'Location', value: user.location },
            { label: 'Start Date', value: new Date(user.startDate).toLocaleDateString() },
            { label: 'Clearance', value: `Level ${user.clearanceLevel}` },
          ].map((field) => (
            <div key={field.label}>
              <div className="text-[10px] text-[var(--color-gfs-text-muted)] uppercase tracking-wider mb-1">{field.label}</div>
              <div className="text-[var(--color-gfs-text)]">{field.value}</div>
            </div>
          ))}
        </div>
        <div className="mt-6 p-3 rounded-lg bg-[var(--color-gfs-green-dim)] border border-[var(--color-gfs-green)]/20">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[var(--color-gfs-green)]" />
            <span className="text-xs text-[var(--color-gfs-green)]">Employee credentials provisioned successfully</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function TourStep() {
  const regions = [
    { name: 'Americas', offices: 12, employees: 15000, hq: 'New York', icon: Globe },
    { name: 'EMEA', offices: 9, employees: 14000, hq: 'London', icon: Globe },
    { name: 'Asia Pacific', offices: 7, employees: 11000, hq: 'Singapore', icon: Globe },
  ];
  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-6">
        <Globe className="w-10 h-10 text-[var(--color-gfs-accent)] mx-auto mb-3" />
        <h2 className="text-2xl font-display font-bold text-[var(--color-gfs-text)]">Company Tour</h2>
        <p className="text-sm text-[var(--color-gfs-text-secondary)] mt-1">30+ Countries. Global Operations.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {regions.map((region, i) => (
          <Card key={region.name} delay={i * 0.1} hover glow="accent">
            <region.icon className="w-8 h-8 text-[var(--color-gfs-accent)] mb-3" />
            <h3 className="text-sm font-semibold text-[var(--color-gfs-text)] mb-2">{region.name}</h3>
            <div className="space-y-1 text-[11px] text-[var(--color-gfs-text-secondary)]">
              <div className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {region.offices} offices</div>
              <div className="flex items-center gap-1"><Users className="w-3 h-3" /> {region.employees.toLocaleString()} employees</div>
              <div className="flex items-center gap-1"><Landmark className="w-3 h-3" /> HQ: {region.hq}</div>
            </div>
          </Card>
        ))}
      </div>
      <div className="mt-4 p-4 rounded-xl bg-[var(--color-gfs-surface)] border border-[var(--color-gfs-border-light)]">
        <h4 className="text-xs font-semibold text-[var(--color-gfs-text)] mb-2">Key Infrastructure</h4>
        <div className="flex flex-wrap gap-2">
          {['New York HQ (Primary DC)', 'London DR Site', 'Singapore Operations', 'Frankfurt Trading', 'AWS (3 regions)', 'Azure (5 regions)', 'Private Cloud (NYC)'].map((infra) => (
            <Badge key={infra} variant="default">{infra}</Badge>
          ))}
        </div>
      </div>
    </div>
  );
}

function BusinessStep() {
  const units = [
    { name: 'Retail Banking', revenue: '$12.4B', icon: CreditCard, color: 'var(--color-gfs-accent)' },
    { name: 'Corporate Banking', revenue: '$8.7B', icon: Building2, color: 'var(--color-gfs-blue)' },
    { name: 'Cards & Payments', revenue: '$5.2B', icon: CreditCard, color: 'var(--color-gfs-purple)' },
    { name: 'Treasury', revenue: '$3.8B', icon: Landmark, color: 'var(--color-gfs-amber)' },
    { name: 'Insurance', revenue: '$6.1B', icon: Shield, color: 'var(--color-gfs-green)' },
    { name: 'Digital Banking', revenue: '$2.9B', icon: Wifi, color: 'var(--color-gfs-red)' },
  ];
  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-6">
        <DollarSign className="w-10 h-10 text-[var(--color-gfs-accent)] mx-auto mb-3" />
        <h2 className="text-2xl font-display font-bold text-[var(--color-gfs-text)]">Business Overview</h2>
        <p className="text-sm text-[var(--color-gfs-text-secondary)] mt-1">$39.1B Annual Revenue</p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {units.map((unit, i) => (
          <Card key={unit.name} delay={i * 0.05} hover>
            <unit.icon className="w-6 h-6 mb-2" style={{ color: unit.color }} />
            <h4 className="text-xs font-semibold text-[var(--color-gfs-text)]">{unit.name}</h4>
            <p className="text-lg font-display font-bold text-[var(--color-gfs-text)] mt-1">{unit.revenue}</p>
            <p className="text-[10px] text-[var(--color-gfs-text-muted)]">Annual Revenue</p>
          </Card>
        ))}
      </div>
    </div>
  );
}

function TeamStep() {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-6">
        <Users className="w-10 h-10 text-[var(--color-gfs-accent)] mx-auto mb-3" />
        <h2 className="text-2xl font-display font-bold text-[var(--color-gfs-text)]">Meet Your Team</h2>
        <p className="text-sm text-[var(--color-gfs-text-secondary)] mt-1">Cybersecurity Division — SOC</p>
      </div>
      <div className="space-y-2">
        {TEAM_MEMBERS.map((member: any, i: number) => (
          <Card key={member.id} delay={i * 0.05} className="!p-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[var(--color-gfs-accent)] to-[var(--color-gfs-blue)] flex items-center justify-center flex-shrink-0">
                <span className="text-xs font-bold text-[var(--color-gfs-base)]">{member.avatarInitials}</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-[var(--color-gfs-text)]">{member.name}</div>
                <div className="text-[11px] text-[var(--color-gfs-text-muted)]">{member.role}</div>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="accent">{member.department}</Badge>
                <StatusIndicator status={member.status === 'online' ? 'online' : member.status === 'away' ? 'away' : 'offline'} />
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

function InfraStep() {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-6">
        <Server className="w-10 h-10 text-[var(--color-gfs-accent)] mx-auto mb-3" />
        <h2 className="text-2xl font-display font-bold text-[var(--color-gfs-text)]">Enterprise Infrastructure</h2>
        <p className="text-sm text-[var(--color-gfs-text-secondary)] mt-1">Systems You Will Help Protect</p>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {[
          { label: 'Endpoints', count: '38,000+', icon: '💻' },
          { label: 'Servers', count: '2,400+', icon: '🖥️' },
          { label: 'Cloud Instances', count: '640+', icon: '☁️' },
          { label: 'Databases', count: '850+', icon: '🗄️' },
          { label: 'Firewalls', count: '120+', icon: '🛡️' },
          { label: 'Network Devices', count: '3,200+', icon: '🌐' },
        ].map((item, i) => (
          <Card key={item.label} delay={i * 0.05} className="!p-3">
            <div className="flex items-center gap-3">
              <span className="text-2xl">{item.icon}</span>
              <div>
                <div className="text-lg font-display font-bold text-[var(--color-gfs-text)]">{item.count}</div>
                <div className="text-[11px] text-[var(--color-gfs-text-muted)]">{item.label}</div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

function SecurityStep() {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-6">
        <Shield className="w-10 h-10 text-[var(--color-gfs-accent)] mx-auto mb-3" />
        <h2 className="text-2xl font-display font-bold text-[var(--color-gfs-text)]">Security Posture</h2>
        <p className="text-sm text-[var(--color-gfs-text-secondary)] mt-1">Defense in Depth at GFS</p>
      </div>
      <div className="space-y-3">
        {[
          { layer: 'Perimeter', status: 'Palo Alto PA-7080 Cluster', health: 'online' as const },
          { layer: 'Network', status: 'Segmented VLANs + Micro-segmentation', health: 'online' as const },
          { layer: 'Endpoint', status: 'CrowdStrike Falcon (38K+ endpoints)', health: 'online' as const },
          { layer: 'Identity', status: 'Azure AD + Conditional Access + MFA', health: 'online' as const },
          { layer: 'Application', status: 'WAF + API Gateway + DAST scanning', health: 'online' as const },
          { layer: 'Data', status: 'DLP + Encryption + Tokenization', health: 'online' as const },
          { layer: 'Cloud', status: 'Defender for Cloud + CSPM + CWPP', health: 'online' as const },
          { layer: 'Monitoring', status: 'Sentinel SIEM + Splunk + EDR', health: 'degraded' as const },
        ].map((item, i) => (
          <motion.div
            key={item.layer}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.08 }}
            className="flex items-center gap-3 p-3 rounded-lg bg-[var(--color-gfs-surface)] border border-[var(--color-gfs-border-light)]"
          >
            <StatusIndicator status={item.health} />
            <div className="flex-1">
              <div className="text-xs font-semibold text-[var(--color-gfs-text)]">{item.layer}</div>
              <div className="text-[10px] text-[var(--color-gfs-text-muted)]">{item.status}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function AssignmentStep() {
  const { user } = useStore();
  if (!user) return null;

  return (
    <div className="max-w-lg mx-auto text-center">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.3, type: 'spring' }}
        className="w-20 h-20 rounded-2xl bg-[var(--color-gfs-amber-dim)] flex items-center justify-center mx-auto mb-6"
      >
        <Briefcase className="w-10 h-10 text-[var(--color-gfs-amber)]" />
      </motion.div>
      <h2 className="text-2xl font-display font-bold text-[var(--color-gfs-text)] mb-3">Your First Assignment</h2>
      <p className="text-sm text-[var(--color-gfs-text-secondary)] mb-6">
        A critical security alert has been triggered. Your manager {user.manager} has assigned this to you as your first investigation.
      </p>
      <div className="gfs-glass rounded-xl p-4 text-left mb-6">
        <div className="flex items-center gap-2 mb-2">
          <Badge variant="critical" pulse>CRITICAL</Badge>
          <span className="text-[10px] font-mono text-[var(--color-gfs-text-muted)]">ALT-2024-8841</span>
        </div>
        <h4 className="text-sm font-semibold text-[var(--color-gfs-text)]">Potential Data Exfiltration</h4>
        <p className="text-xs text-[var(--color-gfs-text-secondary)] mt-1">
          Large outbound data transfer detected from FS-APP-PROD-03 to external IP 185.220.101.42. Volume exceeds baseline by 3,400%. Destination flagged as known C2 infrastructure.
        </p>
        <div className="flex items-center gap-2 mt-3">
          <Badge variant="default">MITRE: T1041</Badge>
          <Badge variant="default">Exfiltration</Badge>
          <Badge variant="default">Source: Sentinel</Badge>
        </div>
      </div>
      <p className="text-xs text-[var(--color-gfs-text-muted)]">
        This assignment will test your ability to investigate alerts, analyze logs, and make containment decisions. Your progress will be tracked.
      </p>
    </div>
  );
}

const STEP_COMPONENTS = [WelcomeStep, HRStep, TourStep, BusinessStep, TeamStep, InfraStep, SecurityStep, AssignmentStep];

export function Onboarding() {
  const [step, setStep] = useState(0);
  const { completeOnboarding } = useStore();
  const totalSteps = STEP_COMPONENTS.length;
  const CurrentStepComponent = STEP_COMPONENTS[step];

  return (
    <div className="min-h-[calc(100vh-8rem)] flex flex-col">
      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <div className="text-xs text-[var(--color-gfs-text-muted)]">
            Step {step + 1} of {totalSteps}
          </div>
          <div className="text-xs text-[var(--color-gfs-accent)] font-mono">
            {Math.round(((step + 1) / totalSteps) * 100)}% Complete
          </div>
        </div>
        <div className="h-1 bg-[var(--color-gfs-elevated)] rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-[var(--color-gfs-accent)] to-[var(--color-gfs-blue)] rounded-full"
            animate={{ width: `${((step + 1) / totalSteps) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
        {/* Step indicators */}
        <div className="flex items-center gap-1 mt-3">
          {ONBOARDING_STEPS.slice(0, totalSteps).map((s: any, i: number) => {
            const Icon = stepIcons[i];
            return (
              <button
                key={s.id}
                onClick={() => setStep(i)}
                className={`flex-1 h-1 rounded-full transition-colors ${
                  i <= step ? 'bg-[var(--color-gfs-accent)]' : 'bg-[var(--color-gfs-elevated)]'
                }`}
                title={s.title}
              />
            );
          })}
        </div>
      </div>

      {/* Step Content */}
      <div className="flex-1 flex items-center justify-center py-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="w-full"
          >
            <CurrentStepComponent />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between pt-4 border-t border-[var(--color-gfs-border-light)]">
        <div className="flex gap-2">
          <button
            onClick={() => setStep(Math.max(0, step - 1))}
            disabled={step === 0}
            className="px-4 py-2 rounded-lg text-xs text-[var(--color-gfs-text-secondary)] hover:text-[var(--color-gfs-text)] hover:bg-[var(--color-gfs-elevated)] transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          <button
            onClick={completeOnboarding}
            className="px-4 py-2 rounded-lg text-xs text-[var(--color-gfs-text-muted)] hover:text-[var(--color-gfs-text)] transition-colors"
          >
            Skip Onboarding
          </button>
        </div>
        <div className="text-[10px] text-[var(--color-gfs-text-muted)]">
          {ONBOARDING_STEPS[step].title} — {ONBOARDING_STEPS[step].subtitle}
        </div>
        {step < totalSteps - 1 ? (
          <button
            onClick={() => setStep(step + 1)}
            className="px-4 py-2 rounded-lg text-xs font-medium bg-[var(--color-gfs-accent-dim)] text-[var(--color-gfs-accent)] hover:bg-[var(--color-gfs-accent)]/20 transition-colors flex items-center gap-1"
          >
            Continue <ChevronRight className="w-3 h-3" />
          </button>
        ) : (
          <button
            onClick={completeOnboarding}
            className="px-4 py-2 rounded-lg text-xs font-medium bg-gradient-to-r from-[var(--color-gfs-accent)] to-[var(--color-gfs-blue)] text-[var(--color-gfs-base)] hover:opacity-90 transition-opacity flex items-center gap-1"
          >
            Begin Investigation <Rocket className="w-3 h-3" />
          </button>
        )}
      </div>
    </div>
  );
}
