import React from "react";
import WhoToFollow from "./WhoToFollow";
import { FaFeatherAlt } from "react-icons/fa";

const Third = () => {
  return (
    <div className="third">
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

      <div
        className="featured"
        style={{ backgroundImage: "url(/img/sport.png)" }}
      >
        <a
          href="https://www.sportsnet.ca/"
          target="_blank"
          rel="noopener noreferrer"
        ></a>
        <div className="title">{/* <h3>Sport Net</h3> */}</div>
      </div>

      <div
        className="featured"
        style={{ backgroundImage: "url(/img/cibc.jpeg)" }}
      >
        <a
          href="https://www.cibc.com/"
          target="_blank"
          rel="noopener noreferrer"
        ></a>
        <div className="title">{/* <h3>CIBC</h3> */}</div>
      </div>
    </div>
  );
};

export default Third;
