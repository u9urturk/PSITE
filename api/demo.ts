import express from "express";
import serverless from "serverless-http";
import { handleDemo } from "../server/routes/demo";

const app = express();
app.get("/api/demo", handleDemo);

export default serverless(app);
