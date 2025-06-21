// server/api/inngest.js
import express from "express";
import { serve } from "inngest/express";
import { inngest, functions } from "../inngest/index.js";

const router = express.Router();

// Attach Inngest serve route
router.use("/", serve({ client: inngest, functions }));

export default router;
