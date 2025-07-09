import { FiSearch, FiChevronRight, FiChevronLeft } from "react-icons/fi";
import "./Sidebar.css";
import React from "react";
import Search from "./submenus/Search";
import { useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import launchingsoon from "../../assests/launchingsoon.jpg";

const SkinCareSubMenu = ({ goTo, closeMenu }) => {
  const [categoryData, setCategoryData] = useState([]);
  const [availableIntents, setAvailableIntents] = useState([]);
  const [skinCareIntents, setSkinCareIntent] = useState([]);

  // Function to fetch intents
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
    fetchSkinCareIntents();
    fetchCategories();
    fetchIntents();
  }, []);

  return (
    <div className="sidebar-sub">
      <div className="header-sub">
        <FiChevronLeft className="back-icon-sub" onClick={() => goTo("main")} />
        <span>Body Soap</span>
      </div>

      {/* <Search closeSide={closeMenu} /> */}
      <div>
        <img src={launchingsoon} alt="" style={{ width: "100vw",height:"100vh" }} />
      </div>
    </div>
  );
};

export default SkinCareSubMenu;
