import React, { useState, useEffect, useMemo } from "react";
import "./Allproduct.css";
import ProductCard from "../../../components/Productcart/ProductCart";
import { FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import SortDropdown from "../Filter/Sort";
import PopupFilter from "../Filter/SmallFilter";

const ProductListingPage = ({ products, priceRange =[0, 1000] }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOption, setSortOption] = useState("default");
  const [viewMode, setViewMode] = useState('grid-3');
  const productsPerPage = 12;
  const navigate = useNavigate();

  // Filter by price
  const filteredProducts = useMemo(() => {
    return products.filter(
      (variant) =>
        variant.data.salePrice >= priceRange[0] &&
        variant.data.salePrice <= priceRange[1]
    );
  }, [products, priceRange]);

  // Group products by baseId (for display)
  const groupedProducts = useMemo(() => {
    const productMap = new Map();
    filteredProducts.forEach((variant) => {
      const baseId = variant.id.split("-")[0];
      if (!productMap.has(baseId)) {
        productMap.set(baseId, variant); // Only keep the first variant
      }
    });
    return Array.from(productMap.values());
  }, [filteredProducts]);

  // Sorting
  const sortedProducts = useMemo(() => {
    const toSort = [...groupedProducts];
    switch (sortOption) {
      case "price-low-high":
        return toSort.sort((a, b) => a.data.salePrice - b.data.salePrice);
      case "price-high-low":
        return toSort.sort((a, b) => b.data.salePrice - a.data.salePrice);
      default:
        return toSort;
    }
  }, [groupedProducts, sortOption]);

  // Create a map of product base IDs to all their variants
  const productVariantsMap = useMemo(() => {
    const map = {};
    products.forEach(variant => {
      const baseId = variant.id.split('-')[0];
      if (!map[baseId]) {
        map[baseId] = [];
      }
      map[baseId].push({
        variantname: variant.data.variantname,
        id: variant.id,
        salePrice: variant.data.salePrice,
        frontImage: variant.data.frontImage,
        backImage: variant.data.backImage,
        variantsimages: variant.data.variantsimages,
        discount: variant.data.discount,
        stock: variant.data.stock,
        size: variant.data.size,
        tax:variant.data.tax
      });
    });
    return map;
  }, [products]);

  const handleClick = (variant) => {
    const baseId = variant.id.split('-')[0];
    navigate(`/productdetails/${variant.id}`, {
      state: {
        ...variant.data,
        allVariants: productVariantsMap[baseId] || []
      }
    });
  };

  // Pagination logic
  useEffect(() => {
    setCurrentPage(1); // Reset to first page when sorting changes
  }, [sortOption, priceRange]);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = sortedProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="product-listing-page">
      {/* Header Section */}
      <header className="header">
        <div className="breadcrumb">Home / Zenn Aura Store</div>
        <div className="sorting-options">
          <p>
            Showing {indexOfFirstProduct + 1}–{Math.min(indexOfLastProduct, sortedProducts.length)} of {sortedProducts.length} results
          </p>
          <div className="sorting-option-right">
            <div className="custom-select-wrapper">
              <select
                className="custom-select"
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
              >
                <option value="default">Default Sorting</option>
                <option value="price-low-high">Price: Low to High</option>
                <option value="price-high-low">Price: High to Low</option>
              </select>
            </div>
            <div className="view-options">
              <button
                className={`ViewList-option ${viewMode === 'grid-3' ? 'active' : ''}`}
                onClick={() => setViewMode('grid-3')}
              >
                <span className="ViewList"></span>
                <span className="ViewList"></span>
                <span className="ViewList"></span>
                <span className="ViewList"></span>
                <span className="ViewList"></span>
                <span className="ViewList"></span>
                <span className="ViewList"></span>
                <span className="ViewList"></span>
                <span className="ViewList"></span>
              </button>
              <button
                className={`ViewGrid-option ${viewMode === 'grid-2' ? 'active' : ''}`}
                onClick={() => setViewMode('grid-2')}
              >
                <span></span>
                <span></span>
              </button>
            </div>
          </div>
        </div>
      </header>
      {/* Product Grid */}
      <div className={`product-grid ${viewMode}`}>
        {currentProducts.map((variant) => (
          <ProductCard
            key={variant.id}
            id={variant.id}
            name={variant.data.variantname}
            title={variant.data.title}
            frontimage={variant.data.frontImage}
            backImage={variant.data.backImage}
            price={(
                  variant.data.salePrice +
                  (variant.data.salePrice * variant.data.tax) / 100 -
                  ((variant.data.salePrice +
                    (variant.data.salePrice * variant.data.tax) / 100) *
                    variant.data.discount) /
                    100
                ).toFixed(2) }
            originalPrice={(variant.data.salePrice + (variant.data.salePrice * variant.data.tax) / 100).toFixed(2)}
            rating={variant.data.rating}
            isFeatured={variant.data.featureProduct}
            isBestSeller={variant.data.bestSeller}
            onBuyNowClick={() => handleClick(variant)}
          />
        ))}
      </div>
      {/* Pagination */}
      {sortedProducts.length > 0 && (
        <footer className="pagination">
          {[...Array(Math.ceil(sortedProducts.length / productsPerPage))].map((_, index) => (
            <span
              key={index + 1}
              className={`pagination-box ${currentPage === index + 1 ? "active" : ""}`}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </span>
          ))}
          <span
            className="pagination-box pagination-next"
            onClick={() => {
              if (currentPage < Math.ceil(sortedProducts.length / productsPerPage)) {
                handlePageChange(currentPage + 1);
              }
            }}
          >
            <FaArrowRight />
          </span>
        </footer>
      )}
      <div className="flex justify-center items-center gap-4 lg:hidden !mb-2">
        <SortDropdown sortOption={sortOption} setSortOption={setSortOption} />
        <PopupFilter />
      </div>
    </div>
  )
};

export default ProductListingPage;