import React from 'react'
import { Button } from "@/components/ui/button";

const PersonalDetails = () => {
  return (
    <div>
      <div className="left w-1/4 bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center justify-center gap-6">
          <img
            src="https://img.freepik.com/premium-vector/vector-flat-illustration-grayscale-avatar-user-profile-person-icon-gender-neutral-silhouette-profile-picture-suitable-social-media-profiles-icons-screensavers-as-templatex9xa_719432-2210.jpg?semt=ais_hybrid&w=740"
            alt="Profile"
            className="w-48 h-48 rounded-full object-cover border-4 border-green-500 shadow-md"
          />
          <Button className="w-full text-white font-semibold py-2 px-4 rounded-lg transition-colors">
            Upload New Image
          </Button>
        </div>
    </div>
  )
}

export default PersonalDetails