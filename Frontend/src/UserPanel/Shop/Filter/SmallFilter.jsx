import React, { useState, useEffect, useRef } from 'react';
import { FaChevronUp, FaChevronDown } from 'react-icons/fa';
import { FaFilter } from "react-icons/fa";
import { Slider, Box } from "@mui/material";

const PopupFilter = ({
    productCategories = [],
    chakra = [],
    intents = [],
    priceRange = [0, 1000],
    rating = '',
    onFilterChange,
    autoCheck = [],
}) => {
    const [minPrice, setMinPrice] = useState(priceRange[0]);
    const [maxPrice, setMaxPrice] = useState(priceRange[1]);
    const [localRating, setLocalRating] = useState(rating);
    const [categoryData, setCategoryData] = useState([]);
    const [availableChakra, setAvailableChakra] = useState([]);
    const [availableIntents, setAvailableIntents] = useState([]);
    const [selectedProductCategories, setSelectedProductCategories] = useState(productCategories);
    const [selectedChakra, setSelectedChakra] = useState(chakra);
    const [selectedIntents, setSelectedIntents] = useState(intents);
    const [isOpen, setIsOpen] = useState(false);

    const prevAutoCheckRef = useRef([]);

    // Normalize autoCheck to always be an array
    const safeAutoCheck = Array.isArray(autoCheck)
      ? autoCheck
      : autoCheck && typeof autoCheck === "object" && autoCheck.type && autoCheck.value
        ? [autoCheck]
        : [];

    // Sync with props
    useEffect(() => { setMinPrice(priceRange[0]); setMaxPrice(priceRange[1]); }, [priceRange]);
    useEffect(() => { setLocalRating(rating); }, [rating]);
    useEffect(() => { setSelectedProductCategories(productCategories); }, [productCategories]);
    useEffect(() => { setSelectedChakra(chakra); }, [chakra]);
    useEffect(() => { setSelectedIntents(intents); }, [intents]);

    useEffect(() => {
        const prev = prevAutoCheckRef.current;
        const changed =
            safeAutoCheck.length !== prev.length ||
            safeAutoCheck.some((val) => !prev.includes(val));

        if (changed) {
            setSelectedProductCategories((prevSelected) => [
                ...new Set([...prevSelected, ...safeAutoCheck]),
            ]);
            setSelectedChakra((prevSelected) => [
                ...new Set([...prevSelected, ...safeAutoCheck]),
            ]);
            setSelectedIntents((prevSelected) => [
                ...new Set([...prevSelected, ...safeAutoCheck]),
            ]);
            prevAutoCheckRef.current = safeAutoCheck;
        }
    }, [safeAutoCheck]);

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

        const fetchChakra = async () => {
            try {
                const res = await fetch(`${import.meta.env.VITE_BACKEND_LINK}/api/chakra`);
                const data = await res.json();
                setAvailableChakra(data);
            } catch (err) {
                console.error('Failed to fetch chakra:', err);
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
        fetchChakra();
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
            onFilterChange?.(type, value);
        };

        if (type === 'productCategories') {
            updateState(selectedProductCategories, setSelectedProductCategories);
        } else if (type === 'chakra') {
            updateState(selectedChakra, setSelectedChakra);
        } else if (type === 'intents') {
            updateState(selectedIntents, setSelectedIntents);
        }
    };

    const handleApply = () => {
        setIsOpen(false);
        onFilterChange?.('fetchProducts', {
            productCategories: selectedProductCategories,
            chakra: selectedChakra,
            intents: selectedIntents,
            minPrice,
            maxPrice,
            rating: localRating
        });
    };

    const renderSection = (title, content, expanded, toggle) => (
        <div className="border-b border-gray-300">
            <div
                className="flex justify-between items-center !px-4 !py-2 cursor-pointer bg-gray-200 hover:bg-gray-300"
                onClick={toggle}
            >
                <span>{title}</span>
                <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center shadow-sm">
                    {expanded ? <FaChevronUp size={10} /> : <FaChevronDown size={10} />}
                </div>
            </div>
            {expanded && <div className="!px-6 !py-2 bg-white">{content}</div>}
        </div>
    );

    // Section toggles
    const [showSections, setShowSections] = useState({
        Price: true,
        Product: false,
        Chakra: false,
        Intent: false,
        Rating: false,
    });

    const toggleSection = (section) => {
        setShowSections((prev) => ({
            ...prev,
            [section]: !prev[section],
        }));
    };

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex justify-center items-center gap-4 bg-[#4a001f] text-white !px-4 !py-2 rounded"
                style={{width:"45vw"}}
            >
                <FaFilter /> Filters
            </button>

            {isOpen && (
                <div className="absolute left-0 bottom-12 bg-gray-100 border border-gray-300 rounded shadow-lg z-10 -translate-x-51" style={{width:"100vw"}}>
                    {/* Price Section */}
                    {renderSection(
                        'Price',
                        <Box sx={{ px: 2 }}>
                          <Slider
                            value={[minPrice, maxPrice]}
                            onChange={(_, newValue) => {
                              setMinPrice(newValue[0]);
                              setMaxPrice(newValue[1]);
                            }}
                            valueLabelDisplay="on"
                            valueLabelFormat={value => `₹${value}`}
                            min={0}
                            max={1000}
                            sx={{
                              color: "#593039",
                              "& .MuiSlider-thumb": { backgroundColor: "#593039" },
                              "& .MuiSlider-track": { backgroundColor: "#593039" },
                              "& .MuiSlider-rail": { backgroundColor: "#593039" },
                              "& .MuiSlider-valueLabel": {
                                backgroundColor: "#593039",
                                color: "#fff",
                                "&::before": { backgroundColor: "#593039" },
                              },
                            }}
                          />
                        </Box>,
                        showSections.Price,
                        () => toggleSection('Price')
                    )}

                    {/* Product Categories */}
                    {renderSection(
                        'Product Categories',
                        (() => {
                          // Collect all subcategories in a Set to deduplicate
                          const subcategorySet = new Set();
                          categoryData.forEach(parent => {
                            (parent.subCategories || []).forEach(sub => {
                              if (sub.subCategory && sub.subCategory.trim() !== '') {
                                subcategorySet.add(sub.subCategory);
                              }
                            });
                          });
                          return Array.from(subcategorySet).map(subCategory => (
                            <div key={subCategory} className="flex items-center space-x-2 text-sm" style={{marginBottom:"0.5rem"}}>
                              <input
                                type="checkbox"
                                id={`subcategory-${subCategory}`}
                                value={subCategory}
                                checked={selectedProductCategories.includes(subCategory)}
                                onChange={e => handleCheckboxChange(e, 'productCategories')}
                              />
                              <label htmlFor={`subcategory-${subCategory}`}>{subCategory}</label>
                            </div>
                          ));
                        })(),
                        showSections.Product,
                        () => toggleSection('Product')
                    )}

                    {/* Chakra */}
                    {renderSection(
                        'Chakra',
                        availableChakra.length ? (
                            availableChakra.map((chakra) => (
                                <div key={chakra} className="flex items-center space-x-2 text-sm">
                                    <input
                                        type="checkbox"
                                        id={`${chakra}1`}
                                        value={chakra}
                                        checked={selectedChakra.includes(chakra)}
                                        onChange={(e) => handleCheckboxChange(e, 'chakra')}
                                    />
                                    <label htmlFor={chakra + "1"}>{chakra}</label>
                                </div>
                            ))
                        ) : (
                            <p className="text-sm text-gray-500">Loading...</p>
                        ),
                        showSections.Chakra,
                        () => toggleSection('Chakra')
                    )}

                    {/* Intents */}
                    {renderSection(
                        'Intent',
                        availableIntents.length ? (
                            availableIntents.map((intent) => (
                                <div key={intent} className="flex items-center space-x-2 text-sm">
                                    <input
                                        type="checkbox"
                                        id={intent + '1'}
                                        value={intent}
                                        checked={selectedIntents.includes(intent)}
                                        onChange={(e) => handleCheckboxChange(e, 'intents')}
                                    />
                                    <label htmlFor={intent + "1"}>{intent}</label>
                                </div>
                            ))
                        ) : (
                            <p className="text-sm text-gray-500">Loading...</p>
                        ),
                        showSections.Intent,
                        () => toggleSection('Intent')
                    )}

                    {/* Rating */}
                    {renderSection(
                        'Rating',
                        <select
                            name="rating"
                            id="rating"
                            value={localRating}
                            onChange={(e) => setLocalRating(e.target.value)}
                            className="w-full p-1 border rounded text-sm"
                        >
                            <option value="">Select Rating</option>
                            <option value="1">1 and up</option>
                            <option value="2">2 and up</option>
                            <option value="3">3 and up</option>
                            <option value="4">4 and up</option>
                        </select>,
                        showSections.Rating,
                        () => toggleSection('Rating')
                    )}

                    {/* Apply Button */}
                    <div
                        className="text-white text-center bg-[#4a001f] !py-3 font-semibold cursor-pointer"
                        onClick={handleApply}
                    >
                        Apply
                    </div>
                </div>
            )}
        </div>
    );
};

export default PopupFilter;
