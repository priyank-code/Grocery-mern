import { React, useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scroll, setScroll] = useState(0);

  const {
    user,
    setUser,
    navigate,
    setShowUserLogin,
    cartCount,
    search,
    setSearch,
    loadingUser,
    axios
  } = useContext(AppContext);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Products", path: "/products" },
    {name: "Seller", path: "/seller"}
  ];

  // Scroll progress logic
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.body.scrollHeight - window.innerHeight;
      const scrolled = (scrollTop / docHeight) * 100;
      setScroll(scrolled);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const logoutHandler = async () => {
    try {
      const {data} = await axios.get("/api/user/logout");
      if (data.success) {
        setUser(null);
        navigate("/");
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Failed to logout. Please try again.");
    }
  }
  // Navigate to products if search changes
  useEffect(() => {
    if (search.length > 0) {
      navigate("/products");
    }
  }, [search]);

  return (
    <div className="sticky top-0 z-50 bg-white">
      <nav className="flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 border-b border-gray-300 relative transition-all">
        {/* Logo */}
        <Link to={"/"}>
          {/* <h1 className="md:text-2xl text-xl font-bold text-primary">PriCart</h1> */}
          <img src={assets.logo} alt="logo" className="w-35" />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden sm:flex items-center gap-8">
          {navLinks.map((link, i) => (
            <Link key={i} to={link.path}>
              {link.name}
            </Link>
          ))}

          <div className="hidden lg:flex items-center text-sm gap-2 border border-gray-300 px-3 rounded-full">
            <input
              onChange={(e) => setSearch(e.target.value)}
              className="py-1.5 w-full bg-transparent outline-none placeholder-gray-500"
              type="text"
              placeholder="Search products"
            />
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.836 10.615 15 14.695"
                stroke="#7A7B7D"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                clipRule="evenodd"
                d="M9.141 11.738c2.729-1.136 4.001-4.224 2.841-6.898S7.67.921 4.942 2.057C2.211 3.193.94 6.281 2.1 8.955s4.312 3.92 7.041 2.783"
                stroke="#7A7B7D"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          <Link to={"/cart"} className="relative cursor-pointer">
            <svg
              width="18"
              height="18"
              viewBox="0 0 14 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M.583.583h2.333l1.564 7.81a1.17 1.17 0 0 0 1.166.94h5.67a1.17 1.17 0 0 0 1.167-.94l.933-4.893H3.5m2.333 8.75a.583.583 0 1 1-1.167 0 .583.583 0 0 1 1.167 0m6.417 0a.583.583 0 1 1-1.167 0 .583.583 0 0 1 1.167 0"
                stroke="#4fbf8b"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <button className="absolute -top-2 -right-3 text-xs text-white bg-primary w-[18px] h-[18px] rounded-full">
              {cartCount()}
            </button>
          </Link>

          {/* **Updated User/Login Display Logic** */}
          {loadingUser ? (
            <p className="text-gray-600">Loading...</p>
          ) : user ? (
            <div className="relative group cursor-pointer">
              <img src={assets.profile_icon} alt="profile" className="w-8" />
              <ul className="hidden group-hover:block absolute top-8 right-0 bg-white shadow-md rounded-md border-gray-200 border-2 py-2 w-30 cursor-pointer text-sm z-40">
                <Link
                  to={"/orders"}
                  className="block px-2 my-2 hover:text-gray-600"
                >
                  My Orders
                </Link>
                <hr className="text-gray-400 px-2 my-2" />
                <Link
                  onClick={() => logoutHandler()}
                  className="block px-2 my-2 hover:text-gray-600"
                >
                  Logout
                </Link>
              </ul>
            </div>
          ) : (
            <button
              className="cursor-pointer px-8 py-2 bg-primary hover:bg-primary-dark transition text-white rounded-full"
              onClick={() => setShowUserLogin(true)}
            >
              Login
            </button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-3 sm:hidden">
          <svg
            width="21"
            height="15"
            viewBox="0 0 21 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            onClick={() => setOpen(!open)}
          >
            <rect width="21" height="1.5" rx=".75" fill="#426287" />
            <rect x="8" y="6" width="13" height="1.5" rx=".75" fill="#426287" />
            <rect
              x="6"
              y="13"
              width="15"
              height="1.5"
              rx=".75"
              fill="#426287"
            />
          </svg>
        </div>

        {/* Mobile Fullscreen Menu */}
        <div
          className={`fixed top-0 left-0 w-full h-screen bg-white text-base flex flex-col sm:hidden items-center justify-center gap-6 font-medium text-gray-800 transition-all duration-500 z-50 ${
            open ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <button
            className="absolute top-4 right-4"
            onClick={() => setOpen(false)}
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>

          {navLinks.map((link, i) => (
            <Link
              key={i}
              to={link.path}
              onClick={() => setOpen(false)}
              className="text-lg font-semibold"
            >
              {link.name}
            </Link>
          ))}

          <Link
            to="/cart"
            onClick={() => setOpen(false)}
            className="relative flex items-center"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 14 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M.583.583h2.333l1.564 7.81a1.17 1.17 0 0 0 1.166.94h5.67a1.17 1.17 0 0 0 1.167-.94l.933-4.893H3.5m2.333 8.75a.583.583 0 1 1-1.167 0 .583.583 0 0 1 1.167 0m6.417 0a.583.583 0 1 1-1.167 0 .583.583 0 0 1 1.167 0"
                stroke="#4fbf8b"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <button className="absolute -top-2 -right-3 text-xs text-white bg-primary w-[18px] h-[18px] rounded-full">
              {cartCount()}
            </button>
          </Link>

          {loadingUser ? (
            <p className="text-gray-600">Loading...</p>
          ) : user ? (
            <>
              <Link
                to="/orders"
                onClick={() => setOpen(false)}
                className="text-lg font-semibold"
              >
                My Orders
              </Link>
              <button
                onClick={async () => {
                  await logoutHandler();
                  setOpen(false);
                }}
                className="text-lg text-red-500"
              >
                Logout
              </button>
            </>
          ) : (
            <button
              className="bg-primary text-white px-8 py-2.5 rounded-full transition-all duration-500"
              onClick={() => {
                setShowUserLogin(true);
                setOpen(false);
              }}
            >
              Login
            </button>
          )}
        </div>
      </nav>

      <div className="px-6 md:px-16 lg:px-24 xl:px-32">
        <div
          className="hidden sm:block h-1 bg-primary-dark transition-all duration-200 ease-out"
          style={{ width: `${scroll}%` }}
        />
      </div>
    </div>
  );
};

export default Navbar;
