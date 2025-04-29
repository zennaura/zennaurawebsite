const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User",
    required: true 
  },
  items: [{
    productId: { 
      type: mongoose.Schema.Types.ObjectId,  // Stores base product ID
      ref: "Product",
      required: true 
    },
    variantId: { 
      type: String,  // Stores the variant identifier ("0", "1", etc.)
      required: true 
    },
    quantity: { 
      type: Number, 
      required: true,
      min: 1,
      default: 1 
    }
  }]
}, { timestamps: true });

module.exports = mongoose.model("Cart", cartSchema);