import React from "react";
import { MdOutlineAccountCircle } from "react-icons/md";
import { BiCommentDetail, BiRepost, BiLike } from "react-icons/bi";
import { NavLink } from "react-router-dom";

const Post = ({ image, desc }) => {
  return (
    <>
      <div className="post">
        {/* user */}
        <NavLink to="/profile">
          <div
            className="user"
            style={{ backgroundImage: "url(/img/3.jpeg)" }}
          ></div>
        </NavLink>

        <div>
          <div className="user-detail">
            <p className="user-first">Tony</p>
            <p className="user-name">@Tony</p>
            <p className="date">19/09</p>
          </div>

          <div className="desc">
            <p>{desc}</p>
          </div>

          <div className="image">
            <img src={image.replace("url(", "").replace(")", "")} />
          </div>

          {/* actions */}
          <div className="actions">
            <div className="comment">
              <BiCommentDetail />
              <p>122</p>
            </div>
            <div className="repost">
              <BiRepost />
              <p>12k</p>
            </div>
            <div className="like">
              <BiLike />
              <p>4k</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Post;
