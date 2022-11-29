// built in hooks
import React, { useState, useEffect, useRef } from "react";
import { useLocation, Link } from "react-router-dom";

// components
import Appbar from "../components/Appbar";
import Third from "../components/Third";
import Header from "../components/Header";
import MobilHeader from "../components/MobilHeader";
import FollowList from "../components/FollowList";

// helpers
import notif from "../helpers/notif";
import { BarLoader } from "react-spinners";

const Follow = () => {
  const [activeTab, setActiveTab] = useState("followers");
  const [activeUsername, setActiveUsername] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [followersArr, setFollowersArr] = useState([]);
  const [followingsArr, setFollowingsArr] = useState([]);
  const location = useLocation();

  // refs
  const followersBtn = useRef();
  const followingsBtn = useRef();

  // get active tab base n url
  useEffect(() => {
    const pathName = location.pathname;
    const arr = pathName.split("/");
    const currentTab = arr[arr.length - 2];
    setActiveTab(currentTab);
  }, [location.pathname]);

  // add or remove active class to current tab
  useEffect(() => {
    if (activeTab === "followers") {
      followersBtn.current.classList.add("active");
      followingsBtn.current.classList.remove("active");
    }

    if (activeTab === "followings") {
      followersBtn.current.classList.remove("active");
      followingsBtn.current.classList.add("active");
    }
  }, [activeTab]);

  // get username
  useEffect(() => {
    const pathName = location.pathname;
    const arr = pathName.split("/");
    const currentUsername = arr[arr.length - 1];
    setActiveUsername(currentUsername);
  }, []);

  // send request to get user following ids data
  useEffect(() => {
    const sendReq = async () => {
      const data = { targetUsername: activeUsername };
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
          `${process.env.REACT_APP_DOMAIN}/twitter/api/user/followlist`,
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

        if (serverMessage.status === "ok") {
          // actions
          console.log(serverMessage);
          setFollowersArr(serverMessage.users.followers);
          setFollowingsArr(serverMessage.users.followings);
        }
      } catch (err) {
        notif("server error try again later");
        console.log(err);
        setIsLoading(false);
      }
    };

    if (activeUsername) {
      sendReq();
    }
  }, [activeUsername]);

  // get users from the ids
  useEffect(() => {}, []);

  return (
    <>
      <Header title={"Followers"} />
      <div className="follow md:max-w-7xl xl:max-w-screen-xl mx-auto p-4 md:px-10 xl:px-5">
        <Appbar />
        <div className="actual-follow">
          <MobilHeader title={"Followers"} />

          <div className="tabs w-full tab-container">
            <Link
              to={`/followers/${activeUsername}`}
              className="tab btn active"
              ref={followersBtn}
            >
              Fans
            </Link>

            <Link
              to={`/followings/${activeUsername}`}
              className="tab btn"
              ref={followingsBtn}
            >
              Followings
            </Link>
          </div>

          <div className="content">
            {activeTab === "followers" && (
              <div className="follow-container">
                {isLoading && (
                  <p className="loader">
                    <BarLoader color="#2a6da8" width={150} />
                  </p>
                )}
                {!isLoading && (
                  <>
                    {followersArr.map((elm, idx) => {
                      return <FollowList data={elm} key={idx} />;
                    })}
                  </>
                )}
              </div>
            )}
            {activeTab === "followings" && (
              <div className="follow-container">
                {isLoading && (
                  <p className="loader">
                    <BarLoader color="#2a6da8" width={150} />
                  </p>
                )}
                {!isLoading && (
                  <>
                    {followingsArr.map((elm, idx) => {
                      return <FollowList data={elm} key={idx} />;
                    })}
                  </>
                )}
              </div>
            )}
          </div>
        </div>
        <Third />
      </div>
    </>
  );
};

export default Follow;
