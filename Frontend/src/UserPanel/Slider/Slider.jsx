import React, { useState, useEffect } from 'react';
import './Slider.css';
import Sliderimg1 from "../../assests/sliderimg1.png"
import Sliderimg2 from "../../assests/Sliderimg2.png";
const Slider = () => {
    // Array of images and their titles
    const images = [
        {
            src: Sliderimg1,
            title: "Divine Crystal"
        },
        {
            src: Sliderimg2,
            title: "Radiant Glow"
        },
        {
            src: "https://th.bing.com/th/id/OIP.2EZF48FZgnVOrLTVDgJIKgHaHa?rs=1&pid=ImgDetMain",
            title: "Pure Elegance"
        },
        {
            src: "https://www.airyday.co/cdn/shop/files/PDP-AirydayPrettyinZincSPF50_SunscreenForFace03.jpg?v=1707857885&width=780",
            title: "Sun Protection"
        }
    ];

    // State to track the current image index
    const [currentIndex, setCurrentIndex] = useState(0);

    // State to track whether the slider is paused
    const [isPaused, setIsPaused] = useState(false);

    // Function to handle left arrow click
    const handleLeftClick = () => {
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
    };

    // Function to handle right arrow click
    const handleRightClick = () => {
        setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
    };

    // Auto-slider logic
    useEffect(() => {
        let interval;

        if (!isPaused) {
            // Start the auto-slider
            interval = setInterval(() => {
                setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
            }, 5000); // Change image every 2 seconds
        }

        // Cleanup interval on unmount or pause
        return () => clearInterval(interval);
    }, [isPaused, currentIndex, images.length]);

    // Pause slider on hover or interaction
    const handleMouseEnter = () => {
        setIsPaused(true);
    };

    const handleMouseLeave = () => {
        setIsPaused(false);
    };

    return (
        <div 
            className="slider-container" 
            onMouseEnter={handleMouseEnter} 
            onMouseLeave={handleMouseLeave}
        >
            {/* Large Image */}
            <div className="slider-big-image">
                <img src={images[currentIndex].src} alt={images[currentIndex].title} />
            </div>

            {/* Small Image and Controls */}
            <div className="slider-small-image">
                <div className="slider-image">
                    <img
                        src={images[(currentIndex + 1) % images.length].src}
                        alt={images[(currentIndex + 1) % images.length].title}
                    />
                    <h3 className="slider-image-title">{images[(currentIndex + 1) % images.length].title}</h3>
                </div>

                {/* Arrows and Image Index */}
                <div className="slider-arrow">
                    <div className="slider-arrow-left" onClick={handleLeftClick}>
                    </div>
                    <div className="slider-image-no">
                        <span>{currentIndex + 1}</span> / <span>{images.length}</span>
                    </div>
                    <div className="slider-arrow-right" onClick={handleRightClick}>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Slider;