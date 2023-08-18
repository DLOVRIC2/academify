import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navb from "./pages/Navb"; // Import the Navb component
import './App.css';


function App() {
  return (
    <Router>
      <div className="App">
        <Navb />
      </div>
    </Router>
  );
}

export default App;