import React, { useState, useContext, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { BiLinkAlt, BiCalendarEvent } from "react-icons/bi";
import { FiMapPin } from "react-icons/fi";
import MoreDetail from "./MoreDetail";
import notif from "../helpers/notif";
import trimData from "../helpers/trim";

// context
import UserContext from "../context/UserContext";
import MoreDetailsContext from "../context/MoreDetailContext";
import TargetUserContext from "../context/TargetUserContext";

const ProfilHead = () => {
  // context
  const { login, changeLogin } = useContext(UserContext);
  const { showMoreDetail, changeShowMoreDetail } =
    useContext(MoreDetailsContext);
  const { targetUser, setTargetUser } = useContext(TargetUserContext);

  // state
  const [isThirdUser, setIsThirdUser] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    console.log(targetUser);
    // targetUser = current fetched targetUser
    // login.user = the login targetUser
    if (targetUser.id !== login.user.id) {
      setIsThirdUser(true);
    } else {
      setIsThirdUser(false);
    }
  }, [targetUser]);

  // more and less features
  const [moreName, setMoreName] = useState(20);
  const [showMoreName, setShowMoreName] = useState(false);
  const [moreUserName, setMoreUserName] = useState(20);
  const [showMoreUserName, setShowMoreUserName] = useState(false);
  const [moreDesc, setMoreDesc] = useState(200);
  const [showMoreDesc, setShowMoreDesc] = useState(false);

  useEffect(() => {
    // name
    if (moreName < targetUser.name.length) {
      setShowMoreName(true);
    } else {
      setShowMoreName(false);
    }

    // username
    if (moreUserName < targetUser.username.length) {
      setShowMoreUserName(true);
    } else {
      setShowMoreUserName(false);
    }

    // desc
    if (moreDesc < targetUser.desc.length) {
      setShowMoreDesc(true);
    } else {
      setShowMoreDesc(false);
    }
  }, [targetUser]);

  // creating current targetUser instance data array for more details component
  useEffect(() => {
    setMoreDetailData([
      { title: "username", info: `@${targetUser.username}` },
      { title: "display name", info: targetUser.name },
      { title: "description", info: targetUser.desc },
      { title: "location", info: targetUser.country },
      { title: "website", info: targetUser.website },
    ]);
  }, [targetUser]);

  // handle more btn
  const [moreDetailData, setMoreDetailData] = useState([]);
  const handleMore = () => {
    changeShowMoreDetail(true);
  };

  // handle become fan button
  const handleFollow = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const data = {
      currentUserId: login.user.id,
      targetUserId: targetUser.id,
      currentName: login.user.username,
      targetName: targetUser.username,
    };

    try {
      let headers = new Headers();
      headers.append("Content-Type", "application/json");
      headers.append("Accept", "application/json");
      headers.append("GET", "POST", "OPTIONS");
      headers.append(
        "Access-Control-Allow-Origin",
        `${process.env.REACT_APP_DOMAIN}`
      );
      headers.append("Access-Control-Allow-Credentials", "true");

      const response = await fetch(
        `${process.env.REACT_APP_DOMAIN}/twitter/api/user/follow`,
        {
          mode: "cors",
          method: "POST",
          headers: headers,
          body: JSON.stringify(data),
          credentials: "include",
        }
      );

      const serverMessage = await response.json();
      notif(serverMessage.message);
      setIsLoading(false);

      if (serverMessage.code === "ok") {
        // actions
        let targetUserSnapshot = targetUser;
        targetUserSnapshot.alreadyFollow = true;
        targetUserSnapshot.followers = Number(targetUserSnapshot.followers) + 1;
        setTargetUser(targetUserSnapshot);
      }
    } catch (err) {
      notif("server error try again later");
      console.log(err);
      setIsLoading(false);
    }
  };
  // handle unfollow fan button
  const handleUnFollow = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const data = {
      currentUserId: login.user.id,
      targetUserId: targetUser.id,
    };

    try {
      let headers = new Headers();
      headers.append("Content-Type", "application/json");
      headers.append("Accept", "application/json");
      headers.append("GET", "POST", "OPTIONS");
      headers.append(
        "Access-Control-Allow-Origin",
        `${process.env.REACT_APP_DOMAIN}`
      );
      headers.append("Access-Control-Allow-Credentials", "true");

      const response = await fetch(
        `${process.env.REACT_APP_DOMAIN}/twitter/api/user/unfollow`,
        {
          mode: "cors",
          method: "POST",
          headers: headers,
          body: JSON.stringify(data),
          credentials: "include",
        }
      );

      const serverMessage = await response.json();
      notif(serverMessage.message);
      setIsLoading(false);

      if (serverMessage.code === "ok") {
        // actions
        let targetUserSnapshot = targetUser;
        targetUserSnapshot.alreadyFollow = false;
        targetUserSnapshot.followers = Number(targetUserSnapshot.followers) - 1;
        setTargetUser(targetUserSnapshot);
      }
    } catch (err) {
      notif("server error try again later");
      console.log(err);
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="profil-head">
        {login ? (
          <div
            className="profil-head-img"
            style={{ backgroundImage: `url(${targetUser.profileback.normal})` }}
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
              style={{
                backgroundImage: `url(${targetUser.profileicon.normal})`,
              }}
            ></div>
          ) : (
            <div
              className="profil-main-img"
              style={{
                backgroundImage: `url(https://res.cloudinary.com/dm7pcraut/image/upload/v1666499517/u_profile_main/1946429_dpitlh.png)`,
              }}
            ></div>
          )}

          {/* button */}
          {isLoading && (
            <NavLink to="#">
              <button className="btn btn-active btn-neutral loading capitalize">
                Loading...
              </button>
            </NavLink>
          )}

          {!isLoading && (
            <>
              {isThirdUser ? (
                targetUser.alreadyFollow ? (
                  <NavLink to={"#"}>
                    <button
                      className="btn btn-active capitalize un-fan"
                      onClick={handleUnFollow}
                    >
                      Unfollow
                    </button>
                  </NavLink>
                ) : (
                  <NavLink to={"#"}>
                    <button
                      className="btn btn-active capitalize become-fan"
                      onClick={handleFollow}
                    >
                      Become Fan
                    </button>
                  </NavLink>
                )
              ) : (
                <NavLink to="/settings">
                  <button className="btn btn-active btn-neutral capitalize">
                    Edit profile
                  </button>
                </NavLink>
              )}
            </>
          )}
        </div>

        <div className="profil-details">
          <div className="profil-detail">
            {/* targetUser display name */}
            {login && showMoreName ? (
              <>
                <h4>
                  {trimData(targetUser.name, moreName)}{" "}
                  <span className="btn btn-xs capitalize" onClick={handleMore}>
                    more
                  </span>
                </h4>
              </>
            ) : (
              <h4>{trimData(targetUser.name, moreName)}</h4>
            )}
            {/* username */}
            <p className="profil-username">
              {login && showMoreUserName ? (
                <>
                  <span>
                    @{trimData(targetUser.username, moreUserName)}{" "}
                    <span
                      className="btn btn-xs capitalize"
                      onClick={handleMore}
                    >
                      more
                    </span>
                  </span>
                </>
              ) : (
                <span>@{trimData(targetUser.username, moreUserName)}</span>
              )}
            </p>
            {/* desc */}
            {login && showMoreDesc ? (
              <>
                <p className="profil-desc">
                  {trimData(targetUser.desc, moreDesc)}{" "}
                  <span className="btn btn-xs capitalize" onClick={handleMore}>
                    more
                  </span>
                </p>
              </>
            ) : (
              <p className="profil-desc">
                {trimData(targetUser.desc, moreDesc)}
              </p>
            )}

            <div className="profil-others">
              {login && targetUser.country !== "no country yet" && (
                <div>
                  <FiMapPin />
                  <p className="location">{trimData(targetUser.country, 10)}</p>
                </div>
              )}

              {login && targetUser.website !== "no link yet" && (
                <a
                  className="link link-primary"
                  href={
                    targetUser.website.includes("http")
                      ? targetUser.website
                      : `http://${targetUser.website}`
                  }
                  target="BLANK"
                >
                  <div>
                    <BiLinkAlt />
                    <p className="link link-primary">
                      {trimData(targetUser.website, 15)}
                    </p>
                  </div>
                </a>
              )}
              <div>
                <BiCalendarEvent />
                <p>joined {login ? targetUser.date.slice(0, 10) : "null"}</p>
              </div>
              <div>
                <button className="btn btn-xs capitalize" onClick={handleMore}>
                  Quick View
                </button>
              </div>
            </div>
            <div className="profil-follow">
              <div className="following">
                <NavLink to={`/followings/${targetUser.username}`}>
                  <span> {login ? targetUser.following : "null"}</span>{" "}
                  following(s)
                </NavLink>
              </div>
              <div className="followers">
                <NavLink to={`/followers/${targetUser.username}`}>
                  <span> {login ? targetUser.followers : "null"}</span> fan(s)
                </NavLink>
              </div>
            </div>
          </div>
        </div>

        {/* more details box */}
        {showMoreDetail && <MoreDetail data={moreDetailData} />}
      </div>
    </>
  );
};

export default ProfilHead;
