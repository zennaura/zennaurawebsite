import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useUser } from '../../../components/AuthContext/AuthContext';

const CouponGenerator = () => {
  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [oneTimePerUser, setOneTimePerUser] = useState(false);
  const [minCartValue, setMinCartValue] = useState('');
  const { user } = useUser();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newCoupon = {
      code: couponCode,
      discount: Number(discount),
      expiryDate: new Date(expiryDate),
      oneTimePerUser: oneTimePerUser,
      minCartValue: minCartValue ? Number(minCartValue) : 0
    };

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_LINK}/api/coupons/generate`,
        newCoupon,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      );

      toast.success('Coupon generated successfully!');
      navigate('/allcoupons');
      console.log('Response:', response.data);

      setCouponCode('');
      setDiscount('');
      setExpiryDate('');
      setOneTimePerUser(false);
      setMinCartValue('');
    } catch (err) {
      console.error('Error creating coupon:', err);
      toast.error(err.response?.data?.message || 'Failed to generate coupon');
    }
  };

  if (user?.userRole !== 'admin') {
    return (
      <div className="flex justify-center items-center !h-screen bg-gray-100">
        <div className="bg-white !p-8 rounded-lg shadow-lg text-center !max-w-md !w-full">
          <h2 className="text-2xl font-bold text-red-600 !mb-4">Access Denied</h2>
          <p className="text-gray-700 !mb-6">This page is not accessible by you.</p>
          <button 
            onClick={() => navigate('/')}
            className="bg-blue-600 text-white !px-6 !py-2 rounded-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Go to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="!min-h-screen bg-gray-50 !py-12 !px-4 sm:!px-6 lg:!px-8">
      <div className="!max-w-md !mx-auto bg-white shadow-xl rounded-lg !overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 !p-6 text-center">
          <h2 className="!text-2xl font-bold text-white">Generate Coupon</h2>
        </div>
        
        <form onSubmit={handleSubmit} className="!p-6 !space-y-6">
          <div className="!space-y-2">
            <label htmlFor="couponCode" className="block text-sm font-medium text-gray-700">
              Coupon Code
            </label>
            <input
              id="couponCode"
              type="text"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
              className="!w-full !px-4 !py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="e.g. SUMMER20"
              required
            />
          </div>

          <div className="!space-y-2">
            <label htmlFor="discount" className="block text-sm font-medium text-gray-700">
              Discount Percentage
            </label>
            <input
              id="discount"
              type="number"
              min="1"
              max="100"
              value={discount}
              onChange={(e) => setDiscount(e.target.value)}
              className="!w-full !px-4 !py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="e.g. 20"
              required
            />
          </div>

          <div className="!space-y-2">
            <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700">
              Expiry Date
            </label>
            <input
              id="expiryDate"
              type="date"
              value={expiryDate}
              onChange={(e) => setExpiryDate(e.target.value)}
              className="!w-full !px-4 !py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div className="!space-y-2">
            <label htmlFor="minCartValue" className="block text-sm font-medium text-gray-700">
              Minimum Cart Value (₹)
            </label>
            <input
              id="minCartValue"
              type="number"
              min="0"
              value={minCartValue}
              onChange={(e) => setMinCartValue(e.target.value)}
              className="!w-full !px-4 !py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="e.g. 500"
            />
          </div>

          <div className="flex items-center space-x-2">
            <input
              id="oneTimePerUser"
              type="checkbox"
              checked={oneTimePerUser}
              onChange={(e) => setOneTimePerUser(e.target.checked)}
              className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label htmlFor="oneTimePerUser" className="block text-sm font-medium text-gray-700">
              One time use per user
            </label>
          </div>

          <div className="!pt-4">
            <button
              type="submit"
              className="!w-full bg-gradient-to-r from-blue-600 to-blue-800 text-white !py-3 !px-4 rounded-md shadow-md hover:from-blue-700 hover:to-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200"
            >
              Generate Coupon
            </button>
          </div>
        </form>
      </div>

      <ToastContainer 
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
};

export default CouponGenerator; 