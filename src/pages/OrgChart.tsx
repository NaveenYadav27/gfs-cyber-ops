import { useState, useMemo } from 'react';
import ReactECharts from 'echarts-for-react';
import { Users, Search, Filter } from 'lucide-react';
import { PageHeader } from '@/components/layout/PageHeader';
import { Card } from '@/components/ui/Card';
import { useEnterprise } from '@/store/useEnterprise';
import EmployeeDigitalTwin from '@/components/enterprise/EmployeeDigitalTwin';
import type { Employee } from '@/types/enterprise';

export function OrgChart() {
  const { employees } = useEnterprise();
  const [search, setSearch] = useState('');
  const [deptFilter, setDeptFilter] = useState('');
  const [selectedEmpId, setSelectedEmpId] = useState<string | null>(null);

  // Build Hierarchy
  const treeData = useMemo(() => {
    if (!employees || employees.length === 0) return {};
    
    // Create a map for quick lookup
    const empMap = new Map();
    employees.forEach(emp => {
      empMap.set(emp.id, {
        name: emp.name,
        value: emp.id, // For clicking
        title: emp.designation,
        department: emp.department,
        photo: emp.photo,
        children: []
      });
    });

    // Link children
    let root = null;
    employees.forEach(emp => {
      const node = empMap.get(emp.id);
      if (emp.manager && empMap.has(emp.manager)) {
        empMap.get(emp.manager).children.push(node);
      } else {
        root = node; // Assume Board or CEO is root
      }
    });

    return root || empMap.get(employees[0].id);
  }, [employees]);

  // Handle Search and Filter (In a real enterprise explorer, this would filter the tree visually or highlight)
  const highlightRegex = search ? new RegExp(search, 'i') : null;

  const chartOptions = useMemo(() => ({
    tooltip: {
      trigger: 'item',
      triggerOn: 'mousemove',
      backgroundColor: 'rgba(15, 23, 42, 0.95)',
      borderColor: 'rgba(56, 189, 248, 0.3)',
      textStyle: { color: '#f8fafc', fontSize: 12 },
      formatter: (params: any) => {
        return `
          <div style="padding: 4px;">
            <div style="font-weight: bold; margin-bottom: 4px;">${params.data.name}</div>
            <div style="color: #94a3b8; font-size: 11px;">${params.data.title}</div>
            <div style="color: #38bdf8; font-size: 10px; margin-top: 4px;">${params.data.department}</div>
          </div>
        `;
      }
    },
    series: [
      {
        type: 'tree',
        data: [treeData],
        top: '5%',
        left: '10%',
        bottom: '5%',
        right: '10%',
        symbolSize: 12,
        symbol: 'circle',
        itemStyle: {
          color: '#0ea5e9',
          borderColor: '#bae6fd',
        },
        label: {
          position: 'left',
          verticalAlign: 'middle',
          align: 'right',
          fontSize: 11,
          color: '#e2e8f0',
          formatter: (params: any) => `{name|${params.data.name}}\\n{title|${params.data.title}}`,
          rich: {
            name: { color: '#f8fafc', fontSize: 12, fontWeight: 'bold', lineHeight: 16 },
            title: { color: '#94a3b8', fontSize: 10, lineHeight: 14 }
          }
        },
        leaves: {
          label: {
            position: 'right',
            verticalAlign: 'middle',
            align: 'left'
          }
        },
        emphasis: {
          focus: 'descendant'
        },
        expandAndCollapse: true,
        animationDuration: 550,
        animationDurationUpdate: 750,
        roam: true // Enables zoom and pan
      }
    ]
  }), [treeData]);

  const handleChartClick = (e: any) => {
    if (e.data && e.data.value) {
      setSelectedEmpId(e.data.value);
    }
  };

  const selectedEmployee = employees.find(e => e.id === selectedEmpId) || null;

  return (
    <div className="space-y-4 h-[calc(100vh-100px)] flex flex-col">
      <PageHeader
        icon={<Users className="w-5 h-5 text-[var(--color-gfs-accent)]" />}
        title="Organization Explorer"
        subtitle="Interactive Enterprise Hierarchy Map"
      />

      <Card className="flex-1 overflow-hidden flex flex-col">
        {/* Toolbar */}
        <div className="p-4 border-b border-[var(--color-gfs-border-light)] bg-[var(--color-gfs-deep)] flex items-center gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-[var(--color-gfs-text-muted)] absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search employee..."
              className="w-full pl-9 pr-4 py-2 rounded bg-[var(--color-gfs-surface)] border border-[var(--color-gfs-border-light)] text-[13px] text-white focus:border-[var(--color-gfs-accent)] outline-none"
            />
          </div>
          <div className="flex items-center gap-2 text-[13px] text-[var(--color-gfs-text-muted)]">
            <Filter className="w-4 h-4" />
            <span>Scroll to Zoom | Drag to Pan | Click to expand/collapse or view Twin</span>
          </div>
        </div>

        {/* Tree Map */}
        <div className="flex-1 bg-[var(--color-gfs-base)] relative">
          <ReactECharts 
            option={chartOptions} 
            style={{ height: '100%', width: '100%' }}
            onEvents={{ click: handleChartClick }}
          />
        </div>
      </Card>

      {selectedEmployee && (
        <EmployeeDigitalTwin employee={selectedEmployee} onClose={() => setSelectedEmpId(null)} />
      )}
    </div>
  );
}
