import { useContext, useEffect, useState } from "react";
import { AccessibilityContext } from "../context/AccessibilityContext";
import { speak } from "../hooks/useSpeech";

const candidates = [
  { id: 1, name: "Candidate A" },
  { id: 2, name: "Candidate B" },
  { id: 3, name: "Candidate C" },
];

export default function Vote() {
  const { fontSize, contrast, voice } = useContext(AccessibilityContext);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    if (voice) {
      speak(
        "Welcome. You can vote independently. Use Tab to move and Enter to select a candidate."
      );
    }
  }, [voice]);

  const containerClass = `
    min-h-screen flex flex-col items-center px-4 py-10
    ${contrast === "high" ? "bg-black text-yellow-300" : "bg-gray-50 text-black"}
    ${fontSize === "large" ? "text-2xl" : "text-lg"}
  `;

  return (
    <div className={containerClass}>
      {/* Accessibility Helper Bar */}
      <div
        className="mb-6 max-w-3xl w-full rounded-xl bg-blue-100 border border-blue-300 p-4 text-center"
        aria-live="polite"
      >
        ♿ <strong>Accessible Voting Enabled:</strong> Keyboard, screen reader,
        and voice guidance supported. No assistance required.
      </div>

      {/* Main Card */}
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-2xl">
        <h1 className="font-bold text-3xl text-center mb-2">
          Select Your Candidate
        </h1>

        <p className="text-center text-gray-600 mb-4">
          Your vote is private. No one can see or influence your choice.
        </p>

        <p className="text-center text-sm italic text-gray-500 mb-6">
          Tip: Use <strong>Tab</strong> to move and <strong>Enter</strong> to select.
        </p>

        {/* Candidate List */}
        <div
          role="radiogroup"
          aria-label="Candidate selection"
          className="flex flex-col gap-4"
        >
          {candidates.map((candidate) => (
            <button
              key={candidate.id}
              role="radio"
              aria-checked={selected?.id === candidate.id}
              onClick={() => setSelected(candidate)}
              onKeyDown={(e) => e.key === "Enter" && setSelected(candidate)}
              className={`flex items-center gap-4 p-6 rounded-xl border-2 text-left
                focus:outline-none focus:ring-4 transition-all
                ${
                  selected?.id === candidate.id
                    ? "border-green-600 ring-green-300 bg-green-50"
                    : "border-gray-300 bg-white hover:bg-gray-50"
                }`}
            >
              {/* Large radio indicator */}
              <span
                className={`w-6 h-6 rounded-full border-2 flex items-center justify-center
                  ${
                    selected?.id === candidate.id
                      ? "border-green-600"
                      : "border-gray-500"
                  }`}
                aria-hidden="true"
              >
                {selected?.id === candidate.id && (
                  <span className="w-3 h-3 bg-green-600 rounded-full"></span>
                )}
              </span>

              <span className="text-xl font-medium">
                {candidate.name}
              </span>
            </button>
          ))}
        </div>

        {/* Selection Feedback */}
        {selected && (
          <div
            className="mt-6 p-4 bg-green-100 border border-green-300 rounded-xl text-center"
            aria-live="polite"
          >
            ✅ You have selected <strong>{selected.name}</strong>.
            You may confirm or change your selection.
          </div>
        )}

        {/* Confirm Button */}
        <button
          disabled={!selected}
          aria-label="Confirm your vote"
          className={`mt-6 w-full py-4 rounded-xl text-xl font-semibold
            focus:outline-none focus:ring-4 transition
            ${
              selected
                ? "bg-green-600 text-white focus:ring-green-300"
                : "bg-gray-300 text-gray-600 cursor-not-allowed"
            }`}
          onClick={() => {
            if (voice) {
              speak(`Vote confirmed for ${selected.name}. Thank you.`);
            }
            alert(`Vote confirmed for ${selected.name}`);
          }}
        >
          Confirm Vote
        </button>
      </div>
    </div>
  );
}
