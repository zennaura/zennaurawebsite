import React from 'react'
import { useState, useEffect } from "react";
import { FiSearch } from 'react-icons/fi';
import axios from 'axios';
import { useNavigate, Link } from "react-router-dom";

const Search = () => {

    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);

    const handleSearchOne = async (e) => {
        e.preventDefault();
        if (!searchQuery.trim()) return;

        try {
            const response = await axios.get(
                `${import.meta.env.VITE_BACKEND_LINK}/api/search?query=${encodeURIComponent(searchQuery)}`
            );

            const flattenedResults = response.data.flatMap((product) =>
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

            setSearchResults(flattenedResults);
        } catch (error) {
            console.error("Search error:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            const searchContainer = document.querySelector('.search-container');
            if (searchContainer && !searchContainer.contains(event.target)) {
                setSearchQuery("");
                setSearchResults([]);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className='searchContains'>
            <form onSubmit={handleSearchOne} className="search-barm search-bar-sub">
                <FiSearch className="search-iconm" />
                <input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    autoFocus
                />
            </form>
            {searchResults.length > 0 && (
                <div className="search-results-dropdown">
                    {searchResults.slice(0, 5).map((result) => (
                        <Link
                            key={`${result.productId}-${result.variantId}`}
                            to={`/productdetails/${result.id}`}
                            state={result}
                            className="search-result-item"
                            onClick={() => {
                                setSearchQuery("");
                                setSearchResults([]);
                            }}
                        >
                            <img src="https://images.pexels.com/photos/3018845/pexels-photo-3018845.jpeg?cs=srgb&dl=cosmetic-products-3018845.jpg&fm=jpg" alt={result.name} className="search-result-image" />
                            <div className="search-result-info">
                                <h4>{result.name}</h4>
                                <p>{result.title}</p>
                                <div className="search-result-price">
                                    <span>₹{result.price}</span>
                                    {result.originalPrice && (
                                        <span className="original-price">₹{result.originalPrice}</span>
                                    )}
                                </div>
                            </div>
                        </Link>
                    ))}
                    {searchResults.length > 5 && (
                        <Link
                            to={`/search?query=${encodeURIComponent(searchQuery)}`}
                            className="view-all-results"
                            onClick={() => {
                                setSearchQuery("");
                                setSearchResults([]);
                            }}
                        >
                            View all {searchResults.length} results
                        </Link>
                    )}
                </div>
            )}
        </div>
    )
}

export default Search
