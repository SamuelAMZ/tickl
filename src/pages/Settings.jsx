import React, { useState, useEffect } from "react";
import Checks from "../components/Checks";
import Appbar from "../components/Appbar";
import { RiArrowRightSLine } from "react-icons/ri";
import { BiEnvelope } from "react-icons/bi";
import { HiOutlinePhotograph } from "react-icons/hi";
import { AiOutlineUser, AiOutlineCalendar } from "react-icons/ai";
import { BsTextParagraph, BsGenderAmbiguous } from "react-icons/bs";
import { FiMapPin } from "react-icons/fi";
import { MdOutlinePassword } from "react-icons/md";
import MobilHeader from "../components/MobilHeader";
import Header from "../components/Header";
import { Outlet, NavLink, useLocation, useNavigate } from "react-router-dom";

const Settings = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // auto move user to username route
  useEffect(() => {
    if (
      location.pathname === "/settings/" ||
      location.pathname === "/settings"
    ) {
      navigate("/settings/username");
    }
  }, []);

  return (
    <>
      <Checks />

      <Header title={"Settings"} />

      <div className="settings-page md:max-w-7xl xl:max-w-screen-xl mx-auto md:px-10 xl:px-5">
        <Appbar />
        <div className="actual-settings-page">
          <MobilHeader />
          <div className="settings-page-container">
            <div className="settings-options">
              <div className="settings-account-informations">
                <NavLink to={"/settings/username"}>
                  <div className="items active">
                    <AiOutlineUser />
                    <div className="item-username">Username</div>
                    <RiArrowRightSLine />
                  </div>
                </NavLink>
                <NavLink to={"/settings/images"}>
                  <div className="items">
                    <HiOutlinePhotograph />
                    <div className="item-profil-pictures">profile pictures</div>
                    <RiArrowRightSLine />
                  </div>
                </NavLink>
                <NavLink to={"/settings/description"}>
                  <div className="items">
                    <BsTextParagraph />
                    <div className="item-description">Description</div>
                    <RiArrowRightSLine />
                  </div>
                </NavLink>
                <NavLink to={"/settings/email"}>
                  <div className="items">
                    <BiEnvelope />
                    <div className="item-email">email</div>
                    <RiArrowRightSLine />
                  </div>
                </NavLink>
                <NavLink to={"/settings/country"}>
                  <div className="items">
                    <FiMapPin />
                    <div className="item-country">Country</div>
                    <RiArrowRightSLine />
                  </div>
                </NavLink>
                <NavLink to={"/settings/gender"}>
                  <div className="items">
                    <BsGenderAmbiguous />
                    <div className="item-gender">gender</div>
                    <RiArrowRightSLine />
                  </div>
                </NavLink>
                <NavLink to={"/settings/birthdate"}>
                  <div className="items">
                    <AiOutlineCalendar />
                    <div className="item-birthdate">birth date</div>
                    <RiArrowRightSLine />
                  </div>
                </NavLink>
                <NavLink to={"/settings/password"}>
                  <div className="items">
                    <MdOutlinePassword />
                    <div className="item-password">Change Password</div>
                    <RiArrowRightSLine />
                  </div>
                </NavLink>
              </div>
            </div>
            <div className="settings-values">
              {/* sub routes */}
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Settings;
