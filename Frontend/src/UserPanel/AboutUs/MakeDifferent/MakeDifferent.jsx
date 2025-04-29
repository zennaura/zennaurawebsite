import React from "react";
import "./MakeDifferent.css";

const MakeDifferent = () => {
    return (
        <div className="MakeDifferent-container">
            <div className="MakeDifferent-header">
                <h1>What Makes Zenn Aura Different?</h1>
            </div>
            <div className="MakeDifferent-body">
                <div className="MakeDifferent-contentdiv1">
                    <h2 className="MakeDifferent-divheading">Handcrafted Purity</h2>
                    <button className="MakeDifferent-divbtn">Shop Now</button>
                </div>
                <div className="MakeDifferent-contentdiv2">
                    <h2 className="MakeDifferent-divheading">Natural Ingredients</h2>
                    <button className="MakeDifferent-divbtn">Shop Now</button>
                </div>
                <div className="MakeDifferent-contentdiv3">
                    <h2 className="MakeDifferent-divheading">Mindful <br /> Energy</h2>
                    <button className="MakeDifferent-divbtn">Shop Now</button>
                </div>
            </div>
        </div>
    );
}

export default MakeDifferent;