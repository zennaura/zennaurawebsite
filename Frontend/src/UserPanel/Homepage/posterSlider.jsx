// HomepageSlider.jsx
import React, { useState, useEffect } from 'react';
import './Slider.css';

const HomepageSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const slides = [
    {
      id: 1,
      title: "Healing Crystals",
      description: "Balance your energy with our handpicked healing stones.",
      image: "https://static.wixstatic.com/media/e741ea_dd1ffc14fed246278c15261555f636e1~mv2_d_1999_1333_s_2.jpg/v1/fill/w_1999,h_1333,al_c/e741ea_dd1ffc14fed246278c15261555f636e1~mv2_d_1999_1333_s_2.jpgz",
      cta: "Shop Crystals",
      ctaLink: "/crystals"
    },
    {
      id: 2,
      title: "Scented Candles",
      description: "Create a calming space with our aromatherapy candle range.",
      image: "https://images.rawpixel.com/image_social_landscape/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTEyL3Jhd3BpeGVsX29mZmljZV80MV9waG90b19vZl9hX2lyaWRlc2NlbnRfY3J5c3RhbF9vbl93YXRlcl9iYWNrZ19iMTc2MGUzYi00MTI0LTRkOTEtYjMwMi0zODc4YWQyZWVmNTNfMS5qcGc.jpg",
      cta: "Browse Candles",
      ctaLink: "/candles"
    },
    {
      id: 3,
      title: "Spiritual Essentials",
      description: "Smudging kits, incense, and more for mindful living.",
      image: "https://th.bing.com/th/id/OIP.DQujBzfKMu964y3PQK7F2wHaFj?rs=1&pid=ImgDetMain",
      cta: "Explore Now",
      ctaLink: "/spiritual-essentials"
    }
  ];

  useEffect(() => {
    let interval;
    if (isAutoPlaying) {
      interval = setInterval(() => {
        setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
      }, 5000);
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
            <div className="homepageslider-content">
              <h2>{slide.title}</h2>
              <p>{slide.description}</p>
              <a href={slide.ctaLink} className="homepageslider-cta">{slide.cta}</a>
            </div>
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
