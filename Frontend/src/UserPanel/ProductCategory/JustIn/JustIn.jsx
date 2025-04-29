import React from "react";
import './JustIn.css'


const JustIn = () => {
    return (
        <>
            <div className="justin-container">
                <div className="justin-title-content">
                    <h1 className="justin-title">Just In</h1>
                    <div className="justin-subhead">
                        <p>Explore our latest launches</p>
                    </div>
                </div>
                <div className="justin-products">
                    <div className="justin-product1">
                        <h3 className="justin-product-heading">
                        Holistic Skin Care Rituals
                        </h3>
                        <p className="justin-product-content">
                        Nourish your skin from face to body with our newest botanical-infused self-care essentials.
                        </p>

                        <button className="justin-product-button">Check Out</button>
                    </div>

                    <div className="justin-product2">
                        <h3 className="justin-product-heading">
                        Energy-Infused Crystals
                        </h3>
                        <p className="justin-product-content">
                        Balance your aura with our latest crystal bracelets, pyramids, and healing stones.
                        </p>

                        <button className="justin-product-button">Check Out</button>
                    </div>

                    <div className="justin-product3">
                        <h3 className="justin-product-heading">
                        Sacred Ritual & Wellness
                        </h3>
                        <p className="justin-product-content">
                        Cleanse your space and soul with our newest candles, sage sticks, and incense blends.
                        </p>

                        <button className="justin-product-button">Check Out</button>
                    </div>

                </div>
            </div>
        </>
    )
};

export default JustIn;