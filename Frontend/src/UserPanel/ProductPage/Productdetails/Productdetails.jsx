import React, { useState, useEffect, useMemo, useCallback } from "react";
import { motion } from "framer-motion";
import "./ProductDetails.css";
import Carouselimg5 from "../../../assests/Carouselimg5.png";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useUser } from "../../../components/AuthContext/AuthContext";

const ProductDetails = ({ product, selectedVariant, onVariantSelect }) => {
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const { id } = useParams();
  // console.log("id", id);

  // console.log("product", product);
  // console.log("var", selectedVariant);
  // Use selectedVariant or fallback to first variant
  const displayVariant = useMemo(() => {
    if (selectedVariant) return selectedVariant;
    if (product?.variants?.[0]) return product.variants[0];
    // If no variant is available, create a default one with product data
    return {
      ...product,
      salePrice: product.salePrice || product.price || 0,
      tax: product.tax || 0,
      discount: product.discount || 0,
      variantname: product.name || product.title || "Default Variant",
      frontImage: product.frontImage || product.image || Carouselimg5,
      backImage: product.backImage || product.image || Carouselimg5
    };
  }, [selectedVariant, product]);

  // Variant selection handler
  const handleVariantChange = (variant) => {
    if (onVariantSelect) {
      onVariantSelect(variant);
    }
  };

  // Memoize the product images to prevent unnecessary recalculations
  const slides = useMemo(() => {
    const images = [];
    const addImage = (src, title) => {
      if (src) {
        images.push({ image: src, title, loading: true });
      }
    };
    if (!displayVariant.variantsimages) {
      if (displayVariant.frontImage) addImage(displayVariant.frontImage, product.name);
      if (displayVariant.backImage) addImage(displayVariant.backImage, product.name);
    }
    (displayVariant.variantsimages || []).forEach((img, idx) =>
      addImage(img, `${product.name} - Variant ${idx + 1}`)
    );
    (product.otherimages || []).forEach((img, idx) =>
      addImage(img, `${product.name} - Other ${idx + 1}`)
    );
    if (product?.productDescriptions?.image)
      addImage(product.productDescriptions.image, `${product.name} - Description`);
    (product.stoneUsedImage || []).forEach((stone, idx) =>
      addImage(stone.image, `${product.name} - Stone ${idx + 1}`)
    );
    if (images.length === 0) addImage(Carouselimg5, "No image available");
    return images;
  }, [displayVariant, product]);

  const nextSlide = useCallback(() => {
    setCarouselIndex((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const prevSlide = useCallback(() => {
    setCarouselIndex((prev) => (prev - 1 + slides.length) % slides.length);
  }, [slides.length]);

  const goToSlide = useCallback((slideIndex) => {
    setCarouselIndex(slideIndex);
  }, []);

  const handleResize = useCallback(() => {
    setIsMobile(window.innerWidth <= 768);
  }, []);

  useEffect(() => {
    if (slides.length <= 1) return;
    const interval = setInterval(() => {
      nextSlide();
    }, 3000);
    return () => clearInterval(interval);
  }, [slides.length, nextSlide]);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [handleResize]);

  useEffect(() => {
    if (carouselIndex >= slides.length) {
      setCarouselIndex(0);
    }
    setIsLoading(false);
  }, [slides, carouselIndex]);

  const handleImageLoad = (index) => {};

  const toggleDisclaimer = () => {
    setIsExpanded(!isExpanded);
  };

  const truncateDescription = (text, wordCount) => {
    if (!text) return "";
    const words = text.split(/\s+/);
    if (words.length <= wordCount) return text;
    return words.slice(0, wordCount).join(" ") + "...";
  };

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  const { user } = useUser();
   const handleAddToCart = async () => {
    // Split the combined ID properly
    const actualProductId = id.split("-")[0]; // This is the real product ID
     // const variantId = displayVariant.id || displayVariant._id || "0"; // Use the selected variant's ID
     const variantId = id.split("-")[1];
    console.log("Adding to cart:", { actualProductId, variantId, id }); // Debug log

     
    try {
      if (user) {
        // Logged-in user cart logic
        const response = await axios.post(
          `${import.meta.env.VITE_BACKEND_LINK}/api/cart/add`,
          {
            productId: actualProductId,
            variantId,
            quantity,
            userId: user._id,
            price: displayVariant.salePrice
          }
        );
        alert("Product added to cart!");
        console.log("response", response);
      }
      else {
        // Guest cart logic (localStorage)
        let guestCart = [];

        try {
          const existingCart = localStorage.getItem("guestCart");
          guestCart = existingCart ? JSON.parse(existingCart) : [];
        } catch (parseError) {
          console.error(
            "Error parsing guest cart from localStorage:",
            parseError
          );
          guestCart = []; // Reset to empty array if parsing fails
        }

        // Check if item already exists
        const existingItemIndex = guestCart.findIndex(
          (item) =>
            item.productId === actualProductId && item.variantId === variantId
        );

        if (existingItemIndex > -1) {
          // If item exists, increment quantity
          guestCart[existingItemIndex].quantity += quantity;
          alert("Product quantity updated in cart!");
        } else {
          // If item doesn't exist, add new item
          guestCart.push({
            productId: actualProductId,
            variantId,
            quantity,
            price: displayVariant.salePrice
          });
          alert("Product added to cart!");
        }

        // Save back to localStorage
        try {
          localStorage.setItem("guestCart", JSON.stringify(guestCart));
          console.log("Updated guest cart:", guestCart);
        } catch (storageError) {
          console.error("Error saving to localStorage:", storageError);
          alert("Failed to save cart. Please try again.");
          return;
        }
      }
    } catch (error) {
      console.error("Error adding to cart:", error);

      // More specific error messages
      if (error.response) {
        // Server responded with error status
        const errorMessage =
          error.response.data?.error ||
          error.response.data?.message ||
          "Server error occurred";
        alert(`Failed to add to cart: ${errorMessage}`);
      } else if (error.request) {
        // Request made but no response received
        alert("Network error. Please check your connection and try again.");
      } else {
        // Something else happened
        alert(error.message || "Failed to add to cart");
      }
    }
  };

  const handlebuyitnow = () => {
    // Split the combined ID properly
    const actualProductId = id.split("-")[0]; // This is the real product ID
    const variantId = id.split("-")[1]; // Use the selected variant's ID
    console.log("vid", variantId);
    navigate("/checkout-page", {
      state: {
        products: [
          {
            ...product,
            _id: actualProductId,
            productId: actualProductId,
            variantId: variantId,
            quantity: quantity,
            price: displayVariant.salePrice,
            salePrice: displayVariant.salePrice,
            name: displayVariant.variantname || product.title,
            variantname: displayVariant.variantname || product.title,
            frontImage: displayVariant.frontImage || product.frontImage || product.image,
            backImage: displayVariant.backImage || product.backImage || product.image,
            image: product.image,
            variant: displayVariant,
            tax: displayVariant.tax || 0,
            discount: displayVariant.discount || 0,
            size: displayVariant.size || product.size,
            color: displayVariant.color || product.color
          },
        ],
      },
    });
  };

  if (isLoading) {
    return <div className="loading-spinner">Loading product details...</div>;
  }

  return (
    <div className="product-page">
      <div className="product-container">
        <div className="info-section">
          <h1 className="product-title" aria-label="Product title">
            <p className="product-name">{selectedVariant?.variantname}</p>
            {product?.title}
          </h1>
          <div className="rating-container" aria-label="Product rating">
            <span className="review-count">20 Reviews</span>
          </div>

          {/* <p aria-label="Product size">
            <strong>Size:</strong>{" "}
            <span className="product-size">{product.size}</span>
          </p> */}
          {/* Show all variants as clickable elements */}
          <div className="specs-container">
            {product?.allVariants?.map((variant, index) => (
              <p
                className={`specs-p ${selectedVariant?.id === variant.id ? 'selected' : ''}`}
                aria-label={`Product variant: ${variant?.variantname}`}
                onClick={() => handleVariantChange(variant)}
                key={variant.id || index}
              >
                {variant?.variantname}
              </p>
            ))}
          </div>
          <div className="price-container">
            <p className="price-label">M.R.P :</p>
            <div className="price-mrp-box">
              <p className="price-value">
                ₹
                {(
                  displayVariant?.salePrice +
                  (displayVariant?.salePrice * displayVariant?.tax) / 100 -
                  ((displayVariant?.salePrice +
                    (displayVariant?.salePrice * displayVariant?.tax) / 100) *
                    displayVariant?.discount) /
                  100).toFixed(2)}
              </p>
              <p className="price-note">Inclusive of all taxes</p>
            </div>
            <p className="price-original">
              ₹
              {(displayVariant?.salePrice +
                (displayVariant?.salePrice * displayVariant?.tax) / 100) } 
            </p>
          </div>
          <div className="quantity-container" aria-label="Quantity selector">
            <p className="quantity-label">Net Quantity:</p>
            <div className="quantity-selector">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                aria-label="Decrease quantity"
              >
                -
              </button>
              <span aria-live="polite">{quantity}</span>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>
          </div>
          <div className="action-buttons">
            <button className="wishlist-button" aria-label="Add to wishlist">
              Add to wishlist
            </button>
            <button onClick={handleAddToCart} className="cart-button" aria-label="Add to cart">
              Add to cart
            </button>
          </div>
          <div className="divider-line"></div>
          <button
            className="buy-now-button"
            onClick={handlebuyitnow}
            aria-label="Buy now"
          >
            Buy it now
          </button>
          <div className="description-container">
            <h2 className="section-title">Description</h2>
            <p className="description-text">
              {showFullDescription
                ? product?.description
                : truncateDescription(product?.description, 50)}
            </p>
            {product?.description &&
              product?.description?.split(/\s+/)?.length > 50 && (
                <a href="#product-description">
                  <button
                    className="description-text-knowmore-btn"
                    // onClick={toggleDescription}
                  >
                    Know More
                  </button>
                </a>
              )}
          </div>
          <div className="Disclaimer-container">
            <div className="Disclaimer-header" onClick={toggleDisclaimer}>
              <h2 className="Disclaimer-title">Disclaimer</h2>
              <span
                className={`Disclaimer-add-btn ${isExpanded ? "expanded" : ""}`}
              >
                {isExpanded ? "−" : "+"}
              </span>
            </div>
            {isExpanded && (
              <div className="Disclaimer-content">{product.description}</div>
            )}
          </div>
        </div>
        {/* Carousel Gallery Section */}
        <div className="gallery-section">
          <div className="vertical">
            {slides.map((slide, i) => {
              const distance =
                (i - carouselIndex + slides.length) % slides.length;
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
                  opacity = 1;
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
                  key={`${slide.image}-${i}`}
                  className="carousel-item-product"
                  style={{
                    transform: `scale(${scale}) translateY(${translateY}px)`,
                    opacity: opacity,
                    zIndex: zIndex,
                  }}
                  transition={{ type: "spring", stiffness: 100, damping: 15 }}
                  aria-hidden={distance !== 0}
                  aria-label={`Product image ${i + 1} of ${slides.length}`}
                >
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className="carousel-image-product"
                    loading="lazy"
                    onLoad={() => handleImageLoad(i)}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "https://via.placeholder.com/500";
                    }}
                  />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
