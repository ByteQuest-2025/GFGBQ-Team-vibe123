import { createContext, useState } from "react";

export const AccessibilityContext = createContext();

export const AccessibilityProvider = ({ children }) => {
  const [fontSize, setFontSize] = useState("normal"); // normal | large
  const [contrast, setContrast] = useState("normal"); // normal | high
  const [voice, setVoice] = useState(false);

  return (
    <AccessibilityContext.Provider
      value={{
        fontSize,
        setFontSize,
        contrast,
        setContrast,
        voice,
        setVoice,
      }}
    >
      {children}
    </AccessibilityContext.Provider>
  );
};
