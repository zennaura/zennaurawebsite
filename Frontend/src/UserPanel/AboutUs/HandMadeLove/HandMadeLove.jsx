import React from "react";
import "./HandMadeLove.css";
import one from "../../../assests/Number_4.png";
import two from "../../../assests/Number_5.png";
import three from "../../../assests/Number_6.png";

const Handmadelove = () => {
  return (
    <div className="Handmadelove-container">
      <h1 className="Handmadelove-title">
        What Makes Us Different?
      </h1>
      <div className="Handmadelove-content">
        <div className="Handmadelove-div Handmadelove-div-left" style={{ backgroundImage: `url(${one})` }}>
          <div className="Handmadelove-textdiv" >
            <h1>If You Can Eat It, It's safe for your Skin</h1>
            <p>
              Our skincare is chemical & preservative free, made from real,
              edible ingredients.
            </p>
          </div>
        </div>
        <div className="Handmadelove-div Handmadelove-div-right" style={{ backgroundImage: `url(${two})` }}>
          <div className="Handmadelove-textdiv">
            <h1>
              Handcrafted by Women 
              Artisans
            </h1>
            <p>
              Each product is lovingly handmade by skilled women artisans.
            </p>
          </div>
        </div>
        <div className="Handmadelove-div Handmadelove-div-left" style={{ backgroundImage: `url(${three})` }}>
          <div className="Handmadelove-textdiv" >
            <h1>
              Handpicked Crystals for Energy
            </h1>
            <p>
              We deliver hand-selected healing crystals that bring harmony to
              your spirit and well-being.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Handmadelove;
