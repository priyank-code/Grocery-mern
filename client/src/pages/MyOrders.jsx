import React, { useContext, useEffect, useState } from "react";
import { dummyOrders } from "../assets/assets";
import { AppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const MyOrders = () => {
  const { axios, user } = useContext(AppContext);
  const [myOrders, setMyOrders] = useState([]);
  const URL = import.meta.env.VITE_BACKEND_URL;
  const fetchOrders = async () => {
    try {
      const {data} = await axios.get("/api/order/user")
      if(data.success){
        setMyOrders(data.orders);
      }
      else
      {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message || "Failed to fetch orders");
    }
  };

  useEffect(() => {
    if(user) {
      fetchOrders();
    }
  }, [user]);

  return (
    <div className="mt-16 px-4 md:px-12 lg:px-24">
      <p className="text-2xl font-medium md:text-3xl mb-6">My Orders</p>

      {myOrders.length > 0 ? (
        myOrders.map((order) => (
          <div
            key={order._id}
            className="border p-6 mb-6 rounded-md shadow-sm bg-white"
          >
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
              <p className="font-semibold text-lg">
                Order ID:{" "}
                <span className="text-gray-600">
                  {order._id.toUpperCase()}
                </span>
              </p>
              <p className="text-sm text-gray-500">
                Date:{" "}
                {new Date(order.createdAt).toLocaleString("en-IN", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: true,
                })}
              </p>
            </div>

            {/* Order Items */}
            <div className="space-y-4 mb-4">
              {order.items.map((item) => (
                <div
                  key={item._id}
                  className="flex gap-4 items-center border-b pb-2"
                  >
                  {/* src={`${URL}/images/${item.productId?.image?.[0]}`} */}
                  <img
                    src={item.productId?.image?.[0]}
                    alt={item.productId.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div>
                    <p className="font-medium">{item.productId.name}</p>
                    <p className="text-sm text-gray-600">
                      Qty: {item.quantity}
                    </p>
                    <p className="text-sm text-gray-600">
                      Price: ${item.productId.price}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="flex flex-col gap-2 text-sm text-gray-700">
              <p>
                <span className="font-semibold">Total:</span> $
                {order.amount.toFixed(2)}
              </p>
              <p>
                <span className="font-semibold">Payment:</span>{" "}
                {order.paymentType} {order.isPaid ? "(Paid)" : "(Unpaid)"}
              </p>
              <p>
                <span className="font-semibold">Status:</span>{" "}
                <span className="text-primary">{order.status}</span>
              </p>
              <p>
                <span className="font-semibold">Address:</span>{" "}
                {order.address.street}, {order.address.city},{" "}
                {order.address.pincode}
              </p>
            </div>
          </div>
        ))
      ) : (
        <p className="text-gray-500 text-lg mt-10">You have no orders yet.</p>
      )}
    </div>
  );
};

export default MyOrders;
