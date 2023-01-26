import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

// icons
import { MdVisibility } from "react-icons/md";

const SideFeatured = () => {
  return (
    <>
      <div className="title">
        <p>Featured Posts</p>
      </div>
      <div className="elm-parent featured-card">
        <div className="elm featured-card-user">
          <img
            src="https://res.cloudinary.com/dm7pcraut/image/upload/v1668628600/profiles/go63llrarg8a8zy1azib.jpg"
            alt=""
          />
          <div className="user-detail">
            <p className="user-first">Tickl Staff</p>
            <p className="user-name">@Ticklme</p>
          </div>
        </div>

        <img
          src="https://res.cloudinary.com/dm7pcraut/image/upload/v1671346629/posts/tpyv1gvwhw8tqankx9cc.jpg"
          alt=""
        />
        <div className="user-detail">
          <p className="user-first">
            Lots of new registered users from across the US and Canada once you
            have registered be sure and follow me so you can keep up to date to
            what is happening. We keep working and you keep telling your friends
          </p>
        </div>
        <NavLink to="/post/63ceadccdfc6667871ffe380">
          <button className="btn btn-md btn-active  text-white ">
            Visit Post
          </button>
        </NavLink>
      </div>
    </>
  );
};

export default SideFeatured;
