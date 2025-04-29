import React from "react";
import './WhyZenn.css';

import leftArrow from "../../../assests/LeftArrow.png";
import zennLogo from "../../../assests/logo.png";
import rightArrow from "../../../assests/RightArrow.png";

const WhyZenn = () => {
    return (
        <div className="WhyZenn-container">
            <div className="WhyZenn-heading">
                <h1>Why “Zenn Aura”?</h1>
                <h4>The Name Reflects Our Ethos:</h4>
            </div>
            
            <div className="WhyZenn-divider"></div>
            
            <div className="WhyZenn-logoimg">
                <div className="WhyZenn-leftarrowimg">
                    <img src={leftArrow} alt="Left Arrow" />
                </div>
                <div className="WhyZenn-zennlogoimg">
                    <img src={zennLogo} alt="Zenn Logo" />
                </div>
                <div className="WhyZenn-rightarrowimg">
                    <img src={rightArrow} alt="Right Arrow" />
                </div>
            </div>
            
            <div className="WhyZenn-content">
                <div className="WhyZenn-definition">
                    <h2>Zen:</h2>
                    <p>Tranquility, Mindfulness, And Connection To The Present</p>
                </div>
                
                <div className="WhyZenn-divider-short"></div>
                
                <div className="WhyZenn-definition">
                    <h2>Aura:</h2>
                    <p>Radiance, Energy, And The Essence Of Who We Are</p>
                </div>
            </div>
            
            <div className="WhyZenn-divider"></div>
            
            <div className="WhyZenn-footer">
                <p>Together, Zenn Aura Represents A Harmonious Blend Of Beauty And Wellness—A Brand That Cares For Both Your Skin And Your Spirit</p>
            </div>
        </div>
    );
}

export default WhyZenn;