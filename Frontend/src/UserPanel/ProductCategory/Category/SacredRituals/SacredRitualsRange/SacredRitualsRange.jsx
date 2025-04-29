import React from "react";
import "./SacredRitualsRange.css";

import image1 from "../../../../../assests/iso.png";
import image2 from "../../../../../assests/iso.png";
import image3 from "../../../../../assests/iso.png";
import image4 from "../../../../../assests/iso.png";
import image5 from "../../../../../assests/iso.png";



const SacredRitualsRange = () => {
    
    const skinCareProducts = [
        { title: "Clay Soap", image: image1 },
        { title: "Scrub Soap", image: image2 },
        { title: "Therapeutic Soap", image: image3 },
        { title: "Fruit Soap", image: image4 },
        { title: "Glycerin Soap", image: image5 },
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
