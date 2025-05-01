import React from 'react';
import './MobileFilterControls.css'; // New CSS file for mobile controls

const MobileFilterControls = () => {
  const [showDropdown, setShowDropdown] = React.useState(false);

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

        <select className="mobile-sort-select" aria-label="Sort products">
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
            {/* Filter Categories */}
            <div className="filter-category">
              <span>Colour</span>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M6.66667 12H9.33333V10.6667H6.66667V12ZM2 4V5.33333H14V4H2ZM4 8.66667H12V7.33333H4V8.66667Z" fill="#666" />
              </svg>
            </div>
            <hr />
            <div className="filter-category">
              <span>Badge</span>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M6.66667 12H9.33333V10.6667H6.66667V12ZM2 4V5.33333H14V4H2ZM4 8.66667H12V7.33333H4V8.66667Z" fill="#666" />
              </svg>
            </div>
            <hr />
            <div className="filter-category">
              <span>Price</span>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M6.66667 12H9.33333V10.6667H6.66667V12ZM2 4V5.33333H14V4H2ZM4 8.66667H12V7.33333H4V8.66667Z" fill="#666" />
              </svg>
            </div>
            <hr />
            <div className="filter-category">
              <span>Gender</span>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M6.66667 12H9.33333V10.6667H6.66667V12ZM2 4V5.33333H14V4H2ZM4 8.66667H12V7.33333H4V8.66667Z" fill="#666" />
              </svg>
            </div>
            <hr />
            <div className="filter-category">
              <span>Category</span>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M6.66667 12H9.33333V10.6667H6.66667V12ZM2 4V5.33333H14V4H2ZM4 8.66667H12V7.33333H4V8.66667Z" fill="#666" />
              </svg>
            </div>

            {/* Apply Button */}
            <div className="apply-button">
              <button>Apply (1)</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MobileFilterControls;