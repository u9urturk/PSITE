import express from "express";
import serverless from "serverless-http";

const app = express();
app.get("/api/ping", (_req, res) => {
  res.json({ message: "Hello from Express server v2!" });
});

export default serverless(app);
