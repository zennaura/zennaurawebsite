import React from "react";
import "./SelfCare.css";
import Selfcareimg from '../../assests/selfcareimg.png'
const SelfCare = () => {
    return (
        <div className="selfCare-container">
            {/* Overlay */}
            <div className="selfCare-overlay">
                <img src={Selfcareimg} alt="" />
            </div>

            {/* Content */}
            <div className="selfCare-content">
                <h2 className="selfCare-heading">HOLISTIC HEALING</h2>

               
                {/* quote box */}
                <div className="selfCare-quote-box">
                    {/* quote */}
                    <p className="selfCare-quote">
                        "Indulge in the  luxurious offerings of Zenn Aura, where every product is a testament to naturez's purity and artistry."
                    </p>
                </div>
               
               
                <h2 className="selfCare-heading-lower">MINDFUL LIVING</h2>
            </div>
        </div>
    );
};

export default SelfCare;
