import React from "react";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";  // ← Add this
import ScarfStore from "./components/ScarfStore";
import ThankYou from "./pages/ThankYou";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <div>
      <Toaster position="top-right" reverseOrder={false} />

      <Routes>
        <Route path="/" element={<LandingPage />} />  {/* ← Landing page */}
        <Route path="/shop" element={<ScarfStore />} />  {/* ← Shop page */}
        <Route path="/thank-you" element={<ThankYou />} />
      </Routes>
    </div>
  );
}

export default App;