import React, { useState } from 'react';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify'; // Import ToastContainer and toast
import 'react-toastify/dist/ReactToastify.css'; // Import styles

const CouponGenerator = () => {
  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState('');
  const [expiryDate, setExpiryDate] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newCoupon = {
      code: couponCode,
      discount: Number(discount),
      expiryDate: new Date(expiryDate),
    };

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_LINK}/api/coupons/generate`,
        newCoupon
      );

      // Display success toast
      toast.success('Coupon generated successfully!');
      navigate('/allcoupons');
      console.log('Response:', response.data);

      // Reset form
      setCouponCode('');
      setDiscount('');
      setExpiryDate('');
    } catch (err) {
      console.error('Error creating coupon:', err);

      // Display error toast
      toast.error(err.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-md rounded-lg p-6 mt-6">
      <h2 className="text-xl font-semibold mb-4 text-center">Generate Coupon</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium mb-1">Coupon Code</label>
          <input
            type="text"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2"
            required
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Discount Percentage</label>
          <input
            type="number"
            min="1"
            max="100"
            value={discount}
            onChange={(e) => setDiscount(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2"
            required
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Expiry Date</label>
          <input
            type="date"
            value={expiryDate}
            onChange={(e) => setExpiryDate(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Generate Coupon
        </button>
      </form>

      {/* ToastContainer to show toasts */}
      <ToastContainer position="top-center" autoClose={5000} hideProgressBar={false} />
    </div>
  );
};

export default CouponGenerator;
