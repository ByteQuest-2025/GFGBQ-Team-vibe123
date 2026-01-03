
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Home() {
  const navigate = useNavigate();
  const [highContrast, setHighContrast] = useState(false);

  return (
    <main
      className={`min-h-screen flex flex-col justify-center items-center px-6 ${
        highContrast ? "bg-white text-black" : "bg-black text-white"
      }`}
    >
      <h1 className="text-4xl font-bold mb-4" tabIndex="0">
        Accessible Voting for Everyone
      </h1>

      <p className="text-lg text-center max-w-xl mb-6" tabIndex="0">
        Vote independently using voice commands, keyboard navigation,
        and screen-reader friendly design.
      </p>

      <div className="flex flex-col gap-4 w-full max-w-sm">
        <button
          onClick={() => navigate("/vote")}
          className="bg-green-500 text-black py-3 rounded-xl text-lg font-semibold focus:ring-4 focus:ring-yellow-400"
        >
          Start Voting
        </button>

        <button
          className="border py-3 rounded-xl text-lg focus:ring-4 focus:ring-yellow-400"
          aria-label="Voice voting is available on the voting page"
        >
          Enable Voice Mode
        </button>

        <button
          onClick={() => setHighContrast(!highContrast)}
          className="border py-3 rounded-xl text-lg focus:ring-4 focus:ring-yellow-400"
        >
          High Contrast Mode
        </button>
      </div>
    </main>
  );
}
