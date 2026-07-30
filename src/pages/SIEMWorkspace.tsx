import { useState } from 'react';
import { Database, Play, Save, Copy, Check, BookOpen, Clock, Search, Shield } from 'lucide-react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { PageHeader } from '@/components/layout/PageHeader';

const SAMPLE_QUERIES = [
  { name: 'Ransomware File Activity', category: 'Endpoint', query: 'DeviceFileEvents\n| where Timestamp > ago(1h)\n| where InitiatingProcessFileName in ("encryptor.exe", "lockbit.exe", "blackcat.exe")\n| summarize FileCount=count() by DeviceName, InitiatingProcessFileName\n| where FileCount > 100\n| order by FileCount desc', result: 'DeviceName        InitiatingProcessFileName    FileCount\nWRK-LOAN-047     encryptor.exe                4,200', explanation: 'Detects ransomware by monitoring for known ransomware process names with high file modification counts.', mitre: 'T1486' },
  { name: 'Failed Login Burst', category: 'Identity', query: 'SigninLogs\n| where ResultType != 0\n| where TimeGenerated > ago(1h)\n| summarize FailedAttempts=count() by IPAddress, UserPrincipalName\n| where FailedAttempts > 20\n| order by FailedAttempts desc', result: 'IPAddress          UserPrincipalName        FailedAttempts\n103.152.220.41     svc-neft-ops@gfs.com     1,247\n91.108.56.12       administrator@gfs.com    34', explanation: 'Identifies brute force attacks by finding IP addresses with high failed login counts.', mitre: 'T1110' },
  { name: 'Encoded PowerShell', category: 'Endpoint', query: 'SecurityEvent\n| where EventID == 4688\n| where ProcessName contains "powershell"\n| where CommandLine contains "-enc" or CommandLine contains "-EncodedCommand"\n| project TimeGenerated, Computer, Account, CommandLine\n| order by TimeGenerated desc', result: 'TimeGenerated       Computer          Account      CommandLine\n2025-01-15 14:22    WRK-LOAN-047     SYSTEM       powershell -enc JABjAH...\n2025-01-15 10:22    WRK-CARDS-012    s.reddy      powershell -enc SQBmACg...', explanation: 'Encoded PowerShell is a common attacker technique to evade basic detection. This query finds all instances of encoded command execution.', mitre: 'T1059.001' },
  { name: 'DNS Tunneling Detection', category: 'Network', query: 'CommonSecurityLog\n| where DeviceAction == "dns-query"\n| extend QueryLength = length(RequestHostName)\n| where QueryLength > 50\n| summarize QueryCount=count() by SourceIP, RequestHostName\n| where QueryCount > 100\n| order by QueryCount desc', result: 'SourceIP        RequestHostName                              QueryCount\n10.10.20.23     ddns-resolver.net.aGVsbG8gd29ybGQ=           14,200', explanation: 'DNS tunneling generates unusually long subdomain names (encoded data). This query finds DNS queries with long hostnames.', mitre: 'T1071.004' },
  { name: 'Impossible Travel', category: 'Identity', query: 'SigninLogs\n| where ResultType == 0\n| summarize arg_max(TimeGenerated, *) by UserPrincipalName\n| where Location != "India"\n| project UserPrincipalName, Location, IPAddress, TimeGenerated', result: 'UserPrincipalName       Location    IPAddress      TimeGenerated\nsvc-neft-ops@gfs.com    Singapore   45.33.32.8     2025-01-15 08:45', explanation: 'Finds successful logins from non-Indian locations for service accounts that should only authenticate domestically.', mitre: 'T1078' },
];

export function SIEMWorkspace() {
  const [activeQuery, setActiveQuery] = useState(0);
  const [queryText, setQueryText] = useState(SAMPLE_QUERIES[0].query);
  const [copied, setCopied] = useState(false);
  const [search, setSearch] = useState('');

  const filtered = search ? SAMPLE_QUERIES.filter((q) => q.name.toLowerCase().includes(search.toLowerCase()) || q.category.toLowerCase().includes(search.toLowerCase())) : SAMPLE_QUERIES;

  return (
    <div className="space-y-4">
      <PageHeader icon={<Database className="w-5 h-5 text-[var(--color-gfs-accent)]" />} title="SIEM Analytics" subtitle="Microsoft Sentinel — KQL Query Editor" badge={<Badge variant="success">CONNECTED</Badge>} />

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        {/* Query List */}
        <div className="space-y-2">
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-[var(--color-gfs-text-muted)] absolute left-3 top-1/2 -translate-y-1/2" />
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search queries..."
              className="w-full pl-9 pr-4 py-2 rounded-lg bg-[var(--color-gfs-surface)] border border-[var(--color-gfs-border-light)] text-xs text-[var(--color-gfs-text)] placeholder:text-[var(--color-gfs-text-muted)] focus:outline-none focus:border-[var(--color-gfs-accent)]" />
          </div>
          {filtered.map((q, i) => (
            <Card key={i} delay={0} hover onClick={() => { setActiveQuery(i); setQueryText(q.query); }}
              className={`!p-3 cursor-pointer ${activeQuery === i ? '!border-[var(--color-gfs-accent)]/30' : ''}`}>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-semibold text-[var(--color-gfs-text)]">{q.name}</span>
                <Badge variant="default">{q.category}</Badge>
              </div>
              <div className="flex items-center gap-2 mt-1">
                <Shield className="w-2.5 h-2.5 text-[var(--color-gfs-blue)]" />
                <span className="text-[9px] text-[var(--color-gfs-blue)]">{q.mitre}</span>
              </div>
            </Card>
          ))}
        </div>

        {/* Editor + Results */}
        <div className="xl:col-span-2 space-y-4">
          <Card delay={0} className="!p-0 overflow-hidden">
            <div className="px-4 py-2 border-b border-[var(--color-gfs-border-light)] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Database className="w-3.5 h-3.5 text-[var(--color-gfs-accent)]" />
                <span className="text-xs font-semibold text-[var(--color-gfs-text)]">KQL Editor</span>
                <Badge variant="default">Last 24h</Badge>
              </div>
              <div className="flex items-center gap-1.5">
                <button onClick={() => { navigator.clipboard.writeText(queryText); setCopied(true); setTimeout(() => setCopied(false), 2000); }}
                  className="flex items-center gap-1 px-2 py-1 rounded hover:bg-[var(--color-gfs-hover)] text-[10px] text-[var(--color-gfs-text-muted)]">
                  {copied ? <Check className="w-3 h-3 text-[var(--color-gfs-green)]" /> : <Copy className="w-3 h-3" />} Copy
                </button>
                <button className="flex items-center gap-1 px-2.5 py-1 rounded bg-[var(--color-gfs-green-dim)] text-[var(--color-gfs-green)] text-[10px] font-medium">
                  <Play className="w-2.5 h-2.5" /> Run
                </button>
              </div>
            </div>
            <textarea value={queryText} onChange={(e) => setQueryText(e.target.value)}
              className="w-full h-48 px-4 py-3 bg-[#0d1117] text-[11px] font-mono text-[var(--color-gfs-text-secondary)] resize-none focus:outline-none" spellCheck={false} />
          </Card>

          {/* Results */}
          {SAMPLE_QUERIES[activeQuery] && (
            <Card delay={0.05} className="!p-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[10px] text-[var(--color-gfs-text-muted)]">Results</span>
                <Badge variant="success">Completed</Badge>
                <span className="text-[10px] text-[var(--color-gfs-text-muted)] font-mono">0.8s</span>
              </div>
              <pre className="p-3 rounded bg-[var(--color-gfs-elevated)] text-[10px] font-mono text-[var(--color-gfs-text-secondary)] whitespace-pre-wrap">{SAMPLE_QUERIES[activeQuery].result}</pre>
              <div className="mt-3 p-3 rounded bg-[var(--color-gfs-accent-dim)]">
                <span className="text-[9px] text-[var(--color-gfs-accent)] uppercase font-semibold">Explanation</span>
                <p className="text-[10px] text-[var(--color-gfs-text-secondary)] mt-1">{SAMPLE_QUERIES[activeQuery].explanation}</p>
              </div>
              <div className="flex items-center gap-1 mt-2">
                <Badge variant="default">{SAMPLE_QUERIES[activeQuery].mitre}</Badge>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
