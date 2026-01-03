const express = require("express");
const fs = require("fs");
const path = require("path");

const router = express.Router();
const dataPath = path.join(__dirname, "../data/votes.json");

// Helper: read data
function readData() {
  const raw = fs.readFileSync(dataPath);
  return JSON.parse(raw);
}

// Helper: write data
function writeData(data) {
  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
}

/**
 * POST /api/vote
 * body: { voterId, candidateId }
 */
router.post("/", (req, res) => {
  const { voterId, candidateId } = req.body;

  if (!voterId || !candidateId) {
    return res.status(400).json({ message: "Missing voterId or candidateId" });
  }

  const data = readData();

  // 🔒 Anti-double voting check
  if (data.voters.includes(voterId)) {
    return res.status(403).json({ message: "You have already voted" });
  }

  const candidate = data.candidates.find(
    (c) => c.id === candidateId
  );

  if (!candidate) {
    return res.status(404).json({ message: "Candidate not found" });
  }

  // ✅ Record vote
  candidate.votes += 1;
  data.voters.push(voterId);

  writeData(data);

  res.json({
    message: "Vote recorded successfully",
    candidate: candidate.name,
  });
});

module.exports = router;
