import React from "react";
import { MdOutlineAccountCircle } from "react-icons/md";

const Following = () => {
  return (
    <div className="following follow-style">
      <div className="user-img">
        <MdOutlineAccountCircle />
      </div>
      <div className="user-details">
        <div className="top">
          <div className="name">
            <h4>lorme ipsum</h4>
            <p className="profil-username">@ipsum</p>
          </div>
          <button className="unfollow">Unfollow</button>
        </div>
        <p className="profil-desc">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis,
          incidunt...
        </p>
      </div>
    </div>
  );
};

export default Following;
