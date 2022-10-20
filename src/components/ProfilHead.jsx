import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { BiLinkAlt, BiCalendarEvent } from "react-icons/bi";
import UserContext from "../context/UserContext";

const ProfilHead = () => {
  const { login, changeLogin } = useContext(UserContext);

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
          <h4>{login ? login.user.name : "null"}</h4>
          <p className="profil-username">
            @{login ? login.user.username : "null"}
          </p>
          <p className="profil-desc">
            {login ? login.user.desc : "No bio yet"}
          </p>
          <div className="profil-others">
            <div>
              <BiLinkAlt />
              <p className="link">
                {login ? login.user.website : "No website yet"}
              </p>
            </div>
            <div>
              <BiCalendarEvent />
              <p>joined {login ? login.user.date.slice(0, 10) : "null"}</p>
            </div>
          </div>
          <div className="profil-follow">
            <div className="following">
              <NavLink to="/follow">
                <span> {login ? login.user.following : "null"}</span> following
              </NavLink>
            </div>
            <div className="followers">
              <NavLink to="/follow">
                <span> {login ? login.user.followers : "null"}</span> followers
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilHead;
