import 'dotenv/config';
import express, { Request, Response, NextFunction } from "express";
import session from "express-session";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcrypt";
import connectPgSimple from "connect-pg-simple";
import { registerRoutes } from "./routes";
import { createServer } from "http";
import { adminStorage } from "./adminStorage";

const app = express();
const httpServer = createServer(app);

// CORS (allow all for now)
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.sendStatus(200);
  next();
});

// Body parsing
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Session setup
const PgSession = connectPgSimple(session);

const sessionStore = process.env.DATABASE_URL
  ? new PgSession({
      conString: process.env.DATABASE_URL,
      tableName: "session",
      createTableIfMissing: true,
    })
  : undefined;

app.use(
  session({
    store: sessionStore,
    secret: process.env.SESSION_SECRET || "change-this-secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false, // IMPORTANT for Render (no HTTPS issues)
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    },
  })
);

// Passport
passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await adminStorage.getAdminUserByUsername(username);
      if (!user) return done(null, false);

      const valid = await bcrypt.compare(password, user.passwordHash);
      if (!valid) return done(null, false);

      return done(null, user);
    } catch (err) {
      return done(err);
    }
  })
);

passport.serializeUser((user: any, done) => done(null, user.id));

passport.deserializeUser(async (id: string, done) => {
  try {
    const user = await adminStorage.getAdminUser(id);
    done(null, user || false);
  } catch (err) {
    done(err);
  }
});

app.use(passport.initialize());
app.use(passport.session());

// Health check route
app.get("/", (_req, res) => {
  res.send("🚀 Humanity Recruitment API Running");
});

// Logging middleware
app.use((req, res, next) => {
  const start = Date.now();

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (req.path.startsWith("/api")) {
      console.log(`${req.method} ${req.path} ${res.statusCode} ${duration}ms`);
    }
  });

  next();
});

// Start server
(async () => {
  await registerRoutes(httpServer, app);

  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  });

  // 🔥 CRITICAL: use Render port
  const PORT = process.env.PORT || 3000;

  httpServer.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
})();
