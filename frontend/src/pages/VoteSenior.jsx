import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function VoteSenior() {
  const navigate = useNavigate();
  const [selectedCandidate, setSelectedCandidate] = useState(null);

  const candidates = ["Candidate A", "Candidate B", "Candidate C"];

  /* ================================
     SPEAK – SLOW & CALM
  ================================= */
  const speak = (text) => {
    if (!window.speechSynthesis) return;

    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.rate = 0.75;
    u.pitch = 1;
    window.speechSynthesis.speak(u);
  };

  /* ================================
     INITIAL VOICE GUIDANCE
  ================================= */
  useEffect(() => {
    speak(
      "Step 2 of 3. Please choose the candidate you want to vote for. " +
      "All options are on this screen. Take your time."
    );
  }, []);

  const selectCandidate = (name) => {
    setSelectedCandidate(name);
    speak(
      `${name} selected. ` +
      "If this is correct, press continue. " +
      "You may also change your selection."
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center
                    bg-gradient-to-br from-emerald-50 via-teal-50 to-slate-100 px-6">

      {/* MAIN CARD */}
      <section className="w-full max-w-5xl bg-white rounded-3xl shadow-lg
                          px-12 py-10">

        {/* STEP */}
        <p className="text-lg text-gray-600 mb-3">
          Step 2 of 3
        </p>

        <div className="h-3 bg-gray-200 rounded-full mb-6">
          <div className="h-3 w-2/3 bg-teal-400 rounded-full"></div>
        </div>

        {/* TITLE */}
        <h1 className="text-4xl font-semibold text-gray-800 text-center mb-4">
          Choose Your Candidate
        </h1>

        {/* SUBTEXT */}
        <p className="text-2xl text-gray-600 text-center mb-8">
          Please select one option below.
          <br />
          You can change your choice before continuing.
        </p>

        {/* CANDIDATES */}
        <div className="grid grid-cols-1 gap-6 mb-8">
          {candidates.map((c) => (
            <button
              key={c}
              onClick={() => selectCandidate(c)}
              className={`w-full py-6 rounded-2xl text-3xl font-medium
                transition border-2
                ${
                  selectedCandidate === c
                    ? "bg-teal-500 text-white border-teal-500"
                    : "bg-emerald-50 text-gray-800 border-emerald-200"
                }`}
            >
              {c}
            </button>
          ))}
        </div>

        {/* CONFIRMATION */}
        <div className="text-center">
          {selectedCandidate ? (
            <>
              <p className="text-2xl text-gray-700 mb-4">
                You selected:
                <br />
                <strong className="text-3xl text-gray-900">
                  {selectedCandidate}
                </strong>
              </p>

              <button
                onClick={() =>
                  navigate("/confirm", {
                    state: { candidate: selectedCandidate },
                  })
                }
                className="mt-2 px-14 py-4 rounded-xl bg-emerald-600
                           text-white text-2xl font-semibold
                           focus:ring-4 focus:ring-emerald-300"
              >
                Continue
              </button>
            </>
          ) : (
            <p className="text-xl text-gray-500">
              Please select a candidate to continue.
            </p>
          )}
        </div>

        {/* FOOTNOTE */}
        <p className="mt-6 text-lg text-gray-500 text-center">
          Nothing is final until you confirm your vote.
        </p>
      </section>
    </div>
  );
}
