import React from "react";
import { Github, Linkedin, Mail, ScrollText } from "lucide-react";

const Footer = () => {
  return (
    <footer className="relative min-h-[20vh] w-full bg-gradient-to-b from-amber-100 via-amber-200 to-amber-300 text-amber-900 border-t border-amber-400 shadow-inner">
      
      {/* Main content container */}
      <div className="relative w-full mx-auto px-6 py-10 flex flex-col md:flex-row items-center md:justify-between text-center md:text-left gap-10 max-w-7xl">
        
        {/* About section */}
        <div className="max-w-md">
          <div className="flex items-center justify-center md:justify-start gap-2 mb-3">
            <ScrollText className="w-6 h-6 text-amber-800" />
            <h2 className="text-2xl font-bold tracking-wide">Vedix Sutras</h2>
          </div>
          <p className="text-sm leading-relaxed">
            Created with ❤️ by <span className="font-semibold">Pradeep Modak</span>.  
            This is an open-source project welcoming contributions from anyone passionate about  
            preserving and sharing the timeless wisdom of Vedic Sutras.
          </p>
        </div>

        {/* Links section */}
        <div>
          <h3 className="font-semibold text-lg mb-3">Connect with me</h3>
          <div className="flex justify-center md:justify-start gap-5">
            <a href="#" className="flex items-center gap-2 hover:text-amber-700 transition-colors">
              <Github className="w-5 h-5" /> GitHub
            </a>
            <a href="#" className="flex items-center gap-2 hover:text-amber-700 transition-colors">
              <Linkedin className="w-5 h-5" /> LinkedIn
            </a>
            <a href="#" className="flex items-center gap-2 hover:text-amber-700 transition-colors">
              <Mail className="w-5 h-5" /> Email
            </a>
          </div>
        </div>
      </div>

      {/* Bottom note */}
      <div className="relative bg-amber-800 text-amber-100 text-sm py-3 text-center w-full">
        © {new Date().getFullYear()} Vedix | Contributions welcome from all.
      </div>
    </footer>
  );
};

export default Footer;