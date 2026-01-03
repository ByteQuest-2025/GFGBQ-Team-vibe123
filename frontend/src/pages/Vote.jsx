import { useState } from "react";

const candidates = [
  { id: 1, name: "Candidate A" },
  { id: 2, name: "Candidate B" },
  { id: 3, name: "Candidate C" }
];

export default function Vote() {
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [message, setMessage] = useState("");

  const castVote = (name) => {
    setSelectedCandidate(name);
    setMessage(`Your vote for ${name} has been securely recorded.`);
  };

  const startVoiceVoting = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Speech recognition is not supported in this browser.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.start();

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript.toLowerCase();

      candidates.forEach((candidate) => {
        if (transcript.includes(candidate.name.toLowerCase())) {
          castVote(candidate.name);
        }
      });
    };
  };

  return (
    <main className="min-h-screen px-6 py-10">
      <h2 className="text-3xl font-bold mb-4" tabIndex="0">
        Cast Your Vote
      </h2>

      <button
        onClick={startVoiceVoting}
        className="mb-6 border border-white px-4 py-2 rounded-lg focus:outline-none focus:ring-4 focus:ring-yellow-400"
        aria-label="Vote using voice command"
      >
        🎤 Vote using Voice
      </button>

      <div className="grid gap-4 max-w-md">
        {candidates.map((candidate) => (
          <button
            key={candidate.id}
            onClick={() => castVote(candidate.name)}
            className={`border py-4 rounded-xl text-lg focus:outline-none focus:ring-4 focus:ring-yellow-400 ${
              selectedCandidate === candidate.name
                ? "bg-green-500 text-black"
                : "border-white"
            }`}
            aria-label={`Vote for ${candidate.name}`}
          >
            {candidate.name}
          </button>
        ))}
      </div>

      {message && (
        <p
          className="mt-6 text-lg text-green-400"
          tabIndex="0"
          aria-live="polite"
        >
          {message}
        </p>
      )}
    </main>
  );
}
