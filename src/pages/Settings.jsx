import React, { useState, useEffect, useContext, useRef } from "react";
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

// context
import UserContext from "../context/UserContext";
import CloudResultContext from "../context/CloudResultContext";

const Settings = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileStyle, setMobileStyle] = useState(true);
  const [subPage, setSubPage] = useState(false);

  // context
  const { login, changeLogin } = useContext(UserContext);
  const { cloudResult, setCloudResult } = useContext(CloudResultContext);

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

  // create upload widget and remove on unmount
  const cloudinary = useRef();
  cloudinary.current = window.cloudinary;
  const cloudinaryWidget = useRef();

  // upload files func  (cloudinary)
  const uploadFiles = () => {
    const cloudName = "dm7pcraut";
    const uploadPreset = "rqrjioh3";

    cloudinaryWidget.current = cloudinary.current.createUploadWidget(
      {
        cloudName: cloudName,
        uploadPreset: uploadPreset,
        cropping: true, //add a cropping step
        folder: "profiles",
        sources: ["local"], // restrict the upload sources to URL and local files
        multiple: false, //restrict upload to a single file
        clientAllowedFormats: ["jpg", "jpeg", "png"], //restrict uploading to image files only
        maxImageFileSize: 5000000, //restrict file size to less than 2MB
        maxImageWidth: 2000, //Scales the image down to a width of 2000 pixels before uploading
        styles: {
          palette: {
            window: "#FFFFFF",
            windowBorder: "#90A0B3",
            tabIcon: "#225887",
            menuIcons: "#5A616A",
            textDark: "#000000",
            textLight: "#FFFFFF",
            link: "#225887",
            action: "#FF620C",
            inactiveTabIcon: "#0E2F5A",
            error: "#F44235",
            inProgress: "#225887",
            complete: "#20B832",
            sourceBg: "#E4EBF1",
          },
          fonts: {
            default: null,
            "'Poppins', sans-serif": {
              url: "https://fonts.googleapis.com/css?family=Poppins",
              active: true,
            },
          },
        },
        language: "en",
        text: {
          en: {
            crop: {
              title: "Crop your image",
              skip_btn: "Post",
            },
          },
        },
      },
      (error, result) => {
        if (error) {
          console.log(error);
        }
        if (!error && result && result.event === "success") {
          console.log(result);
          setCloudResult(result);
        }
      }
    );
  };

  // creating widget on comp mount
  useEffect(() => {
    uploadFiles();

    // remove widget from dome on unmount
    return () => {
      cloudinaryWidget.current.destroy({ removeThumbnails: true });
    };
  }, []);

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
                  <Outlet context={[cloudinaryWidget]} />
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
