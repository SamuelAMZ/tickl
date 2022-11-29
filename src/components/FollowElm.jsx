import React from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { Link } from "react-router-dom";

const FollowElm = ({ data }) => {
  return (
    <Link to={`/${data.username}`}>
      <div className="elm">
        <img src={data.profileicon.thumb} alt="" />
        <div className="user-detail">
          <p className="user-first">{data.name}</p>
          <p className="user-name">@{data.username}</p>
        </div>

        <button className="btn btn-sm">
          <AiOutlinePlus />
        </button>
      </div>
    </Link>
  );
};

export default FollowElm;
