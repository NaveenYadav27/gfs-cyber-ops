import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/Card';
import { Globe, Server, Activity, Shield, Users, Zap, Database, Cloud } from 'lucide-react';
import ReactECharts from 'echarts-for-react';

const NETWORK_KPIS = [
  { label: 'Global Bandwidth', value: '4.2 Tbps', icon: Globe, color: '#3b82f6', trend: '+12% peak' },
  { label: 'Active Sessions', value: '1.4M', icon: Users, color: '#10b981', trend: 'Stable' },
  { label: 'Core Latency', value: '12ms', icon: Activity, color: '#8b5cf6', trend: '-2ms avg' },
  { label: 'Cloud Uplink', value: '99.99%', icon: Cloud, color: '#0ea5e9', trend: 'Optimal' },
  { label: 'Firewall Drops', value: '12k/s', icon: Shield, color: '#ef4444', trend: 'Elevated' },
  { label: 'BGP Routes', value: '924k', icon: Zap, color: '#f59e0b', trend: 'Synced' }
];

const NetworkTopology: React.FC = () => {
  const [liveTraffic, setLiveTraffic] = useState<number[]>(Array(20).fill(100));

  useEffect(() => {
    const interval = setInterval(() => {
      setLiveTraffic(prev => {
        const next = [...prev.slice(1), 100 + Math.random() * 50];
        return next;
      });
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const trafficOption = {
    backgroundColor: 'transparent',
    tooltip: { trigger: 'axis' },
    grid: { top: 10, right: 10, bottom: 20, left: 40 },
    xAxis: { type: 'category', boundaryGap: false, data: Array(20).fill('') },
    yAxis: { type: 'value', splitLine: { lineStyle: { color: '#30363d' } } },
    series: [
      {
        name: 'Traffic (Gbps)',
        type: 'line',
        smooth: true,
        data: liveTraffic,
        itemStyle: { color: '#3b82f6' },
        areaStyle: {
          color: {
            type: 'linear', x: 0, y: 0, x2: 0, y2: 1,
            colorStops: [{ offset: 0, color: 'rgba(59, 130, 246, 0.5)' }, { offset: 1, color: 'rgba(59, 130, 246, 0)' }]
          }
        }
      }
    ]
  };

  const statusList = [
    { name: 'Primary Data Center (NY)', status: 'Operational', ping: '4ms', load: '62%' },
    { name: 'Secondary Data Center (LDN)', status: 'Operational', ping: '84ms', load: '45%' },
    { name: 'AWS us-east-1 Transit Gateway', status: 'Operational', ping: '12ms', load: '78%' },
    { name: 'Azure eu-west Core', status: 'Degraded', ping: '112ms', load: '94%' },
    { name: 'Campus Core Switch (HQ)', status: 'Operational', ping: '1ms', load: '32%' }
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {NETWORK_KPIS.map((kpi, i) => (
          <Card key={kpi.label} delay={i * 0.05} className="!p-4 bg-gray-900 border-gray-800">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: kpi.color + '15' }}>
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
              <Activity className="w-4 h-4 text-blue-500" />
              Global Backbone Traffic (Live)
            </h3>
            <div className="h-64">
              <ReactECharts option={trafficOption} style={{ height: '100%', width: '100%' }} />
            </div>
          </Card>
          
          <Card className="!p-0 bg-gray-900 border-gray-800 overflow-hidden">
             <div className="p-4 border-b border-gray-800">
                <h3 className="text-sm font-semibold text-gray-200 flex items-center gap-2">
                  <Server className="w-4 h-4 text-blue-500" />
                  Core Infrastructure Status
                </h3>
             </div>
             <table className="w-full text-left text-sm text-gray-300">
                <thead className="bg-gray-950/50 text-gray-500 text-xs uppercase">
                  <tr>
                    <th className="px-4 py-3 font-medium">Node / Location</th>
                    <th className="px-4 py-3 font-medium">Status</th>
                    <th className="px-4 py-3 font-medium">Latency</th>
                    <th className="px-4 py-3 font-medium">Load</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800">
                  {statusList.map((node, i) => (
                    <tr key={i} className="hover:bg-gray-800/30 transition-colors">
                      <td className="px-4 py-3 font-medium text-gray-200">{node.name}</td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-1 rounded text-[10px] font-bold ${node.status === 'Operational' ? 'bg-green-900/30 text-green-400' : 'bg-yellow-900/30 text-yellow-400'}`}>
                          {node.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-gray-400 font-mono">{node.ping}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <span className="w-8 text-right text-gray-400 font-mono">{node.load}</span>
                          <div className="flex-1 h-1.5 bg-gray-800 rounded-full overflow-hidden">
                            <div className="h-full bg-blue-500 rounded-full" style={{ width: node.load }} />
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
             </table>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="!p-5 bg-gray-900 border-gray-800">
            <h3 className="text-sm font-semibold text-gray-200 mb-4 flex items-center gap-2">
              <Shield className="w-4 h-4 text-red-500" />
              Security Gateway Blocks
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-400">DDoS Mitigation</span>
                <span className="text-xs font-mono text-red-400 border border-red-900/50 bg-red-950/30 px-2 py-0.5 rounded">ACTIVE</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-400">Malicious IPs Blocked</span>
                <span className="text-xs font-mono text-gray-300">142,091</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-400">Geo-IP Drops (RU/CN/KP)</span>
                <span className="text-xs font-mono text-gray-300">89%</span>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-800">
              <div className="w-full h-24 bg-gray-950 rounded-lg flex flex-col items-center justify-center border border-gray-800">
                <Shield className="w-6 h-6 text-green-500 mb-2" />
                <span className="text-xs text-gray-400">Perimeter Secure</span>
              </div>
            </div>
          </Card>

          <Card className="!p-5 bg-gray-900 border-gray-800">
             <h3 className="text-sm font-semibold text-gray-200 mb-4 flex items-center gap-2">
              <Database className="w-4 h-4 text-purple-500" />
              Storage Fabric Health
            </h3>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-gray-400">Tier 1 NVMe (Prod)</span>
                  <span className="text-gray-300 font-mono">72%</span>
                </div>
                <div className="h-1.5 w-full bg-gray-800 rounded-full"><div className="h-full bg-purple-500 rounded-full w-[72%]"></div></div>
              </div>
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-gray-400">Tier 2 SSD (Dev/Test)</span>
                  <span className="text-gray-300 font-mono">45%</span>
                </div>
                <div className="h-1.5 w-full bg-gray-800 rounded-full"><div className="h-full bg-purple-500 rounded-full w-[45%]"></div></div>
              </div>
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-gray-400">Tier 3 S3 Archive</span>
                  <span className="text-gray-300 font-mono">18%</span>
                </div>
                <div className="h-1.5 w-full bg-gray-800 rounded-full"><div className="h-full bg-purple-500 rounded-full w-[18%]"></div></div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default NetworkTopology;
