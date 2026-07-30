// src/data/enterprise-organization.ts
import type { Department, TeamMember } from '@/types';

// ============================================================
// ORGANIZATIONAL CHART
// ============================================================

export interface OrgNode {
  id: string;
  name: string;
  title: string;
  department: string;
  location: string;
  avatarInitials: string;
  avatarColor: string;
  reportsTo?: string;
  directReports: string[];
  description: string;
  responsibilities: string[];
  tools: string[];
  careerPath: string[];
}

export const ORG_CHART: OrgNode[] = [
  {
    id: 'org-board', name: 'GFS Board of Directors', title: 'Board of Directors', department: 'Board', location: 'Bengaluru',
    avatarInitials: 'BD', avatarColor: 'linear-gradient(135deg, #1e293b, #334155)',
    directReports: ['org-ceo'], description: 'Provides strategic oversight and governance for Global Financial Services. Comprises independent directors, executive directors, and RBI-nominated directors.',
    responsibilities: ['Strategic direction', 'Risk oversight', 'Regulatory compliance', 'Shareholder value', 'Executive appointments'],
    tools: ['Board Portal', 'Risk Dashboards', 'Audit Reports'], careerPath: [],
  },
  {
    id: 'org-ceo', name: 'Rajesh Sharma', title: 'Chief Executive Officer', department: 'Executive', location: 'Bengaluru',
    avatarInitials: 'RS', avatarColor: 'linear-gradient(135deg, #f59e0b, #d97706)',
    reportsTo: 'org-board', directReports: ['org-coo', 'org-cfo', 'org-cto', 'org-ciso', 'org-chro'],
    description: 'Leads GFS India operations across 9 cities with 42,000+ employees. Reports to the Board. Responsible for overall business strategy, regulatory relationships with RBI, and stakeholder management.',
    responsibilities: ['Business strategy', 'RBI relationship', 'Board reporting', 'P&L oversight', 'Regulatory compliance'],
    tools: ['Executive Dashboard', 'Board Portal', 'Strategic Planning'], careerPath: [],
  },
  {
    id: 'org-cto', name: 'Arun Kulkarni', title: 'Chief Technology Officer', department: 'Technology', location: 'Pune',
    avatarInitials: 'AK', avatarColor: 'linear-gradient(135deg, #3b82f6, #2563eb)',
    reportsTo: 'org-ceo', directReports: ['org-vp-infra', 'org-vp-apps', 'org-vp-cloud'],
    description: 'Leads all technology operations including infrastructure, application development, cloud operations, and enterprise architecture across GFS India.',
    responsibilities: ['Technology strategy', 'Infrastructure', 'Application development', 'Cloud operations', 'Architecture'],
    tools: ['Azure DevOps', 'Jira', 'Architecture Tools', 'Cloud Console'], careerPath: [],
  },
  {
    id: 'org-ciso', name: 'Anand Iyer', title: 'Chief Information Security Officer', department: 'Cybersecurity Division', location: 'Hyderabad',
    avatarInitials: 'AI', avatarColor: 'linear-gradient(135deg, #00e5c7, #059669)',
    reportsTo: 'org-ceo', directReports: ['org-soc-director', 'org-risk-mgr', 'org-compliance-ho', 'org-vp-offensive'],
    description: 'Leads the Cybersecurity Division of 420+ professionals. Responsible for the security posture of all GFS systems, regulatory compliance (RBI, PCI DSS, IT Act), and cyber risk management.',
    responsibilities: ['Security strategy', 'Risk management', 'Compliance', 'Incident oversight', 'Board reporting', 'RBI liaison'],
    tools: ['Sentinel', 'GRC Platform', 'Risk Dashboard', 'Compliance Portal'], careerPath: [],
  },
  {
    id: 'org-soc-director', name: 'Prakash Kulkarni', title: 'SOC Director', department: 'Security Operations Center', location: 'Hyderabad',
    avatarInitials: 'PK', avatarColor: 'linear-gradient(135deg, #10b981, #059669)',
    reportsTo: 'org-ciso', directReports: ['org-soc-mgr', 'org-ir-lead', 'org-ti-lead', 'org-eng-lead'],
    description: 'Directs 24/7 security operations across all GFS India locations. Manages SOC analysts across three shifts, coordinates with Fraud Operations, and reports security posture to CISO.',
    responsibilities: ['SOC operations', 'Shift management', 'Escalation', 'Metrics', 'Staff development', 'Tool optimization'],
    tools: ['Sentinel', 'ServiceNow SIR', 'Falcon', 'Splunk'], careerPath: [],
  },
  {
    id: 'org-soc-mgr', name: 'Suresh Reddy', title: 'Senior SOC Manager', department: 'Security Operations Center', location: 'Hyderabad',
    avatarInitials: 'SR', avatarColor: 'linear-gradient(135deg, #00e5c7, #3b8bf5)',
    reportsTo: 'org-soc-director', directReports: ['org-team-lead', 'org-soc-analysts'],
    description: 'Manages Day Shift and Evening Shift SOC operations. Directly supervises the SOC team lead, analysts, and interns. Reviews all P1 and P2 incidents. Coordinates with IR team for major incidents.',
    responsibilities: ['Shift oversight', 'Alert review', 'Staff mentoring', 'Incident coordination', 'KPI tracking', 'Intern management'],
    tools: ['Sentinel', 'Falcon', 'ServiceNow', 'KQL', 'Splunk'], careerPath: [],
  },
  {
    id: 'org-team-lead', name: 'Arjun Sharma', title: 'SOC Team Lead — Tier 2/3', department: 'Security Operations Center', location: 'Hyderabad',
    avatarInitials: 'AS', avatarColor: 'linear-gradient(135deg, #f0a830, #f04848)',
    reportsTo: 'org-soc-mgr', directReports: ['org-analyst-t2-1', 'org-analyst-t1'],
    description: 'Leads Tier 2/3 investigation team. Handles complex escalations, coordinates threat hunts, and mentors junior analysts and interns.',
    responsibilities: ['Escalation handling', 'Threat hunting', 'Mentoring', 'Investigation coordination', 'Shift handover'],
    tools: ['Sentinel', 'Falcon', 'Wireshark', 'KQL', 'YARA'], careerPath: [],
  },
  {
    id: 'org-ir-lead', name: 'Sai Krishna', title: 'Incident Response Lead', department: 'Incident Response', location: 'Hyderabad',
    avatarInitials: 'SK', avatarColor: 'linear-gradient(135deg, #a78bfa, #ec4899)',
    reportsTo: 'org-soc-director', directReports: [],
    description: 'Leads incident response for major security events. Coordinates cross-functional response including legal, PR, and business stakeholders. Manages forensics capability.',
    responsibilities: ['Incident command', 'IR coordination', 'Forensics', 'Post-mortem', 'Tabletop exercises', 'CERT-In liaison'],
    tools: ['Volatility', 'Autopsy', 'Falcon IR', 'Encase', 'KAPE'], careerPath: [],
  },
  {
    id: 'org-ti-lead', name: 'Harsha Vardhan', title: 'Threat Hunting Lead', department: 'Threat Intelligence', location: 'Hyderabad',
    avatarInitials: 'HV', avatarColor: 'linear-gradient(135deg, #30d98a, #00e5c7)',
    reportsTo: 'org-soc-director', directReports: ['org-ti-analyst'],
    description: 'Leads proactive threat hunting operations and manages the threat intelligence program. Coordinates with RBI CERT-In and Indian Financial ISAC for threat sharing.',
    responsibilities: ['Threat hunting', 'TI program', 'IOC management', 'APT tracking', 'ISAC coordination', 'Hypothesis development'],
    tools: ['MISP', 'Recorded Future', 'Sentinel Hunting', 'Splunk', 'MITRE ATT&CK'], careerPath: [],
  },
  {
    id: 'org-eng-lead', name: 'Aditya Kulkarni', title: 'Cloud & Security Engineering Lead', department: 'Security Engineering', location: 'Pune',
    avatarInitials: 'AD', avatarColor: 'linear-gradient(135deg, #3b8bf5, #a78bfa)',
    reportsTo: 'org-soc-director', directReports: ['org-eng-win', 'org-eng-linux', 'org-eng-cloud'],
    description: 'Leads security engineering across cloud, Windows, and Linux platforms. Implements security controls, hardening standards, and automation across the GFS technology estate.',
    responsibilities: ['Security engineering', 'Cloud security', 'Hardening', 'Automation', 'Architecture', 'Tool deployment'],
    tools: ['Azure', 'AWS', 'Terraform', 'Ansible', 'CrowdStrike', 'Vault'], careerPath: [],
  },
  {
    id: 'org-risk-mgr', name: 'Anil Verma', title: 'Enterprise Risk Manager', department: 'Risk & Compliance', location: 'Bengaluru',
    avatarInitials: 'AV', avatarColor: 'linear-gradient(135deg, #f0a830, #f59e0b)',
    reportsTo: 'org-ciso', directReports: [],
    description: 'Manages enterprise cyber risk assessment, risk quantification, and risk reporting to the Board Risk Committee and RBI.',
    responsibilities: ['Risk assessment', 'Risk quantification', 'Board reporting', 'Risk register', 'Third-party risk'],
    tools: ['GRC Platform', 'Risk Dashboard', 'Excel', 'PowerPoint'], careerPath: [],
  },
  {
    id: 'org-compliance-ho', name: 'Deepa Nair', title: 'Chief Compliance Officer', department: 'Compliance & Regulatory', location: 'Bengaluru',
    avatarInitials: 'DN', avatarColor: 'linear-gradient(135deg, #ec4899, #a78bfa)',
    reportsTo: 'org-ciso', directReports: ['org-compliance-analyst'],
    description: 'Ensures GFS complies with all regulatory requirements including RBI cybersecurity framework, PCI DSS, IT Act 2000, DPDP Act, and CERT-In guidelines.',
    responsibilities: ['Regulatory compliance', 'Audit management', 'Policy framework', 'CERT-In reporting', 'RBI submissions'],
    tools: ['Compliance Portal', 'ServiceNow', 'Audit Management'], careerPath: [],
  },
  {
    id: 'org-vp-offensive', name: 'Nikhil Joshi', title: 'VAPT Lead', department: 'Offensive Security', location: 'Hyderabad',
    avatarInitials: 'NJ', avatarColor: 'linear-gradient(135deg, #f04848, #f0a830)',
    reportsTo: 'org-ciso', directReports: [],
    description: 'Leads vulnerability assessment and penetration testing across all GFS applications, infrastructure, and cloud environments.',
    responsibilities: ['VAPT program', 'Penetration testing', 'Web app testing', 'Cloud testing', 'Purple teaming'],
    tools: ['Burp Suite', 'Nessus', 'Qualys', 'Metasploit', 'Nmap', 'SQLMap'], careerPath: [],
  },
];

// ============================================================
// BUSINESS UNITS
// ============================================================

export interface BusinessUnit {
  id: string;
  name: string;
  icon: string;
  color: string;
  head: string;
  headTitle: string;
  location: string;
  employees: number;
  customers: string;
  revenue: string;
  description: string;
  criticalApps: string[];
  criticalData: string[];
  securityImportance: string;
  commonThreats: string[];
  infrastructure: string[];
  dailyTransactions: string;
}

export const BUSINESS_UNITS: BusinessUnit[] = [
  {
    id: 'bu-retail', name: 'Retail Banking', icon: '🏦', color: 'var(--color-gfs-accent)',
    head: 'Sunil Mehta', headTitle: 'Head of Retail Banking', location: 'Bengaluru', employees: 9200,
    customers: '5.2 Crore accounts', revenue: '₹18,400 Cr annual', dailyTransactions: '₹8,200 Cr daily',
    description: 'Manages savings accounts, current accounts, fixed deposits, recurring deposits, and branch operations across 420+ branches. Core revenue driver for GFS India.',
    criticalApps: ['Core Banking (FIS Profile)', 'CBS Mobile', 'Branch CRM', 'Document Management', 'Customer 360'],
    criticalData: ['Customer PII (Aadhaar, PAN)', 'Account balances', 'Transaction history', 'KYC documents', 'Loan data'],
    securityImportance: 'Stores data for 5.2 crore customers. Any breach triggers mandatory RBI reporting and potential license suspension.',
    commonThreats: ['Phishing', 'ATM skimming', 'Social engineering', 'Insider fraud', 'Ransomware', 'Credential theft'],
    infrastructure: ['Core Banking (Mumbai DC)', 'Branch network (420+)', 'ATM network (2,800+)', 'Internet Banking', 'Mobile Banking'],
  },
  {
    id: 'bu-upi', name: 'UPI Payments', icon: '📱', color: 'var(--color-gfs-blue)',
    head: 'Pooja Sharma', headTitle: 'Head of Cards & Payments', location: 'Hyderabad', employees: 3200,
    customers: '3.8 Crore VPA holders', revenue: '₹2,400 Cr annual', dailyTransactions: '1.8 Crore txns/day',
    description: 'Operates GFS UPI payment gateway processing 1.8 crore transactions daily via NPCI. Supports VPA resolution, QR payments, collect requests, and auto-pay mandates.',
    criticalApps: ['UPI Gateway (GFS-UPI-PROD)', 'VPA Registry', 'Fraud Detection ML', 'QR Management', 'Auto-Pay Engine'],
    criticalData: ['VPA mappings', 'Transaction records', 'Device fingerprints', 'Fraud scores', 'Merchant data'],
    securityImportance: 'UPI fraud costs Indian banks ₹300+ crore annually. GFS UPI gateway is a prime target for organized fraud rings.',
    commonThreats: ['UPI fraud (mule accounts)', 'VPA spoofing', 'SIM swap attacks', 'QR code tampering', 'Social engineering', 'API abuse'],
    infrastructure: ['UPI Gateway (Hyderabad)', 'NPCI UPI Switch', 'Fraud ML Engine', 'Redis Cache', 'Kafka Queue'],
  },
  {
    id: 'bu-neft', name: 'NEFT / RTGS', icon: '🏛️', color: 'var(--color-gfs-purple)',
    head: 'Harsha Vardhan Reddy', headTitle: 'Head of Treasury Operations', location: 'Mumbai', employees: 520,
    customers: 'All GFS account holders + interbank', revenue: '₹45,000 Cr daily throughput', dailyTransactions: '4.5 Lakh NEFT + 28,000 RTGS/day',
    description: 'Operates NEFT batch settlement and RTGS real-time gross settlement connecting to RBI. Processes interbank transfers, corporate payments, and government transactions.',
    criticalApps: ['NEFT Gateway', 'RTGS Gateway', 'SWIFT Alliance Lite2', 'Settlement Reconciliation', 'HSM (Thales)'],
    criticalData: ['NEFT/RTGS transaction logs', 'SWIFT messages', 'IFSC codes', 'Settlement data', 'Reconciliation records'],
    securityImportance: 'Unauthorized transfers could move crores in seconds. SWIFT compromise has been used globally (Bangladesh Bank heist). RBI mandates real-time monitoring.',
    commonThreats: ['SWIFT credential theft', 'Transaction manipulation', 'Insider fraud', 'Session hijacking', 'Man-in-the-middle', 'Business logic abuse'],
    infrastructure: ['NEFT/RTGS Gateway (Mumbai DC)', 'SWIFT Alliance Lite2', 'HSM (Thales)', 'PCI CDE', 'Treasury systems'],
  },
  {
    id: 'bu-cards', name: 'Credit & Debit Cards', icon: '💳', color: 'var(--color-gfs-amber)',
    head: 'Pooja Sharma', headTitle: 'Head of Cards & Payments', location: 'Hyderabad', employees: 2800,
    customers: '1.4 Crore active cards', revenue: '₹3,600 Cr annual', dailyTransactions: '14 Million card txns/day',
    description: 'Manages credit card issuance, debit card operations, card fraud prevention, merchant acquiring, and POS network across 12 lakh merchants.',
    criticalApps: ['Card Management System', 'Fraud Detection (Real-time)', 'POS Network', 'Merchant Portal', 'Card Control App'],
    criticalData: ['Card numbers (PAN)', 'CVV', 'Cardholder data', 'Transaction records', 'Merchant data', 'EMV keys'],
    securityImportance: 'PCI DSS Level 1 compliance mandatory. Card data breach can result in ₹100+ crore fines and loss of card processing privileges.',
    commonThreats: ['Card skimming', 'Card-not-present fraud', 'BIN attacks', 'ATM malware', 'Phishing', 'Data exfiltration'],
    infrastructure: ['Card Processing (Hyderabad)', 'PCI CDE (Mumbai DC)', 'POS Network', 'ATM Network (2,800+)', 'Card Control APIs'],
  },
  {
    id: 'bu-digital', name: 'Digital Banking', icon: '🌐', color: 'var(--color-gfs-green)',
    head: 'Anil Kumar', headTitle: 'Chief Digital Officer', location: 'Bengaluru', employees: 2400,
    customers: '42 Lakh active users', revenue: '₹1,800 Cr annual', dailyTransactions: '₹3,200 Cr daily',
    description: 'Operates the GFS mobile banking app, Internet Banking portal, chatbot banking, and fintech partnerships. Responsible for digital transformation initiatives.',
    criticalApps: ['Mobile Banking App (React Native)', 'Internet Banking (Angular)', 'Chatbot Engine', 'API Gateway', 'Notification Service'],
    criticalData: ['Session tokens', 'Device bindings', 'Biometric data', 'App analytics', 'API keys'],
    securityImportance: 'Customer-facing application. SQL injection, API abuse, or session hijacking could directly impact millions of customers.',
    commonThreats: ['SQL injection', 'API abuse', 'Session hijacking', 'Mobile app reverse engineering', 'Man-in-the-middle', 'Phishing'],
    infrastructure: ['Internet Banking (Hyderabad DMZ)', 'Mobile Backend (Azure India)', 'API Gateway', 'CDN', 'OTP Gateway (Gupshup)'],
  },
  {
    id: 'bu-loans', name: 'Loans & Advances', icon: '📋', color: 'var(--color-gfs-accent)',
    head: 'Deepak Nair', headTitle: 'Head of Loans & Advances', location: 'Mumbai', employees: 4100,
    customers: '38 Lakh loan accounts', revenue: '₹12,600 Cr annual', dailyTransactions: '₹400 Cr monthly disbursements',
    description: 'Manages home loans, car loans, personal loans, education loans, and business loans. Handles loan origination, processing, disbursal, and recovery.',
    criticalApps: ['Loan Origination System', 'Loan Management System', 'Credit Bureau Integration', 'Document Vault', 'Collections Engine'],
    criticalData: ['Applicant PII', 'Income documents', 'Property documents', 'CIBIL scores', 'Loan agreements', 'Disbursal records'],
    securityImportance: 'Handles sensitive financial data during loan processing. Document manipulation or unauthorized disbursement could cause massive losses.',
    commonThreats: ['Data exfiltration', 'Document forgery', 'Insider fraud', 'Ransomware', 'Credential theft', 'API abuse'],
    infrastructure: ['Loan Processing Servers (Mumbai DC)', 'Document Vault', 'CIBIL Integration', 'DFS Share', 'Core Banking Link'],
  },
  {
    id: 'bu-corporate', name: 'Corporate Banking', icon: '🏢', color: 'var(--color-gfs-blue)',
    head: 'Ravi Shankar Prasad', headTitle: 'Head of Corporate Banking', location: 'Mumbai', employees: 3800,
    customers: '18,000 corporate clients', revenue: '₹8,700 Cr annual', dailyTransactions: '₹28,000 Cr daily',
    description: 'Provides corporate lending, trade finance, cash management, and institutional services to large enterprises and government entities.',
    criticalApps: ['Corporate Internet Banking', 'Trade Finance Platform', 'Cash Management', 'Lending Suite', 'SWIFT Gateway'],
    criticalData: ['Corporate account data', 'Trade documents', 'SWIFT credentials', 'Deal information', 'M&A data'],
    securityImportance: 'Handles high-value transactions. SWIFT credentials are targeted by sophisticated threat actors. M&A data is material non-public information.',
    commonThreats: ['Business Email Compromise', 'SWIFT attacks', 'Data exfiltration', 'Insider threats', 'Supply chain attacks', 'Advanced persistent threats'],
    infrastructure: ['Corporate Banking (Mumbai)', 'SWIFT Gateway', 'Trade Finance Platform', 'Corporate VPN', 'Deal Room'],
  },
  {
    id: 'bu-treasury', name: 'Treasury & Investment', icon: '💹', color: 'var(--color-gfs-amber)',
    head: 'Harsha Vardhan Reddy', headTitle: 'Chief Investment Officer', location: 'Mumbai', employees: 520,
    customers: 'GFS institutional portfolio', revenue: '₹3,800 Cr annual returns', dailyTransactions: '₹1,200 Cr daily trades',
    description: 'Manages GFS investment portfolio, liquidity operations, forex trading, government securities, and risk hedging. Connected to NSE, BSE, and CCIL.',
    criticalApps: ['Treasury Management System', 'Forex Trading Platform', 'Risk Analytics', 'CCIL Integration', 'Bloomberg Terminal'],
    criticalData: ['Trading positions', 'Investment data', 'Forex rates', 'Counterparty data', 'Deal information'],
    securityImportance: 'Trading floor compromise could manipulate positions or execute unauthorized trades. DNS tunneling from Treasury workstation indicates active reconnaissance.',
    commonThreats: ['Trading manipulation', 'Data exfiltration', 'DNS tunneling', 'Insider trading risks', 'Market manipulation', 'Advanced persistent threats'],
    infrastructure: ['Treasury Floor (Mumbai)', 'Trading Platforms', 'Bloomberg Terminal', 'NSE/BSE Links', 'CCIL Settlement'],
  },
  {
    id: 'bu-fraud', name: 'Fraud Prevention', icon: '🛡️', color: 'var(--color-gfs-red)',
    head: 'Vikram Singh', headTitle: 'Head of Fraud Operations', location: 'Hyderabad', employees: 240,
    customers: 'All GFS customers', revenue: '₹47.2 Lakh blocked today', dailyTransactions: 'Real-time monitoring of 1.8 Cr UPI + 14M card txns',
    description: 'Operates real-time fraud detection across UPI, NEFT, RTGS, cards, and Internet Banking. Uses ML models, rule engines, and manual investigation to prevent fraud.',
    criticalApps: ['Fraud Detection ML Platform', 'Rules Engine', 'Case Management', 'Mule Account Detection', 'Device Fingerprinting'],
    criticalData: ['Fraud patterns', 'Blacklisted accounts', 'Mule account lists', 'Transaction risk scores', 'Investigation records'],
    securityImportance: 'Last line of defense against financial fraud. ₹300+ crore lost annually across Indian banking to UPI fraud alone.',
    commonThreats: ['UPI mule accounts', 'Card fraud', 'Identity theft', 'SIM swap', 'Social engineering', 'Account takeover'],
    infrastructure: ['Fraud Detection Platform (Hyderabad)', 'ML Models', 'Rules Engine', 'Real-time Stream Processing', 'NPCI Integration'],
  },
];

// ============================================================
// EMPLOYEE DIRECTORY
// ============================================================

export interface EmployeeProfile {
  id: string;
  employeeId: string;
  name: string;
  avatarInitials: string;
  avatarColor: string;
  department: string;
  team: string;
  title: string;
  manager: string;
  location: string;
  email: string;
  phone: string;
  experience: string;
  joinDate: string;
  skills: string[];
  certifications: string[];
  devices: string[];
  assets: string[];
  currentAssignment: string;
  activeIncidents: string[];
  careerPath: string;
  status: 'online' | 'away' | 'offline';
}

export const EMPLOYEE_DIRECTORY: EmployeeProfile[] = [
  { id: 'emp-001', employeeId: 'GFS-IN-00101', name: 'Rajesh Sharma', avatarInitials: 'RS', avatarColor: 'linear-gradient(135deg, #f59e0b, #d97706)', department: 'Executive', team: 'Board', title: 'Chief Executive Officer', manager: 'Board of Directors', location: 'Bengaluru HQ', email: 'rajesh.sharma@gfs.com', phone: '+91 80 4500 0001', experience: '28 years', joinDate: '2010-03-15', skills: ['Strategic Leadership', 'Banking Operations', 'Regulatory Affairs', 'Risk Management'], certifications: ['IIM Ahmedabad (MBA)', 'Certified Bank Manager'], devices: ['ThinkPad X1 Carbon', 'iPhone 15 Pro'], assets: ['Executive Laptop', 'VIP Access Badge', 'VIP Parking'], currentAssignment: 'Board strategy review — Q4 planning', activeIncidents: [], careerPath: 'CEO', status: 'online' },
  { id: 'emp-002', employeeId: 'GFS-IN-00201', name: 'Anand Iyer', avatarInitials: 'AI', avatarColor: 'linear-gradient(135deg, #00e5c7, #059669)', department: 'Cybersecurity Division', team: 'CISO Office', title: 'Chief Information Security Officer', manager: 'Rajesh Sharma (CEO)', location: 'Hyderabad SOC', email: 'anand.iyer@gfs.com', phone: '+91 40 4500 0010', experience: '20 years', joinDate: '2016-07-01', skills: ['Security Strategy', 'Risk Management', 'RBI Compliance', 'Incident Command', 'Board Reporting'], certifications: ['CISSP', 'CISM', 'ISO 27001 LA', 'PCI QSA'], devices: ['MacBook Pro 16"', 'iPhone 15 Pro'], assets: ['CISO Laptop', 'Building A Access', 'Security Clearance Level 5'], currentAssignment: 'Coordinating response to coordinated attack campaign', activeIncidents: ['ALT-2025-9001', 'ALT-2025-9002'], careerPath: 'CISO → Board → Consulting', status: 'online' },
  { id: 'emp-003', employeeId: 'GFS-IN-00301', name: 'Prakash Kulkarni', avatarInitials: 'PK', avatarColor: 'linear-gradient(135deg, #10b981, #059669)', department: 'SOC', team: 'SOC Leadership', title: 'SOC Director', manager: 'Anand Iyer (CISO)', location: 'Hyderabad SOC', email: 'prakash.kulkarni@gfs.com', phone: '+91 40 4500 0020', experience: '16 years', joinDate: '2018-01-15', skills: ['SOC Management', 'Threat Intelligence', 'SIEM Architecture', 'Team Building', 'KPI Development'], certifications: ['CISSP', 'GCIH', 'Splunk Certified', 'CRISC'], devices: ['Dell Latitude 7440', 'iPhone 14'], assets: ['SOC Director Laptop', 'Full Building Access', 'SC Level 4'], currentAssignment: 'Monthly security posture review — preparing board deck', activeIncidents: ['ALT-2025-9001'], careerPath: 'SOC Director → CISO Office → VP Cyber Defense', status: 'online' },
  { id: 'emp-004', employeeId: 'GFS-IN-00401', name: 'Suresh Reddy', avatarInitials: 'SR', avatarColor: 'linear-gradient(135deg, #00e5c7, #3b8bf5)', department: 'SOC', team: 'SOC Management', title: 'Senior SOC Manager', manager: 'Prakash Kulkarni (SOC Director)', location: 'Hyderabad SOC', email: 'suresh.reddy@gfs.com', phone: '+91 40 4500 0030', experience: '14 years', joinDate: '2019-04-01', skills: ['SOC Operations', 'Incident Management', 'Staff Mentoring', 'KQL Analytics', 'Shift Management'], certifications: ['GCIA', 'CEH', 'Splunk Certified', 'SC-200'], devices: ['Dell XPS 15', 'iPhone 13'], assets: ['Manager Laptop', 'SOC Floor Access', 'SC Level 3'], currentAssignment: 'Managing SOC response to coordinated attack — mentoring new intern', activeIncidents: ['ALT-2025-9001', 'ALT-2025-9002', 'ALT-2025-9003'], careerPath: 'SOC Manager → SOC Director → CISO Office', status: 'online' },
  { id: 'emp-005', employeeId: 'GFS-IN-00501', name: 'Arjun Sharma', avatarInitials: 'AS', avatarColor: 'linear-gradient(135deg, #f0a830, #f04848)', department: 'SOC', team: 'Tier 2/3 Investigation', title: 'SOC Team Lead — Tier 2/3', manager: 'Suresh Reddy', location: 'Hyderabad SOC', email: 'arjun.sharma@gfs.com', phone: '+91 40 4500 0040', experience: '8 years', joinDate: '2020-06-15', skills: ['Advanced Investigation', 'Threat Hunting', 'KQL', 'YARA', 'Wireshark', 'Mentoring'], certifications: ['GCIH', 'GCFA', 'CEH', 'OSCP'], assets: ['Analyst Laptop', 'SOC Floor Access', 'SC Level 3'], devices: ['Dell XPS 15', 'iPhone 14'], currentAssignment: 'Hunting for lateral movement in Loans dept — Cobalt Strike beacon pivot', activeIncidents: ['ALT-2025-9002'], careerPath: 'Team Lead → Threat Hunter Lead → SOC Manager', status: 'online' },
  { id: 'emp-006', employeeId: 'GFS-IN-00601', name: 'Sai Krishna', avatarInitials: 'SK', avatarColor: 'linear-gradient(135deg, #a78bfa, #ec4899)', department: 'Incident Response', team: 'IR Team', title: 'Incident Response Lead', manager: 'Prakash Kulkarni', location: 'Hyderabad SOC', email: 'sai.krishna@gfs.com', phone: '+91 40 4500 0050', experience: '10 years', joinDate: '2019-08-01', skills: ['Incident Response', 'Digital Forensics', 'Malware Analysis', 'IR Coordination', 'CERT-In Liaison'], certifications: ['GCFE', 'GCIH', 'CHFI', 'EnCE'], assets: ['Forensics Laptop', 'IR War Room Access', 'SC Level 4'], devices: ['Dell Precision 5680', 'iPhone 14'], currentAssignment: 'Coordinating ransomware containment — WRK-LOAN-047', activeIncidents: ['ALT-2025-9002', 'ALT-2025-9004'], careerPath: 'IR Lead → Security Architect → CISO Office', status: 'away' },
  { id: 'emp-007', employeeId: 'GFS-IN-00701', name: 'Harsha Vardhan', avatarInitials: 'HV', avatarColor: 'linear-gradient(135deg, #30d98a, #00e5c7)', department: 'Threat Intelligence', team: 'Threat Hunting', title: 'Threat Hunting Lead', manager: 'Prakash Kulkarni', location: 'Hyderabad SOC', email: 'harsha.vardhan@gfs.com', phone: '+91 40 4500 0060', experience: '9 years', joinDate: '2020-02-01', skills: ['Threat Hunting', 'APT Analysis', 'MITRE ATT&CK', 'MISP', 'KQL Advanced', 'OSINT'], certifications: ['GCTI', 'GCIA', 'CEH', 'CRTP'], assets: ['Analyst Laptop', 'SOC Floor Access', 'SC Level 3'], devices: ['Dell XPS 15', 'iPhone 13'], currentAssignment: 'Correlating Silk Typhoon indicators with DNS logs — C2 hunting', activeIncidents: ['ALT-2025-9006'], careerPath: 'Threat Hunter Lead → SOC Director → Consulting', status: 'online' },
  { id: 'emp-008', employeeId: 'GFS-IN-00801', name: 'Aditya Kulkarni', avatarInitials: 'AD', avatarColor: 'linear-gradient(135deg, #3b8bf5, #a78bfa)', department: 'Security Engineering', team: 'Engineering Leadership', title: 'Cloud & Security Engineering Lead', manager: 'Prakash Kulkarni', location: 'Pune Office', email: 'aditya.kulkarni@gfs.com', phone: '+91 20 4500 0070', experience: '11 years', joinDate: '2018-09-01', skills: ['Cloud Security', 'Azure', 'AWS', 'Kubernetes', 'Terraform', 'Security Architecture'], certifications: ['AWS Security Specialty', 'AZ-500', 'CKS', 'CISSP'], assets: ['Engineering Laptop', 'Pune Office Access', 'SC Level 3'], devices: ['MacBook Pro 14"', 'iPhone 14'], currentAssignment: 'Architecting zero-trust segmentation for AKS India cluster', activeIncidents: [], careerPath: 'Engineering Lead → VP Security Engineering → CTO Office', status: 'away' },
  { id: 'emp-009', employeeId: 'GFS-IN-00901', name: 'Raghav Sharma', avatarInitials: 'RS', avatarColor: 'linear-gradient(135deg, #f0a830, #30d98a)', department: 'SOC', team: 'Tier 1 Analysts', title: 'SOC Analyst — Tier 1', manager: 'Arjun Sharma', location: 'Hyderabad SOC', email: 'raghav.sharma@gfs.com', phone: '+91 40 4500 0080', experience: '2 years', joinDate: '2023-06-01', skills: ['Alert Triage', 'KQL Basics', 'Sentinel', 'Falcon', 'Ticket Management'], certifications: ['SC-900', 'CompTIA Security+'], assets: ['Analyst Workstation', 'SOC Floor Access', 'SC Level 2'], devices: ['Dell OptiPlex', 'GFS Phone'], currentAssignment: 'Triaging incoming alerts — 14 untriaged in queue', activeIncidents: ['ALT-2025-9003'], careerPath: 'Tier 1 → Tier 2 → Senior Analyst → Team Lead', status: 'online' },
  { id: 'emp-010', employeeId: 'GFS-IN-01001', name: 'Nikhil Joshi', avatarInitials: 'NJ', avatarColor: 'linear-gradient(135deg, #f04848, #f0a830)', department: 'Offensive Security', team: 'VAPT Team', title: 'VAPT Lead', manager: 'Anand Iyer (CISO)', location: 'Hyderabad SOC', email: 'nikhil.joshi@gfs.com', phone: '+91 40 4500 0090', experience: '7 years', joinDate: '2020-03-01', skills: ['Penetration Testing', 'Web App Testing', 'Cloud Testing', 'Vulnerability Management', 'Purple Teaming'], certifications: ['OSCP', 'OSCE3', 'GWAPT', 'CCSP'], assets: ['Testing Laptop', 'Red Team Lab Access', 'SC Level 3'], devices: ['ThinkPad X1 Extreme', 'iPhone 14'], currentAssignment: 'Quarterly penetration test — Internet Banking portal', activeIncidents: [], careerPath: 'VAPT Lead → Red Team Lead → CISO Office', status: 'online' },
  { id: 'emp-011', employeeId: 'GFS-IN-10452', name: 'You (Security Intern)', avatarInitials: 'SI', avatarColor: 'linear-gradient(135deg, #00e5c7, #3b8bf5)', department: 'SOC', team: 'Cyber Defense Internship', title: 'Security Intern', manager: 'Suresh Reddy', location: 'Hyderabad SOC', email: 'intern4721@gfs.com', phone: '+91 40 4500 9999', experience: 'Day 1', joinDate: new Date().toISOString().split('T')[0], skills: ['Networking Basics', 'Windows Basics', 'Linux Basics', 'Security Fundamentals'], certifications: [], assets: ['Intern Workstation', 'SOC Floor Access', 'SC Level 2'], devices: ['GFS Laptop (Dell Latitude 5540)', 'GFS Phone', 'VPN Token', 'Smart Card'], currentAssignment: 'Complete onboarding and begin first investigation — UPI fraud alert', activeIncidents: [], careerPath: 'Security Intern → SOC Analyst L1 → Ethical Hacker → VAPT Consultant', status: 'online' },
];

// ============================================================
// DEPARTMENTS (expanded with dashboards)
// ============================================================

export interface DepartmentDashboard {
  department: string;
  keyMetrics: { label: string; value: string; trend?: string }[];
  recentActivity: string[];
  openTickets: number;
  criticalAlerts: number;
  teamSize: number;
  toolsUsed: string[];
}

export const DEPARTMENT_DASHBOARDS: Record<string, DepartmentDashboard> = {
  'SOC': {
    department: 'Security Operations Center',
    keyMetrics: [
      { label: 'Open Alerts', value: '23', trend: '+15%' },
      { label: 'MTTD', value: '1.8 min', trend: '-12%' },
      { label: 'MTTR', value: '2.1 hours', trend: '-8%' },
      { label: 'Alert Fatigue Score', value: '34%', trend: '-5%' },
      { label: 'Analyst Utilization', value: '87%' },
      { label: 'Shift Coverage', value: '100%' },
    ],
    recentActivity: [
      'P1 incident: UPI fraud — 847 suspicious transactions (ALT-2025-9001)',
      'Ransomware containment: WRK-LOAN-047 isolated (ALT-2025-9002)',
      'Night → Day shift handover completed at 06:00 IST',
      'New intern onboarded to SOC platform — Day 1',
    ],
    openTickets: 23, criticalAlerts: 2, teamSize: 72,
    toolsUsed: ['Microsoft Sentinel', 'CrowdStrike Falcon', 'Splunk Enterprise', 'ServiceNow SIR', 'Wireshark', 'KQL', 'YARA'],
  },
  'Incident Response': {
    department: 'Incident Response',
    keyMetrics: [
      { label: 'Active IR Cases', value: '3' },
      { label: 'Avg Containment Time', value: '42 min' },
      { label: 'Evidence Items Secured', value: '12' },
      { label: 'CERT-In Reports Filed', value: '1' },
    ],
    recentActivity: [
      'WRK-LOAN-047 forensic acquisition completed',
      'Malware payload (stage2.ps1) submitted to sandbox',
      'IR bridge call scheduled for 14:00 IST',
    ],
    openTickets: 5, criticalAlerts: 2, teamSize: 18,
    toolsUsed: ['Volatility', 'Autopsy', 'Falcon Live Response', 'KAPE', 'Wireshark', 'YARA', 'FTK Imager'],
  },
  'Threat Intelligence': {
    department: 'Threat Intelligence',
    keyMetrics: [
      { label: 'IOCs Tracked', value: '42,847' },
      { label: 'Active Threat Actors', value: '12' },
      { label: 'TI Reports This Month', value: '8' },
      { label: 'ISAC Sharing Events', value: '3' },
    ],
    recentActivity: [
      'DarkShadow APT group profile updated',
      'RBI threat advisory: UPI fraud campaign — 5 banks affected',
      'IOC feed enrichment: 847 new indicators from ALT-2025-9001',
    ],
    openTickets: 4, criticalAlerts: 1, teamSize: 8,
    toolsUsed: ['MISP', 'Recorded Future', 'VirusTotal', 'Shodan', 'MITRE ATT&CK', 'RBI NISC-CIRT Feed'],
  },
  'Security Engineering': {
    department: 'Security Engineering',
    keyMetrics: [
      { label: 'Hardening Compliance', value: '94.2%' },
      { label: 'Automation Rules', value: '128' },
      { label: 'Open Projects', value: '6' },
      { label: 'Patch Compliance', value: '91.8%' },
    ],
    recentActivity: [
      'YARA rules updated for LockBit 3.0 variants',
      'Group Policy hardening for finance OU completed',
      'AKS RBAC audit in progress',
    ],
    openTickets: 8, criticalAlerts: 0, teamSize: 35,
    toolsUsed: ['Azure', 'AWS', 'Terraform', 'Ansible', 'Vault', 'GitLab', 'Jenkins', 'Docker'],
  },
  'Offensive Security': {
    department: 'Offensive Security (VAPT)',
    keyMetrics: [
      { label: 'Active Assessments', value: '2' },
      { label: 'Critical Findings', value: '4' },
      { label: 'Remediation Rate', value: '87%' },
      { label: 'Test Coverage', value: '72%' },
    ],
    recentActivity: [
      'Internet Banking pen test in progress — Phase 2',
      'API security assessment scheduled for next week',
      'Purple team exercise plan submitted',
    ],
    openTickets: 3, criticalAlerts: 0, teamSize: 12,
    toolsUsed: ['Burp Suite Pro', 'Nessus', 'Qualys', 'Metasploit', 'Nmap', 'SQLMap', 'BloodHound', 'Cobalt Strike'],
  },
  'Risk & Compliance': {
    department: 'Risk & Compliance',
    keyMetrics: [
      { label: 'Risk Score', value: '7.2/10' },
      { label: 'Open Audit Items', value: '14' },
      { label: 'PCI DSS Compliance', value: '96.8%' },
      { label: 'Policy Violations', value: '3' },
    ],
    recentActivity: [
      'PCI DSS v4.0 evidence collection in progress',
      'RBI quarterly cyber incident report filed',
      'Risk register updated for coordinated attack',
    ],
    openTickets: 14, criticalAlerts: 0, teamSize: 22,
    toolsUsed: ['GRC Platform', 'ServiceNow GRC', 'Qualys Policy Compliance', 'Excel', 'PowerPoint'],
  },
  'Cloud Operations': {
    department: 'Cloud Operations',
    keyMetrics: [
      { label: 'Cloud Spend', value: '₹42L/month' },
      { label: 'Resources Managed', value: '830+' },
      { label: 'Security Findings', value: '12' },
      { label: 'Data Residency', value: '100% India' },
    ],
    recentActivity: [
      'AWS S3 bucket audit — 14 public buckets found',
      'Azure Defender alerts reviewed',
      'RBI data localization compliance verified',
    ],
    openTickets: 6, criticalAlerts: 1, teamSize: 28,
    toolsUsed: ['Azure Portal', 'AWS Console', 'GuardDuty', 'Defender for Cloud', 'Terraform', 'CloudTrail'],
  },
  'Identity & Access': {
    department: 'Identity & Access Management',
    keyMetrics: [
      { label: 'Total Accounts', value: '42,847' },
      { label: 'Service Accounts', value: '2,847' },
      { label: 'MFA Coverage', value: '99.2%' },
      { label: 'PAM Requests', value: '28 today' },
    ],
    recentActivity: [
      'Service account audit initiated following ALT-2025-9003',
      'Conditional Access policy updated — geo-blocking non-IN IPs',
      'New intern access provisioned',
    ],
    openTickets: 9, criticalAlerts: 1, teamSize: 15,
    toolsUsed: ['Azure AD / Entra ID', 'PAM Solution', 'Azure AD Connect', 'Group Policy', 'PKI', 'MFA Service'],
  },
};

// ============================================================
// OFFICE LOCATIONS
// ============================================================

export interface OfficeLocation {
  id: string;
  name: string;
  city: string;
  type: 'headquarters' | 'soc' | 'datacenter' | 'cloud-ops' | 'dr-site' | 'regional' | 'branch-hub';
  address: string;
  floors: number;
  employees: number;
  criticalSystems: string[];
  description: string;
  securityLevel: string;
  highlights: string[];
  mapPosition: { x: number; y: number };
}

export const OFFICE_LOCATIONS: OfficeLocation[] = [
  {
    id: 'loc-blr', name: 'GFS Global Headquarters', city: 'Bengaluru', type: 'headquarters',
    address: 'Outer Ring Road, Marathahalli, Bengaluru, Karnataka 560103',
    floors: 18, employees: 12000, securityLevel: 'SC Level 5 — Restricted',
    criticalSystems: ['Executive Boardroom', 'CISO Office', 'Enterprise Architecture', 'Risk Committee Room'],
    description: 'Global headquarters of GFS. Houses the CEO office, CISO office, Board Room, Risk Committee, and enterprise architecture teams. 18 floors across two towers.',
    highlights: ['Executive Floor (Floor 18)', 'Board Room', 'Cafeteria (3 floors)', 'Gym & Recreation', 'Crèche', 'Executive Dining'],
    mapPosition: { x: 35, y: 65 },
  },
  {
    id: 'loc-hyd', name: 'India SOC — Gachibowli Cyber Hub', city: 'Hyderabad', type: 'soc',
    address: 'Cyber Towers, HITEC City, Gachibowli, Hyderabad, Telangana 500081',
    floors: 6, employees: 2800, securityLevel: 'SC Level 4 — High Security',
    criticalSystems: ['SOC War Room', 'SIEM Infrastructure', 'Fraud Detection Platform', 'Incident Response Lab', 'Threat Intelligence Center'],
    description: 'India\'s primary Security Operations Centre. 24/7 monitoring of all GFS systems. Houses SOC, Incident Response, Threat Intelligence, Fraud Operations, and VAPT teams.',
    highlights: ['SOC Floor (Floor 12)', 'IR War Room (Floor 12, Room 1204)', 'Training Center (Floor 11)', '24/7 Shift Operations', 'Biometric Access'],
    mapPosition: { x: 45, y: 55 },
  },
  {
    id: 'loc-mum', name: 'Mumbai Data Center', city: 'Mumbai', type: 'datacenter',
    address: 'Navi Mumbai DC, Airoli, Navi Mumbai, Maharashtra 400076',
    floors: 4, employees: 3200, securityLevel: 'SC Level 5 — Restricted (PCI CDE)',
    criticalSystems: ['Core Banking (FIS Profile)', 'NEFT/RTGS Gateway', 'SWIFT Alliance Lite2', 'PCI CDE', 'Treasury Systems', 'Mainframe'],
    description: 'Primary data center housing core banking systems, payment gateways, and PCI Cardholder Data Environment. Tier 4 facility with 99.999% uptime SLA.',
    highlights: ['Server Room (Floor 1)', 'PCI CDE (Floor 2)', 'Network Operations (Floor 3)', 'DR Control Room', '24/7 Security', 'Visitor Escort Required'],
    mapPosition: { x: 32, y: 42 },
  },
  {
    id: 'loc-pune', name: 'Cloud & Engineering Center', city: 'Pune', type: 'cloud-ops',
    address: 'IT Park, Hinjewadi Phase 3, Pune, Maharashtra 411057',
    floors: 5, employees: 5200, securityLevel: 'SC Level 3 — Standard',
    criticalSystems: ['Cloud Infrastructure', 'Azure DevOps', 'CI/CD Pipelines', 'Container Registry', 'Security Engineering Labs'],
    description: 'Cloud operations, application development, and security engineering center. Manages Azure and AWS infrastructure, Kubernetes clusters, and DevOps pipelines.',
    highlights: ['Cloud NOC (Floor 5)', 'Dev Labs (Floor 3)', 'Security Engineering (Floor 4)', 'Innovation Center', 'Collaboration Spaces'],
    mapPosition: { x: 38, y: 50 },
  },
  {
    id: 'loc-chen', name: 'Chennai Disaster Recovery Site', city: 'Chennai', type: 'dr-site',
    address: 'IT Corridor, Sholinganallur, Chennai, Tamil Nadu 600119',
    floors: 3, employees: 3400, securityLevel: 'SC Level 4 — High Security',
    criticalSystems: ['DR Core Banking', 'Backup Systems', 'Replication Links', 'DR Command Center'],
    description: 'Disaster recovery site mirroring Mumbai DC. Maintains real-time replication for core banking, NEFT/RTGS, and payment systems. Activated during DR exercises.',
    highlights: ['DR Command Center', 'Server Room', 'Testing Lab', 'DR Exercise Area', 'Standby SOC'],
    mapPosition: { x: 48, y: 58 },
  },
  {
    id: 'loc-del', name: 'Delhi Regional Office', city: 'Delhi', type: 'regional',
    address: 'Connaught Place, New Delhi 110001',
    floors: 3, employees: 4800, securityLevel: 'SC Level 2 — Standard',
    criticalSystems: ['Regional CRM', 'Government Banking', 'Regional Analytics'],
    description: 'North India regional office. Handles government banking relationships, corporate accounts in NCR region, and regional operations management.',
    highlights: ['Executive Suite', 'Government Relations', 'Client Meeting Rooms', 'Regional Analytics Center'],
    mapPosition: { x: 40, y: 30 },
  },
  {
    id: 'loc-ccu', name: 'Kolkata Regional Office', city: 'Kolkata', type: 'regional',
    address: 'Salt Lake Sector V, Kolkata, West Bengal 700091',
    floors: 2, employees: 2200, securityLevel: 'SC Level 2 — Standard',
    criticalSystems: ['Regional Operations', 'Branch Management'],
    description: 'East India regional office managing operations across West Bengal, Odisha, Bihar, and North-East states.',
    highlights: ['Regional Operations', 'Branch Coordination', 'Training Wing'],
    mapPosition: { x: 62, y: 38 },
  },
  {
    id: 'loc-ahm', name: 'Ahmedabad Regional Office', city: 'Ahmedabad', type: 'regional',
    address: 'SG Highway, Ahmedabad, Gujarat 380015',
    floors: 2, employees: 2800, securityLevel: 'SC Level 2 — Standard',
    criticalSystems: ['Regional Operations', 'SME Banking'],
    description: 'West India regional office. Focuses on SME banking, retail operations in Gujarat and Rajasthan.',
    highlights: ['SME Banking Center', 'Regional Operations', 'Client Engagement'],
    mapPosition: { x: 28, y: 45 },
  },
  {
    id: 'loc-viz', name: 'Visakhapatnam Development Center', city: 'Visakhapatnam', type: 'regional',
    address: 'IT SEZ, Madhurawada, Visakhapatnam, Andhra Pradesh 530048',
    floors: 2, employees: 1600, securityLevel: 'SC Level 2 — Standard',
    criticalSystems: ['Development Center', 'Testing Labs'],
    description: 'Application development and testing center. Focuses on mobile banking app development and QA automation.',
    highlights: ['Dev Center', 'QA Labs', 'Mobile Testing', 'Innovation Hub'],
    mapPosition: { x: 52, y: 52 },
  },
];

// ============================================================
// COMPANY POLICIES
// ============================================================

export interface Policy {
  id: string;
  title: string;
  category: string;
  version: string;
  lastUpdated: string;
  owner: string;
  summary: string;
  keyPoints: string[];
  applicableTo: string;
}

export const COMPANY_POLICIES: Policy[] = [
  {
    id: 'pol-001', title: 'Information Security Policy', category: 'Security', version: '5.2',
    lastUpdated: '2024-11-01', owner: 'Anand Iyer (CISO)', applicableTo: 'All GFS Employees',
    summary: 'Master security policy governing all information assets at GFS. Covers data classification, access control, encryption, network security, and incident response requirements.',
    keyPoints: ['All GFS data must be classified (Public, Internal, Confidential, Restricted)', 'Confidential and Restricted data must be encrypted at rest and in transit', 'Access follows principle of least privilege', 'All security incidents must be reported within 1 hour', 'Annual security awareness training mandatory for all employees', 'Remote work must use GFS-approved VPN only'],
  },
  {
    id: 'pol-002', title: 'Acceptable Use Policy', category: 'Security', version: '4.1',
    lastUpdated: '2024-09-15', owner: 'Deepa Nair (CCO)', applicableTo: 'All GFS Employees',
    summary: 'Defines acceptable and unacceptable use of GFS computing resources, networks, and data.',
    keyPoints: ['GFS equipment is for business use; limited personal use permitted', 'No unauthorized software installation', 'No personal USB devices on PCI CDE systems', 'No use of personal email for GFS business', 'Social media must not reference GFS customers or data', 'All internet traffic is monitored and logged'],
  },
  {
    id: 'pol-003', title: 'Incident Reporting Policy', category: 'Security', version: '3.0',
    lastUpdated: '2024-10-01', owner: 'Prakash Kulkarni (SOC Director)', applicableTo: 'All GFS Employees',
    summary: 'Mandatory incident reporting requirements including RBI, CERT-In, and NPCI notification timelines.',
    keyPoints: ['Report security incidents within 1 hour of discovery', 'P1 incidents: immediate SOC escalation + CISO notification', 'RBI reporting: within 6 hours for critical incidents', 'CERT-In reporting: within 6 hours for significant cyber incidents', 'NPCI notification: required for UPI-related security incidents', 'Preserve all evidence — do not alter or delete logs'],
  },
  {
    id: 'pol-004', title: 'Remote Work Security Policy', category: 'Workplace', version: '2.3',
    lastUpdated: '2024-08-01', owner: 'Anand Iyer (CISO)', applicableTo: 'All GFS Employees',
    summary: 'Security requirements for remote and hybrid working arrangements.',
    keyPoints: ['GFS VPN required for all remote access', 'Multi-factor authentication mandatory for remote login', 'GFS-issued laptop only — no personal devices for work', 'Home network must use WPA3 encryption', 'No public WiFi for accessing GFS systems', 'Clean desk policy applies even at home'],
  },
  {
    id: 'pol-005', title: 'Data Classification Policy', category: 'Data Protection', version: '3.1',
    lastUpdated: '2024-07-15', owner: 'Deepa Nair (CCO)', applicableTo: 'All GFS Employees',
    summary: 'Framework for classifying and protecting GFS data based on sensitivity and regulatory requirements.',
    keyPoints: ['RESTRICTED: Card data, SWIFT credentials, encryption keys — strictest controls', 'CONFIDENTIAL: Customer PII, financial data, internal reports — need-to-know basis', 'INTERNAL: Policies, procedures, internal communications — GFS employees only', 'PUBLIC: Marketing materials, press releases — no restrictions', 'DPDP Act compliance for personal data handling'],
  },
  {
    id: 'pol-006', title: 'Code of Conduct', category: 'Culture', version: '6.0',
    lastUpdated: '2024-06-01', owner: 'Kavitha Rao (CHRO)', applicableTo: 'All GFS Employees',
    summary: 'Ethical standards, professional behavior, and compliance expectations for all GFS employees.',
    keyPoints: ['Treat all colleagues, customers, and partners with respect', 'No tolerance for discrimination or harassment', 'Report conflicts of interest immediately', 'Maintain confidentiality of customer and business information', 'Zero tolerance for fraud, bribery, or corruption', 'Annual code of conduct acknowledgement required'],
  },
];

// ============================================================
// EQUIPMENT
// ============================================================

export interface EquipmentItem {
  id: string;
  name: string;
  type: 'laptop' | 'phone' | 'token' | 'badge' | 'account' | 'software';
  icon: string;
  details: string;
  serialNumber?: string;
  status: 'active' | 'pending' | 'maintenance';
  assignedDate: string;
  description: string;
  linkedModule?: string;
}

export const MY_EQUIPMENT: EquipmentItem[] = [
  { id: 'eq-001', name: 'GFS Laptop', type: 'laptop', icon: '💻', details: 'Dell Latitude 5540', serialNumber: 'GFS-LT-2025-4721', status: 'active', assignedDate: new Date().toISOString(), description: 'Your primary work laptop. Pre-configured with GFS security policies, CrowdStrike Falcon agent, Microsoft 365, and VPN client. Full disk encryption (BitLocker) enabled.' },
  { id: 'eq-002', name: 'GFS Mobile Phone', type: 'phone', icon: '📱', details: 'iPhone 15', serialNumber: 'GFS-PH-2025-4721', status: 'active', assignedDate: new Date().toISOString(), description: 'Company mobile phone with GFS MDM profile installed. Required for Microsoft Authenticator MFA and Teams communication.' },
  { id: 'eq-003', name: 'VPN Token', type: 'token', icon: '🔑', details: 'RSA SecurID', serialNumber: 'GFS-VPN-4721', status: 'active', assignedDate: new Date().toISOString(), description: 'Hardware VPN token for secure remote access. Required for connecting to GFS network from outside the office.' },
  { id: 'eq-004', name: 'Smart Card', type: 'badge', icon: '🪪', details: 'GFS Employee ID Card', serialNumber: 'GFS-ID-4721', status: 'active', assignedDate: new Date().toISOString(), description: 'Physical access card for building entry, server room access, and PCI CDE zone access. Contains your employee photo and RFID chip.' },
  { id: 'eq-005', name: 'Microsoft 365 Account', type: 'account', icon: '📧', details: 'intern4721@gfs.com', status: 'active', assignedDate: new Date().toISOString(), description: 'Full Microsoft 365 access including Outlook email, Teams, SharePoint, OneDrive, and all enterprise applications.' },
  { id: 'eq-006', name: 'SOC Console Access', type: 'account', icon: '🖥️', details: 'Sentinel + Falcon + ServiceNow', status: 'active', assignedDate: new Date().toISOString(), description: 'Read-only access to Microsoft Sentinel, CrowdStrike Falcon, and ServiceNow SOC module. Sufficient for alert triage and investigation.' },
  { id: 'eq-007', name: 'Security Software', type: 'software', icon: '🛡️', details: 'Falcon + Defender + VPN', status: 'active', assignedDate: new Date().toISOString(), description: 'CrowdStrike Falcon EDR, Microsoft Defender for Endpoint, GlobalProtect VPN client, and BitLocker encryption pre-installed on your laptop.' },
];

// ============================================================
// DAILY SCHEDULE
// ============================================================

export interface ScheduleItem {
  time: string;
  endTime: string;
  title: string;
  type: 'meeting' | 'work' | 'training' | 'break' | 'review';
  location: string;
  description: string;
  attendees?: string[];
  recurring: boolean;
}

export const DAILY_SCHEDULE: ScheduleItem[] = [
  { time: '09:00', endTime: '09:30', title: 'Morning Briefing', type: 'meeting', location: 'SOC War Room — Floor 12, Room 1204', description: 'Night shift hands over to Day shift. Review overnight alerts, P1 incidents, and open investigations.', attendees: ['Suresh Reddy', 'Arjun Sharma', 'All SOC Analysts'], recurring: true },
  { time: '09:30', endTime: '10:30', title: 'Alert Review & Triage', type: 'work', location: 'SOC Floor — Your Workstation', description: 'Review new alerts in Sentinel. Perform initial triage. Classify by severity and assign to appropriate investigation queue.', recurring: true },
  { time: '10:30', endTime: '11:30', title: 'Threat Intelligence Briefing', type: 'meeting', location: 'TI Center — Floor 12, Room 1210', description: 'Harsha Vardhan presents latest threat intelligence. Review new IOCs, APT activity, and RBI advisories.', attendees: ['Harsha Vardhan', 'Varun Choudhary', 'SOC Team'], recurring: true },
  { time: '11:30', endTime: '13:00', title: 'Investigation Work', type: 'work', location: 'SOC Floor — Your Workstation', description: 'Work on assigned investigations. Analyze logs, build timelines, document findings in ServiceNow.', recurring: true },
  { time: '13:00', endTime: '14:00', title: 'Lunch Break', type: 'break', location: 'GFS Cafeteria — Floor 3', description: 'Lunch at the GFS cafeteria. Veg and non-veg options available. South Indian, North Indian, and Continental cuisines.', recurring: true },
  { time: '14:00', endTime: '15:00', title: 'Lab / Training Session', type: 'training', location: 'Training Center — Floor 11', description: 'Complete assigned training modules. Hands-on labs with Sentinel, Falcon, and network analysis tools.', recurring: true },
  { time: '15:00', endTime: '16:30', title: 'Case Review & Documentation', type: 'work', location: 'SOC Floor — Your Workstation', description: 'Document investigation findings. Update ticket status. Prepare case summaries for manager review.', recurring: true },
  { time: '16:30', endTime: '17:00', title: 'Manager 1:1 Review', type: 'review', location: 'Manager\'s Desk — SOC Floor', description: 'Daily check-in with Suresh Reddy. Review progress, discuss challenges, get guidance on investigations.', attendees: ['Suresh Reddy'], recurring: true },
  { time: '17:00', endTime: '17:30', title: 'Shift Preparation', type: 'work', location: 'SOC Floor', description: 'Prepare handover notes for Evening Shift. Update all open tickets with current status.', recurring: true },
];

// ============================================================
// ENTERPRISE NEWS
// ============================================================

export interface NewsItem {
  id: string;
  title: string;
  category: 'security' | 'operations' | 'hr' | 'compliance' | 'technology' | 'general';
  priority: 'critical' | 'high' | 'normal' | 'low';
  timestamp: string;
  summary: string;
  source: string;
  author: string;
  impact: string;
  relatedAlerts?: string[];
}

export const ENTERPRISE_NEWS: NewsItem[] = [
  { id: 'news-001', title: 'ALERT: Coordinated Attack Campaign Targeting GFS Payment Systems', category: 'security', priority: 'critical', timestamp: new Date(Date.now() - 120000).toISOString(), summary: 'Multiple coordinated attacks targeting UPI Gateway, NEFT/RTGS systems, and Internet Banking detected. SOC is actively responding. All employees must report any suspicious activity immediately.', source: 'SOC — Suresh Reddy', author: 'Suresh Reddy', impact: 'Critical — Payment systems under active attack', relatedAlerts: ['ALT-2025-9001', 'ALT-2025-9002', 'ALT-2025-9003'] },
  { id: 'news-002', title: 'CDIP-2025 Batch 03 Interns Join Hyderabad SOC', category: 'hr', priority: 'normal', timestamp: new Date(Date.now() - 3600000).toISOString(), summary: 'The Cyber Defense Internship Program Batch 03 has begun. New interns are joining the Hyderabad SOC team under mentorship of Suresh Reddy and Naveen Kumar Yadav Loya (ShadowXLab Academy).', source: 'HR — Priya Sharma', author: 'Priya Sharma', impact: 'Team expansion — SOC staffing +2' },
  { id: 'news-003', title: 'PCI DSS v4.0 Audit Scheduled for Next Quarter', category: 'compliance', priority: 'high', timestamp: new Date(Date.now() - 7200000).toISOString(), summary: 'The PCI DSS v4.0 audit has been scheduled. All PCI CDE-related controls must be documented and evidence gathered by end of month. Compliance team will coordinate with each department.', source: 'Compliance — Deepa Nair', author: 'Deepa Nair', impact: 'High — All PCI CDE teams must prepare evidence' },
  { id: 'news-004', title: 'RBI Issues New Cybersecurity Framework Guidelines', category: 'compliance', priority: 'high', timestamp: new Date(Date.now() - 14400000).toISOString(), summary: 'RBI has released updated cybersecurity framework for regulated entities. GFS must implement new requirements within 90 days. Key areas: incident reporting timelines, cloud security controls, and data localization.', source: 'Compliance — Deepa Nair', author: 'Deepa Nair', impact: 'High — Regulatory implementation required' },
  { id: 'news-005', title: 'Azure India South — Scheduled Maintenance Tonight 02:00-04:00 IST', category: 'technology', priority: 'normal', timestamp: new Date(Date.now() - 21600000).toISOString(), summary: 'Planned maintenance on Azure India South region. Sentinel log ingestion may experience brief delays. CrowdStrike Falcon continues normal operations.', source: 'Cloud Operations — Aditya Kulkarni', author: 'Aditya Kulkarni', impact: 'Low — Sentinel may have brief log delay' },
  { id: 'news-006', title: 'CVE-2024-38077 Critical — Emergency Patching Required', category: 'security', priority: 'critical', timestamp: new Date(Date.now() - 28800000).toISOString(), summary: 'Critical RDP RCE vulnerability (CVSS 9.8) affects 8 production servers in PCI CDE. Emergency change approved. Patching scheduled for tonight. All PCI CDE servers will be briefly restarted.', source: 'Vulnerability Management — Nikhil Joshi', author: 'Nikhil Joshi', impact: 'Critical — 8 PCI CDE servers being patched tonight', relatedAlerts: ['ALT-2025-9010'] },
  { id: 'news-007', title: 'GFS Wins Best Cybersecurity Team — Indian Banking Awards 2025', category: 'general', priority: 'low', timestamp: new Date(Date.now() - 43200000).toISOString(), summary: 'GFS Cybersecurity Division has been recognized as the Best Cybersecurity Team at the Indian Banking Technology Awards 2025. Congratulations to the entire team!', source: 'HR — Kavitha Rao', author: 'Kavitha Rao', impact: 'Positive — Team recognition' },
  { id: 'news-008', title: 'Security Awareness Month — November 2025', category: 'hr', priority: 'normal', timestamp: new Date(Date.now() - 86400000).toISOString(), summary: 'November is Security Awareness Month at GFS. Mandatory security awareness training must be completed by all employees. Phishing simulation exercise scheduled for next week.', source: 'Security Awareness — Priya Sharma', author: 'Priya Sharma', impact: 'Medium — All employees must complete training' },
];

// ============================================================
// BUSINESS PROCESS FLOWS
// ============================================================

export interface ProcessStep {
  id: string;
  name: string;
  system: string;
  department: string;
  description: string;
  securityNotes: string[];
  threats: string[];
}

export interface BusinessProcess {
  id: string;
  name: string;
  description: string;
  trigger: string;
  steps: ProcessStep[];
  regulations: string[];
}

export const BUSINESS_PROCESSES: BusinessProcess[] = [
  {
    id: 'proc-upi', name: 'UPI Transaction Flow', description: 'End-to-end flow of a UPI payment from VPA resolution to settlement',
    trigger: 'Customer initiates UPI payment via mobile app or QR scan',
    regulations: ['NPCI UPI Guidelines', 'RBI Payment System Guidelines', 'DPDP Act'],
    steps: [
      { id: 'ps-001', name: 'Customer Initiates Payment', system: 'GFS Mobile App', department: 'Digital Banking', description: 'Customer enters VPA or scans QR code, enters amount, and authenticates with UPI PIN.', securityNotes: ['PIN entered on NPCI library — GFS never sees PIN', 'Device fingerprint validated', 'Session token checked'], threats: ['Phishing to obtain VPA', 'Malware overlay to capture PIN', 'Device compromise'] },
      { id: 'ps-002', name: 'API Gateway', system: 'GFS API Gateway (Kong)', department: 'Cloud Operations', description: 'Request validated by API gateway. Rate limiting, authentication, and request signing applied.', securityNotes: ['OAuth 2.0 token validated', 'Rate limiting: 100 req/min per device', 'TLS 1.3 enforced'], threats: ['API key theft', 'Rate limit bypass', 'Replay attacks'] },
      { id: 'ps-003', name: 'VPA Resolution', system: 'GFS UPI Gateway', department: 'Cards & Payments', description: 'VPA (e.g., user@gfs) resolved to bank account and IFSC via NPCI directory.', securityNotes: ['VPA validated against NPCI registry', 'Beneficiary bank confirmed', 'Transaction amount validated'], threats: ['VPA spoofing', 'Man-in-the-middle', 'NPCI directory compromise'] },
      { id: 'ps-004', name: 'Authentication', system: 'NPCI UPI Switch', department: 'Cards & Payments', description: 'Customer authenticates with 6-digit UPI PIN. NPCI validates PIN via issuing bank.', securityNotes: ['PIN validated by NPCI — not visible to GFS', 'Two-factor: device + PIN', 'Transaction signed'], threats: ['PIN capture via overlay', 'SIM swap for OTP', 'Session hijacking'] },
      { id: 'ps-005', name: 'Fraud Detection', system: 'GFS Fraud ML Engine', department: 'Fraud Prevention', description: 'Real-time ML model evaluates 40+ risk factors. Transaction scored in <50ms.', securityNotes: ['Device fingerprint check', 'Velocity analysis', 'Behavioral biometrics', 'Blacklist check'], threats: ['ML model evasion', 'Account takeover', 'Mule account networks'] },
      { id: 'ps-006', name: 'Debit from Account', system: 'Core Banking (FIS Profile)', department: 'Retail Banking', description: 'Amount debited from customer GFS account. Balance updated in real-time.', securityNotes: ['Transaction logged immutably', 'Double-entry bookkeeping', 'Reconciliation trigger'], threats: ['Transaction manipulation', 'Insider fraud', 'Database manipulation'] },
      { id: 'ps-007', name: 'Credit to Beneficiary', system: 'NPCI Settlement', department: 'Cards & Payments', description: 'NPCI processes inter-bank settlement. Beneficiary bank credits the receiving account.', securityNotes: ['NPCI settlement in T+0', 'Inter-bank reconciliation', 'Audit trail maintained'], threats: ['Settlement delay exploitation', 'Inter-bank fraud', 'NPCI system compromise'] },
      { id: 'ps-008', name: 'Confirmation & Notification', system: 'Notification Service', department: 'Digital Banking', description: 'Transaction confirmation sent to customer via SMS, push notification, and email.', securityNotes: ['Notification contains masked details', 'No sensitive data in SMS', 'Email encrypted'], threats: ['SMS spoofing', 'Phishing with fake confirmation'] },
      { id: 'ps-009', name: 'Audit Log', system: 'Splunk + Sentinel', department: 'SOC', description: 'Complete transaction logged to both Splunk (compliance) and Sentinel (security monitoring).', securityNotes: ['Immutable audit trail', '7-year retention', 'Real-time monitoring'], threats: ['Log manipulation', 'Log deletion'] },
      { id: 'ps-010', name: 'SOC Monitoring', system: 'Microsoft Sentinel', department: 'SOC', description: 'SOC analysts monitor for anomalies. Alerts generated for suspicious patterns.', securityNotes: ['420+ analytics rules', 'Real-time correlation', 'Automated response'], threats: ['Detection evasion', 'Alert fatigue exploitation'] },
    ],
  },
  {
    id: 'proc-incident', name: 'Security Incident Response', description: 'How GFS responds to a security incident from detection to resolution',
    trigger: 'Alert triggered in Sentinel, Falcon, or reported by employee',
    regulations: ['RBI Cyber Incident Reporting Framework', 'CERT-In Guidelines', 'IT Act 2000 Section 43A'],
    steps: [
      { id: 'ps-i01', name: 'Detection & Alert', system: 'Microsoft Sentinel / CrowdStrike', department: 'SOC', description: 'Automated detection rule or analyst identifies suspicious activity. Alert created in Sentinel.', securityNotes: ['Rules tuned for false positive reduction', 'MITRE ATT&CK mapped', 'Priority assigned'], threats: ['Detection evasion', 'Low-and-slow attacks', 'Alert fatigue'] },
      { id: 'ps-i02', name: 'Triage (Tier 1)', system: 'SOC Console', department: 'SOC', description: 'Tier 1 analyst performs initial triage: validate alert, check IP reputation, review MITRE mapping.', securityNotes: ['Follow triage checklist', 'Document all actions', 'Escalation criteria defined'], threats: ['Insufficient context', 'Time pressure errors'] },
      { id: 'ps-i03', name: 'Investigation (Tier 2/3)', system: 'Sentinel + Falcon + Splunk', department: 'SOC', description: 'Senior analyst investigates deeper — log correlation, timeline building, scope assessment.', securityNotes: ['Full log review', 'IOC extraction', 'Scope determination'], threats: ['Incomplete investigation', 'Evidence destruction'] },
      { id: 'ps-i04', name: 'Escalation & Classification', system: 'ServiceNow SIR', department: 'SOC / IR', description: 'Incident classified by severity. P1/P2 escalated to IR Lead and CISO. Stakeholder notification triggered.', securityNotes: ['Severity matrix applied', 'Communication tree followed', 'Evidence preservation started'], threats: ['Delayed escalation', 'Communication gaps'] },
      { id: 'ps-i05', name: 'Containment', system: 'CrowdStrike Falcon / Firewall', department: 'IR / SOC', description: 'Affected systems isolated. Malicious IPs blocked. Lateral movement contained.', securityNotes: ['Network isolation first', 'Memory preservation', 'Forensic snapshot'], threats: ['Incomplete containment', 'Lateral movement during containment'] },
      { id: 'ps-i06', name: 'RBI / CERT-In Reporting', system: 'GRC Portal', department: 'Compliance', description: 'Regulatory notifications filed within mandated timelines. RBI report within 6 hours for critical incidents.', securityNotes: ['RBI format followed', 'CERT-In report filed', 'Evidence attached'], threats: ['Late reporting penalties', 'Incomplete reports'] },
      { id: 'ps-i07', name: 'Eradication', system: 'Multiple (Falcon, AD, Firewall)', department: 'IR / Engineering', description: 'Remove malware, close attack vectors, patch vulnerabilities, rotate credentials.', securityNotes: ['Full malware removal', 'All persistence mechanisms found', 'Credentials rotated'], threats: ['Incomplete eradication', 'Hidden persistence'] },
      { id: 'ps-i08', name: 'Recovery', system: 'Backup Systems / DR', department: 'IR / IT Operations', description: 'Restore systems from clean backups. Verify integrity. Gradually restore connectivity.', securityNotes: ['Backup integrity verified', 'Clean state confirmed', 'Monitoring enhanced'], threats: ['Restoring from compromised backup', 'Re-infection'] },
      { id: 'ps-i09', name: 'Post-Incident Review', system: 'ServiceNow / Documentation', department: 'SOC / IR', description: 'Conduct post-mortem. Document lessons learned. Update playbooks and detections.', securityNotes: ['Blameless post-mortem', 'Action items tracked', 'Playbooks updated'], threats: ['Incomplete lessons learned', 'No follow-through on actions'] },
    ],
  },
];

// ============================================================
// CAREER CENTER (expanded)
// ============================================================

export interface CareerRole {
  id: string;
  title: string;
  level: number;
  duration: string;
  department: string;
  responsibilities: string[];
  skills: string[];
  certifications: string[];
  tools: string[];
  projects: string[];
  promotionRequirements: string[];
  salaryRange: string;
  icon: string;
  color: string;
}

export const CAREER_PATH: CareerRole[] = [
  {
    id: 'career-intern', title: 'Security Intern', level: 1, duration: 'Month 1-4', department: 'SOC — Hyderabad',
    responsibilities: ['Complete onboarding and training modules', 'Perform L1 alert triage under supervision', 'Assist with investigations', 'Document findings in ServiceNow', 'Attend shift handovers', 'Complete lab exercises'],
    skills: ['Networking basics', 'Windows/Linux fundamentals', 'SIEM basics (Sentinel)', 'Alert triage', 'KQL basics', 'Documentation'],
    certifications: ['CompTIA Security+ (preparatory)', 'SC-900 (preparatory)'],
    tools: ['Microsoft Sentinel', 'CrowdStrike Falcon', 'ServiceNow', 'Wireshark', 'KQL'],
    projects: ['First UPI fraud investigation', 'SOC shift shadowing', 'Vulnerability scan review', 'Phishing email analysis'],
    promotionRequirements: ['Complete all Foundation modules', 'Investigate 10 alerts independently', 'Pass technical assessment by Suresh Reddy', 'Pass mentor review by Naveen K. Yadav Loya'],
    salaryRange: '₹3-4 LPA (stipend)', icon: '👁️', color: 'var(--color-gfs-text-muted)',
  },
  {
    id: 'career-analyst-l1', title: 'SOC Analyst — Tier 1', level: 2, duration: 'Month 5-8', department: 'SOC — Hyderabad',
    responsibilities: ['Monitor alerts in real-time', 'Perform alert triage and classification', 'Escalate high-severity alerts', 'Maintain shift handover logs', 'Contribute to playbook updates', 'First response for P3/P4 alerts'],
    skills: ['Advanced KQL', 'Falcon investigation', 'Log analysis', 'Network analysis', 'MITRE ATT&CK mapping', 'Incident documentation'],
    certifications: ['CompTIA Security+', 'SC-200 (preparatory)'],
    tools: ['Sentinel', 'Falcon', 'Splunk', 'Wireshark', 'Nmap', 'ServiceNow'],
    projects: ['Independent P3 investigation', 'KQL detection rule creation', 'Shift lead rotation', 'Phishing campaign analysis'],
    promotionRequirements: ['Triage 500+ alerts with <5% false escalation', 'Resolve P3 incidents independently', 'Create 5+ detection rules', 'Pass GCIH or equivalent'],
    salaryRange: '₹6-9 LPA', icon: '🔍', color: 'var(--color-gfs-accent)',
  },
  {
    id: 'career-analyst-l2', title: 'SOC Analyst — Tier 2', level: 3, duration: 'Month 9-14', department: 'SOC — Hyderabad',
    responsibilities: ['Deep investigation of escalated alerts', 'Build attack timelines', 'Extract and share IOCs', 'Mentor Tier 1 analysts', 'Contribute to threat hunts', 'P2 incident handling'],
    skills: ['Advanced forensics', 'Malware triage', 'Advanced KQL/Splunk', 'Threat hunting', 'Forensic tools', 'Timeline analysis'],
    certifications: ['GCIH', 'GCIA', 'CEH'],
    tools: ['Volatility', 'Autopsy', 'Falcon IR', 'YARA', 'Sigma', 'Sysmon'],
    projects: ['Lead P2 investigation', 'Threat hunt participation', 'Malware analysis', 'Forensic acquisition'],
    promotionRequirements: ['Handle P2 incidents independently', 'Complete forensic certification', 'Lead 3+ threat hunts', 'Mentor 2 junior analysts'],
    salaryRange: '₹10-16 LPA', icon: '🔬', color: 'var(--color-gfs-blue)',
  },
  {
    id: 'career-threat-hunter', title: 'Threat Hunter', level: 4, duration: 'Month 15-24', department: 'Threat Intelligence — Hyderabad',
    responsibilities: ['Proactive threat hunting across enterprise', 'Hypothesis-driven investigations', 'Advanced detection engineering', 'APT tracking and analysis', 'Intelligence-driven defense', 'Purple team coordination'],
    skills: ['Advanced threat hunting', 'APT analysis', 'MITRE ATT&CK mastery', 'Data analytics', 'OSINT', 'Advanced forensics'],
    certifications: ['GCTI', 'GCFA', 'OSCP', 'GCFE'],
    tools: ['MISP', 'Recorded Future', 'Sentinel Hunting', 'Splunk ES', 'YARA', 'Sigma', 'OSINT tools'],
    projects: ['Lead APT hunt', 'Build hunting framework', 'APT actor profiling', 'Intelligence report for board'],
    promotionRequirements: ['Discover previously unknown threat', 'Build hunting framework from scratch', 'Present to CISO', 'Publish internal TI report'],
    salaryRange: '₹18-28 LPA', icon: '🧠', color: 'var(--color-gfs-amber)',
  },
  {
    id: 'career-ir', title: 'Incident Responder', level: 4, duration: 'Month 15-24', department: 'Incident Response — Hyderabad',
    responsibilities: ['Lead incident response for P1 incidents', 'Coordinate cross-functional response', 'Digital forensics acquisition and analysis', 'CERT-In and RBI reporting', 'Tabletop exercise facilitation', 'Post-incident reviews'],
    skills: ['Incident command', 'Digital forensics', 'Memory analysis', 'Network forensics', 'Malware analysis', 'Legal/regulatory awareness'],
    certifications: ['GCFE', 'GCFA', 'CHFI', 'EnCE', 'GCIH'],
    tools: ['Volatility', 'Autopsy', 'FTK Imager', 'Wireshark', 'Falcon IR', 'KAPE'],
    projects: ['Lead P1 response', 'Forensic investigation', 'CERT-In report', 'Tabletop exercise design'],
    promotionRequirements: ['Lead 5+ P1 responses', 'Complete forensic investigation', 'File CERT-In report', 'Design tabletop exercise'],
    salaryRange: '₹18-28 LPA', icon: '🚨', color: 'var(--color-gfs-red)',
  },
  {
    id: 'career-engineer', title: 'Security Engineer', level: 5, duration: 'Year 2-3', department: 'Security Engineering — Pune',
    responsibilities: ['Design and implement security controls', 'Cloud security architecture', 'Automation and scripting', 'Tool deployment and tuning', 'Hardening standards', 'Security architecture reviews'],
    skills: ['Cloud security (Azure/AWS)', 'Scripting (Python, PowerShell)', 'IaC (Terraform, Ansible)', 'Container security', 'Network security', 'Architecture design'],
    certifications: ['AWS Security Specialty', 'AZ-500', 'CKS', 'CISSP'],
    tools: ['Azure', 'AWS', 'Terraform', 'Ansible', 'Docker', 'Kubernetes', 'Vault', 'GitLab'],
    projects: ['Cloud security architecture', 'Automation framework', 'Tool deployment', 'Hardening standard'],
    promotionRequirements: ['Design security architecture', 'Implement automation framework', 'Deploy enterprise tool', 'Present to architecture board'],
    salaryRange: '₹22-35 LPA', icon: '⚙️', color: 'var(--color-gfs-purple)',
  },
  {
    id: 'career-architect', title: 'Security Architect', level: 6, duration: 'Year 3-5', department: 'Cybersecurity Division — Bengaluru',
    responsibilities: ['Design enterprise security architecture', 'Technology strategy', 'Vendor evaluation', 'Board reporting', 'Regulatory compliance design', 'Zero trust implementation'],
    skills: ['Enterprise architecture', 'Zero trust', 'Risk-based design', 'Vendor management', 'Board communication', 'Regulatory expertise'],
    certifications: ['CISSP', 'CCSP', 'TOGAF', 'ISO 27001 LA'],
    tools: ['Architecture platforms', 'GRC tools', 'Risk frameworks', 'Presentation tools'],
    projects: ['Zero trust architecture', 'Security strategy document', 'Vendor selection', 'Board presentation'],
    promotionRequirements: ['Design zero trust architecture', 'Present to Board', 'Lead regulatory audit', 'Mentor 5+ engineers'],
    salaryRange: '₹35-55 LPA', icon: '🏗️', color: 'var(--color-gfs-accent)',
  },
];
