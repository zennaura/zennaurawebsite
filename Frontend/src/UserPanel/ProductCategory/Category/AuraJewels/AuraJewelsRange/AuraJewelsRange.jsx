import React from "react";
import "./AuraJewelsRange.css";

import image1 from "../../../../../assests/iso.png";
import image2 from "../../../../../assests/iso.png";
import image3 from "../../../../../assests/iso.png";
import image4 from "../../../../../assests/iso.png";
import image5 from "../../../../../assests/iso.png";



const AuraJewelsRange = () => {
    
    const skinCareProducts = [
        { title: "Crystal Bracelet", image: image1 },
        { title: "Zodiac Bracelet", image: image2 },
        { title: "Chakra Braceket", image: image3 },
        { title: "Combo Bracelet", image: image4 },
        { title: "Crystal Jewels", image: image5 },
    ];

    return (
        <>
            <div className="AuraJewelsRange-container">
                <div className="AuraJewelsRange-heading">
                Discover Our Aura Jewels Range
                </div>

                <div className="AuraJewelsRange-items-container">
                    {skinCareProducts.map((product, index) => (
                        <div className="AuraJewelsRange-item" key={index}>
                            <div className="AuraJewelsRange-item-image">
                                <img src={product.image} alt={product.title} />
                            </div>
                            <div className="AuraJewelsRange-item-title">{product.title}</div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default AuraJewelsRange;
