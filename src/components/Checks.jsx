import React, { useState, useEffect, useContext } from "react";
import notif from "../helpers/notif";
import UserContext from "../context/UserContext";
import { NavLink, useNavigate, useLocation } from "react-router-dom";

const Checks = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, changeLogin } = useContext(UserContext);

  // check if user is login or not function
  const checkLoginUser = async () => {
    try {
      const response = await fetch(
        "https://dead-cyan-vulture-yoke.cyclic.app/twitter/api/user/islogin",
        {
          method: "GET",
          headers: { "Content-Type": "Application/json" },
          credentials: "include",
        }
      );

      const serverMessage = await response.json();

      // if token not valid
      if (serverMessage.status === "false") {
        return { message: serverMessage.message, user: "null" };
      }
      if (serverMessage.status === "true") {
        return { message: serverMessage.message, user: serverMessage.user };
      }
    } catch (error) {
      notif("server error 'code: 001'");
      console.log(error);
    }
  };

  useEffect(() => {
    console.log(login);
  }, []);

  // check isLogin
  useEffect(() => {
    const check = async () => {
      const userData = await checkLoginUser();
      return userData;
    };

    check()
      .then((data) => {
        if (data.user === "null") {
          changeLogin(null);
          notif("Need to login");
          // redirection to login page
          navigate("/");
        }
        if (data.user !== "null") {
          // redirect to home if already login
          if (location.pathname === "/") {
            notif("Already login");
            navigate("/home");
          } else {
            // set data globaly
            changeLogin(data);
          }
        }
      })
      .catch((err) => {
        console.log(err);
        notif("server error 'code 002'");
      });
  }, []);

  return <></>;
};

export default Checks;
