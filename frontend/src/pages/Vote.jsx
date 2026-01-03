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
      speak("Please select your candidate. Use tab and enter to vote.");
    }
  }, [voice]);

  const containerClass = `
    min-h-screen flex flex-col items-center justify-center gap-6
    ${contrast === "high" ? "bg-black text-yellow-300" : "bg-white text-black"}
    ${fontSize === "large" ? "text-2xl" : "text-lg"}
  `;

  return (
    <div className={containerClass}>
      <h1 className="font-bold text-3xl">
        Select Your Candidate
      </h1>

      <p className="text-center max-w-xl">
        You can vote independently. Use keyboard, screen reader, or voice guidance.
      </p>

      <div className="flex flex-col gap-4 w-full max-w-md">
        {candidates.map((candidate) => (
          <button
            key={candidate.id}
            onClick={() => setSelected(candidate)}
            onKeyDown={(e) => e.key === "Enter" && setSelected(candidate)}
            aria-label={`Vote for ${candidate.name}`}
            className={`p-4 rounded-xl border-2 text-left
              focus:outline-none focus:ring-4
              ${
                selected?.id === candidate.id
                  ? "border-blue-600 ring-blue-300"
                  : "border-gray-400"
              }`}
          >
            {candidate.name}
          </button>
        ))}
      </div>

      {selected && (
        <button
          className="mt-6 px-8 py-4 bg-green-600 text-white rounded-xl
                     focus:outline-none focus:ring-4 focus:ring-green-300"
          aria-label="Confirm selected candidate"
          onClick={() => {
            if (voice) speak(`You selected ${selected.name}`);
            alert(`Vote selected: ${selected.name}`);
          }}
        >
          Confirm Vote
        </button>
      )}
    </div>
  );
}
