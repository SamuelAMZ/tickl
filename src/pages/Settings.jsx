import React, { useState, useEffect, useContext } from "react";
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
import SingleHeader from "../components/SingleHeader";
import Loading from "../components/Loading";
import { Outlet, NavLink, useLocation, useNavigate } from "react-router-dom";
import UserContext from "../context/UserContext";

const Settings = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { login, changeLogin } = useContext(UserContext);
  const [mobileStyle, setMobileStyle] = useState(true);
  const [subPage, setSubPage] = useState(false);

  // auto move user to username route
  useEffect(() => {
    // autoredirect to username page on desktop and tablet
    if (window.screen.width >= 768) {
      setMobileStyle(false);
      if (
        location.pathname === "/settings/" ||
        location.pathname === "/settings"
      ) {
        navigate("/settings/username");
      }
    } else {
      setMobileStyle(true);
    }
  }, [location.pathname]);

  // detect subpage
  useEffect(() => {
    const loc = location.pathname;
    let subString = null;
    subString = loc.split("/settings/");

    if (
      subString[1] !== null &&
      subString[1] !== "" &&
      subString[0] !== "/settings"
    ) {
      setSubPage(true);
    } else {
      setSubPage(false);
    }
    console.log(subString, subPage);
  }, [location.pathname]);

  return (
    <>
      <Checks />

      {login && (
        <>
          <Header title={"Settings"} />

          <div
            className={
              mobileStyle
                ? "settings-page-mob md:max-w-7xl xl:max-w-screen-xl mx-auto md:px-10 xl:px-5"
                : "settings-page-desk md:max-w-7xl xl:max-w-screen-xl mx-auto md:px-10 xl:px-5"
            }
          >
            <Appbar />
            <div className="actual-settings-page">
              {mobileStyle === subPage ? (
                <SingleHeader
                  title={location.pathname.replace("/settings/", "")}
                />
              ) : (
                <MobilHeader title={"Settings"} />
              )}
              <div
                className={
                  mobileStyle
                    ? "settings-page-container-mob"
                    : "settings-page-container-desk"
                }
              >
                <div
                  className={
                    mobileStyle === subPage ? "hide-on-sub" : "settings-options"
                  }
                >
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
                        <div className="item-profil-pictures">
                          profile pictures
                        </div>
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
      )}

      {!login && (
        <>
          <Loading />
        </>
      )}
    </>
  );
};

export default Settings;
