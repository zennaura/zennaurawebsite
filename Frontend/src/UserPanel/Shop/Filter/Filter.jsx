import React, { useState, useEffect, useRef } from "react";
import { Slider, Box, Typography } from "@mui/material";
import "./Filter.css"; // Make sure this path is correct

const Filter = ({
  productCategories, // These are now props, representing selected categories from Shop.jsx
  categories = [], // <-- new prop
  concerns, // These are now props
  intents, // These are now props
  chakra,
  priceRange, // This is now a prop from Shop.jsx
  rating, // This is now a prop from Shop.jsx
  onFilterChange,
  autoCheck = [],
}) => {
  // Internal states for fetched filter options
  const [categoryData, setCategoryData] = useState([]);
  const [availableConcerns, setAvailableConcerns] = useState([]);
  const [availableChakra, setAvailableChakra] = useState([]);
  const [availableIntents, setAvailableIntents] = useState([]);

  // Internal states for checkboxes, which will be synchronized by props from Shop.jsx
  // These still manage their own 'checked' status based on the props received.
  const [selectedConcerns, setSelectedConcerns] = useState(concerns); // Initialize from prop
  const [selectedChakra, setSelectedChakra] = useState(chakra || []); // Initialize from prop
  const [selectedIntents, setSelectedIntents] = useState(intents); // Initialize from prop

  // Loading states for filter options
  const [isLoadingCategories, setIsLoadingCategories] = useState(true);
  const [isLoadingConcerns, setIsLoadingConcerns] = useState(true);
  const [isLoadingChakra, setIsLoadingChakra] = useState(true);
  const [isLoadingIntents, setIsLoadingIntents] = useState(true);

  const prevAutoCheckRef = useRef([]);

  // --- Synchronization useEffects ---
  // Keep selectedConcerns and selectedIntents in sync with props from Shop.jsx
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
    const prev = prevAutoCheckRef.current;
    const changed =
      autoCheck.length !== prev.length ||
      Array.isArray(autoCheck) && autoCheck.some((val) => !prev.includes(val));

    if (changed) {
      // For productCategories, we need to merge with existing selected ones from prop
      // For concerns and intents, update their internal states.
      // This part assumes autoCheck can contain productCategories, concerns, or intents.
      // If autoCheck specifically applies ONLY to productCategories, adjust logic.
      onFilterChange("fetchProducts", {
        productCategories: [...new Set([...productCategories, ...autoCheck])],
        concerns: [...new Set([...selectedConcerns, ...autoCheck])], // This might need refinement based on autoCheck content
        chakra: [...new Set([...selectedChakra, ...autoCheck])], // This might need refinement based on autoCheck content
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
    selectedChakra,
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

    const fetchChakra = async () => {
      try {
        setIsLoadingChakra(true);
        const res = await fetch(
          `${import.meta.env.VITE_BACKEND_LINK}/api/chakra`
        );
        const data = await res.json();
        setAvailableChakra(data);
      } catch (err) {
        console.error("Failed to fetch Chakra:", err);
      } finally {
        setIsLoadingChakra(false);
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
    fetchChakra();
    fetchIntents();
  }, []); // Empty dependency array means this runs once on mount

  // --- Logic for Unique Subcategories from fetched categoryData ---
  const [uniqueSubcategories, setUniqueSubcategories] = useState([]);
  useEffect(() => {
    if (categoryData && categoryData.length > 0) {
      const allSubcategories = categoryData.flatMap((parent) =>
        parent.subCategories.map((sub) => sub.subCategory)
      );
      console.log("all sub categories", allSubcategories);
      const unique = [...new Set(allSubcategories)].filter(
        (sub) => (sub || " ").trim() !== ""
      );
      setUniqueSubcategories(unique);
      console.log("Filter.jsx: Unique Subcategories loaded:", unique);
    }
  }, [categoryData]);

  // Helper: Map category to subcategory for quick lookup
  const categoryToSubcategory = React.useMemo(() => {
    const map = {};
    categoryData.forEach((parent) => {
      (parent.subCategories || []).forEach((sub) => {
        (sub.categories || []).forEach((cat) => {
          if ((cat || '').trim() !== '' && (sub.subCategory || '').trim() !== '') {
            map[cat] = sub.subCategory;
          }
        });
      });
    });
    return map;
  }, [categoryData]);

  // --- Handlers for Filter Changes ---
  const handlePriceChange = (event, newValue) => {
    // Directly send the updated price range to the parent (Shop.jsx)
    onFilterChange("fetchProducts", {
      productCategories: productCategories, // Use prop for current categories
      concerns: selectedConcerns,
      chakra:selectedChakra,
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
      chakra:selectedChakra,
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
    let newSelectedChakra = [...selectedChakra];
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
    }else if (type === "chakra") {
      newSelectedChakra = isChecked
        ? [...newSelectedChakra, value]
        : newSelectedChakra.filter((v) => v !== value);
      setSelectedChakra(newSelectedChakra); // Update internal state for chakra
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
      chakra:newSelectedChakra,
      intents: newSelectedIntents,
      minPrice: priceRange[0], // Use prop
      maxPrice: priceRange[1], // Use prop
      rating: rating, // Use prop
    });
  };

  // New handler for category checkboxes
  const handleCategoryCheckboxChange = (e, cat, subName, allCatsInSub) => {
    const isChecked = e.target.checked;
    let newSelectedProductCategories = [...productCategories];
    let newSelectedCategories = [...categories];
    if (isChecked) {
      // Add parent subcategory if not present
      if (!newSelectedProductCategories.includes(subName)) {
        newSelectedProductCategories.push(subName);
      }
      // Add category
      if (!newSelectedCategories.includes(cat)) {
        newSelectedCategories.push(cat);
      }
    } else {
      // Remove category
      newSelectedCategories = newSelectedCategories.filter((v) => v !== cat);
      // If no other categories under this subcategory are checked, remove subcategory
      const checkedOtherCats = allCatsInSub.some(
        (otherCat) =>
          otherCat !== cat &&
          newSelectedCategories.includes(otherCat)
      );
      if (!checkedOtherCats) {
        newSelectedProductCategories = newSelectedProductCategories.filter((v) => v !== subName);
      }
    }
    onFilterChange("fetchProducts", {
      productCategories: newSelectedProductCategories,
      categories: newSelectedCategories,
      concerns: selectedConcerns,
      chakra: selectedChakra,
      intents: selectedIntents,
      minPrice: priceRange[0],
      maxPrice: priceRange[1],
      rating: rating,
    });
  };

  // Handle filter application (manually triggered by Filter button)
  const handleFilter = () => {
    // This will send the current state of filters to the parent
    onFilterChange("fetchProducts", {
      productCategories: productCategories, // Use prop
      concerns: selectedConcerns,
      chakra:selectedChakra,
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
      chakra:[],
      intents: [],
      minPrice: 0,
      maxPrice: 1000,
      rating: "",
    });
  };

  console.log("category dataa", categoryData);
  console.log("unique category dataa", uniqueSubcategories);
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
            ) : categoryData.length > 0 ? (
              (() => {
                const subCategoryMap = {};
                categoryData.forEach((parent) => {
                  (parent.subCategories || []).forEach((sub) => {
                    const subName = (sub.subCategory || "").trim();
                    if (!subName) return;
                    if (!subCategoryMap[subName]) subCategoryMap[subName] = new Set();
                    (sub.categories || []).forEach((cat) => {
                      const catName = (cat || "").trim();
                      if (catName) subCategoryMap[subName].add(catName);
                    });
                  });
                });
                return Object.entries(subCategoryMap).map(([subName, catSet]) => (
                  <div key={subName}>
                    <div className="filter-option">
                      <input
                        type="checkbox"
                        id={`subCategory-${subName}`}
                        value={subName}
                        checked={productCategories.includes(subName)}
                        onChange={(e) => handleCheckboxChange(e, "productCategories")}
                        style={{ accentColor: "#593039" }}
                      />
                      <label htmlFor={`subCategory-${subName}`}>{subName}</label>
                    </div>
                    {catSet.size > 0 && (
                      <div className="filter-category-group">
                        {[...catSet].map((cat) => (
                          <div key={cat} className="filter-category-option">
                            <input
                              type="checkbox"
                              id={`category-${cat}`}
                              value={cat}
                              checked={categories.includes(cat)}
                              onChange={(e) => handleCategoryCheckboxChange(e, cat, subName, [...catSet])}
                              style={{ accentColor: "#593039" }}
                            />
                            <label htmlFor={`category-${cat}`}>{cat}</label>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ));
              })()
            ) : (
              <p>No categories available.</p>
            )}
          </div>
        </div>

        {/* Concern */}
        <div className="filter-concern">
          <h2>Chakra</h2>
          <div className="filter-option-group">
            {isLoadingChakra ? (
              <p>Loading Chakra...</p>
            ) : availableChakra.length > 0 ? (
              availableChakra.map((chakraa) => (
                <div key={chakraa} className="filter-option">
                  <input
                    type="checkbox"
                    id={chakraa}
                    value={chakraa}
                    checked={selectedChakra.includes(chakraa)} // Checked based on internal state (synced with prop)
                    onChange={(e) => handleCheckboxChange(e, "chakra")}
                  />
                  <label htmlFor={chakraa}>{chakraa}</label>
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
              isLoadingCategories || isLoadingConcerns || isLoadingChakra || isLoadingIntents
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
              isLoadingCategories || isLoadingConcerns || isLoadingChakra || isLoadingIntents
            }
          >
            Filter
          </button>
          <button
            className="clear-button"
            onClick={handleClear}
            disabled={
              isLoadingCategories || isLoadingConcerns || isLoadingChakra || isLoadingIntents
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
