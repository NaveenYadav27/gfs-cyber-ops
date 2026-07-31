const fs = require('fs');
const path = require('path');

const topNavPath = path.join(__dirname, '../src/components/layout/TopNavigation.tsx');
let content = fs.readFileSync(topNavPath, 'utf8');

const newNavGroups = `
const NAV_GROUPS: NavGroup[] = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, children: [
    { id: 'dash', label: 'Enterprise Dashboard', page: 'dashboard', description: 'Live enterprise overview' },
  ]},
  { id: 'enterprise', label: 'Enterprise', icon: Building2, children: [
    { id: 'business-units-nav', label: 'Business Units', page: 'business-units', description: 'All business divisions' },
    { id: 'org', label: 'Organization', page: 'org-chart', description: 'Executive Leadership' },
  ]},
  { id: 'enterprise-ops', label: 'Enterprise Operations', icon: Activity, children: [
    { id: 'itsm-nav', label: 'ITSM', page: 'itsm-dashboard', description: 'Service Management' },
    { id: 'noc-nav', label: 'NOC', page: 'noc-dashboard', description: 'Network Operations' },
    { id: 'soc-nav', label: 'SOC', page: 'soc-dashboard', description: 'Cyber Defense' },
    { id: 'grc-nav', label: 'GRC', page: 'grc-dashboard', description: 'Risk & Compliance' },
    { id: 'purple-nav', label: 'Purple Team', page: 'purple-dashboard', description: 'Simulation' },
    { id: 'off-nav', label: 'Offensive Security', page: 'off-dashboard', description: 'Red Team' },
    { id: 'exec-nav', label: 'Executive Operations', page: 'exec-dashboard', description: 'Strategy' },
  ]},
  { id: 'infra', label: 'Infrastructure', icon: Server, children: [
    { id: 'noc-servers', label: 'Servers', page: 'noc-servers', description: 'Compute instances' },
    { id: 'noc-network', label: 'Network', page: 'noc-network', description: 'Network topology' },
  ]},
  { id: 'cloud', label: 'Cloud', icon: Cloud, children: [
    { id: 'noc-cloud', label: 'Cloud', page: 'noc-cloud', description: 'Azure & AWS' },
  ]},
  { id: 'career-nav', label: 'Career Journey', icon: Trophy, children: [
    { id: 'career-center', label: 'Career Center', page: 'career', description: 'Career progression' },
  ]},
];
`;

content = content.replace(/const NAV_GROUPS: NavGroup\[\] = \[[\s\S]*?\];/m, newNavGroups);

fs.writeFileSync(topNavPath, content);
console.log('TopNavigation updated');
