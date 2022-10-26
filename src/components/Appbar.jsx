import { useEffect, useState, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  BiHomeCircle,
  BiHash,
  BiNotification,
  BiBookmark,
} from "react-icons/bi";
import { MdOutlineAccountCircle } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";
import UserContext from "../context/UserContext";
import notifLoading from "../helpers/notifLoading";
import notif from "../helpers/notif";

const Appbar = ({ user, update }) => {
  const { login, changeLogin } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = async (e) => {
    e.preventDefault();
    notifLoading("processing", "logout");

    if (login) {
      try {
        let headers = new Headers();
        headers.append("Content-Type", "application/json");
        headers.append("Accept", "application/json");
        headers.append("GET", "POST", "OPTIONS");
        headers.append(
          "Access-Control-Allow-Origin",
          `${process.env.REACT_APP_DOMAIN}`
        );
        headers.append("Access-Control-Allow-Credentials", "true");

        const response = await fetch(
          `${process.env.REACT_APP_DOMAIN}/twitter/api/user/logout`,
          {
            mode: "cors",
            method: "GET",
            headers: headers,
            credentials: "include",
          }
        );

        const serverMessage = await response.json();
        notifLoading("", "logout");
        notif(serverMessage.message);

        if (serverMessage.code === "ok") {
          navigate("/");
        }
      } catch (err) {
        notif("server error try again later");
        console.log(err);
        notifLoading("", "logout");
      }
    } else {
      notifLoading("", "logout");
      return notif("Verify your fields");
    }
  };

  return (
    <div className="app-bar">
      <div className="menu">
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
            <NavLink to="/profile">
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
            <button className="btn btn-active btn-primary text-white btn-r">
              New Tickl
            </button>
          </li>
        </ul>
      </div>

      {login ? (
        <>
          <div className="dropdown dropdown-top dropdown-end w-full porfile-container">
            <button tabIndex={0} className="btn  btn-r w-full profile">
              <img
                className="profile-img"
                src={`${login.user.profileicon.thumb}`}
                alt="profile icon"
              />
              <div className="flex gap-1 flex-col justify-start align-top text-start">
                <p>{login ? login.user.name : "null"}</p>
                <p style={{ fontSize: "13px", fontWeight: "400" }}>
                  @{login ? login.user.username : "null"}
                </p>
              </div>
              <div className="threedots">...</div>
            </button>
            <ul
              tabIndex={0}
              className="dropdown-content menu p-2 shadow bg-neutral rounded-box w-52"
            >
              <li onClick={handleLogout} className="w-full">
                <a>logout</a>
              </li>
            </ul>
          </div>
        </>
      ) : (
        <div className="profil">
          <MdOutlineAccountCircle />
          <p>{login ? login.user.username : "null"}</p>
        </div>
      )}
    </div>
  );
};

export default Appbar;
