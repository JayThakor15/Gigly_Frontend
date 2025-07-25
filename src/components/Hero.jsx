import React, { useState } from "react";
import Searchbar from "./Searchbar";
import Buttons from "./Buttons";
import CategoryBox from "./CategoryBox";

const categories = [
  {
    label: "Programming & Tech",
    icon: (
      <svg
        width="36"
        height="36"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <rect x="3" y="4" width="18" height="12" rx="2" />
        <path d="M8 20h8M12 16v4" />
      </svg>
    ),
  },
  {
    label: "Graphics & Design",
    icon: (
      <svg
        width="36"
        height="36"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <rect x="3" y="3" width="18" height="18" rx="4" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    ),
  },
  {
    label: "Digital Marketing",
    icon: (
      <svg
        width="36"
        height="36"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <rect x="2" y="7" width="20" height="10" rx="2" />
        <path d="M16 3v4M8 3v4M12 12v2" />
      </svg>
    ),
  },
  {
    label: "Writing & Translation",
    icon: (
      <svg
        width="36"
        height="36"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <path d="M4 19h16M4 5h16M4 5v14M20 5v14" />
        <path d="M9 9h6M9 13h6" />
      </svg>
    ),
  },
  {
    label: "Video & Animation",
    icon: (
      <svg
        width="36"
        height="36"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <polygon points="10,9 16,12 10,15" />
      </svg>
    ),
  },
  {
    label: "AI Services",
    icon: (
      <svg
        width="36"
        height="36"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <rect x="4" y="4" width="16" height="16" rx="4" />
        <path d="M8 8h8v8H8z" />
      </svg>
    ),
  },
  {
    label: "Music & Audio",
    icon: (
      <svg
        width="36"
        height="36"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <path d="M9 17V5l12-2v12" />
        <circle cx="6" cy="18" r="3" />
        <circle cx="18" cy="16" r="3" />
      </svg>
    ),
  },
  {
    label: "Business",
    icon: (
      <svg
        width="36"
        height="36"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <circle cx="12" cy="7" r="4" />
        <path d="M5.5 21a7.5 7.5 0 0 1 13 0" />
      </svg>
    ),
  },
];

const VISIBLE_COUNT = 4;

const Hero = () => {
  const [startIdx, setStartIdx] = useState(0);

  const handleScroll = (direction) => {
    if (direction === "left") {
      setStartIdx((prev) => Math.max(prev - 1, 0));
    } else {
      setStartIdx((prev) =>
        Math.min(prev + 1, categories.length - VISIBLE_COUNT)
      );
    }
  };

  const visibleCategories = categories.slice(
    startIdx,
    startIdx + VISIBLE_COUNT
  );

  return (
    <div className="relative w-full flex flex-col items-center justify-center overflow-hidden">
      <video
        src="Hero_Background.mp4"
        autoPlay
        loop
        muted
        className="w-full h-full object-cover opacity-70"
      ></video>
      <div className="absolute top-60 z-10 w-full flex flex-col items-center">
        <h1 className="text-white text-4xl md:text-6xl font-bold drop-shadow-lg text-center mb-8">
          Your vision, our freelancers
          <span className="text-green-500">.</span>
        </h1>
        <Searchbar />
        <div className="flex flex-wrap justify-center mt-4">
          <Buttons buttonText="Web Developer" />
          <Buttons buttonText="UI/UX Designer" />
          <Buttons buttonText="Video Editor" />
          <Buttons buttonText="Content Writer" />
        </div>
      </div>
      {/* Category Boxes Carousel */}
      <div className="relative w-full mt-8 flex items-center justify-center">
        {/* Left Arrow */}
        <button
          className="absolute left-0 z-20 text-green-500 bg-white rounded-full shadow p-2 m-2 hover:bg-gray-100 transition disabled:opacity-50"
          onClick={() => handleScroll("left")}
          aria-label="Scroll left"
          disabled={startIdx === 0}
        >
          <svg
            width="24"
            height="24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        {/* Only show 4 boxes */}
        <div className="flex gap-4 px-8">
          {visibleCategories.map((cat, idx) => (
            <CategoryBox
              key={idx + startIdx}
              icon={cat.icon}
              label={cat.label}
            />
          ))}
        </div>
        {/* Right Arrow */}
        <button
          className="absolute right-0 z-20 text-green-500 bg-white rounded-full shadow p-2 m-2 hover:bg-gray-100 transition disabled:opacity-50"
          onClick={() => handleScroll("right")}
          aria-label="Scroll right"
          disabled={startIdx >= categories.length - VISIBLE_COUNT}
        >
          <svg
            width="24"
            height="24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Hero;
