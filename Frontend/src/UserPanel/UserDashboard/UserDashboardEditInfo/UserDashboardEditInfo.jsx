import React, { useState, useEffect } from 'react';
import { useUser } from '../../../components/AuthContext/AuthContext';
import { useNavigate } from 'react-router-dom';
import './UserDashboardEditInfo.css';
import axios from 'axios';

const UserDashboardEditInfo = () => {
  const { user, setUser  } = useUser();
  const navigate = useNavigate();
  
  // Initialize form state with user data
  const [formData, setFormData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    phone: user?.phone || '',
    dateOfBirth: user?.dateOfBirth?.split('T')[0] || '',
    email: user?.email || '',
    dateOfAnniversary: user?.dateOfAnniversary?.split('T')[0] || '',
    gender: user?.gender || '',
    country: user?.Address?.[0]?.country || 'India'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_BACKEND_LINK}/api/userdashboard/${user._id}`,
        {
          ...formData,
          // Format dates properly for backend
          dateOfBirth: formData.dateOfBirth || null,
          dateOfAnniversary: formData.dateOfAnniversary || null,
          // Update address if needed
          Address: [{
            ...user.Address?.[0],
            country: formData.country
          }]
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        }
      );
      
      // Update user in context
      setUser (response.data.user);
      navigate('/userdashboard');
    } catch (error) {
      console.error('Error updating user:', error);
      alert('Failed to update user information');
    }
  };

  return (
    <div className="UserDashboardEditInfo-container">
      <h2 className="UserDashboardEditInfo-title">Personal Information</h2>
      
      <form className="UserDashboardEditInfo-form" onSubmit={handleSubmit}>
        <div className="UserDashboardEditInfo-formGroup">
          <label>First name</label>
          <input 
            type="text" 
            name="firstName"
            placeholder="First name" 
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="UserDashboardEditInfo-formGroup">
          <label>Last name</label>
          <input 
            type="text" 
            name="lastName"
            placeholder="Last name" 
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="UserDashboardEditInfo-formGroup">
          <label>Phone number</label>
          <div className="UserDashboardEditInfo-phoneInput">
            <span>+91</span>
            <input 
              type="text" 
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              pattern="[0-9]{10}"
              title="Please enter a 10-digit phone number"
              required
            />
          </div>
        </div>

        <div className="UserDashboardEditInfo-formGroup">
          <label>Date Of Birth</label>
          <input 
            type="date" 
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleChange}
          />
        </div>

        <div className="UserDashboardEditInfo-formGroup">
          <label>Email Address</label>
          <input 
            type="email" 
            name="email"
            placeholder="Email address" 
            value={formData.email}
            onChange={handleChange}
            required
            disabled // Typically emails shouldn't be changed
          />
        </div>

        <div className="UserDashboardEditInfo-formGroup">
          <label>Date Of Anniversary</label>
          <input 
            type="date" 
            name="dateOfAnniversary"
            value={formData.dateOfAnniversary}
            onChange={handleChange}
          />
        </div>

        <div className="UserDashboardEditInfo-formGroup">
          <label>Gender</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
          >
            <option value="">Select</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div className="UserDashboardEditInfo-formGroup">
          <label>Country</label>
          <input 
            type="text" 
            name="country"
            placeholder="Country" 
            value={formData.country}
            onChange={handleChange}
          />
        </div>

        <div className="UserDashboardEditInfo-buttonContainer">
          <button type="submit">Save</button>
          <button 
            type="button" 
            className="cancel-btn"
            onClick={() => navigate('/userdashboard')}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserDashboardEditInfo;