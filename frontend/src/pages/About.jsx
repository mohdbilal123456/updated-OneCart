import React from "react";
import about from "../assets/about.jpg";

function About() {
  return (
    <div
      className="w-full min-h-[calc(100vh-70px)] 
      bg-gradient-to-l from-[#141414] to-[#0c2025] 
      flex items-center justify-center px-6 pb-22 pt-20"
    >
      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        
      
        <div className="flex justify-center">
          <img
            src={about}
            alt="About Us"
            className="rounded-2xl shadow-lg w-[90%] md:w-full object-cover"
          />
        </div>

       
        <div className="text-white space-y-6">
          <h2 className="text-4xl md:text-5xl font-bold">
            About <span className="text-teal-400">Us</span>
          </h2>
          <p className="text-lg leading-relaxed text-gray-200">
            Welcome to our store! We are passionate about delivering the best 
            quality products that combine style and comfort. Our mission is 
            to create a seamless shopping experience where you can find 
            everything you need in one place.
          </p>
          <p className="text-lg leading-relaxed text-gray-300">
            From trendy collections to timeless classics, we bring you items 
            that reflect personality and uniqueness. Customer satisfaction is 
            our top priority, and we believe in building trust through quality 
            and service.
          </p>
          <button className="px-6 py-3 bg-teal-500 hover:bg-teal-600 rounded-xl text-white font-semibold transition duration-300 shadow-md">
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
}

export default About;
