import { useState } from "react";
import { useNavigate } from "react-router-dom";

const candidates = [
  { id: 1, name: "Candidate A", symbol: "🅰️" },
  { id: 2, name: "Candidate B", symbol: "🅱️" },
  { id: 3, name: "Candidate C", symbol: "🅲" }
];

export default function Vote() {
  const [selected, setSelected] = useState(null);
  const navigate = useNavigate();

  const castVote = (name) => {
    setSelected(name);
    setTimeout(() => navigate("/confirm"), 800);
  };

  return (
    <main className="min-h-screen px-6 py-10 bg-black text-white">
      <h2 className="text-3xl font-bold mb-6" tabIndex="0">
        Choose Your Candidate
      </h2>

      <div className="grid gap-6 max-w-md">
        {candidates.map((c) => (
          <button
            key={c.id}
            onClick={() => castVote(c.name)}
            className="border border-white p-6 rounded-2xl text-xl flex justify-between items-center focus:ring-4 focus:ring-yellow-400"
            aria-label={`Vote for ${c.name}`}
          >
            <span>{c.name}</span>
            <span className="text-3xl">{c.symbol}</span>
          </button>
        ))}
      </div>
    </main>
  );
}
