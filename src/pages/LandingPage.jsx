import React, { useContext, useEffect } from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Aboutus from '../components/Aboutus'
import Services from '../components/services'
import ContactUs from '../components/ContactUs'
import Footer from '../components/Footer'
import RegLogModel from '../components/RegLogModel'
import { AuthContext } from "../context/authContext.jsx";
import { useNavigate } from "react-router-dom";


const LandingPage = () => {
  const { user, loading } = useContext(AuthContext);
  const navigate = useNavigate();


  useEffect(() => {
     console.log("User role:", user?.role);
     if (!loading) {
       if (!user) {
         navigate("/"); // Or your login page
       } else if (user.role === "freelancer") {
         navigate("/freelancerdashboard");
       } else if (user.role === "client") {
         navigate("/clientdashboard");
       } else {
         navigate("/"); // fallback
       }
     }
   }, [user, loading, navigate]);
 
  return ( 
    <div className="h-screen bg-[#040109]">
      <Navbar />
      <RegLogModel />
      <div id="home">
        <Hero />
      </div>
      <div id="services">
        <Services />
      </div>
      <div id="aboutus">
        <Aboutus />
      </div>
      <div id="contactus">
        <ContactUs />
      </div>
      <Footer />
    </div>
  );
};

export default LandingPage;
