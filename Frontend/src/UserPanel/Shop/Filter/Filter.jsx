import React, { useState, useEffect, useRef } from "react";
import { Slider, Box, Typography } from "@mui/material";
import "./Filter.css"; // Make sure this path is correct

const Filter = ({
  productCategories, // These are now props, representing selected categories from Shop.jsx
  concerns, // These are now props
  intents, // These are now props
  priceRange, // This is now a prop from Shop.jsx
  rating, // This is now a prop from Shop.jsx
  onFilterChange,
  autoCheck = [],
}) => {
  // Internal states for fetched filter options
  const [categoryData, setCategoryData] = useState([]);
  const [availableConcerns, setAvailableConcerns] = useState([]);
  const [availableIntents, setAvailableIntents] = useState([]);

  // Internal states for checkboxes, which will be synchronized by props from Shop.jsx
  // These still manage their own 'checked' status based on the props received.
  const [selectedConcerns, setSelectedConcerns] = useState(concerns); // Initialize from prop
  const [selectedIntents, setSelectedIntents] = useState(intents); // Initialize from prop

  // Loading states for filter options
  const [isLoadingCategories, setIsLoadingCategories] = useState(true);
  const [isLoadingConcerns, setIsLoadingConcerns] = useState(true);
  const [isLoadingIntents, setIsLoadingIntents] = useState(true);

  const prevAutoCheckRef = useRef([]);

  // --- Synchronization useEffects ---
  // Keep selectedConcerns and selectedIntents in sync with props from Shop.jsx
  useEffect(() => {
    setSelectedConcerns(concerns);
  }, [concerns]);

  useEffect(() => {
    setSelectedIntents(intents);
  }, [intents]);

  // Handle autoCheck prop (initial selection from URL/navigation state)
  useEffect(() => {
    const prev = prevAutoCheckRef.current;
    const changed =
      autoCheck.length !== prev.length ||
      autoCheck.some((val) => !prev.includes(val));

    if (changed) {
      // For productCategories, we need to merge with existing selected ones from prop
      // For concerns and intents, update their internal states.
      // This part assumes autoCheck can contain productCategories, concerns, or intents.
      // If autoCheck specifically applies ONLY to productCategories, adjust logic.
      onFilterChange("fetchProducts", {
        productCategories: [...new Set([...productCategories, ...autoCheck])],
        concerns: [...new Set([...selectedConcerns, ...autoCheck])], // This might need refinement based on autoCheck content
        intents: [...new Set([...selectedIntents, ...autoCheck])], // This might need refinement based on autoCheck content
        minPrice: priceRange[0],
        maxPrice: priceRange[1],
        rating: rating,
      });
      prevAutoCheckRef.current = autoCheck;
    }
  }, [
    autoCheck,
    onFilterChange,
    productCategories,
    selectedConcerns,
    selectedIntents,
    priceRange,
    rating,
  ]); // Added necessary dependencies

  // Fetch available filter options (categories, concerns, intents) on mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setIsLoadingCategories(true);
        const res = await fetch(
          `${import.meta.env.VITE_BACKEND_LINK}/api/categories`
        );
        const data = await res.json();
        setCategoryData(data);
      } catch (err) {
        console.error("Failed to fetch categories:", err);
      } finally {
        setIsLoadingCategories(false);
      }
    };

    const fetchConcerns = async () => {
      try {
        setIsLoadingConcerns(true);
        const res = await fetch(
          `${import.meta.env.VITE_BACKEND_LINK}/api/concerns`
        );
        const data = await res.json();
        setAvailableConcerns(data);
      } catch (err) {
        console.error("Failed to fetch concerns:", err);
      } finally {
        setIsLoadingConcerns(false);
      }
    };

    const fetchIntents = async () => {
      try {
        setIsLoadingIntents(true);
        const res = await fetch(
          `${import.meta.env.VITE_BACKEND_LINK}/api/intents`
        );
        const data = await res.json();
        setAvailableIntents(data);
      } catch (err) {
        console.error("Failed to fetch intents:", err);
      } finally {
        setIsLoadingIntents(false);
      }
    };

    fetchCategories();
    fetchConcerns();
    fetchIntents();
  }, []); // Empty dependency array means this runs once on mount

  // --- Logic for Unique Subcategories from fetched categoryData ---
  const [uniqueSubcategories, setUniqueSubcategories] = useState([]);
  useEffect(() => {
    if (categoryData && categoryData.length > 0) {
      const allSubcategories = categoryData.flatMap((parent) =>
        parent.subCategories.map((sub) => sub.subCategory)
      );
      const unique = [...new Set(allSubcategories)].filter(
        (sub) => sub !== ""
      );
      setUniqueSubcategories(unique);
      console.log("Filter.jsx: Unique Subcategories loaded:", unique);
    }
  }, [categoryData]);

  // --- Handlers for Filter Changes ---
  const handlePriceChange = (event, newValue) => {
    // Directly send the updated price range to the parent (Shop.jsx)
    onFilterChange("fetchProducts", {
      productCategories: productCategories, // Use prop for current categories
      concerns: selectedConcerns,
      intents: selectedIntents,
      minPrice: newValue[0],
      maxPrice: newValue[1],
      rating: rating, // Use prop for current rating
    });
  };

  const handleRatingChange = (e) => {
    const newRating = e.target.value;
    // Directly send the updated rating to the parent (Shop.jsx)
    onFilterChange("fetchProducts", {
      productCategories: productCategories, // Use prop
      concerns: selectedConcerns,
      intents: selectedIntents,
      minPrice: priceRange[0], // Use prop
      maxPrice: priceRange[1], // Use prop
      rating: newRating,
    });
  };

  const handleCheckboxChange = (e, type) => {
    const value = e.target.value;
    const isChecked = e.target.checked;

    let newSelectedProductCategories = [...productCategories]; // Start with prop value
    let newSelectedConcerns = [...selectedConcerns];
    let newSelectedIntents = [...selectedIntents];

    // Update the relevant selected array based on type
    if (type === "productCategories") {
      newSelectedProductCategories = isChecked
        ? [...newSelectedProductCategories, value]
        : newSelectedProductCategories.filter((v) => v !== value);
    } else if (type === "concerns") {
      newSelectedConcerns = isChecked
        ? [...newSelectedConcerns, value]
        : newSelectedConcerns.filter((v) => v !== value);
      setSelectedConcerns(newSelectedConcerns); // Update internal state for concerns
    } else if (type === "intents") {
      newSelectedIntents = isChecked
        ? [...newSelectedIntents, value]
        : newSelectedIntents.filter((v) => v !== value);
      setSelectedIntents(newSelectedIntents); // Update internal state for intents
    }

    // Now, send the complete payload to Shop.jsx
    onFilterChange("fetchProducts", {
      productCategories: newSelectedProductCategories,
      concerns: newSelectedConcerns,
      intents: newSelectedIntents,
      minPrice: priceRange[0], // Use prop
      maxPrice: priceRange[1], // Use prop
      rating: rating, // Use prop
    });
  };

  // Handle filter application (manually triggered by Filter button)
  const handleFilter = () => {
    // This will send the current state of filters to the parent
    onFilterChange("fetchProducts", {
      productCategories: productCategories, // Use prop
      concerns: selectedConcerns,
      intents: selectedIntents,
      minPrice: priceRange[0], // Use prop
      maxPrice: priceRange[1], // Use prop
      rating: rating, // Use prop
    });
  };

  // Handle clearing all filters
  const handleClear = () => {
    // Send a payload with default/empty values to the parent
    onFilterChange("fetchProducts", {
      productCategories: [],
      concerns: [],
      intents: [],
      minPrice: 0,
      maxPrice: 1000,
      rating: "",
    });
  };

  return (
    <div className="filter-container md:hidden lg:block">
      <h1 className="filter-heading">Filter</h1>
      <div className="filter-options">
        {/* Price */}
        <div className="filter-price">
          {/* <h2>Price</h2> */}
          <Box sx={{ px: 2 }}>
            {/* <Typography variant="body2" sx={{ mb: 1 }}>
              ₹{priceRange[0]} - ₹{priceRange[1]}
            </Typography> */}
            <Slider
              value={priceRange} // Controlled by prop
              onChange={handlePriceChange}
              valueLabelDisplay="on"
              valueLabelFormat={(value) => `₹${value}`}
              min={0}
              max={1000}
              sx={{
                color: "#593039",
                "& .MuiSlider-thumb": {
                  backgroundColor: "#593039",
                },
                "& .MuiSlider-track": {
                  backgroundColor: "#593039",
                },
                "& .MuiSlider-rail": {
                  backgroundColor: "#593039",
                },
                "& .MuiSlider-valueLabel": {
                  backgroundColor: "#593039", // Background color for the label bubble
                  color: "#fff", // Text color for the label bubble
                  "&::before": {
                    backgroundColor: "#593039", // Color for the triangle/pointer of the bubble
                  },
                },
              }}
            />
          </Box>
        </div>

        {/* Product Categories */}
        <div className="filter-product-categories">
          <h2>Product Categories</h2>
          <div className="filter-option-group">
            {isLoadingCategories ? (
              <p>Loading categories...</p>
            ) : uniqueSubcategories.length > 0 ? (
              uniqueSubcategories.map((subCategory) => (
                <div key={subCategory} className="filter-option">
                  <input
                    type="checkbox"
                    id={`subCategory-${subCategory}`}
                    value={subCategory}
                    checked={productCategories.includes(subCategory)} // Checked based on prop
                    onChange={(e) =>
                      handleCheckboxChange(e, "productCategories")
                    }
                    style={{ accentColor: "#593039" }}
                  />
                  <label htmlFor={`subCategory-${subCategory}`}>
                    {subCategory}
                  </label>
                </div>
              ))
            ) : (
              <p>No categories available.</p>
            )}
          </div>
        </div>

        {/* Concern */}
        <div className="filter-concern">
          <h2>Chakra</h2>
          <div className="filter-option-group">
            {isLoadingConcerns ? (
              <p>Loading Chakra...</p>
            ) : availableConcerns.length > 0 ? (
              availableConcerns.map((concern) => (
                <div key={concern} className="filter-option">
                  <input
                    type="checkbox"
                    id={concern}
                    value={concern}
                    checked={selectedConcerns.includes(concern)} // Checked based on internal state (synced with prop)
                    onChange={(e) => handleCheckboxChange(e, "concerns")}
                  />
                  <label htmlFor={concern}>{concern}</label>
                </div>
              ))
            ) : (
              <p>No Chakra available.</p>
            )}
          </div>
        </div>

        {/* Intent */}
        <div className="filter-intent">
          <h2>Intent</h2>
          <div className="filter-option-group">
            {isLoadingIntents ? (
              <p>Loading intents...</p>
            ) : availableIntents.length > 0 ? (
              availableIntents.map((intent) => (
                <div key={intent} className="filter-option">
                  <input
                    type="checkbox"
                    id={intent}
                    value={intent}
                    checked={selectedIntents.includes(intent)} // Checked based on internal state (synced with prop)
                    onChange={(e) => handleCheckboxChange(e, "intents")}
                  />
                  <label htmlFor={intent}>{intent}</label>
                </div>
              ))
            ) : (
              <p>No intents available.</p>
            )}
          </div>
        </div>

        {/* Rating */}
        <div className="filter-rating">
          <h2>Rating</h2>
          <select
            name="rating"
            id="rating"
            value={rating} // Controlled by prop
            onChange={handleRatingChange}
            disabled={
              isLoadingCategories || isLoadingConcerns || isLoadingIntents
            }
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
          <button
            className="filter-button"
            onClick={handleFilter}
            disabled={
              isLoadingCategories || isLoadingConcerns || isLoadingIntents
            }
          >
            Filter
          </button>
          <button
            className="clear-button"
            onClick={handleClear}
            disabled={
              isLoadingCategories || isLoadingConcerns || isLoadingIntents
            }
          >
            Clear
          </button>
        </div>
      </div>
    </div>
  );
};

export default Filter;
