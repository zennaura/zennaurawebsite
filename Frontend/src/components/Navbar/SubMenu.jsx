import { FiSearch, FiChevronRight, FiChevronLeft } from 'react-icons/fi';
import './Sidebar.css';
import React from 'react';
import Search from './submenus/Search';
import { useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from 'react'
import axios from "axios";

const SkinCareSubMenu = ({ goTo, closeMenu }) => {
    const [categoryData, setCategoryData] = useState([]);
    const [availableIntents, setAvailableIntents] = useState([]);
    const [skinCareIntents, setSkinCareIntent] = useState([]);

    // Function to fetch intents
    const fetchSkinCareIntents = async () => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_BACKEND_LINK}/api/intents/skin-care`);
            setSkinCareIntent(res.data);
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
        fetchSkinCareIntents();
        fetchCategories();
        fetchIntents();
    }, []);

    return (
        <div className="sidebar-sub">
            <div className="header-sub">
                <FiChevronLeft className="back-icon-sub" onClick={() => goTo('main')} />
                <span>Skin Care</span>
            </div>

            <Search closeSide={closeMenu} />

            <div className="section-sub">
                <h4 className="section-title-sub">Shop By Category</h4>
                {categoryData.filter(parent => parent.parentCategory === "Skin Care").map((parent) => {
                    // Build subCategory -> Set of categories map (deduplicated)
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
                            <Link
                                to="/shop"
                                state={{ autoSelects: { type: "productCategories", value: subName } }}
                                onClick={closeMenu}
                            >
                                <li>{subName}</li>
                            </Link>
                            {catSet.size > 0 && (
                                <ul style={{ marginTop: "0.3rem", fontSize: "0.7rem", marginLeft: "-1rem" }}>
                                    {[...catSet].map((cat) => (
                                        <Link
                                            to="/shop"
                                            state={{ autoSelects: { type: "categories", value: cat } }}
                                            onClick={closeMenu}
                                            key={cat}
                                        >
                                            <li>{cat}</li>
                                        </Link>
                                    ))}
                                </ul>
                            )}
                        </div>
                    ));
                })}
            </div>

            <div className="section-sub">
                <h4 className="section-title-sub">Shop By Intent</h4>
                <ul>
                    {skinCareIntents.map((intent) => (
                        <Link
                            to="/shop"
                            state={{ autoSelects: { type: "intents", value: intent } }}
                            onClick={closeMenu}
                            key={intent}
                        >
                            <li>{intent}</li>
                        </Link>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default SkinCareSubMenu;
