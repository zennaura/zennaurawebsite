import React, { useState } from 'react';
import './Filter.css'

const Filter = () => {
  // State to manage filter values
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(100);
  const [productCategories, setProductCategories] = useState([]);
  const [concerns, setConcerns] = useState([]);
  const [intents, setIntents] = useState([]);
  const [rating, setRating] = useState('');

  // Product categories, concerns, and intents data
  const categories = [
    'Conditioner',
    'Face Cream',
    'Face Gel',
    'Face Mask',
    'Face Scrub',
    'Face Serum',
    'Face Wash',
    'Hair Oil',
    'Lip Balm',
    'Lip Scrub',
    'Shampoo',
  ];

  const handleCheckboxChange = (e, type) => {
    const value = e.target.value;
    if (type === 'productCategories') {
      setProductCategories((prev) =>
        prev.includes(value)
          ? prev.filter((item) => item !== value)
          : [...prev, value]
      );
    } else if (type === 'concerns') {
      setConcerns((prev) =>
        prev.includes(value)
          ? prev.filter((item) => item !== value)
          : [...prev, value]
      );
    } else if (type === 'intents') {
      setIntents((prev) =>
        prev.includes(value)
          ? prev.filter((item) => item !== value)
          : [...prev, value]
      );
    }
  };

  return (
    <div className="filter-container">
      <h1 className="filter-heading">Filter</h1>
      <div className="filter-options">
        {/* Price */}
        <div className="filter-price">
          <h2>Price</h2>
          <div className="price-range">
            <span>Min ₹{minPrice}</span>
            <input
              type="range"
              min="0"
              max="1000"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
            />
            <input
              type="range"
              min="0"
              max="1000"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
            />
            <span>Max ₹{maxPrice}</span>
          </div>
        </div>

        {/* Product Categories */}
        <div className="filter-product-categories">
          <h2>Product Categories</h2>
          <div className="filter-option-group">
            {categories.map((category) => (
              <div key={category} className="filter-option">
                <input
                  type="checkbox"
                  id={category}
                  value={category}
                  checked={productCategories.includes(category)}
                  onChange={(e) => handleCheckboxChange(e, 'productCategories')}
                />
                <label htmlFor={category}>{category}</label>
              </div>
            ))}
          </div>
        </div>

        {/* Concern */}
        <div className="filter-concern">
          <h2>Concern</h2>
          <div className="filter-option-group">
            {categories.map((category) => (
              <div key={category} className="filter-option">
                <input
                  type="checkbox"
                  id={category}
                  value={category}
                  checked={concerns.includes(category)}
                  onChange={(e) => handleCheckboxChange(e, 'concerns')}
                />
                <label htmlFor={category}>{category}</label>
              </div>
            ))}
          </div>
        </div>

        {/* Intent */}
        <div className="filter-intent">
          <h2>Intent</h2>
          <div className="filter-option-group">
            {categories.map((category) => (
              <div key={category} className="filter-option">
                <input
                  type="checkbox"
                  id={category}
                  value={category}
                  checked={intents.includes(category)}
                  onChange={(e) => handleCheckboxChange(e, 'intents')}
                />
                <label htmlFor={category}>{category}</label>
              </div>
            ))}
          </div>
        </div>

        {/* Rating */}
        <div className="filter-rating">
          <h2>Rating</h2>
          <select
            name="rating"
            id="rating"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
          >
            <option value="">Select Rating</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4 and more</option>
          </select>
        </div>

        {/* Filter and Clear Buttons */}
        <div className="filter-btn">
          <button className="filter-button">Filter</button>
          <button className="clear-button">Clear</button>
        </div>
      </div>
    </div>
  );
};

export default Filter;