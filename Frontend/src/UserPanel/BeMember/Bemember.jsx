import React from "react";
import "./Bemember.css"; // Import the CSS file for styling

// Import all images as modules
import rewardIcon from "../../assests/reward.png";
import dealIcon from "../../assests/deal.png";
import priorityIcon from "../../assests/priority.png";
import trainingIcon from "../../assests/training.png";
import surpriseIcon from "../../assests/surprise.png";
import memberCardIcon from "../../assests/member-card.png";

const Bemember = () => {
  // Data for the benefits cards
  const benefits = [
    {
      icon: rewardIcon,
      title: "Rewards On All Purchases",
    },
    {
      icon: dealIcon,
      title: "Exclusive Deals & Offers",
    },
    {
      icon: priorityIcon,
      title: "Priority Shipping",
    },
    {
      icon: trainingIcon,
      title: "Access To  Workshops & Rituals",
    },
    {
      icon: surpriseIcon,
      title: "Customized Member Card",
    },
    {
      icon: memberCardIcon,
      title: " Birthday & Anniversary Gifts",
    },
  ];

  return (
    <div className="bemember-container">
      {/* Header */}
      <h1 className="bemember-heading">BE A MEMBER</h1>
      <p className="bemember-title">UNLOCK EXCLUSIVE ENERGY REWARDS!</p>
      <p className="bemember-text">
        Our Exclusive Membership Program is crafted to reward you for embracing self-care, spirituality, and conscious living.
      </p>

      {/* Benefits Cards */}
      <div className="bemember-cards">
        {benefits.map((benefit, index) => (
          <div key={index} className="bemember-card">
            <div className="bemember-card-icon">
              <img src={benefit.icon} alt={benefit.title} />
            </div>
            <div className="bemember-card-title-box">
              <h2 className="bemember-card-title">{benefit.title}</h2>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <h2 className="bemember-footer-heading">Elevate Your Spiritual Journey!</h2>
      <button className="bemember-btn">JOIN THE ZENN AURA TRIBE</button>
    </div>
  );
};

export default Bemember;    