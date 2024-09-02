import React from "react";
import StadiumIcon from "@mui/icons-material/Stadium";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import TheatersIcon from "@mui/icons-material/Theaters";
import "./Widget.scss";
import filmstripImage from "../../../assets/images/filmstrip.png";

const Widgets = ({ type }) => {
  let data;
  switch (type) {
    case "Festival":
      data = {
        title: "Upcoming Film Festivals",
        subtitle: "Join Now",
        icon: (
          <StadiumIcon
            classname="icon"
            style={{
              color: "white",
            }}
          />
        ),
      };
      break;
    case "filmAward":
      data = {
        title: "Award Winning Films",
        subtitle: "Watch Now",
        icon: (
          <EmojiEventsIcon
            classname="icon"
            style={{
              color: "white",
            }}
          />
        ),
      };
      break;
    case "unmissable":
      data = {
        title: "Unmissable Movies",
        subtitle: "Get Ticket",
        icon: (
          <TheatersIcon
            className="icon"
            style={{
              color: "white",
            }}
          />
        ),
      };
      break;
    default:
      break;
  }
  return (
    <div className="widget mx-2 flex justify-center items-center  relative bg-black h-48 w-full">
      <img
        src={filmstripImage}
        className="absolute inset-0 m-auto object-cover w-1/2 h-1/2 z-0 opacity-15"
        alt="Filmstrip"
      />
      <div className="text-white flex justify-between flex-row gap-16 p-8">
        <div className="left">
          <p className="text-sm text-gray-500 font-serif ">{data.subtitle}</p>
          <h1 className="text-4xl font-bold font-mono">{data.title}</h1>
        </div>
        <div className="bg-themeYellow icon  flex items-center justify-center">
          {data.icon}
        </div>
      </div>
    </div>
  );
};

export default Widgets;
