import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { useUser } from '../../../components/AuthContext/AuthContext';
import { FaArrowLeft, FaTag, FaPercentage, FaCalendarAlt } from 'react-icons/fa';

const EditCoupon = () => {
  const { couponId } = useParams();
  const navigate = useNavigate();
  const { user } = useUser();

  const [coupon, setCoupon] = useState({
    code: '',
    discount: '',
    expiryDate: ''
  });
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCoupon = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_LINK}/api/coupons/${couponId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
            }
          }
        );
        const { code, discount, expiryDate } = response.data;
        setCoupon({
          code,
          discount,
          expiryDate: new Date(expiryDate).toISOString().split('T')[0]
        });
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch coupon details');
      } finally {
        setLoading(false);
      }
    };

    fetchCoupon();
  }, [couponId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCoupon(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(
        `${import.meta.env.VITE_BACKEND_LINK}/api/coupons/update/${couponId}`,
        {
          code: coupon.code,
          discount: Number(coupon.discount),
          expiryDate: new Date(coupon.expiryDate)
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      );
      setMessage('Coupon updated successfully!');
      setError('');
      setTimeout(() => navigate('/allcoupons'), 1500);
    } catch (err) {
      setMessage('');
      setError(err.response?.data?.message || 'Failed to update coupon');
    }
  };

  if (user?.userRole !== 'admin') {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-md w-full">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Access Denied</h2>
          <p className="text-gray-700 mb-6">This page is not accessible by you.</p>
          <button 
            onClick={() => navigate('/')}
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            Go to Home
          </button>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate('/allcoupons')}
          className="flex items-center text-blue-600 hover:text-blue-800 mb-6 transition-colors"
        >
          <FaArrowLeft className="mr-2" /> Back to Coupons
        </button>

        {/* Form Card */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-6 text-center">
            <h2 className="text-2xl font-bold text-white">Edit Coupon</h2>
          </div>

          {/* Messages */}
          <div className="px-6 pt-4">
            {message && (
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
                {message}
              </div>
            )}
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                {error}
              </div>
            )}
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Coupon Code */}
            <div className="space-y-2">
              <label htmlFor="code" className="block text-sm font-medium text-gray-700">
                Coupon Code
              </label>
              <div className="relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaTag className="text-gray-400" />
                </div>
                <input
                  id="code"
                  name="code"
                  type="text"
                  value={coupon.code}
                  onChange={handleChange}
                  className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md"
                  placeholder="SUMMER20"
                  required
                />
              </div>
            </div>

            {/* Discount Percentage */}
            <div className="space-y-2">
              <label htmlFor="discount" className="block text-sm font-medium text-gray-700">
                Discount Percentage
              </label>
              <div className="relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaPercentage className="text-gray-400" />
                </div>
                <input
                  id="discount"
                  name="discount"
                  type="number"
                  min="1"
                  max="100"
                  value={coupon.discount}
                  onChange={handleChange}
                  className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md"
                  placeholder="20"
                  required
                />
              </div>
            </div>

            {/* Expiry Date */}
            <div className="space-y-2">
              <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700">
                Expiry Date
              </label>
              <div className="relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaCalendarAlt className="text-gray-400" />
                </div>
                <input
                  id="expiryDate"
                  name="expiryDate"
                  type="date"
                  value={coupon.expiryDate}
                  onChange={handleChange}
                  className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-blue-800 text-white py-3 px-4 rounded-md shadow-md hover:from-blue-700 hover:to-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200"
              >
                Update Coupon
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditCoupon;  