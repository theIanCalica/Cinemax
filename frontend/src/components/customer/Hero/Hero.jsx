import React from "react";
import PropTypes from "prop-types";

const Hero = ({ type }) => {
  // Define data for each type
  const types = {
    Contact: {
      title: "Get in Touch",
      subtitle: "Contact Us",
      image: "/images/about.jpg",
    },
    About: {
      title: "Learn About Us",
      subtitle: "About",
      image: "/images/about.jpg",
    },
    FoodCategories: {
      title: "Food Categories",
      subtitle: "Food Categories",
      image: "/images/food.png",
    },
    Foods: {
      title: "Foods",
      subtitle: "Foods",
      image: "/images/food.png",
    },
    Cart: {
      title: "My Cart",
      subtitle: "Cart",
      image: "/images/food.png",
    },
    Order: {
      title: "My Order",
      subtitle: "Order",
      image: "/images/food.png",
    },
    Movie: {
      title: "Movies now playing",
      subtitle: "Movies",
      image:
        "https://img.freepik.com/free-vector/film-strp-3d-background-with-roll-projector_1017-36680.jpg",
    },
    Book: {
      title: "Book a ticket",
      subtitle: "Booking",
      image:
        "https://img.freepik.com/free-vector/film-strp-3d-background-with-roll-projector_1017-36680.jpg",
    },
  };

  // Fallback for invalid or missing type
  const defaultData = {
    title: "Welcome",
    subtitle: "Home",
    image: "/images/default.jpg",
  };

  // Resolve data for the given type
  const data = types[type] || defaultData;

  return (
    <div className="relative">
      {/* Background Image */}
      <div className="relative w-full h-[600px]">
        <img
          src={data.image}
          alt={data.subtitle}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black opacity-50"></div>
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-30"></div>
      {/* Text Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center space-y-4">
        <p className="text-white font-sans">
          Home &gt; <span className="font-semibold">{data.subtitle}</span>
        </p>
        <h1 className="text-5xl font-bold font-serif text-white">
          {data.title}
        </h1>
      </div>
    </div>
  );
};

// Prop validation
Hero.propTypes = {
  type: PropTypes.string,
};

export default Hero;
