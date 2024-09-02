import React from "react";

const Hero = ({ type }) => {
  let data = { title: "", subtitle: "" };
  switch (type) {
    case "Contact":
      data = {
        title: type,
        subtitle: type,
      };
      break;
    case "About":
      data = {
        title: type,
        subtitle: type,
      };
      break;
    default:
      break;
  }
  return (
    <div className="container">
      <div>
        <img
          src="/images/about.jpg"
          alt=""
          style={{ height: "600px" }}
          className=" w-screen object-cover"
        />
        <div
          class="absolute inset-0 bg-black opacity-30 "
          style={{ height: "600px" }}
        ></div>
        <div className="absolute inset-0 mb-40 flex flex-col items-center justify-center text-center">
          <p className="text-white font-sans">Home &gt; {data.subtitle}</p>
          <h1 className="text-5xl font-bold font-serif text-white mt-4">
            {data.title}
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Hero;
