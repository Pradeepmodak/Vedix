import React from "react";
import sutras from "../data/Sutras"; // Adjust the path as necessary
import { NavLink } from "react-router-dom"; // Import Link for navigation
import { useTranslation } from "react-i18next"; // 👈 Import the hook

const SutraCard = () => {
  const { t } = useTranslation(); // 👈 Use the hook

  return (
    <div className=" py-10 px-4 min-h-screen ">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-3 gap-8 max-w-7xl mx-auto bg">
        {sutras.map((sutra) => (
          <NavLink
            key={sutra.id} // Use the id as the key for each card
            to={`/sutra/${sutra.id}`} // Use the id for the link
            className="flex justify-center items-center py-4 px-4 h-full " // Adjusted padding and added h-full for consistent height in grid
          >
            <div className="relative bg-amber-200 border-2 border-amber-400 rounded-2xl shadow-xl p-8 max-w-lg w-full transform hover:scale-105 transition-all duration-300 ease-in-out cursor-pointer h-full flex flex-col justify-between">
              {/* Subtle background texture */}
              <div className="absolute inset-0 bg-sutra-bg bg-cover bg-center opacity-30 pointer-events-none rounded-2xl"></div>

              {/* Sutra Name (English) */}
              <h2 className="relative z-10 text-xl md:text-2xl text-amber-900 font-bold mb-3 text-center font-sans">
                {t(`sutras.${sutra.key}.name`)}{" "}
                {/* 👈 Fetch the translated name */}
              </h2>

              {/* Decorative Divider */}
              <div className="relative z-10 flex justify-center my-4">
                <div className="h-1 w-24 bg-amber-700 rounded-full"></div>
              </div>

              {/* Description */}
              <p className="relative z-10 text-base text-amber-950 text-center leading-relaxed font-sans flex-grow">
                {t(`sutras.${sutra.key}.description`)}{" "}
                {/* 👈 Fetch the translated description */}
              </p>
            </div>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default SutraCard;