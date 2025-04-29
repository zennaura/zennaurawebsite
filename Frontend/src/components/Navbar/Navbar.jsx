import { useState, useEffect } from "react";
import axios from 'axios'
import React from 'react';
import { Link } from "react-router-dom";
import { FaSearch, FaShoppingCart, FaUser, FaBars, FaTimes } from "react-icons/fa";
import "./Navbar.css";
import image from '../../assests/logo.png';
import CartSidebar from '../AddToCart/AddToCart';
import { useUser } from '../AuthContext/AuthContext'; // Adjust path as needed

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItemCount, setCartItemCount] = useState(0);
    const { user } = useUser(); // Get user from context

    // Fetch initial cart count when user logs in
    useEffect(() => {
        if (user) {
            fetchCartCount();
        } else {
            setCartItemCount(0); // Reset count if user logs out
        }
    }, [user]);

    const fetchCartCount = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/cart/fetchCartItems?userId=${user._id}`);
            const count = response.data.items.reduce((total, item) => total + item.quantity, 0);
            setCartItemCount(count);
        } catch (error) {
            console.error('Error fetching cart count:', error);
        }
    };
    const checklogging = () => {
        if (!user) {
            window.location.replace("/login");
        } else {
            window.location.replace("/userdashboard");
        }
    }
    

    return (
        <>
            <nav className="navbar">
                <div className="nav_top">
                    {/* Hamburger Menu */}
                    <button className="menu-btn" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                        {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
                    </button>

                    {/* Search Icon */}
                    <FaSearch className="icon" size={20} />

                    {/* Logo */}
                    <div className="logo">
                        <img src={image} alt="Logo" />
                    </div>

                    {/* Icons */}
                    <div className="nav-icons">
                        <div className="cart-icon-container" onClick={() => setIsCartOpen(true)}>
                            <FaShoppingCart className="icon" size={20} />
                            {cartItemCount > 0 && (
                                <span className="cart-badge">
                                    {cartItemCount > 9 ? '9+' : cartItemCount}
                                </span>
                            )}
                        </div>
                        <FaUser className="icon" size={20} onClick={checklogging} />
                    </div>
                </div>

                {/* Navigation Links */}
                <ul className={`nav-links ${isMenuOpen ? "open" : ""}`}>
                    {[
                        { path: "/", label: "Home" },
                        { path: "/aboutus", label: "About Us" },
                        { path: "/shop", label: "Shop" },
                        { path: "/skincare", label: "Skin Care" },
                        { path: "/aurajewels", label: "Aura Jewels" },
                        { path: "/divinecrystals", label: "Divine Crystals" },
                        { path: "/sacredrituals", label: "Sacred Rituals" },
                        { path: "#", label: "Gifting" }
                    ].map((item) => (
                        <li key={item.path} className="nav-item" onClick={() => setIsMenuOpen(false)}>
                            <Link to={item.path}>{item.label}</Link>
                        </li>
                    ))}
                </ul>
            </nav>

            {/* Cart Sidebar */}
            <CartSidebar 
                isOpen={isCartOpen} 
                onClose={() => setIsCartOpen(false)}
                cartItemCount={cartItemCount}
                updateCartCount={setCartItemCount}
            />
            
            {/* Overlay when cart is open */}
            <div 
                className={`cart-overlay ${isCartOpen ? 'open' : ''}`} 
                onClick={() => setIsCartOpen(false)}
            />
        </>
    );
};

export default Navbar;