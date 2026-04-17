import type { Express, Request, Response, NextFunction } from "express";
import passport from "passport";
import { adminStorage } from "./adminStorage";
import { z } from "zod";

// ─── Middleware ───────────────────────────────────────────────────────────────

function requireAuth(req: Request, res: Response, next: NextFunction) {
  if (req.isAuthenticated()) return next();
  res.status(401).json({ message: "Unauthorized" });
}

function requireRole(...roles: string[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = req.user as any;
    if (!user || !roles.includes(user.role)) {
      return res.status(403).json({ message: "Forbidden" });
    }
    next();
  };
}

// ─── Schemas ──────────────────────────────────────────────────────────────────

const createUserSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  username: z.string().min(3),
  password: z.string().min(6),
  role: z.enum(["admin", "core_team", "screener"]),
});

const createApplicationSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(10),
  city: z.string().optional(),
  programInterest: z.string().optional(),
  notes: z.string().optional(),
});

const assignSchema = z.object({
  applicationId: z.string(),
  screenerId: z.string(),
});

const interviewSchema = z.object({
  applicationId: z.string(),
  basicIntro: z.string().optional(),
  basicIntroOther: z.string().optional(),
  basicIntroNotes: z.string().optional(),
  sourceOfApplication: z.string().optional(),
  sourceOther: z.string().optional(),
  intentToApply: z.string().optional(),
  intentComment: z.string().optional(),
  candidateAligned: z.boolean().optional(),
  currentLocation: z.string().optional(),
  locationOther: z.string().optional(),
  openToOnGround: z.boolean().optional(),
  onlyOnline: z.boolean().optional(),
  willingToTravel: z.boolean().optional(),
  confirmsWeeklyCommitment: z.string().optional(),
  availabilityWeekdays: z.boolean().optional(),
  availabilityWeekends: z.boolean().optional(),
  availabilityMorning: z.boolean().optional(),
  availabilityAfternoon: z.boolean().optional(),
  availabilityEvening: z.boolean().optional(),
  selectedAreas: z.string().optional(),
  selectedAtLeast2Areas: z.boolean().optional(),
  comfortableWithTravel: z.boolean().optional(),
  areaComment: z.string().optional(),
  comfortableVisitingSchools: z.boolean().optional(),
  comfortableVisitingCCIs: z.boolean().optional(),
  commitmentDuration: z.string().optional(),
  recruitmentDayAttendance: z.string().optional(),
  agreesToBeActive: z.string().optional(),
  comfortableSharingContent: z.boolean().optional(),
  hasLongTermCommitment: z.boolean().optional(),
  reliabilityExample: z.string().optional(),
  finalConfirmation: z.string().optional(),
  decision: z.string().optional(),
  finalNotes: z.string().optional(),
});

// ─── Route Registration ───────────────────────────────────────────────────────

export function registerAdminRoutes(app: Express) {

  // ── Auth ────────────────────────────────────────────────────────────────────

  app.post("/api/admin/login", (req, res, next) => {
    passport.authenticate("local", (err: any, user: any, info: any) => {
      if (err) return next(err);
      if (!user) return res.status(401).json({ message: info?.message || "Invalid credentials" });
      req.logIn(user, (err) => {
        if (err) return next(err);
        const { passwordHash, ...safeUser } = user;
        res.json({ user: safeUser });
      });
    })(req, res, next);
  });

  app.post("/api/admin/logout", (req, res, next) => {
    req.logout((err) => {
      if (err) return next(err);
      res.json({ ok: true });
    });
  });

  app.get("/api/admin/me", requireAuth, (req, res) => {
    const user = req.user as any;
    const { passwordHash, ...safeUser } = user;
    res.json({ user: safeUser });
  });

  // ── Admin Users (admin only) ─────────────────────────────────────────────────

  app.get("/api/admin/users", requireAuth, requireRole("admin"), async (req, res, next) => {
    try {
      const users = await adminStorage.getAllAdminUsers();
      res.json(users.map(({ passwordHash, ...u }) => u));
    } catch (err) { next(err); }
  });

  app.post("/api/admin/users", requireAuth, requireRole("admin"), async (req, res, next) => {
    try {
      const data = createUserSchema.parse(req.body);
      const user = await adminStorage.createAdminUser(data);
      const { passwordHash, ...safeUser } = user;
      res.status(201).json(safeUser);
    } catch (err) { next(err); }
  });

  app.delete("/api/admin/users/:id", requireAuth, requireRole("admin"), async (req, res, next) => {
    try {
      const me = req.user as any;
      if (me.id === req.params.id) return res.status(400).json({ message: "Cannot delete yourself" });
      await adminStorage.deleteAdminUser(req.params.id);
      res.json({ ok: true });
    } catch (err) { next(err); }
  });

  app.patch("/api/admin/users/:id/password", requireAuth, requireRole("admin"), async (req, res, next) => {
    try {
      const { password } = z.object({ password: z.string().min(6) }).parse(req.body);
      await adminStorage.updateAdminUserPassword(req.params.id, password);
      res.json({ ok: true });
    } catch (err) { next(err); }
  });

  // ── Applications ─────────────────────────────────────────────────────────────

  app.get("/api/admin/applications", requireAuth, async (req, res, next) => {
    try {
      const apps = await adminStorage.getAllApplications();
      res.json(apps);
    } catch (err) { next(err); }
  });

  app.get("/api/admin/applications/:id", requireAuth, async (req, res, next) => {
    try {
      const app = await adminStorage.getApplication(req.params.id);
      if (!app) return res.status(404).json({ message: "Not found" });
      res.json(app);
    } catch (err) { next(err); }
  });

  app.post("/api/admin/applications", requireAuth, requireRole("admin"), async (req, res, next) => {
    try {
      const data = createApplicationSchema.parse(req.body);
      const app = await adminStorage.createApplication(data);
      res.status(201).json(app);
    } catch (err) { next(err); }
  });

  app.delete("/api/admin/applications/:id", requireAuth, requireRole("admin"), async (req, res, next) => {
    try {
      await adminStorage.deleteApplication(req.params.id);
      res.json({ ok: true });
    } catch (err) { next(err); }
  });

  // ── Assignments ──────────────────────────────────────────────────────────────

  app.get("/api/admin/assignments", requireAuth, async (req, res, next) => {
    try {
      const user = req.user as any;
      const list = user.role === "screener"
        ? await adminStorage.getAssignmentsByScreener(user.id)
        : await adminStorage.getAllAssignments();
      res.json(list);
    } catch (err) { next(err); }
  });

  app.post("/api/admin/assignments", requireAuth, requireRole("admin", "core_team"), async (req, res, next) => {
    try {
      const data = assignSchema.parse(req.body);
      const user = req.user as any;
      // Remove any existing assignment first
      const existing = await adminStorage.getAssignmentByApplication(data.applicationId);
      if (existing) await adminStorage.deleteAssignment(existing.id);
      const assignment = await adminStorage.createAssignment({ ...data, assignedById: user.id });
      res.status(201).json(assignment);
    } catch (err) { next(err); }
  });

  // ── Tele Interviews ──────────────────────────────────────────────────────────

  app.get("/api/admin/interviews/:applicationId", requireAuth, async (req, res, next) => {
    try {
      const interview = await adminStorage.getTeleInterview(req.params.applicationId);
      res.json(interview || null);
    } catch (err) { next(err); }
  });

  app.post("/api/admin/interviews", requireAuth, requireRole("admin", "core_team", "screener"), async (req, res, next) => {
    try {
      const data = interviewSchema.parse(req.body);
      const user = req.user as any;

      // Screeners can only submit for their assigned applications
      if (user.role === "screener") {
        const assignment = await adminStorage.getAssignmentByApplication(data.applicationId);
        if (!assignment || assignment.screenerId !== user.id) {
          return res.status(403).json({ message: "Not your assignment" });
        }
      }

      // Check if already exists — update instead
      const existing = await adminStorage.getTeleInterview(data.applicationId);
      if (existing) {
        await adminStorage.updateTeleInterview(existing.id, data);
        const updated = await adminStorage.getTeleInterview(data.applicationId);
        return res.json(updated);
      }

      const interview = await adminStorage.createTeleInterview({ ...data, conductedById: user.id });
      res.status(201).json(interview);
    } catch (err) { next(err); }
  });

  // ── Screeners list (for assignment dropdown) ─────────────────────────────────

  app.get("/api/admin/screeners", requireAuth, requireRole("admin", "core_team"), async (req, res, next) => {
    try {
      const users = await adminStorage.getAllAdminUsers();
      res.json(users.filter(u => u.role === "screener").map(({ passwordHash, ...u }) => u));
    } catch (err) { next(err); }
  });

  // ── Hostinger sync — pull new volunteer applications ─────────────────────────

  app.post("/api/admin/sync", requireAuth, requireRole("admin", "core_team"), async (req, res, next) => {
    try {
      const syncSecret = process.env.HOSTINGER_SYNC_SECRET || "hum_sync_7x4k9mQ2pRvL8wZnJdYe";
      const bridgeUrl = `https://humanityorg.foundation/backend/api/sync.php?secret=${syncSecret}`;

      const response = await fetch(bridgeUrl);
      if (!response.ok) {
        return res.status(502).json({ message: "Failed to reach Hostinger sync bridge" });
      }

      const payload = await response.json() as any;
      if (!payload.ok || !Array.isArray(payload.data)) {
        return res.status(502).json({ message: "Invalid response from sync bridge", payload });
      }

      const existing = await adminStorage.getAllApplications();
      const existingEmails = new Set(existing.map((a: any) => a.email.toLowerCase().trim()));

      let inserted = 0;
      for (const row of payload.data) {
        const email = (row.email || "").toLowerCase().trim();
        if (!email || existingEmails.has(email)) continue;

        const name = [row.first_name, row.last_name].filter(Boolean).join(" ").trim() || "Unknown";
        const notes = [
          row.occupation ? `Occupation: ${row.occupation}` : null,
          row.volunteer_type ? `Type: ${row.volunteer_type}` : null,
          row.dob ? `DOB: ${row.dob}` : null,
        ].filter(Boolean).join(" | ") || undefined;

        await adminStorage.createApplication({
          name,
          email,
          phone: row.phone || "",
          city: row.city || undefined,
          programInterest: row.projects || undefined,
          notes,
        });

        existingEmails.add(email);
        inserted++;
      }

      res.json({ ok: true, inserted, total: payload.count });
    } catch (err) { next(err); }
  });
}
