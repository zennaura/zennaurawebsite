const express = require('express')
const Order = require("../model/Order")
const Cart = require("../model/Cart");
const Product = require("../model/Product");
const router = express.Router();


// Create Order Route
router.post('/placeorder', async (req, res) => {
  try {
    const {
      user,           // Will be null for guest users
      guestUser,      // Contains guest user info
      orderItems,
      shippingAddress,
      paymentMethod,
      totalAmount
    } = req.body;

    // Validate order items
    if (!orderItems || orderItems.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Your cart is empty"
      });
    }

    // Validate required fields for guest checkout
    if (!user) {
      if (!guestUser?.firstName || !guestUser?.lastName || !guestUser?.email || !guestUser?.phone) {
        return res.status(400).json({
          success: false,
          message: "Please provide all required guest information"
        });
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(guestUser.email)) {
        return res.status(400).json({
          success: false,
          message: "Please provide a valid email address"
        });
      }
    }

    // Create the order
    const order = new Order({
      user: user || null,
      guestUser: !user ? guestUser : null,
      orderItems: orderItems.map(item => ({
        product: item.product,
        quantity: item.quantity,
        price: item.price
      })),
      shippingAddress,
      paymentMethod,
      totalAmount,
      orderStatus: "Processing",
      isGuestOrder: !user
    });

    await order.save();

    res.status(201).json({
      success: true,
      message: "Order placed successfully",
      order
    });

  } catch (error) {
    console.error("Order placement error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to place order"
    });
  }
});

router.get("/getAllOrdersByUser" , async (req, res) => {
    try {
      const { userId } = req.params;
  
      const orders = await Order.find({ userId });
  
      if (!orders.length) {
        return res.status(404).json({
          success: false,
          message: "No orders found!",
        });
      }
  
      res.status(200).json({
        success: true,
        data: orders,
      });
    } catch (e) {
      console.log(e);
      res.status(500).json({
        success: false,
        message: "Some error occured!",
      });
    }
  });

  router.get("/getOrderDetails" , async (req, res) => {
    try {
      const { id } = req.params;
  
      const order = await Order.findById(id);
  
      if (!order) {
        return res.status(404).json({
          success: false,
          message: "Order not found!",
        });
      }
  
      res.status(200).json({
        success: true,
        data: order,
      });
    } catch (e) {
      console.log(e);
      res.status(500).json({
        success: false,
        message: "Some error occured!",
      });
    }
  });


  module.exports = router;