import React, { useState, useContext } from "react";
import { NavLink } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import Sidemenu from "./Sidemenu";
import MenuActiveContext from "../context/MenuActive";

const MobilHeader = () => {
  const { active } = useContext(MenuActiveContext);
  const { changeActive } = useContext(MenuActiveContext);

  return (
    <div className="mobil-header">
      <div className="mobil-logo">
        <NavLink to="/home">
          <img src="/img/logo.png" alt="menu logo" />
        </NavLink>
      </div>
      <div className="mobil-menu-icon" onClick={() => changeActive(true)}>
        <GiHamburgerMenu />
      </div>

      {active && <Sidemenu />}
    </div>
  );
};

export default MobilHeader;
