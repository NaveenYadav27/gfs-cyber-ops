import { useStore } from '@/store/useStore';
import { Login } from '@/pages/Login';
import { AppLayout } from '@/components/layout/AppLayout';
import { Onboarding } from '@/pages/Onboarding';
import { AICompanion } from '@/components/learning/AICompanion';
import { InspectorPanel } from '@/components/ui/InspectorPanel';
import { useInspector } from '@/store/useInspector';
import { useLearningEngine } from '@/store/useLearningEngine';
import { motion, AnimatePresence } from 'framer-motion';
import React, { Suspense, lazy, useEffect } from 'react';

// Lazy load pages for code splitting
const Dashboard = lazy(() => import('@/pages/Dashboard').then(m => ({ default: m.Dashboard })));
const DailySchedule = lazy(() => import('@/pages/DailySchedule').then(m => ({ default: m.DailySchedule })));
const EnterpriseNews = lazy(() => import('@/pages/EnterpriseNews').then(m => ({ default: m.EnterpriseNews })));
const ActivityFeed = lazy(() => import('@/pages/ActivityFeed').then(m => ({ default: m.ActivityFeed })));
const SOCOperations = lazy(() => import('@/pages/SOCOperations').then(m => ({ default: m.SOCOperations })));
const SIEMAnalytics = lazy(() => import('@/pages/SIEMAnalytics').then(m => ({ default: m.SIEMAnalytics })));
const EDRConsole = lazy(() => import('@/pages/EDRConsole').then(m => ({ default: m.EDRConsole })));
const ThreatIntelPage = lazy(() => import('@/pages/ThreatIntelPage').then(m => ({ default: m.ThreatIntelPage })));
const VulnerabilityDashboard = lazy(() => import('@/pages/VulnerabilityDashboard').then(m => ({ default: m.VulnerabilityDashboard })));
const FirewallManagement = lazy(() => import('@/pages/FirewallManagement').then(m => ({ default: m.FirewallManagement })));
const ActiveDirectoryPage = lazy(() => import('@/pages/ActiveDirectoryPage').then(m => ({ default: m.ActiveDirectoryPage })));
const CloudSecurity = lazy(() => import('@/pages/CloudSecurity').then(m => ({ default: m.CloudSecurity })));
const AccessManagementPage = lazy(() => import('@/pages/AccessManagementPage').then(m => ({ default: m.AccessManagementPage })));
const PAMPage = lazy(() => import('@/pages/PAMPage').then(m => ({ default: m.PAMPage })));
const PlaybooksPage = lazy(() => import('@/pages/PlaybooksPage').then(m => ({ default: m.PlaybooksPage })));
const AuditLogPage = lazy(() => import('@/pages/AuditLogPage').then(m => ({ default: m.AuditLogPage })));
const FrameworksPage = lazy(() => import('@/pages/FrameworksPage').then(m => ({ default: m.FrameworksPage })));
const EthicalHackingPage = lazy(() => import('@/pages/EthicalHackingPage').then(m => ({ default: m.EthicalHackingPage })));
const VAPTPage = lazy(() => import('@/pages/VAPTPage').then(m => ({ default: m.VAPTPage })));
const PurpleTeamPage = lazy(() => import('@/pages/PurpleTeamPage').then(m => ({ default: m.PurpleTeamPage })));
const ServiceDesk = lazy(() => import('@/pages/ServiceDesk').then(m => ({ default: m.ServiceDesk })));
const ModulePage = lazy(() => import('@/pages/ModulePage').then(m => ({ default: m.ModulePage })));
const InternalMessaging = lazy(() => import('@/pages/InternalMessaging').then(m => ({ default: m.InternalMessaging })));
const ChangeManagement = lazy(() => import('@/pages/ChangeManagement').then(m => ({ default: m.ChangeManagement })));
const OrgChart = lazy(() => import('@/pages/OrgChart').then(m => ({ default: m.OrgChart })));
const BusinessUnits = lazy(() => import('@/pages/BusinessUnits').then(m => ({ default: m.BusinessUnits })));
const DepartmentDashboards = lazy(() => import('@/pages/DepartmentDashboards').then(m => ({ default: m.DepartmentDashboards })));
const EmployeeDirectory = lazy(() => import('@/pages/EmployeeDirectory').then(m => ({ default: m.EmployeeDirectory })));
const OfficeTour = lazy(() => import('@/pages/OfficeTour').then(m => ({ default: m.OfficeTour })));
const CompanyPolicies = lazy(() => import('@/pages/CompanyPolicies').then(m => ({ default: m.CompanyPolicies })));
const MyEquipment = lazy(() => import('@/pages/MyEquipment').then(m => ({ default: m.MyEquipment })));
const CareerCenter = lazy(() => import('@/pages/CareerCenter').then(m => ({ default: m.CareerCenter })));
const MyProfile = lazy(() => import('@/pages/MyProfile').then(m => ({ default: m.MyProfile })));
const BusinessProcessViewer = lazy(() => import('@/pages/BusinessProcessViewer').then(m => ({ default: m.BusinessProcessViewer })));
const InfrastructureOverview = lazy(() => import('@/pages/InfrastructureOverview').then(m => ({ default: m.InfrastructureOverview })));
const MissionDashboard = lazy(() => import('@/pages/MissionDashboard').then(m => ({ default: m.MissionDashboard })));
const MissionCanvas = lazy(() => import('@/pages/MissionCanvas').then(m => ({ default: m.MissionCanvas })));
const Notebook = lazy(() => import('@/pages/Notebook').then(m => ({ default: m.Notebook })));
const LearningAnalytics = lazy(() => import('@/pages/LearningAnalytics').then(m => ({ default: m.LearningAnalytics })));
const CareerProgression = lazy(() => import('@/pages/CareerProgression').then(m => ({ default: m.CareerProgression })));

const PAGE_MAP: Record<string, React.LazyExoticComponent<React.FC>> = {
  dashboard: Dashboard, schedule: DailySchedule, news: EnterpriseNews, activity: ActivityFeed,
  soc: SOCOperations, incidents: ServiceDesk, playbooks: PlaybooksPage, messaging: InternalMessaging,
  'threat-intel': ThreatIntelPage, vulnerabilities: VulnerabilityDashboard, firewall: FirewallManagement,
  siem: SIEMAnalytics, edr: EDRConsole,
  'enterprise-map': InfrastructureOverview, cloud: CloudSecurity, network: InfrastructureOverview, ad: ActiveDirectoryPage,
  'business-processes': BusinessProcessViewer, users: EmployeeDirectory, access: AccessManagementPage, pam: PAMPage,
  risk: ChangeManagement, policies: CompanyPolicies, audit: AuditLogPage, frameworks: FrameworksPage,
  'ethical-hacking': EthicalHackingPage, vapt: VAPTPage, 'purple-team': PurpleTeamPage,
  modules: ModulePage, 'org-chart': OrgChart, 'business-units': BusinessUnits, departments: DepartmentDashboards,
  'office-tour': OfficeTour, career: CareerCenter, skills: CareerProgression, certs: CareerCenter,
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
  const { isOpen, type, data, closeInspector } = useInspector();
  return (
    <InspectorPanel
      open={isOpen}
      onClose={closeInspector}
      title={data?.title || type || 'Inspector'}
      subtitle={data?.subtitle}
      tabs={[
        { id: 'overview', label: 'Overview', icon: null },
        { id: 'security', label: 'Security', icon: null },
        { id: 'dependencies', label: 'Dependencies', icon: null },
        { id: 'logs', label: 'Logs', icon: null },
        { id: 'timeline', label: 'Timeline', icon: null },
      ]}
      sections={[]}
    />
  );
}

export default function App() {
  const { isAuthenticated, onboardingCompleted, theme } = useStore();

  useEffect(() => {
    if (theme === 'light') {
      document.documentElement.classList.add('light-theme');
    } else {
      document.documentElement.classList.remove('light-theme');
    }
  }, [theme]);

  if (!isAuthenticated) return <Login />;
  if (!onboardingCompleted) return <AppLayout><Onboarding /></AppLayout>;

  return (
    <AppLayout>
      <PageRouter />
      <GlobalInspector />
      <AICompanion />
    </AppLayout>
  );
}
