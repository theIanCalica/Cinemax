import React from "react";
import Navbar from "../../../components/customer/Navbar/Navbar";
import Hero from "../../../components/customer/Hero/Hero";
import "./AboutPage.scss";
const AboutPage = () => {
  return (
    <div className="container">
      <Navbar />
      <Hero type="About" />

      <hr class="broken-hr"></hr>
      {/* Get to know section */}
      <div className="flex">
        <div>
          <img src="" alt="" />
        </div>
        <div className="flex flex-col">
          <h6>Get To Know</h6>
          <h1>Providing the Best Film Services</h1>
          <p>
            Discover exceptional cinematic experiences with our top-tier film
            services, crafted to bring stories to life and captivate audiences
            worldwide. Whether you're seeking unforgettable screenings,
            exclusive content, or expert recommendations, we’re here to make
            every moment extraordinary. Dive into the magic of film with us
            today.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
