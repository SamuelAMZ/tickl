import React from "react";
import { NavLink } from "react-router-dom";

import FollowElm from "./FollowElm";

const WhoToFollow = () => {
  return (
    <>
      <div className="title">
        <p>Who to follow</p>
      </div>
      <div className="elm-parent">
        <FollowElm />
        <FollowElm />
        <FollowElm />
      </div>
      <NavLink to="/suggetions">
        <button className="btn btn-active  text-white ">Show More</button>
      </NavLink>{" "}
    </>
  );
};

export default WhoToFollow;
