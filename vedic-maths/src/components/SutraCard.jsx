import React from "react";
import { useNavigate } from "react-router-dom";

const SutraCard = ({ title, description, link }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(link)}
      className="cursor-pointer p-5 w-72 rounded-xl shadow-lg 
                 bg-[rgba(72,40,20,0.35)] border border-[rgba(150,100,60,0.4)]
                 backdrop-blur-md text-yellow-200 hover:scale-105 transition-transform duration-300
                 hover:shadow-[0_0_15px_rgba(255,215,0,0.6)]"
    >
      <h2 className="text-2xl font-bold mb-2">Title</h2>
      <p className="text-sm text-yellow-100/80">Description</p>
    </div>
  );
};

export default SutraCard;
