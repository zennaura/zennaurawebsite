import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import "./ProductDetails.css";
import Carouselimg5 from "../../../assests/Carouselimg5.png";
import { useNavigate } from "react-router-dom";

const ProductDetails = ({ product }) => {
  const navigate = useNavigate(); // ✅ Correct place

  const [quantity, setQuantity] = useState(1);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [slides, setSlides] = useState([]);

  const getAllProductImages = () => {
    const images = [];

    if (product?.frontImage) {
      images.push({
        image: product.frontImage,
        title: product.name
      });
    }

    if (product?.variantsimages?.length > 0) {
      product.variantsimages.forEach((variant, index) => {
        images.push({
          image: variant,
          title: `${product.name} - Variant ${index + 1}`
        });
      });
    }

    if (product?.otherimages?.length > 0) {
      product.otherimages.forEach((img, index) => {
        images.push({
          image: img,
          title: `${product.name} - Image ${index + 1}`
        });
      });
    }

    if (product?.productDescriptions?.image) {
      images.push({
        image: product.productDescriptions.image,
        title: `${product.name} - Description`
      });
    }

    if (product?.stoneUsedImage?.length > 0) {
      product.stoneUsedImage.forEach((stone, index) => {
        if (stone.image) {
          images.push({
            image: stone.image,
            title: `${product.name} - Stone ${index + 1}`
          });
        }
      });
    }

    if (images.length === 0) {
      images.push({
        image: Carouselimg5, // corrected to actual imported image
        title: "No image available"
      });
    }

    return images;
  };

  useEffect(() => {
    const productImages = getAllProductImages();
    setSlides(productImages);

    if (productImages.length > 0 && carouselIndex >= productImages.length) {
      setCarouselIndex(0);
    }
  }, [product]);

  const nextSlide = () => {
    setCarouselIndex((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCarouselIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (slideIndex) => {
    setCarouselIndex(slideIndex);
  };

  const handleResize = () => {
    setIsMobile(window.innerWidth <= 768);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (slides.length > 1) {
        nextSlide();
      }
    }, 3000);

    window.addEventListener("resize", handleResize);
    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", handleResize);
    };
  }, [slides]);

  const handlebuyitnow = () => {
  navigate("/checkout-page", {
    state: {
      products: [
        {
          ...product,
          quantity: quantity
        }
      ]
    }
  });
};


  if (slides.length === 0) {
    return <div>Loading product images...</div>;
  }

  return (
    <div className="product-page">
      <div className="product-container">
        {/* Product Info */}
        <div className="info-section">
          <h1 className="product-title">
            <span className="product-name">{product.name}</span> – {product.title}
          </h1>

          <div className="rating-container">
            <span className="review-count">20 Reviews</span>
          </div>

          <p>
            <strong>Size:</strong> <span className="product-size">{product.size}</span>
          </p>
          
          {/* tags */}
          <div className="specs-container">
            {product.tags?.map((tag, index) => (
              <p key={index} className="specs-p">{tag}</p>
            ))}
          </div>

          <div className="price-container">
            <p className="price-label">M.R.P.:</p>
            <div className="price-mrp-box">
              <p className="price-value">₹{product.salePrice}</p>
              <p className="price-note">Inclusive of all taxes</p>
            </div>
            <p className="price-original">₹{product.costPrice}</p>
          </div>

          <div className="quantity-container">
            <p className="quantity-label">Net Quantity:</p>
            <div className="quantity-selector">
              <button onClick={() => setQuantity((q) => Math.max(1, q - 1))}>
                -
              </button>
              <span>{quantity}</span>
              <button onClick={() => setQuantity((q) => q + 1)}>+</button>
            </div>
          </div>

          <div className="action-buttons">
            <button className="wishlist-button"><span>❤️</span>Add to wishlist</button>
            <button className="cart-button">Add to cart</button>
          </div>

          <div className="divider-line"></div>

          <button className="buy-now-button" onClick={handlebuyitnow}>Buy it now</button>
          <div className="description-container">
            <h2 className="section-title">Description</h2>
            <p className="description-text">
              {product.description}
            </p>
          </div>
        </div>
        
        {/* Carousel Gallery */}
        <div className="gallery-section">
          <div className="vertical">
            {slides.map((slide, i) => {
              const distance = (i - carouselIndex + slides.length) % slides.length;
              let scale, opacity, zIndex, translateY;

              if (isMobile) {
                if (distance === 0) {
                  scale = 1;
                  opacity = 1;
                  zIndex = 5;
                  translateY = 0;
                } else if (distance === 1 || distance === slides.length - 1) {
                  scale = 0.7;
                  opacity = 0.6;
                  zIndex = 3;
                  translateY = distance === 1 ? 200 : -200;
                } else if (distance === 2 || distance === slides.length - 2) {
                  scale = 0.4;
                  opacity = 0;
                  zIndex = 1;
                  translateY = distance === 2 ? 300 : -300;
                } else {
                  scale = 0;
                  opacity = 0;
                  zIndex = 1;
                  translateY = distance < slides.length / 2 ? 1200 : -1200;
                }
              } else {
                if (distance === 0) {
                  scale = 1.2;
                  opacity = 1;
                  zIndex = 5;
                  translateY = 0;
                } else if (distance === 1 || distance === slides.length - 1) {
                  scale = 1;
                  opacity = 0.8;
                  zIndex = 4;
                  translateY = distance === 1 ? 450 : -450;
                } else {
                  scale = 0.5;
                  opacity = 0;
                  zIndex = 0;
                  translateY = distance < slides.length / 2 ? 1000 : -1000;
                }
              }

              return (
                <motion.div
                  key={i}
                  className="carousel-item-product"
                  style={{
                    transform: `scale(${scale}) translateY(${translateY}px)`,
                    opacity: opacity,
                    zIndex: zIndex,
                  }}
                  transition={{ type: "spring", stiffness: 100, damping: 15 }}
                >
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className="carousel-image-product"
                    onError={(e) => {
                      e.target.onerror = null; 
                      e.target.src = "https://via.placeholder.com/500";
                    }}
                  />
                </motion.div>
              );
            })}
          </div>
          
          {/* Only show controls if we have multiple images */}
          {slides.length > 1 && (
            <div className="carousel-controls">
              <div className="carousel-dots">
                {slides.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => goToSlide(i)}
                    className={`carousel-dot ${i === carouselIndex ? 'active' : ''}`}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;