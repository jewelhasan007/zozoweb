import express from "express";
import cors from "cors";
import serverless from "serverless-http";
import connectDB from "../server/config/db.js";

import newsletterRoutes from "../server/routes/newsletterRoutes.js";
import authRoutes from "../server/routes/authRoutes.js"; // <-- create this if missing

const app = express();

app.use(cors({ origin: "*" }));
app.use(express.json());

let dbConnected = false;
app.use(async (req, res, next) => {
  if (!dbConnected) {
    dbConnected = true;
    connectDB().catch(console.error);
  }
  next();
});

app.use("/api/newsletter", newsletterRoutes); // fixed prefix
app.use("/api/auth", authRoutes);             // added

export default serverless(app);