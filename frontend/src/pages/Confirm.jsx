import { useNavigate } from "react-router-dom";

export default function Confirm() {
  const navigate = useNavigate();

  return (
    <main className="min-h-screen flex flex-col justify-center items-center px-6 bg-black text-white">
      <h1 className="text-3xl font-bold mb-4" tabIndex="0">
        Your vote has been securely recorded
      </h1>

      <ul className="text-lg mb-6" tabIndex="0">
        <li>✔ Keyboard navigation supported</li>
        <li>✔ Screen reader friendly</li>
        <li>✔ Large readable text</li>
        <li>✔ Private and independent voting</li>
      </ul>

      <button
        onClick={() => navigate("/")}
        className="border px-6 py-3 rounded-xl text-lg focus:ring-4 focus:ring-yellow-400"
      >
        Return to Home
      </button>
    </main>
  );
}
