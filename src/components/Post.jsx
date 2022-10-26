import React from "react";
import { FiMoreHorizontal } from "react-icons/fi";
import { BiCommentDetail, BiLike } from "react-icons/bi";
import { FiRepeat } from "react-icons/fi";
import { BsUpload } from "react-icons/bs";
import { AiOutlineEye } from "react-icons/ai";
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
            <div className="btn comment">
              <BiCommentDetail />
              <p>122</p>
            </div>
            <div className="btn repost">
              <FiRepeat />
              <p>12k</p>
            </div>
            <div className="btn like">
              <BiLike />
              <p>4k</p>
            </div>
            <div className="btn eye">
              <AiOutlineEye />
              <p>1.2k</p>
            </div>
            <div className="btn more-actions">
              <BsUpload />
            </div>
          </div>
        </div>

        <div className="post-more">
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn m-1 bg-white">
              <FiMoreHorizontal />
            </label>
            <ul
              tabIndex={0}
              className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <a>Follow @user</a>
              </li>
              <li>
                <a>Like Post</a>
              </li>
              <li>
                <a>Bookmark Post</a>
              </li>
              <li>
                <a>Visit Profile</a>
              </li>
              <li>
                <a>Report</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Post;
