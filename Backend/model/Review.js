const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema({
  productId: { type: String, required: true },
  variantId: { type: String },
  rating: { type: Number, required: true },
  title: { type: String},
  reviewText: { type: String, required: true },
  youtubeURL: { type: String },
  name: { type: String, required: true },
  email: { type: String, required: true },
  mediaUrls: [String],
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Review", ReviewSchema);
