import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import React from "react";
import noImage from "../../assests/noImage.png";
import {
  FaSearch,
  FaShoppingCart,
  FaUser,
  FaBars,
  FaTimes,
  FaSpinner,
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
  const [activeMenu, setActiveMenu] = useState("main");
  const [categoryData, setCategoryData] = useState([]);
  const [availableIntents, setAvailableIntents] = useState([]);
  const [availableChakra, setAvailableChakra] = useState([]);
  const [auraIntents, setAuraIntents] = useState([]);
  const [auraChakra, setAuraChakra] = useState([]);
  const [skinCareIntents, setSkinCareIntent] = useState([]);
  const [skinCareChakra, setSkinCareChakra] = useState([]);
  const [divineIntents, setDivineIntents] = useState([]);
  const [divineChakra, setDivineChakra] = useState([]);
  const [sacredIntents, setSacredIntent] = useState([]);
  const [sacredChakra, setSacredChakra] = useState([]);

  // Function to fetch intents
  const fetchAuraJewelIntents = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_LINK}/api/intents/aura-jewels`
      );
      setAuraIntents(res.data);
    } catch (error) {
      console.error("Failed to fetch intents:", error);
    }
  };

  const fetchSkinCareIntents = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_LINK}/api/intents/skin-care`
      );
      setSkinCareIntent(res.data);
    } catch (error) {
      console.error("Failed to fetch intents:", error);
    }
  };

  const fetchDivineIntents = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_LINK}/api/intents/divine-crystals`
      );
      setDivineIntents(res.data);
    } catch (error) {
      console.error("Failed to fetch intents:", error);
    }
  };

  const fetchSacredIntents = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_LINK}/api/intents/sacred-rituals`
      );
      setSacredIntent(res.data);
    } catch (error) {
      console.error("Failed to fetch intents:", error);
    }
  };


  // Function to fetch Chakra
  const fetchAuraJewelChakra = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_LINK}/api/chakra/aura-jewels`
      );
      setAuraChakra(res.data);
    } catch (error) {
      console.error("Failed to fetch intents:", error);
    }
  };

  const fetchSkinCareChakra = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_LINK}/api/chakra/skin-care`
      );
      setSkinCareChakra(res.data);
    } catch (error) {
      console.error("Failed to fetch intents:", error);
    }
  };

  const fetchDivineChakra= async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_LINK}/api/chakra/divine-crystals`
      );
      setDivineChakra(res.data);
    } catch (error) {
      console.error("Failed to fetch intents:", error);
    }
  };

  const fetchSacredChakra = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_LINK}/api/chakra/sacred-rituals`
      );
      setSacredChakra(res.data);
    } catch (error) {
      console.error("Failed to fetch intents:", error);
    }
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_BACKEND_LINK}/api/categories`
        );
        const data = await res.json();
        setCategoryData(data);
      } catch (err) {
        console.error("Failed to fetch categories:", err);
      }
    };

    const fetchIntents = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_BACKEND_LINK}/api/intents`
        );
        const data = await res.json();
        setAvailableIntents(data);
      } catch (err) {
        console.error("Failed to fetch intents:", err);
      }
    };

    const fetchChakra = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_BACKEND_LINK}/api/chakra`
        );
        const data = await res.json();
        setAvailableChakra(data);
      } catch (err) {
        console.error("Failed to fetch intents:", err);
      }
    };

    fetchCategories();
    fetchIntents();
    fetchChakra();
    fetchAuraJewelIntents();
    fetchSkinCareIntents();
    fetchDivineIntents();
    fetchSacredIntents();
    fetchAuraJewelChakra();
    fetchSkinCareChakra();
    fetchDivineChakra();
    fetchSacredChakra();
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
        `${import.meta.env.VITE_BACKEND_LINK}/api/cart/fetchCartItems?userId=${
          user._id
        }`
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
        `${
          import.meta.env.VITE_BACKEND_LINK
        }/api/search?query=${encodeURIComponent(searchQuery)}`
      );

      const flattenedResults = response.data.flatMap((product) =>
        product.variants.map((variant, index) => ({
          id: `${product._id}-${index}`,
          productId: product._id,
          name: variant.variantname,
          title: product.title,
          description: product.description,
          image: variant.frontImage || variant.backImage || noImage,
          price: (
            variant.salePrice +
            (variant.salePrice * variant.tax) / 100 -
            ((variant.salePrice + (variant.salePrice * variant.tax) / 100) *
              variant.discount) /
              100
          ).toFixed(2),
          originalPrice: (
            variant.salePrice +
            (variant.salePrice * variant.tax) / 100
          ).toFixed(2),
          variantName: variant.variantname,
          variantId: variant._id,
          sku: product.sku,
          category: product.category,
          completeProduct: product,
          selectedVariant: variant,
          variantIndex: index
        }))
      );
      console.log("flattened", flattenedResults);
      console.log("response data", response.data);

      setSearchResults(flattenedResults);
    } catch (error) {
      console.error("Search error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      const searchContainer = document.querySelector(".search-container");
      if (
        isSearchOpen &&
        searchContainer &&
        !searchContainer.contains(event.target)
      ) {
        setIsSearchOpen(false);
        setSearchQuery("");
        setSearchResults([]);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSearchOpen]);

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/aboutus", label: "About Us" },
    { path: "/shop", label: "Shop" },
    { path: "/skincare", label: "Body Soap", dropdownKey: "skincare" },
    { path: "/aurajewels", label: "Aura Jewels", dropdownKey: "aurajewels" },
    {
      path: "/divinecrystals",
      label: "Divine Crystals",
      dropdownKey: "divinecrystals",
    },
    {
      path: "/sacredrituals",
      label: "Sacred Rituals",
      dropdownKey: "sacredrituals",
    },
    { path: "/contactus", label: "Contact" },
  ];
  console.log("results of search", searchResults);
  console.log("cate data", categoryData);
  return (
    <>
      <nav className={`navbar-mobile ${isMenuOpen ? `openNav` : ``}`}>
        {activeMenu === "main" && (
          <SidebarMenu
            goToSubMenu={(menu) => setActiveMenu(menu)}
            closeMenu={() => setIsMenuOpen(!isMenuOpen)}
          />
        )}
        {activeMenu === "skinCare" && (
          <SkinCareSubMenu
            goTo={(menu) => setActiveMenu(menu)}
            closeMenu={() => setIsMenuOpen(!isMenuOpen)}
          />
        )}
        {activeMenu === "auraJewel" && (
          <AuraJewels
            goTo={(menu) => setActiveMenu(menu)}
            closeMenu={() => setIsMenuOpen(!isMenuOpen)}
          />
        )}
        {activeMenu === "bodyShop" && (
          <BodySoapSubMenu
            goTo={(menu) => setActiveMenu(menu)}
            closeMenu={() => setIsMenuOpen(!isMenuOpen)}
          />
        )}
        {activeMenu === "crystalBracelets" && (
          <CrystalBracelets
            goTo={(menu) => setActiveMenu(menu)}
            closeMenu={() => setIsMenuOpen(!isMenuOpen)}
          />
        )}
        {activeMenu === "crystalWearables" && (
          <CrystalWearables
            goTo={(menu) => setActiveMenu(menu)}
            closeMenu={() => setIsMenuOpen(!isMenuOpen)}
          />
        )}
        {activeMenu === "divineCrystal" && (
          <DivineCrystalsSubMenu
            goTo={(menu) => setActiveMenu(menu)}
            closeMenu={() => setIsMenuOpen(!isMenuOpen)}
          />
        )}
        {activeMenu === "sacredRituals" && (
          <SacredRitualsSubMenu
            goTo={(menu) => setActiveMenu(menu)}
            closeMenu={() => setIsMenuOpen(!isMenuOpen)}
          />
        )}
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
                      <div className="search-spinner"></div>
                    ) : (
                      <FaSearch className="icon" size={20} />
                    )}
                  </button>

                  {searchResults.length > 0 && (
                    <div className="search-results-dropdown">
                      {searchResults.slice(0, 5).map((result) => (
                        <div
                          key={`${result.productId}-${result.variantId}`}
                          className="search-result-item"
                          onClick={() => {
                            navigate(`/productdetails/${result.id}`, {
                              state: {
                                ...result.completeProduct,
                                selectedVariant: result.selectedVariant,
                                variantIndex: result.variantIndex
                              }
                            });
                            setIsSearchOpen(false);
                            setSearchQuery("");
                            setSearchResults([]);
                          }}
                        >
                          <img
                            src={result.image}
                            alt={result.name}
                            className="search-result-image"
                          />
                          <div className="search-result-info">
                            <h4>{result.name}</h4>
                            <p>{result.title}</p>
                            <div className="search-result-price">
                              <span>₹{result.price}</span>
                              {result.originalPrice && (
                                <span className="original-price">
                                  ₹{result.originalPrice}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                      {searchResults.length > 5 && (
                        <Link
                          to={`/search?query=${encodeURIComponent(
                            searchQuery
                          )}`}
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
            <img
              src={image}
              alt="Logo"
              onClick={() => navigate("/")}
              style={{ cursor: "pointer" }}
            />
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
                    <h3>Shop by Category</h3>
                    {categoryData.map((parent) =>
                      parent.parentCategory === "Skin Care" && (() => {
                        // Build subCategory -> Set of categories map
                        const subCategoryMap = {};
                        parent.subCategories.forEach((sub) => {
                          const subName = (sub.subCategory || "").trim();
                          if (!subName) return;
                          if (!subCategoryMap[subName]) subCategoryMap[subName] = new Set();
                          (sub.categories || []).forEach((cat) => {
                            const catName = (cat || "").trim();
                            if (catName) subCategoryMap[subName].add(catName);
                          });
                        });
                        return Object.entries(subCategoryMap).map(([subName, catSet]) => (
                          <div key={subName}>
                            <Link to="/shop" state={{ autoSelects: subName }}>
                              <li>{subName}</li>
                            </Link>
                            {catSet.size > 0 && (
                              <ul style={{ marginTop: "0.3rem", fontSize: "0.7rem", marginLeft: "-1rem" }}>
                                {[...catSet].map((cat) => (
                                  <Link to="/shop" state={{ autoSelects: [cat] }} key={cat}>
                                    <li>{` ${cat}`}</li>
                                  </Link>
                                ))}
                              </ul>
                            )}
                          </div>
                        ));
                      })()
                    )}
                  </div>
                  <div className="aurajewels-intent">
                    <h3>Shop by Intent/Concern</h3>
                    <ul>
                      {skinCareIntents.map((intent) => (
                        <Link
                          to="/shop"
                          state={{ autoSelects: intent }}
                          key={intent}
                        >
                          <li key={intent + "Skin Care"}>{intent}</li>
                        </Link>
                      ))}
                    </ul>
                  </div>
                  <div className="aurajewels-chakra">
                    <h3>Shop by Chakra</h3>
                    <ul>
                      {skinCareChakra.map((chakra) => (
                        <Link
                          to="/shop"
                          state={{ autoSelects: chakra }}
                          key={chakra}
                        >
                          <li key={chakra + "Skin Care"}>{chakra}</li>
                        </Link>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="right-section">
                  {/* <div className="promo promo1">Crystal Bracelets</div> */}
                  <div className="promo promo2">Crystal Wearables</div>
                  <div className="promo promo3">
                    Check Out Our Wide Range of Crystal Bracelets!!
                  </div>
                </div>
              </div>
            </div>
          )}
          {hoveredMenu === "aurajewels" && (
            <div className="dropdown-content aurajewels-dropdown">
              <div className="dropdown-layout">
                <div className="left-section">
                  <div className="aurajewels-category">
                    <h3>Shop by Category</h3>
                    {categoryData.map((parent) =>
                      parent.parentCategory === "Aura Jewels" && (() => {
                        const subCategoryMap = {};
                        parent.subCategories.forEach((sub) => {
                          const subName = (sub.subCategory || "").trim();
                          if (!subName) return;
                          if (!subCategoryMap[subName]) subCategoryMap[subName] = new Set();
                          (sub.categories || []).forEach((cat) => {
                            const catName = (cat || "").trim();
                            if (catName) subCategoryMap[subName].add(catName);
                          });
                        });
                        return Object.entries(subCategoryMap).map(([subName, catSet]) => (
                          <div key={subName}>
                            <Link to="/shop" state={{ autoSelects: subName }}>
                              <li>{subName}</li>
                            </Link>
                            {catSet.size > 0 && (
                              <ul style={{ marginTop: "0.5rem", marginLeft: "-1rem" }}>
                                {[...catSet].map((cat) => (
                                  <Link to="/shop" state={{ autoSelects: [cat] }} key={cat}>
                                    <li>{`${cat}`}</li>
                                  </Link>
                                ))}
                              </ul>
                            )}
                          </div>
                        ));
                      })()
                    )}
                  </div>
                  <div className="aurajewels-intent">
                    <h3>Shop by Intent/Concern</h3>
                    <ul>
                      {auraIntents.map((intent) => (
                        <Link
                          to="/shop"
                          state={{ autoSelects: intent }}
                          key={intent}
                        >
                          <li
                            key={intent + "Aura Jewels"}
                            style={{ paddingBottom: "8px" }}
                          >
                            {intent}
                          </li>
                        </Link>
                      ))}
                    </ul>
                  </div>
                  <div className="aurajewels-chakra">
                    <h3>Shop by Chakra</h3>
                    <ul>
                      {auraChakra.map((chakra) => (
                        <Link
                          to="/shop"
                          state={{ autoSelects: chakra }}
                          key={chakra}
                        >
                          <li
                            key={chakra + "Aura Jewels"}
                            style={{ paddingBottom: "8px" }}
                          >
                            {chakra}
                          </li>
                        </Link>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="right-section">
                  {/* <div className="promo promo1">Crystal Bracelets</div> */}
                  <div className="promo promo2">Crystal Wearables</div>
                  <div className="promo promo3">
                    Check Out Our Wide Range of Crystal Bracelets!!
                  </div>
                </div>
              </div>
            </div>
          )}
          {hoveredMenu === "divinecrystals" && (
            <div className="dropdown-content divinecrystals-dropdown">
              <div className="dropdown-layout">
                <div className="left-section left-section-divinecrystals">
                  <div className="aurajewels-category divinecrystals-category">
                    <h3>Shop by Category</h3>
                    {categoryData.map((parent) =>
                      parent.parentCategory === "Divine Crystals" && (() => {
                        const subCategoryMap = {};
                        parent.subCategories.forEach((sub) => {
                          const subName = (sub.subCategory || "").trim();
                          if (!subName) return;
                          if (!subCategoryMap[subName]) subCategoryMap[subName] = new Set();
                          (sub.categories || []).forEach((cat) => {
                            const catName = (cat || "").trim();
                            if (catName) subCategoryMap[subName].add(catName);
                          });
                        });
                        return Object.entries(subCategoryMap).map(([subName, catSet]) => (
                          <div key={subName}>
                            <Link to="/shop" state={{ autoSelects: subName }}>
                              <li>{subName}</li>
                            </Link>
                            {catSet.size > 0 && (
                              <ul>
                                {[...catSet].map((cat) => (
                                  <Link to="/shop" state={{ autoSelects: [cat] }} key={cat}>
                                    <li>{`${cat}`}</li>
                                  </Link>
                                ))}
                              </ul>
                            )}
                          </div>
                        ));
                      })()
                    )}
                  </div>
                  <div className="aurajewels-intent">
                    <h3>Shop by Intent/Concern</h3>
                    <ul>
                      {divineIntents.map((intent) => (
                        <Link to="/shop" state={{ autoSelects: intent }}>
                          <li key={intent + "Divine Crystals"}>{intent}</li>
                        </Link>
                      ))}
                    </ul>
                  </div>
                  <div className="aurajewels-chakra">
                    <h3>Shop by Chakra</h3>
                    <ul>
                      {divineChakra.map((chakra) => (
                        <Link to="/shop" state={{ autoSelects: chakra }}>
                          <li key={chakra + "Divine Crystals"}>{chakra}</li>
                        </Link>
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
                    <h3>Shop by Category</h3>
                    {categoryData.map((parent) =>
                      parent.parentCategory === "Sacred Rituals" && (() => {
                        const subCategoryMap = {};
                        parent.subCategories.forEach((sub) => {
                          const subName = (sub.subCategory || "").trim();
                          if (!subName) return;
                          if (!subCategoryMap[subName]) subCategoryMap[subName] = new Set();
                          (sub.categories || []).forEach((cat) => {
                            const catName = (cat || "").trim();
                            if (catName) subCategoryMap[subName].add(catName);
                          });
                        });
                        return Object.entries(subCategoryMap).map(([subName, catSet]) => (
                          <div key={subName}>
                            <Link to="/shop" state={{ autoSelects: subName }}>
                              <li>{subName}</li>
                            </Link>
                            {catSet.size > 0 && (
                              <ul>
                                {[...catSet].map((cat) => (
                                  <Link to="/shop" state={{ autoSelects: [cat] }} key={cat}>
                                    <li>{`${cat}`}</li>
                                  </Link>
                                ))}
                              </ul>
                            )}
                          </div>
                        ));
                      })()
                    )}
                  </div>
                  <div className="aurajewels-intent">
                    <h3>Shop by Intent/Concern</h3>
                    <ul>
                      {sacredIntents.map((intent) => (
                        <Link to="/shop" state={{ autoSelects: intent }}>
                          <li key={intent + "Sacred Rituals"}>{intent}</li>
                        </Link>
                      ))}
                    </ul>
                  </div>
                  <div className="aurajewels-chakra">
                    <h3>Shop by Chakra</h3>
                    <ul>
                      {sacredChakra.map((chakra) => (
                        <Link to="/shop" state={{ autoSelects: chakra }}>
                          <li key={chakra + "Sacred Rituals"}>{chakra}</li>
                        </Link>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="right-section">
                  {/* <div className="promo promo1">Crystal Bracelets</div> */}
                  <div className="promo promo2">Crystal Wearables</div>
                  <div className="promo promo3">
                    Check Out Our Wide Range of Crystal Bracelets!!
                  </div>
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
