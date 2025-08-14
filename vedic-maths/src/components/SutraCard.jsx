import React from "react";

const SutraCard = ({ name, sanskrit, description, linkTo }) => {
  return (
    // The entire card is now a clickable link
    <a
      href={linkTo} // Use the linkTo prop for the URL
      className="flex justify-center items-center py-4 px-4 h-full" // Adjusted padding and added h-full for consistent height in grid
    >
      <div className="relative bg-gradient-to-b from-amber-50 to-amber-100 border-2 border-amber-400 rounded-2xl shadow-xl p-8 max-w-lg w-full transform hover:scale-105 transition-all duration-300 ease-in-out cursor-pointer h-full flex flex-col justify-between">
        {/* Subtle background texture */}
        <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/asfalt-light.png')] pointer-events-none rounded-2xl"></div>
        
        {/* Sutra Name (English) */}
        <h2 className="relative z-10 text-xl md:text-2xl text-amber-900 font-bold mb-3 text-center font-sans">
          {name}
        </h2>

        {/* Sanskrit Formula */}
        <p className="relative z-10 text-2xl md:text-3xl text-amber-800 text-center italic font-serif mb-4">
          {sanskrit}
        </p>

        {/* Decorative Divider */}
        <div className="relative z-10 flex justify-center my-4">
          <div className="h-1 w-24 bg-amber-700 rounded-full"></div>
        </div>

        {/* Description */}
        <p className="relative z-10 text-base text-amber-950 text-center leading-relaxed font-sans flex-grow">
          {description}
        </p>
      </div>
    </a>
  );
};

export default SutraCard;