import React, { useMemo } from 'react';
import ReactECharts from 'echarts-for-react';

const ActiveDirectoryTree: React.FC = () => {
  const option = useMemo(() => {
    const data = {
      name: 'Root Forest (corp.local)',
      children: [
        {
          name: 'NA Domain',
          children: [
            {
              name: 'Sites',
              children: [
                { name: 'New York (Site)' },
                { name: 'Toronto (Site)' }
              ]
            },
            {
              name: 'OUs',
              children: [
                {
                  name: 'IT Dept',
                  children: [
                    { name: 'Admins (Group)' },
                    { name: 'Workstations (Computers)' }
                  ]
                },
                {
                  name: 'HR Dept',
                  children: [
                    { name: 'HR Users (Group)' }
                  ]
                }
              ]
            }
          ]
        },
        {
          name: 'EMEA Domain',
          children: [
            {
              name: 'Sites',
              children: [
                { name: 'London (Site)' }
              ]
            },
            {
              name: 'OUs',
              children: [
                { name: 'Sales (OU)' }
              ]
            }
          ]
        }
      ]
    };

    return {
      backgroundColor: 'transparent',
      tooltip: {
        trigger: 'item',
        triggerOn: 'mousemove'
      },
      series: [
        {
          type: 'tree',
          data: [data],
          top: '5%',
          left: '10%',
          bottom: '5%',
          right: '20%',
          symbolSize: 14,
          symbol: 'circle',
          itemStyle: {
            color: '#1f6feb',
            borderColor: '#58a6ff',
            borderWidth: 2
          },
          label: {
            position: 'left',
            verticalAlign: 'middle',
            align: 'right',
            color: '#c9d1d9',
            fontSize: 14,
            fontFamily: 'Inter, sans-serif'
          },
          leaves: {
            label: {
              position: 'right',
              verticalAlign: 'middle',
              align: 'left'
            }
          },
          lineStyle: {
            color: '#30363d',
            width: 2,
            curveness: 0.5
          },
          expandAndCollapse: true,
          animationDuration: 550,
          animationDurationUpdate: 750
        }
      ]
    };
  }, []);

  return (
    <div style={{ width: '100%', height: '100%', minHeight: '600px', backgroundColor: '#0d1117', padding: '24px', borderRadius: '16px', border: '1px solid #30363d' }}>
      <h2 style={{ color: '#e6edf3', margin: '0 0 24px 0', fontFamily: 'Inter, sans-serif', fontSize: '1.5rem', fontWeight: 600 }}>Active Directory Structure</h2>
      <ReactECharts option={option} style={{ height: '600px', width: '100%' }} />
    </div>
  );
};

export default ActiveDirectoryTree;
