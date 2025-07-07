import React, { useEffect, useRef, useState } from "react";
import productimage1 from "../../../assests/concern1.png";
import productimage2 from "../../../assests/concern2.png";
import productimage3 from "../../../assests/concern3.png";
import productimage4 from "../../../assests/concern4.png";
import productimage5 from "../../../assests/concern5.png";
import productimage6 from "../../../assests/concern6.png";
import productimage7 from "../../../assests/concern7.png";
import productimage8 from "../../../assests/concern8.png";
import productimage9 from "../../../assests/concern9.png";
import productimage10 from "../../../assests/concern10.png";
import productimage11 from "../../../assests/concern11.png";
import productimage12 from "../../../assests/concern12.png";
import productimage13 from "../../../assests/concern13.png";
import productimage14 from "../../../assests/concern14.png";
import productimage15 from "../../../assests/concern15.png";
import productimage16 from "../../../assests/concern16.png";
import productimage17 from "../../../assests/concern17.png";
import productimage18 from "../../../assests/concern18.png";
import productimage19 from "../../../assests/concern19.png";
import productimage20 from "../../../assests/concern20.png";
import productimage21 from "../../../assests/concern21.png";
import productimage22 from "../../../assests/concern22.png";
import "./ShopByConcern.css";

const ShopByConcern = () => {
    const products = [
        {
            src: productimage1,
            alt: "Handmade Handcrafted Women's Clothing",
            title: "Handcrafted by Women ",
            description: "Each product is lovingly handmade by skilled women artisans, carries the warmth of human touch.",
        },
        {
            src: productimage2,
            alt: "Handmade Handcrafted Women's Clothing",
            title: "Handcrafted by Women ",
            description: "Each product is lovingly handmade by skilled women artisans, carries the warmth of human touch.",
        },
        {
            src: productimage3,
            alt: "Handmade Handcrafted Women's Clothing",
            title: "Handcrafted by Women ",
            description: "Each product is lovingly handmade by skilled women artisans, carries the warmth of human touch.",
        },
        {
            src: productimage4,
            alt: "Handmade Handcrafted Women's Clothing",
            title: "Handcrafted by Women ",
            description: "Each product is lovingly handmade by skilled women artisans, carries the warmth of human touch.",
        },
        {
            src: productimage5,
            alt: "Handmade Handcrafted Women's Clothing",
            title: "Handcrafted by Women ",
            description: "Each product is lovingly handmade by skilled women artisans, carries the warmth of human touch.",
        },
        {
            src: productimage6,
            alt: "Handmade Handcrafted Women's Clothing",
            title: "Handcrafted by Women ",
            description: "Each product is lovingly handmade by skilled women artisans, carries the warmth of human touch.",
        },
        {
            src: productimage7,
            alt: "Handmade Handcrafted Women's Clothing",
            title: "Handcrafted by Women ",
            description: "Each product is lovingly handmade by skilled women artisans, carries the warmth of human touch.",
        },
        {
            src: productimage8,
            alt: "Handmade Handcrafted Women's Clothing",
            title: "Handcrafted by Women ",
            description: "Each product is lovingly handmade by skilled women artisans, carries the warmth of human touch.",
        },
        {
            src: productimage9,
            alt: "Handmade Handcrafted Women's Clothing",
            title: "Handcrafted by Women ",
            description: "Each product is lovingly handmade by skilled women artisans, carries the warmth of human touch.",
        },
        {
            src: productimage10,
            alt: "Handmade Handcrafted Women's Clothing",
            title: "Handcrafted by Women ",
            description: "Each product is lovingly handmade by skilled women artisans, carries the warmth of human touch.",
        },
        {
            src: productimage11,
            alt: "Handmade Handcrafted Women's Clothing",
            title: "Handcrafted by Women ",
            description: "Each product is lovingly handmade by skilled women artisans, carries the warmth of human touch.",
        },
        {
            src: productimage12,
            alt: "Handmade Handcrafted Women's Clothing",
            title: "Handcrafted by Women ",
            description: "Each product is lovingly handmade by skilled women artisans, carries the warmth of human touch.",
        },
        {
            src: productimage13,
            alt: "Handmade Handcrafted Women's Clothing",
            title: "Handcrafted by Women ",
            description: "Each product is lovingly handmade by skilled women artisans, carries the warmth of human touch.",
        },
        {
            src: productimage14,
            alt: "Handmade Handcrafted Women's Clothing",
            title: "Handcrafted by Women ",
            description: "Each product is lovingly handmade by skilled women artisans, carries the warmth of human touch.",
        },
        {
            src: productimage15,
            alt: "Handmade Handcrafted Women's Clothing",
            title: "Handcrafted by Women ",
            description: "Each product is lovingly handmade by skilled women artisans, carries the warmth of human touch.",
        },
        {
            src: productimage16,
            alt: "Handmade Handcrafted Women's Clothing",
            title: "Handcrafted by Women ",
            description: "Each product is lovingly handmade by skilled women artisans, carries the warmth of human touch.",
        },
        {
            src: productimage17,
            alt: "Handmade Handcrafted Women's Clothing",
            title: "Handcrafted by Women ",
            description: "Each product is lovingly handmade by skilled women artisans, carries the warmth of human touch.",
        },
        {
            src: productimage18,
            alt: "Handmade Handcrafted Women's Clothing",
            title: "Handcrafted by Women ",
            description: "Each product is lovingly handmade by skilled women artisans, carries the warmth of human touch.",
        },
        {
            src: productimage19,
            alt: "Handmade Handcrafted Women's Clothing",
            title: "Handcrafted by Women ",
            description: "Each product is lovingly handmade by skilled women artisans, carries the warmth of human touch.",
        },
        {
            src: productimage20,
            alt: "Handmade Handcrafted Women's Clothing",
            title: "Handcrafted by Women ",
            description: "Each product is lovingly handmade by skilled women artisans, carries the warmth of human touch.",
        },
        {
            src: productimage21,
            alt: "Handmade Handcrafted Women's Clothing",
            title: "Handcrafted by Women ",
            description: "Each product is lovingly handmade by skilled women artisans, carries the warmth of human touch.",
        },
        {
            src: productimage22,
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

                                {/* <h3>{product.title}</h3> */}
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

                            {/* <h3>{product.title}</h3> */}
                            {/* <p>{product.description}</p> */}
                        </div>
                    ))}

                </div>
            </div>


        </>
    );
};

export default ShopByConcern;
