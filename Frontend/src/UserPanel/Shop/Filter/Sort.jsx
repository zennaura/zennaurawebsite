import React, { useState, useRef, useEffect } from "react";
import { FaSortAmountDown } from "react-icons/fa";

const SortDropdown = ({ sortOption, setSortOption }) => {
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef(null);

    const options = [
        { label: "Price: Low to High", value: "price-low-high" },
        { label: "Price: High to Low", value: "price-high-low" },
        { label: "Most Liked", value: "most-liked" },
        { label: "Most Reviewed", value: "most-reviewed" },
    ];

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="relative inline-block text-left" ref={dropdownRef}>
            <button
                onClick={() => setOpen((prev) => !prev)}
                className="flex justify-center items-center gap-4 bg-[#4a001f] text-white !px-4 !py-2 rounded"
                style={{width:"45vw"}}
            >
                <FaSortAmountDown className="text-sm" />
                Sort
            </button>

            {open && (
                <div className="absolute bottom-12 z-10 mt-2 bg-white border border-gray-200 rounded shadow-md" style={{width:"100vw",marginLeft:"-0.6rem"}}>
                    <div className="bg-gray-100 !px-3 !py-2 text-gray-800 font-semibold rounded-t">
                        Sort
                    </div>
                    <ul className="divide-y divide-gray-200">
                        {options.map((option) => (
                            <li
                                key={option.value}
                                className={`!px-4 !py-2 cursor-pointer hover:bg-gray-100 ${sortOption === option.value ? "text-purple-600 font-semibold" : ""
                                    }`}
                                onClick={() => {
                                    setSortOption(option.value);
                                    setOpen(false); // Close dropdown on selection
                                }}
                            >
                                {option.label}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default SortDropdown;
