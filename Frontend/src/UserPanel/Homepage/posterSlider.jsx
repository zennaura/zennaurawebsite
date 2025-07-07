// HomepageSlider.jsx
import React, { useState, useEffect } from 'react';
import './Slider.css';
import one from "../../assests/1.jpg";
import two from "../../assests/2.jpg";
import three from "../../assests/3.jpg";
import oneM from "../../assests/1_mobile.jpg";
import twoM from "../../assests/2_mobile.jpg";
import threeM from "../../assests/3_mobile.jpg";
import { useMediaQuery } from 'react-responsive';

const HomepageSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const isMobile = useMediaQuery({ maxWidth: 500 })
  const slides = [
    {
      id: 1,
      title: "Healing Crystals",
      description: "Balance your energy with our handpicked healing stones.",
      image: isMobile?oneM:one,
      cta: "Shop Crystals",
      ctaLink: "/crystals"
    },
    {
      id: 2,
      title: "Scented Candles",
      description: "Create a calming space with our aromatherapy candle range.",
      image: isMobile?twoM:two,
      cta: "Browse Candles",
      ctaLink: "/candles"
    },
    {
      id: 3,
      title: "Spiritual Essentials",
      description: "Smudging kits, incense, and more for mindful living.",
      image: isMobile?threeM:three,
      cta: "Explore Now",
      ctaLink: "/spiritual-essentials"
    }
  ];

  useEffect(() => {
    let interval;
    if (isAutoPlaying) {
      interval = setInterval(() => {
        setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
      }, 3000);
    }
    return () => clearInterval(interval);
  }, [isAutoPlaying, slides.length]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const goToPrevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const goToNextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  return (
    <div className="homepageslider-container">
      <div
        className="homepageslider"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {slides.map((slide) => (
          <div
            key={slide.id}
            className="homepageslider-slide"
            style={{ backgroundImage: `url(${slide.image})` }}
          >
            {/* <div className="homepageslider-content">
              <h2>{slide.title}</h2>
              <p>{slide.description}</p>
              <a href={slide.ctaLink} className="homepageslider-cta">{slide.cta}</a>
            </div> */}
          </div>
        ))}
      </div>

      <button className="homepageslider-arrow homepageslider-prev" onClick={goToPrevSlide}>
        &lt;
      </button>
      <button className="homepageslider-arrow homepageslider-next" onClick={goToNextSlide}>
        &gt;
      </button>

      <div className="homepageslider-dots">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`homepageslider-dot ${index === currentSlide ? 'homepageslider-active' : ''}`}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default HomepageSlider;
