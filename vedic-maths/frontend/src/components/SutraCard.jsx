import React from "react";
import sutras from "../data/Sutras.js";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";

const SutraCard = () => {
  const { t } = useTranslation();

  return (
    <div className="py-16 px-6 min-h-screen bg-vedic-bg bg-cover bg-center bg-fixed">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 max-w-7xl mx-auto">
        {sutras.map((sutra) => (
          <NavLink
            key={sutra.id}
            to={`/sutra/${sutra.id}`}
            className="group flex justify-center items-stretch"
          >
            <div
              className="
                relative
                bg-sutra-bg bg-cover bg-center
                border border-amber-700/50
                rounded-2xl
                shadow-[0_6px_18px_rgba(0,0,0,0.3)]
                px-6 py-8
                max-w-sm w-full
                transform
                group-hover:scale-105 group-hover:shadow-amber-700/60
                transition-all duration-300 ease-in-out
                cursor-pointer
                flex flex-col
                overflow-hidden
              "
            >
              {/* Subtle overlay to improve text contrast */}
              <div className="absolute inset-0 bg-amber-50/50 rounded-2xl"></div>

              {/* Decorative top accent */}
              <div className="absolute top-3 left-1/2 -translate-x-1/2 w-16 h-[2px] bg-gradient-to-r from-transparent via-amber-700 to-transparent z-10"></div>

              {/* Title */}
              <h2
                className="
                  relative z-10
                  text-lg sm:text-xl lg:text-2xl
                  font-vedic font-bold
                  text-amber-900
                  text-center tracking-wide
                  leading-snug
                  break-words
                  mb-4
                "
              >
                {t(`sutras.${sutra.key}.name`)}
              </h2>

              {/* Divider */}
              <div className="relative z-10 flex justify-center mb-4">
                <div className="h-[2px] w-24 bg-gradient-to-r from-transparent via-amber-800 to-transparent"></div>
              </div>

              {/* Description */}
              <p
                className="
                  relative z-10
                  text-sm sm:text-base lg:text-lg
                  text-amber-950/90
                  text-center
                  leading-relaxed
                  font-serif
                  flex-grow
                "
              >
                {t(`sutras.${sutra.key}.description`)}
              </p>

              {/* Decorative bottom accent */}
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 w-16 h-[2px] bg-gradient-to-r from-transparent via-amber-700 to-transparent z-10"></div>
            </div>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default SutraCard;
