import "dotenv/config";
import express from "express";
import cors from "cors";
import { handleDemo } from "./routes/demo";
import {
  getDashboardKPIs,
  getRealTimeData,
  getGeoData,
  getRevenueData
} from "./routes/analytics";

export function createServer() {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Example API routes
  app.get("/api/ping", (_req, res) => {
    const ping = process.env.PING_MESSAGE ?? "ping";
    res.json({ message: ping });
  });

  app.get("/api/demo", handleDemo);

  // Analytics API routes
  app.get("/api/analytics/kpis", getDashboardKPIs);
  app.get("/api/analytics/realtime", getRealTimeData);
  app.get("/api/analytics/geo", getGeoData);
  app.get("/api/analytics/revenue", getRevenueData);

  return app;
}
