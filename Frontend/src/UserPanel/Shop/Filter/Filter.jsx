import React, { useState, useEffect, useRef } from 'react';
import './Filter.css';

const Filter = ({ productCategories, concerns, intents, onFilterChange, autoCheck = [], }) => {
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(100);
  // const [productCategories, setProductCategories] = useState([]);
  // const [intents, setIntents] = useState([]);
  const [rating, setRating] = useState('');
  // const [concerns, setConcerns] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [availableConcerns, setAvailableConcerns] = useState([]);
  const [availableIntents, setAvailableIntents] = useState([]);
  const [selectedProductCategories, setSelectedProductCategories] = useState([]);
  const [selectedConcerns, setSelectedConcerns] = useState([]);
  const [selectedIntents, setSelectedIntents] = useState([]);

  const prevAutoCheckRef = useRef([]);

  useEffect(() => {
    // Only update states if autoCheck changed (shallow compare)
    const prev = prevAutoCheckRef.current;
    const changed =
      autoCheck.length !== prev.length ||
      autoCheck.some((val) => !prev.includes(val));

    if (changed) {
      setSelectedProductCategories((prevSelected) => [
        ...new Set([...prevSelected, ...autoCheck]),
      ]);
      setSelectedConcerns((prevSelected) => [
        ...new Set([...prevSelected, ...autoCheck]),
      ]);
      setSelectedIntents((prevSelected) => [
        ...new Set([...prevSelected, ...autoCheck]),
      ]);
      prevAutoCheckRef.current = autoCheck;
    }
  }, [autoCheck]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_LINK}/api/categories`);
        const data = await res.json();
        setCategoryData(data);
      } catch (err) {
        console.error('Failed to fetch categories:', err);
      }
    };

    const fetchConcerns = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_LINK}/api/concerns`);
        const data = await res.json();
        setAvailableConcerns(data);
      } catch (err) {
        console.error('Failed to fetch concerns:', err);
      }
    };

    const fetchIntents = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_LINK}/api/intents`);
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
    const isChecked = e.target.checked;

    const updateState = (current, setState) => {
      const newValues = isChecked
        ? [...current, value]
        : current.filter((v) => v !== value);
      setState(newValues);
      onFilterChange(type, value);
    };

    if (type === 'productCategories') {
      updateState(selectedProductCategories, setSelectedProductCategories);
    } else if (type === 'concerns') {
      updateState(selectedConcerns, setSelectedConcerns);
    } else if (type === 'intents') {
      updateState(selectedIntents, setSelectedIntents);
    }
  };

  return (
    <div className="filter-container md:hidden lg:block">
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
            {/* <input
              type="range"
              min="0"
              max="1000"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
            /> */}
            {/* <span>₹{maxPrice}</span> */}
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
                        value={sub.subCategory}
                        checked={selectedProductCategories.includes(sub.subCategory)}
                        onChange={(e) => handleCheckboxChange(e, 'productCategories')}
                      />
                      <label htmlFor={`${sub.subCategory}-${category}`}>
                        {sub.subCategory}
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
                    checked={selectedConcerns.includes(concern)}
                    onChange={(e) => handleCheckboxChange(e, 'concerns')}
                  />
                  <label htmlFor={concern}>{concern}</label>
                </div>))
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
                    checked={selectedIntents.includes(intent)}
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
