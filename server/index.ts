import express from "express";
import cors from "cors";
import { handleDemo } from "./routes/demo";
import { contactRateLimited } from "./routes/contact";

export function createServer() {
  const app = express();

  // Netlify/production ortamında IP için trust proxy ayarı
  app.set('trust proxy', true);

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Example API routes
  app.get("/api/ping", (_req, res) => {
    res.json({ message: "Hello from Express server v2!" });
  });

  app.get("/api/demo", handleDemo);
  app.post("/api/contact", ...contactRateLimited);

  return app;
}
