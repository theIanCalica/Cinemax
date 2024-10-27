import React from "react";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import PinterestIcon from "@mui/icons-material/Pinterest";
import XIcon from "@mui/icons-material/X";
import "./Footer.scss";
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer bg-black mt-5">
      {/* Top Section: Header with Icons */}
      <div className="flex flex-col md:flex-row justify-between items-center px-5 md:px-20 lg:px-28 py-6">
        <h1 className="text-white text-3xl md:text-5xl mb-4 md:mb-0 text-center md:text-left">
          Cinemax
        </h1>
        <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4">
          <h1 className="text-white text-center md:text-left">
            <span>Help</span> / <span>Privacy Policy</span>
          </h1>
          <div className="flex space-x-4">
            <div className="icon p-3 rounded-full">
              <FacebookIcon className="text-white" />
            </div>
            <div className="icon p-3 rounded-full">
              <InstagramIcon className="text-white" />
            </div>
            <div className="icon p-3 rounded-full">
              <PinterestIcon className="text-white" />
            </div>
            <div className="icon p-3 rounded-full">
              <XIcon className="text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-700 mt-4 w-3/4 mx-auto"></div>

      {/* Main Content Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 p-6 md:px-20 lg:px-28">
        {/* Left Section: Ticket Purchase */}
        <div className="text-white text-center md:text-left">
          <h5 className="text-m font-semibold tracking-wide leading-tight font-sans">
            Buy movie tickets easily with the Cinemax system nationwide
          </h5>
          <button className="bg-themeYellow text-white mt-4 px-4 py-2 hover:bg-white hover:text-themeYellow rounded">
            Get Your Ticket
          </button>
        </div>

        {/* Center Section: Movie Links */}
        <div className="text-white text-center md:text-left">
          <div className="text-themeYellow font-bold relative inline-block mb-4">
            Movies
            <div className="border-b-2 border-r-2 border-orange-500 w-4 h-2 absolute bottom-0 left-11 translate-x-2 translate-y-1"></div>
          </div>
          <ul className="space-y-2 mt-5 text-gray-500">
            <li className="relative hover:text-orange-500 transition-all duration-700">
              <span className="hover-underline">Action</span>
            </li>
            <li className="relative hover:text-orange-500 transition-all duration-700">
              <span className="hover-underline">Adventure</span>
            </li>
            <li className="relative hover:text-orange-500 transition-all duration-700">
              <span className="hover-underline">Animation</span>
            </li>
            <li className="relative hover:text-orange-500 transition-all duration-700">
              <span className="hover-underline">Comedy</span>
            </li>
            <li className="relative hover:text-orange-500 transition-all duration-700">
              <span className="hover-underline">Crime</span>
            </li>
          </ul>
        </div>

        {/* Right Section: Links */}
        <div className="text-white text-center md:text-left">
          <div className="text-themeYellow font-bold relative inline-block mb-4">
            Links
            <div className="border-b-2 border-r-2 border-orange-500 w-4 h-2 absolute bottom-0 left-8 translate-x-2 translate-y-1"></div>
          </div>
          <ul className="space-y-2 mt-5 text-gray-500">
            <li className="relative hover:text-orange-500 transition-all duration-700">
              <span className="hover-underline">About</span>
            </li>
            <li className="relative hover:text-orange-500 transition-all duration-700">
              <span className="hover-underline">My Account</span>
            </li>
            <li className="relative hover:text-orange-500 transition-all duration-700">
              <span className="hover-underline">News</span>
            </li>
            <li className="relative hover:text-orange-500 transition-all duration-700">
              <span className="hover-underline">Latest Events</span>
            </li>
            <li className="relative hover:text-orange-500 transition-all duration-700">
              <span className="hover-underline">Contact</span>
            </li>
          </ul>
        </div>

        {/* Newsletter Subscription */}
        <div className="text-white text-center md:text-left">
          <h1 className="text-themeYellow text-xl font-bold mb-2">
            Newsletter
          </h1>
          <p className="mb-2">
            Subscribe to Leitmotif newsletter this very day.
          </p>
          <form className="flex flex-col items-center md:items-start space-y-2">
            <div className="flex items-center bg-gray-800 rounded w-full md:w-auto">
              <input
                type="email"
                placeholder="Email Address"
                className="p-2 w-full rounded-l bg-gray-800 text-white placeholder-gray-400 focus:outline-none"
              />
              <button
                type="submit"
                className="p-3 bg-orange-500 text-white rounded-r"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </button>
            </div>
            <div className="flex items-center text-center md:text-left">
              <input type="radio" className="mr-2" />
              <span className="text-gray-500">
                I agree to all terms and policies of the company
              </span>
            </div>
          </form>
        </div>
      </div>
      <div
        className="py-2"
        style={{
          backgroundColor: "#131313",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <p className="text-gray-500 text-center mt-4">
          &copy; {new Date().getFullYear()} Cinemax. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
