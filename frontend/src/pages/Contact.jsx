import React from "react";

function Contact() {
  return (
    <div
      className="w-full min-h-[calc(100vh-70px)] 
      bg-gradient-to-l from-[#141414] to-[#0c2025] 
      flex items-center justify-center px-6 py-22 pt-20"
    >
      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
        
        {/* Left Side: Contact Info */}
        <div className="text-white space-y-6">
          <h2 className="text-4xl md:text-5xl font-bold">
            Get in <span className="text-teal-400">Touch</span>
          </h2>
          <p className="text-lg text-gray-300 leading-relaxed">
            Have questions or need help? We’re here to assist you. 
            Reach out to us through the form or use the details below.
          </p>

          <div className="space-y-4">
            <p className="text-gray-200">
              📍 <span className="font-semibold">Address:</span> 123 Fashion Street, New Delhi, India
            </p>
            <p className="text-gray-200">
              📞 <span className="font-semibold">Phone:</span> +91 98765 43210
            </p>
            <p className="text-gray-200">
              📧 <span className="font-semibold">Email:</span> support@estore.com
            </p>
          </div>

          {/* Social Links */}
          <div className="flex gap-4 mt-4">
            <a href="#" className="w-10 h-10 flex items-center justify-center rounded-full bg-teal-500 hover:bg-teal-600 transition">
              <i className="fab fa-facebook-f text-white"></i>
            </a>
            <a href="#" className="w-10 h-10 flex items-center justify-center rounded-full bg-teal-500 hover:bg-teal-600 transition">
              <i className="fab fa-twitter text-white"></i>
            </a>
            <a href="#" className="w-10 h-10 flex items-center justify-center rounded-full bg-teal-500 hover:bg-teal-600 transition">
              <i className="fab fa-instagram text-white"></i>
            </a>
          </div>
        </div>

        {/* Right Side: Contact Form */}
        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
          <form className="space-y-6">
            <div>
              <label className="block text-gray-700 font-medium">Name</label>
              <input
                type="text"
                placeholder="Enter your name"
                className="w-full mt-2 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium">Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full mt-2 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium">Message</label>
              <textarea
                rows="4"
                placeholder="Write your message..."
                className="w-full mt-2 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-teal-500 hover:bg-teal-600 rounded-lg text-white font-semibold transition duration-300 shadow-md"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Contact;
