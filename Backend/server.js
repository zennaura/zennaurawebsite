const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");

// Routes
const RegisterLogin = require("./routes/registrationlogin");
const productRoutes = require("./routes/productRoutes");
const orderRoutesadmin = require("./routes/Orderroutes-admin");
const orderRoutesuser = require("./routes/order-routes-user");
const cloudnaryimgRoutes = require("./routes/Cloudnaryimg");
const cartRoutes = require("./routes/Cart-routes");
const wishlistRoute = require("./routes/Wishlist-routes");
const userDashboardRoutes = require("./routes/UserDashboard");
const sendEmailRoute = require('./routes/EmailRoute');
const reviewRoutes = require("./routes/Review-routes");
const Coupon_Routes = require("./routes/Coupon_Routes");
const contact_route = require('./routes/ContactQuery_Routes')
const paymentRoutes = require("./routes/paymentRoutes");


dotenv.config();

// Initialize Express App
const app = express();

// Allowed origins for CORS
const allowedOrigins = [
  "https://zennaurawebsite.vercel.app",
  "http://localhost:5173",
  "https://www.zennaura.in",
  "https://zennaura.in",
  "http://192.168.224.77:5173"
];

// CORS Middleware
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));

// Body Parsers
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// Routes
app.use("/api/auth", RegisterLogin);
app.use("/api", productRoutes);
app.use("/api/order", orderRoutesadmin);
app.use("/api/userorder", orderRoutesuser);
app.use("/api/cloudnaryimg", cloudnaryimgRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/wishlist", wishlistRoute);
app.use("/api/userdashboard", userDashboardRoutes);
app.use('/api/email', sendEmailRoute);
app.use("/api", reviewRoutes);
app.use("/api/coupons", Coupon_Routes);
app.use("/api/contact", contact_route);
app.use('/api/payment', paymentRoutes);

// Start Server
const PORT = process.env.PORT || 5002;
app.listen(PORT, "0.0.0.0", () => console.log(`🚀 Server running on port ${PORT}`));
