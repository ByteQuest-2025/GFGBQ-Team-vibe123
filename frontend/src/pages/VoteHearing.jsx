import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function VoteHearing() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(null);

  const candidates = [
    { name: "Candidate A", color: "from-indigo-400 to-indigo-600" },
    { name: "Candidate B", color: "from-blue-400 to-blue-600" },
    { name: "Candidate C", color: "from-emerald-400 to-emerald-600" },
  ];

  const proceed = () => {
    if (!selected) return;
    navigate("/confirm", { state: { candidate: selected } });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 via-indigo-100 to-emerald-100 flex items-center justify-center px-6">
      <section className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl px-12 py-12">

        {/* STEP */}
        <div className="mb-6">
          <p className="text-sm text-gray-500 mb-2">Step 2 of 3</p>
          <div className="h-2 bg-gray-200 rounded-full">
            <div className="h-2 w-2/3 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-full"></div>
          </div>
        </div>

        {/* TITLE */}
        <h1 className="text-4xl font-bold text-gray-800 text-center mb-3">
          Choose Your Candidate
        </h1>

        {/* MODE INFO */}
        <div className="max-w-3xl mx-auto text-center text-gray-600 mb-10">
          <p className="mb-2">
            This voting page uses <strong>visual guidance only</strong>.
          </p>
          <p>
            Every action you take will be confirmed on screen. No sound is required.
          </p>
        </div>

        {/* CANDIDATES */}
        <div className="grid grid-cols-3 gap-10 mb-10">
          {candidates.map((c) => (
            <button
              key={c.name}
              onClick={() => setSelected(c.name)}
              className={`
                h-36
                rounded-3xl
                text-white
                text-2xl
                font-semibold
                bg-gradient-to-br ${c.color}
                shadow-lg
                transition
                transform
                hover:scale-105
                focus:outline-none
                focus:ring-4
                focus:ring-indigo-300
                ${selected === c.name ? "ring-4 ring-green-400" : ""}
              `}
            >
              {c.name}
            </button>
          ))}
        </div>

        {/* SELECTION FEEDBACK */}
        {selected ? (
          <div className="bg-green-50 border border-green-300 rounded-xl p-5 text-center text-green-800 mb-8">
            <p className="text-lg font-medium">
              ✔ You have selected <strong>{selected}</strong>
            </p>
            <p className="text-sm mt-1">
              You can change your selection or continue to the final confirmation.
            </p>
          </div>
        ) : (
          <div className="bg-yellow-50 border border-yellow-300 rounded-xl p-5 text-center text-yellow-800 mb-8">
            <p className="text-lg font-medium">
              Please select one candidate to continue
            </p>
          </div>
        )}

        {/* NEXT STEP INFO */}
        <div className="text-center text-gray-600 mb-6">
          <p>Next step: Review your choice and confirm your vote.</p>
        </div>

        {/* CONTINUE */}
        <div className="flex justify-center">
          <button
            onClick={proceed}
            disabled={!selected}
            className={`
              px-12
              py-4
              rounded-xl
              text-lg
              font-semibold
              transition
              focus:outline-none
              focus:ring-4
              ${
                selected
                  ? "bg-green-600 text-white hover:bg-green-700 focus:ring-green-300"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }
            `}
          >
            Continue to Confirmation
          </button>
        </div>

      </section>
    </div>
  );
}
