import React from "react";
import { NavLink } from "react-router-dom";
import { BiSearch } from "react-icons/bi";

const Header = ({ title }) => {
  return (
    <div className="header home md:max-w-7xl xl:max-w-screen-xl mx-auto md:px-10 xl:px-5">
      <NavLink to={"/home"}>
        <div className="logo">
          <img src="./img/logo.png" alt="logo" />
        </div>
      </NavLink>
      <div className="title">{title}</div>
      <div className="search-header">
        <div className="form-wrapper bg-neutral">
          <BiSearch className="icon" />
          <form>
            <input
              type="text"
              placeholder="Type here"
              className="input input-md w-full max-w-xs"
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Header;
