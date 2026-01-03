import Vote from "./pages/Vote";
import { AccessibilityProvider } from "./context/AccessibilityContext";

function App() {
  return (
    <AccessibilityProvider>
      <Vote />
    </AccessibilityProvider>
  );
}

export default App;
