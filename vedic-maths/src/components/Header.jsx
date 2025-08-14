import React from "react";
import { Github, Linkedin, Mail } from "lucide-react"; // yarn add lucide-react

export default function HeaderBar() {
  return (
    <div>
      <h1 className="absolute top-[10%] left-1/2 -translate-x-1/2 text-5xl font-bold underline text-yellow-600 drop-shadow-lg">
        Vedix
      </h1>
      <div className="absolute top-5 right-5 flex gap-6 text-lg font-medium 
  bg-[rgba(72,40,20,0.35)] px-4 py-2 rounded-xl shadow-md 
  backdrop-blur-md border border-[rgba(150,100,60,0.4)]"
      >
        {" "}
        <a
          href="https://github.com/Pradeepmodak"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-yellow-500 hover:text-yellow-300 transition"
        >
          <Github size={30} strokeWidth={1.5} /> GitHub
        </a>
        <a
          href="https://www.linkedin.com/in/pradeep-modak-9a0a6a27a/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-yellow-500 hover:text-yellow-300 transition"
        >
          <Linkedin size={30} strokeWidth={1.5} /> LinkedIn
        </a>
        <a
          href="mailto:pradeepmodakofficial@gmail.com"
          className="flex items-center gap-2 text-yellow-500 hover:text-yellow-300 transition"
        >
          <Mail size={30} strokeWidth={1.5} /> Email
        </a>
      </div>
    </div>
  );
}
