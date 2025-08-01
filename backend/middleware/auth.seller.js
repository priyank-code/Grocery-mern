import jwt from "jsonwebtoken";

export const authSeller = (req, res, next) => {
  try {
    const {sellerToken} = req.cookies;
  if(!sellerToken)
  {
    return res.status(401).json({ message: "Unauthorized access", success: false });
  }
  const decoded = jwt.verify(sellerToken, process.env.JWT_SECRET);
  if(decoded.email === process.env.SELLER_EMAIL) {
    next();
  }
  } catch (error) {
    console.error("Error in authUser middleware:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}