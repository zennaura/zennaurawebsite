import React from "react";
import "./HandMadeLove.css";

const Handmadelove = () => {
  return (
    <div className="Handmadelove-container">
      <h1 className="Handmadelove-title">
        What Makes Us Different?
      </h1>
      <div className="Handmadelove-content">
        <div className="Handmadelove-div Handmadelove-div-left">
          <div className="Handmadelove-textdiv">
            <h1>If You Can Eat It, It's save for your Skin</h1>
            <p>
              Our skincare is chemical & preservative free, made from real,
              edible ingredients.
            </p>
          </div>
        </div>
        <div className="Handmadelove-div Handmadelove-div-right">
          <div className="Handmadelove-textdiv">
            <h1>
              Handcrafted by Women 
              Artisans
            </h1>
            <p>
              Each product is lovingly handmade by skilled women artisans,
              carries the warmth of human touch.
            </p>
          </div>
        </div>
        <div className="Handmadelove-div Handmadelove-div-left">
          <div className="Handmadelove-textdiv">
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
