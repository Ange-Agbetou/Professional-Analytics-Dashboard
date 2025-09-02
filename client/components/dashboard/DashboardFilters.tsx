import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Calendar, Filter, Download, Share } from 'lucide-react';

interface DashboardFiltersProps {
  onDateRangeChange: (range: string) => void;
  onMetricChange: (metric: string) => void;
  onExport: () => void;
}

export function DashboardFilters({ 
  onDateRangeChange, 
  onMetricChange, 
  onExport 
}: DashboardFiltersProps) {
  const [selectedDateRange, setSelectedDateRange] = useState('24h');
  const [selectedMetric, setSelectedMetric] = useState('all');

  const handleDateRangeChange = (value: string) => {
    setSelectedDateRange(value);
    onDateRangeChange(value);
  };

  const handleMetricChange = (value: string) => {
    setSelectedMetric(value);
    onMetricChange(value);
  };

  return (
    <div className="glass rounded-xl p-4 mb-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium">Filters</span>
          </div>
          
          <Select value={selectedDateRange} onValueChange={handleDateRangeChange}>
            <SelectTrigger className="w-40 glass border-white/20">
              <Calendar className="w-4 h-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="glass border-white/20">
              <SelectItem value="1h">Last Hour</SelectItem>
              <SelectItem value="24h">Last 24 Hours</SelectItem>
              <SelectItem value="7d">Last 7 Days</SelectItem>
              <SelectItem value="30d">Last 30 Days</SelectItem>
              <SelectItem value="90d">Last 90 Days</SelectItem>
            </SelectContent>
          </Select>

          <Select value={selectedMetric} onValueChange={handleMetricChange}>
            <SelectTrigger className="w-40 glass border-white/20">
              <SelectValue placeholder="Metric" />
            </SelectTrigger>
            <SelectContent className="glass border-white/20">
              <SelectItem value="all">All Metrics</SelectItem>
              <SelectItem value="users">Users Only</SelectItem>
              <SelectItem value="revenue">Revenue Only</SelectItem>
              <SelectItem value="traffic">Traffic Only</SelectItem>
              <SelectItem value="conversion">Conversions</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="glass border-white/20 hover:bg-white/10"
          >
            <Share className="w-4 h-4 mr-2" />
            Share
          </Button>
          
          <Button 
            variant="outline" 
            size="sm" 
            onClick={onExport}
            className="glass border-white/20 hover:bg-white/10"
          >
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>
    </div>
  );
}
