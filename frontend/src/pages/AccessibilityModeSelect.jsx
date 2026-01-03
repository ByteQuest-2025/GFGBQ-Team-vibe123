import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function AccessibilityModeSelect() {
  const navigate = useNavigate();

  /* ================================
     VOICE GUIDANCE (OPTIONAL)
  ================================= */
  const speak = (text) => {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.rate = 0.85;
    window.speechSynthesis.speak(u);
  };

  useEffect(() => {
    speak(
      "Welcome to the inclusive voting system. " +
      "Please choose how you would like to vote today. " +
      "You can use touch, keyboard, or voice assisted voting."
    );
  }, []);

  const selectMode = (mode) => {
    navigate(`/vote/${mode}`);
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-6"
      style={{
        background:
          "linear-gradient(135deg, #E8F1FF 0%, #F4F9FF 50%, #ECFFF4 100%)",
      }}
    >
      {/* MAIN CARD */}
      <section className="w-full max-w-6xl bg-white rounded-3xl shadow-xl px-10 py-10">

        {/* STEP */}
        <p className="text-sm text-gray-600 mb-2">
          Step 1 of 3
        </p>

        <div className="h-2 bg-gray-200 rounded-full mb-6">
          <div className="h-2 w-1/3 bg-blue-500 rounded-full"></div>
        </div>

        {/* TITLE */}
        <h1 className="text-4xl font-bold text-center mb-3">
          Choose How You Want to Vote
        </h1>

        <p className="text-xl text-gray-600 text-center mb-10">
          Select the option that best matches your comfort and needs.
          <br />
          You can change this later.
        </p>

        {/* OPTIONS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          <button
            onClick={() => selectMode("visual")}
            className="rounded-2xl p-6 text-left bg-slate-50
                       hover:bg-slate-100 transition shadow
                       focus:ring-4 focus:ring-blue-300"
          >
            <h2 className="text-2xl font-semibold mb-2">
              Low Vision / Blind Voters
            </h2>
            <p className="text-gray-600 text-lg">
              Voice guidance, screen reader support, high contrast.
            </p>
          </button>

          <button
            onClick={() => selectMode("motor")}
            className="rounded-2xl p-6 text-left bg-slate-50
                       hover:bg-slate-100 transition shadow
                       focus:ring-4 focus:ring-blue-300"
          >
            <h2 className="text-2xl font-semibold mb-2">
              Limited Hand Movement
            </h2>
            <p className="text-gray-600 text-lg">
              Keyboard-friendly, large buttons, minimal interaction.
            </p>
          </button>

          <button
            onClick={() => selectMode("cognitive")}
            className="rounded-2xl p-6 text-left bg-slate-50
                       hover:bg-slate-100 transition shadow
                       focus:ring-4 focus:ring-blue-300"
          >
            <h2 className="text-2xl font-semibold mb-2">
              First-Time or Assisted Thinking
            </h2>
            <p className="text-gray-600 text-lg">
              Step-by-step guidance with reassurance.
            </p>
          </button>

          <button
            onClick={() => selectMode("hearing")}
            className="rounded-2xl p-6 text-left bg-slate-50
                       hover:bg-slate-100 transition shadow
                       focus:ring-4 focus:ring-blue-300"
          >
            <h2 className="text-2xl font-semibold mb-2">
              Hearing or Speech Difficulty
            </h2>
            <p className="text-gray-600 text-lg">
              Visual-only prompts and clear confirmations.
            </p>
          </button>

          <button
            onClick={() => selectMode("senior")}
            className="rounded-2xl p-6 text-left bg-slate-50
                       hover:bg-slate-100 transition shadow
                       focus:ring-4 focus:ring-blue-300"
          >
            <h2 className="text-2xl font-semibold mb-2">
              Senior Citizens
            </h2>
            <p className="text-gray-600 text-lg">
              Large text, calm colors, no scrolling.
            </p>
          </button>

          <button
            onClick={() => selectMode("standard")}
            className="rounded-2xl p-6 text-left bg-slate-50
                       hover:bg-slate-100 transition shadow
                       focus:ring-4 focus:ring-blue-300"
          >
            <h2 className="text-2xl font-semibold mb-2">
              Standard Voting
            </h2>
            <p className="text-gray-600 text-lg">
              Accessible defaults with optional tools.
            </p>
          </button>

        </div>

        {/* FOOTNOTE */}
        <p className="mt-8 text-center text-gray-500 text-lg">
          No personal data is stored during this step.
        </p>

      </section>
    </div>
  );
}
