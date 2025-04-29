const express = require("express");
const router = express.Router();
const Wishlist = require("../model/Wishlist");

// Add or remove a product from the wishlist
router.post("/toggle", async (req, res) => {
  const { userId, productId, variantId } = req.body;

  try {
    // Find the user's wishlist
    let wishlist = await Wishlist.findOne({ userId });

    if (!wishlist) {
      // If no wishlist exists, create one
      wishlist = new Wishlist({ userId, items: [] });
    }

    // Check if the product is already in the wishlist
    const itemIndex = wishlist.items.findIndex(
      (item) => item.productId.toString() === productId && item.variantId === variantId
    );

    if (itemIndex > -1) {
      // Remove the product if it's already in the wishlist
      wishlist.items.splice(itemIndex, 1);
    } else {
      // Add the product to the wishlist
      wishlist.items.push({ productId, variantId });
    }

    // Save the updated wishlist
    await wishlist.save();

    return res.status(200).json({ message: "Wishlist updated successfully", wishlist });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to update wishlist" });
  }
});

// Fetch user's wishlist
router.get("/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    const wishlist = await Wishlist.findOne({ userId }).populate("items.productId");
    if (!wishlist) {
      return res.status(200).json({ items: [] }); // Return empty wishlist if none exists
    }

    return res.status(200).json(wishlist);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to fetch wishlist" });
  }
});

module.exports = router;