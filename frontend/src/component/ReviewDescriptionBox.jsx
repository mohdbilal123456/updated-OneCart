import React, { useState } from 'react'

function ReviewDescriptionBox() {

  const [activeTab, setActiveTab] = useState("description");
  

  return (
      <>
      <div className='w-full pt-16' >
      <div className="w-[90%]  max-w-4xl mx-auto px-4 py-6">
      {/* Tabs */}
      <div className="flex flex-wrap border-b border-gray-500">
        <button
          onClick={() => setActiveTab("description")}
          className={`px-4 py-2 text-sm cursor-pointer md:text-base font-medium border ${
            activeTab === "description"
              ? "border-gray-400 border-b-0 bg-[#141c1f] text-white"
              : "border-transparent text-gray-300 hover:text-white"
          }`}
        >
          Description
        </button>
        <button
          onClick={() => setActiveTab("reviews")}
          className={`px-4 py-2 text-sm cursor-pointer md:text-base font-medium border ${
            activeTab === "reviews"
              ? "border-gray-400 border-b-0 bg-[#141c1f] text-white"
              : "border-transparent text-gray-300 hover:text-white"
          }`}
        >
          Reviews (124)
        </button>
      </div>

      {/* Content Box */}
      <div className="border border-gray-400 p-4 md:p-6 bg-gradient-to-r from-[#141c1f] to-[#1c2b30] text-gray-200">
        {activeTab === "description" && (
          <p className="leading-relaxed text-sm md:text-base">
            Upgrade your wardrobe with this stylish slim-fit cotton shirt,
            available now on <span className="font-semibold">OneCart</span>.
            Crafted from breathable, high-quality fabric, it offers all-day
            comfort and effortless style. Easy to maintain and perfect for any
            setting, this shirt is a must-have essential for those who value
            both fashion and function.
          </p>
        )}
        {activeTab === "reviews" && (
          <p className="leading-relaxed text-sm md:text-base">
            ⭐⭐⭐⭐☆ (4.5/5) — 124 Customer Reviews
          </p>
        )}
      </div>
    </div>
    </div>
    </>
  )
}

export default ReviewDescriptionBox
