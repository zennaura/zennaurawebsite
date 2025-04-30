import React, { useState } from 'react';
import './UserDashboardAddAddress.css';
import axios from 'axios';
import { useUser } from '../../../components/AuthContext/AuthContext';
import { useNavigate } from 'react-router-dom';

const UserDashboardAddAddress = () => {
  const { user, setUser } = useUser();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    phone: user?.phone || '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'India',
    isDefault: false
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    else if (!/^\d{10}$/.test(formData.phone)) newErrors.phone = 'Invalid phone number';
    if (!formData.addressLine1.trim()) newErrors.addressLine1 = 'Address is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.state) newErrors.state = 'State is required';
    if (!formData.zipCode.trim()) newErrors.zipCode = 'Zip code is required';
    if (!formData.country) newErrors.country = 'Country is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
  
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_LINK}/api/userdashboard/${user._id}/address`,
        {
          address: {
            firstName: formData.firstName,
            lastName: formData.lastName,
            phone: formData.phone,
            addressLine1: formData.addressLine1, // Ensure this matches backend
            addressLine2: formData.addressLine2, // Ensure this matches backend
            city: formData.city,
            state: formData.state,
            zipCode: formData.zipCode,
            country: formData.country,
            isDefault: formData.isDefault
          }
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        }
      );
  
      setUser(response.data.user);
      navigate('/userdashboard');
    } catch (error) {
      console.error('Error adding address:', error);
      if (error.response) {
        console.log('Backend response:', error.response.data);
      }
      alert('Failed to add address. Please try again.');
    }
  };

  return (
    <div className="UserDashboardAddAddress-container">
      <h2 className="UserDashboardAddAddress-title">Add New Address</h2>

      <form className="UserDashboardAddAddress-form" onSubmit={handleSubmit}>
        <div>
          <label>First name</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className={errors.firstName ? 'error' : ''}
          />
          {errors.firstName && <span className="error-message">{errors.firstName}</span>}
        </div>

        <div>
          <label>Last name</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className={errors.lastName ? 'error' : ''}
          />
          {errors.lastName && <span className="error-message">{errors.lastName}</span>}
        </div>

        <div className="UserDashboardAddAddress-phoneGroup">
          <label>Phone number</label>
          <div className="UserDashboardAddAddress-phoneFields">
            <input type="text" value="+91" readOnly className="phone-code" />
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className={`phone-number ${errors.phone ? 'error' : ''}`}
              maxLength="10"
            />
          </div>
          {errors.phone && <span className="error-message">{errors.phone}</span>}
        </div>

        <div>
          <label>Address Line 1</label>
          <input
            type="text"
            name="addressLine1"
            value={formData.addressLine1}
            onChange={handleChange}
            className={errors.addressLine1 ? 'error' : ''}
          />
          {errors.addressLine1 && <span className="error-message">{errors.addressLine1}</span>}
        </div>

        <div>
          <label>Address Line 2</label>
          <input
            type="text"
            name="addressLine2"
            value={formData.addressLine2}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>City</label>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            className={errors.city ? 'error' : ''}
          />
          {errors.city && <span className="error-message">{errors.city}</span>}
        </div>

        <div>
          <label>State</label>
          <select
            name="state"
            value={formData.state}
            onChange={handleChange}
            className={errors.state ? 'error' : ''}
          >
            <option value="">Select State</option>
            <option value="delhi">Delhi</option>
            <option value="mp">Madhya Pradesh</option>
            <option value="up">Uttar Pradesh</option>
          </select>
          {errors.state && <span className="error-message">{errors.state}</span>}
        </div>

        <div>
          <label>Zip Code</label>
          <input
            type="text"
            name="zipCode"
            value={formData.zipCode}
            onChange={handleChange}
            className={errors.zipCode ? 'error' : ''}
          />
          {errors.zipCode && <span className="error-message">{errors.zipCode}</span>}
        </div>

        <div>
          <label>Country</label>
          <select
            name="country"
            value={formData.country}
            onChange={handleChange}
            className={errors.country ? 'error' : ''}
          >
            <option value="india">India</option>
            <option value="us">USA</option>
          </select>
          {errors.country && <span className="error-message">{errors.country}</span>}
        </div>

        <div className="checkbox-wrapper">
          <input
            type="checkbox"
            name="isDefault"
            checked={formData.isDefault}
            onChange={(e) => setFormData(prev => ({ ...prev, isDefault: e.target.checked }))}
            id="defaultAddress"
          />
          <label htmlFor="defaultAddress">Set as default address</label>
        </div>

        <div className="UserDashboardAddAddress-buttonWrapper">
          <button type="submit" className="UserDashboardAddAddress-button">
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserDashboardAddAddress;