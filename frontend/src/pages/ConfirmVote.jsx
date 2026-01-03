import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";

export default function ConfirmVote() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const candidate = state?.candidate || "Unknown candidate";
  const recognitionRef = useRef(null);

  /* ================================
     SPEAK
  ================================= */
  const speak = (text) => {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.rate = 0.9;
    window.speechSynthesis.speak(u);
  };

  /* ================================
     VOICE RECOGNITION
  ================================= */
  const startListening = () => {
    const SR =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) return;

    const recognition = new SR();
    recognition.lang = "en-US";
    recognition.continuous = true;

    recognition.onresult = (e) => {
      const text =
        e.results[e.results.length - 1][0].transcript.toLowerCase();

      if (text.includes("confirm")) {
        speak("Your vote has been confirmed. Thank you.");
        recognition.stop();
        alert("Vote submitted securely.");
      }

      if (text.includes("back")) {
        speak("Going back to candidate selection.");
        recognition.stop();
        navigate("/vote");
      }
    };

    recognition.start();
    recognitionRef.current = recognition;
  };

  /* ================================
     INITIAL READ-BACK
  ================================= */
  useEffect(() => {
    speak(
      `Step 3 of 3. You selected ${candidate}. ` +
      "Say confirm vote to submit, or say go back to change."
    );
    startListening();

    return () => {
      if (recognitionRef.current) recognitionRef.current.stop();
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-100 to-emerald-100
                    px-6 py-10">
      <section className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl px-8 py-10 text-center">
        <p className="text-sm text-gray-600 mb-2">Step 3 of 3</p>

        <div className="h-2 bg-gray-200 rounded-full mb-8">
          <div className="h-2 w-full bg-blue-600 rounded-full"></div>
        </div>

        <h1 className="text-3xl font-bold mb-6">
          Confirm your vote
        </h1>

        <p className="text-xl mb-8">
          You selected: <strong>{candidate}</strong>
        </p>

        <div className="flex justify-center gap-6">
          <button
            onClick={() => alert("Vote submitted securely")}
            className="px-8 py-4 rounded-xl bg-green-600 text-white
                       focus:ring-4 focus:ring-green-300"
          >
            Confirm Vote
          </button>

          <button
            onClick={() => navigate("/vote")}
            className="px-8 py-4 rounded-xl bg-gray-300
                       focus:ring-4 focus:ring-gray-400"
          >
            Go Back
          </button>
        </div>
      </section>
    </div>
  );
}
