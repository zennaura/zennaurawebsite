import React, { useState, useEffect } from "react";
import './AllsoLike.css'
import ProductCart from "../../../components/Productcart/ProductCart";
import { useNavigate, useLocation } from "react-router-dom";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const AllSoLike = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [similarProducts, setSimilarProducts] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [autoSlide, setAutoSlide] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  // Get current product's tags from location state
  const currentProductTags = location.state?.tags || [];

  // Fetch all products
  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_LINK}/api/products`);
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
        );

        setAllProducts(flattened);
      } catch (err) {
        console.error('Error fetching products:', err);
      }
    };

    fetchAllProducts();
  }, []);

  // Filter similar products based on tags
  useEffect(() => {
    if (allProducts.length > 0 && currentProductTags.length > 0) {
      const similar = allProducts.filter(product => {
        // Exclude the current product
        if (product.id === location.state?.id) return false;
        
        // Check for matching tags
        return product.data.tags.some(tag => 
          currentProductTags.includes(tag)
        );
      });
      
      setSimilarProducts(similar);
    }
  }, [allProducts, currentProductTags, location.state?.id]);

  // Auto-slide effect
  useEffect(() => {
    if (!autoSlide || similarProducts.length <= 4) return;

    const interval = setInterval(() => {
      setCurrentSlide(prev => 
        prev + 4 >= similarProducts.length ? 0 : prev + 4
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [autoSlide, similarProducts.length]);

  const handleClick = (product) => {
    navigate(`/productdetails/${product.id}`, {
      state: product.data,
    });
  };

  // Navigation functions
  const nextSlide = () => {
    setCurrentSlide(prev => 
      prev + 4 >= similarProducts.length ? 0 : prev + 4
    );
    setAutoSlide(false);
    setTimeout(() => setAutoSlide(true), 10000);
  };

  const prevSlide = () => {
    setCurrentSlide(prev => 
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
            <div key={product.id} className={`AllSoLike-card ${(index === 1 || index === 2) ? "featured-card-center" : ""}`}>
              <ProductCart
                key={product.id}
                id={product.id}
                name={product.data.name}
                title={product.data.title}
                image={product.data.frontImage}
                price={product.data.salePrice}
                originalPrice={product.data.costPrice}
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
          {Array.from({ length: totalSlides }).map((_, index) => (
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