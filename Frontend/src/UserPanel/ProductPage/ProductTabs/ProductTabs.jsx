import React, { useEffect, useState } from "react";
import "./ProductTabs.css"; // Optional external CSS

const ProductTabs = ({ productDescriptions, specifications, healingImage }) => {
  const [activeTab, setActiveTab] = useState("description");
  // const title = productDescriptions?.title;
  const bulletPoints = productDescriptions?.title.split('\n').filter(Boolean);
 useEffect(() =>  console.log("product des", productDescriptions), [productDescriptions])
 
  return (
    <div className="product-tabs-container">
      {/* Tab Headers */}
      <div className="tabs-header">
        <button
          id="product-description"
          className={`tab-button ${activeTab === "description" ? "active" : ""}`}
          onClick={() => setActiveTab("description")}
        >
          Product Description
        </button>
        <button
          className={`tab-button ${activeTab === "specification" ? "active" : ""}`}
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
          <div className="product-tab-description">
            <ul>
              {/* <li>{title}</li> */}
        {bulletPoints.map((point, index) => (
          <li key={index}>{point.trim()}</li>
        ))}
      </ul>
            {/* <img className="descriptionproduct" style={{border:"none",outline:"none"}} src={productDescriptions.image} alt="" /> */}
          </div>
        )}

        {activeTab === "specification" && specifications && (
          <div className="productTab-specification">
            <ul>
              <li><b>Material:</b> <span>{specifications.material || 'N/A'}</span></li>
              <li><b>Product Type:</b> <span>{specifications.productType || 'N/A'}</span></li>
              <li><b>Size:</b> <span>{specifications.size || 'N/A'}</span></li>
              <li><b>Color:</b> <span>{specifications.color || 'N/A'}</span></li>
              <li><b>Bead Size:</b> <span>{specifications.beadSize || 'N/A'}</span></li>
              <li><b>Weight:</b> <span>{specifications.weight || 'N/A'}</span></li>
              <li><b>Packaging:</b> <span>{specifications.packaging || 'N/A'}</span></li>
            </ul>

          </div>
        )}

        {activeTab === "healing" && healingImage && (
          <div className="product-tab-healing">
            <img src={healingImage} alt="Healing properties" />
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductTabs;
