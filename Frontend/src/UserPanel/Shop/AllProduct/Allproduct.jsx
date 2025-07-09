import React, { useState, useEffect, useMemo } from "react";
import "./Allproduct.css";
import ProductCard from "../../../components/Productcart/ProductCart";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import SortDropdown from "../Filter/Sort";
import PopupFilter from "../Filter/SmallFilter";

const ProductListingPage = ({ products, priceRange = [0, 1000], productCategories, chakra, intents, onFilterChange, autoCheck }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOption, setSortOption] = useState("default");
  const [viewMode, setViewMode] = useState("grid-3");
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
    products.forEach((variant) => {
      const baseId = variant.id.split("-")[0];
      if (!map[baseId]) {
        map[baseId] = [];
      }
      map[baseId].push({
        variantname: variant.data.variantname,
        id: variant.id,
        salePrice: variant.data.salePrice,
        costPrice:variant.data.costPrice,
        frontImage: variant.data.frontImage,
        backImage: variant.data.backImage,
        variantsimages: variant.data.variantsimages,
        discount: variant.data.discount,
        stock: variant.data.stock,
        size: variant.data.size,
        tax: variant.data.tax,
      });
    });
    return map;
  }, [products]);

  const handleClick = (variant) => {
    const baseId = variant.id.split("-")[0];
    navigate(`/productdetails/${variant.id}`, {
      state: {
        ...variant.data,
        allVariants: productVariantsMap[baseId] || [],
      },
    });
  };

  // Pagination logic
  useEffect(() => {
    setCurrentPage(1); // Reset to first page when sorting changes
  }, [sortOption, priceRange]);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = sortedProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

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
            Showing {indexOfFirstProduct + 1}–
            {Math.min(indexOfLastProduct, sortedProducts.length)} of{" "}
            {sortedProducts.length} results
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
                className={`ViewList-option ${
                  viewMode === "grid-3" ? "active" : ""
                }`}
                onClick={() => setViewMode("grid-3")}
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
                className={`ViewGrid-option ${
                  viewMode === "grid-2" ? "active" : ""
                }`}
                onClick={() => setViewMode("grid-2")}
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
              (variant.data.salePrice * variant.data.tax) / 100 
            ).toFixed(2)}
            originalPrice={(
              variant.data.costPrice
            ).toFixed(2)}
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
          <span
            className="pagination-box pagination-prev"
            onClick={() => {
              if (currentPage > 1) {
                handlePageChange(currentPage - 1);
              }
            }}
          >
            <FaArrowLeft />
          </span>
          {(() => {
            const totalPages = Math.ceil(sortedProducts.length / productsPerPage);
            const pageNumbers = [];

            // Always show first page
            pageNumbers.push(
              <span
                key={1}
                className={`pagination-box ${currentPage === 1 ? "active" : ""}`}
                onClick={() => handlePageChange(1)}
              >
                1
              </span>
            );

            // Determine which pages to show in the middle
            let middlePages = [];
            if (totalPages <= 5) {
              // Show all pages if 5 or fewer
              for (let i = 2; i <= totalPages; i++) {
                pageNumbers.push(
                  <span
                    key={i}
                    className={`pagination-box ${currentPage === i ? "active" : ""}`}
                    onClick={() => handlePageChange(i)}
                  >
                    {i}
                  </span>
                );
              }
              return pageNumbers;
            }

            // For more than 5 pages
            // Show ellipsis if currentPage > 3
            if (currentPage > 3) {
              pageNumbers.push(<span key="start-ellipsis">...</span>);
            }

            // Show previous, current, next (if in range and not first/last)
            for (let i = currentPage - 1; i <= currentPage + 1; i++) {
              if (i > 1 && i < totalPages) {
                middlePages.push(i);
              }
            }
            middlePages.forEach((i) => {
              pageNumbers.push(
                <span
                  key={i}
                  className={`pagination-box ${currentPage === i ? "active" : ""}`}
                  onClick={() => handlePageChange(i)}
                >
                  {i}
                </span>
              );
            });

            // Show ellipsis if currentPage < totalPages - 2
            if (currentPage < totalPages - 2) {
              pageNumbers.push(<span key="end-ellipsis">...</span>);
            }

            // Always show last page
            pageNumbers.push(
              <span
                key={totalPages}
                className={`pagination-box ${currentPage === totalPages ? "active" : ""}`}
                onClick={() => handlePageChange(totalPages)}
              >
                {totalPages}
              </span>
            );

            return pageNumbers;
          })()}
          <span
            className="pagination-box pagination-next"
            onClick={() => {
              if (
                currentPage < Math.ceil(sortedProducts.length / productsPerPage)
              ) {
                handlePageChange(currentPage + 1);
              }
            }}
          >
            <FaArrowRight />
          </span>
        </footer>
      )}
      <div className="flex justify-center items-center gap-4 fixed bottom-0 lg:hidden !p-3 z-10" style={{width:"100vw",backgroundColor:"#f0f0f0",marginLeft:"-3.5rem"}}>
        <SortDropdown sortOption={sortOption} setSortOption={setSortOption}  />
        <PopupFilter
          productCategories={productCategories}
          chakra={chakra}
          intents={intents}
          onFilterChange={onFilterChange}
          autoCheck={autoCheck}
        />
      </div>
    </div>
  );
};

export default ProductListingPage;
