import React, { useState, useEffect } from "react";
import "./OurStory.css";
import one from "../../assests/storybg1.png";
import two from "../../assests/storybg2.png";
import three from "../../assests/storybg3.png";

const slides = [
  {
    title: "The Beginning – A Journey into Crystal Healing & Manifestation",
    content:
      "At Zenn Aura, we believe in the power of natural energy, reiki healing, Manifestation, and crystal therapy. Our journey started with a deep passion for spiritual healing, pure manifestation, and self-care rituals. ",
    quote: "From reiki-infused crystals to aromatherapy candles, chakra healing tools, and smudging rituals—Zenn Aura is your gateway to spiritual wellness.",
    src:one
  },
  {
    title: "The Philosophy – Where Spirituality Meets Self-Care & Gifting",
    content:
      "Whether you seek rose quartz for love, citrine for money, amethyst for clarity, or black tourmaline for protection, each piece in our collection is designed to align your energy and amplify your intentions.",
    quote:
      "Perfect for gifting! Explore our crystal-infused candles, wedding gifts, and manifestation kits—meaningful gifts that bring luck, love, and positivity.",
    src:two
  },
  {
    title: "The Mission – Elevate Your Spirit, Transform Your Life",
    content: `Our mission is to provide handcrafted, high-quality spiritual products that help you:
    - Cleanse negative energy with sage & Palo Santo
    - Manifest your dreams with reiki-infused crystals & candles
    - Enhance meditation & chakra healing with sacred tools.`,
    quote: "Zenn Aura represents a lifestyle that celebrates balance, harmony, and conscious self-care. Transform your space. Elevate your energy. Manifest your best life.",
    src:three
  },
];

const OurStory = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Function to go to the next slide
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  // Function to go to the previous slide
  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  // Automatically move to the next slide every 3000ms (3 seconds)
  useEffect(() => {
    const interval = setInterval(nextSlide, 3000);

    // Cleanup the interval when the component unmounts
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="our-story">
      <h2>Our Story</h2>
      <div className="story-slider">
        {/* Navigation Buttons */}
        {/* <button className="slider-btn prev" onClick={prevSlide}>
          &#10094;
        </button>
        <button className="slider-btn next" onClick={nextSlide}>
          &#10095;
        </button> */}

        {/* Slides */}
        <div className="slides-container">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`story-card ${index === currentSlide ? "active" : ""}`}
              style={{ backgroundImage: `url(${slide.src})` }}
            >
              <div className="storycard-content">
                <h3>{slide.title}</h3>
                <p>{slide.content}</p>
                {slide.quote && <p className="quote">{slide.quote}</p>}

              </div>
              <button className="know-more">KNOW MORE</button>
            </div>
          ))}
        </div>

        {/* Pagination Dots */}
        <div className="dots-container">
          {slides.map((_, index) => (
            <span
              key={index}
              className={`dot ${index === currentSlide ? "active" : ""}`}
              onClick={() => setCurrentSlide(index)}
            ></span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurStory;