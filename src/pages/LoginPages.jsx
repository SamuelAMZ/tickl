import React, { useState, useContext } from "react";
import Checks from "../components/Checks";
import Login from "../components/Login";
import Register from "../components/Register";
import { ImQuotesLeft } from "react-icons/im";
import LoginFormsContext from "../context/LoginPagesContext";

const LoginPages = () => {
  const { active, changeActive } = useContext(LoginFormsContext);

  return (
    <>
      <Checks />
      <div className="loginpages-container">
        {/* logo */}
        <div className="login-logo">
          <img src="/img/tickl_logo.png" alt="tickl logo" />
        </div>

        <div className="loginpages-content">
          <div className="forms-container">
            <div className="login-content">
              {active && <Login />}
              {!active && <Register />}
            </div>
          </div>
          <div className="testimonials">
            <div className="quote-icon">
              <ImQuotesLeft />
            </div>
            <div className="quote-text">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quia
              doloremque eligendi nisi odit nam neque earum. Iusto, incidunt.
              Ipsum, perferendis!
            </div>
            <div className="quoter">
              <h4>lorem ipsum</h4>
              <p>from Tickl</p>
            </div>

            {/* partnaire */}
            <div className="partners">
              <div className="line-partners">
                <span></span>
                <p>Partners</p>
                <span></span>
              </div>
              <div className="partners-list">
                <p>Paradise</p>
                <p>Carries Vip</p>
                <p>Lorem</p>
                <p>Tickl lorem</p>
              </div>
            </div>
          </div>
          <div className="brand">
            <div>
              <img src="/img/back_logo.png" alt="" />
              <h3>Tickl.ch</h3>
            </div>
          </div>
        </div>

        {/* layer */}
        <div
          className="big-layer"
          style={{ backgroundImage: "url(/img/icons/bg.svg)" }}
        ></div>
      </div>
    </>
  );
};

export default LoginPages;
