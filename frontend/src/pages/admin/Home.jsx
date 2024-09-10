import React, { useState } from "react";
import Widget from "../../components/admin/Widget";
import BarChart from "../../components/admin/Chart/BarChart";
import LineChart from "../../components/admin/Chart/LineChart";
import PieChart from "../../components/admin/Chart/PieChart";
import Map from "../../components/admin/Map";
import TopFoods from "../../components/admin/TopFoods";
import TopMovies from "../../components/admin/TopMovies";

const Home = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>
      <p className="mt-4">
        Welcome to the admin dashboard. Here you can manage all aspects of your
        application.
      </p>

      <div className="flex mt-5 justify-between items-center">
        <Widget type="User"></Widget>
        <Widget type="Order"></Widget>
        <Widget type="Booking"></Widget>
      </div>
      <div className="container mt-5 bg-white p-4 shadow-md rounded-lg ">
        <BarChart />

        <div className="flex justify-between items-center mt-4">
          {/* Left side: View More */}
          <div className="text-blue-500 cursor-pointer hover:underline">
            View More
          </div>

          {/* Right side: Download Report */}
          <button className="bg-transparent border border-green-500 text-green-500 px-4 py-2 rounded hover:bg-green-500 hover:text-white transition-colors duration-300">
            Download Report
          </button>
        </div>
      </div>

      <div className="flex gap-4 mt-5">
        <PieChart />

        <TopMovies />
      </div>

      <div className="container mt-5 bg-white p-4 shadow-md rounded-lg">
        <Map />
      </div>
    </div>
  );
};

export default Home;
