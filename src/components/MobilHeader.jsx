import React, { useEffect, useContext } from "react";
import { NavLink } from "react-router-dom";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { AiOutlinePlus } from "react-icons/ai";
import { BiHomeCircle } from "react-icons/bi";
import { MdOutlineAccountCircle } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";
import { BiSearch } from "react-icons/bi";
import Sidemenu from "./Sidemenu";
import MenuActiveContext from "../context/MenuActive";
import UserContext from "../context/UserContext";

const MobilHeader = ({ title }) => {
  const { login, changeLogin } = useContext(UserContext);
  const { active } = useContext(MenuActiveContext);
  const { changeActive } = useContext(MenuActiveContext);

  // auto close sidemenu on header first mount
  useEffect(() => {
    changeActive(false);
  }, []);

  return (
    <>
      {/* white space for mobile */}
      <div className="p-5 block md:hidden"></div>

      <div className="mobil-header px-4 py-2">
        <div className="mobil-logo">
          <NavLink to={"/" + login.user.username}>
            {login && (
              <img src={`${login.user.profileicon.thumb}`} alt="profile icon" />
            )}
          </NavLink>
        </div>
        <div className="page-name">
          <h2>{title}</h2>
        </div>
        <div className="mobil-menu-icon" onClick={() => changeActive(true)}>
          <HiOutlineMenuAlt3 />
        </div>

        {active && <Sidemenu />}
      </div>

      {/* pot icon mobile */}
      <div className="newpostmobile">
        <NavLink to={"/new"}>
          <button className="btn btn-primary">
            <AiOutlinePlus />
          </button>
        </NavLink>
      </div>

      {/* bottom navigation bar */}

      <div className="bottom-nav">
        <ul>
          <li>
            <NavLink to={"/home"}>
              <BiHomeCircle />
            </NavLink>
          </li>
          <li>
            <NavLink to={"/explore"}>
              <BiSearch />
            </NavLink>
          </li>
          <li>
            <NavLink to={`/${login.user.username}`}>
              <MdOutlineAccountCircle />
            </NavLink>
          </li>
          <li>
            <NavLink to={"/settings"}>
              <IoSettingsOutline />
            </NavLink>
          </li>
        </ul>
      </div>
    </>
  );
};

export default MobilHeader;
