import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { TimeSeriesDataPoint } from '@shared/analytics';

interface RealTimeChartProps {
  data: TimeSeriesDataPoint[];
  title: string;
  dataKey: keyof TimeSeriesDataPoint;
  color?: string;
}

export function RealTimeChart({ data, title, dataKey, color = "#0ea5e9" }: RealTimeChartProps) {
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
          <p className="text-sm text-muted-foreground">
            {new Date(label).toLocaleString()}
          </p>
          <p className="text-sm font-medium">
            <span className="text-primary">{title}:</span> {payload[0].value.toLocaleString()}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="glass rounded-xl p-6 h-80">
      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
        {title}
        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse-neon"></div>
        <span className="text-xs text-muted-foreground">LIVE</span>
      </h3>
      
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
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
          <Line 
            type="monotone" 
            dataKey={dataKey} 
            stroke={color}
            strokeWidth={3}
            dot={false}
            strokeLinecap="round"
            filter="url(#glow)"
          />
          <defs>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge> 
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
