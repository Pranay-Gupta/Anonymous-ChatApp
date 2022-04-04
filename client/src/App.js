import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Join from "./pages/Join";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Join />} />
      <Route path="/chat/:name/:room" element={<Home />} />
    </Routes>
  );
}

export default App;
