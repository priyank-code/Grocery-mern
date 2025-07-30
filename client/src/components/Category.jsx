import React, { useContext, useState } from "react";
import { categories } from "../assets/assets";
import { AppContext } from "../context/AppContext";

const Category = () => {
  const { navigate } = useContext(AppContext);
  const [stopScroll, setStopScroll] = useState(false);

  return (
    <>
      <style>{`
        .marquee-category {
          animation: marqueeSlide linear infinite;
        }

        @keyframes marqueeSlide {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>

      <div className="mt-16">
        <p className="text-2xl font-medium md:text-3xl mb-6">Categories</p>

        {/* Mobile Layout (scrollable row) */}
        <div className="md:hidden flex overflow-x-auto gap-4 px-2 pb-3 scrollbar-hide">
          {categories.map((category, index) => (
            <div
              key={index}
              className="min-w-[140px] h-[140px] flex-shrink-0 rounded-xl flex flex-col items-center justify-center group cursor-pointer transition-transform duration-300 hover:scale-105"
              style={{ backgroundColor: category.bgColor }}
              onClick={() => {
                navigate(`/products/${category.path}`);
                scrollTo(0, 0);
              }}
            >
              <img
                src={category.image}
                alt={category.text}
                className="w-16 h-16 object-contain transition group-hover:scale-110"
              />
              <p className="text-sm font-medium mt-2 text-center">
                {category.text}
              </p>
            </div>
          ))}
        </div>

        {/* Desktop Layout (marquee) */}
        <div
          className="hidden md:block overflow-hidden w-full relative"
          onMouseEnter={() => setStopScroll(true)}
          onMouseLeave={() => setStopScroll(false)}
        >
          <div className="absolute left-0 top-0 h-full w-12 z-10 pointer-events-none bg-gradient-to-r from-white to-transparent" />

          <div
            className="marquee-category flex w-fit"
            style={{
              animationPlayState: stopScroll ? "paused" : "running",
              animationDuration: `${categories.length * 2.5}s`,
            }}
          >
            <div className="flex gap-6 px-4">
              {[...categories, ...categories].map((category, index) => (
                <div
                  key={index}
                  className="w-[170px] h-[170px] flex-shrink-0 rounded-xl flex flex-col items-center justify-center group cursor-pointer transition-transform duration-300 hover:scale-105"
                  style={{ backgroundColor: category.bgColor }}
                  onClick={() => {
                    navigate(`/products/${category.path}`);
                    scrollTo(0, 0);
                  }}
                >
                  <img
                    src={category.image}
                    alt={category.text}
                    className="w-20 h-20 object-contain transition group-hover:scale-110"
                  />
                  <p className="text-sm font-medium mt-2 text-center">
                    {category.text}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="absolute right-0 top-0 h-full w-12 z-10 pointer-events-none bg-gradient-to-l from-white to-transparent" />
        </div>
      </div>
    </>
  );
};

export default Category;
