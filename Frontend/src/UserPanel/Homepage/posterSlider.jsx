import React, { useState, useEffect } from 'react';
import './Slider.css'

const HomepageSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  
  // Sample product slides
  const slides = [
    {
      id: 1,
      title: "Summer Collection 2023",
      description: "Discover our new arrivals with up to 30% discount",
      image: "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      cta: "Shop Now",
      ctaLink: "/summer-collection"
    },
    {
      id: 2,
      title: "Premium Watches",
      description: "Elegant timepieces for every occasion",
      image: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2080&q=80",
      cta: "View Collection",
      ctaLink: "/watches"
    },
    {
      id: 3,
      title: "New Arrivals",
      description: "Fresh styles just landed in our store",
      image: "https://images.unsplash.com/photo-1445205170230-053b83016050?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80",
      cta: "Explore Now",
      ctaLink: "/new-arrivals"
    }
  ];

  // Auto-play functionality
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
        {slides.map((slide, index) => (
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

      {/* Navigation arrows */}
      <button className="homepageslider-arrow homepageslider-prev" onClick={goToPrevSlide}>
        &lt;
      </button>
      <button className="homepageslider-arrow homepageslider-next" onClick={goToNextSlide}>
        &gt;
      </button>

      {/* Dots indicator */}
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