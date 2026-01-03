import mongoose from "mongoose";

const voteSchema = new mongoose.Schema({
  candidate: {
    type: String,
    required: true,
    enum: ["Candidate A", "Candidate B", "Candidate C"]
  },
  tokenHash: {
    type: String,
    required: true,
    unique: true
  },
  votedAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model("Vote", voteSchema);
