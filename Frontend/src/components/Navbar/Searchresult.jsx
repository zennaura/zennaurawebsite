// SearchResults.jsx
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import ProductCart from '../Productcart/ProductCart';

const SearchResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const query = new URLSearchParams(location.search).get('query');
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_LINK}/api/search?query=${encodeURIComponent(query)}`
        );
        
        const flattened = response.data.flatMap((product) =>
          product.variants.map((variant, index) => ({
            id: `${product._id}-${index}`,
            productId: product._id,
            name: variant.variantname,
            title: product.title,
            description: product.description,
            image: variant.frontImage || variant.backImage,
            price: (
              variant.salePrice +
              (variant.salePrice * variant.tax) / 100 -
              ((variant.salePrice + (variant.salePrice * variant.tax) / 100) *
                variant.discount) /
                100
            ).toFixed(2),
            originalPrice: (
              variant.salePrice +
              (variant.salePrice * variant.tax) / 100
            ).toFixed(2),
            variantName: variant.variantname,
            variantId: variant._id,
            sku: product.sku,
            category: product.category,
            // Store the complete product data for navigation
            completeProduct: product,
            selectedVariant: variant,
            variantIndex: index
          }))
        );
        
        setResults(flattened);
      } catch (error) {
        console.error('Error fetching search results:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (query) {
      fetchResults();
    }
  }, [query]);

  const handleProductClick = (product) => {
    navigate(`/productdetails/${product.id}`, {
      state: {
        ...product.completeProduct,
        selectedVariant: product.selectedVariant,
        variantIndex: product.variantIndex
      }
    });
  };

  if (isLoading) {
    return <div className="loading-spinner">Loading...</div>;
  }

  return (
    <div className="search-results-page">
      <h2>Search Results for "{query}"</h2>
      {results.length === 0 ? (
        <p>No products found matching your search.</p>
      ) : (
        <div className="results-grid">
          {results.map((product) => (
            <ProductCart
              key={product.id}
              id={product.id}
              name={product.name}
              title={product.title}
              frontimage={product.image}
              backImage={product.image}
              price={product.price}
              originalPrice={product.originalPrice}
              onBuyNowClick={() => handleProductClick(product)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchResults;