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
  FaSpinner
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
  const [categoryData, setCategoryData] = useState([]);
  const [availableIntents, setAvailableIntents] = useState([]);
  const [auraIntents, setAuraIntents] = useState([]);
  const [skinCareIntents, setSkinCareIntent] = useState([]);
  const [divineIntents, setDivineIntents] = useState([]);
  const [sacredIntents, setSacredIntent] = useState([]);

  // Function to fetch intents
  const fetchAuraJewelIntents = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_LINK}/api/intents/aura-jewels`);
      setAuraIntents(res.data);
    } catch (error) {
      console.error('Failed to fetch intents:', error);
    }
  };

  const fetchSkinCareIntents = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_LINK}/api/intents/skin-care`);
      setSkinCareIntent(res.data);
    } catch (error) {
      console.error('Failed to fetch intents:', error);
    }
  };


  const fetchDivineIntents = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_LINK}/api/intents/divine-crystals`);
      setDivineIntents(res.data);
    } catch (error) {
      console.error('Failed to fetch intents:', error);
    }
  };


  const fetchSacredIntents = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_LINK}/api/intents/sacred-rituals`);
      setSacredIntent(res.data);
    } catch (error) {
      console.error('Failed to fetch intents:', error);
    }
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_LINK}/api/categories`);
        const data = await res.json();
        setCategoryData(data);
      } catch (err) {
        console.error('Failed to fetch categories:', err);
      }
    };

    const fetchIntents = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_LINK}/api/intents`);
        const data = await res.json();
        setAvailableIntents(data);
      } catch (err) {
        console.error('Failed to fetch intents:', err);
      }
    };

    fetchCategories();
    fetchIntents();
    fetchAuraJewelIntents();
    fetchSkinCareIntents();
    fetchDivineIntents();
    fetchSacredIntents();
  }, []);


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
        {activeMenu === 'skinCare' && <SkinCareSubMenu goTo={(menu) => setActiveMenu(menu)} closeMenu={() => setIsMenuOpen(!isMenuOpen)} />}
        {activeMenu === 'auraJewel' && <AuraJewels goTo={(menu) => setActiveMenu(menu)} closeMenu={() => setIsMenuOpen(!isMenuOpen)} />}
        {activeMenu === 'bodyShop' && <BodySoapSubMenu goTo={(menu) => setActiveMenu(menu)} closeMenu={() => setIsMenuOpen(!isMenuOpen)} />}
        {activeMenu === 'crystalBracelets' && <CrystalBracelets goTo={(menu) => setActiveMenu(menu)} closeMenu={() => setIsMenuOpen(!isMenuOpen)} />}
        {activeMenu === 'crystalWearables' && <CrystalWearables goTo={(menu) => setActiveMenu(menu)} closeMenu={() => setIsMenuOpen(!isMenuOpen)} />}
        {activeMenu === 'divineCrystal' && <DivineCrystalsSubMenu goTo={(menu) => setActiveMenu(menu)} closeMenu={() => setIsMenuOpen(!isMenuOpen)} />}
        {activeMenu === 'sacredRituals' && <SacredRitualsSubMenu goTo={(menu) => setActiveMenu(menu)} closeMenu={() => setIsMenuOpen(!isMenuOpen)} />}
        {/* You can add other submenus here
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
              <div className="searching"> 
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
                    <div className="search-spinner">
                      
                    </div>
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
              </div>
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
                    {categoryData.map((parent) =>
                      parent.subCategories.map((sub) => (
                        <ul key={`${parent.parentCategory}-${sub.subCategory}-${(sub.categories || []).join('-')}`}>
                          {(sub.categories || []).map((category) => (
                            parent.parentCategory === "Skin Care" && (
                              <div key={parent.subCategories + `Hello`}>
                                <Link
                                  to="/shop"
                                  state={{ autoSelects: sub.subCategory }}
                                ><li key={`${sub.subCategories}`}>{sub.subCategory}</li></Link>
                                <ul key={`${parent.parentCategory}-${sub.subCategory}-${category}`} style={{ marginTop: "1rem",fontSize:"0.7rem",marginLeft:"-1rem"  }}>
                                  <li>{category}</li>
                                </ul>
                              </div>
                            )
                          ))}
                        </ul>
                      ))
                    )}
                  </div>
                  <div className="aurajewels-intent">
                    <h3>Shop by Intent</h3>
                    <ul>
                      {skinCareIntents.map((intent) => (
                        <Link
                          to="/shop"
                          state={{ autoSelects: intent }}
                          key={intent}
                        >
                          <li key={intent + "Skin Care"}>{intent}</li></Link>
                      ))}
                    </ul>
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
                    {categoryData.map((parent) =>
                      parent.subCategories.map((sub) => (
                        <ul key={`${parent.parentCategory}-${sub.subCategory}-${(sub.categories || []).join('-')}`}>
                          {(sub.categories || []).map((category) => (
                            parent.parentCategory === "Aura Jewels" && (
                              <div key={parent.subCategories + `Hello`}>
                                <Link
                                  to="/shop"
                                  state={{ autoSelects: sub.subCategory }}
                                >
                                  <li key={`${sub.subCategories}`}>{sub.subCategory}</li></Link>
                                <ul key={`${parent.parentCategory}-${sub.subCategory}-${category}`} style={{ marginTop: "1rem",fontSize:"0.7rem",marginLeft:"-1rem" }}>
                                  <li>{category===""?"":`>  `}{category}</li>
                                </ul>
                              </div>
                            )
                          ))}
                        </ul>
                      ))
                    )}
                  </div>
                  <div className="aurajewels-intent">
                    <h3>Shop by Intent</h3>
                    <ul>
                      {auraIntents.map((intent) => (
                        <Link
                          to="/shop"
                          state={{ autoSelects: intent }}
                          key={intent}
                        >
                          <li key={intent + "Skin Care"} style={{paddingBottom:"8px"}}>{intent}</li></Link>
                      ))}
                    </ul>
                  </div>
                </div >

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
                    {categoryData.map((parent) =>
                      parent.subCategories.map((sub) => (
                        <ul key={`${parent.parentCategory}-${sub.subCategory}-${(sub.categories || []).join('-')}`}>
                          {(sub.categories || []).map((category) => (
                            parent.parentCategory === "Divine Crystals" && (
                              <div key={parent.subCategories + `Hello`}>
                                <Link
                                  to="/shop"
                                  state={{ autoSelects: sub.subCategory }}>
                                  <li key={`${sub.subCategories}`}>{sub.subCategory}</li></Link>
                                <ul key={`${parent.parentCategory}-${sub.subCategory}-${category}`} style={{ marginTop: "1rem",fontSize:"0.7rem",marginLeft:"-1rem"  }}>
                                   <li>{category===""?"":`>  `} {category}</li>
                                </ul>
                              </div>
                            )
                          ))}
                        </ul>
                      ))
                    )}
                  </div>
                  <div className="aurajewels-intent">
                    <h3>Shop by Intent</h3>
                    <ul>
                      {divineIntents.map((intent) => (
                        <Link
                          to="/shop"
                          state={{ autoSelects: intent }}>
                          <li key={intent + "Divine Crystals"}>{intent}</li></Link>
                      ))}
                    </ul>
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
                    {categoryData.map((parent) =>
                      parent.subCategories.map((sub) => (
                        <ul key={`${parent.parentCategory}-${sub.subCategory}-${(sub.categories || []).join('-')}`}>
                          {(sub.categories || []).map((category) => (
                            parent.parentCategory === "Sacred Rituals" && (
                              <div key={parent.subCategories + `Hello`}>
                                <Link
                                  to="/shop"
                                  state={{ autoSelects: sub.subCategory }}>
                                  <li key={`${sub.subCategories}`}>{sub.subCategory}</li></Link>
                                <ul key={`${parent.parentCategory}-${sub.subCategory}-${category}`} style={{ marginTop: "1rem",fontSize:"0.7rem",marginLeft:"-1rem"  }}>
                                   <li>{category===""?"":`>  `}{category}</li>
                                </ul>
                              </div>
                            )
                          ))}
                        </ul>
                      ))
                    )}
                  </div>
                  <div className="aurajewels-intent">
                    <h3>Shop by Intent</h3>
                    <ul>
                      {sacredIntents.map((intent) => (
                        <Link
                          to="/shop"
                          state={{ autoSelects: intent }}>
                          <li key={intent + "Sacred Rituals"}>{intent}</li></Link>
                      ))}
                    </ul>
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
        </div >
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