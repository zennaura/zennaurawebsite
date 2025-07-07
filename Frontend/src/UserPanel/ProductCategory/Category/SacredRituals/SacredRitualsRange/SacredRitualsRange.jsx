import React from "react";
import "./SacredRitualsRange.css";

import image1 from "../../../../../assests/c2.jpg";
import image2 from "../../../../../assests/candle.jpeg";
import image3 from "../../../../../assests/c4.jpg";
import image4 from "../../../../../assests/c3.jpg";
import image5 from "../../../../../assests/c1.jpg";



const SacredRitualsRange = () => {
    
    const skinCareProducts = [
        { title: "Charging Crystal", image: image1 },
        { title: "Candle", image: image2 },
        { title: "Lamp", image: image3 },
        { title: "Sage", image: image4 },
        { title: "Palo Santo", image: image5 },
    ];

    return (
        <>
            <div className="SacredRitualsRange-container">
                <div className="SacredRitualsRange-heading">
                Discover Our Sacred Rituals Range
                </div>

                <div className="SacredRitualsRange-items-container">
                    {skinCareProducts.map((product, index) => (
                        <div className="SacredRitualsRange-item" key={index}>
                            <div className="SacredRitualsRange-item-image">
                                <img src={product.image} alt={product.title} />
                            </div>
                            <div className="SacredRitualsRange-item-title">{product.title}</div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default SacredRitualsRange;
