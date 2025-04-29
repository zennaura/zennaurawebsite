import React, { useState } from "react";
import "./ProductTabs.css"; // Optional external CSS

const ProductTabs = ({ productDescriptions, specifications, healingImage }) => {
    const [activeTab, setActiveTab] = useState("description");
  
    return (
      <div className="product-tabs-container">
        {/* Tab Headers */}
        <div className="tabs-header">
          <button
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
        <div className="tab-content">
          {activeTab === "description" && productDescriptions && (
            <div className="product-tab-description">
              <h3>Product Description</h3>
              <p>{productDescriptions.title}</p>
              <img className="descriptionproduct" src={productDescriptions.image} alt="" />
            </div>
          )}
  
          {activeTab === "specification" && specifications && (
            <div className="productTab-specification">
              <ul>
                <li>Material: <span>{specifications.material || 'N/A'}</span></li>
                <li>productType: <span>{specifications.productType || 'N/A'}</span></li>
                <li>size: <span>{specifications.size || 'N/A'}</span></li>
                <li>color: <span>{specifications.color || 'N/A'}</span></li>
                <li>bead Size: <span>{specifications.beadSize || 'N/A'}</span></li>
                <li>weight: <span>{specifications.weight || 'N/A'}</span></li>
                <li>packaging: <span>{specifications.packaging || 'N/A'}</span></li>
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
