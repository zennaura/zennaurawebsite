import React from "react";
import "./FollowUs.css";
import Followusbgimg from "../../assests/followus.png";
// Import icons from react-icons
import {
    FaInstagram,
    FaLinkedin,
} from "react-icons/fa";
import { TfiYoutube } from "react-icons/tfi";
import { FaXTwitter } from "react-icons/fa6";
import { FaPinterest } from "react-icons/fa";
import { FaSquareFacebook } from "react-icons/fa6"; // Square Facebook icon from Font Awesome 6

const FollowUs = () => {
    return (
        <div className="follow-us-container">
            {/* Background Image */}
            <div className="background-image">
                <img
                    src={Followusbgimg}
                    alt="Jewelry Background"
                    className="background-img"
                />

            </div>

            {/* Content Overlay */}
            <div className="content-overlay">
                {/* Heading */}
                <h2 className="function-heading">Follow Us</h2>

                {/* Social Media Icons */}
                <div className="function-social-icons">
                    <a href="https://www.facebook.com/zennaura/" target="_blank" rel="noopener noreferrer">
                        <FaSquareFacebook className="function-icon" color="#390611"/> {/* Square Facebook icon */}
                    </a>
                    <a href="https://www.instagram.com/zennaura/" target="_blank" rel="noopener noreferrer">
                        <FaInstagram className="function-icon" color="#390611" />
                    </a>
                    <a href="https://www.linkedin.com/company/zennaura/" target="_blank" rel="noopener noreferrer">
                        <FaLinkedin className="function-icon" color="#390611" />
                    </a>
                    <a href="https://twitter.com/zennaura" target="_blank" rel="noopener noreferrer">
                        <FaXTwitter className="function-icon" color="#390611" /> {/* X icon instead of Twitter */}
                    </a>
                    <a href="https://www.youtube.com/channel/zennaura" target="_blank" rel="noopener noreferrer">
                        <FaPinterest className="function-icon" color="#390611"/>
                    </a>

                </div>
            </div>
        </div>
    );
};

export default FollowUs;