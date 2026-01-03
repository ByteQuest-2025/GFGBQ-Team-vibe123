import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function VoteSenior() {
  const navigate = useNavigate();
  const [selectedCandidate, setSelectedCandidate] = useState(null);

  const candidates = ["Candidate A", "Candidate B", "Candidate C"];

  /* ================================
     CALM VOICE
  ================================= */
  const speak = (text) => {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();

    const u = new SpeechSynthesisUtterance(text);
    u.rate = 0.75;
    u.pitch = 1;
    window.speechSynthesis.speak(u);
  };

  useEffect(() => {
    speak(
      "Step 2 of 3. Please choose your candidate. " +
      "All options are visible on this screen. " +
      "Take your time."
    );
  }, []);

  const selectCandidate = (name) => {
    setSelectedCandidate(name);
    speak(`${name} selected.`);
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-6"
      style={{
        background:
          "linear-gradient(135deg, #FFF7D6 0%, #FFF1B8 50%, #FFE9A3 100%)",
      }}
    >
      {/* MAIN CARD */}
      <section className="w-full max-w-4xl bg-[#FFFDF4]
                          rounded-3xl shadow-xl px-10 py-8">

        {/* STEP */}
        <p className="text-base text-gray-600 mb-2">
          Step 2 of 3
        </p>

        <div className="h-2 bg-gray-200 rounded-full mb-5">
          <div className="h-2 w-2/3 bg-amber-400 rounded-full"></div>
        </div>

        {/* TITLE */}
        <h1 className="text-3xl font-semibold text-gray-800 text-center mb-3">
          Choose Your Candidate
        </h1>

        {/* SUBTEXT */}
        <p className="text-xl text-gray-600 text-center mb-6">
          Please select one option below.
          <br />
          You can change your choice before continuing.
        </p>

        {/* CANDIDATES */}
        <div className="grid grid-cols-1 gap-4 mb-6">
          {candidates.map((c) => (
            <button
              key={c}
              onClick={() => selectCandidate(c)}
              className={`w-full py-4 rounded-xl text-2xl font-medium
                border-2 transition
                ${
                  selectedCandidate === c
                    ? "bg-amber-500 text-white border-amber-500"
                    : "bg-[#FFF3C4] text-gray-800 border-amber-200"
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
              <p className="text-xl text-gray-700 mb-3">
                You selected:
                <br />
                <strong className="text-2xl text-gray-900">
                  {selectedCandidate}
                </strong>
              </p>

              <button
                onClick={() =>
                  navigate("/confirm", {
                    state: { candidate: selectedCandidate },
                  })
                }
                className="px-12 py-3 rounded-xl bg-amber-600
                           text-white text-xl font-semibold
                           focus:ring-4 focus:ring-amber-300"
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

        {/* FOOTNOTE */}
        <p className="mt-5 text-base text-gray-500 text-center">
          Your vote is private and secure.
        </p>
      </section>
    </div>
  );
}
