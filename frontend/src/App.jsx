import { BrowserRouter, Routes, Route } from "react-router-dom";

import AccessibilityModeSelect from "./pages/AccessibilityModeSelect";

import VoteVisual from "./pages/VoteVisual";
import VoteSenior from "./pages/VoteSenior";
import VoteCognitive from "./pages/VoteCognitive";
import VoteMotor from "./pages/VoteMotor";
import VoteHearing from "./pages/VoteHearing";
import VoteStandard from "./pages/VoteStandard";

import ConfirmVote from "./pages/ConfirmVote";
import { AccessibilityProvider } from "./context/AccessibilityContext";

function App() {
  return (
    <AccessibilityProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AccessibilityModeSelect />} />

          <Route path="/vote/visual" element={<VoteVisual />} />
          <Route path="/vote/senior" element={<VoteSenior />} />
          <Route path="/vote/cognitive" element={<VoteCognitive />} />
          <Route path="/vote/motor" element={<VoteMotor />} />
          <Route path="/vote/hearing" element={<VoteHearing />} />
          <Route path="/vote/standard" element={<VoteStandard />} />

          <Route path="/confirm" element={<ConfirmVote />} />
        </Routes>
      </BrowserRouter>
    </AccessibilityProvider>
  );
}

export default App;
