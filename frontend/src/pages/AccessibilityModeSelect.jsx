import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function AccessibilityModeSelect() {
  const navigate = useNavigate();

  /* ================================
     VOICE GUIDANCE
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
      "You can change this later."
    );
  }, []);

  const selectMode = (mode) => {
    navigate(`/vote/${mode}`);
  };

  /* ================================
     CARD COMPONENT
  ================================= */
  const ModeCard = ({ image, title, desc, onClick }) => (
    <button
      onClick={onClick}
      className="relative h-64 rounded-2xl overflow-hidden shadow-lg
                 transform transition hover:scale-[1.02]
                 focus:ring-4 focus:ring-blue-400"
    >
      {/* Background Image */}
      <img
        src={image}
        alt={title}
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Text */}
      <div className="relative z-10 h-full flex flex-col justify-end p-6">
        <h2 className="text-2xl font-bold text-white mb-2">
          {title}
        </h2>
        <p className="text-white text-lg leading-snug">
          {desc}
        </p>
      </div>
    </button>
  );

  return (
    <div
      className="min-h-screen px-6 py-10"
      style={{
        background:
          "linear-gradient(135deg, #E8F1FF 0%, #F4F9FF 50%, #ECFFF4 100%)",
      }}
    >
      <div className="max-w-7xl mx-auto space-y-10">

        {/* =======================
            BOX 1: HEADER / CONTEXT
        ======================= */}
        {/* HEADER CARD */}
<section className="bg-white rounded-3xl shadow-xl px-10 py-10 mb-10 text-center">

  {/* STEP */}
  <p className="text-sm text-gray-500 mb-3">
    Step 1 of 3
  </p>

  {/* PROGRESS */}
  <div className="h-2 bg-gray-200 rounded-full mb-8">
    <div className="h-2 w-1/3 bg-blue-600 rounded-full"></div>
  </div>

  {/* TITLE */}
  <h1 className="text-5xl font-extrabold text-gray-900 mb-4">
    Choose How You Want to Vote
  </h1>

  {/* SUBTITLE */}
  <p className="text-xl text-gray-600 max-w-3xl mx-auto">
    Select the option that best matches your comfort and needs.
    You can change this later.
  </p>

</section>


        {/* =======================
            BOX 2: OPTIONS GRID
        ======================= */}
        <section className="bg-white rounded-3xl shadow-xl px-10 py-10">

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

            <ModeCard
              image="/accessibility/low-vision.jpg"
              title="Low Vision / Blind"
              desc="Voice guidance, screen reader support, high contrast."
              onClick={() => selectMode("visual")}
            />

            <ModeCard
              image="/accessibility/motor.jpg"
              title="Limited Hand Movement"
              desc="Keyboard-friendly, large buttons, minimal interaction."
              onClick={() => selectMode("motor")}
            />

            <ModeCard
              image="/accessibility/cognitive.jpg"
              title="Assisted / Cognitive"
              desc="Step-by-step guidance with reassurance."
              onClick={() => selectMode("cognitive")}
            />

            <ModeCard
              image="/accessibility/hearing.jpg"
              title="Hearing / Speech"
              desc="Visual-only prompts and clear confirmations."
              onClick={() => selectMode("hearing")}
            />

            <ModeCard
              image="/accessibility/senior.jpg"
              title="Senior Citizens"
              desc="Large text, calm colors, no scrolling."
              onClick={() => selectMode("senior")}
            />

            <ModeCard
              image="/accessibility/standard.jpg"
              title="Standard Voting"
              desc="Accessible defaults with optional tools."
              onClick={() => selectMode("standard")}
            />

          </div>

          <p className="mt-10 text-center text-gray-500 text-lg">
            No personal data is stored during this step.
          </p>

        </section>

      </div>
    </div>
  );
}
