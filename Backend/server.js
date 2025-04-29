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
const cloudnaryimgRoutes = require("./routes/Cloudnaryimg")
const cartRoutes = require("./routes/Cart-routes");
const wishlistRoute = require("./routes/Wishlist-routes");
const userDashboardRoutes = require("./routes/UserDashboard");

dotenv.config();

// Initialize Express App
const app = express();

// Middleware
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(bodyParser.json()); // To parse application/json
app.use(bodyParser.urlencoded({ extended: true })); // To parse application/x-www-form-urlencoded

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

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
