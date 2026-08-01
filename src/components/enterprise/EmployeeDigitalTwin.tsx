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
import { Button } from '@/components/ui/Button';
import { Tabs } from '@/components/ui/Tabs';

import type { Employee } from '@/types/enterprise';

interface EmployeeDigitalTwinProps {
  employee: Employee;
  onClose: () => void;
}

// --- Sub-components (Tabs) ---

const OverviewTab = () => (
  <div className="space-y-[24px] animate-in fade-in slide-in-from-bottom-4 duration-500">
    <div className="grid grid-cols-2 gap-[16px]">
      <Card className="bg-slate-900 border-slate-800 p-[16px]">
        <div className="pb-[8px]">
          <h3 className="gfs-text-card-title text-slate-400">MTTA (Mean Time to Acknowledge)</h3>
        </div>
        <div>
          <div className="flex items-end gap-[8px]">
            <span className="gfs-text-h1 text-white">4.2m</span>
            <span className="gfs-text-caption text-emerald-400 flex items-center mb-[4px]"><TrendingUp className="w-[14px] h-[14px] mr-[4px]" /> 12%</span>
          </div>
          <div className="w-full bg-slate-800 h-[6px] mt-[16px] rounded-full overflow-hidden">
            <div className="bg-emerald-500 h-full w-[85%]"></div>
          </div>
        </div>
      </Card>
      <Card className="bg-slate-900 border-slate-800 p-[16px]">
        <div className="pb-[8px]">
          <h3 className="gfs-text-card-title text-slate-400">MTTR (Mean Time to Resolve)</h3>
        </div>
        <div>
          <div className="flex items-end gap-[8px]">
            <span className="gfs-text-h1 text-white">18.5m</span>
            <span className="gfs-text-caption text-emerald-400 flex items-center mb-[4px]"><TrendingUp className="w-[14px] h-[14px] mr-[4px]" /> 5%</span>
          </div>
          <div className="w-full bg-slate-800 h-[6px] mt-[16px] rounded-full overflow-hidden">
            <div className="bg-blue-500 h-full w-[70%]"></div>
          </div>
        </div>
      </Card>
    </div>

    <Card className="bg-slate-900 border-slate-800 p-[16px]">
      <div className="pb-[12px]">
        <h3 className="gfs-text-section-title text-white">Current Focus</h3>
      </div>
      <div>
        <div className="flex items-start space-x-[16px] border-l-2 border-orange-500 pl-[16px] py-[8px]">
          <ShieldAlert className="w-[18px] h-[18px] text-orange-500 mt-[2px]" />
          <div>
            <h4 className="gfs-text-body font-medium text-white">INC-9482: Suspicious PowerShell Execution</h4>
            <p className="gfs-text-caption text-slate-400 mt-[4px]">Investigating lateral movement indicators on HOST-DB-01.</p>
            <div className="flex gap-[8px] mt-[12px]">
              <Badge variant="high">High Severity</Badge>
              <Badge variant="default">Assigned 45m ago</Badge>
            </div>
          </div>
        </div>
      </div>
    </Card>

    <div className="grid grid-cols-2 gap-[16px]">
      <div className="space-y-[16px]">
        <h4 className="gfs-text-caption font-semibold text-slate-400 uppercase tracking-wider">Top Skills</h4>
        <div className="flex flex-wrap gap-[8px]">
          <Badge variant="info">KQL</Badge>
          <Badge variant="info">Threat Hunting</Badge>
          <Badge variant="info">Incident Response</Badge>
          <Badge variant="info">Azure Sentinel</Badge>
        </div>
      </div>
      <div className="space-y-[16px]">
        <h4 className="gfs-text-caption font-semibold text-slate-400 uppercase tracking-wider">Certifications</h4>
        <div className="space-y-[8px] gfs-text-body text-slate-300">
          <div className="flex items-center gap-[8px]"><Award className="w-[16px] h-[16px] text-purple-400" /> Microsoft SC-200</div>
          <div className="flex items-center gap-[8px]"><Award className="w-[16px] h-[16px] text-purple-400" /> GCFA (GIAC Certified)</div>
        </div>
      </div>
    </div>
  </div>
);

const LiveOperationsTab = () => (
  <div className="space-y-[24px]">
    <Card className="bg-slate-900 border-slate-800 p-[16px]">
      <div className="pb-[12px]">
        <h3 className="gfs-text-section-title text-white flex items-center gap-[8px]">
          <Activity className="w-[18px] h-[18px] text-blue-400" /> Activity Telemetry
        </h3>
      </div>
      <div>
        <div className="space-y-[16px]">
          <div className="flex justify-between items-center gfs-text-body">
            <span className="text-slate-400">Keyboard Activity (Last 5m)</span>
            <span className="text-emerald-400 font-medium">85 WPM (Active)</span>
          </div>
          <div className="w-full bg-slate-800 h-[4px] rounded-full overflow-hidden">
             <div className="bg-emerald-500 h-full w-[85%] animate-pulse"></div>
          </div>
          <div className="flex justify-between items-center gfs-text-body pt-[8px]">
            <span className="text-slate-400">Active Window</span>
            <span className="text-white font-medium">Microsoft Sentinel - Logs</span>
          </div>
        </div>
      </div>
    </Card>

    <h4 className="gfs-text-caption font-semibold text-slate-400 uppercase tracking-wider">Action Log</h4>
    <div className="space-y-0 border-l border-slate-800 ml-[12px]">
      {[
        { time: '14:32:10', action: 'Executed KQL Query in Workspace: SOC-Main', status: 'success' },
        { time: '14:28:45', action: 'Updated status of INC-9482 to Investigating', status: 'info' },
        { time: '14:15:00', action: 'Joined Teams Meeting: Shift Handover', status: 'success' },
        { time: '13:55:12', action: 'Failed authentication attempt (Device: LPT-8832)', status: 'warning' },
      ].map((log, i) => (
        <div key={i} className="relative pl-[24px] pb-[16px]">
          <div className={`absolute -left-[6px] top-[6px] w-[12px] h-[12px] rounded-full border-2 border-slate-900 ${
            log.status === 'success' ? 'bg-emerald-500' : log.status === 'warning' ? 'bg-orange-500' : 'bg-blue-500'
          }`}></div>
          <div className="gfs-text-caption text-slate-500 mb-[4px]">{log.time}</div>
          <div className="gfs-text-body text-slate-300">{log.action}</div>
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
    <div className="h-[500px] w-full rounded-lg border border-slate-800 bg-slate-900/50 p-[8px]">
      <ReactECharts option={option} style={{ height: '100%', width: '100%' }} />
    </div>
  );
};

const AICopilotTab = () => (
  <div className="flex flex-col h-[600px]">
    <div className="flex-1 overflow-y-auto space-y-[16px] pr-[8px]">
      <div className="flex gap-[12px]">
        <div className="w-[32px] h-[32px] rounded-full bg-blue-600/20 flex items-center justify-center shrink-0">
          <Bot className="w-[16px] h-[16px] text-blue-400" />
        </div>
        <div className="bg-slate-800 p-[12px] rounded-lg rounded-tl-none border border-slate-700 gfs-text-body text-slate-300">
          I've analyzed Alex's performance over the last 30 days. They are excelling in initial triage (MTTA is top 10%), but struggle slightly with complex cloud-native incidents. I recommend assigning them to the upcoming "Advanced AWS IR" training module.
        </div>
      </div>
      <div className="flex gap-[12px] flex-row-reverse">
        <div className="w-[32px] h-[32px] rounded-full bg-slate-700 flex items-center justify-center shrink-0">
          <User className="w-[16px] h-[16px] text-slate-400" />
        </div>
        <div className="bg-blue-600/20 p-[12px] rounded-lg rounded-tr-none border border-blue-500/30 gfs-text-body text-slate-200">
          Draft a performance review summary for their Q3 check-in.
        </div>
      </div>
      <div className="flex gap-[12px]">
        <div className="w-[32px] h-[32px] rounded-full bg-blue-600/20 flex items-center justify-center shrink-0">
          <Bot className="w-[16px] h-[16px] text-blue-400" />
        </div>
        <div className="bg-slate-800 p-[12px] rounded-lg rounded-tl-none border border-slate-700 gfs-text-body text-slate-300 space-y-[8px]">
          <p><strong>Q3 Performance Review Draft: Alex</strong></p>
          <ul className="list-disc pl-[16px] space-y-[4px]">
            <li><strong>Strengths:</strong> Exceptional response times. High fidelity in alert classification. Strong team collaboration.</li>
            <li><strong>Areas for Growth:</strong> Cloud (AWS/GCP) incident remediation workflows.</li>
            <li><strong>Overall:</strong> Exceeds Expectations. Highly valuable asset to the Tier 2 SOC team.</li>
          </ul>
        </div>
      </div>
    </div>
    <div className="mt-[16px] relative">
      <input 
        type="text" 
        placeholder="Ask Copilot about this employee..." 
        className="w-full bg-slate-900 border border-slate-700 rounded-md py-[8px] pl-[16px] pr-[40px] gfs-text-body text-white focus:outline-none focus:border-blue-500"
      />
      <Button variant="ghost" size="icon" className="absolute right-[4px] top-[4px] text-slate-400 hover:text-white">
        <Zap className="w-[16px] h-[16px]" />
      </Button>
    </div>
  </div>
);

const PlaceholderTab = ({ name }: { name: string }) => (
  <div className="flex flex-col items-center justify-center h-[256px] text-slate-500 border border-dashed border-slate-700 rounded-lg">
    <FileText className="w-[32px] h-[32px] mb-[8px] opacity-50" />
    <p className="gfs-text-body">Detailed view for {name} is under construction.</p>
  </div>
);

// --- Main Component ---

export default function EmployeeDigitalTwin({ employee, onClose }: EmployeeDigitalTwinProps) {
  const [activeTab, setActiveTab] = useState('overview');

  const tabItems = [
    { id: 'overview', label: 'Overview', icon: Activity },
    { id: 'operations', label: 'Live Operations', icon: Zap },
    { id: 'performance', label: 'Performance', icon: TrendingUp },
    { id: 'investigations', label: 'Investigations', icon: ShieldAlert },
    { id: 'relationships', label: 'Relationships', icon: GitMerge },
    { id: 'copilot', label: 'AI Copilot', icon: Bot },
    { id: 'assets', label: 'Assets', icon: Laptop },
    { id: 'career', label: 'Career Journey', icon: Award },
  ];

  return createPortal(
    <>
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9998] transition-opacity" onClick={onClose} />
      
      <div className="fixed top-0 right-0 h-screen w-[40%] min-w-[600px] bg-[var(--color-gfs-base)] border-l border-[var(--color-gfs-border)] shadow-2xl z-[9999] flex flex-col animate-in slide-in-from-right duration-300">
        
        {/* Header Section */}
        <div className="p-[24px] border-b border-[var(--color-gfs-border-light)] bg-[var(--color-gfs-surface)]">
          <div className="flex justify-between items-start mb-[24px]">
            <div className="flex gap-[16px] items-center">
              <div className="relative">
                {employee.photo ? (
                  <img src={employee.photo} alt={employee.name} className="w-[64px] h-[64px] rounded-full border-2 border-[var(--color-gfs-border)] object-cover" />
                ) : (
                  <div className="w-[64px] h-[64px] rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-xl font-bold text-white shadow-lg">
                    {employee.name.charAt(0)}
                  </div>
                )}
                <div className="absolute -bottom-1 -right-1 w-[20px] h-[20px] bg-[var(--color-gfs-surface)] rounded-full flex items-center justify-center">
                  <div className="w-[12px] h-[12px] bg-emerald-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.8)]"></div>
                </div>
              </div>
              
              <div>
                <h2 className="gfs-text-h2 text-white">{employee.name}</h2>
                <div className="flex items-center gap-[8px] gfs-text-body text-slate-400 mt-[4px]">
                  <span className="font-medium text-slate-300">{employee.designation}</span>
                  <span>•</span>
                  <span>{employee.department}</span>
                  <span>•</span>
                  <span>ID: {employee.employeeId || employee.id}</span>
                </div>
              </div>
            </div>
            
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="w-[20px] h-[20px]" />
            </Button>
          </div>

          <div className="flex flex-wrap gap-x-[24px] gap-y-[8px] gfs-text-body mb-[24px] text-slate-400">
             <div className="flex items-center gap-[6px]"><Mail className="w-[16px] h-[16px]" /> {employee.email}</div>
             <div className="flex items-center gap-[6px]"><MapPin className="w-[16px] h-[16px]" /> {employee.location}</div>
             <div className="flex items-center gap-[6px]"><Clock className="w-[16px] h-[16px]" /> Shift: {employee.shift}</div>
             <div className="flex items-center gap-[6px]"><Users className="w-[16px] h-[16px]" /> Mgr: {employee.manager}</div>
          </div>

          {/* Action Footer (Moved to Actions per layout rules) */}
          <div className="flex gap-[8px]">
            <Button variant="primary" className="flex-1">
              <ShieldCheck className="w-[16px] h-[16px] mr-[8px]" /> Assign Case
            </Button>
            <Button variant="secondary" className="flex-1">
              <PhoneCall className="w-[16px] h-[16px] mr-[8px]" /> Teams Call
            </Button>
            <Button variant="danger" className="flex-1">
              <AlertTriangle className="w-[16px] h-[16px] mr-[8px]" /> Escalate
            </Button>
          </div>
        </div>

        {/* Tab Navigation (Using standard Tabs component) */}
        <div className="px-[24px] bg-[var(--color-gfs-surface)]">
          <Tabs tabs={tabItems} activeTab={activeTab} onChange={setActiveTab} />
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-[24px] custom-scrollbar bg-[var(--color-gfs-base)]">
          {activeTab === 'overview' && <OverviewTab />}
          {activeTab === 'operations' && <LiveOperationsTab />}
          {activeTab === 'relationships' && <RelationshipsTab />}
          {activeTab === 'copilot' && <AICopilotTab />}
          {/* Fallback for other tabs */}
          {['performance', 'investigations', 'assets', 'career'].includes(activeTab) && (
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
