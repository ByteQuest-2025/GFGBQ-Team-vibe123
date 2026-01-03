import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function VoteStandard() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(null);

  const candidates = [
    {
      name: "Candidate A",
      color: "from-blue-500 to-blue-600",
      symbol: "🖐️", // Party / Election symbol
    },
    {
      name: "Candidate B",
      color: "from-indigo-500 to-indigo-600",
      symbol: "⚖️",
    },
    {
      name: "Candidate C",
      color: "from-emerald-500 to-emerald-600",
      symbol: "🌱",
    },
  ];

  const handleContinue = () => {
    if (!selected) return;
    navigate("/confirm", { state: { candidate: selected } });
  };

  return (
    <div
      className="min-h-screen bg-gradient-to-br
                 from-sky-200 via-blue-100 to-indigo-200
                 flex items-center justify-center px-6"
    >
      {/* MAIN CARD */}
      <div className="w-full max-w-6xl bg-white rounded-3xl shadow-2xl px-12 py-12">

        {/* STEP */}
        <p className="text-sm text-gray-500 mb-2">Step 2 of 3</p>
        <div className="h-2 bg-gray-200 rounded-full mb-10">
          <div className="h-2 w-2/3 bg-blue-600 rounded-full"></div>
        </div>

        {/* TITLE */}
        <h1 className="text-4xl font-bold text-center mb-4">
          Choose Your Candidate
        </h1>

        <p className="text-center text-gray-600 mb-12 text-lg">
          Click on a candidate card to make your selection.
        </p>

        {/* CANDIDATE CARDS */}
        <div className="grid grid-cols-3 gap-10 mb-12">
          {candidates.map((c) => (
            <button
              key={c.name}
              onClick={() => setSelected(c.name)}
              className={`
                rounded-3xl p-10 text-white text-xl font-semibold
                bg-gradient-to-br ${c.color}
                shadow-lg transition-all duration-300
                hover:scale-105 hover:shadow-xl
                flex flex-col items-center justify-center gap-6
                ${selected === c.name ? "ring-4 ring-offset-4 ring-blue-400" : ""}
              `}
            >
              {/* SYMBOL */}
              <div className="text-6xl bg-white/20 rounded-full px-6 py-4">
                {c.symbol}
              </div>

              {/* NAME */}
              <span className="text-2xl">{c.name}</span>
            </button>
          ))}
        </div>

        {/* ACTION */}
        <div className="flex justify-center">
          <button
            disabled={!selected}
            onClick={handleContinue}
            className={`
              px-14 py-5 rounded-xl text-lg font-semibold transition
              ${
                selected
                  ? "bg-blue-600 text-white hover:bg-blue-700 shadow-lg"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }
            `}
          >
            Continue to Confirmation
          </button>
        </div>
      </div>
    </div>
  );
}
