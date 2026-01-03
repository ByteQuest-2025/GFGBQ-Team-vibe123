import { useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";

const candidates = [
  {
    id: 1,
    name: "Candidate A",
    keywords: ["a", "candidate a", "first"],
  },
  {
    id: 2,
    name: "Candidate B",
    keywords: ["b", "candidate b", "second"],
  },
  {
    id: 3,
    name: "Candidate C",
    keywords: ["c", "candidate c", "third"],
  },
];

export default function Vote() {
  const navigate = useNavigate();
  const spokenOnce = useRef(false);
  const recognitionRef = useRef(null);

  /* ================================
     SPEAK FUNCTION
  ================================= */
  const speak = (text) => {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.rate = 0.85; // slower for clarity
    window.speechSynthesis.speak(u);
  };

  /* ================================
     START VOICE RECOGNITION
  ================================= */
  const startListening = () => {
    const SR =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SR) {
      speak("Voice recognition is not supported on this browser.");
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
          speak(`${c.name} selected. Moving to confirmation.`);
          recognition.stop();
          navigate("/confirm", {
            state: { candidate: c.name },
          });
          return;
        }
      }

      speak(
        "I did not understand. Please say Candidate A, Candidate B, or Candidate C."
      );
    };

    recognition.start();
    recognitionRef.current = recognition;
  };

  /* ================================
     CLICK ANYWHERE HANDLER
  ================================= */
  const handleInteraction = (e) => {
    // Ignore candidate button clicks
    if (e.target.closest("[data-candidate]")) return;

    if (!spokenOnce.current) {
      speak(
        "Step 2 of 3. Select your candidate. " +
          "You can say Candidate A, Candidate B, or Candidate C. " +
          "You can also click on a large button."
      );
      startListening();
      spokenOnce.current = true;
    } else {
      speak("Please select your candidate.");
    }
  };

  /* ================================
     CLEANUP
  ================================= */
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
      aria-label="Candidate selection screen for visually challenged users. Click or press any key for voice instructions."
    >
      {/* =========================
          MAIN CARD
      ========================== */}
      <section className="max-w-5xl mx-auto bg-white rounded-3xl shadow-xl px-10 py-12">
        <p className="text-base font-medium text-gray-600 mb-4">
          Step 2 of 3
        </p>

        <div className="h-3 bg-gray-200 rounded-full mb-10">
          <div className="h-3 w-2/3 bg-blue-600 rounded-full"></div>
        </div>

        <h1 className="text-4xl font-bold text-center mb-10">
          Select Your Candidate
        </h1>

        {/* =========================
            LARGE CANDIDATE OPTIONS
        ========================== */}
        <div className="flex flex-col gap-10">
          {candidates.map((c) => (
            <button
              key={c.id}
              data-candidate
              onClick={() =>
                navigate("/confirm", {
                  state: { candidate: c.name },
                })
              }
              className="w-full py-10 px-8 rounded-3xl
                         bg-blue-600 text-white
                         text-3xl font-bold
                         focus:outline-none focus:ring-8 focus:ring-blue-300
                         hover:bg-blue-700 transition"
              aria-label={`Select ${c.name}`}
            >
              {c.name}
            </button>
          ))}
        </div>

        <p className="mt-12 text-lg text-gray-600 text-center">
          You may click anywhere or speak to make your selection.
        </p>
      </section>
    </div>
  );
}
