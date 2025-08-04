import React from "react";
import API from "../utils/api";
import { useState } from "react";
import { useEffect } from "react";

const OtherFreelancersGigs = () => {
  const [freelancers, setFreelancers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchFreelancers = async () => {
    setLoading(true);
    try {
      const res = await API.get("/gigs/others"); // Assuming this endpoint exists, you can change it as needed
      setFreelancers(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFreelancers();
  }, []);

  return (
    <div className="min-h-2/4">
      <div className="p-6">
        {loading ? (
          <div className="flex flex-col items-center justify-center h-96">
            <div className="w-16 h-16 border-4 border-green-200 border-t-green-500 rounded-full animate-spin"></div>
            <p className="text-gray-600 text-lg mt-4">Loading freelancers...</p>
          </div>
        ) : freelancers.length > 0 ? (
          <div
            key={freelancers._id}
            className="bg-gray-50 rounded-xl shadow-lg p-6 flex flex-col items-center w-full max-w-xs mx-auto hover:scale-105 transition-transform duration-300"
          >
            {/* User Info */}
            <div className="flex items-center gap-3 mb-4">
              <img
                src={freelancers?.freelancerId?.avatar || "/default-avatar.jpg"}
                alt={freelancers?.freelancerId?.username}
                className="w-10 h-10 rounded-full object-cover border border-green-400"
              />
              <p className="text-gray-800 font-medium">
                {freelancers?.userId?.username}
              </p>
            </div>

            {/* Gig Thumbnail */}
            <img
              src={freelancers.thumbnail || "/default-thumbnail.jpg"}
              alt={freelancers.title}
              className="w-full h-40 object-cover rounded-lg mb-4"
            />

            <h3 className="text-lg font-bold mb-2 text-gray-800 text-center">
              {freelancers.title}
            </h3>
            <p className="text-gray-600 text-sm text-center">
              {freelancers.description}
            </p>
            <span className="font-semibold mt-2">
              From: ${freelancers.price}
            </span>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-96">
            <h3 className="text-2xl font-bold text-gray-800 mb-2">
              No freelancers found
            </h3>
            <p className="text-gray-600 text-lg mb-6 max-w-md text-center">
              It seems like there are no freelancers available at the moment.
              Please check back later or try refreshing the page.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default OtherFreelancersGigs;
