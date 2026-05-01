import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import connectDB from "./config/db.js";
import projectRoutes from "./routes/projectRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import settingsRoutes from "./routes/settingsRoutes.js";
import mongoose from "mongoose";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = process.env.PORT || 3000;

  // Connect to Database
  await connectDB();

  // CORS Configuration
  app.use(cors({
    origin: process.env.CORS_ORIGIN || "*",
    credentials: true
  }));

  app.use(express.json());

  // Request Logger
  app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
    next();
  });

  // Root Route
  app.get("/", (req, res) => {
    res.json({ message: "Portfolio API is online", timestamp: new Date() });
  });

  // API Routes
  app.use("/api/auth", authRoutes);
  app.use("/api/projects", projectRoutes);
  app.use("/api/settings", settingsRoutes);

  // Health check
  app.get("/api/health", (req, res) => {
    res.json({ 
      status: "ok", 
      message: "Portfolio API is running",
      mongodb: mongoose.connection.readyState === 1 
    });
  });

  // Global Error Handler
  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: "Something went wrong on the server" });
  });

  app.listen(PORT, () => {
    console.log(`🚀 API Server listening on port ${PORT}`);
  });
}

startServer();
