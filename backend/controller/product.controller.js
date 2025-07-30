import Product from "../models/product.model.js";
import cloudinary from "../config/cloudinary.js";
import streamifier from "streamifier";

// add product : POST /api/product/add-product
// export const addProduct = async (req, res) => {
//   try {
//     const { name, description, price, offerPrice, category } = req.body;
//     const image = req.files?.map((file) => file.filename);
//     if(!name || !description || !price || !offerPrice || !category || !image || image.length === 0){
//       return res.status(400).json({success: false, message: "All fields including image are required"});
//     }
//     await Product.create({
//       name,
//       description,
//       price,
//       offerPrice,
//       image,
//       category,
//     });
//     res
//       .status(201)
//       .json({ message: "Product added successfully", success: true });
//   } catch (error) {
//     res
//       .status(500)
//       .json({ message: "Internal Server Error", error: error.message });
//   }
// };
// add product : POST /api/product/add-product
export const addProduct = async (req, res) => {
  try {
    const { name, description, price, offerPrice, category } = req.body;

    // Basic field validation
    if (!name || !description || !price || !offerPrice || !category) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Image file validation
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        message: "At least one image is required",
      });
    }

    // Cloudinary Upload Function
    const uploadToCloudinary = (file) => {
      return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            folder: "products", // Cloudinary folder (optional)
            resource_type: "image",
          },
          (error, result) => {
            if (result) resolve(result.secure_url);
            else{
              console.log("Cloudinary Upload Error: ", error);
              reject(error);
            }
          }
        );

        streamifier.createReadStream(file.buffer).pipe(uploadStream);
      });
    };

    // Upload all images in parallel
    const imageUrls = await Promise.all(req.files.map(uploadToCloudinary));

    // Save to DB
    await Product.create({
      name,
      description,
      price,
      offerPrice,
      category,
      image: imageUrls, // array of secure URLs
    });

    res.status(201).json({
      success: true,
      message: "Product added successfully",
    });

  } catch (error) {
    console.log("Server Error: ", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

// get products : POST /api/product/get
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find({}).sort({ createdAt: -1 });
    res.status(200).json({ products, success: true });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

// get single product : GET /api/product/id
export const getProductById = async (req, res) => {
  try {
    const { id } = req.params; // ✅ use req.params instead of req.body
    const product = await Product.findById(id);
    if (!product) {
      return res
        .status(404)
        .json({ message: "Product not found", success: false });
    }
    res.status(200).json({ product, success: true });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};


// change stock : POST /api/product/stock
export const changeStock = async (req, res) => {
  try {
    const { id, inStock } = req.body;
    const product = await Product.findByIdAndUpdate(
      id,
      { inStock},
      { new: true }
    );
    if (!product) {
      return res
        .status(404)
        .json({ message: "Product not found", success: false });
    }
    res
      .status(200)
      .json({ message: "Stock updated successfully", success: true, product });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};
