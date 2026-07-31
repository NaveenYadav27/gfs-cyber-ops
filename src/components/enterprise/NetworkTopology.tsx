import React, { useMemo } from 'react';
import ReactECharts from 'echarts-for-react';

const NetworkTopology: React.FC = () => {
  const option = useMemo(() => {
    const nodes = [
      { name: 'Internet', symbolSize: 60, itemStyle: { color: '#00f2fe' } },
      { name: 'AWS Cloud', symbolSize: 50, itemStyle: { color: '#ff9900' } },
      { name: 'Azure Cloud', symbolSize: 50, itemStyle: { color: '#0078d4' } },
      
      { name: 'Main Firewall', symbolSize: 45, itemStyle: { color: '#ff4d4f' } },
      { name: 'Core Router', symbolSize: 40, itemStyle: { color: '#1890ff' } },
      
      { name: 'Data Center', symbolSize: 55, itemStyle: { color: '#52c41a' } },
      { name: 'DB Server 1', symbolSize: 30, itemStyle: { color: '#73d13d' } },
      { name: 'Web Server 1', symbolSize: 30, itemStyle: { color: '#73d13d' } },
      
      { name: 'Campus Core Switch', symbolSize: 40, itemStyle: { color: '#13c2c2' } },
      { name: 'Building A Switch', symbolSize: 35, itemStyle: { color: '#36cfc9' } },
      { name: 'Building B Switch', symbolSize: 35, itemStyle: { color: '#36cfc9' } },
      
      { name: 'Branch Office', symbolSize: 45, itemStyle: { color: '#eb2f96' } },
      { name: 'Branch Router', symbolSize: 35, itemStyle: { color: '#f759ab' } }
    ].map(node => ({
      ...node,
      label: { show: true, position: 'right', color: '#c9d1d9' }
    }));

    const links = [
      { source: 'Internet', target: 'Main Firewall' },
      { source: 'AWS Cloud', target: 'Internet' },
      { source: 'Azure Cloud', target: 'Internet' },
      
      { source: 'Main Firewall', target: 'Core Router' },
      { source: 'Core Router', target: 'Data Center' },
      { source: 'Core Router', target: 'Campus Core Switch' },
      { source: 'Core Router', target: 'Branch Office' },
      
      { source: 'Data Center', target: 'DB Server 1' },
      { source: 'Data Center', target: 'Web Server 1' },
      
      { source: 'Campus Core Switch', target: 'Building A Switch' },
      { source: 'Campus Core Switch', target: 'Building B Switch' },
      
      { source: 'Branch Office', target: 'Branch Router' }
    ];

    return {
      backgroundColor: 'transparent',
      tooltip: {},
      animationDurationUpdate: 1500,
      animationEasingUpdate: 'quinticInOut',
      series: [
        {
          type: 'graph',
          layout: 'force',
          force: {
            repulsion: 1000,
            edgeLength: 100,
            layoutAnimation: true
          },
          roam: true,
          label: {
            position: 'right',
            formatter: '{b}'
          },
          lineStyle: {
            color: 'source',
            curveness: 0.3,
            width: 2,
            opacity: 0.7
          },
          emphasis: {
            focus: 'adjacency',
            lineStyle: {
              width: 4,
              opacity: 1
            }
          },
          nodes: nodes,
          links: links
        }
      ]
    };
  }, []);

  return (
    <div style={{ width: '100%', height: '100%', minHeight: '600px', backgroundColor: '#0d1117', padding: '24px', borderRadius: '16px', border: '1px solid #30363d' }}>
      <h2 style={{ color: '#e6edf3', margin: '0 0 24px 0', fontFamily: 'Inter, sans-serif', fontSize: '1.5rem', fontWeight: 600 }}>Enterprise Network Topology</h2>
      <ReactECharts option={option} style={{ height: '600px', width: '100%' }} />
    </div>
  );
};

export default NetworkTopology;
