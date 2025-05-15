import React, { useState } from 'react';
import UserDashboardNavbar from '../UserDashboardNavbar/UserDashboardNavbar';
import UserDashboard from '../UserDashboard/UserDashboard';
import UserDashboardEditInfo from '../UserDashboardEditInfo/UserDashboardEditInfo';
import UserDashboardOrderHistory from '../UserDashboardOrderHistory/UserDashboardOrderHistory.jsx';
import UserDashboardAddress from '../UserDashboardAddAddress/UserDashboardAddAddress.jsx';
import UserDashboardWishlist from '../UserDashboardWishlist/UserDashboardWishlist.jsx';
import UserDashboardPrivacy from '../UserDashboardChangePass/UserDashboardChangePass.jsx';
import UserDashboardTribe from '../UserDashboardTribe/UserDashboardTribe.jsx';
import ImageHead from '../../../components/ImageHead/ImageHead';
import { useUser } from '../../../components/AuthContext/AuthContext.jsx';
import './UserDashboardMain.css';

const UserDashboardMain = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showMenu, setShowMenu] = useState(false);
  const { user, setUser } = useUser();

  // Render the selected dashboard tab
  const renderComponent = () => {
    switch (activeTab) {
      case 'dashboard':
              return <UserDashboard onNavigate={handleNavigation} />;
      case 'editInfo':
        return <UserDashboardEditInfo />;
      case 'orderHistory':
        return <UserDashboardOrderHistory />;
      case 'address':
        return <UserDashboardAddress />;
      case 'wishlist':
        return <UserDashboardWishlist />;
      case 'privacy':
        return <UserDashboardPrivacy />;
      case 'tribe':
        return <UserDashboardTribe />;
      default:
        return <UserDashboard />;
    }
  };

  // Handle logout
  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  // Handle sidebar navigation
  const handleNavigation = (tab) => {
    setActiveTab(tab);
    setShowMenu(false); // Close menu on mobile after clicking
  };

  const username = "Welcome " + user.firstName;

  return (
    <div>
      <ImageHead Title={username} />
      
      <div className="userdashboard-logout">
        {/* Hamburger icon for small screens */}
        <div className="hamburger" onClick={() => setShowMenu(!showMenu)}>
          ☰
        </div>

        {/* Logout button */}
        <button className="userdashboard-logout-button" onClick={handleLogout}>
          Logout
        </button>
      </div>

      <div className="UserDashboardMain-container">
        {/* Sidebar navigation */}
        <UserDashboardNavbar
          className={`dashboard-navbar ${showMenu ? 'show' : ''}`}
          onNavigate={handleNavigation}
          activeTab={activeTab}
        />

        {/* Main content */}
        {renderComponent()}
      </div>
    </div>
  );
};

export default UserDashboardMain;
