import React, { useContext, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import ProductCard from "../components/ProductCard";
import { categories } from "../assets/assets";

const ProductCategory = () => {
  const { category } = useParams();
  const { products, navigate } = useContext(AppContext);
  const searchCat = categories.find((item) => item.path.toLowerCase() === category.toLowerCase())
  const filterProducts = products.filter(
    (product) => product.category.toLowerCase() === category.toLowerCase()
  );
  return (
    <div className="mt-16">
      <p className="mb-2">
        <Link to={"/"}>Home</Link> /<Link to={`/products/${category}`}>{" "}{category}</Link>
      </p>
      <h1 className="text-2xl md:text-3xl font-bold text-primary mb-10">
        {searchCat.text}
      </h1>
      <div className="my-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 items-center justify-center">
        {
          filterProducts.length > 0 ? (filterProducts.map((product, index) => (
          <ProductCard key={product._id} product={product} />
        ))) : (<div className="text-red-500 font-bold text-xl md:text-2xl">Products not found</div>)
        }
      </div>
    </div>
  );
};

export default ProductCategory;
