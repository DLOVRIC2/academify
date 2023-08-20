import React from "react";
import Hero from "./Hero";
import Featured from "./Featured";
import AboutSection from "./AboutSection"; // Import the AboutSection component
import Footer from "./Footer";


const Body = () => {
  return (
    <div>
      <Hero />
      <Featured />
      <AboutSection />
      <Footer />
    </div>
  );
};

export default Body;
