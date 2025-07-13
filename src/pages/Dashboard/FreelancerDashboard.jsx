import Navbar from "../../components/Navbar";
import React, { useEffect } from "react";
import { WritingText } from "@/components/animate-ui/text/writing";
import Freelancers from "../../components/Freelancers";
import Footer from "../../components/Footer";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import MyGigs from "../../components/MyGigs";
import OtherFreelancersGigs from "../../components/OtherFreelancersGigs";
import SplitText from "../../../component/SplitText/SplitText"; // Make sure this import is correct

const categories = [
  { name: "Web Developer", icon: "💻" },
  { name: "UI/UX Designer", icon: "🎨" },
  { name: "Video Editor", icon: "🎬" },
  { name: "Content Writer", icon: "✍️" },
];

const FreelancerDashboard = () => {
  const navigate = useNavigate(); // Import useNavigate from react-router-dom
  const [user, setuser] = useState(null);
  console.log(user);

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
            <h3 className="text-2xl md:text-4xl font-bold text-white text-center drop-shadow-lg">Hello {user?.username}</h3>
            {/* Animated User Welcome */}
            <SplitText
              text={`Welcome to Giglyy.`}
              className="text-4xl md:text-6xl font-extrabold text-white text-center drop-shadow-lg"
              delay={80}
              duration={0.6}
              splitType="chars"
              from={{ opacity: 0, y: 40 }}
              to={{ opacity: 1, y: 0 }}
              threshold={0.1}
              rootMargin="-100px"
              textAlign="center"
              
            />
            <WritingText
              className="text-base mt-2 md:text-2xl font-medium text-white text-center drop-shadow-lg"
              text="Your one-stop platform for finding and hiring top freelance talent."
              spacing={9}
            />

            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 w-full max-w-4xl">
              {categories.map((cat) => (
                <div
                  key={cat.name}
                  className="flex flex-col items-center bg-white/80 rounded-xl p-6 shadow-md hover:scale-105 transition-transform cursor-pointer border border-green-100"
                >
                  <span className="text-4xl mb-2">{cat.icon}</span>
                  <span className="text-lg font-semibold text-gray-800">
                    {cat.name}
                  </span>
                </div>
              ))}
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
      <div className="flex flex-col justify-center mt-5">
        <h1 className="text-4xl font-medium text-white mb-2 text-center">
          Your Gigs
        </h1>
        <div className="mt-5 ">
          <MyGigs />
        </div>
        <div className="flex flex-col justify-center mt-5">
          <h1 className="text-4xl font-medium text-white mb-2 text-center">
            See what other freelancers are up to
          </h1>
          <div className="mt-5 ">
            <OtherFreelancersGigs />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default FreelancerDashboard;
