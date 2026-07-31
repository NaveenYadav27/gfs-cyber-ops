import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/Card';
import { Users, Lock, ShieldAlert, Key, Server, UserCheck, Shield, Activity } from 'lucide-react';
import ReactECharts from 'echarts-for-react';

const AD_KPIS = [
  { label: 'Total Identities', value: '47,842', icon: Users, color: '#3b82f6', trend: '+124 this week' },
  { label: 'Domain Controllers', value: '14', icon: Server, color: '#10b981', trend: 'All synced' },
  { label: 'Auth Requests/sec', value: '2.4k', icon: Activity, color: '#8b5cf6', trend: 'Peak hours' },
  { label: 'Locked Accounts', value: '43', icon: Lock, color: '#f59e0b', trend: 'Needs review' },
  { label: 'Failed Logins (1h)', value: '891', icon: ShieldAlert, color: '#ef4444', trend: 'Elevated' },
  { label: 'Privileged Users', value: '184', icon: Key, color: '#0ea5e9', trend: 'Audited' }
];

const ActiveDirectoryTree: React.FC = () => {
  const [authTraffic, setAuthTraffic] = useState<number[]>(Array(20).fill(2000));

  useEffect(() => {
    const interval = setInterval(() => {
      setAuthTraffic(prev => {
        const next = [...prev.slice(1), 2000 + Math.random() * 800 - 400];
        return next;
      });
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const authOption = {
    backgroundColor: 'transparent',
    tooltip: { trigger: 'axis' },
    grid: { top: 10, right: 10, bottom: 20, left: 40 },
    xAxis: { type: 'category', boundaryGap: false, data: Array(20).fill('') },
    yAxis: { type: 'value', splitLine: { lineStyle: { color: '#30363d' } } },
    series: [
      {
        name: 'Auth Requests/sec',
        type: 'line',
        smooth: true,
        data: authTraffic,
        itemStyle: { color: '#8b5cf6' },
        areaStyle: {
          color: {
            type: 'linear', x: 0, y: 0, x2: 0, y2: 1,
            colorStops: [{ offset: 0, color: 'rgba(139, 92, 246, 0.5)' }, { offset: 1, color: 'rgba(139, 92, 246, 0)' }]
          }
        }
      }
    ]
  };

  const domainControllers = [
    { name: 'DC-NY-01 (Primary)', status: 'Healthy', replication: 'Synced', roles: 'FSMO, GC' },
    { name: 'DC-NY-02 (Backup)', status: 'Healthy', replication: 'Synced', roles: 'GC' },
    { name: 'DC-LDN-01', status: 'Healthy', replication: 'Synced', roles: 'GC' },
    { name: 'DC-AWS-EAST', status: 'Warning', replication: 'Lag (45s)', roles: 'RODC' },
    { name: 'DC-AZ-WEST', status: 'Healthy', replication: 'Synced', roles: 'GC' }
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {AD_KPIS.map((kpi, i) => (
          <Card key={kpi.label} delay={i * 0.05} className="!p-4 bg-gray-900 border-gray-800">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: \`\${kpi.color}15\` }}>
                <kpi.icon className="w-4 h-4" style={{ color: kpi.color }} />
              </div>
              <span className="text-xs font-medium text-gray-400">{kpi.label}</span>
            </div>
            <div className="text-2xl font-bold text-white mb-1">{kpi.value}</div>
            <div className="text-[10px] text-gray-500">{kpi.trend}</div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 space-y-6">
          <Card className="!p-5 bg-gray-900 border-gray-800">
            <h3 className="text-sm font-semibold text-gray-200 mb-4 flex items-center gap-2">
              <Activity className="w-4 h-4 text-purple-500" />
              Global Authentication Traffic
            </h3>
            <div className="h-64">
              <ReactECharts option={authOption} style={{ height: '100%', width: '100%' }} />
            </div>
          </Card>
          
          <Card className="!p-0 bg-gray-900 border-gray-800 overflow-hidden">
             <div className="p-4 border-b border-gray-800">
                <h3 className="text-sm font-semibold text-gray-200 flex items-center gap-2">
                  <Server className="w-4 h-4 text-purple-500" />
                  Domain Controller Health & Replication
                </h3>
             </div>
             <table className="w-full text-left text-sm text-gray-300">
                <thead className="bg-gray-950/50 text-gray-500 text-xs uppercase">
                  <tr>
                    <th className="px-4 py-3 font-medium">Controller Name</th>
                    <th className="px-4 py-3 font-medium">Status</th>
                    <th className="px-4 py-3 font-medium">Replication</th>
                    <th className="px-4 py-3 font-medium">Roles</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800">
                  {domainControllers.map((dc, i) => (
                    <tr key={i} className="hover:bg-gray-800/30 transition-colors">
                      <td className="px-4 py-3 font-medium text-gray-200">{dc.name}</td>
                      <td className="px-4 py-3">
                        <span className={\`px-2 py-1 rounded text-[10px] font-bold \${dc.status === 'Healthy' ? 'bg-green-900/30 text-green-400' : 'bg-yellow-900/30 text-yellow-400'}\`}>
                          {dc.status}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                         <span className={\`text-xs \${dc.replication.includes('Lag') ? 'text-yellow-400' : 'text-gray-400'}\`}>{dc.replication}</span>
                      </td>
                      <td className="px-4 py-3 text-gray-500 font-mono text-xs">{dc.roles}</td>
                    </tr>
                  ))}
                </tbody>
             </table>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="!p-5 bg-gray-900 border-gray-800">
            <h3 className="text-sm font-semibold text-gray-200 mb-4 flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-red-500" />
              Identity Security Alerts
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-400">Impossible Travel (24h)</span>
                <span className="text-xs font-mono text-red-400">12</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-400">Brute Force Attempts</span>
                <span className="text-xs font-mono text-yellow-400">4,291</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-400">Stale Accounts (90d)</span>
                <span className="text-xs font-mono text-gray-300">419</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-400">Password Spraying</span>
                <span className="text-xs font-mono text-red-400 border border-red-900/50 bg-red-950/30 px-2 py-0.5 rounded">DETECTED</span>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-800">
              <div className="w-full h-12 bg-red-950/20 rounded-lg flex items-center justify-center border border-red-900/30">
                <span className="text-[10px] text-red-400 font-semibold tracking-wider">MFA ENFORCEMENT ACTIVE</span>
              </div>
            </div>
          </Card>

          <Card className="!p-5 bg-gray-900 border-gray-800">
             <h3 className="text-sm font-semibold text-gray-200 mb-4 flex items-center gap-2">
              <UserCheck className="w-4 h-4 text-green-500" />
              Privileged Access Health
            </h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-gray-400">Domain Admins with MFA</span>
                  <span className="text-green-400 font-mono">100%</span>
                </div>
                <div className="h-1.5 w-full bg-gray-800 rounded-full"><div className="h-full bg-green-500 rounded-full w-[100%]"></div></div>
              </div>
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-gray-400">Service Accounts Rotated</span>
                  <span className="text-yellow-400 font-mono">82%</span>
                </div>
                <div className="h-1.5 w-full bg-gray-800 rounded-full"><div className="h-full bg-yellow-500 rounded-full w-[82%]"></div></div>
              </div>
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-gray-400">JIT Access Requests Approved</span>
                  <span className="text-gray-300 font-mono">142/145</span>
                </div>
                <div className="h-1.5 w-full bg-gray-800 rounded-full"><div className="h-full bg-blue-500 rounded-full w-[98%]"></div></div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ActiveDirectoryTree;
