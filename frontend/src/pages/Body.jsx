import React from "react";
import Hero from "./Hero";
import Featured from "./Featured";
import AboutSection from "./AboutSection"; // Import the AboutSection component


const Body = () => {
  return (
    <div>
      <Hero />
      <Featured />
      <AboutSection /> {/* Include the AboutSection component */}=
    </div>
  );
};

export default Body;
