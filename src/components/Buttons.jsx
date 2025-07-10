import React from 'react'

const Buttons = ({ buttonText }) => {
  return (
    <div className="p-2">
      <button className="btn btn-neutral btn-outline border-green-500 text-white flex items-center gap-2">
        {buttonText}
        <span className="text-lg">&#8594;</span>
      </button>
    </div>
  )
}

export default Buttons