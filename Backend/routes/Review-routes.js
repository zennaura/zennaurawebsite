const express = require("express");
const router = express.Router();

// Optional: Add a Review model if you're using MongoDB
const Review = require("../model/Review"); // adjust path as needed

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

    // Option 1: Save to database (e.g., MongoDB)
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

    // Option 2: If no DB, just log to console (for testing)
    // console.log("Review received:", req.body);

    res.status(201).json({ message: "Review submitted successfully" });
  } catch (error) {
    console.error("Error saving review:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
