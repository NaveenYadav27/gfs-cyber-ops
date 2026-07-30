import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, SkipForward, SkipBack, X, ChevronRight, Monitor, Volume2 } from 'lucide-react';
import { useEnterprise } from '@/store/useEnterprise';
import { useStore } from '@/store/useStore';

interface WebinarStep {
  id: string;
  order: number;
  title: string;
  page: string;
  narration: string;
  duration: number;
  highlight?: string;
}

const WEBINAR_STEPS: WebinarStep[] = [
  { id: 'ws-1', order: 1, title: 'Enterprise Dashboard', page: 'dashboard', narration: 'Welcome to the GFS Enterprise Cyber Operations Platform. This is the live dashboard used by 48,000+ employees across 12 countries.', duration: 8 },
  { id: 'ws-2', order: 2, title: 'Inside GFS — Corporate Overview', page: 'about-gfs', narration: 'Global Financial Services is a multinational bank headquartered in Amaravati, Andhra Pradesh. We serve 75 million customers through 1,200+ branches.', duration: 8 },
  { id: 'ws-3', order: 3, title: 'Corporate Headquarters', page: 'office-tour', narration: 'Our Global Financial Center in Amaravati houses the executive leadership and corporate functions. The campus spans 45 acres.', duration: 6 },
  { id: 'ws-4', order: 4, title: 'Executive Leadership', page: 'org-chart', narration: 'The organization is led by Chairman Vikram Reddy and CEO Priya Kapoor, with a 12-member Executive Committee.', duration: 6 },
  { id: 'ws-5', order: 5, title: 'Cyber Defense Organization', page: 'soc', narration: 'Our Cyber Defense division is led by CISO Ananya Das. The SOC operates 24/7 using a follow-the-sun model across Hyderabad and Mumbai.', duration: 8 },
  { id: 'ws-6', order: 6, title: 'SOC Console — Live Operations', page: 'soc', narration: 'The SOC console shows real-time alert triage. Currently handling 147 alerts today with a mean triage time of 3.2 minutes.', duration: 10 },
  { id: 'ws-7', order: 7, title: 'Enterprise Infrastructure', page: 'enterprise-map', narration: 'GFS operates across 3 data centers, 4 Azure subscriptions, and 42,100+ endpoints. All connected through redundant network paths.', duration: 8 },
  { id: 'ws-8', order: 8, title: 'Live Enterprise Activity', page: 'activity', narration: 'The enterprise continuously generates activity — employee logins, firewall events, cloud deployments, and security alerts. All visible in real-time.', duration: 8 },
  { id: 'ws-9', order: 9, title: 'Threat Alert — Active Investigation', page: 'threat-intel', narration: 'The threat intelligence team is tracking Silk Typhoon, a Chinese APT group actively targeting Indian financial institutions.', duration: 8 },
  { id: 'ws-10', order: 10, title: 'Career Journey', page: 'career', narration: 'GFS invests in employee growth. The Cyber Defense career path goes from Security Intern to Director, with structured progression and mentorship.', duration: 6 },
];

export function WebinarMode() {
  const { webinarMode, webinarStep, toggleWebinar, advanceWebinar, setWebinarStep } = useEnterprise();
  const { setCurrentPage } = useStore();
  const [playing, setPlaying] = useState(true);

  // Auto-advance
  useEffect(() => {
    if (!webinarMode || !playing) return;
    const step = WEBINAR_STEPS[webinarStep];
    if (!step) return;

    setCurrentPage(step.page);

    const timer = setTimeout(() => {
      if (webinarStep < WEBINAR_STEPS.length - 1) {
        advanceWebinar();
      } else {
        setPlaying(false);
      }
    }, step.duration * 1000);

    return () => clearTimeout(timer);
  }, [webinarMode, webinarStep, playing]);

  if (!webinarMode) {
    return (
      <button onClick={toggleWebinar}
        className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[var(--color-gfs-accent-dim)] text-[10px] text-[var(--color-gfs-accent)] hover:bg-[var(--color-gfs-accent)]/15 transition-colors border border-[var(--color-gfs-accent)]/20">
        <Play className="w-3 h-3" /> Webinar Demo
      </button>
    );
  }

  const current = WEBINAR_STEPS[webinarStep];
  const progress = ((webinarStep + 1) / WEBINAR_STEPS.length) * 100;

  return (
    <AnimatePresence>
      <motion.div initial={{ y: 100, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        className="fixed bottom-0 left-0 right-0 z-[var(--z-modal)]">
        {/* Progress bar */}
        <div className="h-1 bg-[var(--color-gfs-elevated)]">
          <motion.div className="h-full bg-gradient-to-r from-[var(--color-gfs-accent)] to-[var(--color-gfs-blue)]"
            animate={{ width: `${progress}%` }} transition={{ duration: 0.3 }} />
        </div>

        {/* Panel */}
        <div className="bg-[var(--color-gfs-deep)] border-t border-[var(--color-gfs-border)] px-6 py-3 flex items-center gap-4">
          {/* Step info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-[var(--color-gfs-accent)] font-mono">{webinarStep + 1}/{WEBINAR_STEPS.length}</span>
              <span className="text-xs font-semibold text-[var(--color-gfs-text)]">{current?.title}</span>
            </div>
            <p className="text-[10px] text-[var(--color-gfs-text-secondary)] mt-0.5 line-clamp-1">{current?.narration}</p>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-1.5">
            <button onClick={() => { if (webinarStep > 0) setWebinarStep(webinarStep - 1); }}
              className="w-7 h-7 rounded flex items-center justify-center text-[var(--color-gfs-text-muted)] hover:text-[var(--color-gfs-text)] hover:bg-[var(--color-gfs-hover)]">
              <SkipBack className="w-3.5 h-3.5" />
            </button>
            <button onClick={() => setPlaying(!playing)}
              className="w-8 h-8 rounded-lg bg-[var(--color-gfs-accent)] flex items-center justify-center text-[var(--color-gfs-base)]">
              {playing ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </button>
            <button onClick={() => { if (webinarStep < WEBINAR_STEPS.length - 1) advanceWebinar(); }}
              className="w-7 h-7 rounded flex items-center justify-center text-[var(--color-gfs-text-muted)] hover:text-[var(--color-gfs-text)] hover:bg-[var(--color-gfs-hover)]">
              <SkipForward className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Close */}
          <button onClick={() => { toggleWebinar(); setPlaying(true); }}
            className="w-7 h-7 rounded flex items-center justify-center text-[var(--color-gfs-text-muted)] hover:text-[var(--color-gfs-red)] hover:bg-[var(--color-gfs-red-dim)]">
            <X className="w-4 h-4" />
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
