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
import './UserDashboardMain.css';
import { useUser } from '../../../components/AuthContext/AuthContext.jsx';

const UserDashboardMain = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const {user , setUser} = useUser();

  const renderComponent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <UserDashboard />;
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
  const handleLogout = () => {
    setUser(null); // Clear user from context
    localStorage.removeItem('user'); // Remove user from localStorage
  };

  const username = "Welcome " +user.firstName;

  return (
    <div>
      <ImageHead Title={username}/>
      <div className="userdashboard-logout">
        <button className="userdashboard-logout-button" onClick={handleLogout} >Logout</button>
      </div>
      <div className="UserDashboardMain-container">
        <UserDashboardNavbar 
          onNavigate={setActiveTab} 
          activeTab={activeTab} 
        />
        {renderComponent()}
      </div>
    </div>
  );
};

export default UserDashboardMain;