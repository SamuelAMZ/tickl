import React, { useEffect, useState, useContext } from "react";
import UserCard from "../components/UserCard";
import notif from "../helpers/notif";
import Appbar from "../components/Appbar";
import Third from "../components/Third";
import Header from "../components/Header";
import MobilHeader from "../components/MobilHeader";
import { BarLoader } from "react-spinners";

// context
import UserContext from "../context/UserContext";

// components
import Checks from "../components/Checks";

const Suggetions = () => {
  const { login, changeLogin } = useContext(UserContext);
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
          `${process.env.REACT_APP_DOMAIN}/twitter/api/user/suggetions`,
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
  }, []);

  return (
    <>
      <Checks />

      {login && (
        <>
          <Header title={"Suggetions"} />
          <div className="suggetions md:max-w-7xl xl:max-w-screen-xl mx-auto p-4 md:px-10 xl:px-5">
            <Appbar />
            <div className="actual-suggetions">
              <MobilHeader title={"Suggetions"} />
              <div className="follow-container">
                {/* rlms */}
                {isLoading && (
                  <p className="loader">
                    <BarLoader color="#2a6da8" width={150} />
                  </p>
                )}
                {usersData &&
                  usersData.map((elm, idx) => {
                    return <UserCard data={elm} key={idx} />;
                  })}
              </div>
            </div>
            <Third />
          </div>
        </>
      )}
    </>
  );
};

export default Suggetions;
