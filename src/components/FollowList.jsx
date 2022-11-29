import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// helpers
import notif from "../helpers/notif";

const FollowList = ({ data }) => {
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const send = async () => {
      // send search request to backend
      setIsLoading(true);
      const userData = { uid: data };

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
          `${process.env.REACT_APP_DOMAIN}/twitter/api/user/singleuser`,
          {
            mode: "cors",
            method: "POST",
            headers: headers,
            body: JSON.stringify(userData),
            credentials: "include",
          }
        );

        const serverMessage = await response.json();
        setIsLoading(false);

        //   check if data > 1
        if (serverMessage.status === "ok") {
          setUserData(serverMessage.user);
        }
      } catch (err) {
        notif("error try again later");
        console.log(err);
        setIsLoading(false);
      }
    };
    send();
  }, []);

  return (
    userData && (
      <Link to={`/${userData.username}`}>
        <div className="usercard">
          <div className="user-img">
            <img src={userData.profileicon.thumb} alt="" />
          </div>
          <div className="user-details">
            <div className="top">
              <div className="name">
                <h4>{userData.name}</h4>
                <p className="profile-username">@{userData.username}</p>
              </div>
            </div>
            <p className="profil-desc">{userData.desc}</p>

            <button className="btn btn-sm bg-black user-action">view</button>
          </div>
        </div>
      </Link>
    )
  );
};

export default FollowList;
