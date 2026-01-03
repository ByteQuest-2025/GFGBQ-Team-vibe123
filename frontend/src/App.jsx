import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Vote from "./pages/Vote";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/vote" element={<Vote />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
