import React from "react";
import "./DivineCrystalRange.css";

import image1 from "../../../../../assests/tumble1.jpg";
import image2 from "../../../../../assests/m4_1.jpeg";
import image3 from "../../../../../assests/tree.jpg";
import image4 from "../../../../../assests/heart.jpeg";
import image5 from "../../../../../assests/mala.jpeg";
import image6 from "../../../../../assests/ruler.jpeg";
import image7 from "../../../../../assests/m3.jpg";
import image8 from "../../../../../assests/guasha.jpeg";

// Aura Jewels

// Crystal Pendant 
// Crystal Ring
// Combo Bracelet
// Chakra Bracelet 
// Crystal Bracelet 

// Divine Crystals

// Crystal Tumble
// Tumble Kits
// Crystal Tree
// Crystal Heart
// Crystal Mala
// Zibu Coin
// Crystal Roller
// Gua Sha


// Sacred rituals 

// Charging Crystal
// Candle
// Lamp
// Sage
// Palo Santo

const DivineCrystalRange = () => {
    
    const skinCareProducts = [
        { title: "Crystal Tumble", image: image1 },
        { title: "Tumble Kits", image: image2 },
        { title: "Crystal Tree", image: image3 },
        { title: "Crystal Heart", image: image4 },
        { title: "Crystal Mala", image: image5 },
        { title: "Crystal Roller", image: image6 },
        { title: "Zibu Coin", image: image7 },
        { title: "Gua Sha", image: image8 },
    ];

    return (
        <>
            <div className="DivineCrystalRange-container">
                <div className="DivineCrystalRange-heading">
                    Discover Our Divine Crystal Range
                </div>

                <div className="DivineCrystalRange-items-container">
                    {skinCareProducts.map((product, index) => (
                        <div className="DivineCrystalRange-item" key={index}>
                            <div className="DivineCrystalRange-item-image">
                                <img src={product.image} alt={product.title} />
                            </div>
                            <div className="DivineCrystalRange-item-title">{product.title}</div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default DivineCrystalRange;
