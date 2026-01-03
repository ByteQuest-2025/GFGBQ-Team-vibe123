
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Home() {
  const navigate = useNavigate();
  const [highContrast, setHighContrast] = useState(false);

  useEffect(() => {
  if (highContrast) {
    document.body.classList.add("high-contrast");
  } else {
    document.body.classList.remove("high-contrast");
  }
}, [highContrast]);


  return (
    <main
      className={`min-h-screen flex flex-col justify-center items-center px-6 transition-all duration-300 page-transition
 ${
        highContrast ? "bg-black text-white" : "bg-gradient-to-br from-black via-gray-900 to-black text-white"
      }`}
    >
      <h1
        className="text-5xl font-extrabold mb-4 text-center tracking-tight"
        tabIndex="0"
      >
        Accessible Voting for Everyone
      </h1>

      <p
        className="text-lg text-gray-300 mb-10 text-center max-w-2xl leading-relaxed"
        tabIndex="0"
      >
        An inclusive voting platform designed to empower specially abled citizens
        to vote independently and securely.
      </p>

      <div className="flex flex-col gap-5 w-full max-w-sm">
        <button
          onClick={() => navigate("/vote")}
          className="py-4 rounded-2xl text-lg font-semibold bg-green-500 hover:bg-green-400 transition shadow-lg"
        >
          Start Voting
        </button>

        <button
          onClick={() => navigate("/vote")}
          className="py-4 rounded-2xl text-lg border border-gray-500 hover:border-white transition backdrop-blur"
        >
          🎤 Enable Voice Mode
        </button>

        <button
          onClick={() => setHighContrast(!highContrast)}
          className="py-4 rounded-2xl text-lg border border-gray-500 hover:border-white transition"
        >
          High Contrast Mode
        </button>
      </div>
    </main>
  );
}
