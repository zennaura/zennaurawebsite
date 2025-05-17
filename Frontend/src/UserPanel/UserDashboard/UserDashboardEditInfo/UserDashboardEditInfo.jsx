import React, { useState } from 'react';
import { useUser } from '../../../components/AuthContext/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // import styles
import './UserDashboardEditInfo.css';

const UserDashboardEditInfo = () => {
  const { user, setUser } = useUser();
  const navigate = useNavigate();
  
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
      // Replace with actual API call if needed
      const updatedUser = {
        ...user,
        ...formData,
      };
      
      setUser(updatedUser);
      toast.success('Profile updated successfully!');
      
      // Redirect after a delay to allow user to see toast
      setTimeout(() => {
        navigate('/userdashboard');
      }, 1500);

    } catch (error) {
      toast.error('Failed to update profile. Please try again.');
    }
  };

  return (
    <div className="UserDashboardEditInfo-container">
      <h2 className="UserDashboardEditInfo-title">Personal Information</h2>
      
      <form className="UserDashboardEditInfo-form" onSubmit={handleSubmit}>
        {/* Your form fields remain unchanged */}
        {/* ... */}
        
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

      {/* Toast Container to render toasts */}
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
    </div>
  );
};

export default UserDashboardEditInfo;
