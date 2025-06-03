import React, { useState } from "react";
import axios from "axios";
import ImageHead from "../../components/ImageHead/ImageHead";
import { useUser } from "../../components/AuthContext/AuthContext";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import noImage from "../../assests/noImage.png";


const CheckoutPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { products = [] } = location.state || {};
  const { user } = useUser();

  // Product quantities state
  const [quantities, setQuantities] = useState(
    products.reduce((acc, product) => {
      acc[product._id] = product.quantity || 1;
      return acc;
    }, {})
  );

  // Order processing states
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState(null);

  // Address states
  const [selectedAddressId, setSelectedAddressId] = useState(
    user?.Address?.[0]?._id || ""
  );
  const [country, setCountry] = useState(user?.Address?.[0]?.country || "");
  const [city, setCity] = useState(user?.Address?.[0]?.city || "");
  const [state, setState] = useState(user?.Address?.[0]?.state || "");
  const [postalCode, setPostalCode] = useState(user?.Address?.[0]?.zipCode || "");
  const [address, setAddress] = useState(user?.Address?.[0]?.addressLine1 || "");
  const [showAllAddresses, setShowAllAddresses] = useState(false);

  // Contact information states
  const [firstName, setFirstName] = useState(user?.firstName || "");
  const [lastName, setLastName] = useState(user?.lastName || "");
  const [email, setEmail] = useState(user?.email || "");
  const [phone, setPhone] = useState(user?.phone || "");

  // Coupon states
  const [couponCode, setCouponCode] = useState("");
  const [couponMessage, setCouponMessage] = useState("");
  const [isCheckingCoupon, setIsCheckingCoupon] = useState(false);
  const [appliedCoupon, setAppliedCoupon] = useState(null);

  // Early return if no products
  if (!products.length) {
    return (
      <div className="flex items-center justify-center h-screen">
        <h2 className="text-xl font-semibold">
          No product data found. Please go back and select products.
        </h2>
      </div>
    );
  }

  // Calculate order totals
  const subtotal = products.reduce((acc, product) => {
    const quantity = quantities[product._id] || 1;
    const price = Number((
                  product.salePrice +
                  (product.salePrice * product.tax) / 100 -
                  ((product.salePrice +
                    (product.salePrice * product.tax) / 100) *
                    product.discount) /
                    100
                ).toFixed(2)) || product.salePrice;
    return acc + (isNaN(price) ? 0 : price * quantity);
  }, 0);

  const shipping = 50;

  // Calculate discount based on percentage
  const calculateDiscount = () => {
    if (!appliedCoupon) return 0;

    const percentageDiscount = subtotal * (appliedCoupon.discount / 100);

    // Apply max discount if specified
    if (appliedCoupon.maxDiscount) {
      return Math.min(percentageDiscount, appliedCoupon.maxDiscount);
    }

    return percentageDiscount;
  };

  const discountAmount = calculateDiscount();
  const total = subtotal + shipping - discountAmount;

  // Handle coupon application
  const handleApplyCoupon = async () => {
    try {
      setCouponMessage("");
      setIsCheckingCoupon(true);

      if (!couponCode.trim()) {
        setCouponMessage("Please enter a coupon code");
        return;
      }

      if (!user?._id) {
        setCouponMessage("You need to login to use coupons");
        return;
      }

      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_LINK}/api/coupons/searchcoupon`,
        { params: { code: couponCode, userId: user._id } }
      );

      if (!response.data.isValid) {
        setCouponMessage(response.data.message || "Invalid coupon code");
        return;
      }

      if (response.data.alreadyUsed) {
        setCouponMessage("You have already used this coupon");
        return;
      }

      const coupon = response.data;
      const currentDate = new Date();
      const expiryDate = new Date(coupon.expiryDate);

      // Validate coupon
      if (currentDate > expiryDate) {
        setCouponMessage("This coupon has expired");
        return;
      }

      if (subtotal < (coupon.minOrder || 0)) {
        setCouponMessage(`Minimum order of ₹${coupon.minOrder} required`);
        return;
      }

      // Apply valid coupon
      setAppliedCoupon(coupon);
      setCouponMessage(
        `Coupon applied! You have got ${coupon.discount}% discount (Max ₹${coupon.maxDiscount || "No limit"})`
      );
    } catch (error) {
      console.error("Coupon validation error:", error);
      setCouponMessage(
        error.response?.data?.message ||
          error.message ||
          "Failed to validate coupon. Please try again."
      );
    } finally {
      setIsCheckingCoupon(false);
    }
  };

  // Remove applied coupon
  const handleRemoveCoupon = () => {
    setCouponCode("");
    setAppliedCoupon(null);
    setCouponMessage("");
  };

  // Handle address selection
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

  // Handle product quantity changes
  const handleQuantityChange = (productId, newQuantity) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [productId]: Math.max(1, newQuantity),
    }));
  };

  // Send order confirmation email
  const sendOrderConfirmationEmail = async () => {
    try {
      // Prepare the email message with order details
      const message = `
        <h2>Thank you for your order!</h2>
        <p>Dear ${firstName} ${lastName},</p>
        <p>You have successfully placed an order with the following details:</p>
        
        <h3>Order Summary:</h3>
        <ul>
          ${products
            .map(
              (product) => `
            <li>
              ${product.name} (${product.size || "Standard"}) - 
              Quantity: ${quantities[product._id] || 1} - 
              Price: ₹${(
                  product.salePrice +
                  (product.salePrice * product.tax) / 100 -
                  ((product.salePrice +
                    (product.salePrice * product.tax) / 100) *
                    product.discount) /
                    100
                ).toFixed(2)}
            </li>
          `
            )
            .join("")}
        </ul>
        
        <p><strong>Subtotal:</strong> ₹${subtotal.toFixed(2)}</p>
        ${
          appliedCoupon
            ? `<p><strong>Discount (${appliedCoupon.discount}%):</strong> -₹${discountAmount.toFixed(
                2
              )}</p>`
            : ""
        }
        <p><strong>Shipping:</strong> ₹${shipping.toFixed(2)}</p>
        <p><strong>Total Amount:</strong> ₹${total.toFixed(2)}</p>
        
        <h3>Shipping Address:</h3>
        <p>${address}, ${city}, ${state}, ${country}, ${postalCode}</p>
        
        <p>Thank you for shopping with us!</p>
      `;

      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_LINK}/api/email/sendMail`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            to: email,
            subject: `Order Confirmation - ${new Date().toLocaleDateString()}`,
            message: message,
          }),
        }
      );

      const data = await response.json();
      if (!data.success) {
        console.error("Order confirmation email failed:", data.message);
      }
    } catch (err) {
      console.error("Failed to send order confirmation email:", err);
    }
  };

  // Mark coupon as used
  const markCouponAsUsed = async () => {
    if (!appliedCoupon || !user?._id) return;

    try {
      await axios.put(
        `${import.meta.env.VITE_BACKEND_LINK}/api/coupons/use`,
        { code: appliedCoupon.code, userId: user._id }
      );
    } catch (error) {
      console.error("Failed to mark coupon as used:", error);
      // This shouldn't fail the order, just log the error
    }
  };

  // Handle order submission
  const handlePlaceOrder = async () => {
    // Validate all required fields
    const requiredFields = [
      { value: address, field: "Address" },
      { value: city, field: "City" },
      { value: state, field: "State" },
      { value: country, field: "Country" },
      { value: postalCode, field: "Postal Code" },
      { value: firstName, field: "First Name" },
      { value: lastName, field: "Last Name" },
      { value: email, field: "Email" },
      { value: phone, field: "Phone" },
    ];

    const missingField = requiredFields.find((field) => !field.value);
    if (missingField) {
      setError(`Please fill in the ${missingField.field} field`);
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address");
      return;
    }

    // Validate phone number
    if (phone.length < 10) {
      setError("Please enter a valid phone number");
      return;
    }

    // Validate products
    if (!products || products.length === 0) {
      setError("Your cart is empty");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      // Mark coupon as used if applied
      if (appliedCoupon && user?._id) {
        await markCouponAsUsed();
      }

      // Prepare order items
      const orderItems = products.map((product) => {
        if (!product?.productId || !product?._id ) throw new Error(`Product ${product.name} has no ID`);
        const quantity = Number(quantities[product._id] || 1);
        if (isNaN(quantity))
          throw new Error(`Invalid quantity for ${product.name}`);
        if (quantity < 1)
          throw new Error(`Quantity must be at least 1 for ${product.name}`);
        const price = Number(product.salePrice);
        if (isNaN(price) || price <= 0)
          throw new Error(`Invalid price for ${product.name}`);
        return {
          product: product._id || product.productId,
          quantity,
          price,
        };
      });

      // Prepare order data
      const orderData = {
        user: user?._id || null,
        guestUser: !user?._id
          ? {
              firstName,
              lastName,
              email,
              phone,
            }
          : null,
        orderItems,
        shippingAddress: `${address}, ${city}, ${state}, ${country}, ${postalCode}`,
        paymentMethod: "COD",
        subtotal: parseFloat(subtotal.toFixed(2)),
        shipping: parseFloat(shipping.toFixed(2)),
        discount: parseFloat(discountAmount.toFixed(2)),
        totalAmount: parseFloat(total.toFixed(2)),
        appliedCoupon: appliedCoupon ? couponCode : null,
        couponDetails: appliedCoupon
          ? {
              percentage: appliedCoupon.discount,
              maxDiscount: appliedCoupon.maxDiscount,
            }
          : null,
      };

      // Submit order
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_LINK}/api/userorder/placeorder`,
        orderData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.data.success) {
        throw new Error(response.data.message || "Order failed");
      }

      // Send order confirmation email
      await sendOrderConfirmationEmail();

      // Navigate to thank you page
      navigate("/thankyou-page", {
        state: {
          orderId: response.data.order._id,
          total: total,
          couponUsed: appliedCoupon ? couponCode : null,
          orderData
        },
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

  // Handle order submission
  const handlePayment = async () => {
    // Validate all required fields
    const requiredFields = [
      { value: address, field: "Address" },
      { value: city, field: "City" },
      { value: state, field: "State" },
      { value: country, field: "Country" },
      { value: postalCode, field: "Postal Code" },
      { value: firstName, field: "First Name" },
      { value: lastName, field: "Last Name" },
      { value: email, field: "Email" },
      { value: phone, field: "Phone" },
    ];

    const missingField = requiredFields.find((field) => !field.value);
    if (missingField) {
      setError(`Please fill in the ${missingField.field} field`);
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address");
      return;
    }

    // Validate phone number
    if (phone.length < 10) {
      setError("Please enter a valid phone number");
      return;
    }

    // Validate products
    if (!products || products.length === 0) {
      setError("Your cart is empty");
      return;
    }

    setIsSubmitted(true);
    setError(null);

    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onerror = () => {
      alert("Failed to load Razorpay SDK. Are you online?");
    };
    script.onload = async () => {
      // try {
        
      // } catch (error) {
      //   console.error("Payment error:", error);
      //   alert("Payment failed. Please try again.");
      // }
    };
    document.body.appendChild(script);
    setIsSubmitted(true)

    try {
      const result = await axios.post(
          `${import.meta.env.VITE_BACKEND_LINK}/api/payment/create-order`,
          {
            amount: total, // ₹500
          }
        );

        const { amount, id: order_id, currency } = result.data;

        const options = {
          key: "rzp_test_6Y9I9gygybVQZh", // Replace with your Razorpay Test Key
          amount: amount.toString(),
          currency,
          name: "Test Corp",
          description: "Test Payment",
          order_id,
          handler: function (response) {
            // alert("Payment successful! ID: " + response.razorpay_payment_id);
            
            navigate("/thankyou-page", {
              state: {
                paymentId: response.razorpay_payment_id,
                orderId: order_id,
                total: total,
              },
            });
            // You can verify payment on backend here
          },
          prefill: {
            name: "Test User",
            email: "test@example.com",
            contact: "9999999999",
          },
          theme: {
            color: "#3399cc",
          },
          
        };

        const razor = new window.Razorpay(options);
        razor.open();
      // Mark coupon as used if applied
      if (appliedCoupon && user?._id) {
        await markCouponAsUsed();
      }

      // Prepare order items
      const orderItems = products.map((product) => {
        if (!product._id || !product.productId) throw new Error(`Product ${product.name} has no ID`);
        const quantity = Number(quantities[product._id] || 1);
        if (isNaN(quantity))
          throw new Error(`Invalid quantity for ${product.name}`);
        if (quantity < 1)
          throw new Error(`Quantity must be at least 1 for ${product.name}`);
        const price = Number(product.salePrice);
        if (isNaN(price) || price <= 0)
          throw new Error(`Invalid price for ${product.name}`);
        return {
          product: product?.productId || product?._id,
          quantity,
          price,
        };
      });

      // Prepare order data
      const orderData = {
        user: user?._id || null,
        guestUser: !user?._id
          ? {
              firstName,
              lastName,
              email,
              phone,
            }
          : null,
        orderItems,
        shippingAddress: `${address}, ${city}, ${state}, ${country}, ${postalCode}`,
        paymentMethod: "UPI",
        subtotal: parseFloat(subtotal.toFixed(2)),
        shipping: parseFloat(shipping.toFixed(2)),
        discount: parseFloat(discountAmount.toFixed(2)),
        totalAmount: parseFloat(total.toFixed(2)),
        appliedCoupon: appliedCoupon ? couponCode : null,
        couponDetails: appliedCoupon
          ? {
              percentage: appliedCoupon.discount,
              maxDiscount: appliedCoupon.maxDiscount,
            }
          : null,
        
      };

      // Submit order
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_LINK}/api/userorder/placeorder`,
        orderData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.data.success) {
        throw new Error(response.data.message || "Order failed");
      }

      // Send order confirmation email
      await sendOrderConfirmationEmail();

      // Navigate to thank you page
      // navigate("/payment", {
      //   state: {
      //     products:products,
      //     orderId: response.data.order._id,
      //     total: total,
      //     couponUsed: appliedCoupon ? couponCode : null,
      //   },
      // });
    } catch (error) {
      console.error("Order error:", error);
      setError(
        error.response?.data?.message ||
          error.message ||
          "Failed to place order. Please try again."
      );
    } finally {
      setIsSubmitted(false);
    }
  };
  console.log("products", products[0]);

  return (
    <>
      <ImageHead Title="Checkout" />
      <div className="checkout-page-container flex flex-col md:flex-row justify-between !p-4 md:!p-8 bg-gray-100 min-h-screen">
        {/* Left Section - Contact and Shipping Info */}
        <div className="checkout-page-left w-full md:w-2/3 !space-y-6 md:space-y-8">
          {/* Error Display */}
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 !px-4 !py-3 rounded">
              {error}
            </div>
          )}

          {/* Contact Information Section */}
          <div className="checkout-page-contact bg-white p-4 md:!p-6 rounded-lg shadow-sm">
            <h2 className="text-xl md:!text-2xl font-semibold !mb-4 md:!mb-6">
              Contact Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 !gap-3 md:!gap-4">
              <div>
                <label className="block text-sm text-gray-500 !mb-1">
                  First Name
                </label>
                <input
                  type="text"
                  value={firstName}
                  className="w-full !border-b outline-none !p-2 bg-transparent"
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="block text-sm text-gray-500 !mb-1">
                  Last Name
                </label>
                <input
                  type="text"
                  value={lastName}
                  className="w-full border-b outline-none !p-2 bg-transparent"
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="block !text-sm text-gray-500 !mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  className="w-full border-b outline-none !p-2 bg-transparent"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="block text-sm text-gray-500 !mb-1">
                  Phone
                </label>
                <input
                  type="tel"
                  value={phone}
                  className="w-full border-b outline-none !p-2 bg-transparent"
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </div>
            </div>
          </div>

          {/* Shipping Address Section */}
          <div className="checkout-page-shipping bg-white !p-4 md:!p-6 rounded-lg shadow-sm">
            {user?.Address?.length > 0 ? (
              <>
                <div className="flex justify-between items-center">
                  <h2 className="!text-xl md:!text-2xl font-semibold !mb-4 md:!mb-6">
                    Shipping Address
                  </h2>
                  <button
                    onClick={() => setShowAllAddresses(!showAllAddresses)}
                    className="text-sm md:!text-base text-blue-500 underline"
                  >
                    {showAllAddresses ? "Hide All Addresses" : "Show All Addresses"}
                  </button>
                </div>

                <div className="mb-4">
                  <label className="block !mb-2 font-medium text-gray-700">
                    Select Address
                  </label>
                  <select
                    value={selectedAddressId}
                    onChange={handleAddressChange}
                    className="border !p-2 w-full rounded-md"
                  >
                    {user.Address.map((addr) => (
                      <option key={addr._id} value={addr._id}>
                        {addr.addressLine1}, {addr.city}, {addr.state}, {addr.country}
                      </option>
                    ))}
                  </select>
                </div>
              </>
            ) : (
              <h2 className="text-xl md:!text-2xl font-semibold !mb-4 md:!mb-6">
                Shipping Address
              </h2>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 !gap-3 md:gap-4">
              <div>
                <label className="block text-sm text-gray-500 !mb-1">
                  Country/Region
                </label>
                <input
                  type="text"
                  value={country}
                  className="w-full border-b outline-none !p-2 bg-transparent"
                  onChange={(e) => setCountry(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="block text-sm text-gray-500 !mb-1">
                  City
                </label>
                <input
                  type="text"
                  value={city}
                  className="w-full border-b outline-none !p-2 bg-transparent"
                  onChange={(e) => setCity(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="block text-sm text-gray-500 !mb-1">
                  State
                </label>
                <input
                  type="text"
                  value={state}
                  className="w-full border-b outline-none !p-2 bg-transparent"
                  onChange={(e) => setState(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="block text-sm text-gray-500 !mb-1">
                  Postal Code
                </label>
                <input
                  type="text"
                  value={postalCode}
                  className="w-full border-b outline-none !p-2 bg-transparent"
                  onChange={(e) => setPostalCode(e.target.value)}
                  required
                />
              </div>
              <div className="col-span-2">
                <label className="block text-sm text-gray-500 !mb-1">
                  Address
                </label>
                <input
                  type="text"
                  value={address}
                  className="w-full border-b outline-none !p-2 bg-transparent"
                  onChange={(e) => setAddress(e.target.value)}
                  required
                />
              </div>
            </div>

            {showAllAddresses && user?.Address && (
              <div className="!mt-6 !space-y-4">
                {user.Address.map((addr) => (
                  <div key={addr._id} className="!p-4 bg-gray-50 rounded shadow">
                    <p>
                      <strong>Country:</strong> {addr.country}
                    </p>
                    <p>
                      <strong>City:</strong> {addr.city}
                    </p>
                    <p>
                      <strong>State:</strong> {addr.state}
                    </p>
                    <p>
                      <strong>Postal Code:</strong> {addr.zipCode}
                    </p>
                    <p>
                      <strong>Address:</strong> {addr.addressLine1}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Place Order Button */}
         <div className="!mt-6 md:!mt-8">
  <button
    onClick={handlePayment}
    disabled={isSubmitted}
    className={`w-full border-2 border-[#45040F] text-[#45040F] !py-3 md:!py-4 !mb-2 text-lg font-semibold rounded-md hover:bg-[#45040F] cursor-pointer hover:text-white transition ${
      isSubmitted ? "opacity-50 cursor-not-allowed" : ""
    }`}
  >
    {isSubmitted ? "Processing..." : "Proceed to Payment"}
            </button>
            <button
    onClick={handlePlaceOrder}
    disabled={isSubmitting}
    className={`w-full border-2 border-[#45040F] text-[#45040F] !py-3 md:!py-4 text-lg font-semibold rounded-md hover:bg-[#45040F] cursor-pointer hover:text-white transition ${
      isSubmitting ? "opacity-50 cursor-not-allowed" : ""
    }`}
  >
    {isSubmitting ? "Processing..." : "Pay on Delivery"}
  </button>
  {error && (
    <p className="text-red-500 text-sm !mt-2 text-center">{error}</p>
  )}
  <div className="!mt-3 md:!mt-4 text-center">
    <a href="/cart" className="text-[#45040F] underline">
      BACK TO SHOPPING CART
    </a>
  </div>
         </div>
        </div>

        {/* Right Section - Order Summary */}
        <div className="w-full md:!w-1/3 bg-white !p-4 md:!p-6 rounded-lg shadow-sm !mt-6 md:!mt-0">
          <div className="space-y-4 md:space-y-6">
            <div className="flex justify-between items-center !border-b !pb-2" style={{paddingBottom:"0.2rem",marginBottom:"1rem"}}>
              <h3 className="text-base md:!text-lg font-semibold">Your Order</h3>
              <a href="/cart" className="text-sm underline">
                Edit cart
              </a>
            </div>

            {/* Coupon Code Section */}
            <div className="border-b !pb-4">
                  <div className="flex items-center gap-2 !mb-2">
                    <input
                      type="text"
                      value={couponCode}
                      placeholder="Enter coupon code"
                      className="flex-1 border !p-2 rounded-md"
                      onChange={(e) => setCouponCode(e.target.value)}
                      disabled={!!appliedCoupon}
                    />
                    {appliedCoupon ? (
                      <button
                        onClick={handleRemoveCoupon}
                        className="bg-red-500 text-white !px-4 !py-2 rounded-md hover:bg-red-600 transition"
                      >
                        Remove
                      </button>
                    ) : (
                      <button
                        onClick={handleApplyCoupon}
                        disabled={isCheckingCoupon || !user?._id}
                        className={`bg-[#45040F] text-white !px-4 !py-2 rounded-md hover:bg-[#5a0515] transition ${
                          isCheckingCoupon || !user?._id ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                      >
                        {isCheckingCoupon ? "Checking..." : "Apply"}
                      </button>
                    )}
                  </div>
                  {!user?._id && (
                    <p className="text-sm text-yellow-600">
                      You need to login to use coupons
                    </p>
                  )}
                  {couponMessage && (
                    <p
                      className={`text-sm ${
                        appliedCoupon ? "text-green-500" : "text-red-500"
                      }`}
                    >
                      {couponMessage}
                    </p>
                  )}
          </div>

            {/* Product List */}
            {products.map((product) => (
              <div
                key={`${product._id}-${product.variantId || "default"}`}
                className="flex items-center gap-3 md:!gap-4"
              >
                <img
                  src={product?.frontImage || product?.backImage || noImage}
                  alt={product.name}
                  className="bg-gray-200 !h-14 md:!h-16 !w-14 md:!w-16 object-cover rounded"
                />
                <div className="flex flex-col flex-grow">
                  <p className="font-medium text-sm md:text-base">{product?.name || product?.variantname}</p>
                  <p className="text-xs md:!text-sm text-gray-500">{product.size}</p>
                  <select
                    className="!mt-1 border !p-1 text-xs md:text-sm max-w-[80px]"
                    value={quantities[product._id]}
                    onChange={(e) =>
                      handleQuantityChange(product._id, Number(e.target.value))
                    }
                  >
                    {[...Array(Math.min(10, product.stock || 10)).keys()].map(
                      (i) => (
                        <option key={i + 1} value={i + 1}>
                          {i + 1}
                        </option>
                      )
                    )}
                  </select>
                </div>
                <p className="font-medium text-sm md:text-base whitespace-nowrap">
                  ₹{parseInt((
                  product.salePrice +
                  (product.salePrice * product.tax) / 100 -
                  ((product.salePrice +
                    (product.salePrice * product.tax) / 100) *
                    product.discount) /
                    100
                ).toFixed(2)) || product.salePrice.toFixed(2)}
                </p>
              </div>
            ))}

            {/* Order Summary */}
            <div className="!space-y-2 !pt-4 md:!pt-6 border-t">
              <div className="flex justify-between text-sm md:text-base">
                <p>Subtotal</p>
                <p>₹{subtotal.toFixed(2)}</p>
              </div>
              <div className="flex justify-between text-sm md:text-base">
                <p>Shipping</p>
                <p>₹{shipping.toFixed(2)}</p>
              </div>
              {appliedCoupon && (
                <div className="flex justify-between text-sm md:text-base text-green-500">
                  <p>Discount ({appliedCoupon.discount}%)</p>
                  <p>-₹{discountAmount.toFixed(2)}</p>
                </div>
              )}
              <div className="flex justify-between font-semibold !pt-2 border-t text-sm md:text-base">
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