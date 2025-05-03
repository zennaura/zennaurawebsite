import React, { useState } from 'react';
import './ForgotPasswordEmail.css';
import { useNavigate } from 'react-router-dom';

const ForgotPasswordEmail = () => {
    const [email, setEmail] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSendEmail = async (e) => {
        e.preventDefault();
        setError("");

        // Basic email validation
        if (!email) {
            setError("Please enter your email");
            return;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setError("Please enter a valid email address");
            return;
        }

        setIsLoading(true);

        try {
            navigate("/resetpasswordvarification", { 
                state: { 
                    userEmail: email,
        
                } 
            });
        } catch (err) {
            setError("Failed to send verification email. Please try again.");
            console.error("Error sending email:", err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="forgotpasswordemail-container">
            <h1 className="forgotpasswordemail-title">Forgot your password?</h1>
            
            {error && <div className="forgotpasswordemail-error">{error}</div>}
            
            <div className="forgotpasswordemail-form-group">
                <label className="forgotpasswordemail-label" htmlFor="email">Email</label>
                <input 
                    className="forgotpasswordemail-input" 
                    type="email" 
                    id="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. johndeo@gmail.com" 
                />
            </div>

            <div className="forgotpasswordemail-divider"></div>

            <button 
                className="forgotpasswordemail-button" 
                onClick={handleSendEmail}
                disabled={isLoading}
            >
                {isLoading ? "Sending..." : "Send Email"}
            </button>
            
            <a href="/login" className="forgotpasswordemail-back-link">
                <span className="forgotpasswordemail-back-arrow">←</span> Back to Login
            </a>
        </div>
    );
};

export default ForgotPasswordEmail;