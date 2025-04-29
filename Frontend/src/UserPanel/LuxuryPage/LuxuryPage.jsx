import React from "react";
import "./LuxuryPage.css";
import Luxuryimg from "../../assests/Luxuryimg.png"
import Handmadeimg from "../../assests/handemadeimg.png"
import Flowerport from "../../assests/flowerport.png"
import Percentimg100 from "../../assests/100percentimg.png"

const LuxuryPage = () => {
    return (
        <div className="luxuryPage-container">
            <div className="luxuryPage-content-box">
                {/* Header Section */}
                <div className="luxuryPage-header">
                    <p className="luxuryPage-subtext">We believe true luxury doesn’t compromise—it nurtures.</p>
                    <h1 className="luxuryPage-title">Our Promise: Purity Meets Luxury</h1>
                </div>

                {/* Image Section */}
                <div className="luxuryPage-image-container">
                    <img src={Luxuryimg} className="luxuryPage-luxury-image" />
                </div>

                {/* Features Section */}
                <div className="luxuryPage-features-section">
                    <p className="luxuryPage-subtext">
                        We believe true luxury doesn’t compromise—it nurtures. Zenn Aura is:
                    </p>
                    <div className="luxuryPage-features">
                        {features.map((feature, index) => (
                            <div key={index} className="luxuryPage-feature-box">
                                {/* Icon */}
                                <div className="luxuryPage-feature-icon-wrapper">
                                <img className="luxuryPage-feature-icon" src={feature.icon} alt="img" />
                                </div>
                                {/* text */}
                                <h3 className="luxuryPage-feature-title">{feature.title}</h3>
                                <p className="luxuryPage-feature-description">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                    <h2 className="luxuryPage-footer-text">
                    When you choose Zenn Aura,<br />
                    you choose a brand that values authenticity, beauty, and the planet
                    </h2>
                </div>
            </div>
        </div>
    );
};

const features = [
    {
        icon: Percentimg100,
        title: "Authentic & Natural",
        description: "No synthetic additives, just pure, high-vibrational ingredients."
    },
    {
        icon: Handmadeimg,
        title: "Handmade with Love",
        description: "Handcrafted to cleanse, manifest, and elevate your energy."
    },
    {
        icon: Flowerport,
        title: "Infused with Love",
        description: "Each product is one of a kind, crafted with positive energy."
    }
];

export default LuxuryPage;
