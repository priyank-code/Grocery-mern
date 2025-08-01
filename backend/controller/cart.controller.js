import User from "../models/user.model.js";

// update user cartData : /api/cart/update

export const updateCart = async (req, res) => {
  try {
    const userId = req.user;
    const { cartItems } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { cartItems },
      { new: true }
    );
    if (!updatedUser) {
      return res
        .status(404)
        .json({ message: "User not found", success: false });
    }
    res.status(200).json({
      message: "Cart updated successfully",
      success: true,
    });
  } catch (error) {}
};
