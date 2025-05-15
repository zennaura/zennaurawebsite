import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import "./Carousel.css";
import Carouselimg1 from "../../assests/Carouselimg1.png"
import Carouselimg2 from "../../assests/Carouselimg2.png"
import Carouselimg3 from "../../assests/Carouselimg3.png"
import Carouselimg4 from "../../assests/Carouselimg4.png"
import Carouselimg5 from "../../assests/Carouselimg5.png"

const slides = [
  {
    image: Carouselimg1,
    title: "Crystals Bracelets",
  },
  {
    image: Carouselimg2,
    title: "Body Soaps",
  },
  {
    image: Carouselimg3,
    title: "Candles",
  },
  {
    image: Carouselimg1,
    title: "Crystals Bracelets",
  },
  {
    image: Carouselimg4,
    title: "Tumbles",
  },
  {
    image: Carouselimg5,
    title: "Skincare",
  },
  {
    image: "https://i0.wp.com/imageamplified.com/wp-content/uploads/2018/05/ELLE-MAGAZINE-Jasmine-Tookes-by-Tom-Schirmacher.-Samira-Nasr-May-2018-www.imageamplified.com-Image-Amplified4_thumb.jpg?resize=662%2C811",
    title: "Candles",
  },
  {
    image: "https://www.harpersbazaararabia.com/cloud/2023/02/20/Qx3j9yYO-Untitled-design-1200x675.jpg",
    title: "Tumbles",
  },
];

const Carousel = () => {
  const [index, setIndex] = useState(2); // Center image index
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768); // Initial mobile check

  const nextSlide = () => {
    setIndex((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (slideIndex) => {
    setIndex(slideIndex);
  };

  // Update the mobile state based on window size
  const handleResize = () => {
    setIsMobile(window.innerWidth <= 500);
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 3000); // Auto-slide every 3s
    window.addEventListener("resize", handleResize); // Handle resizing

    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="carousel-container">
      {/* Carousel */}
      <div className="carousel">
        {slides.map((slide, i) => {
          const distance = (i - index + slides.length) % slides.length;
          let scale, opacity, zIndex, translateX;

          // Adjust styles based on mobile or desktop view
          if (isMobile) {
            // For Mobile
            if (distance === 0) {
              // Center card
              scale = 1;
              opacity = 1;
              zIndex = 5;
              translateX = 0;
            } else if (distance === 1 || distance === slides.length - 1) {
              // Half cards on left or right
              scale = 0.7;
              opacity = 0.6;
              zIndex = 3;
              translateX = distance === 1 ? 250 : -250;
            } else if (distance === 2 || distance === slides.length - 2) {
              // Half cards on left or right
              scale = 0.4;
              opacity = 0;
              zIndex = 1;
              translateX = distance === 2 ? 300 : -300;
            } else {
              scale = 0;
              opacity = 0;
              zIndex = 1;
              translateX = distance < slides.length / 2 ? 1200 : -1200;
            }
          } else {
            // For Desktop/Larger screens
            if (distance === 0) {
              scale = 1.5;
              opacity = 1;
              zIndex = 5;
              translateX = 0;
            } else if (distance === 1 || distance === slides.length - 1) {
              scale = 1.3;
              opacity = 0.8;
              zIndex = 4;
              translateX = distance === 1 ? 220 : -220;
            } else if (distance === 2 || distance === slides.length - 2) {
              scale = 1.1;
              opacity = 0.6;
              zIndex = 3;
              translateX = distance === 2 ? 480 : -480;
            } else if (distance === 3 || distance === slides.length - 3) {
              scale = 0.9;
              opacity = 0.4;
              zIndex = 2;
              translateX = distance === 3 ? 800 : -800;
            } else if (distance === 4 || distance === slides.length - 4) {
              scale = 0.7;
              opacity = 0;
              zIndex = 1;
              translateX = distance === 4 ? 1000 : -1000;
            } else if (distance === 5 || distance === slides.length - 5) {
              scale = 0.5;
              opacity = 0;
              zIndex = 1;
              translateX = distance === 4 ? 1200 : -1200;
            } else {
              scale = 0.3;
              opacity = 0;
              zIndex = 0;
              translateX = distance < slides.length / 2 ? 1200 : -1200;
            }
          }

          return (
            <motion.div
              key={i}
              className="carousel-item"
              style={{
                transform: `scale(${scale}) translateX(${translateX}px)`,
                opacity: opacity,
                zIndex: zIndex,
              }}
              transition={{ type: "spring", stiffness: 100, damping: 15 }}
            >
              <img src={slide.image} alt="carousel" className="carousel-image" />
              <p className="carousel-title">{slide.title}</p>
            </motion.div>
          );
        })}
      </div>

      {/* Navigation Dots */}
      <div className="dots-container">
        {slides.map((_, i) => (
          <span
            key={i}
            className={`dot ${index === i ? "active" : ""}`}
            onClick={() => goToSlide(i)}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
