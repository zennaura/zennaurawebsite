
const express = require("express");
const router = express.Router();
const Cart = require("../model/Cart");
const Product = require("../model/Product");



// Add to Cart with Variant Support
router.post("/add", async (req, res) => {
  try {
    const { productId, variantId, userId } = req.body;
    // console.log("Request body:", req.body);

    // Extract base product ID (removes variant suffix if exists)
    const baseProductId = productId.includes('-') 
      ? productId.split('-')[0]
      : productId;

    // Validate product exists
    const product = await Product.findById(baseProductId);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    // Verify variant exists in product
    const variantExists = product.variants.some(
      (_, index) => index.toString() === variantId
    );
    if (!variantExists) {
      return res.status(400).json({ error: "Invalid product variant" });
    }

    // Find or create cart
    let cart = await Cart.findOne({ userId }) || 
               new Cart({ userId, items: [] });

    // Check if this exact variant already exists in cart
    const existingItemIndex = cart.items.findIndex(
      item => item.productId.toString() === baseProductId && 
              item.variantId === variantId
    );

    if (existingItemIndex >= 0) {
      cart.items[existingItemIndex].quantity += 1;
    } else {
      cart.items.push({
        productId: baseProductId,
        variantId,
        quantity: 1
      });
    }

    await cart.save();
    res.status(200).json(cart);
    
  } catch (err) {
    console.error("Cart error:", err);
    res.status(500).json({ error: "Server error" });
  }
});


// Get Cart
// routes/cartRoutes.js
router.get("/fetchCartItems", async (req, res) => {
  try {
    const { userId } = req.query; // Changed from body to query params

    const cart = await Cart.findOne({ userId }).populate({
      path: 'items.productId',
      model: 'Product',
      select: 'name title frontImage variants' // Include variants to match with variantId
    });

    if (!cart) {
      return res.status(200).json({ items: [] });
    }

    // Map items with variant details
    const enrichedItems = cart.items.map(item => {
      const product = item.productId;
      const variant = product.variants[item.variantId] || {};
      
      return {
        _id: item._id,
        productId: product._id,
        variantId: item.variantId,
        name: product.name,
        title: product.title,
        image: product.frontImage,
        price: variant.salePrice || product.salePrice,
        originalPrice: variant.costPrice || product.costPrice,
        discount: variant.discount || product.discount,
        quantity: item.quantity
      };
    });

    res.status(200).json({ items: enrichedItems });
  } catch (err) {
    console.error("Fetch cart error:", err);
    res.status(500).json({ error: "Server error" });
  }
});


// Update item quantity
router.put("/updateQuantity", async (req, res) => {
  try {
    const { userId, productId, variantId, quantity } = req.body;

    const cart = await Cart.findOne({ userId });
    if (!cart) return res.status(404).json({ error: "Cart not found" });

    const itemIndex = cart.items.findIndex(
      item => item.productId.toString() === productId && 
             item.variantId === variantId
    );

    if (itemIndex === -1) {
      return res.status(404).json({ error: "Item not found in cart" });
    }

    cart.items[itemIndex].quantity = quantity;
    await cart.save();
    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// Remove item from cart
router.delete("/removeItem", async (req, res) => {
  try {
    const { userId, productId, variantId } = req.body;

    const cart = await Cart.findOne({ userId });
    if (!cart) return res.status(404).json({ error: "Cart not found" });

    cart.items = cart.items.filter(
      item => !(item.productId.toString() === productId && 
               item.variantId === variantId)
    );

    await cart.save();
    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});
module.exports = router;


