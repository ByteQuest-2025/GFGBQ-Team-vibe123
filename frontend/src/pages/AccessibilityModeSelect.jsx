import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useRef } from "react";
import { AccessibilityContext } from "../context/AccessibilityContext";

/* ================================
   Accessibility Modes
================================ */
const modes = [
  {
    id: "vision",
    keywords: ["blind", "low vision", "vision", "visually impaired"],
    title: "Low Vision / Blind Voters",
    desc: "Large text, high contrast, voice guidance",
    image: "/accessibility/low-vision.jpg",
    setup: (ctx) => {
      ctx.setFontSize("large");
      ctx.setContrast("high");
      ctx.setVoice(true);
    },
  },
  {
    id: "motor",
    keywords: ["hand", "movement", "motor", "keyboard"],
    title: "Limited Hand Movement",
    desc: "Keyboard-friendly, large buttons",
    image: "/accessibility/motor.jpg",
    setup: (ctx) => {
      ctx.setFontSize("large");
    },
  },
  {
    id: "cognitive",
    keywords: ["first time", "assisted", "thinking", "help"],
    title: "First-Time or Assisted Thinking",
    desc: "Step-by-step guidance with reassurance",
    image: "/accessibility/cognitive.jpg",
    setup: (ctx) => {
      ctx.setVoice(true);
    },
  },
  {
    id: "hearing",
    keywords: ["hearing", "speech", "deaf"],
    title: "Hearing or Speech Difficulty",
    desc: "Visual-only guidance, clear confirmations",
    image: "/accessibility/hearing.jpg",
    setup: () => {},
  },
  {
    id: "senior",
    keywords: ["senior", "elderly", "old"],
    title: "Senior Citizens",
    desc: "Large text, slow-paced, clear instructions",
    image: "/accessibility/senior.jpg",
    setup: (ctx) => {
      ctx.setFontSize("large");
    },
  },
  {
    id: "standard",
    keywords: ["standard", "normal", "default"],
    title: "Standard Voting",
    desc: "Accessible defaults with optional tools",
    image: "/accessibility/standard.jpg",
    setup: () => {},
  },
];

export default function AccessibilityModeSelect() {
  const navigate = useNavigate();
  const ctx = useContext(AccessibilityContext);
  const spokenOnce = useRef(false);
  const recognitionRef = useRef(null);

  /* ================================
     FORCE ENABLE VOICE
  ================================= */
  useEffect(() => {
    ctx.setVoice(true);
  }, []);

  /* ================================
     SPEAK FUNCTION
  ================================= */
  const speak = (text) => {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.9;
    window.speechSynthesis.speak(utterance);
  };

  /* ================================
     VOICE INSTRUCTIONS
  ================================= */
  const instructions =
    "Step 1 of 3. Choose your voting experience. " +
    "You are not voting yet. " +
    "You can say, for example: choose blind option, or select senior citizens. " +
    "You can also tap anywhere to hear these instructions again.";

  /* ================================
     START VOICE RECOGNITION
  ================================= */
  const startListening = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      speak("Voice recognition is not supported in this browser.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.continuous = true;
    recognition.interimResults = false;

    recognition.onresult = (event) => {
      const transcript = event.results[event.results.length - 1][0].transcript
        .toLowerCase();

      for (const mode of modes) {
        if (mode.keywords.some((k) => transcript.includes(k))) {
          speak(`${mode.title} selected.`);
          mode.setup(ctx);
          recognition.stop();
          navigate("/vote");
          return;
        }
      }

      speak("I did not understand. Please say the option again.");
    };

    recognition.start();
    recognitionRef.current = recognition;
  };

  /* ================================
     CLICK ANYWHERE HANDLER
  ================================= */
  const handlePageInteraction = (e) => {
    // Ignore clicks on cards
    if (e.target.closest("[data-card]")) return;

    if (!spokenOnce.current) {
      speak(instructions);
      startListening();
      spokenOnce.current = true;
    } else {
      speak(instructions);
    }
  };

  /* ================================
     CLEANUP
  ================================= */
  useEffect(() => {
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-100 to-emerald-100 px-6 py-10"
      onClick={handlePageInteraction}
      onKeyDown={handlePageInteraction}
      tabIndex={0}
      aria-label="Accessibility setup screen. Click or press any key for voice instructions."
    >

      {/* CARD 1 — STEP INFO */}
      <section className="max-w-6xl mx-auto bg-white rounded-3xl shadow-xl px-8 py-10 mb-10">
        <p className="text-sm font-medium text-gray-600 mb-2">
          Step 1 of 3
        </p>

        <div className="h-2 w-full bg-gray-200 rounded-full mb-8">
          <div className="h-2 w-1/3 bg-blue-600 rounded-full"></div>
        </div>

        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-3">
          Choose your voting experience
        </h1>

        <p className="text-center text-gray-600">
          This step sets up accessibility preferences. You are not voting yet.
        </p>
      </section>

      {/* CARD 2 — OPTIONS */}
      <section className="max-w-7xl mx-auto rounded-3xl bg-blue-50/70 px-8 py-10 shadow-lg">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {modes.map((mode) => (
            <button
              key={mode.id}
              data-card
              onClick={() => {
                speak(`${mode.title} selected.`);
                mode.setup(ctx);
                navigate("/vote");
              }}
              className="relative h-64 rounded-2xl overflow-hidden focus:ring-4 focus:ring-blue-400"
              aria-label={`Select ${mode.title}`}
            >
              <img
                src={mode.image}
                alt=""
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/45 to-transparent"></div>
              <div className="relative z-10 h-full flex flex-col justify-end p-6">
                <h2 className="text-2xl font-bold text-white">
                  {mode.title}
                </h2>
                <p className="text-white/90 text-sm">{mode.desc}</p>
              </div>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}
