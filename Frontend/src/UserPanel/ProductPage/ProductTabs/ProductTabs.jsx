import React, { useEffect, useState } from "react";
import "./ProductTabs.css"; // Optional external CSS

// Customizable text splitter function with multiple delimiters support
const extractBulletPoints = (text, options = {}) => {
  const {
    delimiters = ["\n"], // Array of delimiters or single delimiter
    preserveEmpty = false, // Keep empty strings
    preserveSpacing = true, // Preserve exact spacing (leading/trailing whitespace)
    trimMode = "none", // 'none', 'end', 'start', 'both'
    filter = null, // Custom filter function
    minLength = 0, // Minimum length to keep
    maxLength = Infinity, // Maximum length to keep
  } = options;

  if (!text) return [];

  let result = [text];

  // Handle multiple delimiters
  const delimiterArray = Array.isArray(delimiters) ? delimiters : [delimiters];

  // Split by each delimiter sequentially
  delimiterArray.forEach((delimiter) => {
    result = result.flatMap((item) => {
      if (typeof delimiter === "string") {
        return item.split(delimiter);
      } else if (delimiter instanceof RegExp) {
        return item.split(delimiter);
      }
      return [item];
    });
  });

  // Apply trimming based on mode (only if preserveSpacing is false)
  if (!preserveSpacing) {
    switch (trimMode) {
      case "both":
        result = result.map((item) => item.trim());
        break;
      case "start":
        result = result.map((item) => item.trimStart());
        break;
      case "end":
        result = result.map((item) => item.trimEnd());
        break;
      case "none":
      default:
        // Don't trim anything
        break;
    }
  }

  // Filter empty strings unless preserveEmpty is true
  if (!preserveEmpty) {
    result = result.filter((item) => {
      // If preserveSpacing is true, only filter completely empty strings
      // If preserveSpacing is false, filter both empty and whitespace-only strings
      return preserveSpacing ? item.length > 0 : item.trim().length > 0;
    });
  }

  // Apply length filters
  result = result.filter(
    (item) => item.length >= minLength && item.length <= maxLength
  );

  // Apply custom filter if provided
  if (filter && typeof filter === "function") {
    result = result.filter(filter);
  }

  return result;
};

const ProductTabs = ({ productDescriptions, specifications, healingImage,  healingProperties }) => {
  const [activeTab, setActiveTab] = useState("description");
  // const title = productDescriptions?.title;
  const bulletPoints = extractBulletPoints(productDescriptions?.title, {
    delimiters: ["\n", "|", ";"], // Multiple delimiters - splits by newline, pipe, and semicolon
    preserveSpacing: true, // Preserves exact spacing (3-4 spaces will remain as is)
    preserveEmpty: false, // Set to true to keep empty lines
    minLength: 1, // Minimum character length to keep
    // trimMode: 'end',            // Options: 'none', 'start', 'end', 'both' (only works when preserveSpacing: false)
    // filter: item => item.startsWith('•') || item.startsWith('-'), // Uncomment for custom filtering
  });
  useEffect(
    () => console.log("product des", productDescriptions),
    [productDescriptions]
  );

   const [content, setContent] = useState({
      topLeft: {
        icon: '🎭',
        title: 'Balances emotional energy and calms the nervous system'
      },
      topRight: {
        icon: '✨',
        title: 'Dispels negative energy and soothes emotional trauma'
      },
      bottomLeft: {
        icon: '🧠',
        title: 'Promotes clarity of mind and heartfelt communication'
      },
      bottomRight: {
        icon: '👁️',
        title: 'Enhances intuition and feminine energy flow'
      }
    });
  
  return (
    <div className="product-tabs-container">
      {/* Tab Headers */}
      <div className="tabs-header">
        <button
          id="product-description"
          className={`tab-button ${
            activeTab === "description" ? "active" : ""
          }`}
          onClick={() => setActiveTab("description")}
        >
          Product Description
        </button>
        <button
          className={`tab-button ${
            activeTab === "specification" ? "active" : ""
          }`}
          onClick={() => setActiveTab("specification")}
        >
          Product Specification
        </button>
        <button
          className={`tab-button ${activeTab === "healing" ? "active" : ""}`}
          onClick={() => setActiveTab("healing")}
        >
          Healing Properties
        </button>
      </div>

      {/* Tab Content */}
      <div className="tab-contents">
        {activeTab === "description" && productDescriptions && (
          <div
            className="product-tab-description"
            style={{ whiteSpace: "pre-wrap", wordWrap: "break-word" }}
          >
            {productDescriptions?.title?.split("\n").map((line, idx) => (
              <React.Fragment key={idx}>
                {line}
                <br />
              </React.Fragment>
            ))}
            {/* <ul>
              <li>{productDescriptions?.title}</li>
        {bulletPoints.map((point, index) => (
          <li key={index} style={{ whiteSpace: 'pre-wrap' }}>{point}</li>
        ))}
      </ul> */}
            {/* <img className="descriptionproduct" style={{border:"none",outline:"none"}} src={productDescriptions.image} alt="" /> */}
          </div>
        )}

        {activeTab === "specification" && specifications && (
          <div className="productTab-specification">
            <ul>
              <li>
                <b>SKU:</b> <span>{specifications.color || "N/A"}</span>
              </li>
              <li>
                <b>Size:</b>{" "}
                <span>{specifications.size || "N/A"}</span>
              </li>
              <li>
                <b>Product Type:</b> <span>{specifications.productType || "N/A"}</span>
              </li>
              <li>
                <b>Material:</b> <span>{specifications.material || "N/A"}</span>
              </li>
              <li>
                <b>Weight:</b> <span>{specifications.weight || "N/A"}</span>
              </li>
              <li>
                <b>Packaging:</b>{" "}
                <span>{specifications.packaging || "N/A"}</span>
              </li>
            </ul>
          </div>
        )}

        {activeTab === "healing" && healingImage && (
          <div className="product-tab-healing">
            {/* <img src={healingImage} alt="Healing properties" /> */}
            <div className="!max-w-8xl mx-auto">
        <div className="grid grid-cols-2 gap-1 bg-gray-800 p-1 rounded-lg mb-8">
          {/* Top Left */}
          <div className="bg-white p-12 rounded-tl-lg flex flex-col items-center justify-center text-center min-h-50">
            {/* <div className="text-6xl mb-6">{content.topLeft.icon}</div> */}
            <p className="text-lg text-gray-800 leading-relaxed max-w-xs !pr-5">
              {healingProperties?.first || " "}
            </p>
          </div>
          
          {/* Top Right */}
          <div className="bg-white p-12 rounded-tr-lg flex flex-col items-center justify-center text-center min-h-50">
            {/* <div className="text-6xl mb-6">{content.topRight.icon}</div> */}
            <p className="text-lg text-gray-800 leading-relaxed max-w-xs !pl-5">
              {healingProperties?.second || " "}
            </p>
          </div>
          
          {/* Bottom Left */}
          <div className="bg-white p-12 rounded-bl-lg flex flex-col items-center justify-center text-center min-h-50">
            {/* <div className="text-6xl mb-6">{content.bottomLeft.icon}</div> */}
            <p className="text-lg text-gray-800 leading-relaxed max-w-xs !pr-5">
              {healingProperties?.third || " "}
            </p>
          </div>
          
          {/* Bottom Right */}
          <div className="bg-white p-12 rounded-br-lg flex flex-col items-center justify-center text-center min-h-50">
            {/* <div className="text-6xl mb-6">{content.bottomRight.icon}</div> */}
            <p className="text-lg text-gray-800 leading-relaxed max-w-xs !pl-5">
              {healingProperties?.fourth || " "}
            </p>
          </div>
              </div>
              </div>
        
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductTabs;
