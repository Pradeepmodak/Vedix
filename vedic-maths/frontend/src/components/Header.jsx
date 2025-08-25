import React from "react";
import { Github, Linkedin, Mail, ScrollText } from "lucide-react";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function HeaderBar() {
  const { i18n } = useTranslation();

  // Handler for language change
  const handleLanguageChange = (event) => {
    i18n.changeLanguage(event.target.value);
  };

  return (
    <header className="relative w-full bg-vedas bg-cover bg-center border-b-4 border-amber-900/60 shadow-lg">
      {/* Decorative glowing border (top) */}
      <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-amber-600 via-yellow-400 to-amber-600 animate-pulse"></div>

      {/* Overlay for subtle contrast */}
      <div className="absolute inset-0 bg-amber-50/70 backdrop-blur-[2px]"></div>

      {/* Content */}
      <div className="relative flex flex-col sm:flex-row justify-between items-center px-4 sm:px-8 md:px-12 py-4 gap-4 sm:gap-0">
        {/* Logo & Title */}
        <NavLink to={"/"} className="group">
          <div className="flex items-center gap-3">
            <ScrollText className="w-8 h-8 sm:w-10 sm:h-10 text-amber-800 group-hover:rotate-12 group-hover:scale-110 transition-transform duration-300" />
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-amber-800 via-yellow-600 to-amber-700 drop-shadow-lg animate-fade-in">
              Vedic Sutras
            </h1>
          </div>
        </NavLink>

        {/* Social Links & Language Selector */}
        <div className="flex gap-4 sm:gap-6 text-amber-900 items-center">
          {/* GitHub */}
          <a
            href="https://github.com/Pradeepmodak"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 hover:text-yellow-600 transition-transform hover:scale-110 text-sm sm:text-base font-medium"
          >
            <Github size={20} className="sm:w-6 sm:h-6" />
            <span className="hidden sm:inline">GitHub</span>
          </a>

          {/* LinkedIn */}
          <a
            href="https://www.linkedin.com/in/pradeep-modak-9a0a6a27a/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 hover:text-yellow-600 transition-transform hover:scale-110 text-sm sm:text-base font-medium"
          >
            <Linkedin size={20} className="sm:w-6 sm:h-6" />
            <span className="hidden sm:inline">LinkedIn</span>
          </a>

          {/* Email */}
          <a
            href="mailto:pradeepmodakofficial@gmail.com"
            className="flex items-center gap-1 hover:text-yellow-600 transition-transform hover:scale-110 text-sm sm:text-base font-medium"
          >
            <Mail size={20} className="sm:w-6 sm:h-6" />
            <span className="hidden sm:inline">Email</span>
          </a>

          {/* Language Dropdown */}
          <select
            onChange={handleLanguageChange}
            value={i18n.language}
            className="bg-gradient-to-r from-yellow-100 to-amber-200 text-amber-900 font-semibold p-2 rounded-lg border-2 border-amber-700 text-sm sm:text-base cursor-pointer hover:from-yellow-200 hover:to-amber-300 transition-all shadow-md"
          >
            <option value="en">English</option>
            <option value="hi">हिन्दी</option>
          </select>
        </div>
      </div>
    </header>
  );
}
