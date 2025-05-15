import React from "react";
import "./UserDashboard.css";
import { useUser } from '../../../components/AuthContext/AuthContext';
import FeatureProduct from "../../Featuredproducts/Featuredproducts";
import {
  FaUserCircle,
  FaMapMarkerAlt,
  FaEnvelope,
  FaPhoneAlt,
  FaStar,
  FaEdit,
} from "react-icons/fa";

const UserDashboard = () => {
    const { user } = useUser();
    
    // Default address if no address exists
    const defaultAddress = {
      street: "Not specified",
      city: "Not specified",
      state: "Not specified",
      country: "Not specified",
      zipCode: "Not specified"
    };
    
    // Get the first address or use default
    const address = user.Address && user.Address.length > 0 ? user.Address[0] : defaultAddress;
    
    // Format date if it exists
    const formatDate = (dateString) => {
      if (!dateString) return "N/A";
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    };

  return (
    <div className="UserDashboard-container">
      <div className="UserDashboard-box">
        {/* User Basic Info */}
        <div className="UserDashboard-userDetails">
          <div className="UserDashboard-userDetails-upper">
            <div className="UserDashboard-avatarBox">
              {user.profilePicture ? (
                <img 
                  src={user.profilePicture} 
                  alt="Profile" 
                  className="UserDashboard-avatarImage"
                />
              ) : (
                <FaUserCircle className="UserDashboard-avatarIcon" size={60} />
              )}
            </div>
            <h3 className="UserDashboard-username">{user.firstName} {user.lastName}</h3>
            <div className="UserDashboard-points">
              <FaStar className="UserDashboard-icon" />
              Points: {user.Points || 0}
            </div>
          </div>

          <div className="UserDashboard-infoList">
            <p>
              <span className="userDashboard-icon-box">
                <FaMapMarkerAlt className="UserDashboard-icon" />
              </span>
              {address.city}, {address.country}
            </p>
            <p>
              <span className="userDashboard-icon-box">
                <FaEnvelope className="UserDashboard-icon" />
              </span>
              {user.email}
            </p>
            <p>
              <span className="userDashboard-icon-box">
                <FaPhoneAlt className="UserDashboard-icon" />
              </span>
              {user.phone ? `+91 ${user.phone}` : 'Not specified'}
            </p>
          </div>
        </div>

        {/* Account and Shipping Info */}

        <div className="UserDashboard-otherdetials">
          {/* Account Details */}
          <div className="UserDashboard-accountdetails">
            <h4>
              <span>Account Details</span>
              {/* <Link to=''> */}
              <FaEdit className="UserDashboard-editIcon" />
              {/* </Link> */}
            </h4>
            <p>
              First Name: <strong>{user.firstName}</strong>
            </p>
            <p>
              Last Name: <strong>{user.lastName}</strong>
            </p>
            <p>
              Date of Birth: <strong>{formatDate(user.dateOfBirth)}</strong>
            </p>
            <p>
              Date of Anniversary: <strong>{formatDate(user.dateOfAnniversary)}</strong>
            </p>
            <p>
              Gender: <strong>{user.gender || 'Not specified'}</strong>
            </p>
          </div>

          {/* Shipping Address */}
          <div className="UserDashboard-shippingAddress">
            <h4>
              <span>Shipping Address</span>
              <FaEdit className="UserDashboard-editIcon" />
            </h4>
            <p>
              Address: <strong>{address.addressLine2}</strong>
            </p>
            <p>
              City: <strong>{address.city}</strong>
            </p>
            <p>
              State: <strong>{address.state}</strong>
            </p>
            <p>
              Country: <strong>{address.country}</strong>
            </p>
            <p>
              Zip Code: <strong>{address.zipCode}</strong>
            </p>
          </div>
        </div>
      </div>
      <FeatureProduct />
    </div>
  );
};

export default UserDashboard;