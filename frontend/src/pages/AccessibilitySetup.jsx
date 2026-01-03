import { useContext } from "react";
import { AccessibilityContext } from "../context/AccessibilityContext";

export default function AccessibilitySetup() {
  const {
    setFontSize,
    setContrast,
    setVoice,
  } = useContext(AccessibilityContext);

  return (
    <div className="p-6 flex flex-col gap-4">
      <h2 className="text-2xl font-bold">Accessibility Settings</h2>

      <button onClick={() => setFontSize("large")}>
        Enable Large Text
      </button>

      <button onClick={() => setContrast("high")}>
        Enable High Contrast
      </button>

      <button onClick={() => setVoice(true)}>
        Enable Voice Guidance
      </button>
    </div>
  );
}
