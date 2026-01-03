import { useState } from "react";

const candidates = [
  { id: 1, name: "Candidate A" },
  { id: 2, name: "Candidate B" },
  { id: 3, name: "Candidate C" }
];

export default function Vote() {
  const [selected, setSelected] = useState(null);
  const [message, setMessage] = useState("");
  const [listening, setListening] = useState(false);

  const castVote = (name) => {
    setSelected(name);
    setMessage(`Your vote for ${name} has been securely recorded.`);
  };

  const startVoiceVoting = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Voice recognition not supported in this browser");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.start();
    setListening(true);

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript.toLowerCase();
      setListening(false);

      candidates.forEach((c) => {
        if (transcript.includes(c.name.toLowerCase())) {
          castVote(c.name);
        }
      });
    };

    recognition.onerror = () => {
      setListening(false);
    };
  };

  return (
    <main className="min-h-screen px-6 py-12 bg-gradient-to-br from-black via-gray-900 to-black text-white">
      <h2 className="text-4xl font-bold mb-8 tracking-tight" tabIndex="0">
        Cast Your Vote
      </h2>

      <button
        onClick={startVoiceVoting}
        className="mb-8 px-6 py-3 rounded-full border border-green-400 text-lg hover:bg-green-500 hover:text-black transition shadow-lg"
        aria-label="Vote using voice"
      >
        🎤 Vote using Voice {listening && "(Listening...)"}
      </button>

      <div className="grid gap-4 max-w-md">
        {candidates.map((c) => (
          <button
            key={c.id}
            onClick={() => castVote(c.name)}
            className={`p-6 rounded-2xl text-xl border transition-all duration-300 flex justify-between items-center
              ${
                selected === c.name
                  ? "bg-green-500 text-black scale-105 shadow-2xl"
                  : "bg-black/40 border-gray-600 hover:border-white hover:scale-105"
              }`}
            aria-label={`Vote for ${c.name}`}
          >
            {c.name}
          </button>
        ))}
      </div>

      {message && (
        <p className="mt-8 text-green-400 text-lg font-semibold animate-pulse" tabIndex="0">
          {message}
        </p>
      )}
    </main>
  );
}
