import React from 'react'
import { useState, useEffect } from "react";
import { FiSearch } from 'react-icons/fi';
import axios from 'axios';
import { useNavigate, Link } from "react-router-dom";

const Search = ({closeSide}) => {

    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const handleSearchOne = async (e) => {
        e.preventDefault();
        if (!searchQuery.trim()) return;

        setIsLoading(true);
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_BACKEND_LINK}/api/search?query=${encodeURIComponent(searchQuery)}`
            );

            const flattenedResults = response.data.flatMap((product) =>
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
            if (!searchContainer && !searchContainer.contains(event.target)) {
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
                            state={{
                                ...result.completeProduct,
                                selectedVariant: result.selectedVariant,
                                variantIndex: result.variantIndex
                            }}
                            className="search-result-item"
                            onClick={() => {
                                closeSide()
                                setSearchQuery("");
                                setSearchResults([]);
                            }}
                        >
                            <img src={result.image} alt={result.name} className="search-result-image" />
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
