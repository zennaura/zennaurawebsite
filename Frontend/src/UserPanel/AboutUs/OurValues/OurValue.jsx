import React from "react";
import "./OurValue.css";
import Number_1 from "../../../assests/Number_1.png";
import Number_2 from "../../../assests/Number_2.png";
import Number_3 from "../../../assests/Number_3.png";
const OurValue = () => {
  return (
    <div className="OurValue-wrapper">
      <div className="OurValue-container">
        <h1 className="OurValue-title">Our Values</h1>

        <div className="OurValue-row">
          <div className="OurValue-text OurValue-left">
            <h2 className="OurValue-value-title">Purity You Can See & Trust</h2>
            <p className="OurValue-value-detail">
              We Don't Just Claim Purity—We Prove It. From Our Ingredient
              Sourcing To Our Advertisements And Product Transparency.
            </p>
          </div>
          <div className="OurValue-divider">
            <img src={Number_1} alt="img 1" />
          </div>
        </div>

        <div className="OurValue-row OurValue-right">
          <div className="OurValue-divider">
            <img src={Number_2} alt="img 2" />
          </div>
          <div className="OurValue-text OurValue-right">
            <h2 className="OurValue-value-title">Evolving Through You</h2>
            <p className="OurValue-value-detail">
              Your Feedback Shapes Us. We Are Always Listening, Learning, And
              Improving To Bring You Skincare And Wellness That Truly Aligns
              With Your Needs.
            </p>
          </div>
          
        </div>

        {/* Our products are infused with nature’s
              wisdom,  for laptop */} 

        <div className="OurValue-row OurValue-row-last">
          <div className="OurValue-text OurValue-left">
            <h2 className="OurValue-value-title">Healing Beyond Beauty</h2>
            <p className="OurValue-value-detail">
              Zenn Aura isn’t just about skincare—it’s about energy, well-being,
              and mindful rituals. Designed to balance your aura and elevate your daily
              self-care.
            </p>
          </div>
          <div className="OurValue-divider">
            <img src={Number_3} alt="img 3" />

          </div>
        </div>
      </div>
    </div>
  );
};

export default OurValue;
