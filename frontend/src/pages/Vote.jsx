import { useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";

const candidates = [
  {
    id: 1,
    name: "Candidate A",
    keywords: ["candidate a", "a", "first"],
  },
  {
    id: 2,
    name: "Candidate B",
    keywords: ["candidate b", "b", "second"],
  },
  {
    id: 3,
    name: "Candidate C",
    keywords: ["candidate c", "c", "third"],
  },
];

export default function Vote() {
  const navigate = useNavigate();

  const hasSpokenInstructions = useRef(false);
  const recognitionRef = useRef(null);
  const listeningForCandidate = useRef(false);

  /* ================================
     TEXT TO SPEECH
  ================================= */
  const speak = (text, onEnd) => {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.85;

    if (onEnd) {
      utterance.onend = onEnd;
    }

    window.speechSynthesis.speak(utterance);
  };

  /* ================================
     START SPEECH RECOGNITION
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
      const transcript =
        e.results[e.results.length - 1][0].transcript.toLowerCase();

      /* ---------- CONTROL COMMANDS ---------- */
      if (transcript.includes("repeat")) {
        recognition.stop();
        hasSpokenInstructions.current = false;
        handleInteraction();
        return;
      }

      if (transcript.includes("i am going to vote")) {
        speak(
          "Microphone enabled. Please say the candidate name.",
          () => {
            listeningForCandidate.current = true;
          }
        );
        return;
      }

      /* ---------- CANDIDATE SELECTION ---------- */
      if (listeningForCandidate.current) {
        for (const c of candidates) {
          if (c.keywords.some((k) => transcript.includes(k))) {
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
      }
    };

    recognition.start();
    recognitionRef.current = recognition;
  };

  /* ================================
     CLICK ANYWHERE HANDLER
  ================================= */
  const handleInteraction = () => {
    if (hasSpokenInstructions.current) return;

    const instructionText =
      "Step 2 of 3. Select your candidate. " +
      "You can say Candidate A, Candidate B, or Candidate C. " +
      "If you are ready to vote, say I am going to vote. " +
      "If you want to hear this again, say repeat instructions.";

    speak(instructionText, () => {
      startListening();
    });

    hasSpokenInstructions.current = true;
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
      aria-label="Candidate selection screen for visually challenged users. Click anywhere for voice instructions."
    >
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

        {/* LARGE BUTTONS FOR LOW VISION */}
        <div className="flex flex-col gap-10">
          {candidates.map((c) => (
            <button
              key={c.id}
              onClick={() =>
                navigate("/confirm", {
                  state: { candidate: c.name },
                })
              }
              className="w-full py-10 px-8 rounded-3xl
                         bg-blue-600 text-white
                         text-3xl font-bold
                         focus:outline-none focus:ring-8 focus:ring-blue-300"
              aria-label={`Select ${c.name}`}
            >
              {c.name}
            </button>
          ))}
        </div>

        <p className="mt-12 text-lg text-gray-600 text-center">
          Click anywhere to hear instructions. You may also vote using voice.
        </p>
      </section>
    </div>
  );
}
