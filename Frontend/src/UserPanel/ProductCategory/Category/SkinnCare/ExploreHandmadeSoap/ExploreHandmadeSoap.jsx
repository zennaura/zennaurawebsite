import React from "react";
import Pureimg from "../../../../../assests/Pure.png";
import Handmadeimg from "../../../../../assests/handmade.png";
import Therapeutic from "../../../../../assests/Therapeutic.png";

import './ExploreHandmadeSoap.css'

const ExploreHandmadeSoap = () => {
    return (
        <div className="ExploreHandmadeSoap-container">
            <div className="ExploreHandmadeSoap-img-container">
                <div className="ExploreHandmadeSoap-img-div">
                    <img src={Pureimg} alt="Pure" />
                    <div className="ExploreHandmadeSoap-img-description">
                        Pure
                    </div>
                </div>
                <div className="ExploreHandmadeSoap-img-div">
                    <img src={Handmadeimg} alt="Handmade" />
                    <div className="ExploreHandmadeSoap-img-description">
                        Handmade
                    </div>
                </div>
                <div className="ExploreHandmadeSoap-img-div">
                    <img src={Therapeutic} alt="Therapeutic" />
                    <div className="ExploreHandmadeSoap-img-description">
                        Therapeutic
                    </div>
                </div>
            </div>
            
            <div className="ExploreHandmadeSoap-content">
                <h2 className="ExploreHandmadeSoap-title">
                    Experience The Magic Of Handmade, Natural Soaps Infused With Essential Oils And Healing Crystals.
                </h2>
                <p className="ExploreHandmadeSoap-description">
                    Shop Now & Transform Your Bathing Ritual!
                </p>
                <button className="ExploreHandmadeSoap-button">
                    EXPLORE HANDMADE SOAPS
                </button>
            </div>
        </div>
    );
};

export default ExploreHandmadeSoap;