import React, { useEffect, useRef, useState } from "react";
import productimage from "../../../assests/member-card.png";
import "./ShopByConcern.css";

const ShopByConcern = () => {
    const products = [
        {
            src: productimage,
            alt: "Handmade Handcrafted Women's Clothing",
            title: "Handcrafted by Women ",
            description: "Each product is lovingly handmade by skilled women artisans, carries the warmth of human touch.",
        },
        {
            src: productimage,
            alt: "Handmade Handcrafted Women's Clothing",
            title: "Handcrafted by Women ",
            description: "Each product is lovingly handmade by skilled women artisans, carries the warmth of human touch.",
        },
        {
            src: productimage,
            alt: "Handmade Handcrafted Women's Clothing",
            title: "Handcrafted by Women ",
            description: "Each product is lovingly handmade by skilled women artisans, carries the warmth of human touch.",
        },
        {
            src: productimage,
            alt: "Handmade Handcrafted Women's Clothing",
            title: "Handcrafted by Women ",
            description: "Each product is lovingly handmade by skilled women artisans, carries the warmth of human touch.",
        },
        {
            src: productimage,
            alt: "Handmade Handcrafted Women's Clothing",
            title: "Handcrafted by Women ",
            description: "Each product is lovingly handmade by skilled women artisans, carries the warmth of human touch.",
        },
        {
            src: productimage,
            alt: "Handmade Handcrafted Women's Clothing",
            title: "Handcrafted by Women ",
            description: "Each product is lovingly handmade by skilled women artisans, carries the warmth of human touch.",
        },
        {
            src: productimage,
            alt: "Handmade Handcrafted Women's Clothing",
            title: "Handcrafted by Women ",
            description: "Each product is lovingly handmade by skilled women artisans, carries the warmth of human touch.",
        },
        {
            src: productimage,
            alt: "Handmade Handcrafted Women's Clothing",
            title: "Handcrafted by Women ",
            description: "Each product is lovingly handmade by skilled women artisans, carries the warmth of human touch.",
        },
        {
            src: productimage,
            alt: "Handmade Handcrafted Women's Clothing",
            title: "Handcrafted by Women ",
            description: "Each product is lovingly handmade by skilled women artisans, carries the warmth of human touch.",
        },
        {
            src: productimage,
            alt: "Handmade Handcrafted Women's Clothing",
            title: "Handcrafted by Women ",
            description: "Each product is lovingly handmade by skilled women artisans, carries the warmth of human touch.",
        },
        {
            src: productimage,
            alt: "Handmade Handcrafted Women's Clothing",
            title: "Handcrafted by Women ",
            description: "Each product is lovingly handmade by skilled women artisans, carries the warmth of human touch.",
        },
        {
            src: productimage,
            alt: "Handmade Handcrafted Women's Clothing",
            title: "Handcrafted by Women ",
            description: "Each product is lovingly handmade by skilled women artisans, carries the warmth of human touch.",
        },
        {
            src: productimage,
            alt: "Handmade Handcrafted Women's Clothing",
            title: "Handcrafted by Women ",
            description: "Each product is lovingly handmade by skilled women artisans, carries the warmth of human touch.",
        },
        {
            src: productimage,
            alt: "Handmade Handcrafted Women's Clothing",
            title: "Handcrafted by Women ",
            description: "Each product is lovingly handmade by skilled women artisans, carries the warmth of human touch.",
        },
        {
            src: productimage,
            alt: "Handmade Handcrafted Women's Clothing",
            title: "Handcrafted by Women ",
            description: "Each product is lovingly handmade by skilled women artisans, carries the warmth of human touch.",
        },
    ];

    const sliderRef = useRef(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    // Auto-scroll every 3 seconds to the next set of 3 cards
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) =>
                prevIndex + 3 >= products.length ? 0 : prevIndex + 3
            );
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (sliderRef.current) {
            sliderRef.current.scrollTo({
                left: currentIndex * (400 + 50), // Adjust scroll based on card width + gap
                behavior: "smooth",
            });
        }
    }, [currentIndex]);

    return (
        <>
            <div className="ShopByConcern-container">
                <div className="ShopByConcern-header">
                    <h1>Shop by Concern</h1>
                </div>
                <div className="ShopByConcern-slider-container">
                    <div className="ShopByConcern-slider" ref={sliderRef}>
                        {products.map((product, index) => (
                            <div key={index} className="ShopByConcern-slider-item">

                                <img className={index % 2 === 1 ? "ShopByConcern-slider-item-img-even" : "ShopByConcern-slider-item-img-odd"}
                                    src={product.src} alt={product.alt} />

                                <h3>{product.title}</h3>
                                {/* <p>{product.description}</p> */}
                            </div>
                        ))}
                    </div>
                </div>
                <div className="ShopByConcern-dots">
                    {[...Array(Math.ceil(products.length / 3))].map((_, index) => (
                        <div
                            key={index}
                            className={`ShopByConcern-dot ${currentIndex === index * 3 ? "active" : ""}`}
                        ></div>
                    ))}
                </div>
            </div>


            <div className="concern-container">
                <div className="concern-title-content">
                    <h1 className="concern-title">Shop by Concern</h1>
                </div>

                <div className="concern-products">
                    {products.map((product, index) => (
                        <div key={index} className="ShopByConcern-slider-item">

                            <img className={index % 2 === 1 ? "ShopByConcern-slider-item-img-even" : "ShopByConcern-slider-item-img-odd"}
                                src={product.src} alt={product.alt} />

                            <h3>{product.title}</h3>
                            {/* <p>{product.description}</p> */}
                        </div>
                    ))}

                </div>
            </div>


        </>
    );
};

export default ShopByConcern;
