import React from "react";
import "./DivineCrystalRange.css";

import image1 from "../../../../../assests/iso.png";
import image2 from "../../../../../assests/iso.png";
import image3 from "../../../../../assests/iso.png";
import image4 from "../../../../../assests/iso.png";
import image5 from "../../../../../assests/iso.png";
import image6 from "../../../../../assests/iso.png";
import image7 from "../../../../../assests/iso.png";



const DivineCrystalRange = () => {
    
    const skinCareProducts = [
        { title: "Tower/Wand", image: image1 },
        { title: "Charging Crystal", image: image2 },
        { title: "Pyramid", image: image3 },
        { title: "Skin Roller", image: image4 },
        { title: "Crystal Tree", image: image5 },
        { title: "Tumbles", image: image6 },
        { title: "Zibu Coin", image: image7 },
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
