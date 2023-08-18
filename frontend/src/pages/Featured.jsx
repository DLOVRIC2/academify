import React from "react";
import logo1 from "./images/logo1.png";
import logo2 from "./images/logo2.png";
import logo3 from "./images/logo3.png";
import logo4 from "./images/logo4.png";
import './style/Featured.css';


const Featured = () => {
    return (
        <div>

            {/* <h2 className="featured-header">Featured on:</h2> */}



            <div className="featured-container">
                <div className="logo-row justify-content-center">
                    <img src={logo1} alt="Logo 1" className="logo-img" />
                    <img src={logo2} alt="Logo 2" className="logo-img" />
                    <img src={logo3} alt="Logo 3" className="logo-img" />
                    <img src={logo4} alt="Logo 4" className="logo-img" />
                </div>
            </div>
        </div>
    );
};

  
  
  export default Featured;
