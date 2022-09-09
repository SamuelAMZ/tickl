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
      <button>
        <NavLink to="/suggetions">Show More</NavLink>{" "}
      </button>
    </>
  );
};

export default WhoToFollow;
