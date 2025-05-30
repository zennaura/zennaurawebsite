import React, { useState } from 'react';

const SearchDropdown = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative inline-block">
      <button
        onClick={() => setOpen(!open)}
        className="text-xl cursor-pointer"
      >
        🔍
      </button>

      {open && (
        <div className="absolute top-8 left-0 bg-white border rounded shadow p-2 z-50">
          <input
            type="text"
            placeholder="Search here..."
            className="border p-2 w-48"
          />
        </div>
      )}
    </div>
  );
};

export default SearchDropdown;
