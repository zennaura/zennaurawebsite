import React from 'react';
import { FiSearch, FiChevronLeft } from 'react-icons/fi';
import '../Sidebar.css'; // ensure this includes the relevant styles
import Search from './Search';
import { useState, useEffect } from 'react'
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const SacredRitualsSubMenu = ({ goTo, closeMenu }) => {
    const [categoryData, setCategoryData] = useState([]);
    const [availableIntents, setAvailableIntents] = useState([]);
    const [sacredIntents, setSacredIntent] = useState([]);


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

        fetchSacredIntents();
        fetchCategories();
        fetchIntents();
    }, []);

    return (
        <div className="bodysoap-sub">
            <div className="header-sub">
                <FiChevronLeft className="back-icon-sub" onClick={() => goTo('main')} />
                <span className="title-sub">Sacred Rituals</span>
            </div>

            <Search closeSide={closeMenu} />

            <div className="section-sub">
                <h4 className="section-title-sub">Shop By Category</h4>
                {categoryData.map((parent) =>
                    parent.subCategories.map((sub) => (
                        <ul key={`${parent.parentCategory}-${sub.subCategory}-${(sub.categories || []).join('-')}`}>
                            {(sub.categories || []).map((category) => (
                                parent.parentCategory === "Sacred Rituals" && (
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
                    {sacredIntents.map((intent) => (
                        <Link
                            to="/shop"
                            key={intent}
                            state={{ autoSelects: intent }} onClick={closeMenu}>
                            <li key={intent + "SacredRituals"}>{intent}</li></Link>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default SacredRitualsSubMenu;
