import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const EditCoupon = () => {
  const { couponId } = useParams();
  const navigate = useNavigate();

  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCoupon = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_LINK}/api/coupons/${couponId}`);
        const { code, discount, expiryDate } = response.data;
        setCouponCode(code);
        setDiscount(discount);
        setExpiryDate(new Date(expiryDate).toISOString().split('T')[0]);
      } catch (err) {
        setError('Failed to fetch coupon details');
        console.error(err);
      }
    };

    fetchCoupon();
  }, [couponId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`${import.meta.env.VITE_BACKEND_LINK}/api/coupons/update/${couponId}`, {
        code: couponCode,
        discount: Number(discount),
        expiryDate: new Date(expiryDate),
      });
      setMessage('Coupon updated successfully!');
      setError('');
      setTimeout(() => navigate('/allcoupons'), 1500); // redirect after update
    } catch (err) {
      setMessage('');
      setError(err.response?.data?.message || 'Failed to update coupon');
      console.error(err);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-md rounded-lg p-6 mt-6">
      <h2 className="text-xl font-semibold mb-4 text-center">Edit Coupon</h2>

      {message && <p className="text-green-600 text-center mb-2">{message}</p>}
      {error && <p className="text-red-600 text-center mb-2">{error}</p>}

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
          <label className="block font-medium mb-1">Discount (%)</label>
          <input
            type="number"
            value={discount}
            onChange={(e) => setDiscount(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2"
            min="1"
            max="100"
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
          Update Coupon
        </button>
      </form>
    </div>
  );
};

export default EditCoupon;
