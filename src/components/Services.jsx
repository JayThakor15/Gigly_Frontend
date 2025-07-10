import React, { useState } from "react";

const servicesData = [
  {
    title: "Logo Design",
    description: "Professional logos for your brand.",
    icon: (
      <svg
        width="36"
        height="36"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <circle cx="12" cy="12" r="10" />
        <path d="M8 12l2 2 4-4" />
      </svg>
    ),
  },
  {
    title: "SEO Optimization",
    description: "Boost your website ranking.",
    icon: (
      <svg
        width="36"
        height="36"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <path d="M3 17l6-6 4 4 8-8" />
        <path d="M14 7h7v7" />
      </svg>
    ),
  },
  {
    title: "App Development",
    description: "Mobile & web app solutions.",
    icon: (
      <svg
        width="36"
        height="36"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M7 7h.01M17 17h.01" />
      </svg>
    ),
  },
  {
    title: "Content Writing",
    description: "Engaging articles & blogs.",
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
    title: "Social Media Management",
    description: "Grow your audience and engagement.",
    icon: (
      <svg
        width="36"
        height="36"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <circle cx="12" cy="12" r="10" />
        <path d="M8 15h8M8 11h8M8 7h8" />
      </svg>
    ),
  },
  {
    title: "Translation",
    description: "Translate documents to any language.",
    icon: (
      <svg
        width="36"
        height="36"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <path d="M4 5h16M4 19h16M4 5v14M20 5v14" />
        <path d="M9 9h6M9 13h6" />
      </svg>
    ),
  },
  {
    title: "Video Editing",
    description: "Professional video editing services.",
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
    title: "Voice Over",
    description: "High quality voice over for your projects.",
    icon: (
      <svg
        width="36"
        height="36"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <circle cx="12" cy="12" r="10" />
        <path d="M8 12h8M12 8v8" />
      </svg>
    ),
  },
];

const VISIBLE_COUNT = 4;

const Services = () => {
  const [serviceIdx, setServiceIdx] = useState(0);

  const handleServiceScroll = (direction) => {
    if (direction === "left") {
      setServiceIdx((prev) => Math.max(prev - 1, 0));
    } else {
      setServiceIdx((prev) =>
        Math.min(prev + 1, servicesData.length - VISIBLE_COUNT)
      );
    }
  };

  const visibleServices = servicesData.slice(
    serviceIdx,
    serviceIdx + VISIBLE_COUNT
  );

  return (
    <div className="w-full mt-12 flex flex-col items-center">
      <h2 className="text-white text-2xl md:text-4xl font-medium drop-shadow-lg text-center mb-4">
        Popular Services
      </h2>
      <div className="relative w-full flex items-center justify-center">
        {/* Left Arrow */}
        <button
          className="absolute left-0 z-20 text-green-500 bg-white rounded-full shadow p-2 m-2 hover:bg-gray-100 transition disabled:opacity-50"
          onClick={() => handleServiceScroll("left")}
          aria-label="Scroll left"
          disabled={serviceIdx === 0}
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
        {/* Only show 4 service cards */}
        <div className="flex gap-6 px-8">
          {visibleServices.map((service, idx) => (
            <div
              key={serviceIdx + idx}
              className="bg-white/90 rounded-xl shadow-lg p-6 flex flex-col items-center w-64 hover:scale-105 transition"
            >
              <div className="mb-4 text-green-500">{service.icon}</div>
              <h3 className="text-lg font-semibold mb-2 text-gray-800">
                {service.title}
              </h3>
              <p className="text-gray-600 text-center">{service.description}</p>
            </div>
          ))}
        </div>
        {/* Right Arrow */}
        <button
          className="absolute right-0 z-20 text-green-500 bg-white rounded-full shadow p-2 m-2 hover:bg-gray-100 transition disabled:opacity-50"
          onClick={() => handleServiceScroll("right")}
          aria-label="Scroll right"
          disabled={serviceIdx >= servicesData.length - VISIBLE_COUNT}
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

export default Services;
