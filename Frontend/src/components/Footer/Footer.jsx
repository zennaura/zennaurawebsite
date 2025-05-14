import { useState } from "react";
import { Link } from "react-router-dom";
import React from "react";
import { FaInstagram, FaLinkedinIn, FaXTwitter, FaYoutube, FaFacebook, FaChevronDown } from "react-icons/fa6";
import './Footer.css';

const FooterSection = ({ title, children }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="footer-section-m">
      <div
        className="footer-title flex justify-between items-center cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        <h3>{title}</h3>
        <FaChevronDown className={`transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
      </div>
      {open && (
        <div className="mt-2">
          {children}
        </div>
      )}
    </div>
  );
};

const Footer = () => {
  return (
    <>
      <footer className="footer-container-m">
        <div className="footer-content-m">

          {/* Shop Section */}
          <FooterSection title="Shop">
            <ul className="footer-list">
              <li> <Link to='/shop'>All Products</Link> </li>
              <li> <Link to='/skincare'>Skin Care</Link> </li>
              <li> <Link to='/divinecrystals'>Divine Crystals</Link> </li>
              <li> <Link to='/sacredrituals'>Sacred Rituals</Link> </li>
              <li> <Link to='/aurajewels'>Aura Jewels</Link> </li>
              <li> <Link to='/'> Gifting</Link></li>
              <li>Gifting</li>
              <li>Travel Minis</li>
            </ul>
          </FooterSection>

          {/* About Section */}
          <FooterSection title="About">
            <ul className="footer-list">
              <li><Link to="/aboutus">Our Philoshophy</Link></li>
              <li><Link to="/policies">Policies</Link></li>
              <li><Link to="/termsandconditions">Terms</Link></li>
              <li>FAQ’s</li>
              <li>Career</li>
            </ul>
          </FooterSection>

          {/* Quick Links Section */}
          <FooterSection title="Quick link">
            <ul className="footer-list">
              <li> <Link to='/userdashboard'>My Account</Link> </li>
              <li>Be A Member</li>
              <li>Blog</li>
              <li>Current Offers</li>
              <li> <Link to='/contactus'>Contact Us</Link> </li>
            </ul>
          </FooterSection>

          {/* Contact Section */}
          <FooterSection title="Contact">
            <div className="footerContactM">
              <p>Email: connect@zennaura.in</p>
              <p>Phone: +91 93551-88066</p>
            </div>
          </FooterSection>

          <div className="follow">
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


        <div className="footer-copyright">
          Copyright © 2025 Zennaura.in | Powered by Zen Aura
        </div>
      </footer>
      <footer className="footer-container">
        <div className="footer-content">

          {/* Shop Section */}
          <div className="footer-section">
            <h3 className="footer-title">Shop</h3>
            <ul className="footer-list">
              <li> <Link to='/shop'>All Products</Link> </li>
              <li> <Link to='/skincare'>Skin Care</Link> </li>
              <li> <Link to='/divinecrystals'>Divine Crystals</Link> </li>
              <li> <Link to='/sacredrituals'>Sacred Rituals</Link> </li>
              <li> <Link to='/aurajewels'>Aura Jewels</Link> </li>
              <li> <Link to='/'> Gifting</Link></li>
              <li>Travel Minis</li>
            </ul>
          </div>

          {/* About Section */}
          <div className="footer-section">
            <h3 className="footer-title">About</h3>
            <ul className="footer-list">
              <li><Link to="/aboutus">Our Philoshophy</Link></li>
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
              <li> <Link to='/userdashboard'>My Account</Link> </li>
              <li>Be A Member</li>
              <li>Blog</li>
              <li>Current Offers</li>
              <li> <Link to='/contactus'>Contact Us</Link> </li>
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
    </>
  );
};

export default Footer;
