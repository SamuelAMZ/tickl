import React from "react";
import Checks from "../components/Checks";
import Login from "../components/Login";
import Register from "../components/Register";
import { LoginFormProvider } from "../context/LoginPagesContext";

const LoginPages = () => {
  return (
    <LoginFormProvider>
      <Checks />
      <div className="login">
        <div className="login-elm-parent">
          <div
            className="image"
            style={{ backgroundImage: "url(/img/login-img.jpg)" }}
          ></div>
          <div className="account-content">
            <div className="login-content">
              {/* logo */}
              <div className="logo">
                <img src="./img/logo.png" alt="logo" />
              </div>
              <Login />
              <Register />
            </div>
          </div>
        </div>
      </div>
    </LoginFormProvider>
  );
};

export default LoginPages;
