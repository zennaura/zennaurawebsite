import React, { useState, useEffect, useRef } from "react";
import "./BestSeller.css";
import ProductCart from "../../../components/Productcart/ProductCart";
import { useNavigate } from "react-router-dom";

const BestSeller = ({ category }) => {
  const [bestSellerProducts, setBestSellerProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [currentPage, setCurrentPage] = useState(0);
  const sliderRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const fetchBestSellerProducts = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_LINK}/api/products`);
        const productsData = await res.json();
        const flattened = productsData.flatMap((product) =>
          product.variants.map((variant, index) => ({
            id: `${product._id}-${index}`,
            productId: product._id,
            data: {
              ...product,
              ...variant,
            },
          }))
        )
        setAllProducts(flattened);
        
        // Filter by both bestSeller and category if provided
        let bestSellerOnly = flattened.filter((product) => product.data.bestSeller);
        
        if (category) {
          bestSellerOnly = bestSellerOnly.filter((product) => 
            product.data.parentCategory === category
          );
        }
        
        setBestSellerProducts(bestSellerOnly);
      } catch (err) {
        console.error("Error fetching best seller products:", err);
      }
    };
    fetchBestSellerProducts();
  }, [category]);

  const handleClick = (product) => {
    // Find all variants of this product
    const productId = product.productId;
    const productVariants = allProducts
      .filter(p =>  p.productId === productId)
      .map(v => ({
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
    
    navigate(`/productdetails/${product.id}`, {
      state: {
        ...product.data,
        allVariants: productVariants,
        selectedVariantId: product.id,
      },
    });
  };

  const cardsPerPage = windowWidth < 768 ? 1 : 3;
  const totalPages = Math.ceil(bestSellerProducts.length / cardsPerPage);

  const handleDotClick = (index) => {
    if (sliderRef.current) {
      const cardWidth = sliderRef.current.querySelector(".Featuredproducts-card")?.offsetWidth || 0;
      sliderRef.current.scrollTo({
        left: index * cardsPerPage * (cardWidth + 32), // 32 is the gap
        behavior: "smooth"
      });
    }
  };

  const handleScroll = () => {
    if (!sliderRef.current) return;
    const scrollLeft = sliderRef.current.scrollLeft;
    const cardWidth = sliderRef.current.querySelector(".Featuredproducts-card")?.offsetWidth || 0;
    const currentIndex = Math.round(scrollLeft / (cardWidth + 32) / cardsPerPage);
    setCurrentPage(currentIndex);
  };

  return (
    <div className="BestSeller-container">
      <h1 className="BestSeller-heading">Best Sellers</h1>

      <div className="BestSeller-slider" ref={sliderRef} onScroll={handleScroll}>
        <div className="BestSeller-cards">
          {bestSellerProducts.map((product, index) => (
            <div className={`Featuredproducts-card ${index == 1 || index == 2 ? 'featured-card-center' : ''}`} key={product.id}>
              <ProductCart
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
                originalPrice={(product.data.salePrice + (product.data.salePrice * product.data.tax) / 100).toFixed(2)}
                rating={product.data.rating}
                isBestSeller={product.data.bestSeller}
                onBuyNowClick={() => handleClick(product)}
              />
            </div>
          ))}
        </div>
      </div>

      {totalPages > 1 && (
        <div className="ShopByConcern-dots">
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              className={`ShopByConcern-dot ${currentPage === index ? "active" : ""}`}
              onClick={() => handleDotClick(index)}
              aria-label={`Go to page ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default BestSeller;
