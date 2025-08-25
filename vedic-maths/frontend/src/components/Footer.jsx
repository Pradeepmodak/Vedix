import React, { useEffect, useState } from "react";
import { Github, Linkedin, Mail, ScrollText } from "lucide-react";
import axios from "axios";
import { motion } from "framer-motion";

const Footer = () => {
  const [visitors, setVisitors] = useState(0);
  const [visits, setVisits] = useState(0);
  const [displayVisitors, setDisplayVisitors] = useState(0);
  const [displayVisits, setDisplayVisits] = useState(0);

  // Track + fetch
  useEffect(() => {
    const trackAndFetch = async () => {
      try {
        let visitorId = localStorage.getItem("vedix_visitorId");

        const trackRes = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/api/track-visitor`,
          { visitorId }
        );

        if (trackRes.data.visitorId) {
          localStorage.setItem("vedix_visitorId", trackRes.data.visitorId);
        }

        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/get-visitor`
        );

        setVisitors(res.data.totalVisitors || 0);
        setVisits(res.data.totalVisits || 0);
      } catch (err) {
        console.error("Error fetching visitors", err);
      }
    };

    trackAndFetch();
  }, []);

  // Animated counters
  useEffect(() => {
    if (!visitors) return;
    let current = 0;
    const increment = Math.ceil(visitors / 100);
    const interval = setInterval(() => {
      current += increment;
      if (current >= visitors) {
        current = visitors;
        clearInterval(interval);
      }
      setDisplayVisitors(current);
    }, 20);
    return () => clearInterval(interval);
  }, [visitors]);

  useEffect(() => {
    if (!visits) return;
    let current = 0;
    const increment = Math.ceil(visits / 100);
    const interval = setInterval(() => {
      current += increment;
      if (current >= visits) {
        current = visits;
        clearInterval(interval);
      }
      setDisplayVisits(current);
    }, 20);
    return () => clearInterval(interval);
  }, [visits]);

  return (
    <footer className="relative w-full bg-background2 bg-cover bg-center bg-no-repeat text-stone-800 border-t border-amber-700/40 shadow-lg">
      {/* Overlay for parchment tint */}
      <div className="absolute inset-0 bg-gradient-to-b from-amber-100/90 via-amber-200/90 to-amber-300/90 backdrop-blur-sm" />

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-6 py-12 md:py-16 flex flex-col md:flex-row items-start md:items-center justify-between gap-12">
        
        {/* About */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-md"
        >
          <div className="flex items-center gap-2 mb-3">
            <ScrollText className="w-7 h-7 text-amber-800" />
            <h2 className="text-2xl font-bold tracking-wide">Vedix Sutras</h2>
          </div>
          <p className="text-sm leading-relaxed text-amber-900/80">
            Built with ❤️ by{" "}
            <span className="font-semibold text-amber-950">Pradeep Modak</span>.
            An open-source project inviting contributions from everyone
            passionate about sharing the timeless wisdom of Vedic Sutras.
          </p>
        </motion.div>

        {/* Socials */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center md:text-left"
        >
          <h3 className="font-semibold text-lg mb-4">Connect with me</h3>
          <div className="flex flex-wrap justify-center md:justify-start gap-4">
            {[
              { icon: <Github className="w-5 h-5" />, label: "GitHub", href: "https://github.com/Pradeepmodak" },
              { icon: <Linkedin className="w-5 h-5" />, label: "LinkedIn", href: "https://www.linkedin.com/in/pradeep-modak-9a0a6a27a/" },
              { icon: <Mail className="w-5 h-5" />, label: "Email", href: "mailto:pradeepmodakofficial@gmail.com" },
            ].map((item, idx) => (
              <motion.a
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                key={idx}
                href={item.href}
                target="_blank"
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-amber-200/70 hover:bg-amber-300 text-amber-900 font-medium shadow-md transition"
              >
                {item.icon} {item.label}
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* Visitor stats */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="grid grid-cols-2 gap-6 text-center"
        >
          <div className="bg-amber-200/70 p-5 rounded-2xl shadow-md hover:shadow-lg transition">
            <h3 className="font-semibold text-md mb-2">Unique Visitors</h3>
            <motion.p
              key={displayVisitors}
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4 }}
              className="text-2xl md:text-3xl font-mono tracking-widest text-amber-900"
            >
              {displayVisitors.toLocaleString()}
            </motion.p>
          </div>

          <div className="bg-amber-200/70 p-5 rounded-2xl shadow-md hover:shadow-lg transition">
            <h3 className="font-semibold text-md mb-2">Total Visits</h3>
            <motion.p
              key={displayVisits}
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4 }}
              className="text-2xl md:text-3xl font-mono tracking-widest text-amber-900"
            >
              {displayVisits.toLocaleString()}
            </motion.p>
          </div>
        </motion.div>
      </div>

      {/* Bottom note */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="relative bg-amber-900/90 text-amber-100 text-sm py-3 text-center w-full border-t border-amber-700/60"
      >
        © {new Date().getFullYear()} Vedix | Contributions welcome from all ✨
      </motion.div>
    </footer>
  );
};

export default Footer;
