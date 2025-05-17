import React from 'react';
import {
  FaEdit,
  FaHistory,
  FaAddressBook,
  FaHeart,
  FaUserSecret,
  FaUsers,
} from 'react-icons/fa';
import './UserDashboardNavbar.css';
import { useUser } from '../../../components/AuthContext/AuthContext.jsx';

const UserDashboardNavbar = ({ onNavigate, activeTab, className }) => {
  const { user } = useUser();

  return (
    <div className={`UserDashboardNavbar-container ${className || ''}`}>
      {/* Profile Section */}
      <div className="UserDashboardNavbar-profile">
        <div className="UserDashboardNavbar-avatar">
          {user.profilePicture ? (
            <img
              src={user.profilePicture}
              alt={`${user.firstName} ${user.lastName}`}
              className="UserDashboardNavbar-avatarImage"
            />
          ) : (
            // fallback icon if no profile picture
            <div className="UserDashboardNavbar-avatarIcon">
              {/* You can use FaUser or any placeholder */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
                width="24"
                height="24"
              >
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-3.31 0-6 2.69-6 6v2h12v-2c0-3.31-2.69-6-6-6z" />
              </svg>
            </div>
          )}
        </div>
        <h2 className="UserDashboardNavbar-name">
          {user.firstName} {user.lastName}
        </h2>
      </div>

      {/* Links */}
      <ul className="UserDashboardNavbar-links">
        <li
          className={activeTab === 'dashboard' ? 'active' : ''}
          onClick={() => onNavigate('dashboard')}
        >
          {/* Use icon only if you want, otherwise remove FaUser */}
          Dashboard
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
