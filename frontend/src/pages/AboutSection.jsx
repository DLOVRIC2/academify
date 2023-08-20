import React from "react";
import Lottie from "lottie-react";
import aboutAnimation from "./lottiefiles/about2.json";
import './style/AboutSection.css';

const AboutSection = () => {
  return (
    <div className="about-section-container">
      <div className="about-section-row">
        <div className="about-section-col-md-6">
          <Lottie
            animationData={aboutAnimation}
            speed={0.25} // Adjust the speed of the animation (1 is normal speed)
          />
        </div>
        <div className="about-section-col-md-6">
          <div className="about-section-text-container">
            <h1>Empowering Research</h1>
            <div className="about-section-paragraphs"> {/* New div class */}
              <p>Academify helps you explore, interact, and transform complex research papers into accessible insights. Your gateway to academic knowledge awaits!</p>
              <p>Experience the seamless navigation through the world of academia. Find answers to complex research questions, turn insights into shareable content, and join a community passionate about knowledge and discovery.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;
