import React, { useContext, useEffect } from "react";
import { AuthContext } from "../../context/authContext.jsx";
import { useNavigate } from "react-router-dom";

const RolebasedDashboard = () => {
  const { user, loading } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-center">
        <p className="text-lg text-gray-500 font-semibold">Loading...</p>
      </div>
    );
  }

  // Optionally, you can show nothing since useEffect will navigate
  return null;
};

export default RolebasedDashboard;
