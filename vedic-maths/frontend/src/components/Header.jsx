import React from "react";
import { Github, Linkedin, Mail, ScrollText } from "lucide-react";
import { NavLink, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next'; // 👈 Import the hook

export default function HeaderBar() {
  const navigate = useNavigate();
  const { i18n } = useTranslation(); // 👈 Use the hook

  // Handler for language change
  const handleLanguageChange = (event) => {
    i18n.changeLanguage(event.target.value);
  };

  return (
    <header className="relative w-full bg-amber-100 text-amber-900 border-b border-amber-200 shadow-md">
      {/* Background texture */}
      <div className="absolute inset-0 opacity-15 bg-[url('https://www.transparenttextures.com/patterns/asfalt-light.png')] pointer-events-none"></div>

      {/* Container */}
      <div className="relative flex flex-col sm:flex-row justify-between items-center px-4 sm:px-6 md:px-12 py-4 gap-4 sm:gap-0">
        {/* Logo & Title */}
        <NavLink to={'/'}>
          <div className="flex items-center gap-2">
            <ScrollText className="w-7 h-7 sm:w-8 sm:h-8 text-amber-700" />
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-wide text-amber-800 drop-shadow-sm">
              Vedix Sutras
            </h1>
          </div>
        </NavLink>

        {/* Social Links and Language Dropdown */}
        <div className="flex gap-3 sm:gap-4 text-amber-700 items-center"> {/* 👈 Add items-center here */}
          {/* GitHub Link */}
          <a
            href="https://github.com/Pradeepmodak"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 hover:text-amber-500 transition-colors text-sm sm:text-base font-medium"
          >
            <Github size={18} className="sm:w-5 sm:h-5 md:w-6 md:h-6" />
            <span className="hidden sm:inline">GitHub</span>
          </a>
          
          {/* LinkedIn Link */}
          <a
            href="https://www.linkedin.com/in/pradeep-modak-9a0a6a27a/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 hover:text-amber-500 transition-colors text-sm sm:text-base font-medium"
          >
            <Linkedin size={18} className="sm:w-5 sm:h-5 md:w-6 md:h-6" />
            <span className="hidden sm:inline">LinkedIn</span>
          </a>
          
          {/* Email Link */}
          <a
            href="mailto:pradeepmodakofficial@gmail.com"
            className="flex items-center gap-1 hover:text-amber-500 transition-colors text-sm sm:text-base font-medium"
          >
            <Mail size={18} className="sm:w-5 sm:h-5 md:w-6 md:h-6" />
            <span className="hidden sm:inline">Email</span>
          </a>

          {/* Language Dropdown */}
          <select 
            onChange={handleLanguageChange} 
            value={i18n.language}
            className="bg-amber-100 text-amber-700 p-2 rounded-md border-amber-300 border-2 text-sm sm:text-base cursor-pointer hover:bg-amber-200 transition-colors"
          >
            <option value="en">English</option>
            <option value="hi">हिन्दी</option>
          </select>
        </div>
      </div>
    </header>
  );
}