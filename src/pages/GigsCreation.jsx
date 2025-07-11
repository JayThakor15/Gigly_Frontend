import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { Button } from "@/components/ui/button";
import API from "../utils/api";
import GigsForm from "../components/GigsCreationForm"; // Make sure you use the correct path
import EditGigModal from "../components/EditGigModel";
import toast, { Toaster } from "react-hot-toast";


const GigsCreation = ({ open, onOpenChange, onSaved, gig }) => {
  const [gigs, setGigs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openCreate, setOpenCreate] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [selectedGig, setSelectedGig] = useState(null);

  const fetchAllGigs = async () => {
    setLoading(true);
    try {
      const res = await API.get("/gigs");
      setGigs(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  const handleDeleteGig = async (gigId) => {
    try {
      await API.delete(`/gigs/${gigId}`);
      fetchAllGigs();
      toast.success("Gig deleted successfully!");
    } catch (err) {
      toast.error("Failed to delete gig. Please try again.");
      console.error(err);
    }
  };

  useEffect(() => {
    fetchAllGigs();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br">
      <Toaster />
      <Navbar />

      <div className="p-6">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-2">
            Manage Your Gigs
          </h1>
          <p className="text-gray-600 text-lg">
            Create, edit, and showcase your professional services
          </p>
        </div>

        <div className="relative rounded-3xl w-full bg-white/80 backdrop-blur-sm shadow-2xl border border-white/20 min-h-[80vh] p-6">
          <Button
            className="absolute top-6 right-6  text-white font-semibold px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
            onClick={() => setOpenCreate(true)}
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
            Create New Gig
          </Button>

          {loading ? (
            <div className="flex flex-col items-center justify-center h-96">
              <div className="relative">
                <div className="w-16 h-16 border-4 border-green-200 border-t-green-500 rounded-full animate-spin"></div>
                <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-r-blue-500 rounded-full animate-spin animation-delay-150"></div>
              </div>
              <p className="text-gray-600 text-lg font-medium mt-4">
                Loading your amazing gigs...
              </p>
              <p className="text-gray-400 text-sm mt-1">
                Please wait while we fetch your content
              </p>
            </div>
          ) : gigs.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mt-16 px-4">
              {gigs.map((gig) => {
                const avatarUrl =
                  gig.freelancerId &&
                  typeof gig.freelancerId === "object" &&
                  gig.freelancerId.avatar
                    ? gig.freelancerId.avatar
                    : "https://img.freepik.com/premium-vector/vector-flat-illustration-grayscale-avatar-user-profile-person-icon-gender-neutral-silhouette-profile-picture-suitable-social-media-profiles-icons-screensavers-as-templatex9xa_719432-2210.jpg?semt=ais_hybrid&w=740";

                const username =
                  gig.userId &&
                  typeof gig.userId === "object" &&
                  gig.userId.username
                    ? gig.userId.username
                    : "Unknown User";

                return (
                  <div
                    key={gig._id}
                    className="group relative bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100"
                  >
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-green-400/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"></div>

                    {/* Gig Thumbnail with Overlay */}
                    <div className="relative overflow-hidden">
                      <img
                        src={
                          gig.thumbnail ||
                          "https://via.placeholder.com/400x240/f3f4f6/9ca3af?text=No+Image"
                        }
                        alt={gig.title}
                        className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      {/* Price Badge */}
                      <div className="absolute top-4 right-4 bg-white text-black px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                        ${gig.price}
                      </div>
                      {/* Category Badge */}
                      {gig.category && (
                        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-gray-700 px-3 py-1 rounded-full text-xs font-medium shadow-md">
                          {gig.category}
                        </div>
                      )}
                    </div>

                    {/* Card Content */}
                    <div className="p-6 relative z-20">
                      {/* User Info */}
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <img
                            src={avatarUrl}
                            alt={username}
                            className="w-12 h-12 rounded-full object-cover border-2  shadow-md"
                          />
                        </div>
                        <div>
                          <p className="text-gray-800 font-semibold text-sm">
                            {username}
                          </p>
                          <p className="text-gray-500 text-xs">Freelancer</p>
                        </div>
                      </div>

                      {/* Gig Title */}
                      <h3 className="text-lg font-bold text-gray-800 line-clamp-2 group-hover:text-green-600 transition-colors duration-300">
                        {gig.title}
                      </h3>

                      {/* Description */}
                      <p className="text-gray-600 text-sm line-clamp-3 leading-relaxed">
                        {gig.description}
                      </p>

                      {/* Footer */}
                      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                        <div className="text-right">
                          <p className="text-xs text-gray-500">Starting at</p>
                          <p className="text-lg font-bold text-black">
                            ${gig.price}
                          </p>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-2 mt-2">
                        <Button
                          onClick={() => {
                            setSelectedGig(gig);
                            setOpenEdit(true);
                          }}
                          variant="outline"
                          className="flex-1 border-black bg-black text-white  hover:bg-green-50 text-sm py-2 rounded-lg transition-colors duration-300"
                        >
                          Edit
                        </Button>
                        <Button
                          onClick={() => {
                            handleDeleteGig(gig._id);
                          }}
                          variant="outline"
                          className="flex-1 text-red-500  hover:bg-red-500 text-sm py-2 rounded-lg transition-colors duration-300"
                        >
                          Delete
                        </Button>
                      </div>
                    </div>

                    {/* Hover Effect Border */}
                    <div className="absolute inset-0 border-2 border-green-400 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-96 text-center">
              <div className="w-32 h-32 bg-gradient-to-br from-green-100 to-blue-100 rounded-full flex items-center justify-center mb-6">
                <svg
                  className="w-16 h-16 text-green-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-700 mb-2">
                No Gigs Found
              </h3>
              <p className="text-gray-500 text-lg mb-6 max-w-md">
                Start your freelancing journey by creating your first gig and
                showcase your skills to the world!
              </p>
              <Button
                onClick={() => setOpen(true)}
                className=" text-white font-semibold px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                Create Your First Gig
              </Button>
            </div>
          )}
        </div>
      </div>
      <EditGigModal
        open={openEdit}
        onOpenChange={setOpenEdit}
        gig={selectedGig}
        onUpdated={fetchAllGigs}
      />

      {/* Modal */}
      <GigsForm
        open={openCreate}
        onOpenChange={setOpenCreate}
        onSaved={() => fetchAllGigs()}
      />
    </div>
  );
};

export default GigsCreation;
