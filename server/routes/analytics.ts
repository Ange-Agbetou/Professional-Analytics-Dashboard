import { RequestHandler } from "express";

// Simulate real-time data with some variance
const generateRandomData = (base: number, variance: number = 0.1) => {
  return Math.floor(base * (1 + (Math.random() - 0.5) * variance));
};

const generateTimeSeriesData = (points: number = 24) => {
  const data = [];
  const now = new Date();
  
  for (let i = points - 1; i >= 0; i--) {
    const timestamp = new Date(now.getTime() - i * 60 * 60 * 1000); // hourly data
    data.push({
      time: timestamp.toISOString(),
      value: generateRandomData(Math.random() * 1000 + 500, 0.3),
      users: generateRandomData(Math.random() * 200 + 100, 0.2),
      revenue: generateRandomData(Math.random() * 5000 + 2000, 0.15),
    });
  }
  
  return data;
};

// Get dashboard KPIs
export const getDashboardKPIs: RequestHandler = (req, res) => {
  const kpis = {
    totalUsers: generateRandomData(45230, 0.05),
    totalRevenue: generateRandomData(128500, 0.08),
    conversionRate: (Math.random() * 5 + 2).toFixed(2),
    activeNow: generateRandomData(1840, 0.15),
    growth: {
      users: (Math.random() * 20 + 5).toFixed(1),
      revenue: (Math.random() * 15 + 8).toFixed(1),
      conversion: (Math.random() * 3 + 1).toFixed(1),
      active: (Math.random() * 25 + 10).toFixed(1),
    }
  };
  
  res.json(kpis);
};

// Get real-time analytics data
export const getRealTimeData: RequestHandler = (req, res) => {
  const data = {
    timestamp: new Date().toISOString(),
    metrics: {
      pageViews: generateRandomData(1250, 0.1),
      uniqueVisitors: generateRandomData(890, 0.1),
      bounceRate: (Math.random() * 30 + 20).toFixed(1),
      avgSessionDuration: Math.floor(Math.random() * 300 + 180), // seconds
    },
    chartData: generateTimeSeriesData(24),
    topPages: [
      { path: "/dashboard", views: generateRandomData(450, 0.1) },
      { path: "/analytics", views: generateRandomData(320, 0.1) },
      { path: "/users", views: generateRandomData(280, 0.1) },
      { path: "/settings", views: generateRandomData(150, 0.1) },
      { path: "/reports", views: generateRandomData(120, 0.1) },
    ],
    deviceTypes: {
      desktop: generateRandomData(65, 0.05),
      mobile: generateRandomData(30, 0.05),
      tablet: generateRandomData(5, 0.1),
    },
    traffic: generateTimeSeriesData(12).map(point => ({
      time: point.time,
      organic: generateRandomData(60, 0.2),
      direct: generateRandomData(25, 0.2),
      social: generateRandomData(10, 0.3),
      referral: generateRandomData(5, 0.4),
    }))
  };
  
  res.json(data);
};

// Get geographical data
export const getGeoData: RequestHandler = (req, res) => {
  const countries = [
    { country: "United States", users: generateRandomData(15000, 0.1), code: "US" },
    { country: "United Kingdom", users: generateRandomData(8500, 0.1), code: "GB" },
    { country: "Germany", users: generateRandomData(6200, 0.1), code: "DE" },
    { country: "France", users: generateRandomData(5800, 0.1), code: "FR" },
    { country: "Canada", users: generateRandomData(4200, 0.1), code: "CA" },
    { country: "Australia", users: generateRandomData(3100, 0.1), code: "AU" },
    { country: "Japan", users: generateRandomData(2800, 0.1), code: "JP" },
    { country: "Brazil", users: generateRandomData(2400, 0.1), code: "BR" },
  ];
  
  res.json(countries);
};

// Get revenue analytics
export const getRevenueData: RequestHandler = (req, res) => {
  const revenueData = {
    daily: generateTimeSeriesData(30).map(point => ({
      date: point.time,
      revenue: point.revenue,
      orders: generateRandomData(50, 0.2),
      avgOrderValue: (point.revenue / generateRandomData(50, 0.2)).toFixed(2),
    })),
    monthly: Array.from({ length: 12 }, (_, i) => {
      const month = new Date(2024, i, 1).toLocaleDateString('en-US', { month: 'short' });
      return {
        month,
        revenue: generateRandomData(50000, 0.15),
        target: 55000,
        growth: (Math.random() * 20 + 5).toFixed(1),
      };
    }),
    categories: [
      { name: "Premium Plans", revenue: generateRandomData(45000, 0.1), percentage: 35 },
      { name: "Basic Plans", revenue: generateRandomData(32000, 0.1), percentage: 25 },
      { name: "Enterprise", revenue: generateRandomData(28000, 0.1), percentage: 22 },
      { name: "Add-ons", revenue: generateRandomData(18000, 0.1), percentage: 14 },
      { name: "Other", revenue: generateRandomData(5000, 0.1), percentage: 4 },
    ]
  };
  
  res.json(revenueData);
};
