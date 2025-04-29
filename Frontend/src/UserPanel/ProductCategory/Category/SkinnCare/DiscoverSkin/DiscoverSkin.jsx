import React from "react";
import "./DiscoverSkin.css";

import image1 from "../../../../../assests/iso.png";
import image2 from "../../../../../assests/iso.png";
import image3 from "../../../../../assests/iso.png";
import image4 from "../../../../../assests/iso.png";
import image5 from "../../../../../assests/iso.png";



const DiscoverSkin = () => {
    
    const skinCareProducts = [
        { title: "Clay Soap", image: image1 },
        { title: "Scrub Soap", image: image2 },
        { title: "Therapeutic Soap", image: image3 },
        { title: "Fruit Soap", image: image4 },
        { title: "Glycerin Soap", image: image5 },
    ];

    return (
        <>
            <div className="DiscoverSkin-container">
                <div className="DiscoverSkin-heading">
                    Discover Our Skin Care Range
                </div>

                <div className="DiscoverSkin-items-container">
                    {skinCareProducts.map((product, index) => (
                        <div className="DiscoverSkin-item" key={index}>
                            <div className="DiscoverSkin-item-image">
                                <img src={product.image} alt={product.title} />
                            </div>
                            <div className="DiscoverSkin-item-title">{product.title}</div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default DiscoverSkin;
