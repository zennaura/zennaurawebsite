import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import "./OurClient2.css";
// import "./ourstory2.css";
    // import ourstory2img1 from "../../assests/ourstory2img1.png"
    // import ourstory2img2 from "../../assests/ourstory2img2.png"
    // import ourstory2img3 from "../../assests/ourstory2img3.png"
    // import ourstory2img4 from "../../assests/ourstory2img4.png"
    // import ourstory2img5 from "../../assests/ourstory2img5.png"

const slides = [
  {
    // image: ourstory2img1,
    title: "Crystals Bracelets",
  },
  {
    // image: ourstory2img2,
    title: "Body Soaps",
  },
  {
    // image: ourstory2img3,
    title: "Candles",
  },
  {
    // image: ourstory2img1,
    title: "Crystals Bracelets",
  },
  {
    // image: ourstory2img4,
    title: "Tumbles",
  },
  {
    // image: ourstory2img5,
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

const ourstory2 = () => {
  const [index, setIndex] = useState(2); // Center image index
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 500); // Initial mobile check

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
    <div className="ourstory2-container">
      {/* ourstory2 */}
      <h1 className="ourclient_heading">Hear From Our Clients!!</h1>
      <div className="ourstory2">
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
            //   opacity = 0.6;
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
            //   backgroundColor = "white";
              translateX = 0;
            } else if (distance === 1 || distance === slides.length - 1) {
              scale = 1.3;
            //   opacity = 0.8;
              zIndex = 4;
              translateX = distance === 1 ? 220 : -220;
            } else if (distance === 2 || distance === slides.length - 2) {
              scale = 1.1;
            //   opacity = 0.6;
              zIndex = 3;
              translateX = distance === 2 ? 480 : -480;
            } else if (distance === 3 || distance === slides.length - 3) {
              scale = 0.9;
            //   opacity = 0.4;
              zIndex = 2;
              translateX = distance === 3 ? 800 : -800;
            } else if (distance === 4 || distance === slides.length - 4) {
              scale = 0.7;
              opacity = 0.2;
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
              className="ourstory2-item"
              style={{
                transform: `scale(${scale}) translateX(${translateX}px)`,
                opacity: opacity,
                zIndex: zIndex,
                backgroundColor: distance === 0 ? "white" : "transparent", 
              }}
              transition={{ type: "spring", stiffness: 100, damping: 15 }}
            >
                <img src="https://www.harpersbazaararabia.com/cloud/2023/02/20/Qx3j9yYO-Untitled-design-1200x675.jpg" alt="" className="ourclientprofile"/>
                <h3 className="ourclientname">KRISH</h3>
                <h4 className="ourclientaddress">Dwarka, Delhi</h4>
              {/* <img src={slide.image} alt="ourstory2" className="ourstory2-image" /> */}
              <p className="ourstory2-image"> 
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit consequatur veritatis sint debitis quas quos, quia harum perferendis unde rerum officia iusto optio tempore veniam magni inventore officiis dolor culpa?
              </p>
              <p className="ourstory2-title">⭐⭐⭐⭐⭐</p>
            </motion.div>
          );
        })}
      </div>

      {/* Navigation Dots */}
      {/* <div className="dots-container">
        {slides.map((_, i) => (
          <span
            key={i}
            className={`dot ${index === i ? "active" : ""}`}
            onClick={() => goToSlide(i)}
          ></span>
        ))}
      </div> */}
    </div>
  );
};

export default ourstory2;
