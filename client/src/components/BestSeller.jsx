import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";
import ProductCard from "./ProductCard";

const BestSeller = () => {
  const { products } = useContext(AppContext);

  return (
    <div className="mt-16 w-full">
      <p className="text-2xl md:text-3xl font-medium">Best Sellers</p>
      <div className="my-6 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6 px-2 sm:px-0 place-items-center">
        {products
          .filter((product) => product.inStock)
          .slice(0, 10)
          .map((product, index) => (
            <ProductCard key={index} product={product} />
          ))}
      </div>
    </div>
  );
};

export default BestSeller;
