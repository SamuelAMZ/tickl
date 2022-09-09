import React from "react";
import { MdOutlineAccountCircle } from "react-icons/md";

const Suggetion = () => {
  return (
    <div className="suggetion follow-style">
      <div className="user-img">
        <MdOutlineAccountCircle />
      </div>
      <div className="user-details">
        <div className="top">
          <div className="name">
            <h4>lorme ipsum</h4>
            <p className="profil-username">@ipsum</p>
          </div>
          <button>Follow</button>
        </div>
        <p className="profil-desc">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis,
          incidunt...
        </p>
      </div>
    </div>
  );
};

export default Suggetion;
