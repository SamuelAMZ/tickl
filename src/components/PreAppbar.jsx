import { useEffect, useState, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { BiHomeCircle, BiHash } from "react-icons/bi";

const Appbar = () => {
  return (
    <>
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
              <NavLink to="/login">
                <BiHash />
                <p>Login</p>
              </NavLink>
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
              <NavLink to="/login">
                <BiHash />
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Appbar;
