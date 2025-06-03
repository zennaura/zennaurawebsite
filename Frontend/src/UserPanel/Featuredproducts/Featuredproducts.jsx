import React, { useState, useEffect } from "react";
import "./ProductCard.css";
import ProductCart from "../../components/Productcart/ProductCart";
import { useNavigate } from "react-router-dom";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const FeaturedProducts = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [autoSlide, setAutoSlide] = useState(true);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Fetch products
  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `${import.meta.env.VITE_BACKEND_LINK}/api/products`
        );
        if (!res.ok) throw new Error("Failed to fetch products");

        const productsData = await res.json();
        console.log(" products:", productsData);

        // const flattened = productsData.flatMap((product) =>
        //   product.variants.map((variant, index) => ({
        //     id: `${product._id}-${index}`,
        //     data: {
        //       _id: product._id,
        //       title: product.title,
        //       description: product.description,
        //       sku: product.sku,
        //       tags: product.tags,
        //       stoneUsedImage: product.stoneUsedImage,
        //       rating: product.rating,
        //       // frontImage: product.frontImage,
        //       otherimages: product.otherimages,
        //       healingImage: product.healingImage,
        //       benefits: product.benefits,
        //       whyChoose: product.whyChoose,
        //       waysToClean: product.waysToClean,
        //       whoWear: product.whoWear,
        //       whereHowWear: product.whereHowWear,
        //       productDescriptions: product.productDescriptions,
        //       ...variant,
        //     },
        //   }))
        // ).filter(product => product.data.featureProduct);
        const flattened = productsData.flatMap((product) =>
          product.variants.map((variant, index) => ({
            id: `${product._id}-${index}`,
            productId: product._id,
            data: {
              _id: product._id,
              title: product.title,
              description: product.description,
              sku: product.sku,
              tags: product.tags,
              stoneUsedImage: product.stoneUsedImage,
              rating: product.rating,
              frontImage: variant.frontImage || product.frontImage, // ensure fallback
              backImage: variant.backImage || product.backImage,
              otherimages: product.otherimages,
              healingImage: product.healingImage,
              benefits: product.benefits,
              whyChoose: product.whyChoose,
              waysToClean: product.waysToClean,
              whoWear: product.whoWear,
              whereHowWear: product.whereHowWear,
              productDescriptions: product.productDescriptions,
              featureProduct: product.featureProduct,
              ...variant, // place this after fixed fields to prevent overwriting
            },
          }))
        );

        setAllProducts(flattened);

        const featuredOnly = flattened.filter(
          (product) => product.data.featureProduct
        );
        setFeaturedProducts(featuredOnly);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching featured products:", err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchFeaturedProducts();
  }, []);

  const cardsPerSlide = windowWidth <= 768 ? 1 : windowWidth <= 1024 ? 2 : 4;

  // Auto-slide effect
  useEffect(() => {
    if (!autoSlide || featuredProducts.length <= cardsPerSlide) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) =>
        prev + cardsPerSlide >= featuredProducts.length
          ? 0
          : prev + cardsPerSlide
      );
    }, 5000); // Changed to 5 seconds
    return () => clearInterval(interval);
  }, [autoSlide, featuredProducts.length, cardsPerSlide]);

  const handleClick = (product) => {
    const productId = product?.productId;
    // Find all variants of this product
    const productVariants = allProducts
      .filter((p) => p.productId === productId)
      .map((v) => ({
        variantname: v.data.variantname,
        id: v.id,
        frontImage: v.data.frontImage,
        backImage: v.data.backImage,
        salePrice: v.data.salePrice,
        originalPrice: v.data.originalPrice,
        discount: v.data.discount,
        tax: v.data.tax,
        stock: v.data.stock,
      }));

    console.log("Clicked product:", product);
    console.log("All variants:", productVariants);

    navigate(`/productdetails/${product.id}`, {
      state: {
        ...product.data,
        allVariants: productVariants,
        selectedVariantId: product.id
      },
    });
  };

  // Navigation functions
  const nextSlide = () => {
    setCurrentSlide((prev) =>
      prev + cardsPerSlide >= featuredProducts.length ? 0 : prev + cardsPerSlide
    );
    setAutoSlide(false);
    setTimeout(() => setAutoSlide(true), 10000);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) =>
      prev - cardsPerSlide < 0
        ? Math.max(0, featuredProducts.length - cardsPerSlide)
        : prev - cardsPerSlide
    );
    setAutoSlide(false);
    setTimeout(() => setAutoSlide(true), 10000);
  };

  const goToSlide = (slideIndex) => {
    setCurrentSlide(slideIndex * cardsPerSlide);
    setAutoSlide(false);
    setTimeout(() => setAutoSlide(true), 10000);
  };

  const totalSlides = Math.ceil(featuredProducts.length / cardsPerSlide);
  const visibleProducts = featuredProducts.slice(
    currentSlide,
    currentSlide + cardsPerSlide
  );

  if (loading)
    return <div className="loading-message">Loading featured products...</div>;
  if (error) return <div className="error-message">Error: {error}</div>;
  if (featuredProducts.length === 0)
    return (
      <div className="no-products-message">No featured products available</div>
    );

  return (
    <div className="Featuredproducts-container">
      <h1 className="Featuredproducts-heading">Featured Products</h1>

      <div className="featured-slider">
        {featuredProducts.length > cardsPerSlide && (
          <button className="slider-arrow left" onClick={prevSlide}>
            <FaChevronLeft />
          </button>
        )}

        <div className="Featuredproducts-cards">
          {visibleProducts.map((product, index) => (
            <div
              key={product.id}
              className={`Featuredproducts-card ${
                windowWidth <= 768
                  ? index === 0
                    ? "mobile-full-card"
                    : "mobile-half-card"
                  : ""
              }`}
            >
              <ProductCart
                key={product.id}
                id={product.id}
                name={product.data.variantname}
                title={product.data.title}
                frontimage={product.data.frontImage}
                backImage={product.data.backImage}
                price={(
                  product.data.salePrice +
                  (product.data.salePrice * product.data.tax) / 100 -
                  ((product.data.salePrice +
                    (product.data.salePrice * product.data.tax) / 100) *
                    product.data.discount) /
                    100
                ).toFixed(2)}
                originalPrice={(
                  product.data.salePrice +
                  (product.data.salePrice * product.data.tax) / 100
                ).toFixed(2)}
                rating={product.data.rating}
                isFeatured={product.data.featureProduct}
                onBuyNowClick={() => handleClick(product)}
                product={product}
                discount = {product.discount}
              />
            </div>
          ))}
        </div>

        {featuredProducts.length > cardsPerSlide && (
          <button className="slider-arrow right" onClick={nextSlide}>
            <FaChevronRight />
          </button>
        )}
      </div>

      {totalSlides > 1 && (
        <div className="pagination-dots">
          {Array.from({ length: totalSlides }).map((_, index) => (
            <button
              key={index}
              className={`dot ${
                Math.floor(currentSlide / cardsPerSlide) === index
                  ? "active"
                  : ""
              }`}
              onClick={() => goToSlide(index)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default FeaturedProducts;