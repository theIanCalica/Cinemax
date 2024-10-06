import React from "react";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import PinterestIcon from "@mui/icons-material/Pinterest";
import XIcon from "@mui/icons-material/X";
import "./Footer.scss";
const Footer = () => {
  return (
    <div className="footer bg-black mt-5">
      <div className="flex justify-between items-center px-auto py-5">
        <h1 className="text-white text-5xl">Cinemax</h1>
        <div className="flex space-x-4 items-center">
          <h1 className="text-white">
            <span>Help</span> / <span>Privacy Policy</span>
          </h1>
          <div className="flex space-x-4">
            {/* Facebook Icon with circle */}
            <div className="bg-slate-600 p-3 rounded-full">
              <FacebookIcon className="text-white" />
            </div>
            {/* Instagram Icon with circle */}
            <div className="bg-slate-600 p-3 rounded-full">
              <InstagramIcon className="text-white" />
            </div>
            {/* Pinterest Icon with circle */}
            <div className="icon p-3 rounded-full">
              <PinterestIcon className="text-white" />
            </div>
            {/* X (Twitter) Icon with circle */}
            <div className="icon p-3 rounded-full">
              <XIcon className="text-white" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
