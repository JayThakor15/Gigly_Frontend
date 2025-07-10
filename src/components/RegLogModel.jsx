import React, { useState } from "react";
import Register from "../pages/Register";
import Login from "../pages/Login";

const RegLogModel = () => {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <dialog id="my_modal_5" className="modal">
      <div className="modal-box w-11/12 max-w-4xl p-0 overflow-hidden rounded-2xl flex shadow-2xl relative">
        {/* X Close Button */}
        <button
          type="button"
          className="absolute right-6 top-6 text-2xl text-gray-500 hover:text-green-500 z-20"
          aria-label="Close"
          onClick={() => document.getElementById("my_modal_5").close()}
        >
          &times;
        </button>
        {/* Left Side */}
        <div className="w-1/2 bg-[#a03d4f] relative flex flex-col justify-center items-start px-10 py-12">
          <img
            src="/login_reg_background.jpg"
            alt=""
            className="absolute top-0 left-0 w-full h-full object-cover opacity-60"
            style={{ zIndex: 1 }}
          />
          <div className="relative z-10 text-white">
            <h1 className="text-4xl font-extrabold mb-6">Success starts here</h1>
            <ul className="space-y-4 text-lg font-medium">
              <li className="flex items-start gap-2">
                <span className="text-2xl">✓</span>
                Over 50+ categories
              </li>
              <li className="flex items-start gap-2">
                <span className="text-2xl">✓</span>
                Quality work done faster
              </li>
              <li className="flex items-start gap-2">
                <span className="text-2xl">✓</span>
                Access to talent and businesses across the globe
              </li>
            </ul>
          </div>
        </div>
        {/* Right Side */}
        <div className="w-1/2 flex items-center justify-center bg-white py-12 px-8">
          <div className="w-full max-w-md">
            {showLogin ? (
              <>
                <Login />
                <p className="text-center text-sm mt-4 text-gray-700">
                  Don't have an account?{' '}
                  <button
                    className="text-green-600 hover:underline"
                    onClick={() => setShowLogin(false)}
                  >
                    Create new account
                  </button>
                </p>
              </>
            ) : (
              <>
                <Register />
                <p className="text-center text-sm mt-4 text-gray-700">
                  Already have an account?{" "}
                  <button
                    className="text-green-600 hover:underline"
                    onClick={() => setShowLogin(true)}
                  >
                    Login
                  </button>
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </dialog>
  );
};

export default RegLogModel;
