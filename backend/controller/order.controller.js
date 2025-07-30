import Order from "../models/order.model.js";
import Product from "../models/product.model.js";
import Stripe from "stripe";

// Place order COD: /api/order/cod
export const placeOrderCOD = async (req, res) => {
  try {
    const userId = req.user;
    const { items, address } = req.body;

    if (!items || !address) {
      return res
        .status(400)
        .json({ message: "Items and address are required", success: false });
    }
    let amount = await items.reduce(async (acc, item) => {
      const product = await Product.findById(item.productId);
      return (await acc) + product.offerPrice * item.quantity;
    }, 0);

    amount += Math.floor(amount * 2) / 100;

    // Create a order
    await Order.create({
      userId,
      items,
      address,
      amount,
      status: "Placed",
      paymentType: "COD",
      isPaid: false,
    });
    res.status(201).json({
      message: "Order placed successfully",
      success: true,
    });
  } catch (error) {
    console.error("Error placing order:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Place order Stripe: /api/order/stripe
export const placeOrderStripe = async (req, res) => {
  try {
    const userId = req.user;
    const { items, address } = req.body;
    const { origin } = req.headers;

    // Validate inputs
    if (!items || !address) {
      return res.status(400).json({
        message: "Items and address are required",
        success: false,
      });
    }

    const stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY);
    let productData = [];
    let subtotal = 0;

    // Calculate subtotal and prepare line items
    for (const item of items) {
      const product = await Product.findById(item.productId);
      if (!product) continue;

      const itemTotal = product.offerPrice * item.quantity;
      subtotal += itemTotal;

      productData.push({
        name: product.name,
        price: product.offerPrice,
        quantity: item.quantity,
      });
    }

    // Calculate 2% tax
    const taxAmount = Math.floor(subtotal * 0.02 * 100); // in cents
    const totalAmount = subtotal + taxAmount / 100;

    // Build Stripe line items
    const lineItems = productData.map((item) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: item.name,
        },
        unit_amount: Math.floor(item.price * 100), // in cents
      },
      quantity: item.quantity,
    }));

    // Add tax as separate line item
    lineItems.push({
      price_data: {
        currency: "usd",
        product_data: {
          name: "Tax (2%)",
        },
        unit_amount: taxAmount, // in cents
      },
      quantity: 1,
    });

    // Create the order in database
    const order = await Order.create({
      userId,
      items,
      address,
      amount: totalAmount,
      status: "Placed",
      paymentType: "Online",
      isPaid: true,
    });

    // Create Stripe Checkout session
    const session = await stripeInstance.checkout.sessions.create({
      line_items: lineItems,
      mode: "payment",
      success_url: `${origin}/loader?next=orders`,
      cancel_url: `${origin}/cart`,
      metadata: {
        orderId: order._id.toString(),
        userId,
      },
    });

    res.status(201).json({
      message: "Order placed successfully",
      success: true,
      url: session.url,
    });
  } catch (error) {
    console.error("Error placing order via Stripe:", error);
    res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};


// order details for individual user : /api/order/user
export const getUserOrders = async (req, res) => {
  try {
    const userId = req.user;
    const orders = await Order.find({
      userId,
      $or: [{ paymentType: "COD" }, { isPaid: true }],
    })
      .populate("items.productId address")
      .sort({ createdAt: -1 });
    res.status(200).json({ success: true, orders });
  } catch (error) {
    console.error("Error fetching user orders:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// get all orders for admin: /api/order/seller
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({})
      .populate("items.productId address")
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, orders });
  } catch (error) {
    console.error("Error fetching all orders:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

