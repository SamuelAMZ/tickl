import React, { useState } from "react";
import Appbar from "../components/Appbar";
import { RiArrowRightSLine } from "react-icons/ri";
import ProfilePictures from "../components/settings/ProfilePictures";
import Username from "../components/settings/Username";
import Email from "../components/settings/Email";
import Country from "../components/settings/Country";
import Gender from "../components/settings/Gender";
import Birthdate from "../components/settings/BirthDate";
import Password from "../components/settings/Password";
import Description from "../components/settings/Description";

const Settings = () => {
  const [activeTab, setActiveTab] = useState("username");

  const changeTab = (e, current) => {
    Array.from(e.target.parentElement.children).forEach((item) =>
      item.classList.remove("active")
    );
    e.target.classList.add("active");
    setActiveTab(current);
  };

  return (
    <>
      <div className="settings-page">
        <Appbar />
        <div className="actual-settings-page">
          <div className="settings-page-container">
            <div className="settings-options">
              <div className="settings-account-informations">
                <div
                  className="items active"
                  onClick={(e) => changeTab(e, "username")}
                >
                  <div className="item-username">Username</div>
                  <RiArrowRightSLine />
                </div>
                <div
                  className="items"
                  onClick={(e) => changeTab(e, "pictures")}
                >
                  <div className="item-profil-pictures">profile pictures</div>
                  <RiArrowRightSLine />
                </div>
                <div
                  className="items"
                  onClick={(e) => changeTab(e, "description")}
                >
                  <div className="item-description">Description</div>
                  <RiArrowRightSLine />
                </div>
                <div className="items" onClick={(e) => changeTab(e, "email")}>
                  <div className="item-email">email</div>
                  <RiArrowRightSLine />
                </div>
                <div className="items" onClick={(e) => changeTab(e, "country")}>
                  <div className="item-country">Country</div>
                  <RiArrowRightSLine />
                </div>
                <div className="items" onClick={(e) => changeTab(e, "gender")}>
                  <div className="item-gender">gender</div>
                  <RiArrowRightSLine />
                </div>
                <div
                  className="items"
                  onClick={(e) => changeTab(e, "birthdate")}
                >
                  <div className="item-birthdate">birth date</div>
                  <RiArrowRightSLine />
                </div>
                <div
                  className="items"
                  onClick={(e) => changeTab(e, "password")}
                >
                  <div className="item-password">Change Password</div>
                  <RiArrowRightSLine />
                </div>
              </div>
            </div>
            <div className="settings-values">
              {activeTab === "username" && <Username />}
              {activeTab === "pictures" && <ProfilePictures />}
              {activeTab === "description" && <Description />}
              {activeTab === "email" && <Email />}
              {activeTab === "country" && <Country />}
              {activeTab === "gender" && <Gender />}
              {activeTab === "birthdate" && <Birthdate />}
              {activeTab === "password" && <Password />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Settings;
