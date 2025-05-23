import React, { useState, useEffect, useMemo, useCallback } from "react";
import { motion } from "framer-motion";
import "./ProductDetails.css";
import Carouselimg5 from "../../../assests/Carouselimg5.png";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";

const ProductDetails = ({ product }) => {
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  // useEffect(() => {
  //   if (onVariantChange) {
  //     onVariantChange(id);
  //   }
  // }, [id, onVariantChange]);
  // const { id } = useParams(); // this is the variant id
  // console.log(id);
  // const [product, setProduct] = useState(null);
  // const [variant, setVariant] = useState(null);

  // useEffect(() => {
  //   // Find the product that contains this variant
  //   const foundProduct = allProducts.find(p =>
  //     p.variants.some(v => v._id === id)
  //   );

  //   if (foundProduct) {
  //     setProduct(foundProduct);
  //     const foundVariant = foundProduct.variants.find(v => v._id === id);
  //     setVariant(foundVariant);
  //   }
  // }, [id]);

  // if (!product || !variant) return <div>Loading...</div>;

  // const { id } = useParams(); // variant id from URL
  //   const location = useLocation();
  //   const [product, setProduct] = useState(location.state || null);

  // useEffect(() => {
  //   // if (location.state) {
  //   //   setProduct(location.state); // update product if passed through navigation
  //   // } else {
  //     // fallback: fetch product by id if not in location.state
  //     fetch(`/api/products/${id}`)
  //       .then(res => res.json())
  //       .then(data => setProduct(data))
  //       .catch(err => console.error(err));
  //   // }
  // }, [id, location.state]); // run when id or location.state changes

  //   useEffect(() => {
  //   if (location.state?.selectedVariant && location.state?.product) {
  //     // Override product variant if passed from navigation
  //     const updatedProduct = {
  //       ...location.state.product,
  //       variantname: location.state.selectedVariant.variantname,
  //       size: location.state.selectedVariant.size,
  //       salePrice: location.state.selectedVariant.salePrice,
  //       costPrice: location.state.selectedVariant.costPrice,
  //       // Add other fields you expect to override
  //     };
  //     setProduct(updatedProduct);
  //   } else {
  //     // Fallback to API
  //     fetch(`/api/products/${id}`)
  //       .then(res => res.json())
  //       .then(data => setProduct(data))
  //       // .catch(err => console.error(err));
  //   }
  // }, [id, location.state]);
  //   if (!product) return <p>Loading...</p>;

  const toggleDisclaimer = () => {
    setIsExpanded(!isExpanded);
  };

  // Function to truncate description to 50 words
  const truncateDescription = (text, wordCount) => {
    if (!text) return "";
    const words = text.split(/\s+/);
    if (words.length <= wordCount) return text;
    return words.slice(0, wordCount).join(" ") + "...";
  };

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  // Memoize the product images to prevent unnecessary recalculations
  const slides = useMemo(() => {
    const images = [];

    const addImage = (src, title) => {
      if (src) {
        images.push({
          image: src,
          title: title,
          loading: true,
        });
      }
    };

    addImage(product?.frontImage, product?.name);

    product?.variantsimages?.forEach((variant, index) => {
      addImage(variant, `${product.name} - Variant ${index + 1}`);
    });

    product?.otherimages?.forEach((img, index) => {
      addImage(img, `${product.name} - Image ${index + 1}`);
    });

    addImage(
      product?.productDescriptions?.image,
      `${product.name} - Description`
    );

    product?.stoneUsedImage?.forEach((stone, index) => {
      if (stone.image) {
        addImage(stone.image, `${product.name} - Stone ${index + 1}`);
      }
    });

    if (images.length === 0) {
      addImage(Carouselimg5, "No image available");
    }

    return images;
  }, [product]);

  // Carousel navigation handlers
  const nextSlide = useCallback(() => {
    setCarouselIndex((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const prevSlide = useCallback(() => {
    setCarouselIndex((prev) => (prev - 1 + slides.length) % slides.length);
  }, [slides.length]);

  const goToSlide = useCallback((slideIndex) => {
    setCarouselIndex(slideIndex);
  }, []);

  // Handle window resize
  const handleResize = useCallback(() => {
    setIsMobile(window.innerWidth <= 768);
  }, []);

  // Auto-rotate carousel effect
  useEffect(() => {
    if (slides.length <= 1) return;

    const interval = setInterval(() => {
      nextSlide();
    }, 3000);

    return () => clearInterval(interval);
  }, [slides.length, nextSlide]);

  // Set up resize listener
  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [handleResize]);

  // Check if we need to reset carousel index when slides change
  useEffect(() => {
    if (carouselIndex >= slides.length) {
      setCarouselIndex(0);
    }
    setIsLoading(false);
  }, [slides, carouselIndex]);

  const handleImageLoad = (index) => {
    // Update loading state for the specific image
    // Could implement this with a more sophisticated state management
  };

  const handlebuyitnow = () => {
    navigate("/checkout-page", {
      state: {
        products: [
          {
            ...product,
            quantity: quantity,
          },
        ],
      },
    });
  };

  if (isLoading) {
    return <div className="loading-spinner">Loading product details...</div>;
  }
  // console.log(product.allVariants);

  return (
    <div className="product-page">
      <div className="product-container">
        {/* Product Info Section */}
        <div className="info-section">
          <h1 className="product-title" aria-label="Product title">
            <span className="product-name">{product.variantname}</span> –{" "}
            {product.title}
          </h1>

          <div className="rating-container" aria-label="Product rating">
            <span className="review-count">20 Reviews</span>
          </div>

          <p aria-label="Product size">
            <strong>Size:</strong>{" "}
            <span className="product-size">{product.size}</span>
          </p>
          {/* Here are the tags */}
          {/* <div className="specs-container">
            {product.tags?.map((tag, index) => (
              <p key={index} className="specs-p" aria-label={`Product tag: ${tag}`}>{tag}</p>
            ))}
              
          </div> */}
          {/* Here are other varient names */}
          <div className="specs-container">
            {product.allVariants?.map((variant, index) => (
              <p
                className="specs-p"
                aria-label={`Product variant: ${variant.variantname}`}
                onClick={() => {
                  navigate(`/productdetails/${variant.id}`, {
                    state: {
                      product: product, // full product
                      selectedVariant: variant, // newly selected variant
                    },
                  });
                }}
              >
                {variant.variantname}
              </p>
            ))}
          </div>

          <div className="price-container" aria-label="Product pricing">
            <p className="price-label">M.R.P.:</p>
            <div className="price-mrp-box">
              <p className="price-value">
                ₹
                {(
                  product.salePrice +
                  (product.salePrice * product.tax) / 100 -
                  ((product.salePrice +
                    (product.salePrice * product.tax) / 100) *
                    product.discount) /
                    100
                ).toFixed(2)}{" "}
              </p>
              <p className="price-note">Inclusive of all taxes</p>
            </div>
            <p className="price-original">
              ₹{(product.salePrice + (product.salePrice * product.tax) / 100).toFixed(2)}
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
              <span>❤️</span>Add to wishlist
            </button>
            <button className="cart-button" aria-label="Add to cart">
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
                ? product.description
                : truncateDescription(product.description, 50)}
            </p>
            {product.description &&
              product.description.split(/\s+/).length > 50 && (
                <button
                  className="description-text-knowmore-btn"
                  onClick={toggleDescription}
                >
                  {showFullDescription ? "Show less" : "Know more"}
                </button>
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

              // Calculate styles based on distance and device type
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
          {/* controll the slider  */}
          {/* {slides.length > 1 && (
            <div className="carousel-controls" aria-label="Carousel controls">
              <button
                className="carousel-prev"
                onClick={prevSlide}
                aria-label="Previous image"
              >
                &lt;
              </button>

              <div className="carousel-dots">
                {slides.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => goToSlide(i)}
                    className={`carousel-dot ${i === carouselIndex ? 'active' : ''}`}
                    aria-label={`Go to image ${i + 1}`}
                  />
                ))}
              </div>

              <button
                className="carousel-next"
                onClick={nextSlide}
                aria-label="Next image"
              >
                &gt;
              </button>
            </div>
          )} */}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
