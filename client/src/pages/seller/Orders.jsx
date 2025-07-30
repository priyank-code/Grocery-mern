import React, { useContext, useEffect, useState } from "react";
import { assets, dummyOrders } from "../../assets/assets";
import { AppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const Orders = () => {
  const {axios} = useContext(AppContext);
  const URL = import.meta.env.VITE_BACKEND_URL;
  const [orders, setOrders] = useState([]);
  const fetchOrders = async () => {
    try {
      const {data} = await axios.get("/api/order/seller");
      console.log(data);
      if(data.success) {
        setOrders(data.orders);
      } else {
       toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message || "Failed to fetch orders");
    }
  };

  useEffect(() => {
    fetchOrders();
  },[]);

  return (
    <div className="p-4 md:p-10 ">
  <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-6">🧾 Orders List</h2>

  <div className="space-y-6">
    {orders.map((order) => (
      <div
        key={order._id}
        className="bg-white shadow-lg rounded-2xl p-6 space-y-4 border border-gray-200"
      >
        {/* Product Details */}
        <div className="flex flex-col md:flex-row gap-4 md:items-center">
          {/* Product Image */}
          <img
            src={order.items[0].productId.image[0]}
            alt="Product"
            className="w-20 h-20 object-cover rounded-lg border"
          />

          {/* Product List */}
          <div className="flex flex-wrap gap-4">
            {order.items.map((item) => (
              <div key={item._id} className="text-sm font-medium text-gray-800 bg-gray-50 px-3 py-1 rounded-lg border border-gray-200">
                {item.productId.name}
                {item.quantity > 1 && (
                  <span className="text-primary ml-1">x {item.quantity}</span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Divider */}
        <hr className="border-t border-gray-200" />

        {/* Order Info Grid */}
        <div className="grid md:grid-cols-3 gap-6 text-sm text-gray-700">
          {/* Address Info */}
          <div>
            <p className="font-semibold text-gray-800 mb-1">📍 Shipping Address</p>
            <p>{order.address.firstName} {order.address.lastName}</p>
            <p>{order.address.street}, {order.address.city}</p>
            <p>{order.address.state} - {order.address.zipCode}</p>
            <p>{order.address.country}</p>
          </div>

          {/* Order Amount & Payment Type */}
          <div>
            <p className="font-semibold text-gray-800 mb-1">💳 Payment</p>
            <p><strong>Amount:</strong> ${order.amount.toFixed(2)}</p>
            <p><strong>Method:</strong> {order.paymentType}</p>
            <p>
              <strong>Status:</strong>{" "}
              <span className={order.isPaid ? "text-green-600 font-semibold" : "text-red-500 font-semibold"}>
                {order.isPaid ? "Paid" : "Pending"}
              </span>
            </p>
          </div>

          {/* Date Info */}
          <div>
            <p className="font-semibold text-gray-800 mb-1">📅 Order Date</p>
            <p>{new Date(order.createdAt).toLocaleString()}</p>
          </div>
        </div>
      </div>
    ))}
  </div>
</div>

  );
};

export default Orders;
