// src/App.jsx - UPDATED WITH NEW ROUTES
import React from "react";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import ViewSelector from "./pages/ViewSelector";  // ← NEW
import ScarfStore from "./components/ScarfStore";  // Will be desktop version
import ScarfStoreMobile from "./components/ScarfStoreMobile";  // ← NEW (we'll create next)
import ThankYou from "./pages/ThankYou";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <div>
      <Toaster position="top-right" reverseOrder={false} />

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/view-selector" element={<ViewSelector />} />  {/* ← NEW */}
        <Route path="/shop-desktop" element={<ScarfStore />} />  {/* ← Desktop view */}
        <Route path="/shop-mobile" element={<ScarfStoreMobile />} />
        <Route path="/shop" element={<ScarfStore />} />  {/* ← Keep for backward compatibility */}
        <Route path="/thank-you" element={<ThankYou />} />
      </Routes>
    </div>
  );
}

export default App;
