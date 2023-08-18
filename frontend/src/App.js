import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navb from "./pages/Navb"; // Import the Navb component
import Hero from "./pages/Hero";
import Featured from "./pages/Featured";
import './App.css';


function App() {
  return (
    <Router>
      <div className="App">
        <Navb />
        <Hero />
        <Featured />
      </div>
    </Router>
  );
}

export default App;