import React, { useState, useContext } from "react";
import { NavLink } from "react-router-dom";
import { BiLinkAlt, BiCalendarEvent } from "react-icons/bi";
import { FiMapPin } from "react-icons/fi";
import UserContext from "../context/UserContext";
import trimData from "../helpers/trim";
import { useEffect } from "react";

const ProfilHead = () => {
  const { login, changeLogin } = useContext(UserContext);
  const [descLength, setDescLength] = useState(false);
  const [nameLength, setNameLength] = useState(false);
  const [usernameLength, setUsernameLenght] = useState(false);

  // show all desc when it was trim down
  const showAll = (e, elm, type) => {
    if (!login) return;

    if (elm === "desc") {
      if (type === "more") {
        setDescLength(true);
      }
      if (type === "less") {
        setDescLength(false);
      }
    }

    if (elm === "name") {
      if (type === "more") {
        setNameLength(true);
      }
      if (type === "less") {
        setNameLength(false);
      }
    }
    if (elm === "username") {
      if (type === "more") {
        setUsernameLenght(true);
      }
      if (type === "less") {
        setUsernameLenght(false);
      }
    }
  };

  return (
    <div className="profil-head">
      {login ? (
        <div
          className="profil-head-img"
          style={{ backgroundImage: `url(${login.user.profileback.normal})` }}
        ></div>
      ) : (
        <div
          className="profil-head-img"
          style={{
            backgroundImage: `url(https://res.cloudinary.com/dm7pcraut/image/upload/v1666500653/u_profile_main/dvux_fyhbql.png)`,
          }}
        ></div>
      )}

      <div className="profil-button">
        {login ? (
          <div
            className="profil-main-img"
            style={{ backgroundImage: `url(${login.user.profileicon.normal})` }}
          ></div>
        ) : (
          <div
            className="profil-main-img"
            style={{
              backgroundImage: `url(https://res.cloudinary.com/dm7pcraut/image/upload/v1666499517/u_profile_main/1946429_dpitlh.png)`,
            }}
          ></div>
        )}
        <NavLink to="/settings">
          <button className="btn btn-active btn-neutral capitalize">
            Edit profile
          </button>
        </NavLink>
      </div>

      <div className="profil-details">
        <div className="profil-detail">
          <h4>
            {login ? !nameLength && trimData(login.user.name, 30) : "null"}
            {login ? nameLength && login.user.name : "null"}
            {/* more btn */}
            {!nameLength && (
              <>
                <span> </span>
                <button
                  className="btn btn-xs"
                  onClick={(e) => showAll(e, "name", "more")}
                >
                  More
                </button>
              </>
            )}
            {/* less btn */}
            {nameLength && (
              <>
                <span> </span>
                <button
                  className="btn btn-xs"
                  onClick={(e) => showAll(e, "name", "less")}
                >
                  Less
                </button>
              </>
            )}
          </h4>
          <p className="profil-username">
            {login
              ? !usernameLength && "@" + trimData(login.user.username, 30)
              : "null"}
            {login ? usernameLength && "@" + login.user.username : "null"}
            {/* more btn */}
            {!usernameLength && (
              <>
                <span> </span>
                <button
                  className="btn btn-xs"
                  onClick={(e) => showAll(e, "username", "more")}
                >
                  More
                </button>
              </>
            )}
            {/* less btn */}
            {usernameLength && (
              <>
                <span> </span>
                <button
                  className="btn btn-xs"
                  onClick={(e) => showAll(e, "username", "less")}
                >
                  Less
                </button>
              </>
            )}
          </p>
          <p className="profil-desc">
            {login
              ? !descLength && trimData(login.user.desc, 300)
              : "No bio yet"}
            {login ? descLength && login.user.desc : "No bio yet"}
            {/* more btn */}
            {!descLength && (
              <>
                <span> </span>
                <button
                  className="btn btn-xs"
                  onClick={(e) => showAll(e, "desc", "more")}
                >
                  More
                </button>
              </>
            )}
            {/* less btn */}
            {descLength && (
              <>
                <span> </span>
                <button
                  className="btn btn-xs"
                  onClick={(e) => showAll(e, "desc", "less")}
                >
                  Less
                </button>
              </>
            )}
          </p>
          <div className="profil-others">
            {login && login.user.country !== "no country yet" && (
              <div>
                <FiMapPin />
                <p className="location">{trimData(login.user.country, 10)}</p>
              </div>
            )}

            {login && login.user.website !== "no link yet" && (
              <a
                className="link link-primary"
                href={
                  login.user.website.includes("http")
                    ? login.user.website
                    : `http://${login.user.website}`
                }
                target="BLANK"
              >
                <div>
                  <BiLinkAlt />
                  <p className="link link-primary">
                    {trimData(login.user.website, 15)}
                  </p>
                </div>
              </a>
            )}
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
