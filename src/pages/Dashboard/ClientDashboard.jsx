import Navbar from "../../components/Navbar";
import React, { useEffect } from "react";
import { WritingText } from "@/components/animate-ui/text/writing";
import Freelancers from "../../components/Freelancers";
import Footer from "../../components/Footer";
import { useNavigate } from "react-router-dom";
// import ProfileCard from "../../../component/ProfileCard/ProfileCard";

import { useState } from "react";

const categories = [
  { name: "Web Developer", icon: "💻" },
  { name: "UI/UX Designer", icon: "🎨" },
  { name: "Video Editor", icon: "🎬" },
  { name: "Content Writer", icon: "✍️" },
];

const ClientDashboard = () => {
  const navigate = useNavigate(); // Import useNavigate from react-router-dom
  const [user, setuser] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Add useEffect to check for token
  useEffect(() => {
    const token = localStorage.getItem("token");
    const userString = localStorage.getItem("user");
    if (userString) {
      setuser(JSON.parse(userString));
    }
    if (!token) {
      navigate("/"); // Redirect to login or home page if no token found.
    }
  }, [navigate]);

  return (
    <div className="relative min-h-screen">
      <Navbar />
      <div className="p-6">
        <div className="relative flex flex-col items-center justify-center min-h-[80vh]">
          <img
            src="/Dashboard_bg.jpg"
            alt=""
            className="absolute inset-0 w-full h-full object-cover opacity-60 -z-10 rounded-2xl"
          />
          <div className="mt-32 md:mt-40 flex flex-col items-center w-full px-4">
            <h1 className="text-4xl md:text-6xl font-bold text-white text-center drop-shadow-lg">
              Hello {user?.username}, Welcome to Giglyy
              <span className="text-green-500">.</span>
            </h1>
            <WritingText
              className="text-sm mt-5 md:text-3xl font-medium text-white text-center drop-shadow-lg"
              text="Your one-stop platform for finding and hiring top freelance talent."
              spacing={9}
            />
            <div className="mt-8 w-full max-w-2xl">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  // Scroll to the Freelancers section on search
                  const gigsSection = document.getElementById("freelancer-gigs-section");
                  if (gigsSection) {
                    gigsSection.scrollIntoView({ behavior: "smooth" });
                  }
                }}
                className="flex items-center bg-white/90 rounded-full shadow-lg px-4 py-2"
              >
                <span className="text-gray-400 text-2xl mr-2">🔍</span>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for services, skills, or freelancers..."
                  className="flex-1 bg-transparent outline-none text-lg text-gray-700 placeholder-gray-400"
                />
                <button
                  type="submit"
                  className="ml-2 px-6 py-2 rounded-full bg-gradient-to-r from-green-500 to-blue-500 text-white font-semibold hover:from-green-600 hover:to-blue-600 transition"
                >
                  Search
                </button>
              </form>
            </div>
            <div className="mt-10 w-full max-w-3xl bg-white/80 rounded-xl shadow-lg p-8 flex flex-col items-center">
              <h3 className="text-2xl font-bold text-green-700 mb-2 text-center">
                Why choose Giglyy?
              </h3>
              <ul className="text-gray-700 text-lg space-y-2 text-center">
                <li>✔️ 50+ categories to explore</li>
                <li>✔️ Secure payments & trusted reviews</li>
                <li>✔️ Connect with global talent instantly</li>
                <li>✔️ 24/7 support for clients and freelancers</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-center mt-5" id="freelancer-gigs-section">
        <h1 className="text-4xl font-medium text-white mb-2 text-center">
          Get it done with right Freelancer
        </h1>
        <div className="p-6">
          <Freelancers searchQuery={searchQuery} />
        </div>
        <div className="flex flex-col justify-center items-center mt-5">
          <h1 className="text-4xl font-medium text-white mb-2 text-center">
            Categories
          </h1>
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 w-full max-w-4xl">
            {categories.map((cat) => (
              <div
                key={cat.name}
                className="group cursor-pointer rounded-2xl bg-white/90 backdrop-blur-sm p-6 text-center shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border border-gray-200/50"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-green-300 to-blue-100 mx-auto mb-4 transition-all duration-300 group-hover:scale-110 group-hover:shadow-md">
                  <span className="text-4xl">{cat.icon}</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-800 transition-colors duration-300 group-hover:text-green-600">
                  {cat.name}
                </h3>
                <div className="mt-2 h-1 w-10 mx-auto bg-green-200 rounded-full transition-all duration-300 group-hover:w-16 group-hover:bg-green-400"></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Post a Job Section */}
      <div className="my-20 px-4">
        <div className="relative max-w-4xl mx-auto bg-gradient-to-r from-green-500 to-blue-500 rounded-2xl shadow-2xl p-10 md:p-16 text-white overflow-hidden">
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full opacity-50"></div>
          <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-white/10 rounded-full opacity-50"></div>
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-center md:text-left">
              <h2 className="text-3xl md:text-4xl font-bold mb-2">
                Have a project in mind?
              </h2>
              <p className="text-lg opacity-90 max-w-md">
                Post your job today and get proposals from talented freelancers.
              </p>
            </div>
            <button
              onClick={() => navigate("/post-job")}
              className="bg-white text-green-600 font-bold px-8 py-3 rounded-full shadow-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 whitespace-nowrap"
            >
              Post a Job
            </button>
          </div>
        </div>
      </div>

      {/* About and Creator Section */}
      <div className="p-6">
        <div className="py-20 rounded-2xl px-4 bg-white">
          <div className="max-w-5xl mx-auto grid md:grid-cols-5 gap-16 items-center">
            {/* About Giglyy Section */}
            <div className="md:col-span-3 space-y-4 text-center md:text-left">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
                What is <span className="text-green-500">Giglyy</span>?
              </h2>
              <p className="text-gray-600 text-lg">
                Giglyy is a dynamic freelance marketplace designed to bridge the
                gap between talented professionals and clients seeking their
                expertise. Our mission is to create a seamless, secure, and
                efficient environment for collaboration.
              </p>
              <p className="text-gray-600">
                Whether you're a developer, designer, writer, or video editor,
                Giglyy provides the tools you need to showcase your skills,
                manage projects, and grow your career. For clients, we offer a
                curated pool of top-tier talent, ensuring your projects are in
                capable hands.
              </p>
            </div>

            {/* Meet the Creator Section */}
            {/* <ProfileCard
              name="Jay Thakor"
              title="Full Stack Developer"
              handle="jaythakor"
              status="Online"
              contactText="Contact Me"
              avatarUrl="https://collection.cloudinary.com/dw8mhnhu5/41d98f80b874e4e226e11f2ed5973ff5"
              showUserInfo={true}
              enableTilt={true}
              onContactClick={() => console.log("Contact clicked")}
            /> */}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ClientDashboard;
