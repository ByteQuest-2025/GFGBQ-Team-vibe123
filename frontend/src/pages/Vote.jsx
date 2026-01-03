import { useState } from "react";
import { useNavigate } from "react-router-dom";


const candidates = [
  { id: 1, name: "Candidate A" },
  { id: 2, name: "Candidate B" },
  { id: 3, name: "Candidate C" }
];

export default function Vote() {
  const [selected, setSelected] = useState(null);
  const [message, setMessage] = useState("");
  const [listening, setListening] = useState(false);
    const navigate = useNavigate();


  const castVote = (name) => {
    setSelected(name);
    setTimeout(() => {
    navigate("/confirm");
  }, 800);
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
    <main className="min-h-screen flex items-center justify-center px-6 bg-gradient-to-br from-black via-gray-900 to-black text-white page-transition
">
        <div className="w-full max-w-md flex flex-col items-center gap-6">

      <h2 className="text-4xl font-bold mb-8 tracking-tight" tabIndex="0">
        Cast Your Vote
      </h2>

      <button
        onClick={startVoiceVoting}
        className="mb-8 px-8 py-3 rounded-full border border-green-400/60
hover:bg-green-500/10 transition-all duration-300
focus:outline-none focus:ring-4 focus:ring-green-400/50"
        aria-label="Vote using voice"
      >
        🎤 Vote using Voice {listening && "(Listening...)"}
      </button>

      <div className="flex flex-col items-center gap-5 w-full max-w-lg mx-auto">
        {candidates.map((c) => (
          <button
            key={c.id}
            onClick={() => castVote(c.name)}
            className={`w-full min-w-[320px] max-w-lg p-6 rounded-2xl text-xl border 
transition-all duration-300 flex items-center justify-center focus:outline-none focus:ring-4 focus:ring-green-400/50
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

      
       </div>
    </main>
  );
}
