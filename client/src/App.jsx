import React from "react";
import Navbar from "./components/Navbar";
import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";  
import Cart from "./pages/Cart";
import MyOrders from "./pages/MyOrders";
import { useContext } from "react";
import { AppContext } from "./context/AppContext";
import Auth from "./models/Auth";
import ProductCategory from "./pages/ProductCategory";
import Footer from "./components/Footer";
import { Toaster } from "react-hot-toast";
import Address from "./pages/Address";
import SellerLayout from "./pages/seller/SellerLayout";
import SellerLogin from './components/seller/SellerLogin' 
import AddProduct from "./pages/seller/AddProduct";
import ProductsList from "./pages/seller/ProductsList";
import Orders from "./pages/seller/Orders"
import Loading from "./components/Loading";
import Press from "./pages/Press";
import Help from "./pages/Help";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import Careers from "./pages/Careers";
import Blog from "./pages/Blog";
import ScrollToTop from "./pages/ScrollToTop";
import NotFound from "./pages/NotFound";

const App = () => {
  const { showUserLogin, isSeller, user } = useContext(AppContext);
  const isSellerPath = useLocation().pathname.includes("seller");

  return (
    <div className="text-default min-h-screen">
      <Toaster />
      {isSellerPath ? null : <Navbar />}
      {showUserLogin ? <Auth /> : null}
      <ScrollToTop />
      <div className="px-6 md:px-16 lg:px-24 xl:px-32">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/products" element={<Products />} />
          <Route path="/Cart" element={<Cart />} />
          <Route path="/orders" element={user ? <MyOrders /> : <Home />} />
          <Route path="/product/:category/:id" element={<ProductDetails />} />
          <Route path="/products/:category" element={<ProductCategory />} />
          <Route path="/add-address" element={<Address/>} />
          <Route path="/press" element={<Press/>} />
          <Route path="/help" element={<Help />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/careers" element={<Careers />}  />
          <Route path="/blog" element={<Blog />} />
          <Route path="/not-found" element={<NotFound />} />

          <Route path="/loader" element={<Loading />} />
          <Route path="/seller" element={isSeller ? <SellerLayout/> : <SellerLogin /> } > 
            <Route index element={isSeller ? <AddProduct/> : null}/>
            <Route path="product-list" element={isSeller ? <ProductsList /> : null} />
            <Route path="orders" element={isSeller ? <Orders /> : null} />
          </Route>
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      {isSellerPath ? null : <Footer />}
    </div>
  );
};

export default App;
