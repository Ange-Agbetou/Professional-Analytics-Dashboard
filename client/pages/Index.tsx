import { useState, useEffect } from 'react';
import {
  Users,
  DollarSign,
  TrendingUp,
  Activity,
  RefreshCw,
  Settings,
  Bell,
  Search
} from 'lucide-react';
import { KPICard } from '@/components/dashboard/KPICard';
import { RealTimeChart } from '@/components/dashboard/RealTimeChart';
import { TrafficChart } from '@/components/dashboard/TrafficChart';
import { DeviceStats } from '@/components/dashboard/DeviceStats';
import { TopPages } from '@/components/dashboard/TopPages';
import { DashboardFilters } from '@/components/dashboard/DashboardFilters';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { DashboardKPIs, RealTimeData } from '@shared/analytics';

export default function Index() {
  const [kpis, setKpis] = useState<DashboardKPIs | null>(null);
  const [realTimeData, setRealTimeData] = useState<RealTimeData | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [selectedDateRange, setSelectedDateRange] = useState('24h');
  const [selectedMetric, setSelectedMetric] = useState('all');

  const fetchDashboardData = async () => {
    try {
      setIsRefreshing(true);
      
      const [kpisResponse, realTimeResponse] = await Promise.all([
        fetch('/api/analytics/kpis'),
        fetch('/api/analytics/realtime')
      ]);
      
      const kpisData = await kpisResponse.json();
      const realTimeDataResult = await realTimeResponse.json();
      
      setKpis(kpisData);
      setRealTimeData(realTimeDataResult);
      setLastUpdated(new Date());
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
    
    // Refresh data every 30 seconds
    const interval = setInterval(fetchDashboardData, 30000);
    
    return () => clearInterval(interval);
  }, []);

  const handleRefresh = () => {
    fetchDashboardData();
  };

  const handleDateRangeChange = (range: string) => {
    setSelectedDateRange(range);
    // In a real app, this would trigger data fetching with the new range
    console.log('Date range changed to:', range);
  };

  const handleMetricChange = (metric: string) => {
    setSelectedMetric(metric);
    // In a real app, this would filter the displayed metrics
    console.log('Metric filter changed to:', metric);
  };

  const handleExport = () => {
    // In a real app, this would generate and download a report
    const exportData = {
      kpis,
      realTimeData,
      dateRange: selectedDateRange,
      metric: selectedMetric,
      exportedAt: new Date().toISOString()
    };

    const dataStr = JSON.stringify(exportData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });

    const link = document.createElement('a');
    link.href = URL.createObjectURL(dataBlob);
    link.download = `analytics-report-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
  };

  if (!kpis || !realTimeData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="glass rounded-xl p-8 text-center">
          <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="glass border-b border-white/10 sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-br from-neon-blue to-neon-purple rounded-lg flex items-center justify-center">
                  <Activity className="w-5 h-5 text-white" />
                </div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-neon-blue to-neon-purple bg-clip-text text-transparent">
                  Professional Analytics Dashboard
                </h1>
              </div>
              
              <div className="hidden md:flex items-center gap-2 text-sm text-muted-foreground">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse-neon"></div>
                <span>Live data</span>
                <span>•</span>
                <span>Updated {lastUpdated.toLocaleTimeString()}</span>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="relative hidden md:block">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                <Input 
                  placeholder="Search..." 
                  className="pl-10 w-64 glass border-white/20" 
                />
              </div>
              
              <Button 
                variant="ghost" 
                size="sm"
                onClick={handleRefresh}
                disabled={isRefreshing}
                className="glass hover:bg-white/10"
              >
                <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
              </Button>
              
              <Button variant="ghost" size="sm" className="glass hover:bg-white/10">
                <Bell className="w-4 h-4" />
              </Button>
              
              <Button variant="ghost" size="sm" className="glass hover:bg-white/10">
                <Settings className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8 space-y-8">
        {/* Dashboard Filters */}
        <DashboardFilters
          onDateRangeChange={handleDateRangeChange}
          onMetricChange={handleMetricChange}
          onExport={handleExport}
        />

        {/* KPI Cards */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <KPICard
            title="Total Users"
            value={kpis.totalUsers.toLocaleString()}
            change={kpis.growth.users}
            changeType="positive"
            icon={Users}
            className="animate-float"
          />
          <KPICard
            title="Revenue"
            value={`$${(kpis.totalRevenue / 1000).toFixed(1)}k`}
            change={kpis.growth.revenue}
            changeType="positive"
            icon={DollarSign}
            className="animate-float [animation-delay:0.2s]"
          />
          <KPICard
            title="Conversion Rate"
            value={`${kpis.conversionRate}%`}
            change={kpis.growth.conversion}
            changeType="positive"
            icon={TrendingUp}
            className="animate-float [animation-delay:0.4s]"
          />
          <KPICard
            title="Active Now"
            value={kpis.activeNow.toLocaleString()}
            change={kpis.growth.active}
            changeType="positive"
            icon={Activity}
            className="animate-float [animation-delay:0.6s]"
          />
        </section>

        {/* Main Charts */}
        <section className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <RealTimeChart
            data={realTimeData.chartData}
            title="Page Views"
            dataKey="value"
            color="hsl(var(--neon-blue))"
          />
          <RealTimeChart
            data={realTimeData.chartData}
            title="Active Users"
            dataKey="users"
            color="hsl(var(--neon-cyan))"
          />
        </section>

        {/* Traffic Sources */}
        <section className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <div className="xl:col-span-2">
            <TrafficChart data={realTimeData.traffic} />
          </div>
          <div className="space-y-6">
            <DeviceStats data={realTimeData.deviceTypes} />
          </div>
        </section>

        {/* Secondary Metrics */}
        <section className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          <TopPages data={realTimeData.topPages} />
          
          <div className="glass rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-4">Current Metrics</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Page Views</span>
                <span className="font-semibold">{realTimeData.metrics.pageViews.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Unique Visitors</span>
                <span className="font-semibold">{realTimeData.metrics.uniqueVisitors.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Bounce Rate</span>
                <span className="font-semibold">{realTimeData.metrics.bounceRate}%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Avg. Session</span>
                <span className="font-semibold">
                  {Math.floor(realTimeData.metrics.avgSessionDuration / 60)}m {realTimeData.metrics.avgSessionDuration % 60}s
                </span>
              </div>
            </div>
          </div>
          
          <div className="glass rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-4">System Status</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse-neon"></div>
                <span className="text-sm">Real-time data active</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse-neon"></div>
                <span className="text-sm">API endpoints healthy</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse-neon"></div>
                <span className="text-sm">Database connected</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse-neon"></div>
                <span className="text-sm">Cache 89% efficiency</span>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
