const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const Router = express.Router();
const User = require("../model/UserRegistration");

// Register User API
Router.post("/register", async (req, res) => {
    try {
        const { firstName, lastName, email, phone, password, confirmPassword, referralCode } = req.body;

        console.log("📥 Received Registration Data:", req.body);  // ADD THIS LINE

        // Validate
        if (!firstName || !lastName || !email || !phone || !password || !confirmPassword) {
            return res.status(400).json({ message: "All fields are required!" });
        }

        // Existing user check
        const existingUser = await User.findOne({ $or: [{ email }, { phone }] });
        if (existingUser) {
            return res.status(400).json({
                message: existingUser.email === email
                    ? "User with this email already exists!"
                    : "Contact number already exists!",
            });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            firstName,
            lastName,
            email,
            phone,
            password: hashedPassword,
            referralCode,
            verified: true,
        });

        console.log("✅ Saving New User:", newUser); // ADD THIS LINE

        await newUser.save();

        res.status(201).json({ success: true , message: "User registered successfully!" });

    } catch (error) {
        console.error("❌ Registration Error:", error);
        res.status(500).json({ message: "Internal server error during registration", error: error.message });
    }
});



// Login API
Router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required!" });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        res.status(200).json({ message: "Login successful", userData: user });

    } catch (error) {
        console.error("❌ Login Error:", error);
        res.status(500).json({ message: "Internal server error during login", error: error.message });
    }
});

Router.post("/resetpassword", async (req, res) => {
    try {
        const { email, newPassword, confirmPassword } = req.body;

        // Validate input (same validation pattern as register route)
        if (!email || !newPassword || !confirmPassword) {
            return res.status(400).json({ message: "All fields are required!" });
        }

        if (newPassword !== confirmPassword) {
            return res.status(400).json({ message: "Passwords don't match!" });
        }

        // Find user (same pattern as login route)
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        // Hash new password (same bcrypt pattern as register route)
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Update user password
        user.password = hashedPassword;
        await user.save();

        res.status(200).json({ 
            success: true, 
            message: "Password reset successfully!" 
        });

    } catch (error) {
        console.error("❌ Password Reset Error:", error);
        res.status(500).json({ 
            message: "Internal server error during password reset", 
            error: error.message 
        });
    }
});


module.exports = Router;
