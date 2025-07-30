import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import ProductCard from "../components/ProductCard";

const Products = () => {
  const { products, search } = useContext(AppContext);
  const [filterProducts, setFilterProducts] = useState([]);

  useEffect(() => {
    if (search.length > 0) {
      setFilterProducts(
        products.filter((product) =>
          product.name.toLowerCase().includes(search.toLowerCase())
        )
      );
    } else {
      setFilterProducts(products);
    }
  }, [products, search]);

  return (
    <div className="mt-16 w-full px-4 sm:px-6 lg:px-8">
      <h1 className="text-2xl md:text-3xl font-bold text-primary mb-10">
        All Products
      </h1>

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {filterProducts
          .filter((product) => product.inStock)
          .map((product, index) => (
            <ProductCard key={index} product={product} />
          ))}
      </div>
    </div>
  );
};

export default Products;
