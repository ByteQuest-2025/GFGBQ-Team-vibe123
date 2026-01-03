import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function VoteMotor() {
  const navigate = useNavigate();

  const candidates = ["Candidate A", "Candidate B", "Candidate C"];
  const [index, setIndex] = useState(0);

  const currentCandidate = candidates[index];

  const nextCandidate = () => {
    setIndex((prev) => (prev + 1) % candidates.length);
  };

  const prevCandidate = () => {
    setIndex((prev) => (prev - 1 + candidates.length) % candidates.length);
  };

  const selectCandidate = () => {
    navigate("/confirm", { state: { candidate: currentCandidate } });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-slate-100 to-indigo-100 flex items-center justify-center px-6">
      <section className="w-full max-w-3xl bg-white rounded-3xl shadow-2xl px-12 py-12 text-center">

        {/* STEP */}
        <p className="text-sm text-gray-500 mb-2">Step 2 of 3</p>
        <div className="h-2 bg-gray-200 rounded-full mb-8">
          <div className="h-2 w-2/3 bg-indigo-500 rounded-full"></div>
        </div>

        {/* TITLE */}
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Select Your Candidate
        </h1>

        {/* INSTRUCTION */}
        <p className="text-lg text-gray-600 mb-10 max-w-xl mx-auto">
          Use the large buttons below.  
          You may also use a keyboard or assistive switch device.
        </p>

        {/* CANDIDATE DISPLAY */}
        <div
          className="
            h-40
            rounded-3xl
            bg-indigo-50
            border-4
            border-indigo-400
            flex
            items-center
            justify-center
            text-4xl
            font-semibold
            text-indigo-800
            mb-10
          "
        >
          {currentCandidate}
        </div>

        {/* NAVIGATION */}
        <div className="flex justify-between gap-6 mb-8">
          <button
            onClick={prevCandidate}
            className="
              flex-1
              py-6
              rounded-2xl
              bg-slate-200
              text-xl
              font-medium
              text-slate-700
              hover:bg-slate-300
              focus:outline-none
              focus:ring-4
              focus:ring-slate-300
            "
          >
            ◀ Previous
          </button>

          <button
            onClick={nextCandidate}
            className="
              flex-1
              py-6
              rounded-2xl
              bg-slate-200
              text-xl
              font-medium
              text-slate-700
              hover:bg-slate-300
              focus:outline-none
              focus:ring-4
              focus:ring-slate-300
            "
          >
            Next ▶
          </button>
        </div>

        {/* SELECT */}
        <button
          onClick={selectCandidate}
          className="
            w-full
            py-6
            rounded-2xl
            bg-teal-600
            text-white
            text-2xl
            font-semibold
            hover:bg-teal-700
            focus:outline-none
            focus:ring-4
            focus:ring-teal-300
          "
        >
          Select {currentCandidate}
        </button>

        {/* FOOTNOTE */}
        <p className="text-sm text-gray-500 mt-8">
          You can review and change your choice on the next screen.
        </p>

      </section>
    </div>
  );
}
