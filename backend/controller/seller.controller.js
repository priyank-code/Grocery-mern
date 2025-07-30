import jwt from "jsonwebtoken";

//seller login : POST /api/seller/login
export const sellerLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (
      password === process.env.SELLER_PASSWORD &&
      email === process.env.SELLER_EMAIL
    ) {
      const token = jwt.sign({ email }, process.env.JWT_SECRET, {
        expiresIn: "7d",
      });
      res.cookie("sellerToken", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "None" : "Strict",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      });
      res.status(200).json({
        message: "Seller login successful",
        success: true,
      });
    }
    else {
      res.status(401).json({
        message: "Invalid credentials",
      });
    }
  } catch (error) {
    console.error("Error in sellerLogin:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// logout seller : /api/seller/logout   
export const sellerLogout  = (req, res) => {
  try {
    res.clearCookie("sellerToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "None" : "Strict",
    });
    res.status(200).json({ message: "Seller logged out successfully", success: true });
  } catch (error) {
    console.error("Error in logoutSeller:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

// check auth seller : /api/seller/is-auth

export const isAuthSeller = (req, res) => {
  try {
    const token = req.cookies.sellerToken;

    if (!token) {
      return res.status(401).json({ message: "No token, authentication failed" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    res.status(200).json({
      message: "Seller is authenticated",
      success: true,
      seller: decoded,
    });
  } catch (err) {
    console.error("Error in isAuthSeller:", err);
    res.status(401).json({ message: "Invalid or expired token" });
  }
}