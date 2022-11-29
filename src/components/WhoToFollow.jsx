import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

import FollowElm from "./FollowElm";

// helper
import notif from "../helpers/notif";

const WhoToFollow = () => {
  const [usersData, setUsersData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const send = async () => {
      // send search request to backend
      setIsLoading(true);

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
          `${process.env.REACT_APP_DOMAIN}/twitter/api/user/whotofollow`,
          {
            mode: "cors",
            method: "GET",
            headers: headers,
            credentials: "include",
          }
        );

        const serverMessage = await response.json();
        setIsLoading(false);

        //   check if data > 1
        if (serverMessage.status === "ok") {
          setUsersData(serverMessage.users);
        }
      } catch (err) {
        notif("error try again later");
        console.log(err);
        setIsLoading(false);
      }
    };
    send();

    // reset
    return () => setUsersData(null);
  }, []);

  return (
    usersData && (
      <>
        <div className="title">
          <p>Who to follow</p>
        </div>
        <div className="elm-parent">
          {usersData.map((elm, idx) => {
            return <FollowElm data={elm} key={idx} />;
          })}
        </div>
        <NavLink to="/suggetions">
          <button className="btn btn-md btn-active  text-white ">
            Show More
          </button>
        </NavLink>
      </>
    )
  );
};

export default WhoToFollow;
