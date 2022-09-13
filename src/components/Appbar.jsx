import React from "react";
import { NavLink } from "react-router-dom";
import {
  BiHomeCircle,
  BiHash,
  BiNotification,
  BiBookmark,
} from "react-icons/bi";
import { FaFeatherAlt } from "react-icons/fa";
import { MdOutlineAccountCircle } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";

const Appbar = () => {
  return (
    <div className="app-bar">
      <div className="menu">
        <ul>
          <div className="logo">
            <NavLink to="/home">
              <img src="/img/logo.png" alt="" />
            </NavLink>
          </div>

          <li className="active">
            <NavLink to="/home">
              <BiHomeCircle />
              <p>Home</p>
            </NavLink>
          </li>
          <li>
            <NavLink to="/explore">
              <BiHash />
              <p>Explore</p>
            </NavLink>
          </li>
          <li>
            <NavLink to="/notification">
              <BiNotification />
              <p>Notification</p>
            </NavLink>
          </li>
          <li>
            <NavLink to="/bookmark">
              <BiBookmark />
              <p>Bookmark</p>
            </NavLink>
          </li>
          <li>
            <NavLink to="/profil">
              <MdOutlineAccountCircle />
              <p>Profile</p>
            </NavLink>
          </li>
          <li>
            <NavLink to="/settings">
              <IoSettingsOutline />
              <p>Settings</p>
            </NavLink>
          </li>
          <li>
            <div className="new-post">
              <p>New Tickl</p>
            </div>
          </li>
        </ul>
      </div>

      <NavLink to="/profil">
        <div className="profil">
          <MdOutlineAccountCircle />
          <p>Tony</p>
        </div>
      </NavLink>
    </div>
  );
};

export default Appbar;
