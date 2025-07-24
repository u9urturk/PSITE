import express from "express";
import serverless from "serverless-http";
import { contactRateLimited } from "..//server/routes/contact";

const app = express();
app.use(express.json());
app.post("/api/contact", ...contactRateLimited);

export default serverless(app);
