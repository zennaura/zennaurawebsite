const express = require("express");
const router = express.Router();

// Optional: Add a Review model if you're using MongoDB
const Review = require("../model/Review"); // adjust path as needed
const Product = require('../model/Product');

// POST /api/reviews
router.post("/reviews", async (req, res) => {
  try {
    const {
      productId,
      variantId,
      rating,
      title,
      reviewText,
      youtubeURL,
      name,
      email,
      mediaUrls, // array of image/video URLs from Cloudinary
    } = req.body;

    // Basic validation
    if (!productId || !rating || !title || !reviewText || !name || !email) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Save to Review collection
    const newReview = new Review({
      productId,
      variantId,
      rating,
      title,
      reviewText,
      youtubeURL,
      name,
      email,
      mediaUrls,
      createdAt: new Date(),
    });

    await newReview.save();

    // Also push to Product's reviews array
    const product = await Product.findById(productId);
    if (product) {
      product.reviews.push({
        user: name,
        comment: reviewText,
        rating: rating,
        date: new Date(),
        mediaUrls: mediaUrls || [],
        title: title || '',
        youtubeURL: youtubeURL || ''
      });
      await product.calculateAverageRating();
      await product.save();
    }

    res.status(201).json({ message: "Review submitted successfully" });
  } catch (error) {
    console.error("Error saving review:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
