import React, { useState } from 'react';
import './UserDashboardChangePass.css';
import axios from 'axios';
import { useUser } from '../../../components/AuthContext/AuthContext';
import { useNavigate } from 'react-router-dom';

const UserDashboardChangePass = () => {
    const { user } = useUser();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Clear error when user types
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.currentPassword) newErrors.currentPassword = 'Current password is required';
        if (!formData.newPassword) newErrors.newPassword = 'New password is required';
        else if (formData.newPassword.length < 6) newErrors.newPassword = 'Password must be at least 6 characters';
        if (formData.newPassword !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;
    
        setIsSubmitting(true);
        setErrors({});
        setSuccessMessage('');
        
        try {
            const response = await axios.put(
                `${process.env.REACT_APP_BACKEND_LINK}/api/userdashboard/${user._id}/password`,
                {
                    currentPassword: formData.currentPassword,
                    newPassword: formData.newPassword
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                }
            );
    
            setSuccessMessage('Password changed successfully!');
            setFormData({
                currentPassword: '',
                newPassword: '',
                confirmPassword: ''
            });
            
        } catch (error) {
            console.error('Full error object:', error); // More detailed logging
            console.error('Error response:', error.response?.data); // Log backend response
            
            if (error.response) {
                if (error.response.status === 401) {
                    setErrors({ currentPassword: 'Incorrect current password' });
                } else if (error.response.data?.message) {
                    setErrors({ submit: error.response.data.message });
                } else {
                    setErrors({ submit: `Server error: ${error.response.status}` });
                }
            } else if (error.request) {
                setErrors({ submit: 'No response from server. Please try again.' });
            } else {
                setErrors({ submit: 'Request failed. Please try again.' });
            }
        } finally {
            setIsSubmitting(false);
        }
    };
    return (
        <div className="UserDashboardChangePass-container">
            <h2 className='UserDashboardChangePass-title'>Change Password</h2>

            {successMessage && (
                <div className="UserDashboardChangePass-success">
                    {successMessage}
                </div>
            )}

            {errors.submit && (
                <div className="UserDashboardChangePass-error">
                    {errors.submit}
                </div>
            )}

            <form className="UserDashboardChangePass-form" onSubmit={handleSubmit}>
                <div className={`UserDashboardChangePass-field ${errors.currentPassword ? 'error' : ''}`}>
                    <label>Current Password</label>
                    <input
                        type="password"
                        name="currentPassword"
                        value={formData.currentPassword}
                        onChange={handleChange}
                    />
                    {errors.currentPassword && (
                        <span className="UserDashboardChangePass-errorText">
                            {errors.currentPassword}
                        </span>
                    )}
                </div>

                <div className={`UserDashboardChangePass-field ${errors.newPassword ? 'error' : ''}`}>
                    <label>New Password</label>
                    <input
                        type="password"
                        name="newPassword"
                        value={formData.newPassword}
                        onChange={handleChange}
                    />
                    {errors.newPassword && (
                        <span className="UserDashboardChangePass-errorText">
                            {errors.newPassword}
                        </span>
                    )}
                </div>

                <div className={`UserDashboardChangePass-field ${errors.confirmPassword ? 'error' : ''}`}>
                    <label>Confirm New Password</label>
                    <input
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                    />
                    {errors.confirmPassword && (
                        <span className="UserDashboardChangePass-errorText">
                            {errors.confirmPassword}
                        </span>
                    )}
                </div>

                <div className="UserDashboardChangePass-buttonWrapper">
                    <button
                        className="UserDashboardChangePass-button"
                        type="submit"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Changing...' : 'Change Password'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default UserDashboardChangePass;