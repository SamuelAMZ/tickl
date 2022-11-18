import React, { useState, useContext, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { BiLinkAlt, BiCalendarEvent } from "react-icons/bi";
import { FiMapPin } from "react-icons/fi";
import MoreDetail from "./MoreDetail";
import UserContext from "../context/UserContext";
import MoreDetailsContext from "../context/MoreDetailContext";
import trimData from "../helpers/trim";
import notif from "../helpers/notif";

const ProfilHead = ({ user }) => {
  const { login, changeLogin } = useContext(UserContext);
  const { showMoreDetail, changeShowMoreDetail } =
    useContext(MoreDetailsContext);

  const [isThirdUser, setIsThirdUser] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // user = current fetched user
    // login.user = the login user
    if (user.id !== login.user.id) {
      setIsThirdUser(true);
    } else {
      setIsThirdUser(false);
    }
  }, [user]);

  // more and less features
  const [moreName, setMoreName] = useState(20);
  const [showMoreName, setShowMoreName] = useState(false);
  const [moreUserName, setMoreUserName] = useState(20);
  const [showMoreUserName, setShowMoreUserName] = useState(false);
  const [moreDesc, setMoreDesc] = useState(200);
  const [showMoreDesc, setShowMoreDesc] = useState(false);

  useEffect(() => {
    // name
    if (moreName < user.name.length) {
      setShowMoreName(true);
    } else {
      setShowMoreName(false);
    }

    // username
    if (moreUserName < user.username.length) {
      setShowMoreUserName(true);
    } else {
      setShowMoreUserName(false);
    }

    // desc
    if (moreDesc < user.desc.length) {
      setShowMoreDesc(true);
    } else {
      setShowMoreDesc(false);
    }
  }, [user]);

  // creating current user instance data array for more details component
  useEffect(() => {
    setMoreDetailData([
      { title: "username", info: `@${user.username}` },
      { title: "display name", info: user.name },
      { title: "description", info: user.desc },
      { title: "location", info: user.country },
      { title: "website", info: user.website },
    ]);
  }, [user]);

  // handle more btn
  const [moreDetailData, setMoreDetailData] = useState([]);
  const handleMore = () => {
    changeShowMoreDetail(true);
  };

  // handle become fan button
  // const handleBecomeFan = async (e, type) => {
  //   e.preventDefault();
  //   setIsLoading(true);

  //   const data = {
  //     currentUserId: login.user.id,
  //     targetUserId: user.id,
  //     type,
  //   };

  //   try {
  //     let headers = new Headers();
  //     headers.append("Content-Type", "application/json");
  //     headers.append("Accept", "application/json");
  //     headers.append("GET", "POST", "OPTIONS");
  //     headers.append(
  //       "Access-Control-Allow-Origin",
  //       `${process.env.REACT_APP_DOMAIN}`
  //     );
  //     headers.append("Access-Control-Allow-Credentials", "true");

  //     const response = await fetch(
  //       `${process.env.REACT_APP_DOMAIN}/twitter/api/user/follow-unfollow`,
  //       {
  //         mode: "cors",
  //         method: "POST",
  //         headers: headers,
  //         body: JSON.stringify(data),
  //         credentials: "include",
  //       }
  //     );

  //     const serverMessage = await response.json();
  //     notif(serverMessage.message);
  //     setIsLoading(false);

  //     if (serverMessage.code === "ok") {
  //       // actions
  //       console.log("good");
  //     }
  //   } catch (err) {
  //     notif("server error try again later");
  //     console.log(err);
  //     setIsLoading(false);
  //   }
  // };

  return (
    <div className="profil-head">
      {login ? (
        <div
          className="profil-head-img"
          style={{ backgroundImage: `url(${user.profileback.normal})` }}
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
            style={{ backgroundImage: `url(${user.profileicon.normal})` }}
          ></div>
        ) : (
          <div
            className="profil-main-img"
            style={{
              backgroundImage: `url(https://res.cloudinary.com/dm7pcraut/image/upload/v1666499517/u_profile_main/1946429_dpitlh.png)`,
            }}
          ></div>
        )}
        {isThirdUser ? (
          <NavLink to={"#"} onClick={(e) => handleBecomeFan(e, "follow")}>
            <button className="btn btn-active capitalize become-fan">
              Become Fan
            </button>
          </NavLink>
        ) : (
          <NavLink to="/settings">
            <button className="btn btn-active btn-neutral capitalize">
              Edit profile
            </button>
          </NavLink>
        )}
      </div>

      <div className="profil-details">
        <div className="profil-detail">
          {/* user display name */}
          {login && showMoreName ? (
            <>
              <h4>
                {trimData(user.name, moreName)}{" "}
                <span className="btn btn-xs capitalize" onClick={handleMore}>
                  more
                </span>
              </h4>
            </>
          ) : (
            <h4>{trimData(user.name, moreName)}</h4>
          )}
          {/* username */}
          <p className="profil-username">
            {login && showMoreUserName ? (
              <>
                <span>
                  @{trimData(user.username, moreUserName)}{" "}
                  <span className="btn btn-xs capitalize" onClick={handleMore}>
                    more
                  </span>
                </span>
              </>
            ) : (
              <span>@{trimData(user.username, moreUserName)}</span>
            )}
          </p>
          {/* desc */}
          {login && showMoreDesc ? (
            <>
              <p className="profil-desc">
                {trimData(user.desc, moreDesc)}{" "}
                <span className="btn btn-xs capitalize" onClick={handleMore}>
                  more
                </span>
              </p>
            </>
          ) : (
            <p className="profil-desc">{trimData(user.desc, moreDesc)}</p>
          )}

          <div className="profil-others">
            {login && user.country !== "no country yet" && (
              <div>
                <FiMapPin />
                <p className="location">{trimData(user.country, 10)}</p>
              </div>
            )}

            {login && user.website !== "no link yet" && (
              <a
                className="link link-primary"
                href={
                  user.website.includes("http")
                    ? user.website
                    : `http://${user.website}`
                }
                target="BLANK"
              >
                <div>
                  <BiLinkAlt />
                  <p className="link link-primary">
                    {trimData(user.website, 15)}
                  </p>
                </div>
              </a>
            )}
            <div>
              <BiCalendarEvent />
              <p>joined {login ? user.date.slice(0, 10) : "null"}</p>
            </div>
            <div>
              <button className="btn btn-xs capitalize" onClick={handleMore}>
                Quick View
              </button>
            </div>
          </div>
          <div className="profil-follow">
            <div className="following">
              <NavLink to="/follow">
                <span> {login ? user.following : "null"}</span> following
              </NavLink>
            </div>
            <div className="followers">
              <NavLink to="/follow">
                <span> {login ? user.followers : "null"}</span> fans
              </NavLink>
            </div>
          </div>
        </div>
      </div>

      {/* more details box */}
      {showMoreDetail && <MoreDetail data={moreDetailData} />}
    </div>
  );
};

export default ProfilHead;
