import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import "./Carousel.css";
import Carouselimg1 from "../../assests/bracelet2.jpeg"
import Carouselimg2 from "../../assests/soap_carousel.jpeg"
import Carouselimg3 from "../../assests/candle.jpeg"
import Carouselimg4 from "../../assests/tumble.jpg"
import Carouselimg5 from "../../assests/tree.jpg"
import Carouselimg6 from "../../assests/heart.jpeg"
import Carouselimg7 from "../../assests/guasha.jpeg"
import Carouselimg8 from "../../assests/lamp.jpeg"
import Carouselimg9 from "../../assests/pendant2.jpeg"
import Carouselimg10 from "../../assests/pendulum.jpeg"
import Carouselimg11 from "../../assests/Ring.jpeg"
import Carouselimg12 from "../../assests/ruler.jpeg"
import Carouselimg13 from "../../assests/sage.jpeg"

const slides = [
  {
    image: Carouselimg1,
    title: "Crystal Bracelets",
  },
  {
    image: Carouselimg2,
    title: "Body Soaps",
  },
  {
    image: Carouselimg4,
    title: "Crystal Tumbles",
  },
  {
    image: Carouselimg5,
    title: "Trees",
  },
  {
    image: Carouselimg6,
    title: "Heart",
  },
  {
    image: Carouselimg3,
    title: "Candles",
  },
  {
    image: Carouselimg7,
    title: "Gua Sha",
  },
  {
    image: Carouselimg8,
    title: "Lamp",
  },
  {
    image: Carouselimg9,
    title: "Pendant",
  },
  {
    image: Carouselimg10,
    title: "Pendulum",
  },
  {
    image: Carouselimg11,
    title: "Ring",
  },
  {
    image: Carouselimg12,
    title: "Roller",
  },
  {
    image: Carouselimg13,
    title: "Sage",
  },

  
];

//     - Trees
//     - Hearts
//     - Malas
//     - Zibu coins
//     - Face Roller
//     - Gua Sha
//     - Selenite Plate
//     - Pendant
//     - Pendulums
//     - Rings
//     - Lamp
//     - Sage

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
        {isMobile?(slides.slice(0,5).map((_, i) => (
          <span
            key={i}
            className={`dot ${index === i ? "active" : ""}`}
            onClick={() => goToSlide(i)}
          ></span>
        ))):(slides.map((_, i) => (
          <span
            key={i}
            className={`dot ${index === i ? "active" : ""}`}
            onClick={() => goToSlide(i)}
          ></span>
        )))}
      </div>
    </div>
  );
};

export default Carousel;
