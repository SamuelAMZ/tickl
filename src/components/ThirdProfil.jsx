import React from "react";
import WhoToFollow from "./WhoToFollow";
import { FaFeatherAlt } from "react-icons/fa";

const ThirdProfil = () => {
  return (
    <div className="third-profil">
      <div className="images">
        <div style={{ backgroundImage: "url(/img/1.jpeg)" }}></div>
        <div style={{ backgroundImage: "url(/img/2.jpeg)" }}></div>
        <div style={{ backgroundImage: "url(/img/3.jpeg)" }}></div>
        <div style={{ backgroundImage: "url(/img/4.jpeg)" }}></div>
        <div style={{ backgroundImage: "url(/img/1.jpeg)" }}></div>
        <div style={{ backgroundImage: "url(/img/2.jpeg)" }}></div>
      </div>
      <div className="who-follow">
        <WhoToFollow />
      </div>
      <div
        className="featured"
        style={{ backgroundImage: "url(/img/paradise.jpeg)" }}
      >
        <a
          href="https://paradisespaandtanning.ca/"
          target="_blank"
          rel="noopener noreferrer"
        ></a>
        <div className="title">{/* <h3>Paradise Spa</h3> */}</div>
      </div>
    </div>
  );
};

export default ThirdProfil;
