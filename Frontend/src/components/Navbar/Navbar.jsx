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
import SidebarMenu from "./Sidebar";
import SkinCareSubMenu from "./SubMenu";
import BodySoapSubMenu from "./submenus/BodyShop";
import AuraJewels from "./submenus/AuraJewels";
import CrystalBracelets from "./submenus/CrystalBracelets";
import CrystalWearables from "./submenus/CrystalWearables";
import DivineCrystalsSubMenu from "./submenus/DivineCrystals";
import SacredRitualsSubMenu from "./submenus/SacredRituals";

const Navbar = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItemCount, setCartItemCount] = useState(0);
  const [hoveredMenu, setHoveredMenu] = useState(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useUser();
  const [activeMenu, setActiveMenu] = useState('main');


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

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setIsLoading(true);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_LINK}/api/search?query=${encodeURIComponent(searchQuery)}`
      );

      const flattenedResults = response.data.flatMap((product) =>
        product.variants.map((variant, index) => ({
          id: `${product._id}-${index}`,
          productId: product._id,
          name: product.name,
          title: product.title,
          description: product.description,
          image: product.frontImage,
          price: variant.salePrice,
          originalPrice: variant.costPrice,
          variantName: variant.name,
          variantId: variant._id,
          sku: variant.sku,
          category: product.category,
        }))
      );

      setSearchResults(flattenedResults);
    } catch (error) {
      console.error("Search error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      const searchContainer = document.querySelector('.search-container');
      if (isSearchOpen && searchContainer && !searchContainer.contains(event.target)) {
        setIsSearchOpen(false);
        setSearchQuery("");
        setSearchResults([]);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isSearchOpen]);

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
      <nav className={`navbar-mobile ${isMenuOpen ? `openNav` : ``}`}>
        {activeMenu === 'main' && <SidebarMenu goToSubMenu={(menu) => setActiveMenu(menu)} closeMenu={() => setIsMenuOpen(!isMenuOpen)} />}
        {activeMenu === 'skinCare' && <SkinCareSubMenu goTo={(menu) => setActiveMenu(menu)} />}
        {activeMenu === 'auraJewel' && <AuraJewels goTo={(menu) => setActiveMenu(menu)} />}
        {activeMenu === 'bodyShop' && <BodySoapSubMenu goTo={(menu) => setActiveMenu(menu)} />}
        {activeMenu === 'crystalBracelets' && <CrystalBracelets goTo={(menu) => setActiveMenu(menu)} />}
        {activeMenu === 'crystalWearables' && <CrystalWearables goTo={(menu) => setActiveMenu(menu)} />}
        {activeMenu === 'divineCrystal' && <DivineCrystalsSubMenu goTo={(menu) => setActiveMenu(menu)} />}
        {activeMenu === 'sacredRituals' && <SacredRitualsSubMenu goTo={(menu) => setActiveMenu(menu)} />}
        {/* You can add other submenus here like:
        {activeMenu === 'auraJewels' && <AuraJewelsSubMenu goBack={() => setActiveMenu('main')} />} 
    */}
      </nav>
      <nav className="navbar">
        <div className="nav_top">
          <button
            className="menu-btn"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>

          <div className={`search-container ${isSearchOpen ? "open" : ""}`}>
            {isSearchOpen ? (
              <form onSubmit={handleSearch} className="search-form">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                />
                <button type="submit">
                  {isLoading ? (
                    <div className="search-spinner"></div>
                  ) : (
                    <FaSearch className="icon" size={20} />
                  )}
                </button>

                {searchResults.length > 0 && (
                  <div className="search-results-dropdown">
                    {searchResults.slice(0, 5).map((result) => (
                      <Link
                        key={`${result.productId}-${result.variantId}`}
                        to={`/productdetails/${result.id}`}
                        state={result}
                        className="search-result-item"
                        onClick={() => {
                          setIsSearchOpen(false);
                          setSearchQuery("");
                          setSearchResults([]);
                        }}
                      >
                        <img src="https://images.pexels.com/photos/3018845/pexels-photo-3018845.jpeg?cs=srgb&dl=cosmetic-products-3018845.jpg&fm=jpg" alt={result.name} className="search-result-image" />
                        <div className="search-result-info">
                          <h4>{result.name}</h4>
                          <p>{result.title}</p>
                          <div className="search-result-price">
                            <span>₹{result.price}</span>
                            {result.originalPrice && (
                              <span className="original-price">₹{result.originalPrice}</span>
                            )}
                          </div>
                        </div>
                      </Link>
                    ))}
                    {searchResults.length > 5 && (
                      <Link
                        to={`/search?query=${encodeURIComponent(searchQuery)}`}
                        className="view-all-results"
                        onClick={() => {
                          setIsSearchOpen(false);
                          setSearchQuery("");
                          setSearchResults([]);
                        }}
                      >
                        View all {searchResults.length} results
                      </Link>
                    )}
                  </div>
                )}
              </form>
            ) : (
              <FaSearch
                className="icon search-icon"
                size={20}
                onClick={() => setIsSearchOpen(true)}
              />
            )}
          </div>

          <div className="logo">
            <img src={image} alt="Logo" onClick={() => navigate('/')} style={{ cursor: 'pointer' }} />
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
              <div className="dropdown-layout">
                <div className="left-section">
                  <div className="aurajewels-category">
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
                  <div className="aurajewels-intent">
                    <h3>Shop by Intent</h3>
                  </div>
                </div>

                <div className="right-section">
                  <div className="promo promo1">Crystal Bracelets</div>
                  <div className="promo promo2">Crystal Wearables</div>
                  <div className="promo promo3">Check Out Our Wide Range of Crystal Bracelets!!</div>
                </div>
              </div>
            </div>
          )}
          {hoveredMenu === "aurajewels" && (
            <div className="dropdown-content aurajewels-dropdown">
              <div className="dropdown-layout">
                <div className="left-section">
                  <div className="aurajewels-category">
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
                  <div className="aurajewels-intent">
                    <h3>Shop by Intent</h3>
                  </div>
                </div>

                <div className="right-section">
                  <div className="promo promo1">Crystal Bracelets</div>
                  <div className="promo promo2">Crystal Wearables</div>
                  <div className="promo promo3">Check Out Our Wide Range of Crystal Bracelets!!</div>
                </div>
              </div>
            </div>
          )}
          {hoveredMenu === "divinecrystals" && (
            <div className="dropdown-content divinecrystals-dropdown">
              <div className="dropdown-layout">
                <div className="left-section left-section-divinecrystals">
                  <div className="aurajewels-category divinecrystals-category">
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
                  <div className="aurajewels-intent">
                    <h3>Shop by Intent</h3>
                  </div>
                </div>

                <div className="right-section right-section-divinecrystals">
                  <div className="promo promo1">Crystal Bracelets</div>
                  <div className="promo promo2">Crystal Wearables</div>
                </div>
              </div>
            </div>
          )}
          {hoveredMenu === "sacredrituals" && (
            <div className="dropdown-content sacredrituals-dropdown">
              <div className="dropdown-layout">
                <div className="left-section">
                  <div className="aurajewels-category">
                    <h3>Shop by category</h3>
                    <ul >
                      <li style={{ marginBottom: "2rem" }}>Candles</li>
                      <li style={{ marginBottom: "2rem" }}>Incense Sticks</li>
                      <li style={{ marginBottom: "2rem" }}>Magical Spray</li>
                      <li style={{ marginBottom: "2rem" }}>Sage</li>
                    </ul>
                  </div>
                  <div className="aurajewels-intent">
                    <h3>Shop by Intent</h3>
                  </div>
                </div>

                <div className="right-section">
                  <div className="promo promo1">Crystal Bracelets</div>
                  <div className="promo promo2">Crystal Wearables</div>
                  <div className="promo promo3">Check Out Our Wide Range of Crystal Bracelets!!</div>
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