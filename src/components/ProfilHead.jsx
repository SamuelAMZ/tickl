import React from "react";
import { NavLink } from "react-router-dom";
import { BiLinkAlt, BiCalendarEvent } from "react-icons/bi";

const ProfilHead = () => {
  return (
    <div className="profil-head">
      <div
        className="profil-head-img"
        style={{ backgroundImage: "url(/img/1.jpeg)" }}
      ></div>

      <div className="profil-button">
        <div
          className="profil-main-img"
          style={{ backgroundImage: "url(/img/pro.jpeg)" }}
        ></div>
        <button>
          <NavLink to="/settings">Edit profile</NavLink>
        </button>
      </div>

      <div className="profil-details">
        <div className="profil-detail">
          <h4>Tony Montana</h4>
          <p className="profil-username">@tony</p>
          <p className="profil-desc">
            Tony Montany profile here will share only interessing stuffs ...
          </p>
          <div className="profil-others">
            <div>
              <BiLinkAlt />
              <p className="link">google.com</p>
            </div>
            <div>
              <BiCalendarEvent />
              <p>joined 20-09-2022</p>
            </div>
          </div>
          <div className="profil-follow">
            <div className="following">
              <NavLink to="/follow">
                <span>12</span> following
              </NavLink>
            </div>
            <div className="followers">
              <NavLink to="/follow">
                <span>22</span> followers
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilHead;
