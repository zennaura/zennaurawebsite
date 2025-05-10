import "./Footer.css";
import { Link } from "react-router-dom";
import { FaInstagram, FaLinkedinIn, FaXTwitter, FaYoutube, FaFacebook } from "react-icons/fa6";
import React from 'react';
const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        
        {/* Shop Section */}
        <div className="footer-section">
          <h3 className="footer-title">Shop</h3>
          <ul className="footer-list">
            <li>All Products</li>
            <li>Skin Care</li>
            <li>Divine Crystals</li>
            <li>Sacred Rituals</li>
            <li>Aura Jewels</li>
            <li>Gifting</li>
            <li>Travel Minis</li>
          </ul>
        </div>

        {/* About Section */}
        <div className="footer-section">
          <h3 className="footer-title">About</h3>
          <ul className="footer-list">
             <li>Our Philoshophy</li>
            <li><Link to="/policies">Policies</Link></li>
            <li><Link to="/termsandconditions">Terms</Link></li>
            <li>FAQ’s</li>
            <li>Career</li>
          </ul>
        </div>
        
        {/* Quick Links Section */}
        <div className="footer-section">
          <h3 className="footer-title">Quick link</h3>
          <ul className="footer-list">
            <li>My Account</li>
            <li>Be A Member</li>
            <li>Blog</li>
            <li>Current Offers</li>
            <li>Contact Us</li>
          </ul>
        </div>

        {/* Contact Section */}
        <div className="footer-section">
          <h3 className="footer-title">Contact</h3>
          <p>Email: connect@zennaura.in</p>
          <p>Phone: +91 93551-88066</p>
          <h3 className="footer-follow-title">Follow</h3>
          <div className="footer-icons">
            <FaInstagram />
            <FaLinkedinIn />
            <FaXTwitter />
            <FaYoutube />
            <FaFacebook />
          </div>
        </div>
      </div>
      
      {/* Copyright */}
      <div className="footer-copyright">
        Copyright © 2025 Zennaura.in | Powered by Zen Aura
      </div>
    </footer>
  );
};

export default Footer;
