import React, { useState, useEffect } from "react";
import "./AllsoLike.css";
import ProductCart from "../../../components/Productcart/ProductCart";
import { useNavigate, useLocation } from "react-router-dom";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const AllSoLike = ({ intentTags = [], productId }) => {
  const [allProducts, setAllProducts] = useState([]);
  const [similarProducts, setSimilarProducts] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [autoSlide, setAutoSlide] = useState(true);
  const navigate = useNavigate();

  // Fetch all products
  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_BACKEND_LINK}/api/products`
        );
        const productsData = await res.json();
        console.log("products also like:", productsData);
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
              Intenttags: product.Intenttags,
              stoneUsedImage: product.stoneUsedImage,
              rating: product.rating,
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
        );
        console.log("products also like flattened:", flattened);
        setAllProducts(flattened);
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };

    fetchAllProducts();
  }, []);

  // Filter similar products based on intentTags (or fallback to tags)
  useEffect(() => {
    if (allProducts.length > 0) {
      let similar = [];
      if (intentTags && intentTags.length > 0) {
        similar = allProducts.filter((product) => {
          if (product.data._id === productId) return false;
          return (
            product.data.Intenttags &&
            product.data.Intenttags.some((tag) => intentTags.includes(tag))
          );
        });
      }
      let currentTags = [];
      if (similar.length === 0 && intentTags.length === 0) {
        const currentProduct = allProducts.find(
          (p) => p.data._id === productId
        );
        currentTags = currentProduct?.data?.tags || [];
        if (currentTags.length > 0) {
          similar = allProducts.filter((product) => {
            if (product.data._id === productId) return false;
            return (
              product.data.tags &&
              product.data.tags.some((tag) => currentTags.includes(tag))
            );
          });
        }
      }
      // Only keep the first variant per product (by _id and variant index 0)
      const seen = new Set();
      const uniqueByProduct = allProducts.filter((product) => {
        if (product.data._id === productId) return false;
        if (seen.has(product.data._id)) return false;
        seen.add(product.data._id);
        // Only keep variant index 0
        return (
          product.id.endsWith("-0") &&
          ((intentTags.length > 0 &&
            product.data.Intenttags &&
            product.data.Intenttags.some((tag) => intentTags.includes(tag))) ||
            (intentTags.length === 0 &&
              product.data.tags &&
              currentTags &&
              product.data.tags.some((tag) =>
                currentTags.includes(tag)
              )))
        );
      });
      setSimilarProducts(uniqueByProduct);
    }
  }, [allProducts, intentTags, productId]);

  // Auto-slide effect
  useEffect(() => {
    if (!autoSlide || similarProducts.length <= 4) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) =>
        prev + 4 >= similarProducts.length ? 0 : prev + 4
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [autoSlide, similarProducts.length]);

  const handleClick = (product) => {
    console.log("Navigating to product:", product.data._id, product);
    navigate(`/productdetails/${product.id}`, {
      state: {
        ...product.data,
      },
    });
  };

  // Navigation functions
  const nextSlide = () => {
    setCurrentSlide((prev) =>
      prev + 4 >= similarProducts.length ? 0 : prev + 4
    );
    setAutoSlide(false);
    setTimeout(() => setAutoSlide(true), 10000);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) =>
      prev - 4 < 0 ? Math.max(0, similarProducts.length - 4) : prev - 4
    );
    setAutoSlide(false);
    setTimeout(() => setAutoSlide(true), 10000);
  };

  const goToSlide = (slideIndex) => {
    setCurrentSlide(slideIndex * 4);
    setAutoSlide(false);
    setTimeout(() => setAutoSlide(true), 10000);
  };

  // Calculate total slides and visible products
  const totalSlides = Math.ceil(similarProducts.length / 4);
  const visibleProducts = similarProducts.slice(currentSlide, currentSlide + 4);

  return (
    <div className="AllSoLike-container">
      <h1 className="AllSoLike-heading">You May Also Like</h1>

      <div className="featured-slider">
        <div className="AllSoLike-cards">
          {visibleProducts.length > 0 ? (
            visibleProducts.map((product, index) => (
              <div
                key={product.id}
                className={`AllSoLike-card ${
                  index === 1 || index === 2 ? "featured-card-center" : ""
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
                    (product.data.salePrice * product.data.tax) / 100
                  ).toFixed(2)}
                  originalPrice={product.data.costPrice.toFixed(2)}
                  rating={product.data.rating}
                  isFeatured={product.data.featureProduct}
                  isBest={product.data.bestSeller}
                  onBuyNowClick={() => handleClick(product)}
                />
              </div>
            ))
          ) : (
            <p className="no-products">No similar products found</p>
          )}
        </div>
      </div>

      {/* Pagination Dots */}
      {totalSlides > 1 && (
        <div className="pagination-dots">
          {Array.from({ length: totalSlides }).slice(0,5).map((_, index) => (
            <button
              key={index}
              className={`dot ${currentSlide / 4 === index ? "active" : ""}`}
              onClick={() => goToSlide(index)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default AllSoLike;
