import React from "react";
import Lottie from "lottie-react";
import heroAnimation from "./lottiefiles/study.json"
import './style/Hero.css';
import heroImage from "./images/hero.png";

const Hero = () => {
    return (
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-6">
            <div className="text-container">
                <h1>Explore, Learn, Research, Share Academify</h1>
                <p>Your Gateway to the World of Academic Research</p>
                <a href="/search" className="btn btn-primary">Search</a>
            </div>
          </div>
          <div className="col-md-6">
            {/* <img src={heroImage} alt="hero" className="img-fluid" /> */}
            <Lottie animationData={heroAnimation} style={{ height: 400, width: 400 }} />

          </div>
        </div>
      </div>
    );
  };
  

export default Hero;
