import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const Cart = () => {
  const {
    cartItems,
    totalCartAmount,
    products,
    navigate,
    cartCount,
    removeFromCart,
    updateCartItem,
    axios, user, setCartItems
  } = useContext(AppContext);
  const [address, setAddress] = useState([]);
  const [showAddress, setShowAddress] = useState(false);
  const [selectAddress, setSelectAddress] = useState(null);
  const [cartArray, setCartArray] = useState([]);
  const [paymentOption, setPaymentOption] = useState("COD");

  // Billing data
  const { basePrice, tax, final } = totalCartAmount();

  const getCart = () => {
    let tempArray = [];
    for (const key in cartItems) {
      const product = products.find((product) => product._id === key);
      product.quantity = cartItems[key];
      tempArray.push(product);
    }
    setCartArray(tempArray);
  };

  const getAddress = async () => {
    try {
      const {data} = await axios.get("/api/address/get", {});
      if(data.success)
      {
        setAddress(data.addresses);
        if(data.addresses.length > 0) {
          setSelectAddress(data.addresses[0]);
        }
      }
      else{
        toast.error(data.message);
      }
    } catch (error) {
      
    }
  }

  useEffect(() => {
    if(user)
    {
      getAddress();
    }
  }, [user]);

  useEffect(() => {
    if (products.length > 0 && cartItems) {
      getCart();
    }
  }, [products, cartItems, cartCount]);

  const placeOrder = async () => {
    try {
      if (!selectAddress) {
        return toast.error("Please select an address");
      }
      // place order COD
      if(paymentOption === "COD")
      {
        const {data} = await axios.post("api/order/cod", {items:cartArray.map((item) => ({productId:item._id, quantity:item.quantity})), address:selectAddress._id});
        if(data.success)
        {
          toast.success("Order placed successfully");
          setCartItems({});
          navigate("/orders");
        }
        else
        {
          toast.error(data.message);
        }
      }
      else{
        const {data} = await axios.post("api/order/stripe", {items:cartArray.map((item) => ({productId:item._id, quantity:item.quantity})), address:selectAddress._id});
        if(data.success)
        {
          window.location.replace(data.url);
        }
        else{
          toast.error(data.message);
        }
      }
    } catch (error) {
      toast.error(error.message || "Failed to place order");
    }
  }

  return products.length > 0 && cartItems ? (
    <div className="flex flex-col md:flex-row py-16 max-w-6xl w-full px-6 mx-auto">
      <div className="flex-1 max-w-4xl">
        <h1 className="text-3xl font-medium mb-6">
          Shopping Cart{" "}
          <span className="text-sm text-primary">{cartCount()} Items</span>
        </h1>

        <div className="grid grid-cols-[2fr_1fr_1fr] text-gray-500 text-base font-medium pb-3">
          <p className="text-left">Product Details</p>
          <p className="text-center">Subtotal</p>
          <p className="text-center">Action</p>
        </div>

        {cartArray.map((product, index) => (
          <div
            key={index}
            className="grid grid-cols-[2fr_1fr_1fr] text-gray-500 items-center text-sm md:text-base font-medium pt-3"
          >
            <div className="flex items-center md:gap-6 gap-3">
              <div
                className="cursor-pointer w-24 h-24 flex items-center justify-center border border-gray-300 rounded overflow-hidden"
                onClick={() => {
                  navigate(
                    `/product/${product.category.toLowerCase()}/${product._id}`
                  );
                  scrollTo(0, 0);
                }}
              >
                <img
                  className="max-w-full h-full object-cover"
                  src={product.image[0]}
                  alt={product.name}
                />
              </div>
              <div>
                <p className="hidden md:block font-semibold">{product.name}</p>
                <div className="font-normal text-gray-500/70">
                  <p>
                    Weight: <span>{product.weight || "N/A"}</span>
                  </p>
                  <div className="flex items-center">
                    <p>Qty:</p>
                    <select
                      className="outline-none"
                      onChange={(e) =>
                        updateCartItem(product._id, Number(e.target.value))
                      }
                      value={cartItems[product._id]}
                    >
                      {Array(
                        cartItems[product._id] > 9 ? cartItems[product._id] : 10
                      )
                        .fill("")
                        .map((_, index) => (
                          <option key={index} value={index + 1}>
                            {index + 1}
                          </option>
                        ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <p className="text-center">
              ${product.offerPrice * product.quantity}
            </p>
            <button
              className="cursor-pointer mx-auto"
              onClick={() => removeFromCart(product._id)}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="m12.5 7.5-5 5m0-5 5 5m5.833-2.5a8.333 8.333 0 1 1-16.667 0 8.333 8.333 0 0 1 16.667 0"
                  stroke="#FF532E"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        ))}

        <Link
          className="group cursor-pointer flex items-center mt-8 gap-2 text-primary font-medium"
          to={"/products"}
        >
          <svg
            width="15"
            height="11"
            viewBox="0 0 15 11"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M14.09 5.5H1M6.143 10 1 5.5 6.143 1"
              stroke="#4fbf8b"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Continue Shopping
        </Link>
      </div>

      <div className="max-w-[360px] w-full bg-gray-100/40 p-5 max-md:mt-16 border border-gray-300/70">
        <h2 className="text-xl md:text-xl font-medium">Order Summary</h2>
        <hr className="border-gray-300 my-5" />

        <div className="mb-6">
          <p className="text-sm font-medium uppercase">Delivery Address</p>
          <div className="relative flex justify-between items-start mt-2">
            <p className="text-gray-500">
              {selectAddress
                ? `${selectAddress.street}, ${selectAddress.city}, ${selectAddress.state}, ${selectAddress.country}`
                : "No Address Found"}
            </p>
            <button
              onClick={() => setShowAddress(!showAddress)}
              className="text-primary hover:underline cursor-pointer"
            >
              Change
            </button>
            {showAddress && (
              <div className="absolute top-12 py-1 bg-white border border-gray-300 text-sm w-full">
                {address.map((add, index) => (
                  <p
                    key={index}
                    onClick={() => {
                      setShowAddress(false);
                      setSelectAddress(add);
                    }}
                    className="text-gray-500 p-2 hover:bg-gray-100"
                  >
                    {add.street}, {add.city}, {add.state}, {add.country}
                  </p>
                ))}
                <p
                  onClick={() => navigate("/add-address")}
                  className="text-dark text-center cursor-pointer p-2 hover:bg-primary hover:text-white border-1 border-gray-300"
                >
                  Add address
                </p>
              </div>
            )}
          </div>

          <p className="text-sm font-medium uppercase mt-6">Payment Method</p>

          <select
            onChange={(e) => setPaymentOption(e.target.value)}
            className="w-full border border-gray-300 bg-white px-3 py-2 mt-2 outline-none"
          >
            <option value="COD">Cash On Delivery</option>
            <option value="Online">Online Payment</option>
          </select>
        </div>

        <hr className="border-gray-300" />

        <div className="text-gray-500 mt-4 space-y-2">
          <p className="flex justify-between">
            <span>Price</span>
            <span>{`$${basePrice || "0"}`}</span>
          </p>
          <p className="flex justify-between">
            <span>Shipping Fee</span>
            <span className="text-green-600">Free</span>
          </p>
          <p className="flex justify-between">
            <span>Tax (2%)</span>
            <span>{`$${tax || "0"}`}</span>
          </p>
          <p className="flex justify-between text-lg font-medium mt-3">
            <span>Total Amount:</span>
            <span>{`$${final || "0"}`}</span>
          </p>
        </div>

        <button onClick={placeOrder} className="w-full py-3 mt-6 cursor-pointer bg-primary text-white font-medium hover:bg-primary-dark transition">
          {paymentOption === "COD" ? "Place Order" : "Pay Now"}
        </button>
      </div>
    </div>
  ) : (
    <p className="text-2xl md:text-3xl text-red-700 font-bold">Empty Cart</p>
  );
};

export default Cart;
