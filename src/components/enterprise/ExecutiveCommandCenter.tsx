import React from 'react';
import ReactECharts from 'echarts-for-react';
import { ShieldAlert, ShieldCheck, Activity, DollarSign, AlertTriangle, CheckCircle } from 'lucide-react';

const ExecutiveCommandCenter = () => {
  const healthScore = 88;
  const healthColor = healthScore > 85 ? '#10b981' : '#f59e0b';

  const riskHeatmapOption = {
    tooltip: { position: 'top' },
    grid: { height: '50%', top: '10%' },
    xAxis: { type: 'category', data: ['Low', 'Med', 'High', 'Critical'], splitArea: { show: true } },
    yAxis: { type: 'category', data: ['Fin', 'Ops', 'Cyber', 'Legal'], splitArea: { show: true } },
    visualMap: {
      min: 0,
      max: 10,
      calculable: true,
      orient: 'horizontal',
      left: 'center',
      bottom: '15%',
      inRange: { color: ['#22c55e', '#eab308', '#ef4444'] }
    },
    series: [{
      name: 'Risk Level',
      type: 'heatmap',
      data: [
        [0, 0, 1], [0, 1, 2], [0, 2, 8], [0, 3, 2],
        [1, 0, 2], [1, 1, 4], [1, 2, 9], [1, 3, 4],
        [2, 0, 5], [2, 1, 7], [2, 2, 10], [2, 3, 6],
        [3, 0, 1], [3, 1, 3], [3, 2, 7], [3, 3, 5]
      ],
      label: { show: true },
      emphasis: { itemStyle: { shadowBlur: 10, shadowColor: 'rgba(0, 0, 0, 0.5)' } }
    }]
  };

  const businessAvailabilityOption = {
    tooltip: { trigger: 'axis' },
    xAxis: { type: 'category', data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'], axisLabel: { color: '#9ca3af' } },
    yAxis: { type: 'value', min: 99.0, max: 100.0, axisLabel: { color: '#9ca3af', formatter: '{value}%' } },
    series: [{
      data: [99.99, 99.95, 99.9, 99.99, 99.8, 99.99, 100],
      type: 'line',
      smooth: true,
      lineStyle: { color: '#3b82f6', width: 3 },
      areaStyle: {
        color: {
          type: 'linear', x: 0, y: 0, x2: 0, y2: 1,
          colorStops: [{ offset: 0, color: 'rgba(59, 130, 246, 0.5)' }, { offset: 1, color: 'rgba(59, 130, 246, 0)' }]
        }
      }
    }]
  };

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 p-6 font-sans">
      <header className="mb-8 flex justify-between items-center border-b border-gray-800 pb-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white">Executive Command Center</h1>
          <p className="text-gray-400 mt-1">Real-time enterprise intelligence & risk overview</p>
        </div>
        <div className="flex space-x-4">
          <div className="flex items-center space-x-2 bg-gray-900 px-4 py-2 rounded-lg border border-gray-800">
            <Activity className="text-blue-500" size={20} />
            <span className="font-semibold text-gray-300">Live Feed Active</span>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        {/* Enterprise Health */}
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 shadow-lg flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-gray-400 font-medium">Enterprise Health</h3>
            <ShieldCheck className="text-green-500" size={20} />
          </div>
          <div className="flex items-end space-x-2">
            <span className="text-5xl font-bold" style={{ color: healthColor }}>{healthScore}</span>
            <span className="text-gray-400 text-lg mb-1">/100</span>
          </div>
          <div className="w-full bg-gray-800 rounded-full h-2 mt-4">
            <div className="bg-green-500 h-2 rounded-full" style={{ width: `${healthScore}%` }}></div>
          </div>
        </div>

        {/* Financial Exposure */}
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 shadow-lg flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-gray-400 font-medium">Financial Exposure</h3>
            <DollarSign className="text-red-500" size={20} />
          </div>
          <div className="text-4xl font-bold text-white">$4.2M</div>
          <p className="text-red-400 text-sm mt-2 flex items-center">
            <AlertTriangle size={14} className="mr-1" />
            +12% vs last month (Cyber Risk)
          </p>
        </div>

        {/* Compliance Status */}
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 shadow-lg flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-gray-400 font-medium">Compliance Status</h3>
            <CheckCircle className="text-blue-500" size={20} />
          </div>
          <div className="text-4xl font-bold text-white">94%</div>
          <p className="text-gray-400 text-sm mt-2">ISO 27001, SOC2 Type II, GDPR</p>
        </div>

        {/* Active Incidents */}
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 shadow-lg flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-gray-400 font-medium">Active Incidents</h3>
            <ShieldAlert className="text-yellow-500" size={20} />
          </div>
          <div className="text-4xl font-bold text-white">3</div>
          <p className="text-yellow-500 text-sm mt-2 flex items-center">
            1 High, 2 Medium Severity
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 shadow-lg">
          <h3 className="text-lg font-semibold text-gray-200 mb-4">Business Availability (SLA)</h3>
          <div className="h-64">
            <ReactECharts option={businessAvailabilityOption} style={{ height: '100%', width: '100%' }} />
          </div>
        </div>

        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 shadow-lg">
          <h3 className="text-lg font-semibold text-gray-200 mb-4">Operational & Cyber Risk Heatmap</h3>
          <div className="h-64">
            <ReactECharts option={riskHeatmapOption} style={{ height: '100%', width: '100%' }} />
          </div>
        </div>
      </div>
      
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 shadow-lg">
        <h3 className="text-lg font-semibold text-gray-200 mb-4">Top Priority Incidents</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-400">
            <thead className="text-xs text-gray-500 uppercase bg-gray-800/50">
              <tr>
                <th className="px-4 py-3 rounded-tl-lg">ID</th>
                <th className="px-4 py-3">Description</th>
                <th className="px-4 py-3">Impact</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 rounded-tr-lg">Lead</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-800">
                <td className="px-4 py-3 font-medium text-white">INC-4029</td>
                <td className="px-4 py-3 text-gray-300">DDoS attack on Primary Payment Gateway</td>
                <td className="px-4 py-3"><span className="px-2 py-1 bg-red-900/50 text-red-400 rounded text-xs font-semibold">Critical</span></td>
                <td className="px-4 py-3 text-yellow-500">Mitigating</td>
                <td className="px-4 py-3">Cyber-Ops T1</td>
              </tr>
              <tr className="border-b border-gray-800">
                <td className="px-4 py-3 font-medium text-white">INC-4028</td>
                <td className="px-4 py-3 text-gray-300">AWS us-east-1 Latency Spike</td>
                <td className="px-4 py-3"><span className="px-2 py-1 bg-yellow-900/50 text-yellow-400 rounded text-xs font-semibold">High</span></td>
                <td className="px-4 py-3 text-blue-500">Investigating</td>
                <td className="px-4 py-3">Infra Team</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-medium text-white">INC-4025</td>
                <td className="px-4 py-3 text-gray-300">Unpatched vulnerability in Core CRM (CVE-2024-X)</td>
                <td className="px-4 py-3"><span className="px-2 py-1 bg-yellow-900/50 text-yellow-400 rounded text-xs font-semibold">High</span></td>
                <td className="px-4 py-3 text-gray-400">Scheduled</td>
                <td className="px-4 py-3">SecOps</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ExecutiveCommandCenter;
