import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './SetNewPassword.css';

const SetNewPassword = () => {
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordStrength, setPasswordStrength] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    const userEmail = location.state?.userEmail;
    const verified = location.state?.verified;

    // Check verification and redirect if not verified
    useEffect(() => {
        if (!verified || !userEmail) {
            toast.error("Password reset link is invalid or expired");
            setTimeout(() => navigate("/login"), 2000);
        }
    }, [verified, userEmail, navigate]);

    const handlePasswordChange = (e) => {
        const password = e.target.value;
        setNewPassword(password);
        // Password strength check
        if (password.length === 0) {
            setPasswordStrength("");
        } else if (password.length < 6) {
            setPasswordStrength("Weak");
        } else if (password.length < 10) {
            setPasswordStrength("Good");
        } else {
            setPasswordStrength("Excellent");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        
        if (!newPassword || !confirmPassword) {
            toast.error("Please fill in all fields");
            return;
        }

        if (newPassword !== confirmPassword) {
            toast.error("Passwords don't match");
            return;
        }

        setIsLoading(true);

        try {
            const response = await axios.post(
                `${import.meta.env.VITE_BACKEND_LINK}/api/auth/resetpassword`,
                {
                    email: userEmail,
                    newPassword: newPassword,
                    confirmPassword: confirmPassword
                }
            );

            if (response.data.success) {
                toast.success("Password updated successfully!");
                setTimeout(() => navigate("/login"), 2000);
            } else {
                toast.error(response.data.message || "Failed to update password");
            }
        } catch (err) {
            toast.error(err.response?.data?.message || "An error occurred while updating password");
            console.error("Password reset error:", err);
        } finally {
            setIsLoading(false);
        }
    };

    if (!verified || !userEmail) {
        return (
            <div className="setnewpassword-container">
                <ToastContainer />
                <p>Redirecting to login page...</p>
            </div>
        );
    }

    return (
        <div className="setnewpassword-container">
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
            
            <h1 className="setnewpassword-title">Reset password?</h1>
            
            {error && <div className="setnewpassword-error">{error}</div>}
            
            <form onSubmit={handleSubmit}>
                <div className="setnewpassword-form-group">
                    <label className="setnewpassword-label" htmlFor="newPassword">New password</label>
                    <input
                        className="setnewpassword-input"
                        type="password"
                        id="newPassword"
                        value={newPassword}
                        onChange={handlePasswordChange}
                        disabled={isLoading}
                    />
                    {passwordStrength && (
                        <div className={`setnewpassword-strength setnewpassword-strength-${passwordStrength.toLowerCase()}`}>
                            Password strength: {passwordStrength}
                        </div>
                    )}
                </div>

                <div className="setnewpassword-form-group">
                    <label className="setnewpassword-label" htmlFor="confirmPassword">Re enter password</label>
                    <input
                        className="setnewpassword-input"
                        type="password"
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        disabled={isLoading}
                    />
                </div>

                <button 
                    type="submit" 
                    className="setnewpassword-submit-button"
                    disabled={isLoading}
                >
                    {isLoading ? "Updating..." : "Submit"}
                </button>
            </form>

            <a href="/login" className="setnewpassword-back-link">
                <span className="setnewpassword-back-arrow">←</span> Back to Login
            </a>
        </div>
    );
};

export default SetNewPassword;