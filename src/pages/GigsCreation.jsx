import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { Button } from "@/components/ui/button";
import API from "../utils/api";
import GigsForm from "../components/GigsCreationForm"; // Make sure you use the correct path

const GigsCreation = () => {
  const [gigs, setGigs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  console.log(gigs);

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

  useEffect(() => {
    fetchAllGigs();
  }, []);

  return (
    <div className="h-screen">
      <Navbar />

      <div className="p-6">
        <h1 className="text-4xl font-bold text-white text-center">
          Manage Your Gigs
        </h1>

        <div className="relative rounded-2xl w-full bg-white h-screen mt-4 p-4">
          <Button
            className="absolute top-4 right-4 text-white font-semibold"
            onClick={() => setOpen(true)}
          >
            Create New Gig
          </Button>

          {loading ? (
            <div className="flex items-center justify-center h-full">
              <p className="text-gray-500 text-lg">Loading your gigs...</p>
            </div>
          ) : gigs.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-16">
              {gigs.map((gig) => {
                const avatarUrl =
                  gig.freelancerId &&
                  typeof gig.freelancerId === "object" &&
                  gig.freelancerId.avatar
                    ? gig.freelancerId.avatar
                    : "/default-avatar.jpg";

                const username =
                  gig.userId &&
                  typeof gig.userId === "object" &&
                  gig.userId.username
                    ? gig.userId.username
                    : "Unknown User";

                return (
                  <div
                    key={gig._id}
                    className="bg-gray-50 rounded-xl shadow-lg p-6 flex flex-col items-center w-full max-w-xs mx-auto hover:scale-105 transition-transform duration-300"
                  >
                    {/* User Info */}
                    <div className="flex items-center gap-3 mb-4">
                      <img
                        src={avatarUrl}
                        alt={username}
                        className="w-10 h-10 rounded-full object-cover border border-green-400"
                      />
                      <p className="text-gray-800 font-medium">{username}</p>
                    </div>

                    {/* Gig Thumbnail */}
                    <img
                      src={gig.thumbnail || "/default-thumbnail.jpg"}
                      alt={gig.title}
                      className="w-full h-40 object-cover rounded-lg mb-4"
                    />

                    <h3 className="text-lg font-bold mb-2 text-gray-800 text-center">
                      {gig.title}
                    </h3>
                    <p className="text-gray-600 text-sm text-center">
                      {gig.description}
                    </p>
                    <span className="font-semibold mt-2">
                      From: ${gig.price}
                    </span>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <p className="text-gray-600 text-2xl font-semibold">
                No Gigs Found
              </p>
              <p className="text-gray-400 text-md mt-2">
                Click on 'Create New Gig' to get started!
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      <GigsForm
        open={open}
        onOpenChange={setOpen}
        onSaved={() => fetchAllGigs()}
      />
    </div>
  );
};

export default GigsCreation;
