export interface DashboardKPIs {
  totalUsers: number;
  totalRevenue: number;
  conversionRate: string;
  activeNow: number;
  growth: {
    users: string;
    revenue: string;
    conversion: string;
    active: string;
  };
}

export interface TimeSeriesDataPoint {
  time: string;
  value: number;
  users: number;
  revenue: number;
}

export interface RealTimeMetrics {
  pageViews: number;
  uniqueVisitors: number;
  bounceRate: string;
  avgSessionDuration: number;
}

export interface TopPage {
  path: string;
  views: number;
}

export interface DeviceTypes {
  desktop: number;
  mobile: number;
  tablet: number;
}

export interface TrafficSource {
  time: string;
  organic: number;
  direct: number;
  social: number;
  referral: number;
}

export interface RealTimeData {
  timestamp: string;
  metrics: RealTimeMetrics;
  chartData: TimeSeriesDataPoint[];
  topPages: TopPage[];
  deviceTypes: DeviceTypes;
  traffic: TrafficSource[];
}

export interface GeoData {
  country: string;
  users: number;
  code: string;
}

export interface DailyRevenue {
  date: string;
  revenue: number;
  orders: number;
  avgOrderValue: string;
}

export interface MonthlyRevenue {
  month: string;
  revenue: number;
  target: number;
  growth: string;
}

export interface RevenueCategory {
  name: string;
  revenue: number;
  percentage: number;
}

export interface RevenueData {
  daily: DailyRevenue[];
  monthly: MonthlyRevenue[];
  categories: RevenueCategory[];
}
