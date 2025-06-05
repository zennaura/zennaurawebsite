const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  // For logged-in users (optional)
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User" 
  },
  
  // For guest users (optional)
  guestUser: {
    firstName: { type: String },
    lastName: { type: String },
    email: { 
      type: String,
      validate: {
        validator: function(v) {
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
        },
        message: props => `${props.value} is not a valid email address!`
      }
    },
    phone: { type: String }
  },

  // Order items (required)
  orderItems: [{
    product: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "Product", 
      required: true 
    },
    quantity: { 
      type: Number, 
      required: true,
      min: [1, 'Quantity must be at least 1']
    },
    price: { 
      type: Number, 
      required: true,
      min: [0, 'Price cannot be negative']
    },
    name: {
      type: String,
      required: true,
      default: "Unknown Product"
    },
    image: {
      type: String,
      required: true,
      default: "https://via.placeholder.com/50"
    },
    size: {
      type: String,
      default: null
    },
    color: {
      type: String,
      default: null
    }
  }],

  // Shipping information (required)
  shippingAddress: { 
    type: String, 
    required: true 
  },

  // Payment information (required)
  paymentMethod: { 
    type: String, 
    required: true,
    enum: ["COD", "Card", "UPI","Razor Pay"],
    default: "COD"
  },

  paymentStatus: { 
    type: String, 
    enum: ["Pending", "Paid", "Failed", "Refunded"], 
    default: "Pending" 
  },

  // Financial information (required)
  totalAmount: { 
    type: Number, 
    required: true,
    min: [0, 'Total amount cannot be negative']
  },

  // Order status tracking
  orderStatus: { 
    type: String, 
    enum: ["Processing", "Shipped", "Delivered", "Cancelled"], 
    default: "Processing" 
  },

  // Flags
  isGuestOrder: {
    type: Boolean,
    default: false
  }

}, { 
  timestamps: true,
  // Validate that either user or guestUser exists
  validate: {
    validator: function() {
      return this.user || (this.guestUser && this.guestUser.email && this.guestUser.phone);
    },
    message: 'Either user reference or complete guest information is required'
  }
});

module.exports = mongoose.model("Order", orderSchema);