import React from 'react';
import './ShopBy.css';

const ShopBy = () => {
    const items = [
        { title: 'Shop by', label: 'Concern' },
        { title: 'Shop by', label: 'Skin Type' },
        { title: 'Shop by', label: 'Expert' },
    ];

    return (
        <div className="Shopby-container">
            {items.map(({ title, label }, index) => (
                <div className="shopby-text-box" key={index}>
                    <h1 className="shop-text-h1">{title}</h1>
                    <span className="shopby-span">{label}</span>
                </div>
            ))}
        </div>
    );
};

export default ShopBy;
