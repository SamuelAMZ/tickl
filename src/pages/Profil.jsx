import React, { useState, useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Checks from "../components/Checks";
import Appbar from "../components/Appbar";
import Third from "../components/Third";
import ProfilHead from "../components/ProfilHead";
import ProfilBody from "../components/ProfilBody";
import Header from "../components/Header";
import MobilHeader from "../components/MobilHeader";
import Loading from "../components/Loading";
import NotFound from "../components/NotFound";
import notif from "../helpers/notif";
import BarLoader from "react-spinners/BarLoader";
import UserContext from "../context/UserContext";

const Profil = () => {
  const { login, changeLogin } = useContext(UserContext);
  const [targetUser, setTargetUser] = useState(null);
  const [notFound, setNotFound] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const location = useLocation();
  let pathname = location.pathname;
  // userdate request function
  const userdataReq = async (targetUsername) => {
    // loading start
    setIsLoading(true);

    const data = { targetUsername };

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
        `${process.env.REACT_APP_DOMAIN}/twitter/api/user/userdata`,
        {
          mode: "cors",
          method: "POST",
          headers: headers,
          body: JSON.stringify(data),
          credentials: "include",
        }
      );

      const serverMessage = await response.json();

      // if user not valid
      if (serverMessage.status === "false") {
        // loading ends
        setIsLoading(false);
        return { message: serverMessage.message, user: null };
      }
      if (serverMessage.status === "true") {
        // loading ends
        setIsLoading(false);
        return { message: serverMessage.message, user: serverMessage.user };
      }
    } catch (error) {
      // loading ends
      setIsLoading(false);
      notif("server error 'code: 001'");
      console.log(error);
    }
  };

  // get target user or send 404 page
  useEffect(() => {
    // extract only the username from the url
    let urlArr = pathname.split("");
    urlArr[0] = "";
    const targetUserName = urlArr.join("").trim();
    //  sending a request to the user data if exist
    const userData = async () => {
      let data = await userdataReq(targetUserName);
      if (data.user === null) {
        setNotFound(true);
      }
      setTargetUser(data.user);
    };
    userData();
  }, [pathname]);

  return (
    <>
      <Checks />
      {login && (
        <>
          <Header
            title={targetUser ? "Profile" : notFound ? "404" : "loading..."}
          />

          <div className="profil-page md:max-w-7xl xl:max-w-screen-xl mx-auto md:px-10 xl:px-5">
            <Appbar />
            <div className="actual-profil-page">
              {/* when loading user */}
              {isLoading && (
                <div className="loader-profile">
                  <BarLoader
                    className="loader"
                    color="#2a6da8"
                    height={5}
                    width={250}
                  />
                </div>
              )}
              <MobilHeader
                title={targetUser ? "Profile" : notFound ? "404" : "loading..."}
              />
              {targetUser && (
                <>
                  <ProfilHead user={targetUser} />
                  <ProfilBody user={targetUser} />
                </>
              )}
              {notFound && (
                <>
                  <NotFound />
                </>
              )}
            </div>
            <Third />
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

export default Profil;
