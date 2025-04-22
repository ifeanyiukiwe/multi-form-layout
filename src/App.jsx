import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Thanks from "./components/Thanks";
import About from "./components/About";
import AddsOn from "./components/AddsOn";
import Summary from "./components/Summary";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/addons" element={<AddsOn />} />
        <Route path="/summary" element={<Summary />} />
        <Route path="/thanks" element={<Thanks />} />
      </Routes>
    </Router>
  );
}

export default App;
