// SearchResults.jsx
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import ProductCart from '../Productcart/ProductCart';

const SearchResults = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get('query');
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_LINK}/api/products/search?query=${encodeURIComponent(query)}`
        );
        
        const flattened = response.data.flatMap((product) =>
          product.variants.map((variant, index) => ({
            id: `${product._id}-${index}`,
            productId: product._id,
            name: product.name,
            title: product.title,
            description: product.description,
            image: product.frontImage,
            price: variant.salePrice,
            originalPrice: variant.costPrice,
            variantName: variant.name,
            variantId: variant._id,
            sku: variant.sku,
            category: product.category,
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
              image={product.image}
              price={product.price}
              originalPrice={product.originalPrice}
              onBuyNowClick={() => navigate(`/productdetails/${product.id}`, { state: product })}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchResults;