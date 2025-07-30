import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

<<<<<<< HEAD
=======
// Config imports
>>>>>>> 2c7ee9272caece03fdd2723e4154937f7364531a
import { connectDb } from "./config/connectDB.js";
import { connectCloudinary } from "./config/cloudinary.js";

// Route imports
import userRoutes from "./routes/user.routes.js";
import sellerRoutes from "./routes/seller.routes.js";
import productRoutes from "./routes/product.routes.js";
<<<<<<< HEAD
import { connectCloudinary } from "./config/cloudinary.js";
import cartRoutes from "./routes/cart.routes.js";
import orderRoutes from "./routes/order.routes.js";
import addressRoutes from "./routes/address.routes.js";

dotenv.config();
=======
import cartRoutes from "./routes/cart.routes.js";
import orderRoutes from "./routes/order.routes.js";
import addressRoutes from "./routes/address.routes.js";
>>>>>>> 2c7ee9272caece03fdd2723e4154937f7364531a

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

<<<<<<< HEAD
// Database and Cloudinary connect
=======
// Connect to DB and Cloudinary
>>>>>>> 2c7ee9272caece03fdd2723e4154937f7364531a
connectDb();
connectCloudinary();

// Middleware
app.use(express.json());
app.use(cookieParser());

<<<<<<< HEAD
// Routes
app.get("/", (req, res) => {
  res.send("Welcome to the Grocery API");
});
=======
// API routes
>>>>>>> 2c7ee9272caece03fdd2723e4154937f7364531a
app.use("/api/user", userRoutes);
app.use("/api/seller", sellerRoutes);
app.use("/api/product", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/order", orderRoutes);
app.use("/api/address", addressRoutes);

<<<<<<< HEAD
// ------------------------ Serve React Static Files ------------------------
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files from React Vite build
app.use(express.static(path.join(__dirname, "dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});
// -------------------------------------------------------------------------

// Start Server
app.listen(PORT, () => console.log("Server is running on port", PORT));
=======
// Serve frontend (React build)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, "../client/dist")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/dist/index.html"));
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});
>>>>>>> 2c7ee9272caece03fdd2723e4154937f7364531a
