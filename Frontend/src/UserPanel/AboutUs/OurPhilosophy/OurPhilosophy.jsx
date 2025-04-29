import "./OurPhilosophy.css";
import React from "react";


const OurPhilosophy = () => {
  return (
    <div className="ourphilosophy-container">
      <div className="ourphilosophy-left-content">
        <div className="philosophy-left-content-upper">

          <h1 className="ourphilosophy-title">Our Philosophy</h1>
          <p className="ourphilosophy-text">
            More than just a brand, Zen Aura represents a lifestyle that celebrates balance, harmony, and conscious self-care.
            Our mission is to assist you in establishing rituals that not only enhance your beauty but also purify and heal your aura.
          </p>
          <p className="ourphilosophy-text">
            Whether you are exploring our natural skincare range or delving into the magic of holistic wellness through crystals, sage,
            and healing tools, Zen Aura invites you to embark on a transformative journey—both inside and out.
          </p>
        </div>
        <h1 className="ourphilosophy-title">Luxury of Purity</h1>

        <ul className="ourphilosophy-list">
          <li><span className="ourphilosophy-bullet">◊</span> Beauty is not just skin deep; it starts from within.</li>
          <li><span className="ourphilosophy-bullet">◊</span> Inspired by ancient healing traditions and rooted in natural purity.</li>
          <li><span className="ourphilosophy-bullet">◊</span> Combines artisanal skincare with wellness rituals for overall well-being.</li>
        </ul>
      </div>

      <div className="ourphilosophy-right-content">
        <div className="ourphilosophy-circle"></div>
      </div>
    </div>
  );
}

export default OurPhilosophy;