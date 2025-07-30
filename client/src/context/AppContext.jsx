import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;
axios.defaults.withCredentials = true;
export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState();
  const [loadingUser, setLoadingUser] = useState(true);
  const [isSeller, setIsSeller] = useState();
  const [showUserLogin, setShowUserLogin] = useState(false);
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState({});
  const [search, setSearch] = useState({});

  //check seller status
  const fetchSeller = async () => {
  try {
    const { data } = await axios.get("/api/seller/is-auth");
    if (data.success) {
      setIsSeller(true);
    } else {
      setIsSeller(false);
    }
  } catch (error) {
    if (error.response && error.response.status === 401) {
      setIsSeller(false);
    } else {
      toast.error(error.message);
    }
  }
};

  // Check user Status
  const fetchUser = async () => {
    try {
      const { data } = await axios.get("/api/user/is-auth");
      if (data.success) {
        setUser(data.user);
      } else {
        setUser(null);
      }
    } catch (error) {
      setUser(null);
    }finally {
    setLoadingUser(false);
  }
  };

  // All products data
  const fetchProducts = async () => {
    try {
      const { data } = await axios.get("/api/product/list");
      if (data.success) {
        setProducts(data.products);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const addToCart = (itemId) => {
    let cartData = structuredClone(cartItems);
    if (cartData[itemId]) {
      cartData[itemId]++;
    } else {
      cartData[itemId] = 1;
    }
    setCartItems(cartData);
    toast.success("Added to cart");
  };

  const updateCartItem = (itemId, quantity) => {
    let cartData = structuredClone(cartItems);
    cartData[itemId] = quantity;
    setCartItems(cartData);
    toast.success("Cart updated");
  };

  const cartCount = () => {
    let totalCount = 0;
    for (const item in cartItems) {
      totalCount += cartItems[item];
    }
    return totalCount;
  };

  const totalCartAmount = () => {
    let totalAmount = 0;
    for (const items in cartItems) {
      let itemInfo = products.find((product) => product._id === items);
      if (cartItems[items] > 0) {
        totalAmount += cartItems[items] * itemInfo.offerPrice;
      }
    }
    const basePrice = Math.floor(totalAmount);
    const tax = calTax(basePrice);
    const final = finalPrice(basePrice, tax);

    return { basePrice, tax, final };
  };

  const calTax = (price) => {
    return Number((price * 0.02).toFixed(2));
  };

  const finalPrice = (price, tax) => {
    return Number((price + tax).toFixed(2));
  };

  const removeFromCart = (itemId) => {
    let cartData = structuredClone(cartItems);
    if (cartData[itemId]) {
      cartData[itemId] -= 1;
      if (cartData[itemId] === 0) {
        delete cartData[itemId];
      }
      toast.success("removed from cart");
      setCartItems(cartData);
    }
  };

  useEffect(() => {
    const updateCart = async () => {
    try {
        const { data } = await axios.post("api/cart/update", {
          cartItems,
        });
        if (!data.success) {
          toast.error(data.message);
        }
    } catch (error) {
      toast.error("Failed to update cart");
    }};
    if(user)
    {
      updateCart();
    }
  }, [cartItems, user]);

  useEffect(() => {
    fetchProducts();
    fetchSeller();
    fetchUser();
  }, []);

  const value = {
    navigate,
    user,
    setUser,
    loadingUser,
    isSeller,
    setIsSeller,
    showUserLogin,
    setShowUserLogin,
    products,
    addToCart,
    updateCartItem,
    cartCount,
    setCartItems,
    totalCartAmount,
    removeFromCart,
    cartItems,
    search,
    setSearch,
    axios,
    fetchProducts,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
