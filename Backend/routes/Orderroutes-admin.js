const express = require("express");
const router = express.Router();
const Order = require("../model/Order");

// Get all orders
router.get("/getAllOrders", async (req, res) => {
  try {
    const orders = await Order.find({}).sort({ createdAt: -1 }); // Sort in descending order

    if (!orders.length) {
      return res.status(404).json({
        success: false,
        message: "No orders found!",
      });
    }

    res.status(200).json({
      success: true,
      data: orders
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occurred!",
    });
  }
});

router.put('/updateStatus/:orderId', async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    const validStatuses = ['processing', 'shipped', 'delivered', 'cancelled'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: 'Invalid status value' });
    }

    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      { orderStatus: status },
      { new: true }
    ).populate('user', 'name email phone');

    if (!updatedOrder) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.json({
      message: 'Order status updated successfully',
      order: updatedOrder
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});


// Get order details by ID for admin
router.get("/getOrderDetailsForAdmin/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const order = await Order.findById(id).populate("user").populate("orderItems.product");

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
      message: "Some error occurred!",
    });
  }
});

// Update order status
router.put('/updateOrderStatus/:orderId', async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    if (!['Processing', 'Shipped', 'Delivered', 'Cancelled'].includes(status)) {
      return res.status(400).json({ 
        success: false,
        message: 'Invalid status value' 
      });
    }

    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      { orderStatus: status },
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({ 
        success: false,
        message: 'Order not found' 
      });
    }

    res.json({ 
      success: true,
      message: 'Order status updated successfully',
      data: updatedOrder
    });
  } catch (error) {
    console.error('Error updating order status:', error);
    res.status(500).json({ 
      success: false,
      message: 'Server error while updating order status' 
    });
  }
});

module.exports = router;
