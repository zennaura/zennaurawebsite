import React from 'react';
import { FaUser, FaEdit, FaHistory, FaAddressBook, FaHeart, FaUserSecret, FaUsers } from 'react-icons/fa';
import './UserDashboardNavbar.css';
import { useUser } from '../../../components/AuthContext/AuthContext.jsx';
const UserDashboardNavbar = ({ onNavigate, activeTab, className }) => {
  const { user } = useUser();

  return (
    <div className={`UserDashboardNavbar-container ${className || ''}`}>
      {/* Profile Section */}
      <div className="UserDashboardNavbar-profile">
        <div className="UserDashboardNavbar-avatar">
          <FaUser />
        </div>
        <h2 className="UserDashboardNavbar-name">
          {user.firstName + " " + user.lastName}
        </h2>
      </div>

      {/* Links */}
      <ul className="UserDashboardNavbar-links">
        <li
          className={activeTab === 'dashboard' ? 'active' : ''}
          onClick={() => onNavigate('dashboard')}
        >
          <FaUser /> Dashboard
        </li>
        <li
          className={activeTab === 'editInfo' ? 'active' : ''}
          onClick={() => onNavigate('editInfo')}
        >
          <FaEdit /> Edit Information
        </li>
        <li
          className={activeTab === 'orderHistory' ? 'active' : ''}
          onClick={() => onNavigate('orderHistory')}
        >
          <FaHistory /> Order History
        </li>
        <li
          className={activeTab === 'address' ? 'active' : ''}
          onClick={() => onNavigate('address')}
        >
          <FaAddressBook /> Address
        </li>
        <li
          className={activeTab === 'wishlist' ? 'active' : ''}
          onClick={() => onNavigate('wishlist')}
        >
          <FaHeart /> Wishlist
        </li>
        <li
          className={activeTab === 'privacy' ? 'active' : ''}
          onClick={() => onNavigate('privacy')}
        >
          <FaUserSecret /> Privacy
        </li>
        <li
          className={activeTab === 'tribe' ? 'active' : ''}
          onClick={() => onNavigate('tribe')}
        >
          <FaUsers /> Zenn Aura Tribe
        </li>
      </ul>
    </div>
  );
};

export default UserDashboardNavbar;
