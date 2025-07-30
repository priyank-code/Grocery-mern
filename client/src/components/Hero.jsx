import React from "react";
import { Link } from "react-router-dom";
import { assets } from "../assets/assets";

const Hero = () => {
  return (
    <div className="relative">
      <img
        src={assets.main_banner_bg}
        alt="Hero section image"
        className="hidden md:block"
      />
      <img
        src={assets.main_banner_bg_sm}
        alt="Hero section image"
        className="md:hidden w-full"
      />

      <div className="absolute inset-0 flex flex-col items-center md:items-start justify-end md:justify-center pb-24 md:pb-0 md:pl-18 lg:pl-24">
        <h1 className="text-3xl md:text-4xl  font-bold text-center md:text-left max-w-72 md:max-w-80 leading-tight lg:leading-15 text-gray-700">
          Freshness You Can Trust, Savings You will Love!
        </h1>
        <div className="flex items-center mt-6 font-medium gap-6">
          <Link to={"/products"} className="flex group gap-2 items-center px-7 rounded text-white py-3 bg-primary">
            Shop now
            <img src={assets.white_arrow_icon} className="items-center md:hidden transition group-focus:translate-x-1"/>
          </Link>
          <Link to={"/products"} className="hidden md:block  group gap-2 items-center px-7 rounded text-white py-3 bg-primary">
            Explore deals
            <img src={assets.white_arrow_icon} className="items-center md:hidden transition group-focus:translate-x-1"/>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;
