import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import { connectDb } from "./config/connectDB.js";
import userRoutes from "./routes/user.routes.js";
import sellerRoutes from "./routes/seller.routes.js";
import productRoutes from "./routes/product.routes.js";
import { connectCloudinary } from "./config/cloudinary.js";
import cartRoutes from "./routes/cart.routes.js"
import orderRoutes from "./routes/order.routes.js";
import addressRoutes from "./routes/address.routes.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT
const allowedOrigins = [process.env.CORS_ORIGIN]; 
connectDb();
connectCloudinary();
//Middleware
app.use(express.json());
app.use(cors({
  origin: function(origin, callback){
    if (!origin) {
      return callback(null, true); // Allow requests like Postman or file://
    }
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      console.warn("Blocked by CORS:", origin);
      return callback(new Error('The CORS policy for this site does not allow access from the specified Origin.'), false);
    }
  },
  credentials: true,
}));


app.get("/", (req, res) => {
  res.send("Welcome to the Grocery API");
})
app.use(cookieParser());
app.use("/images", express.static("uploads"));
app.use("/api/user", userRoutes);
app.use("/api/seller", sellerRoutes);
app.use("/api/product", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/order", orderRoutes);
app.use("/api/address", addressRoutes);
app.listen(PORT, () => console.log("Server is running on port 3000"));
