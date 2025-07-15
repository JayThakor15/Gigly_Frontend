import { useState } from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import ClientDashboard from "./pages/Dashboard/ClientDashboard";
import UserProfile from "./pages/UserProfile";
import FreelancerDashboard from "./pages/Dashboard/FreelancerDashboard";
import GigsCreation from "./pages/GigsCreation";
import RolebasedDashboard from "./pages/Dashboard/RolebasedDashboard";
import Sucesss from "./pages/Sucess";
import CancelPayment from "./pages/CancelPayment";
import PaymentProcessing from "./pages/PaymentProcessing";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard" element={<RolebasedDashboard />} />
          <Route path="/userprofile" element={<UserProfile />} />
          <Route path="/creategigs" element={<GigsCreation />} />
          <Route path="/clientdashboard" element={<ClientDashboard />} />
          <Route
            path="/freelancerdashboard"
            element={<FreelancerDashboard />}
          />
          <Route path="/success" element={<Sucesss />} />
          <Route path="/cancelpayment" element={<CancelPayment />} />
          <Route path="/paymentprocessing" element={<PaymentProcessing />} />
          {/* Add other routes as needed */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
