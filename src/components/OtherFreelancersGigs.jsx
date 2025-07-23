import React from "react";
import API from "../utils/api";
import { useState } from "react";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import GigsDetailModal from "./GigsDetailModal";
const OtherFreelancersGigs = () => {
  const [otherFreelancersGigs, setOtherFreelancersGigs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedGig, setSelectedGig] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const fetchOthersGigs = async () => {
    setLoading(true);
    try {
      const res = await API.get("/gigs/others");
      setOtherFreelancersGigs(res.data);
      console.log(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchOthersGigs();
  }, []);

  const handleChatClick = (gig) => {
    if (window.startGlobalChat && gig?.freelancerId?._id) {
      window.startGlobalChat(gig.freelancerId._id);
    }
  };

  const handleViewDetails = (gig) => {
    setSelectedGig(gig);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedGig(null);
  };

  return (
    <div className="min-h-2/4">
      <div className="p-6">
        {loading ? (
          <div className="flex flex-col items-center justify-center h-96">
            <div className="w-16 h-16 border-4 border-green-200 border-t-green-500 rounded-full animate-spin"></div>
            <p className="text-gray-600 text-lg mt-4">Loading your gigs...</p>
          </div>
        ) : otherFreelancersGigs.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 px-4">
            {otherFreelancersGigs.map((gig) => (
              <div
                key={gig._id}
                className="group relative bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100"
              >
                {/* Thumbnail */}
                <div className="relative overflow-hidden">
                  <img
                    src={
                      gig.thumbnail ||
                      "https://via.placeholder.com/400x240?text=No+Image"
                    }
                    alt={gig.title}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4 bg-white text-black px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                    ${gig.price}
                  </div>
                  {gig.category && (
                    <div className="absolute top-4 left-4 bg-white/90 text-gray-700 px-3 py-1 rounded-full text-xs font-medium shadow-md">
                      {gig.category}
                    </div>
                  )}
                </div>

                {/* Card Content */}
                <div className="p-6 relative z-20">
                  {/* Freelancer Info */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className="relative">
                      <img
                        src={
                          gig.freelancerId?.avatar ||
                          "https://img.freepik.com/premium-vector/vector-flat-illustration-grayscale-avatar-user-profile-person-icon-gender-neutral-silhouette-profile-picture-suitable-social-media-profiles-icons-screensavers-as-templatex9xa_719432-2210.jpg?semt=ais_hybrid&w=740"
                        }
                        alt={gig.freelancerId?.username || "Freelancer"}
                        className="w-10 h-10 rounded-full object-cover border-2 border-green-400 shadow-md"
                      />
                      <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                    </div>
                    <div>
                      <p className="text-gray-800 font-semibold text-sm">
                        {gig.freelancerId?.username || "Unknown Freelancer"}
                      </p>
                      <p className="text-gray-500 text-xs">Freelancer</p>
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2 group-hover:text-green-600 transition-colors duration-300">
                    {gig.title}
                  </h3>
                  <p className="text-gray-600 text-sm line-clamp-3 mb-4 leading-relaxed">
                    {gig.description}
                  </p>

                  {/* Skills/Tags */}
                  {gig.skills && gig.skills.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {gig.skills.slice(0, 3).map((skill, index) => (
                        <span
                          key={index}
                          className="bg-gray-100 text-gray-700 px-2 py-1 rounded-md text-xs font-medium"
                        >
                          {skill}
                        </span>
                      ))}
                      {gig.skills.length > 3 && (
                        <span className="bg-gray-100 text-gray-500 px-2 py-1 rounded-md text-xs">
                          +{gig.skills.length - 3} more
                        </span>
                      )}
                    </div>
                  )}

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100 mb-4">
                    <div className="flex items-center gap-1">
                      <svg
                        className="w-4 h-4 text-yellow-400 fill-current"
                        viewBox="0 0 20 20"
                      >
                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                      </svg>
                      <span className="text-sm font-medium text-gray-700">
                        {gig.rating || "5.0"}
                      </span>
                      <span className="text-xs text-gray-500">
                        ({gig.reviews || "0"})
                      </span>
                    </div>

                    <div className="text-right">
                      <p className="text-xs text-gray-500">Starting at</p>
                      <p className="text-lg font-bold text-green-600">
                        ${gig.price}
                      </p>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <Button
                      onClick={() => handleViewDetails(gig)}
                      className="flex-1 bg-green-500 hover:bg-green-600 text-white text-sm py-2 rounded-lg transition-colors duration-300"
                    >
                      View Details
                    </Button>
                    <Button
                      onClick={() => handleChatClick(gig)}
                      variant="outline"
                      className="flex-1 border-green-500 text-green-600 hover:bg-green-50 text-sm py-2 rounded-lg transition-colors duration-300"
                    >
                      Chat
                    </Button>
                  </div>
                </div>

                {/* Hover Effect */}
                <div className="absolute inset-0 border-2 border-green-400 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-96">
            <h3 className="text-2xl font-bold text-white mb-2">
              No gigs found from other freelancers
            </h3>
            <p className="text-green-400 text-lg mb-6 max-w-md text-center">
              It seems like there are no gigs available from other freelancers
              at the moment. Please check back later or explore other
              categories.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default OtherFreelancersGigs;
