import React, { useState } from "react";
import axios from "axios";
import { useUser } from '../../AuthContext/AuthContext';
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./SignInUpForm.css"; 
import {
    FaFacebookF,
    FaGooglePlusG,
    FaLinkedinIn,
} from "react-icons/fa";

axios.defaults.withCredentials = true;

const SignInUpForm = () => {
    const navigate = useNavigate();
    const { setUser } = useUser(); // Access setUser from context
    const [isSignUp, setIsSignUp] = useState(false);
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
        referralCode: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Only show essential updates. No need to repeat unchanged parts.

const handleLogin = async (e) => {
    e.preventDefault();
    const loginData = {
        email: formData.email,
        password: formData.password,
    };

    if (!loginData.email || !loginData.password) {
        toast.error("❌ Please fill all fields!");
        return;
    }

    try {
        const response = await axios.post(`${process.env.REACT_APP_BACKEND_LINK}/api/auth/login`, loginData);
        toast.success(`✅ ${response.data.message}`);

        const userData = response.data.userData;
        setUser(userData);
        navigate("/", { state: userData });

    } catch (error) {
        toast.error(`❌ ${error.response?.data?.message || "Login failed"}`);
    }
};

const handleRegister = async (e) => {
    e.preventDefault();
    const { phone, password, confirmPassword } = formData;

    if (!/^\d{10}$/.test(phone)) {
        toast.error("❌ Contact number must be exactly 10 digits!");
        return;
    }

    if (password !== confirmPassword) {
        toast.error("❌ Passwords do not match!");
        return;
    }

    try {
        const response = await axios.post(`${process.env.REACT_APP_BACKEND_LINK}/api/auth/register`, formData);
        toast.success(`✅ ${response.data.message}`);
        setIsSignUp(false);
    } catch (error) {
        const errorMsg = error.response?.data?.message || "Registration failed";
        toast.error(`❌ ${errorMsg}`);
    }
};

    

    return (
        <div className="SignInUpForm-body">
            <div className={`SignInUpForm-container ${isSignUp ? "SignInUpForm-right-panel-active" : ""}`} id="container">
                
                {/* Sign Up Form */}
                <div className="SignInUpForm-form-container SignInUpForm-sign-up-container">
                    <form>
                        <h1>Create Account</h1>
                        <div className="SignInUpForm-social-container">
                            <a href="#" className="SignInUpForm-social"><FaFacebookF /></a>
                            <a href="#" className="SignInUpForm-social"><FaGooglePlusG /></a>
                            <a href="#" className="SignInUpForm-social"><FaLinkedinIn /></a>
                        </div>
                        <span>or use your email for registration</span>
                        <div className="SignInUpForm-fullname">
                            <input type="text" name="firstName" placeholder="First Name" onChange={handleChange} />
                            <input type="text" name="lastName" placeholder="Last Name" onChange={handleChange} />
                        </div>
                        <input type="email" name="email" placeholder="Email" onChange={handleChange} />
                        <input type="text" name="phone" placeholder="Phone Number" onChange={handleChange} />
                        <input type="password" name="password" placeholder="Password" onChange={handleChange} />
                        <input type="password" name="confirmPassword" placeholder="Confirm Password" onChange={handleChange} />
                        <input type="text" name="referralCode" placeholder="Referral Code (Optional)" onChange={handleChange} />
                        <button type="button" onClick={handleRegister}>Sign Up</button>
                    </form>
                </div>

                {/* Sign In Form */}
                <div className="SignInUpForm-form-container SignInUpForm-sign-in-container">
                    <form onSubmit={handleLogin}>
                        <h1>Sign in</h1>
                        <div className="SignInUpForm-social-container">
                            <a href="#" className="SignInUpForm-social"><FaFacebookF /></a>
                            <a href="#" className="SignInUpForm-social"><FaGooglePlusG /></a>
                            <a href="#" className="SignInUpForm-social"><FaLinkedinIn /></a>
                        </div>
                        <span>or use your account</span>
                        <input type="email" name="email" placeholder="Email" onChange={handleChange} />
                        <input type="password" name="password" placeholder="Password" onChange={handleChange} />
                        <a href="#">Forgot your password?</a>
                        <button type="submit">Sign In</button>
                    </form>
                </div>

                {/* Overlay */}
                <div className="SignInUpForm-overlay-container">
                    <div className="SignInUpForm-overlay">
                        <div className="SignInUpForm-overlay-panel SignInUpForm-overlay-left">
                            <h1>Welcome Back!</h1>
                            <p>Manifest, Cleanse, Heal—The Zenn Aura Way</p>
                            <button className="SignInUpForm-ghost" onClick={() => setIsSignUp(false)}>Sign In</button>
                        </div>
                        <div className="SignInUpForm-overlay-panel SignInUpForm-overlay-right">
                            <h1>Join Us !!</h1>
                            <p>Creating an account has many benefits: check out faster, keep more than one address, track orders and more.</p>
                            <button className="SignInUpForm-ghost" onClick={() => setIsSignUp(true)}>CREATE AN ACCOUNT</button>
                        </div>
                    </div>
                </div>

                <ToastContainer position="top-right" autoClose={3000} />
            </div>
        </div>
    );
};

export default SignInUpForm;
