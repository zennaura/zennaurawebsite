import { FiSearch, FiChevronRight, FiChevronLeft } from 'react-icons/fi';
import '../Sidebar.css';
import React from 'react';
import Search from './Search';
import { useState, useEffect } from 'react'
import { useNavigate, Link } from "react-router-dom";

const AuraJewels = ({ goTo, closeMenu }) => {
    const [categoryData, setCategoryData] = useState([]);
    const [availableIntents, setAvailableIntents] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await fetch('http://localhost:5000/api/categories');
                const data = await res.json();
                setCategoryData(data);
            } catch (err) {
                console.error('Failed to fetch categories:', err);
            }
        };

        const fetchIntents = async () => {
            try {
                const res = await fetch('http://localhost:5000/api/intents');
                const data = await res.json();
                setAvailableIntents(data);
            } catch (err) {
                console.error('Failed to fetch intents:', err);
            }
        };

        fetchCategories();
        fetchIntents();
    }, []);
    return (
        <div className="sidebar-sub">
            <div className="header-sub">
                <FiChevronLeft className="back-icon-sub" onClick={() => goTo('main')} />
                <span>Aura Jewels</span>
            </div>

            <Search closeSide={closeMenu} />

            <div className="section-sub">
                <h4 className="section-title-sub">Shop By Category</h4>
                {categoryData.map((parent) =>
                    parent.subCategories.map((sub) => (
                        <ul key={`${parent.parentCategory}-${sub.subCategory}-${(sub.categories || []).join('-')}`}>
                            {(sub.categories || []).map((category) => (
                                parent.parentCategory === "Aura Jewels" && (
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
                    {availableIntents.map((intent) => (
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

export default AuraJewels;
