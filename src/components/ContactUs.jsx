import React, { useState } from "react";

const ContactUs = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend
    setSubmitted(true);
  };

  return (
    <div className="p-6">
    <div className="rounded-2xl relative w-full flex flex-col items-center overflow-hidden min-h-screen bg-gradient-to-b from-green-100 via-white to-white">
      <div className="w-full flex flex-col items-center z-10 mt-16">
        <h1 className="text-green-700 text-4xl md:text-6xl font-bold drop-shadow-lg text-center mb-4">
          Contact <span className="text-green-500">Us</span>
        </h1>
        <p className="text-gray-700 text-lg md:text-2xl text-center max-w-2xl mb-8 drop-shadow">
          Have questions or want to work with us? Fill out the form below and our
          team will get back to you soon.
        </p>
      </div>
      <div className="w-full flex flex-col items-center z-20">
        <div className="bg-white/90 rounded-xl shadow-lg p-8 w-full max-w-lg">
          {submitted ? (
            <div className="text-green-600 text-xl text-center font-semibold">
              Thank you for reaching out! We will get back to you soon.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={form.name}
                onChange={handleChange}
                required
                className="border border-green-300 text-gray-800 placeholder-gray-400 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
              />
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={form.email}
                onChange={handleChange}
                required
                className="border border-green-300 text-gray-800 placeholder-gray-400 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
              />
              <textarea
                name="message"
                placeholder="Your Message"
                value={form.message}
                onChange={handleChange}
                required
                rows={5}
                className="border border-green-300 text-gray-800 placeholder-gray-400 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400 resize-none"
              />
              <button
                type="submit"
                className="bg-green-500 text-white font-semibold rounded-lg py-2 hover:bg-green-600 transition"
              >
                Send Message
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
    </div>
  );
};

export default ContactUs;