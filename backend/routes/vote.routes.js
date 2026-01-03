import express from "express";
import { submitVote } from "../controllers/vote.controller.js";
import rateLimiter from "../middleware/rateLimiter.js";

const router = express.Router();

router.post("/", rateLimiter, submitVote);

export default router;
