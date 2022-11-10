import React, { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import {
  BiHomeCircle,
  BiHash,
  BiNotification,
  BiBookmark,
} from "react-icons/bi";
import { MdOutlineAccountCircle } from "react-icons/md";
import { IoSettingsOutline, IoClose } from "react-icons/io5";
import MenuActiveContext from "../context/MenuActive";
import UserContext from "../context/UserContext";

const Sidemenu = () => {
  const { login, changeLogin } = useContext(UserContext);
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
            <NavLink
              to={`/${login.user.username}`}
              onClick={() => changeActive(false)}
            >
              <MdOutlineAccountCircle />
              <p>Profile</p>
            </NavLink>
          </li>

          <li className="btn logout">
            <NavLink to={"/logout"}>
              <p>Logout</p>
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidemenu;
