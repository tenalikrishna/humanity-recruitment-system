import type { Express } from "express";
import { type Server } from "http";
import { registerAdminRoutes } from "./adminRoutes";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {

  // ✅ Health check (useful for Render + debugging)
  app.get("/api/health", (req, res) => {
    res.json({
      status: "ok",
      message: "HUManity Recruitment API running",
      timestamp: new Date().toISOString(),
    });
  });

  // ✅ ONLY keep recruitment / admin routes
  registerAdminRoutes(app);

  return httpServer;
}
