import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

const candidates = [
  { id: 1, name: "Candidate A", keywords: ["a", "first", "candidate a"] },
  { id: 2, name: "Candidate B", keywords: ["b", "second", "candidate b"] },
  { id: 3, name: "Candidate C", keywords: ["c", "third", "candidate c"] },
];

export default function Vote() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(null);
  const spokenOnce = useRef(false);
  const recognitionRef = useRef(null);

  /* ================================
     SPEAK FUNCTION
  ================================= */
  const speak = (text) => {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.rate = 0.9;
    window.speechSynthesis.speak(u);
  };

  /* ================================
     START VOICE RECOGNITION
  ================================= */
  const startListening = () => {
    const SR =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) {
      speak("Voice recognition not supported.");
      return;
    }

    const recognition = new SR();
    recognition.lang = "en-US";
    recognition.continuous = true;

    recognition.onresult = (e) => {
      const text =
        e.results[e.results.length - 1][0].transcript.toLowerCase();

      for (const c of candidates) {
        if (c.keywords.some((k) => text.includes(k))) {
          speak(`${c.name} selected.`);
          recognition.stop();
          navigate("/confirm", { state: { candidate: c.name } });
          return;
        }
      }

      speak("I did not understand. Please say the candidate again.");
    };

    recognition.start();
    recognitionRef.current = recognition;
  };

  /* ================================
     GLOBAL INTERACTION
  ================================= */
  const handleInteraction = (e) => {
    if (e.target.closest("[data-candidate]")) return;

    if (!spokenOnce.current) {
      speak(
        "Step 2 of 3. Select your candidate. " +
        "You can say, for example: Select candidate A. " +
        "You may also click on a candidate."
      );
      startListening();
      spokenOnce.current = true;
    } else {
      speak("Please select your candidate.");
    }
  };

  useEffect(() => {
    return () => {
      if (recognitionRef.current) recognitionRef.current.stop();
    };
  }, []);

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-100 to-emerald-100
                 px-6 py-10"
      tabIndex={0}
      onClick={handleInteraction}
      onKeyDown={handleInteraction}
      aria-label="Candidate selection screen. Click or press any key for voice instructions."
    >
      {/* CARD */}
      <section className="max-w-5xl mx-auto bg-white rounded-3xl shadow-xl px-8 py-10">
        <p className="text-sm text-gray-600 mb-2">Step 2 of 3</p>

        <div className="h-2 bg-gray-200 rounded-full mb-8">
          <div className="h-2 w-2/3 bg-blue-600 rounded-full"></div>
        </div>

        <h1 className="text-3xl font-bold text-center mb-6">
          Select your candidate
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {candidates.map((c) => (
            <button
              key={c.id}
              data-candidate
              onClick={() =>
                navigate("/confirm", { state: { candidate: c.name } })
              }
              className="p-8 rounded-2xl bg-blue-50 hover:bg-blue-100
                         focus:ring-4 focus:ring-blue-400"
              aria-label={`Select ${c.name}`}
            >
              <h2 className="text-xl font-semibold">{c.name}</h2>
              <p className="text-sm text-gray-600 mt-2">
                Click or say “{c.name}”
              </p>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}
