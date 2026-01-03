import { useNavigate } from "react-router-dom";

export default function Confirm() {
  const navigate = useNavigate();

  return (
  <main className="min-h-screen flex items-center justify-center px-6 page-transition">
    <div
      className="w-full max-w-xl rounded-3xl bg-black/40 backdrop-blur-xl
      border border-white/10 shadow-2xl p-10 text-center"
      role="status"
      aria-live="polite"
    >
      <h1
        className="text-4xl font-bold mb-6"
        tabIndex="0"
      >
        ✅ Your vote has been securely recorded
      </h1>

      <p className="text-lg text-gray-300 mb-8">
        Thank you for participating in an inclusive, secure, and accessible
        democratic process.
      </p>

      <div className="text-left bg-black/30 rounded-xl p-6 border border-white/10">
        <h2 className="text-xl font-semibold mb-4">
          Accessibility Summary
        </h2>
        <ul className="space-y-2 text-gray-300">
          <li>✔ Keyboard navigation supported</li>
          <li>✔ Screen reader friendly</li>
          <li>✔ Large readable text</li>
          <li>✔ Private and independent voting</li>
        </ul>
      </div>

      <button
        onClick={() => navigate("/")}
        className="mt-8 px-8 py-3 rounded-xl text-lg border
        border-white/20 hover:border-white transition-all
        focus:ring-4 focus:ring-green-400"
      >
        Return to Home
      </button>
    </div>
  </main>
);
}