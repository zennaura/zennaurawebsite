import React, { useState, useEffect } from "react";
import "./BestSeller.css";
import ProductCart from "../../../components/Productcart/ProductCart";
import { useNavigate } from "react-router-dom";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const BestSeller = () => {
  const [bestSellerProducts, setBestSellerProducts] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [autoSlide, setAutoSlide] = useState(true);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const navigate = useNavigate();

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Fetch products
  useEffect(() => {
    const fetchBestSellerProducts = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/products');
        const productsData = await res.json();
        const flattened = productsData.flatMap((product) =>
          product.variants.map((variant, index) => ({
            id: `${product._id}-${index}`,
            data: {
              _id: product._id,
              name: product.name,
              title: product.title,
              description: product.description,
              sku: product.sku,
              tags: product.tags,
              stoneUsedImage: product.stoneUsedImage,
              rating: product.rating,
              frontImage: product.frontImage,
              otherimages: product.otherimages,
              healingImage: product.healingImage,
              benefits: product.benefits,
              whyChoose: product.whyChoose,
              waysToClean: product.waysToClean,
              whoWear: product.whoWear,
              whereHowWear: product.whereHowWear,
              productDescriptions: product.productDescriptions,
              ...variant,
            },
          }))
        ).filter(product => product.data.bestSeller);
        setBestSellerProducts(flattened);
      } catch (err) {
        console.error('Error fetching best seller products:', err);
      }
    };
    fetchBestSellerProducts();
  }, []);

  // Determine cards per slide based on screen width
  const cardsPerSlide = windowWidth <= 768 ? 3 : 4;
  
  // Auto-slide effect
  useEffect(() => {
    if (!autoSlide || bestSellerProducts.length <= cardsPerSlide) return;
    const interval = setInterval(() => {
      setCurrentSlide(prev => 
        prev + cardsPerSlide >= bestSellerProducts.length ? 0 : prev + cardsPerSlide
      );
    }, 6000);
    return () => clearInterval(interval);
  }, [autoSlide, bestSellerProducts.length, cardsPerSlide]);

  const handleClick = (product) => {
    navigate(`/productdetails/${product.id}`, {
      state: product.data,
    });
  };

  // Navigation functions
  const nextSlide = () => {
    setCurrentSlide(prev => 
      prev + cardsPerSlide >= bestSellerProducts.length ? 0 : prev + cardsPerSlide
    );
    setAutoSlide(false);
    setTimeout(() => setAutoSlide(true), 10000);
  };

  const prevSlide = () => {
    setCurrentSlide(prev => 
      prev - cardsPerSlide < 0 ? Math.max(0, bestSellerProducts.length - cardsPerSlide) : prev - cardsPerSlide
    );
    setAutoSlide(false);
    setTimeout(() => setAutoSlide(true), 10000);
  };

  const goToSlide = (slideIndex) => {
    setCurrentSlide(slideIndex * cardsPerSlide);
    setAutoSlide(false);
    setTimeout(() => setAutoSlide(true), 10000);
  };

  // Calculate total slides and visible products
  const totalSlides = Math.ceil(bestSellerProducts.length / cardsPerSlide);
  const visibleProducts = bestSellerProducts.slice(currentSlide, currentSlide + cardsPerSlide);

  return (
    <div className="BestSeller-container">
      <h1 className="BestSeller-heading">Best Sellers</h1>

      <div className="best-seller-slider">
        {bestSellerProducts.length > cardsPerSlide && (
          <button className="slider-arrow left" onClick={prevSlide}>
            <FaChevronLeft />
          </button>
        )}

        <div className="BestSeller-cards">
          {visibleProducts.map((product, index) => (
            <div
              key={product.id}
              className={`Featuredproducts-card ${
                windowWidth <= 768 ? 
                  (index === 0 ? "mobile-full-card" : "mobile-half-card") :
                  (index === 1 || index === 2) ? "featured-card-center" : ""
              }`}
            >
              {console.log(product)}
              <ProductCart
                key={product.id}
                id={product.id}
                name={product.data.name}
                title={product.data.title}
                image={product.data.frontImage}
                price={product.data.salePrice}
                originalPrice={product.data.costPrice}
                rating={product.data.rating}
                isBestSeller={product.data.bestSeller}
                onBuyNowClick={() => handleClick(product)}
              />
            </div>
          ))}
        </div>

        {bestSellerProducts.length > cardsPerSlide && (
          <button className="slider-arrow right" onClick={nextSlide}>
            <FaChevronRight />
          </button>
        )}
      </div>

      {/* Pagination Dots */}
      {totalSlides > 1 && (
        <div className="pagination-dots">
          {Array.from({ length: totalSlides }).map((_, index) => (
            <button
              key={index}
              className={`dot ${Math.floor(currentSlide / cardsPerSlide) === index ? "active" : ""}`}
              onClick={() => goToSlide(index)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default BestSeller;