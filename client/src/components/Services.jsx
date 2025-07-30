import React from "react";
import { assets, features } from "../assets/assets";

const Services = () => {
  return (
    <div className="mt-20 relative w-full">
      {/* Desktop Image */}
      <img
        src={assets.bottom_banner_image}
        alt="services"
        className="hidden md:block w-full object-cover"
      />

      {/* Mobile Image */}
      <img
        src={assets.bottom_banner_image_sm}
        alt="services"
        className="block md:hidden w-full object-cover"
      />

      {/* Text Content Over Image */}
      <div
        className="absolute inset-0 flex flex-col
        justify-start sm:justify-center md:justify-center
        items-center sm:items-center md:items-end
        px-4 sm:px-10 md:px-16 lg:px-20
        pt-6 sm:pt-10 md:pt-0"
      >
        <div className="p-4 sm:p-6 md:p-8 rounded-xl w-full sm:max-w-lg md:max-w-md lg:max-w-lg">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-primary mb-4 sm:mb-5">
            Why We Are the Best?
          </h1>
          <div className="flex flex-col gap-4">
            {features.map((data, index) => (
              <div className="flex gap-3 items-start" key={index}>
                <img src={data.icon} alt={data.title} className="w-5 sm:w-6 h-5 sm:h-6 mt-1" />
                <div className="flex flex-col">
                  <h2 className="text-sm sm:text-base md:text-lg font-semibold">
                    {data.title}
                  </h2>
                  <p className="text-xs sm:text-sm md:text-sm text-gray-700">
                    {data.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
