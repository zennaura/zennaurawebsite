const express = require('express')
const Order = require("../model/Order")
const Cart = require("../model/Cart");
const Product = require("../model/Product");
const router = express.Router();


// Create Order Route
router.post('/placeorder', async (req, res) => {
  try {
    const {
      user,           // Changed from userId
      orderItems,     // Changed from individual productId/quantity
      shippingAddress,
      paymentMethod,
      totalAmount
    } = req.body;

    // Create a new order
    const order = new Order({
      user: user,
      orderItems: orderItems.map(item => ({
        product: item.product,
        quantity: item.quantity,
        price: item.price       // Changed from calculated price
      })),
      shippingAddress,
      paymentMethod,
      totalAmount,
      orderStatus: "Processing"
    });

    await order.save();

    res.status(201).json({
      success: true,
      message: "Order placed successfully",
      order
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
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