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
                {categoryData.map((parent) =>
                    parent.subCategories.map((sub) => (
                        <ul key={`${parent.parentCategory}-${sub.subCategory}-${(sub.categories || []).join('-')}`}>
                            {(sub.categories || []).map((category) => (
                                parent.parentCategory === "Skin Care" && (
                                    <div key={parent.subCategories + `Hello`}>
                                        <Link
                                            to="/shop"
                                            state={{ autoSelects: sub.subCategory }} onClick={closeMenu}>
                                            <li key={`${sub.subCategories}`}>{sub.subCategory}</li></Link>
                                        <ul key={`${parent.parentCategory}-${sub.subCategory}-${category}`} style={{ marginTop: "1rem" }}>
                                        </ul>
                                    </div>
                                )
                            ))}
                        </ul>
                    ))
                )}
            </div>

            <div className="section-sub">
                <h4 className="section-title-sub">Shop By Intent</h4>
                <ul>
                    {skinCareIntents.map((intent) => (
                        <Link
                            to="/shop"
                            state={{ autoSelects: intent }} onClick={closeMenu}>
                            <li key={intent + "Skin Care"}>{intent}</li></Link>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default SkinCareSubMenu;
