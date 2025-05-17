import React, { useState, useEffect } from 'react';
import './Filter.css';

const Filter = ({ productCategories, concerns, intents, onFilterChange }) => {
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(100);
  // const [productCategories, setProductCategories] = useState([]);
  // const [intents, setIntents] = useState([]);
  const [rating, setRating] = useState('');
  // const [concerns, setConcerns] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [availableConcerns, setAvailableConcerns] = useState([]);
  const [availableIntents, setAvailableIntents] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/categories');
        const data = await res.json();
        setCategoryData(data);
      } catch (err) {
        console.error('Failed to fetch categories:', err);
      }
    };

    const fetchConcerns = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/concerns');
        const data = await res.json();
        setAvailableConcerns(data);
      } catch (err) {
        console.error('Failed to fetch concerns:', err);
      }
    };

    const fetchIntents = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/intents');
        const data = await res.json();
        setAvailableIntents(data);
      } catch (err) {
        console.error('Failed to fetch intents:', err);
      }
    };

    fetchCategories();
    fetchConcerns();
    fetchIntents();
  }, []);

  const handleCheckboxChange = (e, type) => {
    const value = e.target.value;
    onFilterChange(type, value);
  };

  return (
    <div className="filter-container">
      <h1 className="filter-heading">Filter</h1>
      <div className="filter-options">

        {/* Price */}
        <div className="filter-price">
          <h2>Price</h2>
          <div className="price-range">
            <span>₹{minPrice}</span>
            <input
              type="range"
              min="0"
              max="1000"
              value={minPrice}
              onChange={(e) => setMinPrice(Number(e.target.value))}
            />
            <input
              type="range"
              min="0"
              max="1000"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
            />
            <span>₹{maxPrice}</span>
          </div>
        </div>

        {/* Product Categories */}
        <div className="filter-product-categories">
          <h2>Product Categories</h2>
          <div className="filter-option-group">
            {categoryData.map((parent) =>
              parent.subCategories.map((sub) => (
                <div key={`${parent.parentCategory}-${sub.subCategory}-${(sub.categories || []).join('-')}`} className="filter-option">
                  {(sub.categories || []).map((category) => (
                    <div key={`${parent.parentCategory}-${sub.subCategory}-${category}`}>
                      <input
                        type="checkbox"
                        id={`${sub.subCategory}-${category}`}
                        value={category}
                        checked={productCategories.includes(category)}
                        onChange={(e) => handleCheckboxChange(e, 'productCategories')}
                      />
                      <label htmlFor={`${sub.subCategory}-${category}`}>
                        {parent.parentCategory ? parent.parentCategory : ""} {category ? "→ " + category : ""} {sub.subCategory ? "→ " + sub.subCategory : ""}
                      </label>
                    </div>
                  ))}
                </div>
              ))
            )}
          </div>
        </div>


        {/* Concern */}
        <div className="filter-concern">
          <h2>Concern</h2>
          <div className="filter-option-group">
            {availableConcerns.length > 0 ? (
              availableConcerns.map((concern) => (
                <div key={concern} className="filter-option">
                  <input
                    type="checkbox"
                    id={concern}
                    value={concern}
                    checked={concerns.includes(concern)}
                    onChange={(e) => handleCheckboxChange(e, 'concerns')}
                  />
                  <label htmlFor={concern}>{concern}</label>
                </div>
              ))
            ) : (
              <p>Loading concerns...</p>
            )}
          </div>
        </div>

        {/* Intent */}
        <div className="filter-intent">
          <h2>Intent</h2>
          <div className="filter-option-group">
            {availableIntents.length > 0 ? (
              availableIntents.map((intent) => (
                <div key={intent} className="filter-option">
                  <input
                    type="checkbox"
                    id={intent}
                    value={intent}
                    checked={intents.includes(intent)}
                    onChange={(e) => handleCheckboxChange(e, 'intents')}
                  />
                  <label htmlFor={intent}>{intent}</label>
                </div>
              ))
            ) : (
              <p>Loading intents...</p>
            )}
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
            <option value="1">1 and up</option>
            <option value="2">2 and up</option>
            <option value="3">3 and up</option>
            <option value="4">4 and up</option>
          </select>
        </div>

        {/* Buttons */}
        <div className="filter-btn">
          <button className="filter-button">Filter</button>
          <button
            className="clear-button"
            onClick={() => {
              setMinPrice(0);
              setMaxPrice(100);
              setProductCategories([]);
              setConcerns([]);
              setIntents([]);
              setRating('');
            }}
          >
            Clear
          </button>
        </div>
      </div>
    </div>
  );
};

export default Filter;
