import Vote from "../models/Vote.js";
import crypto from "crypto";

export const submitVote = async (req, res) => {
  try {
    const { candidate, token } = req.body;

    if (!candidate || !token) {
      return res.status(400).json({
        success: false,
        message: "Candidate and token are required"
      });
    }

    const tokenHash = crypto
      .createHash("sha256")
      .update(token)
      .digest("hex");

    const alreadyUsed = await Vote.findOne({ tokenHash });
    if (alreadyUsed) {
      return res.status(403).json({
        success: false,
        message: "This voting token has already been used"
      });
    }

    await Vote.create({ candidate, tokenHash });

    res.json({
      success: true,
      message: "Vote recorded successfully"
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};
