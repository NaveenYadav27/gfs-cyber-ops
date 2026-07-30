import { useEffect } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { TopNavigation } from '@/components/layout/TopNavigation';
import { WebinarMode } from '@/components/webinar/WebinarMode';
import { AICompanion } from '@/components/learning/AICompanion';
import { InspectorPanel } from '@/components/ui/InspectorPanel';
import { useInspector } from '@/store/useInspector';
import { useEnterprise } from '@/store/useEnterprise';
import { useLearningEngine } from '@/store/useLearningEngine';
import { useStore } from '@/store/useStore';
import { motion, AnimatePresence } from 'framer-motion';
import React, { Suspense, lazy } from 'react';

// ── Lazy Page Imports ──
const EnterpriseDashboard = lazy(() => import('@/pages/EnterpriseDashboard').then((m) => ({ default: m.EnterpriseDashboard })));
const AboutGFS = lazy(() => import('@/pages/AboutGFS').then((m) => ({ default: m.AboutGFS })));
const EmployeeDirectory = lazy(() => import('@/pages/EmployeeDirectory').then((m) => ({ default: m.EmployeeDirectory })));
const CareerJourney = lazy(() => import('@/pages/CareerJourney').then((m) => ({ default: m.CareerJourney })));
const SOCOperations = lazy(() => import('@/pages/SOCOperations').then((m) => ({ default: m.SOCOperations })));
const SIEMAnalytics = lazy(() => import('@/pages/SIEMAnalytics').then((m) => ({ default: m.SIEMAnalytics })));
const EDRConsole = lazy(() => import('@/pages/EDRConsole').then((m) => ({ default: m.EDRConsole })));
const ThreatIntelPage = lazy(() => import('@/pages/ThreatIntelPage').then((m) => ({ default: m.ThreatIntelPage })));
const VulnerabilityDashboard = lazy(() => import('@/pages/VulnerabilityDashboard').then((m) => ({ default: m.VulnerabilityDashboard })));
const FirewallManagement = lazy(() => import('@/pages/FirewallManagement').then((m) => ({ default: m.FirewallManagement })));
const ActiveDirectoryPage = lazy(() => import('@/pages/ActiveDirectoryPage').then((m) => ({ default: m.ActiveDirectoryPage })));
const CloudSecurity = lazy(() => import('@/pages/CloudSecurity').then((m) => ({ default: m.CloudSecurity })));
const AccessManagementPage = lazy(() => import('@/pages/AccessManagementPage').then((m) => ({ default: m.AccessManagementPage })));
const PAMPage = lazy(() => import('@/pages/PAMPage').then((m) => ({ default: m.PAMPage })));
const PlaybooksPage = lazy(() => import('@/pages/PlaybooksPage').then((m) => ({ default: m.PlaybooksPage })));
const AuditLogPage = lazy(() => import('@/pages/AuditLogPage').then((m) => ({ default: m.AuditLogPage })));
const FrameworksPage = lazy(() => import('@/pages/FrameworksPage').then((m) => ({ default: m.FrameworksPage })));
const SOCWorkspaceFull = lazy(() => import('@/pages/SOCWorkspaceFull').then((m) => ({ default: m.SOCWorkspaceFull })));
const EthicalHackingWorkspaceFull = lazy(() => import('@/pages/EthicalHackingWorkspaceFull').then((m) => ({ default: m.EthicalHackingWorkspaceFull })));
const VAPTPage = lazy(() => import('@/pages/VAPTPage').then((m) => ({ default: m.VAPTPage })));
const PurpleTeamPage = lazy(() => import('@/pages/PurpleTeamPage').then((m) => ({ default: m.PurpleTeamPage })));
const ServiceDesk = lazy(() => import('@/pages/ServiceDesk').then((m) => ({ default: m.ServiceDesk })));
const ActivityFeed = lazy(() => import('@/pages/ActivityFeed').then((m) => ({ default: m.ActivityFeed })));
const EnterpriseNews = lazy(() => import('@/pages/EnterpriseNews').then((m) => ({ default: m.EnterpriseNews })));
const DailySchedule = lazy(() => import('@/pages/DailySchedule').then((m) => ({ default: m.DailySchedule })));
const InternalMessaging = lazy(() => import('@/pages/InternalMessaging').then((m) => ({ default: m.InternalMessaging })));
const ChangeManagement = lazy(() => import('@/pages/ChangeManagement').then((m) => ({ default: m.ChangeManagement })));
const OrgChart = lazy(() => import('@/pages/OrgChart').then((m) => ({ default: m.OrgChart })));
const BusinessUnits = lazy(() => import('@/pages/BusinessUnits').then((m) => ({ default: m.BusinessUnits })));
const DepartmentDashboards = lazy(() => import('@/pages/DepartmentDashboards').then((m) => ({ default: m.DepartmentDashboards })));
const OfficeTour = lazy(() => import('@/pages/OfficeTour').then((m) => ({ default: m.OfficeTour })));
const CompanyPolicies = lazy(() => import('@/pages/CompanyPolicies').then((m) => ({ default: m.CompanyPolicies })));
const MyEquipment = lazy(() => import('@/pages/MyEquipment').then((m) => ({ default: m.MyEquipment })));
const CareerCenter = lazy(() => import('@/pages/CareerCenter').then((m) => ({ default: m.CareerCenter })));
const MyProfile = lazy(() => import('@/pages/MyProfile').then((m) => ({ default: m.MyProfile })));
const BusinessProcessViewer = lazy(() => import('@/pages/BusinessProcessViewer').then((m) => ({ default: m.BusinessProcessViewer })));
const InfrastructureOverview = lazy(() => import('@/pages/InfrastructureOverview').then((m) => ({ default: m.InfrastructureOverview })));
const MissionDashboard = lazy(() => import('@/pages/MissionDashboard').then((m) => ({ default: m.MissionDashboard })));
const MissionCanvas = lazy(() => import('@/pages/MissionCanvas').then((m) => ({ default: m.MissionCanvas })));
const Notebook = lazy(() => import('@/pages/Notebook').then((m) => ({ default: m.Notebook })));
const LearningAnalytics = lazy(() => import('@/pages/LearningAnalytics').then((m) => ({ default: m.LearningAnalytics })));
const CareerProgression = lazy(() => import('@/pages/CareerProgression').then((m) => ({ default: m.CareerProgression })));
const ModulePage = lazy(() => import('@/pages/ModulePage').then((m) => ({ default: m.ModulePage })));

const PAGE_MAP: Record<string, React.LazyExoticComponent<React.FC>> = {
  dashboard: EnterpriseDashboard,
  about_gfs: AboutGFS,
  'about-gfs': AboutGFS,
  enterprise_timeline: AboutGFS,
  schedule: DailySchedule, news: EnterpriseNews, activity: ActivityFeed,
  soc: SOCWorkspaceFull, incidents: ServiceDesk, playbooks: PlaybooksPage, messaging: InternalMessaging,
  'threat-intel': ThreatIntelPage, vulnerabilities: VulnerabilityDashboard, firewall: FirewallManagement,
  siem: SIEMAnalytics, edr: EDRConsole,
  'enterprise-map': InfrastructureOverview, servers: InfrastructureOverview, cloud: CloudSecurity,
  network: InfrastructureOverview, ad: ActiveDirectoryPage, 'business-processes': BusinessProcessViewer,
  users: EmployeeDirectory, access: AccessManagementPage, pam: PAMPage,
  risk: ChangeManagement, policies: CompanyPolicies, audit: AuditLogPage, frameworks: FrameworksPage,
  'ethical-hacking': EthicalHackingWorkspaceFull, vapt: VAPTPage, 'purple-team': PurpleTeamPage,
  modules: ModulePage, 'org-chart': OrgChart, 'business-units': BusinessUnits,
  departments: DepartmentDashboards, 'office-tour': OfficeTour,
  career: CareerJourney, career_center: CareerCenter, skills: CareerProgression, certs: CareerCenter,
  profile: MyProfile, equipment: MyEquipment, settings: MyProfile,
  missions: MissionDashboard, 'mission-active': MissionCanvas, notebook: Notebook, analytics: LearningAnalytics,
};

function LoadingFallback() {
  return (
    <div className="flex items-center justify-center py-20">
      <div className="flex flex-col items-center gap-3">
        <div className="w-6 h-6 rounded-full border-2 border-[var(--color-gfs-border)] border-t-[var(--color-gfs-accent)] animate-spin" />
        <span className="text-[11px] text-[var(--color-gfs-text-muted)]">Loading workspace...</span>
      </div>
    </div>
  );
}

function PageRouter() {
  const { currentPage } = useStore();
  const { currentMissionId } = useLearningEngine();
  const effectivePage = currentMissionId ? 'mission-active' : currentPage;
  const PageComponent = PAGE_MAP[effectivePage];

  return (
    <Suspense fallback={<LoadingFallback />}>
      <AnimatePresence mode="wait">
        <motion.div key={effectivePage}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.15 }}>
          {PageComponent ? <PageComponent /> : <LoadingFallback />}
        </motion.div>
      </AnimatePresence>
    </Suspense>
  );
}

function GlobalInspector() {
  const { isOpen, data, closeInspector } = useInspector();
  return (
    <InspectorPanel open={isOpen} onClose={closeInspector}
      title={data?.title || 'Inspector'} subtitle={data?.subtitle}
      tabs={[{ id: 'overview', label: 'Overview', icon: null }, { id: 'security', label: 'Security', icon: null }]}
      sections={[]} />
  );
}

function AppShell() {
  const { sidebarCollapsed } = useStore();
  const sidebarWidth = sidebarCollapsed ? 56 : 240;

  return (
    <div className="h-screen w-screen flex flex-col overflow-hidden bg-[var(--color-gfs-base)]">
      <GlobalHeader />
      <TopNavigation />
      <div className="flex-1 flex overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-y-auto" style={{ marginLeft: sidebarWidth, transition: 'margin-left 0.2s cubic-bezier(0.16, 1, 0.3, 1)' }}>
          <div className="p-4 max-w-[1800px]">
            <PageRouter />
          </div>
        </main>
      </div>
      <WebinarMode />
      <GlobalInspector />
      <AICompanion />
    </div>
  );
}

// ── Import components we need ──
import { GlobalHeader } from '@/components/layout/GlobalHeader';
import { Sidebar } from '@/components/layout/Sidebar';

// ── MAIN APP: No login required ──
export default function App() {
  // Initialize enterprise simulation
  const { addEvent } = useEnterprise();
  const { isAuthenticated } = useStore();

  // Set authenticated on mount (bypass login)
  useEffect(() => {
    if (!isAuthenticated) {
      useStore.setState({
        isAuthenticated: true,
        onboardingCompleted: true,
        user: {
          id: 'emp-026',
          name: 'Sai Krishna',
          email: 'sai.krishna@gfs.com',
          role: 'SOC Analyst — Tier 1',
          department: 'SOC',
          manager: 'emp-021',
        },
      });
    }
  }, []);

  return <AppShell />;
}
