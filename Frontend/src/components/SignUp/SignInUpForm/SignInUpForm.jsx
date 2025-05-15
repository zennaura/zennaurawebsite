import React, { useState } from "react";
import axios from "axios";
import { useUser } from '../../AuthContext/AuthContext';
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IoMdClose } from "react-icons/io";


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
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_LINK}/api/auth/login`, loginData);
            toast.success(`✅ ${response.data.message}`);

            const userData = response.data.userData;
            setUser(userData);

            if (userData.userRole === "admin") {
                navigate("/admin-homepage", { state: userData });
            } else {
                navigate("/", { state: userData });
            }

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
            const email = formData.email;
            navigate('/verification', { state: { userEmail: email, formData } });
            setIsSignUp(false);
        } catch (error) {
            const errorMsg = error.response?.data?.message || "Registration failed";
            toast.error(`❌ ${errorMsg}`);
        }
    };

    const handleforgotpassword = () => {
        navigate('/emailforforgotpassword')
    }



    return (
        <>
            <div className="SignInUpForm-body">
                <div
                    className={`SignInUpForm-container ${isSignUp ? "SignInUpForm-right-panel-active" : ""}`}
                    id="container"
                >
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
                            <a href="#" onClick={handleforgotpassword}>Forgot your password?</a>
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

            <div className="bg-white min-h-screen flex flex-col items-center justify-center font-[Poppins] p-4 overflow-hidden relative lg:hidden">
                <div className="mb-6">
                    <button
                        onClick={() => setIsSignUp(!isSignUp)}
                        className="bg-[#390611] pointer absolute right-0 top-0 text-white px-6 py-2 shadow hover:bg-[#4d0a15] transition-colors"
                    >
                        {isSignUp ? `Sign In` : `Sign Up`}
                    </button>
                </div>

                {/* Sign In Form */}
                <div className={`w-full max-w-md bg-white p-8 transform transition-transform duration-500 ${isSignUp ? '-translate-x-full opacity-0 absolute' : 'translate-x-0 opacity-100 relative'}`}>
                    <form onSubmit={handleLogin} className="flex flex-col">
                        <h1 className="text-2xl font-bold mb-4 text-center">Sign In</h1>
                        <div className="flex justify-center space-x-2 mb-4">
                            <a href="#" className="p-2 border rounded-full"><FaFacebookF /></a>
                            <a href="#" className="p-2 border rounded-full"><FaGooglePlusG /></a>
                            <a href="#" className="p-2 border rounded-full"><FaLinkedinIn /></a>
                        </div>
                        <span className="text-sm mb-2 text-center">or use your account</span>
                        <input type="email" name="email" placeholder="Email" onChange={handleChange} className="p-2 bg-gray-100 rounded mb-2" />
                        <input type="password" name="password" placeholder="Password" onChange={handleChange} className="p-2 bg-gray-100 rounded mb-2" />
                        <a href="#" onClick={handleforgotpassword} className="text-sm text-gray-600 mb-4">Forgot your password?</a>
                        <button type="submit" className="bg-[#390611] hover:bg-[#4d0a15] text-white px-6 py-2 rounded uppercase text-sm">Sign In</button>
                    </form>
                </div>

                {/* Sign Up Form */}
                <div className={`w-full max-w-md bg-white p-8 transform transition-transform duration-500 absolute ${isSignUp ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}`}>
                    <form className="flex flex-col" onSubmit={(e) => e.preventDefault()}>
                        <h1 className="text-2xl font-bold mb-4 text-center">Create Account</h1>
                        <div className="flex justify-center space-x-2 mb-4">
                            <a href="#" className="p-2 border rounded-full"><FaFacebookF /></a>
                            <a href="#" className="p-2 border rounded-full"><FaGooglePlusG /></a>
                            <a href="#" className="p-2 border rounded-full"><FaLinkedinIn /></a>
                        </div>
                        <span className="text-sm mb-2 text-center">or use your email for registration</span>
                        <div className="flex gap-2 mb-2">
                            <input type="text" name="firstName" placeholder="First Name" onChange={handleChange} className="flex-1 p-2 bg-gray-100 rounded" />
                        </div>
                        <input type="text" name="lastName" placeholder="Last Name" onChange={handleChange} className="flex-1 p-2 mb-2 bg-gray-100 rounded" />
                        <input type="email" name="email" placeholder="Email" onChange={handleChange} className="p-2 bg-gray-100 rounded mb-2" />
                        <input type="text" name="phone" placeholder="Phone Number" onChange={handleChange} className="p-2 bg-gray-100 rounded mb-2" />
                        <input type="password" name="password" placeholder="Password" onChange={handleChange} className="p-2 bg-gray-100 rounded mb-2" />
                        <input type="password" name="confirmPassword" placeholder="Confirm Password" onChange={handleChange} className="p-2 bg-gray-100 rounded mb-2" />
                        <input type="text" name="referralCode" placeholder="Referral Code (Optional)" onChange={handleChange} className="p-2 bg-gray-100 rounded mb-4" />
                        <button type="button" onClick={handleRegister} className="bg-[#390611] hover:bg-[#4d0a15] text-white px-6 py-2 rounded uppercase text-sm">Sign Up</button>
                    </form>
                </div>

                <ToastContainer position="top-right" autoClose={3000} />
            </div>
        </>
    );
};

export default SignInUpForm;
