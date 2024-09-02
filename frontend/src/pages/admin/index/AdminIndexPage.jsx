import React from "react";
import Navbar from "../../../components/admin/Navbar/Navbar";
import Sidebar from "../../../components/admin/Sidebar/Sidebar";
import Widget from "../../../components/admin/Widgets/Widget";
import "./index.scss";
const AdminIndexPage = () => {
  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <div className="widgets">
          <Widget type="User" />
          <Widget type="Order" />
          <Widget type="Booking" />
          <Widget type="Earnings" />
        </div>
        <div className="charts"></div>
      </div>
    </div>
  );
};

export default AdminIndexPage;
