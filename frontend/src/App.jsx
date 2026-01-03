import { BrowserRouter, Routes, Route } from "react-router-dom";
import AccessibilityModeSelect from "./pages/AccessibilityModeSelect";
import Vote from "./pages/Vote";
import { AccessibilityProvider } from "./context/AccessibilityContext";

function App() {
  return (
    <AccessibilityProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AccessibilityModeSelect />} />
          <Route path="/vote" element={<Vote />} />
        </Routes>
      </BrowserRouter>
    </AccessibilityProvider>
  );
}

export default App;
