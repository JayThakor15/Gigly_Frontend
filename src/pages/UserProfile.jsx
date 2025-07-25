import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { Button } from "@/components/ui/button";

const UserProfile = () => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);
  return (
    <div>
      <Navbar />
      <div className="p-8 w-full flex gap-8">
        {/* Left Side */}
        <div className="left w-1/4 bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center justify-center gap-6">
          <img
            src="https://img.freepik.com/premium-vector/vector-flat-illustration-grayscale-avatar-user-profile-person-icon-gender-neutral-silhouette-profile-picture-suitable-social-media-profiles-icons-screensavers-as-templatex9xa_719432-2210.jpg?semt=ais_hybrid&w=740"
            alt="Profile"
            className="w-48 h-48 rounded-full object-cover border-4 border-green-500 shadow-md"
          />
          <Button className="w-full text-white font-semibold py-2 px-4 rounded-lg transition-colors">
            Upload New Image
          </Button>
          <div className="flex flex-col justify-center items-center">
            <h1 className="text-2xl font-bold">{user?.username}</h1>
            <p className="text-gray-600">{user?.email}</p>
          </div>
          <div className="h-full w-full">
            <Button className="w-20 relative right-3 text-white font-semibold py-2 px-4 rounded-lg transition-colors">
              Edit Profile
            </Button>
          </div>
        </div>

        {/* Right Side */}
        <div className="right w-3/4 bg-white rounded-2xl shadow-lg p-6">
          <h2>Profile Details</h2>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
