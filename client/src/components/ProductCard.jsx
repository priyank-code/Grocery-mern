import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets";

const ProductCard = ({ product }) => {
  const { navigate, addToCart, cartItems, removeFromCart } = useContext(AppContext);
  const URL = import.meta.env.VITE_BACKEND_URL;

  return (
    product && (
      <div
        onClick={() =>
          navigate(`/product/${product.category.toLowerCase()}/${product._id}`)
        }
        className="border border-gray-300 rounded-md p-3 bg-white w-full max-w-[180px] sm:max-w-full"
      >
        <div className="group cursor-pointer flex items-center justify-center">
          <img
            className="group-hover:scale-105 transition-transform w-24 md:w-32 h-auto object-contain"
            src={product.image[0]}
            alt={product.name}
          />
        </div>

        <div className="text-gray-500/60 text-sm mt-2">
          <p>{product.category}</p>
          <p className="text-gray-700 font-medium text-base truncate w-full">
            {product.name}
          </p>

          <div className="flex items-center gap-1 mt-1">
            {Array(5)
              .fill("")
              .map((_, i) => (
                <img
                  key={i}
                  src={i < 4 ? assets.star_icon : assets.star_dull_icon}
                  alt="star"
                  className="w-3 md:w-4"
                />
              ))}
            <p className="text-xs">(4)</p>
          </div>

          <div className="flex items-end justify-between mt-3">
            <p className="text-primary font-medium text-sm md:text-base">
              ${product.offerPrice}{" "}
              <span className="text-gray-400 line-through text-xs md:text-sm">
                ${product.price}
              </span>
            </p>

            <div
              className="text-primary"
              onClick={(e) => e.stopPropagation()}
            >
              {!cartItems?.[product._id] ? (
                <button
                  className="flex items-center justify-center gap-1 bg-green-100 border border-green-300 px-2 h-[30px] rounded text-sm"
                  onClick={() => addToCart(product._id)}
                >
                  <svg
                    width="14"
                    height="14"
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
                  Add
                </button>
              ) : (
                <div className="flex items-center gap-2 bg-green-100 rounded px-2 h-[30px] text-sm select-none">
                  <button onClick={() => removeFromCart(product._id)}>-</button>
                  <span>{cartItems[product._id]}</span>
                  <button onClick={() => addToCart(product._id)}>+</button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default ProductCard;
