// import multer from "multer";

// const storage = multer.diskStorage({
//   destination: "uploads", 
//   filename: (req, file, cb) => {
//     return cb(null, `${Date.now()}${file.originalname}`);
//   }
// })

// export const upload = multer({storage: storage})


import multer from "multer";

// Using memoryStorage to get buffer for Cloudinary upload
const storage = multer.memoryStorage();

export const upload = multer({ storage });