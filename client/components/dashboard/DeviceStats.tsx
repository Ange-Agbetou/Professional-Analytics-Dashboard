import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { DeviceTypes } from '@shared/analytics';
import { Monitor, Smartphone, Tablet } from 'lucide-react';

interface DeviceStatsProps {
  data: DeviceTypes;
}

export function DeviceStats({ data }: DeviceStatsProps) {
  const chartData = [
    { name: 'Desktop', value: data.desktop, color: 'hsl(var(--neon-blue))', icon: Monitor },
    { name: 'Mobile', value: data.mobile, color: 'hsl(var(--neon-cyan))', icon: Smartphone },
    { name: 'Tablet', value: data.tablet, color: 'hsl(var(--neon-purple))', icon: Tablet },
  ];

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0];
      return (
        <div className="glass rounded-lg p-3 border border-white/20">
          <p className="text-sm font-medium">{data.name}</p>
          <p className="text-sm text-muted-foreground">{data.value}% of users</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="glass rounded-xl p-6">
      <h3 className="text-lg font-semibold mb-4">Device Usage</h3>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>
        
        <div className="space-y-3">
          {chartData.map((item, index) => {
            const Icon = item.icon;
            return (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/20">
                <div className="flex items-center gap-3">
                  <div 
                    className="p-2 rounded-lg"
                    style={{ backgroundColor: `${item.color}20` }}
                  >
                    <Icon className="w-4 h-4" style={{ color: item.color }} />
                  </div>
                  <span className="font-medium">{item.name}</span>
                </div>
                <span className="text-lg font-bold">{item.value}%</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
