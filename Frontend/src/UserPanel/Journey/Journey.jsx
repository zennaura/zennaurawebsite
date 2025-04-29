import React from "react";
import "./Journey.css";

const Journey = () => {
  return (
    <div className="Journey-container">
      {/* Main Content */}
      <div className="Journey-content">
        <div className="Journey-textBox">
          <p className="Journey-subHeading">Experience the Luxury </p>
          <h2 className="Journey-heading">A Journey to  <br/>
          Elevate Your Energy, Awaken Your Senses</h2>
          <p className="Journey-description">
          Discover a world of authentic healing crystals, candles, soaps, and spiritual wellness tools - handcrafted to cleanse, manifest, and elevate your energy.
          Whether you seek chakra healing, energy cleansing, spiritual protection, or manifestation rituals, Zenn Aura offers powerful tools to transform your daily self-care into sacred rituals.
          </p>
          <p className="Journey-products">
          Your Sanctuary for Crystals, Skin Care, Manifestation & Spiritual Healing
          </p>
        </div>
        <div className="journey-button">
          <button>SHOP NOW</button>
        </div>
      </div>
    </div>
  );
};

export default Journey;
