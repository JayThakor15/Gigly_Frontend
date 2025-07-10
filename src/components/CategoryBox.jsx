import React from "react";

const CategoryBox = ({ icon, label }) => (
  <div className="flex flex-col items-center justify-center w-40 h-30 bg-white rounded-2xl shadow-md m-2 transition-transform hover:scale-105 cursor-pointer">
    <div className="text-2xl mb-3 text-gray-700">{icon}</div>
    <div className="text-sm font-semibold text-gray-800 text-center">{label}</div>
  </div>
);

export default CategoryBox;