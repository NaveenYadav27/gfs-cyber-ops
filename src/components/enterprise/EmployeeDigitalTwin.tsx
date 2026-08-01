import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { 
  X, User, Activity, TrendingUp, ShieldAlert, Laptop, BookOpen, 
  Briefcase, Users, GitMerge, Bot, Award, Book, ShieldCheck, 
  FileText, PhoneCall, AlertTriangle, ArrowUpRight, Clock, 
  MapPin, Mail, ChevronRight, CheckCircle2, Zap
} from 'lucide-react';
import ReactECharts from 'echarts-for-react';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';

// --- Types ---
export interface Employee {
  id: string;
  name: string;
  role: string;
  department: string;
  manager: string;
  shift: string;
  avatarUrl?: string;
  email: string;
  location: string;
}

interface EmployeeDigitalTwinProps {
  employee: Employee;
  onClose: () => void;
}

// --- Sub-components (Tabs) ---

const OverviewTab = () => (
  <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
    <div className="grid grid-cols-2 gap-4">
      <Card className="bg-slate-900 border-slate-800">
        <div className="pb-2">
          <h3 className="text-sm text-slate-400 font-medium">MTTA (Mean Time to Acknowledge)</h3>
        </div>
        <div>
          <div className="flex items-end gap-2">
            <span className="text-3xl font-bold text-white">4.2m</span>
            <span className="text-sm text-emerald-400 flex items-center mb-1"><TrendingUp className="w-3 h-3 mr-1" /> 12%</span>
          </div>
          <div className="w-full bg-slate-800 h-1.5 mt-4 rounded-full overflow-hidden">
            <div className="bg-emerald-500 h-full w-[85%]"></div>
          </div>
        </div>
      </Card>
      <Card className="bg-slate-900 border-slate-800">
        <div className="pb-2">
          <h3 className="text-sm text-slate-400 font-medium">MTTR (Mean Time to Resolve)</h3>
        </div>
        <div>
          <div className="flex items-end gap-2">
            <span className="text-3xl font-bold text-white">18.5m</span>
            <span className="text-sm text-emerald-400 flex items-center mb-1"><TrendingUp className="w-3 h-3 mr-1" /> 5%</span>
          </div>
          <div className="w-full bg-slate-800 h-1.5 mt-4 rounded-full overflow-hidden">
            <div className="bg-blue-500 h-full w-[70%]"></div>
          </div>
        </div>
      </Card>
    </div>

    <Card className="bg-slate-900 border-slate-800">
      <div>
        <h3 className="text-md text-white">Current Focus</h3>
      </div>
      <div>
        <div className="flex items-start space-x-4 border-l-2 border-orange-500 pl-4 py-2">
          <ShieldAlert className="w-5 h-5 text-orange-500 mt-0.5" />
          <div>
            <h4 className="text-white font-medium">INC-9482: Suspicious PowerShell Execution</h4>
            <p className="text-slate-400 text-sm mt-1">Investigating lateral movement indicators on HOST-DB-01.</p>
            <div className="flex gap-2 mt-3">
              <Badge variant="default" className="text-orange-400 border-orange-900/50 bg-orange-900/20">High Severity</Badge>
              <Badge variant="default" className="text-slate-300 border-slate-700 bg-slate-800">Assigned 45m ago</Badge>
            </div>
          </div>
        </div>
      </div>
    </Card>

    <div className="grid grid-cols-2 gap-4">
      <div className="space-y-4">
        <h4 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">Top Skills</h4>
        <div className="flex flex-wrap gap-2">
          <Badge className="bg-blue-900/40 text-blue-300 hover:bg-blue-900/60 border-0">KQL</Badge>
          <Badge className="bg-blue-900/40 text-blue-300 hover:bg-blue-900/60 border-0">Threat Hunting</Badge>
          <Badge className="bg-blue-900/40 text-blue-300 hover:bg-blue-900/60 border-0">Incident Response</Badge>
          <Badge className="bg-blue-900/40 text-blue-300 hover:bg-blue-900/60 border-0">Azure Sentinel</Badge>
        </div>
      </div>
      <div className="space-y-4">
        <h4 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">Certifications</h4>
        <div className="space-y-2 text-sm text-slate-300">
          <div className="flex items-center gap-2"><Award className="w-4 h-4 text-purple-400" /> Microsoft SC-200</div>
          <div className="flex items-center gap-2"><Award className="w-4 h-4 text-purple-400" /> GCFA (GIAC Certified)</div>
        </div>
      </div>
    </div>
  </div>
);

const LiveOperationsTab = () => (
  <div className="space-y-6">
    <Card className="bg-slate-900 border-slate-800">
      <div>
        <h3 className="text-md text-white flex items-center gap-2">
          <Activity className="w-4 h-4 text-blue-400" /> Activity Telemetry
        </h3>
      </div>
      <div>
        <div className="space-y-4">
          <div className="flex justify-between items-center text-sm">
            <span className="text-slate-400">Keyboard Activity (Last 5m)</span>
            <span className="text-emerald-400 font-medium">85 WPM (Active)</span>
          </div>
          <div className="w-full bg-slate-800 h-1 rounded-full overflow-hidden">
             <div className="bg-emerald-500 h-full w-[85%] animate-pulse"></div>
          </div>
          <div className="flex justify-between items-center text-sm pt-2">
            <span className="text-slate-400">Active Window</span>
            <span className="text-white font-medium">Microsoft Sentinel - Logs</span>
          </div>
        </div>
      </div>
    </Card>

    <h4 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">Action Log</h4>
    <div className="space-y-0 border-l border-slate-800 ml-3">
      {[
        { time: '14:32:10', action: 'Executed KQL Query in Workspace: SOC-Main', status: 'success' },
        { time: '14:28:45', action: 'Updated status of INC-9482 to Investigating', status: 'info' },
        { time: '14:15:00', action: 'Joined Teams Meeting: Shift Handover', status: 'success' },
        { time: '13:55:12', action: 'Failed authentication attempt (Device: LPT-8832)', status: 'warning' },
      ].map((log, i) => (
        <div key={i} className="relative pl-6 pb-4">
          <div className={`absolute -left-1.5 top-1.5 w-3 h-3 rounded-full border-2 border-slate-900 ${
            log.status === 'success' ? 'bg-emerald-500' : log.status === 'warning' ? 'bg-orange-500' : 'bg-blue-500'
          }`}></div>
          <div className="text-xs text-slate-500 mb-1">{log.time}</div>
          <div className="text-sm text-slate-300">{log.action}</div>
        </div>
      ))}
    </div>
  </div>
);

const RelationshipsTab = () => {
  const option = {
    tooltip: {},
    animationDurationUpdate: 1500,
    animationEasingUpdate: 'quinticInOut',
    series: [
      {
        type: 'graph',
        layout: 'force',
        symbolSize: 40,
        roam: true,
        label: {
          show: true,
          position: 'right',
          formatter: '{b}',
          color: '#cbd5e1'
        },
        force: {
          repulsion: 300,
          edgeLength: 100
        },
        data: [
          { name: 'Alex (Analyst)', itemStyle: { color: '#3b82f6' }, symbolSize: 60 },
          { name: 'Sarah (Manager)', itemStyle: { color: '#8b5cf6' } },
          { name: 'David (Peer)', itemStyle: { color: '#64748b' } },
          { name: 'LPT-8832', itemStyle: { color: '#10b981' }, symbol: 'rect' },
          { name: 'Active Directory', itemStyle: { color: '#f59e0b' }, symbol: 'roundRect' },
          { name: 'INC-9482', itemStyle: { color: '#ef4444' }, symbol: 'triangle' },
        ],
        edges: [
          { source: 'Alex (Analyst)', target: 'Sarah (Manager)' },
          { source: 'Alex (Analyst)', target: 'David (Peer)' },
          { source: 'Alex (Analyst)', target: 'LPT-8832' },
          { source: 'Alex (Analyst)', target: 'Active Directory' },
          { source: 'Alex (Analyst)', target: 'INC-9482' },
        ],
        lineStyle: {
          color: 'source',
          curveness: 0.3
        }
      }
    ]
  };

  return (
    <div className="h-[500px] w-full rounded-lg border border-slate-800 bg-slate-900/50 p-2">
      <ReactECharts option={option} style={{ height: '100%', width: '100%' }} />
    </div>
  );
};

const AICopilotTab = () => (
  <div className="flex flex-col h-[600px]">
    <div className="flex-1 overflow-y-auto space-y-4 pr-2">
      <div className="flex gap-3">
        <div className="w-8 h-8 rounded-full bg-blue-600/20 flex items-center justify-center shrink-0">
          <Bot className="w-4 h-4 text-blue-400" />
        </div>
        <div className="bg-slate-800 p-3 rounded-lg rounded-tl-none border border-slate-700 text-sm text-slate-300">
          I've analyzed Alex's performance over the last 30 days. They are excelling in initial triage (MTTA is top 10%), but struggle slightly with complex cloud-native incidents. I recommend assigning them to the upcoming "Advanced AWS IR" training module.
        </div>
      </div>
      <div className="flex gap-3 flex-row-reverse">
        <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center shrink-0">
          <User className="w-4 h-4 text-slate-400" />
        </div>
        <div className="bg-blue-600/20 p-3 rounded-lg rounded-tr-none border border-blue-500/30 text-sm text-slate-200">
          Draft a performance review summary for their Q3 check-in.
        </div>
      </div>
      <div className="flex gap-3">
        <div className="w-8 h-8 rounded-full bg-blue-600/20 flex items-center justify-center shrink-0">
          <Bot className="w-4 h-4 text-blue-400" />
        </div>
        <div className="bg-slate-800 p-3 rounded-lg rounded-tl-none border border-slate-700 text-sm text-slate-300 space-y-2">
          <p><strong>Q3 Performance Review Draft: Alex</strong></p>
          <ul className="list-disc pl-4 space-y-1">
            <li><strong>Strengths:</strong> Exceptional response times. High fidelity in alert classification. Strong team collaboration.</li>
            <li><strong>Areas for Growth:</strong> Cloud (AWS/GCP) incident remediation workflows.</li>
            <li><strong>Overall:</strong> Exceeds Expectations. Highly valuable asset to the Tier 2 SOC team.</li>
          </ul>
        </div>
      </div>
    </div>
    <div className="mt-4 relative">
      <input 
        type="text" 
        placeholder="Ask Copilot about this employee..." 
        className="w-full bg-slate-900 border border-slate-700 rounded-md py-3 pl-4 pr-10 text-sm text-white focus:outline-none focus:border-blue-500"
      />
      <button className="absolute right-3 top-3 text-slate-400 hover:text-white">
        <Zap className="w-4 h-4" />
      </button>
    </div>
  </div>
);

const PlaceholderTab = ({ name }: { name: string }) => (
  <div className="flex flex-col items-center justify-center h-64 text-slate-500 border border-dashed border-slate-700 rounded-lg">
    <FileText className="w-8 h-8 mb-2 opacity-50" />
    <p>Detailed view for {name} is under construction.</p>
  </div>
);

// --- Main Component ---

export default function EmployeeDigitalTwin({ employee, onClose }: EmployeeDigitalTwinProps) {
  const [activeTab, setActiveTab] = useState('Overview');

  const tabs = [
    { name: 'Overview', icon: Activity },
    { name: 'Live Operations', icon: Zap },
    { name: 'Performance', icon: TrendingUp },
    { name: 'Investigations', icon: ShieldAlert },
    { name: 'Relationships', icon: GitMerge },
    { name: 'AI Copilot', icon: Bot },
    { name: 'Assets', icon: Laptop },
    { name: 'Career Journey', icon: Award },
  ];

  return createPortal(
    <>
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9998] transition-opacity" onClick={onClose} />
      
      <div className="fixed top-0 right-0 h-screen w-[40%] min-w-[600px] bg-slate-950 border-l border-slate-800 shadow-2xl z-[9999] flex flex-col text-slate-200 animate-in slide-in-from-right duration-300">
        
        {/* Header */}
        <div className="p-6 border-b border-slate-800 bg-slate-900/50">
          <div className="flex justify-between items-start mb-6">
            <div className="flex gap-4 items-center">
              <div className="relative">
                {employee.avatarUrl ? (
                  <img src={employee.avatarUrl} alt={employee.name} className="w-16 h-16 rounded-full border-2 border-slate-700 object-cover" />
                ) : (
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-xl font-bold text-white shadow-lg">
                    {employee.name.charAt(0)}
                  </div>
                )}
                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-slate-900 rounded-full flex items-center justify-center">
                  <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.8)]"></div>
                </div>
              </div>
              
              <div>
                <h2 className="text-2xl font-bold text-white tracking-tight">{employee.name}</h2>
                <div className="flex items-center gap-2 text-sm text-slate-400 mt-1">
                  <span className="font-medium text-slate-300">{employee.role}</span>
                  <span>•</span>
                  <span>{employee.department}</span>
                  <span>•</span>
                  <span>ID: {employee.id}</span>
                </div>
              </div>
            </div>
            
            <button onClick={onClose} className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-full transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm mb-6 text-slate-400">
             <div className="flex items-center gap-1.5"><Mail className="w-4 h-4" /> {employee.email}</div>
             <div className="flex items-center gap-1.5"><MapPin className="w-4 h-4" /> {employee.location}</div>
             <div className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> Shift: {employee.shift}</div>
             <div className="flex items-center gap-1.5"><Users className="w-4 h-4" /> Mgr: {employee.manager}</div>
          </div>

          {/* Command Center */}
          <div className="flex gap-2">
            <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md text-sm font-medium flex items-center justify-center gap-2 transition-colors">
              <ShieldCheck className="w-4 h-4" /> Assign Case
            </button>
            <button className="flex-1 bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 py-2 px-4 rounded-md text-sm font-medium flex items-center justify-center gap-2 transition-colors">
              <PhoneCall className="w-4 h-4" /> Teams Call
            </button>
            <button className="flex-1 bg-red-900/20 hover:bg-red-900/40 text-red-400 border border-red-900/50 py-2 px-4 rounded-md text-sm font-medium flex items-center justify-center gap-2 transition-colors">
              <AlertTriangle className="w-4 h-4" /> Escalate
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="border-b border-slate-800 overflow-x-auto custom-scrollbar">
          <div className="flex p-2 gap-1 min-w-max">
            {tabs.map(tab => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.name;
              return (
                <button
                  key={tab.name}
                  onClick={() => setActiveTab(tab.name)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-md text-sm font-medium transition-all ${
                    isActive 
                      ? 'bg-slate-800 text-white shadow-sm' 
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-blue-400' : ''}`} />
                  {tab.name}
                </button>
              )
            })}
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
          {activeTab === 'Overview' && <OverviewTab />}
          {activeTab === 'Live Operations' && <LiveOperationsTab />}
          {activeTab === 'Relationships' && <RelationshipsTab />}
          {activeTab === 'AI Copilot' && <AICopilotTab />}
          {/* Fallback for other tabs */}
          {['Performance', 'Investigations', 'Assets', 'Career Journey'].includes(activeTab) && (
            <PlaceholderTab name={activeTab} />
          )}
        </div>
        
      </div>
      
      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
          height: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: #334155;
          border-radius: 20px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background-color: #475569;
        }
      `}} />
    </>,
    document.body
  );
}
