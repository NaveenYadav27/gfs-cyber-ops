// src/data/enterprise.ts
import type { Employee, Department, BusinessUnit, Technology, InfrastructureNode, CyberDefenseUnit, CareerRole, EnterpriseEvent } from '@/types/enterprise';

// ── LEADERSHIP ──
export const LEADERSHIP: any[] = [
  { id: 'emp-001', employeeId: 'GFS-00001', name: 'Vikram Reddy', designation: 'Chairman', department: 'Board of Directors', division: 'Executive', manager: '', directReports: ['emp-002'], location: 'Amaravati', floor: '18th Floor', seat: 'Board Room', email: 'vikram.reddy@gfs.com', phone: '+91 40 6600 1001', laptop: 'N/A', photo: '', joinedDate: '2008-04-01', skills: ['Strategic Leadership', 'Banking', 'Corporate Governance'], certifications: [], projects: ['GFS Vision 2030'], currentIncidents: [], assignedAssets: [], currentApplications: [], shift: 'Day', status: 'active', lastLogin: '2025-01-15T09:00:00', vpnSession: false, securityClearance: 'privileged', level: 1, salaryBand: 'Executive', bio: 'Founding Chairman of GFS. Led the bank from ₹500 Cr to ₹2.4 Lakh Cr AUM.' },
  { id: 'emp-002', employeeId: 'GFS-00010', name: 'Priya Kapoor', designation: 'Chief Executive Officer', department: 'Executive Office', division: 'Executive', manager: 'emp-001', directReports: ['emp-003', 'emp-004', 'emp-005'], location: 'Amaravati', floor: '18th Floor', seat: 'CEO Suite', email: 'priya.kapoor@gfs.com', phone: '+91 40 6600 1002', laptop: 'MacBook Pro M3', photo: '', joinedDate: '2015-06-15', skills: ['Corporate Strategy', 'Digital Banking', 'M&A'], certifications: [], projects: ['GFS Digital Transformation'], currentIncidents: [], assignedAssets: [], currentApplications: [], shift: 'Day', status: 'active', lastLogin: '2025-01-15T08:30:00', vpnSession: false, securityClearance: 'privileged', level: 2, salaryBand: 'Executive', bio: 'CEO since 2020. Former McKinsey partner. Led GFS IPO preparation.' },
  { id: 'emp-003', employeeId: 'GFS-00020', name: 'Rajesh Menon', designation: 'Chief Information Officer', department: 'Technology', division: 'Technology', manager: 'emp-002', directReports: ['emp-010', 'emp-011', 'emp-012'], location: 'Hyderabad', floor: '12th Floor', seat: 'CIO Office', email: 'rajesh.menon@gfs.com', phone: '+91 40 6600 1020', laptop: 'ThinkPad X1 Carbon', photo: '', joinedDate: '2017-01-10', skills: ['Cloud Architecture', 'Enterprise IT', 'Digital Transformation'], certifications: ['TOGAF', 'AWS SA Professional'], projects: ['Azure Migration', 'Zero Trust'], currentIncidents: [], assignedAssets: [], currentApplications: [], shift: 'Day', status: 'in-meeting', lastLogin: '2025-01-15T08:00:00', vpnSession: false, securityClearance: 'privileged', level: 3, salaryBand: 'E1', bio: 'Leads 2,400+ technology professionals across 5 technology centers.' },
  { id: 'emp-004', employeeId: 'GFS-00030', name: 'Ananya Das', designation: 'Chief Information Security Officer', department: 'Cyber Defense', division: 'Cyber Defense', manager: 'emp-002', directReports: ['emp-020', 'emp-021', 'emp-022'], location: 'Hyderabad', floor: '10th Floor', seat: 'CISO Office', email: 'ananya.das@gfs.com', phone: '+91 40 6600 1030', laptop: 'ThinkPad X1 Carbon', photo: '', joinedDate: '2019-03-01', skills: ['Cybersecurity Strategy', 'Risk Management', 'Regulatory Compliance'], certifications: ['CISSP', 'CISM', 'CRISC'], projects: ['Zero Trust Architecture', 'SOC Modernization'], currentIncidents: [], assignedAssets: [], currentApplications: [], shift: 'Day', status: 'active', lastLogin: '2025-01-15T07:45:00', vpnSession: false, securityClearance: 'privileged', level: 3, salaryBand: 'E1', bio: 'CISO since 2022. Former CERT-In advisor. Built GFS SOC from scratch.' },
  { id: 'emp-005', employeeId: 'GFS-00040', name: 'Sanjay Gupta', designation: 'Chief Risk Officer', department: 'Risk Management', division: 'Risk', manager: 'emp-002', directReports: ['emp-030'], location: 'Mumbai', floor: '6th Floor', seat: 'CRO Office', email: 'sanjay.gupta@gfs.com', phone: '+91 22 6600 1040', laptop: 'ThinkPad X1 Carbon', photo: '', joinedDate: '2016-08-01', skills: ['Enterprise Risk', 'Basel III', 'Stress Testing'], certifications: ['FRM', 'PRM'], projects: ['Risk Dashboard', 'Operational Resilience'], currentIncidents: [], assignedAssets: [], currentApplications: [], shift: 'Day', status: 'active', lastLogin: '2025-01-15T08:15:00', vpnSession: false, securityClearance: 'privileged', level: 3, salaryBand: 'E1', bio: 'Manages enterprise risk across 75M+ customer accounts.' },
];

// ── SOC TEAM ──
export const SOC_TEAM: any[] = [
  { id: 'emp-020', employeeId: 'GFS-1001', name: 'Suresh Reddy', designation: 'SOC Manager', department: 'SOC', division: 'Cyber Defense', manager: 'emp-004', directReports: ['emp-021', 'emp-022', 'emp-023', 'emp-024'], location: 'Hyderabad', floor: '10th Floor', seat: 'SOC Room A', email: 'suresh.reddy@gfs.com', phone: '+91 40 6600 1101', laptop: 'ThinkPad T14', photo: '', joinedDate: '2018-05-15', skills: ['SOC Operations', 'Incident Response', 'SIEM', 'Threat Intelligence'], certifications: ['CISSP', 'GCIA', 'GCIH'], projects: ['SOC Modernization', 'SOAR Implementation'], currentIncidents: ['ALT-2025-9102'], assignedAssets: ['SOC Dashboard', 'Sentinel Workspace'], currentApplications: ['Microsoft Sentinel', 'CrowdStrike Falcon', 'ServiceNow'], shift: 'Day', status: 'active', lastLogin: '2025-01-15T07:30:00', vpnSession: false, securityClearance: 'privileged', level: 5, salaryBand: 'M2', bio: 'Manages 24/7 SOC operations with 3 shift teams.' },
  { id: 'emp-021', employeeId: 'GFS-1002', name: 'Arjun Sharma', designation: 'SOC Team Lead — Tier 2', department: 'SOC', division: 'Cyber Defense', manager: 'emp-020', directReports: ['emp-023'], location: 'Hyderabad', floor: '10th Floor', seat: 'SOC Room A', email: 'arjun.sharma@gfs.com', phone: '+91 40 6600 1102', laptop: 'ThinkPad T14', photo: '', joinedDate: '2020-01-10', skills: ['Advanced Investigation', 'KQL', 'Falcon', 'Threat Hunting'], certifications: ['GCIH', 'GCFA'], projects: ['Detection Engineering'], currentIncidents: ['ALT-2025-9101'], assignedAssets: [], currentApplications: ['Microsoft Sentinel', 'CrowdStrike Falcon'], shift: 'Day', status: 'active', lastLogin: '2025-01-15T07:30:00', vpnSession: false, securityClearance: 'elevated', level: 4, salaryBand: 'M1', bio: 'Leads Tier 2 investigation team. Expert in KQL and endpoint forensics.' },
  { id: 'emp-022', employeeId: 'GFS-1003', name: 'Priya Nair', designation: 'SOC Analyst — Tier 1', department: 'SOC', division: 'Cyber Defense', manager: 'emp-021', directReports: [], location: 'Hyderabad', floor: '10th Floor', seat: 'SOC Room A', email: 'priya.nair@gfs.com', phone: '+91 40 6600 1103', laptop: 'ThinkPad T14', photo: '', joinedDate: '2023-06-01', skills: ['Alert Triage', 'KQL Basics', 'SIEM', 'ServiceNow'], certifications: ['CompTIA Security+'], projects: [], currentIncidents: [], assignedAssets: [], currentApplications: ['Microsoft Sentinel', 'ServiceNow'], shift: 'Morning', status: 'active', lastLogin: '2025-01-15T07:45:00', vpnSession: false, securityClearance: 'standard', level: 3, salaryBand: 'P2', bio: 'SOC Analyst responsible for alert triage and initial investigation.' },
  { id: 'emp-023', employeeId: 'GFS-1004', name: 'Raghav Sharma', designation: 'SOC Analyst — Tier 1', department: 'SOC', division: 'Cyber Defense', manager: 'emp-021', directReports: [], location: 'Hyderabad', floor: '10th Floor', seat: 'SOC Room A', email: 'raghav.sharma@gfs.com', phone: '+91 40 6600 1104', laptop: 'ThinkPad T14', photo: '', joinedDate: '2022-09-15', skills: ['Alert Triage', 'KQL', 'Threat Intelligence'], certifications: ['CompTIA Security+', 'CEH'], projects: [], currentIncidents: ['ALT-2025-9098'], assignedAssets: [], currentApplications: ['Microsoft Sentinel', 'ServiceNow'], shift: 'Morning', status: 'active', lastLogin: '2025-01-15T07:40:00', vpnSession: false, securityClearance: 'standard', level: 3, salaryBand: 'P2', bio: 'SOC Analyst specializing in phishing investigation and email analysis.' },
  { id: 'emp-024', employeeId: 'GFS-1005', name: 'Deepa Krishnan', designation: 'SOC Analyst — Tier 1', department: 'SOC', division: 'Cyber Defense', manager: 'emp-021', directReports: [], location: 'Hyderabad', floor: '10th Floor', seat: 'SOC Room A', email: 'deepa.krishnan@gfs.com', phone: '+91 40 6600 1105', laptop: 'ThinkPad T14', photo: '', joinedDate: '2023-11-01', skills: ['Alert Triage', 'Windows Events', 'KQL'], certifications: [], projects: [], currentIncidents: [], assignedAssets: [], currentApplications: ['Microsoft Sentinel'], shift: 'Night', status: 'away', lastLogin: '2025-01-15T22:00:00', vpnSession: false, securityClearance: 'standard', level: 3, salaryBand: 'P2', bio: 'SOC Analyst on night shift. Focuses on identity-based alerts.' },
  { id: 'emp-025', employeeId: 'GFS-1006', name: 'Harsha Vardhan', designation: 'Threat Hunting Lead', department: 'Threat Hunting', division: 'Cyber Defense', manager: 'emp-004', directReports: ['emp-026'], location: 'Hyderabad', floor: '10th Floor', seat: 'SOC Room B', email: 'harsha.vardhan@gfs.com', phone: '+91 40 6600 1106', laptop: 'ThinkPad X1 Extreme', photo: '', joinedDate: '2019-08-01', skills: ['Threat Hunting', 'Advanced KQL', 'Network Analysis', 'MITRE ATT&CK'], certifications: ['GCTI', 'GCIA', 'OSCP'], projects: ['Proactive Threat Hunting', 'DNS Analysis'], currentIncidents: ['ALT-2025-9093'], assignedAssets: ['Threat Hunting Playbooks'], currentApplications: ['Sentinel', 'Wireshark', 'Palo Alto'], shift: 'Day', status: 'active', lastLogin: '2025-01-15T08:00:00', vpnSession: false, securityClearance: 'elevated', level: 5, salaryBand: 'M1', bio: 'Leads proactive threat hunting. Specialist in DNS analysis and APT tracking.' },
  { id: 'emp-026', employeeId: 'GFS-1007', name: 'Sai Krishna', designation: 'SOC Analyst — Tier 1', department: 'SOC', division: 'Cyber Defense', manager: 'emp-021', directReports: [], location: 'Hyderabad', floor: '10th Floor', seat: 'SOC Room A', email: 'sai.krishna@gfs.com', phone: '+91 40 6600 1107', laptop: 'ThinkPad T14', photo: '', joinedDate: '2024-01-15', skills: ['Alert Triage', 'Active Directory', 'ServiceNow'], certifications: [], projects: [], currentIncidents: [], assignedAssets: [], currentApplications: ['Sentinel', 'ServiceNow'], shift: 'Morning', status: 'active', lastLogin: '2025-01-15T08:00:00', vpnSession: true, securityClearance: 'standard', level: 3, salaryBand: 'P1', bio: 'Junior SOC Analyst. Currently in training program.' },
];

// ── DEPARTMENTS ──
export const DEPARTMENTS: Department[] = [
  { id: 'dept-soc', name: 'Security Operations Center', code: 'SOC', head: 'emp-020', headTitle: 'SOC Manager', division: 'Cyber Defense', description: '24/7 security monitoring, alert triage, and incident detection. Follow-the-sun model across Hyderabad and Mumbai.', location: 'Hyderabad', employeeCount: 18, budget: '₹4.2 Cr/year', kpis: [{ name: 'Mean Triage Time', value: '3.2 min', target: '<5 min', status: 'on-track' }, { name: 'Alert Closure Rate', value: '94%', target: '>90%', status: 'on-track' }, { name: 'SLA Breach Rate', value: '1.2%', target: '<2%', status: 'on-track' }], applications: ['Microsoft Sentinel', 'CrowdStrike Falcon', 'ServiceNow SIR', 'Palo Alto Panorama'], projects: ['SOC Modernization', 'SOAR Implementation', 'Detection Engineering'], currentIssues: ['Ransomware containment in progress — WRK-LOAN-047', 'DNS tunneling investigation — Treasury segment'], assets: ['SOC Dashboard', 'Sentinel Workspace', 'Falcon Console'], techStack: ['Microsoft Sentinel', 'CrowdStrike Falcon', 'Palo Alto PA-5260', 'ServiceNow'], businessProcesses: ['Alert Triage', 'Incident Response', 'Shift Handover', 'Threat Hunting'], meetings: ['Daily Standup 09:00', 'Shift Handover 14:00/22:00', 'Weekly Review Friday 16:00'] },
  { id: 'dept-ti', name: 'Threat Intelligence', code: 'TI', head: 'emp-025', headTitle: 'Threat Intelligence Lead', division: 'Cyber Defense', description: 'Collection, analysis, and dissemination of threat intelligence. Tracks 4 active APT groups targeting Indian financial sector.', location: 'Hyderabad', employeeCount: 6, budget: '₹1.8 Cr/year', kpis: [{ name: 'IOCs Tracked', value: '1.2M', target: '>500K', status: 'on-track' }, { name: 'Intel Reports/Month', value: '12', target: '>8', status: 'on-track' }], applications: ['MISP', 'VirusTotal', 'Recorded Future', 'MITRE ATT&CK'], projects: ['APT Tracking', 'FIU-IND Integration', 'Dark Web Monitoring'], currentIssues: ['Silk Typhoon campaign tracking'], assets: [], techStack: ['MISP', 'Recorded Future', 'Shodan', 'VirusTotal'], businessProcesses: ['Intel Collection', 'Analysis', 'Dissemination', 'Campaign Tracking'], meetings: ['Intel Standup 09:30', 'Campaign Review Monday 14:00'] },
  { id: 'dept-ir', name: 'Incident Response', code: 'IR', head: 'emp-027', headTitle: 'IR Lead', division: 'Cyber Defense', description: 'Coordinates response to confirmed security incidents. Manages containment, eradication, and recovery.', location: 'Hyderabad', employeeCount: 8, budget: '₹2.4 Cr/year', kpis: [{ name: 'Mean Response Time', value: '12 min', target: '<15 min', status: 'on-track' }, { name: 'Containment Success', value: '98%', target: '>95%', status: 'on-track' }], applications: ['ServiceNow SIR', 'Falcon Live Response', 'Forensic Tools'], projects: ['Ransomware Response', 'DarkShadow Campaign'], currentIssues: ['Operation DarkShadow — active campaign response'], assets: [], techStack: ['CrowdStrike Falcon', 'Volatility', 'Autopsy', 'Wireshark'], businessProcesses: ['Incident Declaration', 'War Room', 'Containment', 'Eradication', 'Recovery', 'Post-Incident Review'], meetings: ['IR Standup 09:15', 'Campaign Sync 14:00'] },
  { id: 'dept-seceng', name: 'Security Engineering', code: 'SECENG', head: 'emp-028', headTitle: 'Security Engineering Lead', division: 'Cyber Defense', description: 'Builds and maintains security infrastructure. Implements detection rules, WAF policies, and security automation.', location: 'Hyderabad', employeeCount: 12, budget: '₹3.6 Cr/year', kpis: [{ name: 'Detection Rules Active', value: '420', target: '>300', status: 'on-track' }, { name: 'Automation Rate', value: '67%', target: '>75%', status: 'at-risk' }], applications: ['Sentinel', 'Logic Apps', 'Azure DevOps', 'Terraform'], projects: ['Detection Engineering', 'SOAR Automation', 'WAF Hardening'], currentIssues: ['DNS tunneling detection rule gaps'], assets: [], techStack: ['Sentinel', 'Azure Logic Apps', 'Terraform', 'GitHub Actions'], businessProcesses: ['Rule Development', 'Testing', 'Deployment', 'Monitoring'], meetings: ['Engineering Sync 10:00', 'Sprint Planning Tuesday 11:00'] },
  { id: 'dept-appsec', name: 'Application Security', code: 'APPSEC', head: 'emp-029', headTitle: 'AppSec Lead', division: 'Cyber Defense', description: 'Secures application development lifecycle. Conducts code review, SAST/DAST, and security architecture review.', location: 'Bengaluru', employeeCount: 10, budget: '₹2.8 Cr/year', kpis: [{ name: 'Critical Vulns Fixed (30d)', value: '8', target: '>5', status: 'on-track' }, { name: 'Secure Code Review %', value: '92%', target: '>95%', status: 'at-risk' }], applications: ['Checkmarx', 'Burp Suite Enterprise', 'SonarQube', 'OWASP ZAP'], projects: ['Secure SDLC', 'API Security', 'Mobile App Security'], currentIssues: ['SQL injection on ibanking login'], assets: [], techStack: ['Checkmarx', 'Burp Suite', 'GitHub Advanced Security', 'Snyk'], businessProcesses: ['Code Review', 'Pen Testing', 'Architecture Review', 'Vulnerability Management'], meetings: ['AppSec Review Wednesday 14:00'] },
  { id: 'dept-cloudsec', name: 'Cloud Security', code: 'CLOUDSEC', head: 'emp-030', headTitle: 'Cloud Security Lead', division: 'Cyber Defense', description: 'Secures Azure cloud infrastructure. Manages cloud security posture, identity governance, and cloud workload protection.', location: 'Hyderabad', employeeCount: 6, budget: '₹2.1 Cr/year', kpis: [{ name: 'Cloud Security Score', value: '87%', target: '>90%', status: 'at-risk' }, { name: 'CSPM Coverage', value: '94%', target: '>95%', status: 'at-risk' }], applications: ['Azure Sentinel', 'Prisma Cloud', 'Azure Defender', 'Azure AD'], projects: ['Cloud Security Posture', 'Identity Governance', 'CSPM Rollout'], currentIssues: ['Public storage account detected in dev subscription'], assets: [], techStack: ['Azure Sentinel', 'Prisma Cloud', 'Azure AD', 'Azure Policy'], businessProcesses: ['Cloud Security Review', 'Identity Governance', 'CSPM Monitoring'], meetings: ['Cloud Security Sync 11:00'] },
  { id: 'dept-identity', name: 'Identity & Access Management', code: 'IAM', head: 'emp-031', headTitle: 'IAM Lead', division: 'Cyber Defense', description: 'Manages identity lifecycle, access governance, privileged access, and authentication systems across GFS.', location: 'Hyderabad', employeeCount: 8, budget: '₹2.6 Cr/year', kpis: [{ name: 'MFA Coverage', value: '99.2%', target: '100%', status: 'on-track' }, { name: 'Orphan Accounts', value: '23', target: '<10', status: 'behind' }], applications: ['Azure AD', 'CyberArk', 'SailPoint', 'Okta'], projects: ['Zero Trust Identity', 'PAM Modernization', 'SSO Rollout'], currentIssues: ['svc-neft-ops credential compromise — rotation in progress'], assets: [], techStack: ['Azure AD', 'CyberArk', 'SailPoint', 'Okta'], businessProcesses: ['Access Provisioning', 'Access Review', 'Password Rotation', 'PAM Checkout'], meetings: ['IAM Sync 10:30', 'Access Review Monthly'] },
  { id: 'dept-noc', name: 'Network Operations Center', code: 'NOC', head: 'emp-040', headTitle: 'NOC Manager', division: 'Infrastructure', description: 'Monitors and manages GFS network infrastructure across all locations. Ensures network availability and performance.', location: 'Hyderabad', employeeCount: 14, budget: '₹5.2 Cr/year', kpis: [{ name: 'Network Uptime', value: '99.97%', target: '99.99%', status: 'at-risk' }, { name: 'MTTR', value: '22 min', target: '<30 min', status: 'on-track' }], applications: ['Cisco DNA Center', 'Palo Alto Panorama', 'SolarWinds', ' ThousandEyes'], projects: ['SD-WAN Migration', 'Network Segmentation', 'Zero Trust Network'], currentIssues: ['High latency on Mumbai-DR link'], assets: ['FW-EDGE-01', 'FW-EDGE-02', 'Cisco DNA Center'], techStack: ['Cisco DNA Center', 'Palo Alto PA-5260', 'SolarWinds', 'ThousandEyes'], businessProcesses: ['Network Monitoring', 'Change Management', 'Capacity Planning', 'Incident Response'], meetings: ['NOC Standup 08:00', 'Network Change Review Tuesday 15:00'] },
  { id: 'dept-dba', name: 'Database Administration', code: 'DBA', head: 'emp-041', headTitle: 'DBA Lead', division: 'Infrastructure', description: 'Manages all production databases across GFS including SQL Server, Oracle, PostgreSQL, and MongoDB.', location: 'Hyderabad', employeeCount: 10, budget: '₹3.1 Cr/year', kpis: [{ name: 'DB Uptime', value: '99.99%', target: '99.99%', status: 'on-track' }, { name: 'Backup Success Rate', value: '100%', target: '100%', status: 'on-track' }], applications: ['SQL Server', 'Oracle', 'PostgreSQL', 'MongoDB'], projects: ['Database Encryption', 'DR Testing', 'Performance Optimization'], currentIssues: [], assets: ['DB-PROD-01', 'DB-PROD-02', 'DB-DR-01'], techStack: ['SQL Server 2022', 'Oracle 19c', 'PostgreSQL 16', 'MongoDB 7'], businessProcesses: ['Backup & Recovery', 'Patch Management', 'Performance Tuning', 'Capacity Planning'], meetings: ['DBA Standup 09:00', 'DR Test Monthly'] },
  { id: 'dept-hr', name: 'Human Resources', code: 'HR', head: 'emp-050', headTitle: 'CHRO', division: 'Corporate', description: 'Manages employee lifecycle, talent acquisition, learning & development, and organizational culture.', location: 'Amaravati', employeeCount: 25, budget: '₹8.5 Cr/year', kpis: [{ name: 'Employee Satisfaction', value: '4.2/5', target: '>4.0', status: 'on-track' }, { name: 'Attrition Rate', value: '8.3%', target: '<10%', status: 'on-track' }], applications: ['Workday', 'SuccessFactors', 'LinkedIn Recruiter'], projects: ['Employee Engagement', 'Diversity Initiative', 'Leadership Development'], currentIssues: [], assets: [], techStack: ['Workday', 'SuccessFactors', 'Power BI'], businessProcesses: ['Recruitment', 'Onboarding', 'Performance Review', 'Compensation'], meetings: ['HR Sync 10:00', 'Talent Review Quarterly'] },
  { id: 'dept-finance', name: 'Finance & Accounts', code: 'FIN', head: 'emp-051', headTitle: 'CFO', division: 'Corporate', description: 'Manages financial reporting, accounting, treasury operations, and regulatory financial compliance.', location: 'Amaravati', employeeCount: 35, budget: '₹12 Cr/year', kpis: [{ name: 'Financial Close Time', value: '3 days', target: '<5 days', status: 'on-track' }, { name: 'Audit Findings', value: '2', target: '0', status: 'at-risk' }], applications: ['SAP S/4HANA', 'Oracle Financials', 'Power BI'], projects: ['IFRS 17 Implementation', 'Automation', 'Cost Optimization'], currentIssues: [], assets: [], techStack: ['SAP S/4HANA', 'Oracle Financials', 'Hyperion'], businessProcesses: ['Financial Reporting', 'Budgeting', 'Regulatory Reporting', 'Audit'], meetings: ['Finance Close Weekly', 'Board Reporting Monthly'] },
];

// ── BUSINESS UNITS ──
export const BUSINESS_UNITS: BusinessUnit[] = [
  { id: 'bu-retail', name: 'Retail Banking', code: 'RETAIL', description: 'Personal banking, savings accounts, home loans, personal loans, credit cards, and debit cards for individual customers.', head: 'emp-100', revenue: '₹18,400 Cr', employees: 12000, locations: ['Amaravati', 'All Branches'], products: ['Savings Account', 'Current Account', 'Home Loan', 'Personal Loan', 'Gold Loan', 'Credit Card', 'Debit Card', 'Fixed Deposit', 'Recurring Deposit'], keyMetrics: [{ label: 'Customers', value: '52M' }, { label: 'Branches', value: '1,200+' }, { label: 'ATMs', value: '18,500+' }] },
  { id: 'bu-corporate', name: 'Corporate Banking', code: 'CORP', description: 'Financial services for corporate clients including working capital, trade finance, project finance, and cash management.', head: 'emp-101', revenue: '₹12,800 Cr', employees: 4500, locations: ['Amaravati', 'Mumbai', 'Delhi', 'Bengaluru'], products: ['Working Capital', 'Trade Finance', 'Project Finance', 'Cash Management', 'Corporate Cards', 'Supply Chain Finance'], keyMetrics: [{ label: 'Corporate Clients', value: '12,400' }, { label: 'Loan Book', value: '₹2.4 Lakh Cr' }] },
  { id: 'bu-digital', name: 'Digital Banking', code: 'DIGITAL', description: 'Mobile banking, internet banking, UPI, digital wallets, and API banking platform.', head: 'emp-102', revenue: '₹3,200 Cr', employees: 1800, locations: ['Hyderabad', 'Bengaluru', 'Pune'], products: ['GFS Mobile App', 'Internet Banking', 'GFS Pay (UPI)', 'API Banking', 'WhatsApp Banking'], keyMetrics: [{ label: 'Digital Users', value: '38M' }, { label: 'Daily UPI Txns', value: '1.8 Cr' }, { label: 'App Rating', value: '4.6/5' }] },
  { id: 'bu-treasury', name: 'Treasury', code: 'TREASURY', description: 'Money market operations, forex trading, government securities, and ALM management.', head: 'emp-103', revenue: '₹4,600 Cr', employees: 350, locations: ['Mumbai', 'Hyderabad'], products: ['Forex Trading', 'Money Market', 'Government Securities', 'ALM', 'SWIFT Messaging'], keyMetrics: [{ label: 'Daily Turnover', value: '₹42,000 Cr' }, { label: 'SWIFT Messages', value: '12,000/day' }] },
  { id: 'bu-insurance', name: 'Insurance', code: 'INS', description: 'Life insurance, general insurance, and health insurance products distributed through bank assurance channels.', head: 'emp-104', revenue: '₹8,400 Cr', employees: 3200, locations: ['Amaravati', 'Mumbai', 'Chennai'], products: ['Life Insurance', 'Health Insurance', 'Motor Insurance', 'Travel Insurance'], keyMetrics: [{ label: 'Policies', value: '8.2M' }, { label: 'Claims Ratio', value: '82%' }] },
];

// ── TECHNOLOGY TWINS ──
export const TECHNOLOGIES: Technology[] = [
  { id: 'tech-sentinel', name: 'Microsoft Sentinel', category: 'SIEM', vendor: 'Microsoft', version: '3.0', description: 'Cloud-native SIEM. Primary detection and correlation engine for the GFS SOC.', status: 'operational', hosts: ['Azure India South'], dashboards: ['SOC Overview', 'Identity Analytics', 'Network Analytics'], alerts: [{ title: 'Ransomware detection', severity: 'critical', time: '2 min ago' }, { title: 'Impossible travel', severity: 'high', time: '8 min ago' }], logsPerDay: '3.2 TB', users: 45, licenseExpiry: '2026-03-31', owner: 'emp-020' },
  { id: 'tech-falcon', name: 'CrowdStrike Falcon', category: 'EDR', vendor: 'CrowdStrike', version: '6.45', description: 'Endpoint detection and response. Protects 42,100 endpoints across all GFS locations.', status: 'operational', hosts: ['Cloud SaaS'], dashboards: ['Falcon Console', 'Threat Graph'], alerts: [{ title: 'Ransomware — WRK-LOAN-047', severity: 'critical', time: '2 min ago' }, { title: 'DNS tunneling detected', severity: 'high', time: '1 hr ago' }], logsPerDay: '1.8 TB', users: 28, licenseExpiry: '2026-06-30', owner: 'emp-020' },
  { id: 'tech-servicenow', name: 'ServiceNow', category: 'ITSM', vendor: 'ServiceNow', version: 'Vancouver', description: 'IT service management, incident management, change management, and security incident response.', status: 'operational', hosts: ['Cloud SaaS'], dashboards: ['Incident Dashboard', 'Change Dashboard', 'SIR Dashboard'], alerts: [], logsPerDay: '50 GB', users: 2400, licenseExpiry: '2025-12-31', owner: 'emp-012' },
  { id: 'tech-azure-ad', name: 'Microsoft Entra ID', category: 'Identity', vendor: 'Microsoft', version: 'P2', description: 'Identity and access management. SSO, MFA, conditional access, and identity protection for 48,000+ users.', status: 'operational', hosts: ['Azure Global'], dashboards: ['Identity Protection', 'Sign-in Analytics'], alerts: [{ title: 'Impossible travel — svc-neft-ops', severity: 'high', time: '8 min ago' }], logsPerDay: '120 GB', users: 48000, licenseExpiry: '2025-09-30', owner: 'emp-031' },
  { id: 'tech-paloalto', name: 'Palo Alto Panorama', category: 'Firewall', vendor: 'Palo Alto Networks', version: 'PAN-OS 11.1', description: 'Next-generation firewall management. 4 firewalls protecting DMZ, internal segments, and cloud perimeter.', status: 'operational', hosts: ['FW-EDGE-01', 'FW-EDGE-02', 'FW-INT-01', 'FW-CLOUD-01'], dashboards: ['Traffic Analytics', 'Threat Prevention'], alerts: [{ title: 'DNS tunneling blocked', severity: 'high', time: '1 hr ago' }, { title: 'C2 IP blocked', severity: 'high', time: '15 min ago' }], logsPerDay: '800 GB', users: 12, licenseExpiry: '2025-11-30', owner: 'emp-040' },
  { id: 'tech-cyberark', name: 'CyberArk', category: 'PAM', vendor: 'CyberArk', version: '13.2', description: 'Privileged access management. Vaults 847 privileged accounts with session recording and rotation.', status: 'operational', hosts: ['On-Prem + Cloud'], dashboards: ['PAM Dashboard', 'Session Monitor'], alerts: [{ title: 'svc-neft-ops compromised', severity: 'critical', time: '8 min ago' }], logsPerDay: '15 GB', users: 35, licenseExpiry: '2025-08-31', owner: 'emp-031' },
  { id: 'tech-azure', name: 'Microsoft Azure', category: 'Cloud', vendor: 'Microsoft', version: 'Latest', description: 'Primary cloud platform. 4 subscriptions, 286 resources across India South and Central regions.', status: 'operational', hosts: ['Azure India South', 'Azure India Central'], dashboards: ['Azure Portal', 'Azure Monitor', 'Azure Defender'], alerts: [{ title: 'Public storage account', severity: 'high', time: '3 hr ago' }], logsPerDay: '200 GB', users: 120, licenseExpiry: 'Pay-as-you-go', owner: 'emp-030' },
  { id: 'tech-splunk', name: 'Splunk Enterprise', category: 'SIEM (Legacy)', vendor: 'Splunk', version: '9.2', description: 'Legacy SIEM being migrated to Sentinel. Still ingesting network and firewall logs during transition.', status: 'operational', hosts: ['On-Prem Cluster'], dashboards: ['Network Overview', 'Firewall Analytics'], alerts: [], logsPerDay: '400 GB', users: 15, licenseExpiry: '2025-06-30', owner: 'emp-020' },
];

// ── INFRASTRUCTURE ──
export const INFRASTRUCTURE: InfrastructureNode[] = [
  { id: 'infra-hq', name: 'GFS Global Financial Center', type: 'campus', status: 'healthy', location: 'Amaravati, Andhra Pradesh', owner: 'emp-040', businessPurpose: 'Global headquarters. Houses executive leadership, corporate functions, and regional operations.', criticality: 'critical', dependencies: [], connectedTo: ['infra-mumbai-dc', 'infra-hyderabad-dc', 'infra-cloud'], health: 99, securityControls: ['Biometric Access', 'CCTV', 'Security Guards', 'Visitor Management'], knownRisks: [], mitreMapping: [], uptime: '99.99%' },
  { id: 'infra-hyderabad-dc', name: 'Hyderabad Primary Data Center', type: 'datacenter', status: 'healthy', location: 'HITEC City, Hyderabad', owner: 'emp-040', businessPurpose: 'Primary production data center. Hosts all core banking, payment systems, and SOC infrastructure.', criticality: 'critical', dependencies: ['infra-cloud'], connectedTo: ['infra-hq', 'infra-mumbai-dc'], health: 98, securityControls: ['Biometric Access', 'Mantrap', '24/7 Guards', 'Fire Suppression', 'UPS + Generator'], knownRisks: [], mitreMapping: [], uptime: '99.99%', lastIncident: 'None in 280 days' },
  { id: 'infra-mumbai-dc', name: 'Mumbai Disaster Recovery', type: 'datacenter', status: 'healthy', location: 'MIDC, Mumbai', owner: 'emp-040', businessPurpose: 'Disaster recovery facility. Active-passive failover for all critical systems.', criticality: 'critical', dependencies: ['infra-hyderabad-dc'], connectedTo: ['infra-hq', 'infra-hyderabad-dc'], health: 97, securityControls: ['Biometric Access', '24/7 Guards', 'Fire Suppression'], knownRisks: ['Mumbai-Hyderabad link latency slightly elevated'], mitreMapping: [], uptime: '99.98%' },
  { id: 'infra-cloud', name: 'Microsoft Azure India', type: 'cloud', status: 'healthy', location: 'Azure India South / Central', owner: 'emp-030', businessPurpose: 'Cloud platform for digital banking, SOC tools, development, and disaster recovery augmentation.', criticality: 'critical', dependencies: [], connectedTo: ['infra-hyderabad-dc'], health: 99, securityControls: ['Azure Defender', 'Azure Sentinel', 'Azure Policy', 'Conditional Access'], knownRisks: ['One public storage account in dev subscription'], mitreMapping: [], uptime: '99.99%' },
  { id: 'infra-fw-edge', name: 'FW-EDGE-01 (Palo Alto PA-5260)', type: 'firewall', status: 'healthy', location: 'Hyderabad DMZ', ip: '10.0.0.1', owner: 'emp-040', businessPurpose: 'Primary internet-edge firewall. Inspects all inbound/outbound traffic for Hyderabad DC.', criticality: 'critical', dependencies: ['infra-hyderabad-dc'], connectedTo: ['infra-cloud'], health: 100, securityControls: ['Threat Prevention', 'URL Filtering', 'DNS Security', 'WildFire'], knownRisks: [], mitreMapping: ['T1190', 'T1133'], uptime: '99.99%' },
  { id: 'infra-soc-sentinel', name: 'Microsoft Sentinel Workspace', type: 'application', status: 'healthy', location: 'Azure India South', ip: 'sentinel.azure.com', owner: 'emp-020', businessPurpose: 'Primary SIEM. Ingests 3.2 TB daily from 14,200 log sources. Runs 420 analytics rules.', criticality: 'critical', dependencies: ['infra-cloud'], connectedTo: ['infra-fw-edge'], health: 100, securityControls: ['RBAC', 'Audit Logging', 'Data Retention'], knownRisks: [], mitreMapping: [], uptime: '99.99%' },
];

// ── CYBER DEFENSE UNITS ──
export const CYBER_UNITS: CyberDefenseUnit[] = [
  { id: 'cu-ciso', name: 'CISO Office', description: 'Executive leadership for cyber defense strategy, risk reporting, and regulatory compliance.', head: 'emp-004', teamSize: 4, location: 'Hyderabad', currentInvestigations: 0, openAlerts: 0, kpis: [{ label: 'Board Reports', value: 'Quarterly' }, { label: 'Risk Rating', value: 'Acceptable' }], technologies: [], runbooks: ['Board Reporting', 'Regulatory Notification'], status: 'elevated' },
  { id: 'cu-soc', name: 'Security Operations Center', description: '24/7 monitoring, alert triage, and initial response. Follow-the-sun across Hyderabad and Mumbai.', head: 'emp-020', teamSize: 18, location: 'Hyderabad', currentInvestigations: 6, openAlerts: 47, kpis: [{ label: 'MTTD', value: '12 min' }, { label: 'MTTR', value: '45 min' }, { label: 'Alerts/Day', value: '147' }], technologies: ['Microsoft Sentinel', 'CrowdStrike Falcon', 'ServiceNow'], runbooks: ['Phishing Response', 'Ransomware Containment', 'Impossible Travel'], status: 'elevated' },
  { id: 'cu-ti', name: 'Threat Intelligence', description: 'Tracks threat actors, collects IOCs, produces intelligence reports, and feeds the SOC detection engine.', head: 'emp-025', teamSize: 6, location: 'Hyderabad', currentInvestigations: 2, openAlerts: 0, kpis: [{ label: 'IOCs Tracked', value: '1.2M' }, { label: 'Reports/Month', value: '12' }], technologies: ['MISP', 'Recorded Future', 'VirusTotal'], runbooks: ['IOC Collection', 'Campaign Tracking', 'Intel Dissemination'], status: 'operational' },
  { id: 'cu-th', name: 'Threat Hunting', description: 'Proactive hypothesis-driven threat hunting across endpoints, network, cloud, and identity.', head: 'emp-025', teamSize: 4, location: 'Hyderabad', currentInvestigations: 3, openAlerts: 0, kpis: [{ label: 'Hunts/Month', value: '8' }, { label: 'Findings', value: '3 active' }], technologies: ['Sentinel KQL', 'Falcon', 'Wireshark', 'YARA'], runbooks: ['DNS Analysis', 'Lateral Movement Hunt', 'Credential Abuse Hunt'], status: 'elevated' },
  { id: 'cu-ir', name: 'Incident Response', description: 'Coordinates enterprise response to confirmed incidents. Manages containment, eradication, and recovery.', head: 'emp-027', teamSize: 8, location: 'Hyderabad', currentInvestigations: 4, openAlerts: 0, kpis: [{ label: 'Active Incidents', value: '4' }, { label: 'Containment Rate', value: '98%' }], technologies: ['ServiceNow SIR', 'Falcon Live Response', 'Forensic Tools'], runbooks: ['Ransomware IR', 'Data Breach IR', 'Insider Threat IR'], status: 'elevated' },
  { id: 'cu-se', name: 'Security Engineering', description: 'Builds detection rules, security automation, WAF policies, and infrastructure hardening.', head: 'emp-028', teamSize: 12, location: 'Hyderabad', currentInvestigations: 0, openAlerts: 0, kpis: [{ label: 'Detection Rules', value: '420' }, { label: 'Automation', value: '67%' }], technologies: ['Sentinel', 'Azure Logic Apps', 'Terraform', 'GitHub'], runbooks: ['Rule Development', 'WAF Policy Update', 'Infrastructure Hardening'], status: 'operational' },
  { id: 'cu-appsec', name: 'Application Security', description: 'Secures SDLC with code review, SAST/DAST, architecture review, and API security testing.', head: 'emp-029', teamSize: 10, location: 'Bengaluru', currentInvestigations: 1, openAlerts: 0, kpis: [{ label: 'Critical Vulns', value: '2 open' }, { label: 'Review Coverage', value: '92%' }], technologies: ['Checkmarx', 'Burp Suite', 'SonarQube'], runbooks: ['Secure Code Review', 'API Testing', 'Architecture Review'], status: 'elevated' },
];

// ── CAREER PATH ──
export const CAREER_PATH: CareerRole[] = [
  { id: 'cr-01', level: 1, title: 'Security Intern', department: 'SOC', dailyWork: ['Monitor SOC dashboards', 'Assist with alert triage', 'Document findings', 'Attend training sessions', 'Shadow senior analysts'], responsibilities: ['Learn SOC processes', 'Document investigation steps', 'Assist with research', 'Complete training modules'], tools: ['Sentinel (read-only)', 'ServiceNow', 'Documentation tools'], skills: ['Networking basics', 'Windows basics', 'Security fundamentals'], projects: ['Training investigations', 'Documentation updates'], salaryRange: '₹2.4–3.6 LPA', certifications: ['CompTIA Security+'], promotionCriteria: ['Complete all training missions', 'Demonstrate investigation skills', 'Manager approval'], timeToPromotion: '4 months', currentHolders: 2 },
  { id: 'cr-02', level: 2, title: 'SOC Analyst — Tier 1', department: 'SOC', dailyWork: ['Monitor alert queue', 'Triage security alerts', 'Initial investigation', 'Create incident tickets', 'Escalate to Tier 2', 'Write shift handover notes'], responsibilities: ['Alert triage within SLA', 'Initial investigation and documentation', 'Escalation decisions', 'Shift handover'], tools: ['Microsoft Sentinel', 'CrowdStrike Falcon', 'ServiceNow', 'KQL'], skills: ['KQL queries', 'Alert triage', 'Log analysis', 'Windows events', 'Email analysis'], projects: ['Detection rule testing', 'Playbook execution'], salaryRange: '₹4.8–7.2 LPA', certifications: ['CompTIA Security+', 'CEH', 'SC-200'], promotionCriteria: ['6 months minimum at T1', 'Average investigation score >80%', 'Zero SLA breaches', 'Manager endorsement'], timeToPromotion: '12–18 months', currentHolders: 12 },
  { id: 'cr-03', level: 3, title: 'SOC Analyst — Tier 2', department: 'SOC', dailyWork: ['Deep investigation', 'Complex alert analysis', 'Lateral movement tracking', 'Forensic evidence collection', 'Mentor Tier 1 analysts', 'Write detection rules'], responsibilities: ['Advanced investigation', 'Threat analysis', 'Evidence collection', 'Mentoring', 'Detection engineering'], tools: ['Sentinel (advanced)', 'Falcon (advanced)', 'Wireshark', 'Forensic tools'], skills: ['Advanced KQL', 'Network forensics', 'Endpoint forensics', 'Threat analysis', 'MITRE ATT&CK'], projects: ['Detection rule development', 'Threat hunting support', 'Investigation methodology'], salaryRange: '₹8.4–12 LPA', certifications: ['GCIH', 'GCIA', 'SC-200', 'SC-300'], promotionCriteria: ['12 months minimum at T2', 'Detection rules deployed', 'Investigation quality >85%'], timeToPromotion: '18–24 months', currentHolders: 6 },
  { id: 'cr-04', level: 4, title: 'Threat Hunter', department: 'Threat Hunting', dailyWork: ['Develop hunting hypotheses', 'Write advanced KQL queries', 'Analyze network traffic', 'Track APT groups', 'Correlate IOCs across telemetry', 'Produce intelligence reports'], responsibilities: ['Proactive threat detection', 'Hypothesis development', 'APT tracking', 'Intelligence production', 'Detection gap analysis'], tools: ['Sentinel (advanced)', 'Wireshark', 'YARA', 'Custom tools'], skills: ['Advanced threat analysis', 'APT tracking', 'Malware analysis', 'Network forensics', 'Intelligence analysis'], projects: ['APT tracking', 'Hypothesis hunting', 'Detection gap analysis'], salaryRange: '₹14.4–21.6 LPA', certifications: ['GCTI', 'GCFA', 'GNFA', 'OSCP'], promotionCriteria: ['18 months minimum', 'Published intelligence reports', 'Detection gaps identified'], timeToPromotion: '24–36 months', currentHolders: 4 },
  { id: 'cr-05', level: 5, title: 'Incident Commander', department: 'Incident Response', dailyWork: ['Lead incident response', 'Coordinate cross-team response', 'Executive communication', 'Regulatory reporting', 'Post-incident reviews', 'Tabletop exercises'], responsibilities: ['Incident leadership', 'Executive communication', 'Regulatory compliance', 'IR program management', 'Crisis management'], tools: ['ServiceNow SIR', 'Communication platforms', 'Forensic tools'], skills: ['Incident leadership', 'Executive communication', 'Regulatory knowledge', 'Business impact analysis'], projects: ['Major incident response', 'IR playbooks', 'Tabletop exercises'], salaryRange: '₹18–30 LPA', certifications: ['CISSP', 'GCIH', 'GCFE', 'CISM'], promotionCriteria: ['Led 3+ major incidents', 'Executive communication skills', 'Regulatory knowledge'], timeToPromotion: '36+ months', currentHolders: 2 },
  { id: 'cr-06', level: 6, title: 'Security Architect', department: 'Security Engineering', dailyWork: ['Design security architecture', 'Review system designs', 'Define security standards', 'Evaluate new technologies', 'Mentor engineers', 'Executive advisory'], responsibilities: ['Security architecture', 'Standards development', 'Technology evaluation', 'Mentoring', 'Executive advisory'], tools: ['Architecture tools', 'Cloud consoles', 'Threat modeling tools'], skills: ['Enterprise architecture', 'Cloud security', 'Zero Trust', 'Risk assessment', 'Business acumen'], projects: ['Zero Trust architecture', 'Cloud security design', 'Security standards'], salaryRange: '₹24–42 LPA', certifications: ['CISSP', 'TOGAF', 'CCSP', 'AWS SA Professional'], promotionCriteria: ['Architecture designs implemented', 'Standards adopted', 'Executive trust'], timeToPromotion: 'N/A (senior IC)', currentHolders: 3 },
  { id: 'cr-07', level: 7, title: 'SOC Manager', department: 'SOC', dailyWork: ['SOC operations management', 'Shift oversight', 'Performance management', 'Executive reporting', 'Budget management', 'Vendor management'], responsibilities: ['Operations management', 'Team management', 'Executive reporting', 'Budget', 'Compliance', 'Vendor management'], tools: ['All SOC tools', 'Management dashboards', 'Reporting tools'], skills: ['Operations management', 'Leadership', 'Budget management', 'Executive communication', 'Vendor management'], projects: ['SOC modernization', 'Automation', 'Team development'], salaryRange: '₹30–48 LPA', certifications: ['CISSP', 'CISM', 'ITIL'], promotionCriteria: ['SOC metrics improved', 'Team developed', 'Executive confidence'], timeToPromotion: 'N/A (management)', currentHolders: 1 },
];

// ── LIVE EVENTS GENERATOR ──
const EVENT_SOURCES = [
  { type: 'login' as const, templates: [
    { title: 'Employee login', desc: (e: Employee) => `${e.name} authenticated via Azure AD`, source: 'Azure AD' },
  ]},
  { type: 'vpn' as const, templates: [
    { title: 'VPN session established', desc: () => `Remote access session from Mumbai`, source: 'Palo Alto GlobalProtect' },
  ]},
  { type: 'firewall' as const, templates: [
    { title: 'Inbound connection blocked', desc: () => `External IP 185.${Math.floor(Math.random()*255)}.${Math.floor(Math.random()*255)}.${Math.floor(Math.random()*255)} blocked by FW-EDGE-01`, source: 'Palo Alto' },
    { title: 'Suspicious outbound traffic', desc: () => `High-entropy DNS query to unknown domain`, source: 'Palo Alto DNS Security' },
  ]},
  { type: 'server' as const, templates: [
    { title: 'Server health check OK', desc: () => `SRV-${['APP','DB','CORE'][Math.floor(Math.random()*3)]}-0${Math.floor(Math.random()*9)+1} — all services nominal`, source: 'Azure Monitor' },
  ]},
  { type: 'cloud' as const, templates: [
    { title: 'Azure deployment completed', desc: () => `GFS-PROD-INDIA — new VM scale set updated`, source: 'Azure DevOps' },
    { title: 'Azure Policy compliance', desc: () => `3 resources non-compliant — auto-remediation triggered`, source: 'Azure Policy' },
  ]},
  { type: 'patch' as const, templates: [
    { title: 'Patch deployment wave 3/5', desc: () => `${Math.floor(Math.random()*500)+200} endpoints patched successfully`, source: 'SCCM' },
  ]},
  { type: 'dns' as const, templates: [
    { title: 'DNS query spike', desc: () => `${Math.floor(Math.random()*50)+20}K queries/min from DEV segment — baseline +15%`, source: 'Palo Alto DNS' },
  ]},
  { type: 'email' as const, templates: [
    { title: 'Phishing email quarantined', desc: () => `Microsoft Defender blocked 3 phishing emails to Cards team`, source: 'Defender for O365' },
  ]},
  { type: 'identity' as const, templates: [
    { title: 'MFA challenge completed', desc: () => `12 users completed MFA registration`, source: 'Azure AD' },
    { title: 'Password rotation completed', desc: () => `svc-swift-alliance password rotated via CyberArk`, source: 'CyberArk' },
  ]},
  { type: 'threat' as const, templates: [
    { title: 'IOC match — IP reputation', desc: () => `Known C2 IP ${Math.floor(Math.random()*223)+1}.${Math.floor(Math.random()*255)}.${Math.floor(Math.random()*255)}.${Math.floor(Math.random()*255)} blocked`, source: 'Threat Intelligence' },
  ]},
  { type: 'backup' as const, templates: [
    { title: 'Nightly backup complete', desc: () => `Core Banking DB — 100% success, 2.4 TB backed up`, source: 'Veeam' },
  ]},
];

let eventCounter = 0;

export function generateEnterpriseEvent(): EnterpriseEvent {
  const source = EVENT_SOURCES[Math.floor(Math.random() * EVENT_SOURCES.length)];
  const template = source.templates[Math.floor(Math.random() * source.templates.length)];
  const severities: Array<'info' | 'low' | 'medium' | 'high' | 'critical'> = ['info', 'info', 'info', 'info', 'low', 'low', 'medium', 'high'];
  eventCounter++;

  return {
    id: `evt-${Date.now()}-${eventCounter}`,
    timestamp: new Date().toISOString(),
    type: source.type,
    title: template.title,
    description: template.desc(SOC_TEAM[Math.floor(Math.random() * SOC_TEAM.length)]),
    source: template.source,
    severity: severities[Math.floor(Math.random() * severities.length)],
  };
}

// ── DEPARTMENT EMPLOYEES LOOKUP ──
export function getEmployeesByDepartment(deptCode: string): Employee[] {
  return SOC_TEAM.filter((e) => e.department.toLowerCase().includes(deptCode.toLowerCase()) || e.division.toLowerCase().includes(deptCode.toLowerCase()));
}

export function getEmployee(id: string): Employee | undefined {
  return [...LEADERSHIP, ...SOC_TEAM].find((e) => e.id === id);
}

// ── MOCKS FOR COMPATIBILITY ──
export const MOCK_USER: any = {
  id: 'emp-026',
  name: 'Sai Krishna',
  email: 'sai.krishna@gfs.com',
  role: 'SOC Analyst — Tier 1',
  department: 'SOC',
  location: 'Hyderabad',
  level: 3,
  avatar: '',
  manager: 'emp-021',
};

export const MOCK_ALERTS: any[] = [
  { id: 'ALT-2025-9102', title: 'Suspicious PowerShell Execution', severity: 'high', status: 'investigating', source: 'CrowdStrike Falcon', timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString(), description: 'PowerShell executed with encoded command on WRK-LOAN-047', assignee: 'emp-021' },
  { id: 'ALT-2025-9103', title: 'Impossible Travel Detected', severity: 'medium', status: 'new', source: 'Azure AD', timestamp: new Date(Date.now() - 1000 * 60 * 45).toISOString(), description: 'Login from Mumbai and London within 2 hours for svc-neft-ops', assignee: null },
  { id: 'ALT-2025-9104', title: 'Multiple Failed Logins', severity: 'low', status: 'closed', source: 'Azure AD', timestamp: new Date(Date.now() - 1000 * 60 * 120).toISOString(), description: '15 failed logins for user priya.nair@gfs.com', assignee: 'emp-022' },
];

export const GFS_MODULES: any[] = [
  { id: 'mod-1', title: 'SOC Fundamentals', description: 'Core SOC processes and alert triage.', category: 'Foundation', level: 'beginner', progress: 100, completed: true, prerequisites: [], unlocked: true },
  { id: 'mod-2', title: 'KQL Mastery', description: 'Advanced Kusto Query Language for Sentinel.', category: 'SIEM', level: 'intermediate', progress: 45, completed: false, prerequisites: ['mod-1'], unlocked: true },
  { id: 'mod-3', title: 'Malware Analysis', description: 'Static and dynamic analysis of malware.', category: 'Forensics', level: 'advanced', progress: 0, completed: false, prerequisites: ['mod-2'], unlocked: false },
];
export const MOCK_MESSAGES: any[] = [
  {
    id: 'msg-001',
    from: 'Ananya Das',
    fromRole: 'Chief Information Security Officer',
    to: 'SOC Team',
    subject: 'URGENT: Active Ransomware Campaign Targeting FI Sector',
    body: 'Team,\n\nCERT-In has just issued a high-severity alert regarding a new ransomware variant specifically targeting the financial sector in India. The threat actors are utilizing advanced spear-phishing techniques masquerading as regulatory compliance updates from RBI.\n\nImmediate Actions Required:\n1. Update all Sentinel watchlists with the IOCs provided in the attached MISP event.\n2. Threat Hunting team: Initiate proactive sweeps across the enterprise for any signs of lateral movement.\n3. Increase monitoring severity for all inbound emails containing PDF or ZIP attachments originating from unknown domains.\n\nWe need full coverage on this immediately. Status report due at EOD standup.\n\nRegards,\nAnanya',
    timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 mins ago
    read: false,
    priority: 'urgent'
  },
  {
    id: 'msg-002',
    from: 'Suresh Reddy',
    fromRole: 'SOC Manager',
    to: 'SOC Shift Leads',
    subject: 'Shift Handover Notes - Morning Shift',
    body: 'Shift Leads,\n\nMorning shift handover is complete. We had a relatively quiet shift with 14 low-severity alerts, mostly related to failed logins which were resolved via automated playbooks.\n\nPending items for Evening shift:\n- ALT-2025-9102: Still under investigation by Arjun. Appears to be anomalous PowerShell execution on WRK-LOAN-047, but need to rule out administrative scripts.\n- Keep an eye on the VPN gateways; we saw a minor spike in failed authentications from international IPs around 10:00 AM.\n\nPlease ensure all shift logs are updated in ServiceNow before 11:00 PM.\n\nThanks,\nSuresh',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4).toISOString(), // 4 hours ago
    read: false,
    priority: 'normal'
  },
  {
    id: 'msg-003',
    from: 'Harsha Vardhan',
    fromRole: 'Threat Hunting Lead',
    to: 'Sai Krishna',
    subject: 'Welcome to the Team + Initial Assignments',
    body: 'Welcome Sai!\n\nGlad to have you on board the Cyber Defense team. We have an intensive training program lined up for you over the next two weeks.\n\nFor your first assignment, please review the "SOC Fundamentals" module in the Training portal and familiarize yourself with the basic KQL queries we use for endpoint hunting.\n\nI have also shared a OneNote link with our standard operating procedures (SOPs). Please review the Alert Triage section by tomorrow.\n\nLet me know if you have any trouble accessing Sentinel or CrowdStrike.\n\nBest,\nHarsha',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(), // 2 days ago
    read: true,
    priority: 'normal'
  },
  {
    id: 'msg-004',
    from: 'Rajesh Menon',
    fromRole: 'Chief Information Officer',
    to: 'Enterprise IT, Cyber Defense',
    subject: 'Upcoming Maintenance Window: Azure ExpressRoute',
    body: 'All,\n\nPlease be advised that there is a scheduled maintenance window for the primary Azure ExpressRoute connection this Saturday from 02:00 AM to 04:00 AM IST.\n\nTraffic will failover to the secondary VPN tunnels. We expect minor latency increases but no service disruption. \n\nSOC Team: Please be aware that this failover might trigger "Impossible Travel" or "Unusual Network Route" alerts in Sentinel. Correlate with this maintenance window before escalating.\n\nThanks,\nRajesh',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(),
    read: true,
    priority: 'high'
  }
];
export const MOCK_TICKETS: any[] = [
  {
    id: 'INC-90421',
    title: 'Phishing Email - HR Benefits',
    type: 'incident',
    status: 'in-progress',
    priority: 'p2-high',
    assignee: 'Sai Krishna',
    reporter: 'John Doe',
    created: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    updated: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    description: 'User reported suspicious email claiming to be from HR about new benefits.',
    category: 'Security Event'
  },
  {
    id: 'INC-90422',
    title: 'Firewall Block: Known C2',
    type: 'incident',
    status: 'closed',
    priority: 'p3-medium',
    assignee: 'System',
    reporter: 'Automated Alert',
    created: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    updated: new Date(Date.now() - 1000 * 60 * 60 * 20).toISOString(),
    description: 'Automated block of outbound traffic to known Command & Control IP.',
    category: 'Network Security'
  },
  {
    id: 'REQ-10928',
    title: 'Access Request - AWS Production',
    type: 'service-request',
    status: 'open',
    priority: 'p4-low',
    assignee: 'Identity Team',
    reporter: 'Jane Smith',
    created: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
    updated: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
    description: 'Requesting read-only access to AWS Production subscription for auditing purposes.',
    category: 'Access Management'
  }
];

export const MOCK_CHANGES: any[] = [
  {
    id: 'CHG-30192',
    title: 'Update WAF Ruleset for iBanking',
    type: 'normal',
    status: 'scheduled',
    changeManager: 'Suresh Reddy',
    requester: 'Security Engineering',
    risk: 'high',
    plannedDate: new Date(Date.now() + 1000 * 60 * 60 * 48).toISOString(),
    description: 'Deploying new OWASP Top 10 blocking rules to production WAF.',
    justification: 'Required for compliance and to mitigate recent attack trends.',
    rollbackPlan: 'Revert to previous WAF policy snapshot.',
    affectedSystems: ['sys-2']
  },
  {
    id: 'CHG-30193',
    title: 'Sentinel Agent Deployment',
    type: 'standard',
    status: 'approved',
    changeManager: 'Rajesh Menon',
    requester: 'IT Ops',
    risk: 'low',
    plannedDate: new Date(Date.now() + 1000 * 60 * 60 * 72).toISOString(),
    description: 'Rolling out Sentinel agent update to 500 endpoints in wave 2.',
    justification: 'Routine agent upgrade to support new detection capabilities.',
    rollbackPlan: 'Uninstall new agent via SCCM and push previous stable version.',
    affectedSystems: ['sys-1']
  }
];

export const MOCK_ACTIVITY: any[] = [
  {
    id: 'act-1',
    timestamp: new Date(Date.now() - 1000 * 60 * 10).toISOString(),
    type: 'investigation',
    message: 'Sai Krishna started investigating ALT-2025-9102',
    severity: 'medium',
    user: 'Sai Krishna'
  },
  {
    id: 'act-2',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 20).toISOString(),
    type: 'system',
    message: 'INC-90422 closed by Automation',
    severity: 'success',
    user: 'System'
  },
  {
    id: 'act-3',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 8).toISOString(),
    type: 'user',
    message: 'Suresh Reddy logged in',
    severity: 'info',
    user: 'Suresh Reddy'
  },
  {
    id: 'act-4',
    timestamp: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
    type: 'deployment',
    message: 'New detection rule deployed: Suspicious PowerShell',
    severity: 'success',
    user: 'Harsha Vardhan'
  }
];

export const ENTERPRISE_SYSTEMS: any[] = [
  // --- DMZ SYSTEMS ---
  {
    id: 'sys-web', name: 'iBanking Web Gateway', type: 'web-server', category: 'application',
    status: 'online', ip: '10.10.1.10', location: 'Mumbai DR', owner: 'Digital Channels',
    description: 'Customer facing retail banking web application gateway.',
    dependencies: ['sys-db'], threats: ['SQL Injection', 'XSS', 'Credential Stuffing'],
    lastScan: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(),
    uptime: '99.95%', criticality: 'critical', ports: [80, 443], services: ['HTTP', 'HTTPS'],
    lastPatch: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7).toISOString(), osVersion: 'RHEL 8'
  },
  {
    id: 'sys-mail', name: 'Exchange Edge Server', type: 'mail-server', category: 'application',
    status: 'online', ip: '10.10.1.20', location: 'Hyderabad DC', owner: 'IT Ops',
    description: 'Inbound/Outbound mail relay and spam filtering.',
    dependencies: ['sys-ad'], threats: ['Phishing', 'Malware Delivery'],
    lastScan: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    uptime: '99.99%', criticality: 'high', ports: [25, 465, 587], services: ['SMTP'],
    lastPatch: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString(), osVersion: 'Windows Server 2022'
  },
  {
    id: 'sys-dns', name: 'External DNS Server', type: 'dns-server', category: 'network',
    status: 'online', ip: '10.10.1.30', location: 'Hyderabad DC', owner: 'Network Team',
    description: 'External authoritative DNS server.',
    dependencies: [], threats: ['DNS Amplification', 'Cache Poisoning'],
    lastScan: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    uptime: '100%', criticality: 'high', ports: [53], services: ['DNS'],
    lastPatch: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30).toISOString(), osVersion: 'Ubuntu 22.04 LTS'
  },
  {
    id: 'sys-vpn', name: 'GlobalProtect VPN', type: 'vpn-gateway', category: 'network',
    status: 'online', ip: '10.10.1.40', location: 'Hyderabad DC', owner: 'Network Team',
    description: 'Remote access VPN for employees and vendors.',
    dependencies: ['sys-ad'], threats: ['Credential Brute Force', 'Exploitation'],
    lastScan: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    uptime: '99.98%', criticality: 'critical', ports: [443, 500, 4500], services: ['HTTPS', 'IPsec'],
    lastPatch: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(), osVersion: 'PAN-OS 11.1'
  },
  {
    id: 'sys-lb', name: 'F5 BIG-IP Load Balancer', type: 'load-balancer', category: 'network',
    status: 'online', ip: '10.10.1.50', location: 'Hyderabad DC', owner: 'Network Team',
    description: 'Application delivery controller distributing traffic across DMZ.',
    dependencies: [], threats: ['DDoS'],
    lastScan: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    uptime: '100%', criticality: 'critical', ports: [443], services: ['HTTPS'],
    lastPatch: new Date(Date.now() - 1000 * 60 * 60 * 24 * 15).toISOString(), osVersion: 'TMOS 16.1'
  },
  {
    id: 'sys-waf', name: 'Imperva WAF', type: 'waf', category: 'security',
    status: 'online', ip: '10.10.1.60', location: 'Hyderabad DC', owner: 'Security Engineering',
    description: 'Web Application Firewall filtering layer 7 attacks.',
    dependencies: [], threats: ['Bypass Attempts'],
    lastScan: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    uptime: '99.99%', criticality: 'critical', ports: [80, 443], services: ['HTTP', 'HTTPS'],
    lastPatch: new Date(Date.now() - 1000 * 60 * 60 * 24 * 10).toISOString(), osVersion: 'Imperva OS'
  },

  // --- INTERNAL LAN SYSTEMS ---
  {
    id: 'sys-ad', name: 'Enterprise Active Directory', type: 'domain-controller', category: 'identity',
    status: 'online', ip: '10.10.50.1', location: 'Hyderabad DC', owner: 'IAM Team',
    description: 'Primary domain controller for employee authentication.',
    dependencies: [], threats: ['Kerberoasting', 'Pass-the-Hash', 'Ransomware'],
    lastScan: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    uptime: '100%', criticality: 'critical', ports: [53, 88, 135, 389, 445, 636, 3268], services: ['DNS', 'Kerberos', 'RPC', 'LDAP', 'SMB', 'LDAPS'],
    lastPatch: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString(), osVersion: 'Windows Server 2022'
  },
  {
    id: 'sys-db', name: 'Core Banking Mainframe / DB', type: 'database', category: 'data',
    status: 'online', ip: '10.10.50.20', location: 'Hyderabad DC', owner: 'DBA Team',
    description: 'Primary core banking transaction database.',
    dependencies: [], threats: ['Insider Threat', 'Data Exfiltration'],
    lastScan: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    uptime: '99.99%', criticality: 'critical', ports: [1521, 22], services: ['Oracle TNS', 'SSH'],
    lastPatch: new Date(Date.now() - 1000 * 60 * 60 * 24 * 15).toISOString(), osVersion: 'Oracle Linux 8'
  },
  {
    id: 'sys-filesrv', name: 'Corporate File Server', type: 'file-server', category: 'data',
    status: 'online', ip: '10.10.50.30', location: 'Hyderabad DC', owner: 'IT Ops',
    description: 'Centralized network share for corporate documents.',
    dependencies: ['sys-ad'], threats: ['Ransomware Encryption', 'Unauthorized Access'],
    lastScan: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    uptime: '99.90%', criticality: 'medium', ports: [139, 445], services: ['NetBIOS', 'SMB'],
    lastPatch: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7).toISOString(), osVersion: 'Windows Server 2019'
  },
  {
    id: 'sys-swift', name: 'SWIFT Alliance Gateway', type: 'financial-gateway', category: 'application',
    status: 'online', ip: '10.10.50.80', location: 'Mumbai DR', owner: 'Treasury Ops',
    description: 'International wire transfer and SWIFT messaging gateway.',
    dependencies: ['sys-db'], threats: ['Advanced Persistent Threat (APT)', 'Fraud'],
    lastScan: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(),
    uptime: '99.99%', criticality: 'critical', ports: [443, 1414], services: ['HTTPS', 'IBM MQ'],
    lastPatch: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(), osVersion: 'RHEL 8'
  },
  {
    id: 'sys-siem', name: 'Microsoft Sentinel Forwarder', type: 'log-forwarder', category: 'security',
    status: 'online', ip: '10.10.50.100', location: 'Hyderabad DC', owner: 'SOC',
    description: 'Aggregates on-prem logs and forwards to Azure Sentinel.',
    dependencies: [], threats: ['Log Tampering'],
    lastScan: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    uptime: '100%', criticality: 'high', ports: [514, 443], services: ['Syslog', 'HTTPS'],
    lastPatch: new Date(Date.now() - 1000 * 60 * 60 * 24 * 10).toISOString(), osVersion: 'Ubuntu 22.04 LTS'
  },
  {
    id: 'sys-endpoints', name: 'User Endpoint Subnet', type: 'workstations', category: 'endpoint',
    status: 'online', ip: '10.10.50.60', location: 'Global Branches', owner: 'IT Ops',
    description: 'Corporate user workstations and laptops segment.',
    dependencies: ['sys-ad', 'sys-filesrv'], threats: ['Phishing', 'Malware', 'Insider Threat'],
    lastScan: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    uptime: '98.50%', criticality: 'medium', ports: [], services: [],
    lastPatch: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(), osVersion: 'Windows 11'
  },

  // --- CLOUD & EXTERNAL SYSTEMS ---
  {
    id: 'sys-azuread', name: 'Azure Active Directory', type: 'idp', category: 'identity',
    status: 'online', ip: 'Cloud', location: 'Azure Global', owner: 'IAM Team',
    description: 'Cloud identity provider, SSO, and MFA enforcement.',
    dependencies: ['sys-ad'], threats: ['Account Takeover', 'Consent Phishing'],
    lastScan: new Date().toISOString(),
    uptime: '99.99%', criticality: 'critical', ports: [443], services: ['HTTPS'],
    lastPatch: new Date().toISOString(), osVersion: 'SaaS'
  },
  {
    id: 'sys-aws', name: 'AWS Production Environment', type: 'cloud-vpc', category: 'cloud',
    status: 'online', ip: 'AWS ap-south-1', location: 'AWS Mumbai', owner: 'Cloud Ops',
    description: 'Hosting for non-core microservices and analytics data lake.',
    dependencies: ['sys-vpn'], threats: ['Misconfiguration', 'Exposed S3 Buckets'],
    lastScan: new Date(Date.now() - 1000 * 60 * 60 * 4).toISOString(),
    uptime: '99.95%', criticality: 'high', ports: [443], services: ['HTTPS', 'SSH'],
    lastPatch: new Date().toISOString(), osVersion: 'Amazon Linux 2'
  },
  {
    id: 'sys-socsoar', name: 'ServiceNow SecOps (SOAR)', type: 'soar', category: 'security',
    status: 'online', ip: 'Cloud', location: 'ServiceNow SaaS', owner: 'SOC',
    description: 'Security Orchestration, Automation, and Response platform.',
    dependencies: ['sys-siem'], threats: ['API Key Compromise'],
    lastScan: new Date().toISOString(),
    uptime: '99.99%', criticality: 'high', ports: [443], services: ['HTTPS'],
    lastPatch: new Date().toISOString(), osVersion: 'SaaS'
  },
  {
    id: 'sys-backup', name: 'Veeam Backup & Replication', type: 'backup-server', category: 'data',
    status: 'online', ip: '10.10.80.10', location: 'Mumbai DR', owner: 'IT Ops',
    description: 'Centralized backup server for disaster recovery.',
    dependencies: ['sys-ad'], threats: ['Ransomware Deletion of Backups'],
    lastScan: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    uptime: '100%', criticality: 'critical', ports: [9392, 10001], services: ['Veeam Services'],
    lastPatch: new Date(Date.now() - 1000 * 60 * 60 * 24 * 14).toISOString(), osVersion: 'Windows Server 2022'
  }
];

export const ONBOARDING_STEPS: any[] = [
  { id: 1, title: 'Welcome' }, { id: 2, title: 'Team' }
];
export const TEAM_MEMBERS = SOC_TEAM;