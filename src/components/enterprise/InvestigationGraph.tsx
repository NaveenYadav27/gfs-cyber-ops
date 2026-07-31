import React from 'react';
import { Card } from '@/components/ui/Card';
import { AlertTriangle, Activity, Crosshair, ShieldAlert, Eye, Search, Lock, UserX } from 'lucide-react';

export const InvestigationGraph: React.FC = () => {
  const incidentKpis = [
    { label: 'Active Investigations', value: '24', icon: Search, color: '#3b82f6' },
    { label: 'Critical Incidents', value: '3', icon: AlertTriangle, color: '#ef4444' },
    { label: 'Mean Time to Detect', value: '14m', icon: Eye, color: '#f59e0b' },
    { label: 'Mean Time to Respond', value: '42m', icon: Activity, color: '#10b981' },
    { label: 'Compromised Assets', value: '2', icon: ShieldAlert, color: '#8b5cf6' },
    { label: 'Locked Identities', value: '18', icon: UserX, color: '#ec4899' }
  ];

  const recentAlerts = [
    { id: 'ALT-883', type: 'Impossible Travel', entity: 'jdoe@corp.local', severity: 'High', status: 'Investigating', time: '14 mins ago' },
    { id: 'ALT-882', type: 'Multiple Failed Logins', entity: 'svc_db_admin', severity: 'Medium', status: 'Blocked', time: '1 hr ago' },
    { id: 'ALT-881', type: 'Suspicious Powershell', entity: 'DESKTOP-JDOE', severity: 'Critical', status: 'Contained', time: '2 hrs ago' },
    { id: 'ALT-880', type: 'Data Exfiltration', entity: 'PA-5220-Edge', severity: 'High', status: 'Mitigated', time: '4 hrs ago' }
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {incidentKpis.map((kpi, i) => (
          <Card key={kpi.label} delay={i * 0.05} className="!p-4 bg-gray-900 border-gray-800">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: kpi.color + '15' }}>
                <kpi.icon className="w-4 h-4" style={{ color: kpi.color }} />
              </div>
              <span className="text-xs font-medium text-gray-400">{kpi.label}</span>
            </div>
            <div className="text-2xl font-bold text-white mb-1">{kpi.value}</div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="!p-0 bg-gray-900 border-gray-800 overflow-hidden">
          <div className="p-4 border-b border-gray-800 flex justify-between items-center">
            <h3 className="text-sm font-semibold text-gray-200 flex items-center gap-2">
              <Crosshair className="w-4 h-4 text-red-500" />
              Active Incident Queue
            </h3>
            <span className="px-2 py-1 bg-red-900/30 text-red-400 text-[10px] rounded font-bold">LIVE</span>
          </div>
          <table className="w-full text-left text-sm text-gray-300">
            <thead className="bg-gray-950/50 text-gray-500 text-xs uppercase">
              <tr>
                <th className="px-4 py-3 font-medium">Alert ID</th>
                <th className="px-4 py-3 font-medium">Type</th>
                <th className="px-4 py-3 font-medium">Entity</th>
                <th className="px-4 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {recentAlerts.map((alert, i) => (
                <tr key={i} className="hover:bg-gray-800/30 transition-colors">
                  <td className="px-4 py-3 font-medium text-gray-200">{alert.id}</td>
                  <td className="px-4 py-3 text-gray-300">{alert.type}</td>
                  <td className="px-4 py-3 font-mono text-xs text-gray-400">{alert.entity}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded text-[10px] font-bold ${
                      alert.status === 'Investigating' ? 'bg-yellow-900/30 text-yellow-400' :
                      alert.status === 'Contained' ? 'bg-blue-900/30 text-blue-400' :
                      'bg-green-900/30 text-green-400'
                    }`}>
                      {alert.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>

        <Card className="!p-5 bg-gray-900 border-gray-800 flex flex-col justify-center items-center text-center">
           <Lock className="w-12 h-12 text-blue-500 mb-4 opacity-80" />
           <h3 className="text-lg font-bold text-gray-100 mb-2">Automated Containment Active</h3>
           <p className="text-sm text-gray-400 max-w-md mx-auto">
             SOAR playbooks are currently executing automated containment for 3 critical entities across the global network. Identity isolation and network sinkholing have been verified.
           </p>
           <div className="mt-6 flex items-center gap-4">
             <div className="flex flex-col items-center">
               <span className="text-2xl font-bold text-green-400">100%</span>
               <span className="text-xs text-gray-500">Endpoints Isolated</span>
             </div>
             <div className="w-px h-8 bg-gray-700"></div>
             <div className="flex flex-col items-center">
               <span className="text-2xl font-bold text-green-400">100%</span>
               <span className="text-xs text-gray-500">Tokens Revoked</span>
             </div>
           </div>
        </Card>
      </div>
    </div>
  );
};
