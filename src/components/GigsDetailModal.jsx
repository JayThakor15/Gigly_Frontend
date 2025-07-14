import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import React from "react";
import API from "../utils/api";

const GigsDetailModal = ({ open, onClose, gig }) => {
  if (!gig) {
    return null;
  }

  const avatarUrl =
    gig?.freelancerId?.avatar ||
    "https://img.freepik.com/premium-vector/vector-flat-illustration-grayscale-avatar-user-profile-person-icon-gender-neutral-silhouette-profile-picture-suitable-social-media-profiles-icons-screensavers-as-templatex9xa_719432-2210.jpg?semt=ais_hybrid&w=740";

  const username = gig?.userId?.username || "Unknown User";

  const handleHireNow = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));

      const res = await API.post("/checkout/create-checkout-session", {
        gig: gig,
        userId: user.id,
        price: gig.price,
        gigImg:
          gig.thumbnail || "https://via.placeholder.com/400x240?text=No+Image",
      });
      window.location.href = res.data.url; // Redirect to Stripe Checkout
    } catch (error) {
      console.error("Error creating checkout session:", error);
      alert("Failed to create checkout session. Please try again later.");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl p-6">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">{gig.title}</DialogTitle>
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
              >
                Chat
              </Button>
            </div>
          </div>
        </div>

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
