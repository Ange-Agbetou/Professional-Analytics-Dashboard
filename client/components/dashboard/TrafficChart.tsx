import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend
} from 'recharts';
import { TrafficSource } from '@shared/analytics';

interface TrafficChartProps {
  data: TrafficSource[];
}

export function TrafficChart({ data }: TrafficChartProps) {
  const formatTime = (timeString: string) => {
    return new Date(timeString).toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="glass rounded-lg p-3 border border-white/20">
          <p className="text-sm text-muted-foreground mb-2">
            {new Date(label).toLocaleString()}
          </p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.dataKey}: {entry.value}%
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="glass rounded-xl p-6 h-80">
      <h3 className="text-lg font-semibold mb-4">Traffic Sources</h3>
      
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
          <XAxis 
            dataKey="time" 
            tickFormatter={formatTime}
            stroke="hsl(var(--muted-foreground))"
            fontSize={12}
          />
          <YAxis 
            stroke="hsl(var(--muted-foreground))"
            fontSize={12}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Area 
            type="monotone" 
            dataKey="organic" 
            stackId="1"
            stroke="hsl(var(--neon-blue))"
            fill="hsl(var(--neon-blue) / 0.6)"
            name="Organic"
          />
          <Area 
            type="monotone" 
            dataKey="direct" 
            stackId="1"
            stroke="hsl(var(--neon-cyan))"
            fill="hsl(var(--neon-cyan) / 0.6)"
            name="Direct"
          />
          <Area 
            type="monotone" 
            dataKey="social" 
            stackId="1"
            stroke="hsl(var(--neon-purple))"
            fill="hsl(var(--neon-purple) / 0.6)"
            name="Social"
          />
          <Area 
            type="monotone" 
            dataKey="referral" 
            stackId="1"
            stroke="hsl(var(--neon-pink))"
            fill="hsl(var(--neon-pink) / 0.6)"
            name="Referral"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
