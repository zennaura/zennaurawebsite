import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AdminNavbar from '../../AdminNavbar/AdminNavbar';
import { FaEdit, FaTrash, FaTag, FaPercent, FaCalendarAlt, FaToggleOn, FaToggleOff, FaPlusCircle } from 'react-icons/fa';
import { useUser } from '../../../components/AuthContext/AuthContext';

const CouponList = () => {
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { user } = useUser();

  useEffect(() => {
    const fetchCoupons = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_LINK}/api/coupons/allcoupons`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        setCoupons(response.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Error fetching coupons');
      } finally {
        setLoading(false);
      }
    };

    fetchCoupons();
  }, []);

  const toggleCouponStatus = async (couponId, currentStatus) => {
    try {
      await axios.patch(
        `${import.meta.env.VITE_BACKEND_LINK}/api/coupons/toggle/${couponId}`,
        { isActive: !currentStatus },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      );
      setCoupons(coupons.map(coupon =>
        coupon._id === couponId ? { ...coupon, isActive: !currentStatus } : coupon
      ));
    } catch (err) {
      setError(err.response?.data?.message || 'Error updating coupon status');
    }
  };

  const handleEdit = (coupon) => {
    navigate(`/edit-coupon/${coupon._id}`);
  };

  const handleDelete = async (couponId) => {
    try {
      await axios.delete(`${import.meta.env.VITE_BACKEND_LINK}/api/coupons/delete/${couponId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      setCoupons(coupons.filter((coupon) => coupon._id !== couponId));
    } catch (err) {
      setError(err.response?.data?.message || 'Error deleting coupon');
    }
  };

  const handleGenerate = () => {
    navigate('/generatecouponcode');
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
      <div className="flex min-h-screen">
        <div className="w-64 bg-gray-800 text-white">
          <AdminNavbar />
        </div>
        <div className="flex-1 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Admin Navbar */}
      <div className="w-64 bg-gray-800 text-white">
        <AdminNavbar />
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 sm:mb-0">Coupon Management</h2>
            <button
              onClick={handleGenerate}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors"
            >
              <FaPlusCircle /> Generate New Coupon
            </button>
          </div>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          {/* Coupons Grid */}
          {coupons.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              No coupons found. Generate your first coupon!
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {coupons.map((coupon) => (
                <div key={coupon._id} className="border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow relative">
                  {/* Coupon Status Badge */}
                  <div className={`absolute -top-2 -right-2 px-2 py-1 rounded-full text-xs font-medium ${
                    coupon.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {coupon.isActive ? 'Active' : 'Inactive'}
                  </div>

                  {/* Coupon Content */}
                  <div className="p-4">
                    {/* Coupon Code */}
                    <div className="flex items-center mb-3">
                      <FaTag className="text-blue-500 mr-2" />
                      <h3 className="text-lg font-semibold text-gray-800 truncate">{coupon.code}</h3>
                    </div>

                    {/* Discount */}
                    <div className="flex items-center mb-2">
                      <FaPercent className="text-green-500 mr-2" />
                      <span className="text-gray-600">{coupon.discount}% Discount</span>
                    </div>

                    {/* Expiry Date */}
                    <div className="flex items-center mb-4">
                      <FaCalendarAlt className="text-purple-500 mr-2" />
                      <span className="text-gray-600">
                        Expires: {new Date(coupon.expiryDate).toLocaleDateString()}
                      </span>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex justify-between items-center border-t pt-3">
                      <button
                        onClick={() => toggleCouponStatus(coupon._id, coupon.isActive)}
                        className={`flex items-center gap-1 px-3 py-1 rounded text-sm ${
                          coupon.isActive 
                            ? 'bg-red-100 text-red-700 hover:bg-red-200' 
                            : 'bg-green-100 text-green-700 hover:bg-green-200'
                        } transition-colors`}
                      >
                        {coupon.isActive ? <FaToggleOff /> : <FaToggleOn />}
                        {coupon.isActive ? 'Deactivate' : 'Activate'}
                      </button>

                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(coupon)}
                          className="text-blue-500 hover:text-blue-700 p-1 rounded-full hover:bg-blue-50 transition-colors"
                          title="Edit"
                        >
                          <FaEdit size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(coupon._id)}
                          className="text-red-500 hover:text-red-700 p-1 rounded-full hover:bg-red-50 transition-colors"
                          title="Delete"
                        >
                          <FaTrash size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CouponList;