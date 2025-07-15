import React, { useEffect } from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Aboutus from '../components/Aboutus'
import Services from '../components/services'
import ContactUs from '../components/ContactUs'
import Footer from '../components/Footer'
import RegLogModel from '../components/RegLogModel'


const LandingPage = () => {

  return (
    <div className="h-screen">
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
