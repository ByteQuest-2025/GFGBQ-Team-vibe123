import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function VoteCognitive() {
  const navigate = useNavigate();

  /* ================================
     OPTIONAL CALM VOICE PROMPT
     (NO auto mic, only gentle audio)
  ================================= */
  const speak = (text) => {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.rate = 0.85;
    u.pitch = 1;
    window.speechSynthesis.speak(u);
  };

  useEffect(() => {
    speak(
      "Take your time. When you feel ready, choose one candidate. " +
      "You can change your choice later."
    );
  }, []);

  const selectCandidate = (candidate) => {
    navigate("/confirm", { state: { candidate } });
  };

  return (
    <div
      className="
        min-h-screen
        bg-gradient-to-br
        from-emerald-50
        via-teal-50
        to-slate-50
        flex
        items-center
        justify-center
        px-6
      "
    >
      {/* MAIN CARD */}
      <section className="w-full max-w-4xl bg-white rounded-3xl shadow-xl px-10 py-12">

        {/* STEP INDICATOR */}
        <p className="text-sm text-gray-500 mb-2">Step 2 of 3</p>
        <div className="h-2 bg-gray-200 rounded-full mb-10">
          <div className="h-2 w-2/3 bg-teal-500 rounded-full"></div>
        </div>

        {/* TITLE */}
        <h1 className="text-3xl font-medium text-gray-800 text-center mb-4">
          Choose a candidate
        </h1>

        {/* REASSURANCE */}
        <p className="text-lg text-gray-600 text-center mb-12 max-w-2xl mx-auto">
          There is no hurry. Read each option carefully and select the one that feels right.
          You can review your choice before submitting.
        </p>

        {/* CANDIDATE OPTIONS */}
        <div className="grid grid-cols-3 gap-8">

          <button
            onClick={() => selectCandidate("Candidate A")}
            className="
              h-32
              rounded-2xl
              bg-teal-500
              text-white
              text-2xl
              font-medium
              hover:bg-teal-600
              transition
              focus:outline-none
              focus:ring-4
              focus:ring-teal-200
            "
          >
            Candidate A
          </button>

          <button
            onClick={() => selectCandidate("Candidate B")}
            className="
              h-32
              rounded-2xl
              bg-teal-500
              text-white
              text-2xl
              font-medium
              hover:bg-teal-600
              transition
              focus:outline-none
              focus:ring-4
              focus:ring-teal-200
            "
          >
            Candidate B
          </button>

          <button
            onClick={() => selectCandidate("Candidate C")}
            className="
              h-32
              rounded-2xl
              bg-teal-500
              text-white
              text-2xl
              font-medium
              hover:bg-teal-600
              transition
              focus:outline-none
              focus:ring-4
              focus:ring-teal-200
            "
          >
            Candidate C
          </button>

        </div>

        {/* FOOTER CALM NOTE */}
        <p className="text-sm text-gray-500 text-center mt-10">
          You may take as much time as you need.
        </p>

      </section>
    </div>
  );
}
