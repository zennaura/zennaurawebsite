import React, { useState } from "react";
import "./ShippingInfo.css"; // We'll create this CSS file

const ShippingTabs = () => {
    const [activeTab, setActiveTab] = useState("domestic");

    return (
        <div className="shipping-tabs-container">
            {/* Tab Headers */}
            <div className="tabs-header">
                <button
                    className={`tab-button ${activeTab === "domestic" ? "active" : ""}`}
                    onClick={() => setActiveTab("domestic")}
                >
                    Domestic Shipping
                </button>
                <button
                    className={`tab-button ${activeTab === "international" ? "active" : ""}`}
                    onClick={() => setActiveTab("international")}
                >
                    International Shipping
                </button>
                <button
                    className={`tab-button ${activeTab === "returns" ? "active" : ""}`}
                    onClick={() => setActiveTab("returns")}
                >
                    Return Policy
                </button>
            </div>

            {/* Tab Content */}
            <div className="tab-content">
                {activeTab === "domestic" && (
                    <div className="shipping-tab-content">

                        <div className="shipping-table-container">
                            <h3>Orders Are Shipped Via One Of The Best Shipping Providers:</h3>
                            <div className="shipping-costs-container">
                                <div className="shipping-costs-row-header">
                                    <h2 className="shipping-costs-heading">SHIPPING COSTS</h2>
                                    <h2 className="shipping-costs-heading">CASH ON DELIVERY (COD)</h2>
                                </div>

                                <div className="shipping-costs-row">
                                    <div className="shipping-costs-cell">
                                        <p>PREPAID SHIPPING</p>
                                    </div>
                                    <div className="shipping-costs-cell">
                                        <p>Orders Below ₹999: ₹120</p>
                                    </div>
                                </div>

                                <div className="shipping-costs-row">
                                    <div className="shipping-costs-cell">
                                        <p>Orders Below ₹999: ₹70</p>
                                    </div>
                                    <div className="shipping-costs-cell">
                                        <p>Orders Above ₹999: ₹50</p>
                                    </div>
                                </div>

                                <div className="shipping-costs-row">
                                    <div className="shipping-costs-cell">
                                        <p>Orders Above ₹999: FREE</p>
                                    </div>
                                    <div className="shipping-costs-cell">
                                        <p></p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="delivery-time-info">
                            <h3>ESTIMATED DELIVERY TIME</h3>
                            <p>Please Allow Up To 1-2 Working Days For Order Processing.</p>

                            <ul className="delivery-times">
                                <li>Metro Cities – 2–5 Days After Dispatch</li>
                                <li>Other Cities – 2–6 Days After Dispatch</li>
                            </ul>

                            <p className="disclaimer">
                                These Are Estimated Delivery Times Please Note That Your Parcel Can Take More Or Less Time To Deliver.
                            </p>
                        </div>
                    </div>
                )}


                {activeTab === "international" && (
                    <div className="shipping-tab-content">
                        <h3>International Orders Are Shipped Via One Of The Following Shipping Providers:</h3>
                        <ul className="shipping-providers">
                            <li>FedEx</li>
                            <li>ARAMEX INTERNATIONAL</li>
                            <li>Srx Premium</li>
                            <li>Coming Up With More Shipping Providers Soon</li>
                        </ul>

                        <h4>Estimated Delivery Time</h4>
                        <p>
                            <strong>Express (Aramex International, FedEx, or Srx Premium)</strong> –
                            4–12 Business Days After Dispatch
                        </p>
                        <p>
                            Exact Shipping Charges Are Calculated At Checkout Based On Your Country.
                        </p>
                    </div>
                )}

                {activeTab === "returns" && (
                    <div className="shipping-tab-content">
                        <h3>Return Policy</h3>
                        <p>Our return policy details will be displayed here.</p>
                        <ul>
                            <li>30-day return policy</li>
                            <li>Items must be unused and in original packaging</li>
                            <li>Customer pays return shipping</li>
                            <li>Refunds processed within 5 business days of receipt</li>
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ShippingTabs;