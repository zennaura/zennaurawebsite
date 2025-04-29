import React from 'react';
import './Redefining.css';
import Redefiningimg1 from '../../assests/Redefiningimg1.png'
import Redefiningimg2 from '../../assests/Redefiningimg2.png'
import Redefiningimg3 from '../../assests/Redefiningimg3.png'
import Redefiningimg4 from '../../assests/Redefiningimg4.png'
import Redefiningimg5 from '../../assests/Redefiningimg5.png'
const Redefining = () => {
    return (
        <div className="redefining-container">
            <div className="redefining-image-left images">
                <div className="img-box redifining-img-box1">
                    <img src={Redefiningimg1} alt="Skincare Model" />
                </div>
                <div className="img-box redifining-img-box2">
                    <img src={Redefiningimg2} alt="Skincare Model" />
                </div>
            </div>
            <div className="redefining-content">
                <div className="redefining-icon">
                    <span className="redefining-ball3"></span>
                    <span className="redefining-ball2"></span>
                    <span className="redefining-ball1"></span>
                </div>
                <div className="redefining-words-span">
                    <span className="word">Manifest</span>
                    <span className="word">Cleanse</span>
                    <span className="word">Heal</span>
                </div>
                <div className="redefining-icon">
                    <span className="redefining-ball1"></span>
                    <span className="redefining-ball2"></span>
                    <span className="redefining-ball3"></span>
                </div>
            </div>
            <div className="redefining-image-right images">
                <div className="img-box redifining-img-box3">
                    <img src={Redefiningimg3} alt="Skincare Model" />
                </div>
                <div className="img-box redifining-img-box4">
                    <img src={Redefiningimg4} alt="Skincare Model" />
                </div>
                <div className="img-box redifining-img-box5">
                    <img src={Redefiningimg5} alt="Skincare Model" />
                </div>
            </div>
        </div>
    );
};

export default Redefining;
