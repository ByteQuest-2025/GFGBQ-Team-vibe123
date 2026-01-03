const express = require("express");
const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const router = express.Router();

const dataPath = path.join(__dirname, "../data/votes.json");

/* Utility functions */
const readData = () => {
  return JSON.parse(fs.readFileSync(dataPath, "utf8"));
};

const writeData = (data) => {
  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
};

/* 1️⃣ Get all candidates */
router.get("/candidates", (req, res) => {
  const data = readData();
  res.json(data.candidates);
});

/* 2️⃣ Cast a vote */
router.post("/cast", (req, res) => {
  const { candidateId } = req.body;

  if (!candidateId) {
    return res.status(400).json({ message: "Candidate ID required" });
  }

  const data = readData();

  // Unique voter ID (temporary)
  const voterId = uuidv4();

  // Prevent duplicate voting
  if (data.voters.includes(voterId)) {
    return res.status(403).json({ message: "Already voted" });
  }

  const candidate = data.candidates.find(
    (c) => c.id === candidateId
  );

  if (!candidate) {
    return res.status(404).json({ message: "Candidate not found" });
  }

  candidate.votes += 1;
  data.voters.push(voterId);

  writeData(data);

  res.json({
    message: "Vote cast successfully",
    candidate: candidate.name
  });
});

module.exports = router;
