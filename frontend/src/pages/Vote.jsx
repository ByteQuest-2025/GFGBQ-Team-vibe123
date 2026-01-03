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
        "Step 2 of 3. Select your candidate. Use Tab to navigate and Enter to select."
      );
    }
  }, [voice]);

  const containerClass = `
    min-h-screen flex flex-col items-center justify-center gap-6 px-4
    ${contrast === "high" ? "bg-black text-yellow-300" : "bg-white text-black"}
    ${fontSize === "large" ? "text-2xl" : "text-lg"}
  `;

  return (
    <div className={containerClass}>
      {/* Progress Indicator */}
      <p className="text-sm opacity-70">
        Step <strong>2</strong> of <strong>3</strong>
      </p>

      <h1 className="font-bold text-3xl text-center">
        Select Your Candidate
      </h1>

      <p className="text-center max-w-xl">
        You can vote independently. Use keyboard, screen reader, or voice
        guidance. No assistance is required.
      </p>

      {/* Instructions for keyboard users */}
      <p className="text-sm italic opacity-80">
        Tip: Press <strong>Tab</strong> to move and <strong>Enter</strong> to select.
      </p>

      {/* Candidate List */}
      <div
        role="radiogroup"
        aria-label="Candidate selection"
        className="flex flex-col gap-4 w-full max-w-md mt-4"
      >
        {candidates.map((candidate) => (
          <button
            key={candidate.id}
            role="radio"
            aria-checked={selected?.id === candidate.id}
            onClick={() => setSelected(candidate)}
            onKeyDown={(e) => e.key === "Enter" && setSelected(candidate)}
            className={`flex items-center gap-4 p-5 rounded-xl border-2 text-left
              focus:outline-none focus:ring-4 transition
              ${
                selected?.id === candidate.id
                  ? "border-blue-600 ring-blue-300 bg-blue-50"
                  : "border-gray-400"
              }`}
          >
            {/* Radio indicator */}
            <span
              className={`w-5 h-5 rounded-full border-2 flex items-center justify-center
                ${
                  selected?.id === candidate.id
                    ? "border-blue-600"
                    : "border-gray-500"
                }`}
              aria-hidden="true"
            >
              {selected?.id === candidate.id && (
                <span className="w-3 h-3 bg-blue-600 rounded-full"></span>
              )}
            </span>

            <span className="text-xl">{candidate.name}</span>
          </button>
        ))}
      </div>

      {/* Selection Summary */}
      {selected && (
        <p
          className="mt-4 text-green-700 font-semibold"
          aria-live="polite"
        >
          Selected: {selected.name}
        </p>
      )}

      {/* Confirm Button */}
      <button
        disabled={!selected}
        aria-label="Confirm your vote"
        className={`mt-6 px-10 py-4 rounded-xl text-xl font-semibold
          focus:outline-none focus:ring-4 transition
          ${
            selected
              ? "bg-green-600 text-white focus:ring-green-300"
              : "bg-gray-400 text-gray-700 cursor-not-allowed"
          }`}
        onClick={() => {
          if (voice) speak(`You have selected ${selected.name}. Vote confirmed.`);
          alert(`Vote confirmed for ${selected.name}`);
        }}
      >
        Confirm Vote
      </button>
    </div>
  );
}
