import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";

export default function ConfirmVote() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const recognitionRef = useRef(null);

  const candidate = state?.candidate || "no candidate selected";

  /* ================================
     SPEAK FUNCTION
  ================================= */
  const speak = (text) => {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.rate = 0.85;
    u.pitch = 1;
    window.speechSynthesis.speak(u);
  };

  /* ================================
     INSTRUCTIONS
  ================================= */
  const speakInstructions = () => {
    speak(
      `Step three of three. 
       You have selected ${candidate}. 
       Say confirm vote to submit your vote.
       Say change selection to go back.
       Say repeat instructions to hear this again.`
    );
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
    recognition.interimResults = false;

    recognition.onresult = (e) => {
      const text =
        e.results[e.results.length - 1][0].transcript
          .toLowerCase()
          .trim();

      if (text.includes("confirm")) {
        recognition.stop();
        speak("Your vote has been successfully confirmed. Thank you.");
        setTimeout(() => {
          alert("Vote submitted securely.");
        }, 800);
      }

      if (
        text.includes("change") ||
        text.includes("go back")
      ) {
        recognition.stop();
        speak("Returning to candidate selection.");
        setTimeout(() => navigate(-1), 800);
      }

      if (text.includes("repeat")) {
        speakInstructions();
      }
    };

    recognition.start();
    recognitionRef.current = recognition;
  };

  /* ================================
     EFFECT
  ================================= */
  useEffect(() => {
    speakInstructions();
    startListening();

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  return (
    <div
      className="min-h-screen px-6 py-10"
      style={{
        background:
          "linear-gradient(135deg, #EEF2FF 0%, #F8FAFF 50%, #ECFDF5 100%)",
      }}
      onClick={speakInstructions}
    >
      <div className="max-w-4xl mx-auto space-y-10">

        {/* =======================
            HEADER
        ======================= */}
        <section className="bg-white rounded-3xl shadow-xl px-10 py-8 text-center">
          <p className="text-sm text-gray-600 mb-2">
            Step 3 of 3
          </p>

          <div className="h-2 bg-gray-200 rounded-full mb-6">
            <div className="h-2 w-full bg-green-500 rounded-full"></div>
          </div>

          <h1 className="text-4xl font-bold">
            Confirm Your Vote
          </h1>

          <p className="text-xl text-gray-600 mt-2">
            Review your selection before confirming.
          </p>
        </section>

        {/* =======================
            SELECTED CANDIDATE
        ======================= */}
        <section className="bg-white rounded-3xl shadow-xl px-10 py-10 text-center">
          <p className="text-lg text-gray-600 mb-3">
            You have selected
          </p>

          <div className="mx-auto max-w-md rounded-2xl bg-blue-50 border-4 border-blue-500 py-8">
            <h2 className="text-4xl font-bold text-blue-700">
              {candidate}
            </h2>
          </div>

          <p className="text-gray-600 text-lg mt-6">
            You may still change your choice if needed.
          </p>
        </section>

        {/* =======================
            ACTIONS
        ======================= */}
        <section className="bg-white rounded-3xl shadow-xl px-10 py-8">
          <div className="flex flex-col md:flex-row justify-center gap-6">

            {/* CHANGE SELECTION */}
            <button
              onClick={() => {
                speak("Returning to candidate selection.");
                navigate(-1);
              }}
              className="
                px-8 py-4 rounded-xl
    bg-black
    border-2 border-black-600
    text-black-700 text-lg font-semibold
    hover:bg-black-50
    focus:outline-none focus:ring-4 focus:ring-black-300
    transition
  "
            >
              <span aria-hidden="true" className="text-2xl">↺</span>
              <span>Change Selection</span>
            </button>

            {/* CONFIRM */}
            <button
              onClick={() => {
                speak("Your vote has been successfully confirmed.");
                alert("Vote submitted securely.");
              }}
              className="
                px-10 py-5 rounded-xl
                bg-green-600 text-white text-xl font-semibold
                hover:bg-green-700
                focus:ring-4 focus:ring-green-300
                transition
              "
            >
              Confirm Vote
            </button>

          </div>
        </section>

      </div>
    </div>
  );
}
