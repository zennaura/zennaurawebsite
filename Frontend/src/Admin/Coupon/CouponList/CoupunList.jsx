import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AdminNavbar from '../../AdminNavbar/AdminNavbar';
import { FaEdit, FaTrash, FaTag, FaPercent, FaCalendarAlt, FaToggleOn, FaToggleOff, FaPlusCircle } from 'react-icons/fa';


const CouponList = () => {
  const [coupons, setCoupons] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCoupons = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_LINK}/api/coupons/allcoupons`);
        setCoupons(response.data);
      } catch (err) {
        setError('Error fetching coupons');
        console.error('Error fetching coupons:', err);
      }
    };

    fetchCoupons();
  }, []);

  const toggleCouponStatus = async (couponId, currentStatus) => {
    try {
      await axios.patch(
        `${import.meta.env.VITE_BACKEND_LINK}/api/coupons/toggle/${couponId}`,
        { isActive: !currentStatus }
      );
      setCoupons(coupons.map(coupon =>
        coupon._id === couponId ? { ...coupon, isActive: !currentStatus } : coupon
      ));
    } catch (err) {
      setError('Error updating coupon status');
      console.error('Error updating coupon status:', err);
    }
  };

  const handleEdit = (coupon) => {
    navigate(`/edit-coupon/${coupon._id}`);
  };

  const handleDelete = async (couponId) => {
  try {
    await axios.delete(`${import.meta.env.VITE_BACKEND_LINK}/api/coupons/delete/${couponId}`);
    setCoupons(coupons.filter((coupon) => coupon._id !== couponId));
  } catch (err) {
    setError('Error deleting coupon');
    console.error('Error deleting coupon:', err);
  }
};

  const handleGenerate = () => {
    navigate('/generatecouponcode');
  };

  return (
    <div className="flex">
      {/* Admin Navbar on the Left */}
      <div className="w-1/4 bg-gray-800 text-white">
        <AdminNavbar />
      </div>

      {/* Main Content on the Right */}
      <div className="w-3/2 p-6 bg-white">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Coupon List</h2>
          <button
            onClick={handleGenerate}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            <FaPlusCircle /> Generate New Coupon
          </button>
        </div>

        {error && <p className="text-red-600 text-center mb-2">{error}</p>}

    <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
  {coupons.map((coupon) => (
    <div key={coupon._id} className="border p-4 rounded shadow-md relative">
      {/* Edit Button at Top-Right */}
      <button
        onClick={() => handleEdit(coupon)}
        className="absolute top-2 right-2 text-blue-500 hover:text-blue-700"
      >
        <FaEdit size={18} />
      </button>

      {/* Delete Button at Top-Right */}
      <button
        onClick={() => handleDelete(coupon._id)}
        className="absolute top-2 right-10 text-red-500 hover:text-red-700"
      >
        <FaTrash size={18} />
      </button>

      {/* Coupon Info */}
      <div className="space-y-2 mb-4">
        <p className="font-semibold flex items-center gap-2 truncate">
          <FaTag /> Coupon Code: {coupon.code}
        </p>
        <p className="flex items-center gap-2 truncate">
          <FaPercent /> Discount: {coupon.discount}%
        </p>
        <p className="flex items-center gap-2 truncate">
          <FaCalendarAlt /> Expiry Date: {new Date(coupon.expiryDate).toLocaleDateString()}
        </p>
        <p className="flex items-center gap-2 truncate">
          {coupon.isActive ? <FaToggleOn className="text-green-600" /> : <FaToggleOff className="text-red-600" />}
          Status: {coupon.isActive ? 'Active' : 'Inactive'}
        </p>
      </div>

      {/* Deactivate/Activate Button at Left-Bottom */}
      <div className="absolute bottom-2 left-2">
        <button
          onClick={() => toggleCouponStatus(coupon._id, coupon.isActive)}
          className={`mt-4 px-3 py-1 rounded text-sm ${coupon.isActive ? 'bg-red-500' : 'bg-green-500'} text-white`}
        >
          {coupon.isActive ? 'Deactivate' : 'Activate'}
        </button>
      </div>

    </div>
  ))}
</ul>



      </div>
    </div>
  );
};

export default CouponList;
