import { useEffect, useState, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AiOutlinePlus } from "react-icons/ai";
import {
  BiHomeCircle,
  BiHash,
  BiNotification,
  BiBookmark,
} from "react-icons/bi";
import { MdOutlineAccountCircle } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";
import UserContext from "../context/UserContext";
import DesktopPostActiveContext from "../context/DesktopPostContext";
import notifLoading from "../helpers/notifLoading";
import notif from "../helpers/notif";
import trimData from "../helpers/trim";

const Appbar = () => {
  const { login, changeLogin } = useContext(UserContext);
  const { deskActive, changeDeskActive } = useContext(DesktopPostActiveContext);

  return (
    <div className="app-bar">
      {/* menu desktop large > 1280px */}
      <div className="menu hidden xl:flex">
        <ul>
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
            <NavLink to={`/${login.user.username}`}>
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
          <li onClick={() => changeDeskActive(true)}>
            <button className="btn btn-active btn-primary text-white btn-r">
              New Tickl
            </button>
          </li>
        </ul>
      </div>

      {/* menu desktop small < 1280px */}
      <div className="menu menu-mobile xl:hidden">
        <ul>
          <li className="active">
            <NavLink to="/home">
              <BiHomeCircle />
            </NavLink>
          </li>
          <li>
            <NavLink to="/explore">
              <BiHash />
            </NavLink>
          </li>
          <li>
            <NavLink to="/notification">
              <BiNotification />
            </NavLink>
          </li>
          <li>
            <NavLink to="/bookmark">
              <BiBookmark />
            </NavLink>
          </li>
          <li>
            <NavLink to={`/${login.user.username}`}>
              <MdOutlineAccountCircle />
            </NavLink>
          </li>
          <li>
            <NavLink to="/settings">
              <IoSettingsOutline />
            </NavLink>
          </li>
          <li>
            <button className="btn btn-active btn-primary text-white btn-r">
              <AiOutlinePlus className="text-xl" />
            </button>
          </li>
        </ul>
      </div>

      {/* bottom */}
      {login ? (
        <>
          <div className="dropdown dropdown-top dropdown-end w-full porfile-container">
            <button tabIndex={0} className="btn btn-r w-full profile">
              <img
                className="profile-img"
                src={`${login.user.profileicon.thumb}`}
                alt="profile icon"
              />
              <div className="hidden xl:flex gap-1 flex-col justify-start align-top text-start">
                <p>{login ? trimData(login.user.name, 10) : "null"}</p>
                <p style={{ fontSize: "13px", fontWeight: "400" }}>
                  @{login ? trimData(login.user.username, 10) : "null"}
                </p>
              </div>
              <div className="hidden xl:block threedots">...</div>
            </button>
            <ul
              tabIndex={0}
              className="dropdown-content menu p-2 shadow bg-neutral rounded-box xl:w-52"
            >
              <li className="w-full">
                <NavLink to={"/logout"}>logout</NavLink>
              </li>
            </ul>
          </div>
        </>
      ) : (
        <div className="profil">
          <MdOutlineAccountCircle />
          <p>{login ? login.user.username : "loading..."}</p>
        </div>
      )}
    </div>
  );
};

export default Appbar;
