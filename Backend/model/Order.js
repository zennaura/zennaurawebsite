  const mongoose = require("mongoose");

  const orderSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    orderItems: [{
      product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true },
    }],
    shippingAddress: { type: String, required: true },
    paymentMethod: { type: String, required: true }, // COD, Card, UPI
    paymentStatus: { type: String, enum: ["Pending", "Paid"], default: "Pending" },
    totalAmount: { type: Number, required: true },
    orderStatus: { type: String, enum: ["Processing", "Shipped", "Delivered"], default: "Processing" },
  }, { timestamps: true });

  module.exports = mongoose.model("Order", orderSchema);
    