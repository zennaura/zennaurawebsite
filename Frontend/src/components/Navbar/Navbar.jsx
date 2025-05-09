import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import React from "react";
import {
  FaSearch,
  FaShoppingCart,
  FaUser,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import "./Navbar.css";
import image from "../../assests/logo.png";
import CartSidebar from "../AddToCart/AddToCart";
import { useUser } from "../AuthContext/AuthContext";

const Navbar = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItemCount, setCartItemCount] = useState(0);
  const [hoveredMenu, setHoveredMenu] = useState(null);
  const { user } = useUser();

  useEffect(() => {
    if (user) {
      fetchCartCount();
    } else {
      setCartItemCount(0);
    }
  }, [user]);

  const fetchCartCount = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_LINK}/api/cart/fetchCartItems?userId=${user._id}`
      );
      const count = response.data.items.reduce(
        (total, item) => total + item.quantity,
        0
      );
      setCartItemCount(count);
    } catch (error) {
      console.error("Error fetching cart count:", error);
    }
  };

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/aboutus", label: "About Us" },
    { path: "/shop", label: "Shop" },
    { path: "/skincare", label: "Skin Care", dropdownKey: "skincare" },
    { path: "/aurajewels", label: "Aura Jewels", dropdownKey: "aurajewels" },
    { path: "/divinecrystals", label: "Divine Crystals", dropdownKey: "divinecrystals" },
    { path: "/sacredrituals", label: "Sacred Rituals", dropdownKey: "sacredrituals" },
    { path: "#", label: "Gifting" },
  ];

  return (
    <>
      <nav className="navbar">
        <div className="nav_top">
          <button
            className="menu-btn"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>

          <FaSearch className="icon" size={20} />

          <div className="logo">
            <img src={image} alt="Logo" />
          </div>

          <div className="nav-icons">
            <div
              className="cart-icon-container"
              onClick={() => setIsCartOpen(true)}
            >
              <FaShoppingCart className="icon" size={20} />
              {cartItemCount > 0 && (
                <span className="cart-badge">
                  {cartItemCount > 9 ? "9+" : cartItemCount}
                </span>
              )}
            </div>

            <Link to={user ? "/userdashboard" : "/login"}>
              <FaUser className="icon" size={20} />
            </Link>
          </div>
        </div>

        <ul className={`nav-links ${isMenuOpen ? "open" : ""}`}>
          {navLinks.map((item) => (
            <li
              key={item.path}
              className="nav-item"
              onClick={() => setIsMenuOpen(false)}
              onMouseEnter={() => setHoveredMenu(item.dropdownKey || null)}
              onMouseLeave={() => setHoveredMenu(null)}
            >
              <Link to={item.path}>{item.label}</Link>
            </li>
          ))}
        </ul>
      </nav>

      {hoveredMenu && (
        <div
          className="dropdown-container"
          onMouseEnter={() => setHoveredMenu(hoveredMenu)}
          onMouseLeave={() => setHoveredMenu(null)}
        >
          {hoveredMenu === "skincare" && (
            <div className="dropdown-content skincare-dropdown">
              <div class="dropdown-layout">
                <div class="left-section">
                  <div class="aurajewels-category">
                    <h3>Shop by category</h3>
                    <ul>
                      <li>Body Soap</li>
                      <ul style={{ marginTop: "1rem" }}>
                        <li>Clay Soap</li>
                        <li>Scrub Soap</li>
                        <li>Therapeutic Soap</li>
                        <li>Fruit Soap</li>
                        <li>Clay Soap</li>
                        <li>Scrub Soap</li>
                        <li>Therapeutic Soap</li>
                        <li>Fruit Soap</li>
                      </ul>

                    </ul>
                  </div>
                  <div class="aurajewels-intent">
                    <h3>Shop by Intent</h3>
                  </div>
                </div>

                <div class="right-section">
                  <div class="promo promo1">Crystal Bracelets</div>
                  <div class="promo promo2">Crystal Wearables</div>
                  <div class="promo promo3">Check Out Our Wide Range of Crystal Bracelets!!</div>
                </div>
              </div>
            </div>
          )}
          {hoveredMenu === "aurajewels" && (
            <div className="dropdown-content aurajewels-dropdown">
              <div class="dropdown-layout">
                <div class="left-section">
                  <div class="aurajewels-category">
                    <h3>Shop by category</h3>
                    <ul>
                      <li>Crystal Bracelets</li>
                      <ul style={{ marginTop: "1rem" }}>
                        <li>Combo Bracelets</li>
                        <li>Disease Specific</li>
                        <li>Chakra Bracelets</li>
                        <li>Zodiac Bracelets</li>
                      </ul>
                      <li style={{ marginTop: "1.4rem" }}>Crystal Wearables</li>
                      <ul style={{ marginTop: "1rem" }}>
                        <li>Ear Rings/Tops</li>
                        <li>Pendants</li>
                      </ul>
                    </ul>
                  </div>
                  <div class="aurajewels-intent">
                    <h3>Shop by Intent</h3>
                  </div>
                </div>

                <div class="right-section">
                  <div class="promo promo1">Crystal Bracelets</div>
                  <div class="promo promo2">Crystal Wearables</div>
                  <div class="promo promo3">Check Out Our Wide Range of Crystal Bracelets!!</div>
                </div>
              </div>
            </div>
          )}
          {hoveredMenu === "divinecrystals" && (
            <div className="dropdown-content divinecrystals-dropdown">
              <div class="dropdown-layout">
                <div class="left-section left-section-divinecrystals">
                  <div class="aurajewels-category divinecrystals-category">
                    <h3>Shop by category</h3>
                    <div className="divinecrystals-coloum">
                      <ul>
                        <li style={{ marginBottom: "2rem" }}>Charging Crystals</li>
                        <li style={{ marginBottom: "2rem" }}>Crystal Tree</li>
                        <li style={{ marginBottom: "2rem" }}>Pyramid</li>
                        <li style={{ marginBottom: "2rem" }}>Skin Roller</li>
                        <li style={{ marginBottom: "2rem" }}>Zibu Coins</li>
                      </ul>
                      <ul>
                        <li style={{ marginBottom: "2rem" }}>Key Chain</li>
                        <li style={{ marginBottom: "2rem" }}>Towers/Wands</li>
                        <li style={{ marginBottom: "2rem" }}>Crystal Tumbles</li>
                        <ul style={{ marginTop: "1rem" }}>
                          <li style={{ marginBottom: "1rem" }} >Polished Tumble</li>
                          <li style={{ marginBottom: "1rem" }} >Raw Tumble</li>
                          <li style={{ marginBottom: "1rem" }} >Tumble Combo</li>
                        </ul>
                      </ul>
                    </div>

                  </div>
                  <div class="aurajewels-intent">
                    <h3>Shop by Intent</h3>
                  </div>
                </div>

                <div class="right-section right-section-divinecrystals">
                  <div class="promo promo1">Crystal Bracelets</div>
                  <div class="promo promo2">Crystal Wearables</div>
                </div>
              </div>
            </div>
          )}
          {hoveredMenu === "sacredrituals" && (
            <div className="dropdown-content sacredrituals-dropdown">
              <div class="dropdown-layout">
                <div class="left-section">
                  <div class="aurajewels-category">
                    <h3>Shop by category</h3>
                    <ul >
                      <li style={{ marginBottom: "2rem" }}>Candles</li>
                      <li style={{ marginBottom: "2rem" }}>Incense Sticks</li>
                      <li style={{ marginBottom: "2rem" }}>Magical Spray</li>
                      <li style={{ marginBottom: "2rem" }}>Sage</li>
                    </ul>
                  </div>
                  <div class="aurajewels-intent">
                    <h3>Shop by Intent</h3>
                  </div>
                </div>

                <div class="right-section">
                  <div class="promo promo1">Crystal Bracelets</div>
                  <div class="promo promo2">Crystal Wearables</div>
                  <div class="promo promo3">Check Out Our Wide Range of Crystal Bracelets!!</div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      <CartSidebar
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItemCount={cartItemCount}
        updateCartCount={setCartItemCount}
      />

      <div
        className={`cart-overlay ${isCartOpen ? "open" : ""}`}
        onClick={() => setIsCartOpen(false)}
      />
    </>
  );
};

export default Navbar;
