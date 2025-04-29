const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    // Registration information
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    referralCode: { type: String, default: "" },
    verified: { type: Boolean, default: true },
    userRole: { type: String, enum: ["admin", "user"], default: "user" },
    
    // Profile information
    Points: { type: Number, default: 0 },
    profilePicture: { type: String, default: "" },
    Address: [{
        addressLine1: { type: String, default: "" },
        addressLine2: { type: String, default: "" },
        city: { type: String, default: "" },
        state: { type: String, default: "" },
        country: { type: String, default: "" },
        zipCode: { type: String, default: "" },
        time: { type: Date, default: Date.now },
        isDefault: { type: Boolean, default: false },
    }],
    dateOfBirth: { type: Date, default: null },
    dateOfAnniversary: { type: Date, default: null },
    gender: { type: String, enum: ["male", "female", "other"] },

}, { timestamps: true });

module.exports = mongoose.model("User", UserSchema);