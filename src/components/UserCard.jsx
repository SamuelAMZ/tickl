import React from "react";
import { Link } from "react-router-dom";

const UserCard = ({ data }) => {
  return (
    data && (
      <Link to={`/${data.username}`}>
        <div className="usercard">
          <div className="user-img">
            <img src={data.profileicon.thumb} alt="" />
          </div>
          <div className="user-details">
            <div className="top">
              <div className="name">
                <h4>{data.name}</h4>
                <p className="profile-username">@{data.username}</p>
              </div>
            </div>
            <p className="profil-desc">{data.desc}</p>

            <button className="btn btn-sm bg-black user-action">Visit</button>
          </div>
        </div>
      </Link>
    )
  );
};

export default UserCard;
