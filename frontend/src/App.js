import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navb from "./pages/Navb";
import Hero from "./pages/Hero";
import Featured from "./pages/Featured";
import Search from "./pages/Search";
import Body from "./pages/Body"; // Import the Body component
import './App.css';


function App() {
  return (
    <Router>
      <div className="App">
        <Navb />
        <Routes>
          <Route path="/search" element={<Search />} />
          <Route path="*" element={<Body />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;