import { Route, Routes } from "react-router-dom";
import { ToastProvider } from "./components";
import { Home } from "./pages/Home";

const App = () => (
  <ToastProvider>
    <Routes>
      <Route path="/" element={<Home />} />
      {/* Anything unmatched falls back to the single-page portfolio. */}
      <Route path="*" element={<Home />} />
    </Routes>
  </ToastProvider>
);

export default App;
