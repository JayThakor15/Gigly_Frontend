import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogDescription, // Added for accessibility
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input"; // Assuming you have an Input component
import { Textarea } from "@/components/ui/textarea"; // Assuming you have a Textarea component
import React, { useEffect, useState } from "react";
import API from "../utils/api";
import { toast } from "react-hot-toast"; // Assuming you have a toast notification library like react-hot-toast

// Helper component for star input (reusable for review form)
const StarInput = ({ value, onChange }) => {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((starValue) => (
        <svg
          key={starValue}
          onClick={() => onChange(starValue)}
          className={`w-6 h-6 cursor-pointer transition-colors duration-200
            ${starValue <= value ? "text-yellow-400" : "text-gray-300"}
            hover:text-yellow-500`}
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            fillRule="evenodd"
            d="M10.788 3.212a.75.75 0 011.424 0l4.272 8.283a.75.75 0 01-.596 1.077l-4.702.68a.75.75 0 00-.547.39l-2.067 4.192a.75.75 0 01-1.342-.66L8.85 11.66l-4.702-.68a.75.75 0 01-.596-1.077l4.272-8.283z"
            clipRule="evenodd"
          />
        </svg>
      ))}
    </div>
  );
};

const GigsDetailModal = ({ open, onClose, gig }) => {
  const [reviews, setReviews] = useState([]);
  const [averageRating, setAverageRating] = useState(null);
  const [showReviewForm, setShowReviewForm] = useState(false);

  const [clientRating, setClientRating] = useState(0);
  const [clientFeedback, setClientFeedback] = useState("");

  // Function to fetch reviews (can be called after submitting a new review)
  const fetchReviews = async () => {
    if (!gig?._id) return;
    try {
      const res = await API.get(`/orders/gig/${gig._id}/reviews`);
      setReviews(res.data.reviews || []);
      setAverageRating(res.data.averageRating || null);
    } catch (error) {
      console.error("Error fetching reviews:", error);
      setReviews([]);
      setAverageRating(null);
      toast.error("Failed to load reviews.");
    }
  };

  // Chat Open Function - FIXED
  const handleChatOpen = () => {
    if (window.startGlobalChat && gig?.userId?._id) {
      // Use the correct freelancer data
      const freelancerId = gig.userId._id;
      const freelancerUsername =
        gig.freelancerId.username ||
        gig.userId?.username ||
        "Unknown Freelancer";
      const freelancerAvatar =
        gig.freelancerId.avatar ||
        "https://img.freepik.com/premium-vector/vector-flat-illustration-grayscale-avatar-user-profile-person-icon-gender-neutral-silhouette-profile-picture-suitable-social-media-profiles-icons-screensavers-as-templatex9xa_719432-2210.jpg?semt=ais_hybrid&w=740";

      console.log("Starting chat with:", {
        freelancerId,
        freelancerUsername,
        freelancerAvatar,
      });

      window.startGlobalChat(
        freelancerId,
        freelancerUsername,
        freelancerAvatar
      );
    } else {
      console.error("Chat function not available or missing gig data");
      toast.error("Failed to start chat.");
    }
  };

  useEffect(() => {
    fetchReviews();
    // Reset review form states when gig changes or modal opens/closes
    setShowReviewForm(false);
    setClientRating(0);
    setClientFeedback("");
  }, [gig, open]); // Added 'open' to dependency array to reset when modal opens/closes

  if (!gig) {
    return null;
  }
  console.log("Gig data:", gig);

  const avatarUrl =
    gig?.freelancerId?.avatar ||
    "https://img.freepik.com/premium-vector/vector-flat-illustration-grayscale-avatar-user-profile-person-icon-gender-neutral-silhouette-profile-picture-suitable-social-media-profiles-icons-screensavers-as-templatex9xa_719432-2210.jpg?semt=ais_hybrid&w=740";

  // Ensure you're getting the freelancer's username from freelancerId
  const username =
    gig?.freelancerId?.username ||
    gig?.userId?.username ||
    "Unknown Freelancer";

  const handleHireNow = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user || !user.id) {
        toast.error("Please log in to hire a freelancer.");
        // Optionally redirect to login page
        return;
      }

      localStorage.setItem("gigId", gig._id);
      localStorage.setItem("freelancerId", gig.freelancerId._id);
      localStorage.setItem("price", gig.price);
      localStorage.setItem("gigTitle", gig.title);
      localStorage.setItem("freelancerName", username);

      const res = await API.post("/checkout/create-checkout-session", {
        gig: gig,
        userId: user.id, // Make sure this is the buyer's ID
        price: gig.price,
        gigImg:
          gig.thumbnail || "https://via.placeholder.com/400x240?text=No+Image",
      });
      window.location.href = res.data.url; // Redirect to Stripe Checkout
    } catch (error) {
      console.error("Error creating checkout session:", error);
      toast.error("Failed to create checkout session. Please try again later.");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl p-6 overflow-y-auto max-h-[90vh]">
        {" "}
        {/* Added overflow-y-auto and max-h */}
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">{gig.title}</DialogTitle>
          <DialogDescription className="text-gray-600">
            Details about the gig and reviews from clients.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col md:flex-row gap-6">
          {/* Left Side - Image */}
          <div className="flex-1">
            <img
              src={
                gig.thumbnail ||
                "https://via.placeholder.com/400x240?text=No+Image"
              }
              alt={gig.title}
              className="w-full h-64 object-cover rounded-lg shadow"
            />
          </div>

          {/* Right Side - Details */}
          <div className="flex-1 flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <img
                src={avatarUrl}
                alt={username}
                className="w-12 h-12 rounded-full object-cover border shadow"
              />
              <div>
                <p className="font-semibold text-lg">{username}</p>
                <p className="text-gray-500 text-sm">Freelancer</p>
              </div>
            </div>

            <p className="text-gray-700">{gig.description}</p>

            <div className="flex gap-3 items-center">
              <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                {gig.category || "Uncategorized"}
              </span>
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                ${gig.price}
              </span>
            </div>

            {/* Rating and total reviews */}
            <div className="flex items-center gap-2 mt-2">
              <StarInput
                value={Math.round(averageRating || 0)}
                onChange={() => {}}
              />{" "}
              {/* Display only */}
              <span className="ml-2 text-sm text-gray-700 font-semibold">
                {averageRating ? averageRating.toFixed(1) : "No rating"}
              </span>
              <span className="ml-2 text-xs text-gray-500">
                ({reviews.length} reviews)
              </span>
            </div>

            <div className="flex gap-4 mt-4">
              <Button
                onClick={handleHireNow}
                className="flex-1 bg-green-500 hover:bg-green-600 text-white"
              >
                Hire Now
              </Button>
              <Button
                variant="outline"
                className="flex-1 border-green-500 text-green-600 hover:bg-green-50"
                onClick={handleChatOpen}
              >
                Chat
              </Button>
            </div>
          </div>
        </div>
        {reviews.length === 0 ? (
          <p className="text-gray-500">No reviews yet.</p>
        ) : (
          <div className="space-y-4">
            {reviews.map((review, idx) => (
              <div
                key={idx}
                className="bg-gray-50 rounded-lg p-3 border border-gray-100 shadow-sm"
              >
                <div className="flex items-center gap-2 mb-1">
                  <img
                    src={
                      review.userId?.avatar ||
                      `https://ui-avatars.com/api/?name=${encodeURIComponent(
                        review.userId?.username || "Client"
                      )}&background=random`
                    }
                    alt={review.userId?.username || "Client"}
                    className="w-8 h-8 rounded-full object-cover border"
                  />
                  <span className="font-semibold text-gray-800 text-sm">
                    {review.userId?.username || "Client"}
                  </span>
                  <div className="flex items-center gap-0.5 ml-auto">
                    {" "}
                    {/* Added ml-auto to push rating to the right */}
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        width="14"
                        height="14"
                        fill={i < review.clientRating ? "#facc15" : "#e5e7eb"}
                        viewBox="0 0 24 24"
                      >
                        <polygon points="12,2 15,9 22,9 17,14 18,21 12,17 6,21 7,14 2,9 9,9" />
                      </svg>
                    ))}
                    <span className="ml-1 text-xs text-gray-600">
                      {review.clientRating}/5
                    </span>
                  </div>
                </div>
                <div className="text-gray-700 italic text-sm">
                  "{review.clientFeedback}"
                </div>
              </div>
            ))}
          </div>
        )}
        <DialogFooter className="mt-6">
          <DialogClose asChild>
            <Button variant="secondary">Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default GigsDetailModal;
