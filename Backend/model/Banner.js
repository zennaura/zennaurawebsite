const mongoose = require("mongoose");

const bannerSchema = new mongoose.Schema({
  image: { type: String, required: true }, // URL of the banner image
  title: { type: String },
  description: { type: String },
  link: { type: String }, // Redirect URL
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

module.exports = mongoose.model("Banner", bannerSchema);
