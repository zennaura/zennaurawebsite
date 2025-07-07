import React from "react";
import "./AuraJewelsRange.css";

import image1 from "../../../../../assests/Pendant.jpeg";
import image2 from "../../../../../assests/Ring.jpeg";
import image3 from "../../../../../assests/combo_bracelet.jpeg";
import image4 from "../../../../../assests/chakra_bracelet.jpeg";
import image5 from "../../../../../assests/bracelet.jpeg";



const AuraJewelsRange = () => {
    
    const skinCareProducts = [
        { title: "Pendant", image: image1 },
        { title: "Ring", image: image2 },
        { title: "Combo Bracelet", image: image3 },
        { title: "Chakra Bracelet", image: image4 },
        { title: "Crystal Bracelet", image: image5 },
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
