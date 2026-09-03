import path from "path";
import { fileURLToPath } from "url";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDb } from "./config/db.js";
import { initCloudinary } from "./config/cloudinary.js";
import { errorHandler, notFound } from "./middleware/errorHandler.js";
import authRoutes from "./routes/auth.js";
import profileRoutes from "./routes/profile.js";
import skillsRoutes from "./routes/skills.js";
import experienceRoutes from "./routes/experience.js";
import projectsRoutes from "./routes/projects.js";
import certificationsRoutes from "./routes/certifications.js";
import educationRoutes from "./routes/education.js";
import contactRoutes from "./routes/contact.js";
import dashboardRoutes from "./routes/dashboard.js";

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const port = Number(process.env.PORT || 5000);

initCloudinary();

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps, curl, Render health checks)
      if (!origin) return callback(null, true);
      const allowed = [
        process.env.CLIENT_URL,
        "http://localhost:5173",
        "http://localhost:5174",
        "http://localhost:3000",
      ].filter(Boolean);
      if (allowed.includes(origin) || allowed.includes("*") || !process.env.CLIENT_URL) {
        return callback(null, true);
      }
      return callback(null, true);
    },
    credentials: true,
  })
);
app.use(express.json({ limit: "2mb" }));
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

// Root route for Render health checks and browser visits
app.get("/", (_req, res) => {
  res.json({
    success: true,
    message: "Ritesh Kumar Portfolio API is running live 🚀",
    health: "/api/health",
    endpoints: {
      profile: "/api/profile",
      skills: "/api/skills",
      experience: "/api/experience",
      projects: "/api/projects",
      certifications: "/api/certifications",
      education: "/api/education",
      contact: "/api/contact",
    },
  });
});

app.get("/health", (_req, res) => {
  res.json({ success: true, status: "ok" });
});

app.get("/favicon.ico", (_req, res) => res.status(204).end());

app.get("/api/health", (_req, res) => {
  res.json({ success: true, status: "ok" });
});

app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/skills", skillsRoutes);
app.use("/api/experience", experienceRoutes);
app.use("/api/projects", projectsRoutes);
app.use("/api/certifications", certificationsRoutes);
app.use("/api/education", educationRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/dashboard", dashboardRoutes);

app.use(notFound);
app.use(errorHandler);

connectDb()
  .then(() => {
    app.listen(port, () => {
      console.log(`API listening on http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error(error.message);
    process.exit(1);
  });
