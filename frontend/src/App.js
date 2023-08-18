import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navb from "./pages/Navb"; // Import the Navb component
import Hero from "./pages/Hero";
import './App.css';


function App() {
  return (
    <Router>
      <div className="App">
        <Navb />
        <Hero />
      </div>
    </Router>
  );
}

export default App;