import React from "react";
import "./Sidebar.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
import MovieCreationOutlinedIcon from "@mui/icons-material/MovieCreationOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import EmailIcon from "@mui/icons-material/Email";
import ForumIcon from "@mui/icons-material/Forum";
import Tooltip from "@mui/material/Tooltip";
import Zoom from "@mui/material/Zoom";
import SettingsIcon from "@mui/icons-material/Settings";
import LocalActivityIcon from "@mui/icons-material/LocalActivity";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import DescriptionIcon from "@mui/icons-material/Description";
import ArticleIcon from "@mui/icons-material/Article";
import NotesIcon from "@mui/icons-material/Notes";
const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="top">
        <span className="logo">Cinemax</span>
      </div>
      <hr />
      <div className="center">
        <ul>
          <p className="title">MAIN</p>
          <li>
            <DashboardIcon className="icon" />
            <span>Dashboard</span>
          </li>

          <li>
            <GroupOutlinedIcon className="icon" />
            <span>Users</span>
          </li>

          <p className="title">SERVICES</p>
          <li>
            <MovieCreationOutlinedIcon className="icon" />
            <span>Movies</span>
          </li>
          <li>
            <LocalActivityIcon className="icon" />
            <span>Bookings</span>
          </li>
          <li>
            <FastfoodIcon className="icon" />
            <span>Foods</span>
          </li>
          <li>
            <CreditCardIcon className="icon" />
            <span>Orders</span>
          </li>

          <p className="title">OTHERS</p>
          <li>
            <ArticleIcon className="icon" />
            <span>Articles</span>
          </li>
          <li>
            <DescriptionIcon className="icon" />
            <span>Reports</span>
          </li>
          <li>
            <NotesIcon className="icon" />
            <span>Logs</span>
          </li>

          <p className="title">USER</p>
          <li>
            <AccountCircleIcon className="icon" />
            <span>Profile</span>
          </li>
          <li>
            <EmailIcon className="icon" />
            <span>Email</span>
          </li>
          <li>
            <ForumIcon className="icon" />
            <span>Message</span>
          </li>
          <li>
            <LogoutIcon className="icon" />
            <span>Logout</span>
          </li>
        </ul>
      </div>
      <div className="bottom">
        <Tooltip title="Settings" TransitionComponent={Zoom} arrow>
          <div className="settings">
            <SettingsIcon />
          </div>
        </Tooltip>

        <Tooltip title="Language" TransitionComponent={Zoom} arrow>
          <div className="language">
            <img src="" alt="" />
          </div>
        </Tooltip>
      </div>
    </div>
  );
};

export default Sidebar;
