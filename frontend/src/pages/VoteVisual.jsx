import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function VoteVisual() {
  const navigate = useNavigate();
  const [selectedCandidate, setSelectedCandidate] = useState(null);

  const candidates = ["Candidate A", "Candidate B", "Candidate C"];

  /* ================================
     VOICE GUIDANCE
  ================================= */
  const speak = (text) => {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();

    const u = new SpeechSynthesisUtterance(text);
    u.rate = 0.9;
    window.speechSynthesis.speak(u);
  };

  useEffect(() => {
    speak(
      "Step 2 of 3. Choose your candidate. " +
      "Select one of the large buttons on the screen."
    );
  }, []);

  const selectCandidate = (name) => {
    setSelectedCandidate(name);
    speak(`${name} selected.`);
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-8"
      style={{
        background:
          "linear-gradient(135deg, #E1F0FF 0%, #BBDFFF 50%, #9BCBFF 100%)",
      }}
    >
      {/* MAIN CARD */}
      <section
        className="w-full max-w-6xl bg-white rounded-3xl shadow-2xl
                   px-12 py-10"
      >
        {/* STEP */}
        <p className="text-sm text-gray-600 mb-2">
          Step 2 of 3
        </p>

        <div className="h-2 bg-gray-200 rounded-full mb-8">
          <div className="h-2 w-2/3 bg-blue-600 rounded-full"></div>
        </div>

        {/* TITLE */}
        <h1 className="text-4xl font-bold text-center text-gray-900 mb-4">
          Choose Your Candidate
        </h1>

        <p className="text-xl text-gray-600 text-center mb-10">
          Select one candidate below.
        </p>

        {/* HORIZONTAL CANDIDATES */}
        <div className="grid grid-cols-3 gap-10 mb-10">
          {candidates.map((c) => (
            <button
              key={c}
              onClick={() => selectCandidate(c)}
              className={`h-56 rounded-3xl text-4xl font-semibold
                transition-all duration-200 flex items-center justify-center
                ${
                  selectedCandidate === c
                    ? "bg-blue-700 text-white scale-105"
                    : "bg-blue-500 text-white hover:bg-blue-600"
                }`}
            >
              {c}
            </button>
          ))}
        </div>

        {/* CONFIRM */}
        <div className="text-center">
          {selectedCandidate ? (
            <>
              <p className="text-xl text-gray-700 mb-4">
                Selected:
                <strong className="ml-2 text-gray-900">
                  {selectedCandidate}
                </strong>
              </p>

              <button
                onClick={() =>
                  navigate("/confirm", {
                    state: { candidate: selectedCandidate },
                  })
                }
                className="px-16 py-4 rounded-xl bg-blue-700
                           text-white text-xl font-semibold
                           focus:ring-4 focus:ring-blue-300"
              >
                Continue
              </button>
            </>
          ) : (
            <p className="text-lg text-gray-500">
              Please select a candidate to continue.
            </p>
          )}
        </div>
      </section>
    </div>
  );
}
