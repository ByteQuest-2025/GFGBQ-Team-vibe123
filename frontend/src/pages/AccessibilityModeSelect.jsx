import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useRef } from "react";
import { AccessibilityContext } from "../context/AccessibilityContext";

/* ================================
   Accessibility Modes
================================ */
const modes = [
  {
    id: "vision",
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
    title: "Limited Hand Movement",
    desc: "Keyboard-friendly, large buttons",
    image: "/accessibility/motor.jpg",
    setup: (ctx) => {
      ctx.setFontSize("large");
    },
  },
  {
    id: "cognitive",
    title: "First-Time or Assisted Thinking",
    desc: "Step-by-step guidance with reassurance",
    image: "/accessibility/cognitive.jpg",
    setup: (ctx) => {
      ctx.setVoice(true);
    },
  },
  {
    id: "hearing",
    title: "Hearing or Speech Difficulty",
    desc: "Visual-only guidance, clear confirmations",
    image: "/accessibility/hearing.jpg",
    setup: () => {},
  },
  {
    id: "senior",
    title: "Senior Citizens",
    desc: "Large text, slow-paced, clear instructions",
    image: "/accessibility/senior.jpg",
    setup: (ctx) => {
      ctx.setFontSize("large");
    },
  },
  {
    id: "standard",
    title: "Standard Voting",
    desc: "Accessible defaults with optional tools",
    image: "/accessibility/standard.jpg",
    setup: () => {},
  },
];

export default function AccessibilityModeSelect() {
  const navigate = useNavigate();
  const ctx = useContext(AccessibilityContext);
  const hasSpokenOnce = useRef(false);

  /* ================================
     FORCE ENABLE VOICE FOR STEP 1
  ================================= */
  useEffect(() => {
    if (ctx.setVoice) {
      ctx.setVoice(true);
    }
  }, []);

  /* ================================
     SPEAK HELPER (SAFE)
  ================================= */
  const speak = (text) => {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.9;
    utterance.pitch = 1;
    window.speechSynthesis.speak(utterance);
  };

  /* ================================
     VOICE MESSAGE
  ================================= */
  const instructionText =
    "Step 1 of 3. Choose your voting experience. " +
    "This step helps customize accessibility. " +
    "You are not voting yet. " +
    "Use arrow keys or tap to choose an option.";

  /* ================================
     HANDLE OPTION SELECTION
  ================================= */
  const handleSelect = (mode) => {
    mode.setup(ctx);
    speak(`${mode.title} selected. Moving to the next step.`);
    navigate("/vote");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-100 to-emerald-100 px-6 py-10">

      {/* =========================
          CARD 1 — STEP INFO
      ========================== */}
      <section
        className="max-w-6xl mx-auto bg-white rounded-3xl shadow-xl
                   px-8 py-10 mb-10"
        aria-labelledby="step-heading"
      >
        <p
          id="step-heading"
          className="text-sm font-medium text-gray-600 mb-2"
        >
          Step 1 of 3
        </p>

        <div
          className="h-2 w-full bg-gray-200 rounded-full mb-8"
          role="progressbar"
          aria-valuemin="0"
          aria-valuemax="100"
          aria-valuenow="33"
          aria-label="Voting setup progress"
        >
          <div className="h-2 w-1/3 bg-blue-600 rounded-full"></div>
        </div>

        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-3">
          Choose your voting experience
        </h1>

        <p className="text-center text-gray-600 max-w-3xl mx-auto">
          Select the option that best matches your comfort and support needs.
          You can change this later.
        </p>

        {/* 🔊 VOICE BUTTON — REQUIRED FOR BROWSER */}
        <button
          onClick={() => {
            speak(instructionText);
            hasSpokenOnce.current = true;
          }}
          className="mt-6 mx-auto block px-6 py-3 rounded-full
                     bg-blue-600 text-white font-medium
                     focus:outline-none focus:ring-4 focus:ring-blue-300"
          aria-label="Play voice instructions"
        >
          🔊 Play voice instructions
        </button>
      </section>

      {/* =========================
          CARD 2 — OPTIONS
      ========================== */}
      <section
        className="max-w-7xl mx-auto rounded-3xl
                   bg-blue-50/70 backdrop-blur-sm
                   px-8 py-10 shadow-lg"
        role="group"
        aria-label="Voting experience options"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {modes.map((mode) => (
            <button
              key={mode.id}
              onClick={() => handleSelect(mode)}
              aria-label={`Select ${mode.title}`}
              className="relative h-64 rounded-2xl overflow-hidden
                         focus:outline-none focus:ring-4 focus:ring-blue-400
                         transition-transform hover:scale-[1.02]"
            >
              <img
                src={mode.image}
                alt=""
                className="absolute inset-0 w-full h-full object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/45 to-transparent"></div>

              <div className="relative z-10 h-full flex flex-col justify-end p-6 text-left">
                <h2 className="text-2xl font-bold text-white">
                  {mode.title}
                </h2>
                <p className="text-white/90 text-sm mt-1">
                  {mode.desc}
                </p>
              </div>
            </button>
          ))}
        </div>

        <p className="mt-10 text-sm text-gray-600 text-center">
          This step only sets up accessibility preferences.
          No personal data is stored.
        </p>
      </section>
    </div>
  );
}
