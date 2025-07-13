import React, { useContext } from "react";
import { AuthContext } from "../../context/authContext.jsx";
import ClientDashboard from "./ClientDashboard.jsx";
import FreelancerDashboard from "./FreelancerDashboard";

const RolebasedDashboard = () => {
  const { user } = useContext(AuthContext);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center text-center">
        <p className="text-lg text-red-500 font-semibold">
          You must be logged in to view this page.
        </p>
      </div>
    );
  }

  if (user.role === "freelancer") {
    return <FreelancerDashboard />;
  } else if (user.role === "client") {
    return <ClientDashboard />;
  } else {
    return (
      <div className="min-h-screen flex items-center justify-center text-center">
        <p className="text-lg text-red-500 font-semibold">
          Unknown role. Please contact support.
        </p>
      </div>
    );
  }
};

export default RolebasedDashboard;
