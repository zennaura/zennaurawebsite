import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
        referralCode: ""
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleRegister = async () => {
        if (formData.phone.length !== 9) {
            toast.error("❌ Contact number must be 9 digits!");
            return;
        }

        try {
            const response = await axios.post(`${process.env.REACT_APP_BACKEND_LINK}/register`, formData);
            toast.success(`✅ ${response.data.message}`);
        } catch (error) {
            toast.error(`❌ ${error.response.data.message}`);
        }
    };

    return (
        <div>
            <h2>Register</h2>
            <input type="text" name="firstName" placeholder="First Name" onChange={handleChange} />
            <input type="text" name="lastName" placeholder="Last Name" onChange={handleChange} />
            <input type="email" name="email" placeholder="Email" onChange={handleChange} />
            <input type="text" name="phone" placeholder="Phone Number" onChange={handleChange} />
            <input type="password" name="password" placeholder="Password" onChange={handleChange} />
            <input type="password" name="confirmPassword" placeholder="Confirm Password" onChange={handleChange} />
            <input type="text" name="referralCode" placeholder="Referral Code (Optional)" onChange={handleChange} />
            <button onClick={handleRegister}>Register</button>

            {/* Toast Container (for notifications) */}
            <ToastContainer position="top-right" autoClose={3000} />
        </div>
    );
};

export default Register;
