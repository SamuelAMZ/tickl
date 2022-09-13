import React, { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import {
  BiHomeCircle,
  BiHash,
  BiNotification,
  BiBookmark,
} from "react-icons/bi";
import { FaFeatherAlt } from "react-icons/fa";
import { MdOutlineAccountCircle } from "react-icons/md";
import { IoSettingsOutline, IoClose } from "react-icons/io5";
import MenuActiveContext from "../context/MenuActive";

const Sidemenu = () => {
  const { changeActive } = useContext(MenuActiveContext);

  return (
    <div className="side-menu">
      <div className="close-menu" onClick={() => changeActive(false)}>
        <IoClose />
      </div>
      <div className="wrapper">
        <ul>
          <li className="active" onClick={() => changeActive(false)}>
            <NavLink to="/home">
              <BiHomeCircle />
              <p>Home</p>
            </NavLink>
          </li>
          <li>
            <NavLink to="/explore" onClick={() => changeActive(false)}>
              <BiHash />
              <p>Explore</p>
            </NavLink>
          </li>
          <li>
            <NavLink to="/notification" onClick={() => changeActive(false)}>
              <BiNotification />
              <p>Notification</p>
            </NavLink>
          </li>
          <li>
            <NavLink to="/bookmark" onClick={() => changeActive(false)}>
              <BiBookmark />
              <p>Bookmark</p>
            </NavLink>
          </li>
          <li>
            <NavLink to="/profil" onClick={() => changeActive(false)}>
              <MdOutlineAccountCircle />
              <p>Profile</p>
            </NavLink>
          </li>
          {/* <li>
            <NavLink to="/settings" onClick={() => changeActive(false)}>
              <IoSettingsOutline />
              <p>Settings</p>
            </NavLink>
          </li> */}
          {/* <li>
          <div className="new-post">
            <p>New Tickl</p>
          </div>
        </li> */}
        </ul>
      </div>
    </div>
  );
};

export default Sidemenu;
