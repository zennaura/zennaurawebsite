import React, { useState } from "react";
import axios from "axios";
import ImageHead from "../../components/ImageHead/ImageHead";
import { useUser } from "../../components/AuthContext/AuthContext";
import { useLocation, useNavigate } from "react-router-dom";

const CheckoutPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { products = [] } = location.state || {};
  const { user } = useUser();

  // Initialize quantities from products
  const [quantities, setQuantities] = useState(
    products.reduce((acc, product) => {
      acc[product._id] = product.quantity || 1;
      return acc;
    }, {})
  );

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  // Address Fields
  const [selectedAddressId, setSelectedAddressId] = useState(user?.Address?.[0]?._id || "");
  const [country, setCountry] = useState(user?.Address?.[0]?.country || "");
  const [city, setCity] = useState(user?.Address?.[0]?.city || "");
  const [state, setState] = useState(user?.Address?.[0]?.state || "");
  const [postalCode, setPostalCode] = useState(user?.Address?.[0]?.zipCode || "");
  const [address, setAddress] = useState(user?.Address?.[0]?.addressLine1 || "");

  const [showAllAddresses, setShowAllAddresses] = useState(false);

  if (!products.length) {
    return (
      <div className="flex items-center justify-center h-screen">
        <h2 className="text-xl font-semibold">No product data found. Please go back and select products.</h2>
      </div>
    );
  }

  // Calculate order totals
  const subtotal = products.reduce(
    (acc, product) => {
      const quantity = quantities[product._id] || 1;
      const price = Number(product.salePrice);
      return acc + (isNaN(price) ? 0 : price * quantity);
    },
    0
  );

  const shipping = 100;
  const total = subtotal + shipping;

  const handleAddressChange = (e) => {
    const addressId = e.target.value;
    setSelectedAddressId(addressId);

    const selectedAddress = user?.Address?.find((addr) => addr._id === addressId);
    if (selectedAddress) {
      setCountry(selectedAddress.country || "");
      setCity(selectedAddress.city || "");
      setState(selectedAddress.state || "");
      setPostalCode(selectedAddress.zipCode || "");
      setAddress(selectedAddress.addressLine1 || "");
    }
  };

  const handleQuantityChange = (productId, newQuantity) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [productId]: Math.max(1, newQuantity),
    }));
  };

  const handlePlaceOrder = async () => {
    if (!address || !city || !state || !country || !postalCode) {
      setError("Please fill all shipping address fields");
      return;
    }
  
    setIsSubmitting(true);
    setError(null);
  
    try {
      if (!products || products.length === 0) {
        throw new Error("Your cart is empty");
      }
  
      const orderItems = products.map(product => {
        if (!product._id) {
          throw new Error(`Product ${product.name} has no ID`);
        }
  
        const quantity = Number(quantities[product._id] || 1);
        if (isNaN(quantity)) {  // Fixed: Added missing closing parenthesis
          throw new Error(`Invalid quantity for ${product.name}`);
        }
        if (quantity < 1) {
          throw new Error(`Quantity must be at least 1 for ${product.name}`);
        }
  
        const price = Number(product.salePrice);
        if (isNaN(price)) {
          throw new Error(`Invalid price for ${product.name}`);
        }
        if (price <= 0) {
          throw new Error(`Price must be positive for ${product.name}`);
        }
  
        return {
          product: product._id,
          quantity: quantity,
          price: price
        };
      });
  
      if (!user?._id) {
        throw new Error("User not authenticated");
      }
  
      const orderData = {
        user: user._id,
        orderItems,
        shippingAddress: `${address}, ${city}, ${state}, ${country}, ${postalCode}`,
        paymentMethod: "COD",
        totalAmount: parseFloat(total.toFixed(2))
      };
  
      const response = await axios.post(
        "http://localhost:5000/api/userorder/placeorder",
        orderData,
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
  
      if (!response.data.success) {
        throw new Error(response.data.message || "Order failed");
      }
  
      navigate("/thankyou-page", {
        state: {
          orderId: response.data.order._id,
          total: total
        }
      });
  
    } catch (error) {
      console.error("Order error:", error);
      setError(
        error.response?.data?.message || 
        error.message || 
        "Failed to place order. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // ... (rest of your JSX remains exactly the same)
  return (
    <>
      <ImageHead Title="Checkout" />
      <div className="checkout-page-container flex flex-col md:flex-row justify-between p-4 md:p-8 bg-gray-100 min-h-screen">
        
        {/* Left Section */}
        <div className="checkout-page-left w-full md:w-2/3 space-y-6 md:space-y-8">
          
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}

          {/* Contact Details */}
          <div className="checkout-page-contact bg-white p-4 md:p-6 rounded-lg shadow-sm">
            <h2 className="checkout-page-title text-xl md:text-2xl font-semibold mb-4 md:mb-6">Contact Details</h2>
            <div className="checkout-page-grid grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
              <input type="text" value={user.firstName || ""} placeholder="First Name" readOnly className="checkout-page-input border-b outline-none p-2 bg-transparent" />
              <input type="text" value={user.lastName || ""} placeholder="Last Name" readOnly className="checkout-page-input border-b outline-none p-2 bg-transparent" />
              <input type="email" value={user.email || ""} placeholder="Email" readOnly className="checkout-page-input border-b outline-none p-2 bg-transparent" />
              <input type="tel" value={user.phone || ""} placeholder="Phone" readOnly className="checkout-page-input border-b outline-none p-2 bg-transparent" />
            </div>
          </div>

          {/* Shipping Address */}
          <div className="checkout-page-shipping bg-white p-4 md:p-6 rounded-lg shadow-sm">
            <div className="flex justify-between items-center">
              <h2 className="checkout-page-title text-xl md:text-2xl font-semibold mb-4 md:mb-6">Shipping Address</h2>
              <button 
                onClick={() => setShowAllAddresses(!showAllAddresses)}
                className="text-sm md:text-base text-blue-500 underline"
              >
                {showAllAddresses ? "Hide All Addresses" : "Show All Addresses"}
              </button>
            </div>

            {/* Address Dropdown */}
            {user?.Address?.length > 0 && (
              <div className="mb-4">
                <label className="block mb-2 font-medium text-gray-700">Select Address</label>
                <select
                  value={selectedAddressId}
                  onChange={handleAddressChange}
                  className="checkout-page-input border p-2 w-full rounded-md"
                >
                  {user.Address.map((addr) => (
                    <option key={addr._id} value={addr._id}>
                      {addr.addressLine1}, {addr.city}, {addr.state}, {addr.country}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Editable Address Fields */}
            <div className="checkout-page-grid grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
              <input 
                type="text" 
                placeholder="Country/Region" 
                className="checkout-page-input border-b outline-none p-2 bg-transparent"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                required
              />
              <input 
                type="text" 
                placeholder="City"
                className="checkout-page-input border-b outline-none p-2 bg-transparent"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
              />
              <input 
                type="text" 
                placeholder="State"
                className="checkout-page-input border-b outline-none p-2 bg-transparent"
                value={state}
                onChange={(e) => setState(e.target.value)}
                required
              />
              <input 
                type="text"
                placeholder="Postal Code"
                className="checkout-page-input border-b outline-none p-2 bg-transparent"
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
                required
              />
              <input 
                type="text"
                placeholder="Address"
                className="checkout-page-input border-b outline-none p-2 bg-transparent"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
            </div>

            {/* Show All Addresses */}
            {showAllAddresses && (
              <div className="mt-6 space-y-4">
                {user.Address.map((addr) => (
                  <div key={addr._id} className="p-4 bg-gray-50 rounded shadow">
                    <p><strong>Country:</strong> {addr.country}</p>
                    <p><strong>City:</strong> {addr.city}</p>
                    <p><strong>State:</strong> {addr.state}</p>
                    <p><strong>Postal Code:</strong> {addr.zipCode}</p>
                    <p><strong>Address:</strong> {addr.addressLine1}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Place Order Button */}
          <div className="checkout-page-payment-button mt-6 md:mt-8">
            <button
              onClick={handlePlaceOrder}
              disabled={isSubmitting}
              className={`w-full border-2 border-[#45040F] text-[#45040F] py-3 md:py-4 text-lg font-semibold rounded-md hover:bg-[#45040F] hover:text-white transition ${
                isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {isSubmitting ? 'Processing...' : 'Place Order'}
            </button>
            <div className="checkout-page-back mt-3 md:mt-4 text-center">
              <a href="/cart" className="text-[#45040F] underline">BACK TO SHOPPING CART</a>
            </div>
          </div>

        </div>

        {/* Right Section - Order Summary */}
        <div className="checkout-page-right w-full md:w-1/3 bg-white p-4 md:p-6 rounded-lg shadow-sm mt-6 md:mt-0">
          <div className="checkout-page-order-summary space-y-4 md:space-y-6">
            <div className="checkout-page-order-title flex justify-between items-center border-b pb-2">
              <h3 className="text-base md:text-lg font-semibold">Your Order</h3>
              <a href="/cart" className="text-sm underline">Edit cart</a>
            </div>

            {/* Order Items */}
            {products.map((product) => (
              <div key={`${product._id}-${product.variantId || 'default'}`} className="checkout-page-item flex items-center gap-3 md:gap-4">
                <img
                  src={product.frontImage}
                  alt={product.name}
                  className="checkout-page-image bg-gray-200 h-14 md:h-16 w-14 md:w-16 object-cover rounded"
                />
                <div className="checkout-page-details flex flex-col">
                  <p className="font-medium text-sm md:text-base">{product.name}</p>
                  <p className="text-xs md:text-sm text-gray-500">{product.size}</p>
                  <select
                    className="checkout-page-quantity mt-1 border p-1 text-xs md:text-sm"
                    value={quantities[product._id]}
                    onChange={(e) => handleQuantityChange(product._id, Number(e.target.value))}
                  >
                    {[...Array(Math.min(10, product.stock || 10)).keys()].map((i) => (
                      <option key={i + 1} value={i + 1}>
                        {i + 1}
                      </option>
                    ))}
                  </select>
                </div>
                <p className="checkout-page-price ml-auto font-medium text-sm md:text-base">₹{product.salePrice}</p>
              </div>
            ))}

            {/* Pricing Summary */}
            <div className="checkout-page-pricing space-y-2 pt-4 md:pt-6 border-t">
              <div className="flex justify-between text-sm md:text-base">
                <p>Subtotal</p>
                <p>₹{subtotal.toFixed(2)}</p>
              </div>
              <div className="flex justify-between text-sm md:text-base">
                <p>Shipping</p>
                <p>₹{shipping.toFixed(2)}</p>
              </div>
              <div className="flex justify-between font-semibold pt-2 border-t text-sm md:text-base">
                <p>Total</p>
                <p>₹{total.toFixed(2)}</p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </>
  );
};

export default CheckoutPage;