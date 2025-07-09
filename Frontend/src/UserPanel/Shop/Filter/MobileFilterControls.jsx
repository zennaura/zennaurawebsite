import React, { useState, useEffect } from 'react';
import './MobileFilterControls.css'; // New CSS file for mobile controls
import { Slider } from '@mui/material';

const MobileFilterControls = ({
  productCategories = [],
  categories = [],
  concerns = [],
  chakra = [],
  intents = [],
  priceRange = [0, 1000],
  rating = '',
  onFilterChange,
  autoCheck = []
}) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [minPrice, setMinPrice] = useState(priceRange[0]);
  const [maxPrice, setMaxPrice] = useState(priceRange[1]);
  const [sortOption, setSortOption] = useState('default');
  const [localRating, setLocalRating] = useState(rating);
  const [categoryData, setCategoryData] = useState([]);
  const [availableConcerns, setAvailableConcerns] = useState([]);
  const [availableChakra, setAvailableChakra] = useState([]);
  const [availableIntents, setAvailableIntents] = useState([]);
  const [selectedProductCategories, setSelectedProductCategories] = useState(productCategories);
  const [selectedConcerns, setSelectedConcerns] = useState(concerns);
  const [selectedChakra, setSelectedChakra] = useState(chakra);
  const [selectedIntents, setSelectedIntents] = useState(intents);

  useEffect(() => {
    setMinPrice(priceRange[0]);
    setMaxPrice(priceRange[1]);
  }, [priceRange[0], priceRange[1]]);

  useEffect(() => {
    setLocalRating(rating);
  }, [rating]);

  useEffect(() => {
    setSelectedProductCategories(productCategories);
  }, [productCategories]);
  useEffect(() => {
    setSelectedConcerns(concerns);
  }, [concerns]);
  useEffect(() => {
    setSelectedChakra(chakra);
  }, [chakra]);
  useEffect(() => {
    setSelectedIntents(intents);
  }, [intents]);

  // Handle autoCheck prop (initial selection from URL/navigation state)
  useEffect(() => {
    // Handle autoCheck which can be an array of objects with type and value, or a single object
    let autoSelects = [];
    if (autoCheck) {
      if (Array.isArray(autoCheck)) {
        autoSelects = autoCheck;
      } else if (typeof autoCheck === 'object' && autoCheck.type && autoCheck.value) {
        autoSelects = [autoCheck];
      }
    }

    if (autoSelects.length > 0) {
      // Apply each autoSelect to the appropriate filter type
      autoSelects.forEach(({ type, value }) => {
        switch (type) {
          case 'productCategories':
            if (!selectedProductCategories.includes(value)) {
              setSelectedProductCategories(prev => [...prev, value]);
            }
            break;
          case 'categories':
            // Handle categories if needed
            break;
          case 'concerns':
            if (!selectedConcerns.includes(value)) {
              setSelectedConcerns(prev => [...prev, value]);
            }
            break;
          case 'chakra':
            if (!selectedChakra.includes(value)) {
              setSelectedChakra(prev => [...prev, value]);
            }
            break;
          case 'intents':
            if (!selectedIntents.includes(value)) {
              setSelectedIntents(prev => [...prev, value]);
            }
            break;
        }
      });
    }
  }, [autoCheck, selectedProductCategories, selectedConcerns, selectedChakra, selectedIntents]);

  useEffect(() => {
    // Fetch filter options (categories, concerns, chakra, intents)
    const fetchCategories = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_LINK}/api/categories`);
        const data = await res.json();
        setCategoryData(data);
      } catch (err) {
        setCategoryData([]);
      }
    };
    const fetchConcerns = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_LINK}/api/concerns`);
        const data = await res.json();
        setAvailableConcerns(data);
      } catch (err) {
        setAvailableConcerns([]);
      }
    };
    const fetchChakra = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_LINK}/api/chakra`);
        const data = await res.json();
        setAvailableChakra(data);
      } catch (err) {
        setAvailableChakra([]);
      }
    };
    const fetchIntents = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_LINK}/api/intents`);
        const data = await res.json();
        setAvailableIntents(data);
      } catch (err) {
        setAvailableIntents([]);
      }
    };
    fetchCategories();
    fetchConcerns();
    fetchChakra();
    fetchIntents();
  }, []);

  const handleApply = () => {
    setShowDropdown(false);
    onFilterChange('fetchProducts', {
      productCategories: selectedProductCategories,
      categories,
      concerns: selectedConcerns,
      chakra: selectedChakra,
      intents: selectedIntents,
      minPrice,
      maxPrice,
      rating: localRating
    });
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
    // Optionally, you can call onFilterChange for sort if you want to handle sort in parent
    onFilterChange('fetchProducts', {
      productCategories: selectedProductCategories,
      categories,
      concerns: selectedConcerns,
      chakra: selectedChakra,
      intents: selectedIntents,
      minPrice,
      maxPrice,
      rating: localRating,
      sortOption: e.target.value
    });
  };

  // Checkbox handlers
  const handleCheckboxChange = (e, type) => {
    const value = e.target.value;
    const isChecked = e.target.checked;
    if (type === 'productCategories') {
      setSelectedProductCategories((prev) =>
        isChecked ? [...prev, value] : prev.filter((v) => v !== value)
      );
    } else if (type === 'concerns') {
      setSelectedConcerns((prev) =>
        isChecked ? [...prev, value] : prev.filter((v) => v !== value)
      );
    } else if (type === 'chakra') {
      setSelectedChakra((prev) =>
        isChecked ? [...prev, value] : prev.filter((v) => v !== value)
      );
    } else if (type === 'intents') {
      setSelectedIntents((prev) =>
        isChecked ? [...prev, value] : prev.filter((v) => v !== value)
      );
    }
  };

  return (
    <>
      <div className="mobile-filter-controls">
        <button
          className="mobile-filter-button"
          aria-label="Open filters"
          onClick={() => setShowDropdown(true)}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M6.66667 12H9.33333V10.6667H6.66667V12ZM2 4V5.33333H14V4H2ZM4 8.66667H12V7.33333H4V8.66667Z" fill="white" />
          </svg>
          Filter
        </button>

        <select className="mobile-sort-select" aria-label="Sort products" value={sortOption} onChange={handleSortChange}>
          <option value="default">Default</option>
          <option value="price-low-high">Price: Low to High</option>
          <option value="price-high-low">Price: High to Low</option>
          <option value="rating-high-low">Rating: High to Low</option>
        </select>
      </div>

      {/* Render dropdown if showDropdown is true */}
      {showDropdown && (
        <div className="mobile-filter-dropdown-container">
          <div
            className="mobile-filter-overlay"
            onClick={() => setShowDropdown(false)}
          />

          <div className="mobile-filter-dropdown">
            {/* Price Filter */}
            <div className="filter-category">
              <span>Price</span>
              <div style={{ padding: '0 8px' }}>
                <Slider
                  value={[minPrice, maxPrice]}
                  min={0}
                  max={10000}
                  onChange={(_, newValue) => {
                    setMinPrice(newValue[0]);
                    setMaxPrice(newValue[1]);
                  }}
                  valueLabelDisplay="auto"
                  step={10}
                />
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14 }}>
                  <span>Min: ₹{minPrice}</span>
                  <span>Max: ₹{maxPrice}</span>
                </div>
              </div>
            </div>
            <hr />
            {/* Category Filter */}
            <div className="filter-category">
              <span>Categories</span>
              <div style={{ maxHeight: 120, overflowY: 'auto' }}>
                {categoryData.map(parent =>
                  parent.subCategories.map(sub =>
                    (sub.categories || []).map(category => (
                      <div key={`${sub.subCategory}-${category}`} className="flex items-center space-x-2 text-sm">
                        <input
                          type="checkbox"
                          id={`${sub.subCategory}-${category}1`}
                          value={sub.subCategory}
                          checked={selectedProductCategories.includes(sub.subCategory)}
                          onChange={e => handleCheckboxChange(e, 'productCategories')}
                        />
                        <label htmlFor={`${sub.subCategory}-${category}1`}>{sub.subCategory}</label>
                      </div>
                    ))
                  )
                )}
              </div>
            </div>
            <hr />
            {/* Concerns Filter */}
            <div className="filter-category">
              <span>Concerns</span>
              <div style={{ maxHeight: 80, overflowY: 'auto' }}>
                {availableConcerns.map(concern => (
                  <div key={concern} className="flex items-center space-x-2 text-sm">
                    <input
                      type="checkbox"
                      id={`concern-${concern}`}
                      value={concern}
                      checked={selectedConcerns.includes(concern)}
                      onChange={e => handleCheckboxChange(e, 'concerns')}
                    />
                    <label htmlFor={`concern-${concern}`}>{concern}</label>
                  </div>
                ))}
              </div>
            </div>
            <hr />
            {/* Chakra Filter */}
            <div className="filter-category">
              <span>Chakra</span>
              <div style={{ maxHeight: 80, overflowY: 'auto' }}>
                {availableChakra.map(chakraItem => (
                  <div key={chakraItem} className="flex items-center space-x-2 text-sm">
                    <input
                      type="checkbox"
                      id={`chakra-${chakraItem}`}
                      value={chakraItem}
                      checked={selectedChakra.includes(chakraItem)}
                      onChange={e => handleCheckboxChange(e, 'chakra')}
                    />
                    <label htmlFor={`chakra-${chakraItem}`}>{chakraItem}</label>
                  </div>
                ))}
              </div>
            </div>
            <hr />
            {/* Intents Filter */}
            <div className="filter-category">
              <span>Intents</span>
              <div style={{ maxHeight: 80, overflowY: 'auto' }}>
                {availableIntents.map(intent => (
                  <div key={intent} className="flex items-center space-x-2 text-sm">
                    <input
                      type="checkbox"
                      id={`intent-${intent}`}
                      value={intent}
                      checked={selectedIntents.includes(intent)}
                      onChange={e => handleCheckboxChange(e, 'intents')}
                    />
                    <label htmlFor={`intent-${intent}`}>{intent}</label>
                  </div>
                ))}
              </div>
            </div>
            <hr />
            {/* Rating Filter */}
            <div className="filter-category">
              <span>Rating</span>
              <select value={localRating} onChange={e => setLocalRating(e.target.value)}>
                <option value="">Select Rating</option>
                <option value="1">1 and up</option>
                <option value="2">2 and up</option>
                <option value="3">3 and up</option>
                <option value="4">4 and up</option>
              </select>
            </div>
            {/* Apply Button */}
            <div className="apply-button">
              <button onClick={handleApply}>Apply</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MobileFilterControls;