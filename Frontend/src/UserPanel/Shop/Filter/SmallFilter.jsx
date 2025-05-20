import React, { useState, useEffect, useRef } from 'react';
import { FaChevronUp, FaChevronDown } from 'react-icons/fa';
import { FaFilter } from "react-icons/fa";

const PopupFilter = ({
    productCategories,
    concerns,
    intents,
    onFilterChange,
    autoCheck = [],
}) => {
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(100);
    const [rating, setRating] = useState('');
    const [categoryData, setCategoryData] = useState([]);
    const [availableConcerns, setAvailableConcerns] = useState([]);
    const [availableIntents, setAvailableIntents] = useState([]);
    const [selectedProductCategories, setSelectedProductCategories] = useState([]);
    const [selectedConcerns, setSelectedConcerns] = useState([]);
    const [selectedIntents, setSelectedIntents] = useState([]);
    const [isOpen, setIsOpen] = useState(false);

    const prevAutoCheckRef = useRef([]);

    useEffect(() => {
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
                const res = await fetch('http://localhost:5000/api/concerns');
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
            onFilterChange?.(type, value);
        };

        if (type === 'productCategories') {
            updateState(selectedProductCategories, setSelectedProductCategories);
        } else if (type === 'concerns') {
            updateState(selectedConcerns, setSelectedConcerns);
        } else if (type === 'intents') {
            updateState(selectedIntents, setSelectedIntents);
        }
    };

    const handleApply = () => {
        setIsOpen(false);
    };

    const renderSection = (title, content, expanded, toggle) => (
        <div className="border-b border-gray-300">
            <div
                className="flex justify-between items-center px-4 py-2 cursor-pointer bg-gray-200 hover:bg-gray-300"
                onClick={toggle}
            >
                <span>{title}</span>
                <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center shadow-sm">
                    {expanded ? <FaChevronUp size={10} /> : <FaChevronDown size={10} />}
                </div>
            </div>
            {expanded && <div className="px-6 py-2 bg-white">{content}</div>}
        </div>
    );

    // Section toggles
    const [showSections, setShowSections] = useState({
        Price: true,
        Product: false,
        Concern: false,
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
                className="flex justify-center items-center gap-4 font-bold bg-[#4a001f] text-white px-4 py-2 rounded"
            >
                <FaFilter /> Filters
            </button>

            {isOpen && (
                <div className="absolute top-12 w-72 bg-gray-100 border border-gray-300 rounded shadow-lg z-10 -translate-x-35">
                    {/* Price Section */}
                    {renderSection(
                        'Price',
                        <div className="space-y-2 text-sm">
                            <div className="flex justify-between text-xs text-gray-600">
                                <span>₹{minPrice}</span>
                                <span>₹{maxPrice}</span>
                            </div>
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
                        </div>,
                        showSections.Price,
                        () => toggleSection('Price')
                    )}

                    {/* Product Categories */}
                    {renderSection(
                        'Product Categories',
                        categoryData.map((parent) =>
                            parent.subCategories.map((sub) =>
                                (sub.categories || []).map((category) => (
                                    <div key={`${sub.subCategory}-${category}`} className="flex items-center space-x-2 text-sm">
                                        <input
                                            type="checkbox"
                                            id={`${sub.subCategory}-${category}1`}
                                            value={sub.subCategory}
                                            checked={selectedProductCategories.includes(sub.subCategory)}
                                            onChange={(e) => handleCheckboxChange(e, 'productCategories')}
                                        />
                                        <label htmlFor={`${sub.subCategory}-${category}1`}>{sub.subCategory}</label>
                                    </div>
                                ))
                            )
                        ),
                        showSections.Product,
                        () => toggleSection('Product')
                    )}

                    {/* Concerns */}
                    {renderSection(
                        'Concern',
                        availableConcerns.length ? (
                            availableConcerns.map((concern) => (
                                <div key={concern} className="flex items-center space-x-2 text-sm">
                                    <input
                                        type="checkbox"
                                        id={`${concern}1`}
                                        value={concern}
                                        checked={selectedConcerns.includes(concern)}
                                        onChange={(e) => handleCheckboxChange(e, 'concerns')}
                                    />
                                    <label htmlFor={concern + "1"}>{concern}</label>
                                </div>
                            ))
                        ) : (
                            <p className="text-sm text-gray-500">Loading...</p>
                        ),
                        showSections.Concern,
                        () => toggleSection('Concern')
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
                            value={rating}
                            onChange={(e) => setRating(e.target.value)}
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
                        className="text-white text-center bg-[#4a001f] py-3 font-semibold cursor-pointer"
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
