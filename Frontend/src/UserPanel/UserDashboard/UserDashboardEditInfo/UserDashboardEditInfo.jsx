import React, { useState } from 'react';
import { useUser } from '../../../components/AuthContext/AuthContext';
import { useNavigate } from 'react-router-dom';
import './UserDashboardEditInfo.css';

const UserDashboardEditInfo = () => {
  const { user, setUser } = useUser();
  const navigate = useNavigate();
  const [isUploading, setIsUploading] = useState(false);
  
  // Initialize form state with user data (keeping all original fields)
  const [formData, setFormData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    phone: user?.phone || '',
    dateOfBirth: user?.dateOfBirth?.split('T')[0] || '',
    email: user?.email || '',
    dateOfAnniversary: user?.dateOfAnniversary?.split('T')[0] || '',
    gender: user?.gender || '',
    country: user?.Address?.[0]?.country || 'India',
    profileImage: user?.profileImage || ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Simplified image upload - just stores as base64
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsUploading(true);
    
    const reader = new FileReader();
    reader.onload = () => {
      setFormData(prev => ({
        ...prev,
        profileImage: reader.result
      }));
      setIsUploading(false);
    };
    reader.readAsDataURL(file);
  };

  // Simplified submit - just logs data and updates local state
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // In a real app, you would send this to your backend:
    console.log('Submitting:', formData);
    
    // For demo purposes, just update local state
    const updatedUser = {
      ...user,
      ...formData,
      // Keep other user properties unchanged
    };
    
    setUser(updatedUser);
    alert('Profile updated successfully!');
    navigate('/profile');
  };

  // Keep the exact same JSX structure to preserve CSS
  return (
    <div className="UserDashboardEditInfo-container">
      <h2 className="UserDashboardEditInfo-title">Personal Information</h2>
      
      <div className="profile-image-section">
        <label htmlFor="profile-upload" className="profile-upload-label">
          {isUploading ? (
            <div className="uploading-text">Uploading...</div>
          ) : (
            <>
              {formData.profileImage ? (
                <img 
                  src={formData.profileImage} 
                  alt="Profile" 
                  className="profile-image-preview"
                />
              ) : (
                <div className="profile-image-placeholder">
                  {formData.firstName?.charAt(0) || 'U'}
                </div>
              )}
              <span className="edit-icon">✏️ Edit Photo</span>
            </>
          )}
        </label>
        <input
          id="profile-upload"
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          style={{ display: 'none' }}
        />
      </div>
      
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
            disabled
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