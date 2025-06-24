const mongoose = require("mongoose");

const couponSchema = new mongoose.Schema({
  code: { 
    type: String, 
    required: true, 
    unique: true 
  },
  discount: { 
    type: Number,  
    required: true,
    min: 0,
    max: 100
  }, 
  expiryDate: { 
    type: Date, 
    required: true 
  },
  isActive: { 
    type: Boolean, 
    default: true 
  },
  oneTimePerUser: {
    type: Boolean,
    default: false
  },
  minCartValue: {
    type: Number,
    default: 0
  },
  usedByUsers: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User",
    default: null
  }]
}, { 
  timestamps: true 
});

module.exports = mongoose.model("Coupon", couponSchema);
