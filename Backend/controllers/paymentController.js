const Razorpay = require("razorpay");
const crypto = require("crypto");
const Order = require("../model/Order");

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

exports.createOrder = async (req, res) => {
  try {
    const { amount } = req.body;

    const options = {
      amount: amount * 100, // in paise
      currency: "INR",
      receipt: `receipt_order_${Date.now()}`
    };

    const order = await razorpay.orders.create(options);
    res.status(200).json(order);
  } catch (err) {
    console.error("Razorpay order error:", err);
    res.status(500).json({ error: "Failed to create Razorpay order" });
  }
};

exports.verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      orderData
    } = req.body;

    // Verify the payment signature
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest("hex");

    const isAuthentic = expectedSignature === razorpay_signature;

    if (!isAuthentic) {
      return res.status(400).json({
        success: false,
        message: "Payment verification failed"
      });
    }

    // If payment is verified, create the order
    try {
      const order = new Order({
        user: orderData.user || null,
        guestUser: !orderData.user ? orderData.guestUser : null,
        orderItems: orderData.orderItems,
        shippingAddress: orderData.shippingAddress,
        paymentMethod: "UPI",
        totalAmount: orderData.totalAmount,
        orderStatus: "Processing",
        isGuestOrder: !orderData.user,
        paymentStatus: "Paid",
        transactionId: razorpay_payment_id,
        razorpayOrderId: razorpay_order_id
      });

      await order.save();

      res.status(201).json({
        success: true,
        message: "Payment verified and order placed successfully",
        order,
        paymentId: razorpay_payment_id
      });

    } catch (orderError) {
      console.error("Order creation error:", orderError);
      res.status(500).json({
        success: false,
        message: "Payment verified but failed to create order"
      });
    }

  } catch (err) {
    console.error("Payment verification error:", err);
    res.status(500).json({
      success: false,
      message: "Failed to verify payment"
    });
  }
};

