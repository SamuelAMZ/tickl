import React, { useContext } from "react";
import { Link } from "react-router-dom";
import {
  BsImage,
  BsFillCameraVideoFill,
  BsFillEmojiSmileFill,
} from "react-icons/bs";
import { RiFileGifFill } from "react-icons/ri";
import UserContext from "../context/UserContext";

const TopPost = () => {
  const { login, changeLogin } = useContext(UserContext);
  return (
    <div className="top-post">
      <div className="new-post">
        <div className="top">
          {login && (
            <>
              <Link to={"/profile"}>
                <img
                  className="profile-img"
                  src={`${login.user.profileicon.thumb}`}
                  alt="profile icon"
                />
              </Link>
              <div className="top-elms">
                <p>What's happening?</p>
                <div>
                  <BsImage />
                  <BsFillCameraVideoFill />
                  <BsFillEmojiSmileFill />
                  <RiFileGifFill />
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default TopPost;
