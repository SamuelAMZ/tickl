import React, { useContext, useEffect } from "react";
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

  function OnInput(e) {
    this.style.height = 0;
    this.style.height = this.scrollHeight + "px";
  }

  useEffect(() => {
    // auto scall textarea height
    const txHeight = 47;
    const tx = document.getElementsByTagName("textarea");

    for (let i = 0; i < tx.length; i++) {
      if (tx[i].value == "") {
        tx[i].setAttribute(
          "style",
          "height:" + txHeight + "px;overflow-y:hidden;"
        );
      } else {
        tx[i].setAttribute(
          "style",
          "height:" + tx[i].scrollHeight + "px;overflow-y:hidden;"
        );
      }
      tx[i].addEventListener("input", OnInput, false);
    }
  }, []);

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
              <form>
                <div className="top-elms">
                  <textarea
                    rows="1"
                    className="w-full text-lg tickltextarea"
                    placeholder="What's happening?"
                  ></textarea>
                  <div className="top-elms-container">
                    <div>
                      <BsImage />
                      <BsFillCameraVideoFill />
                      <BsFillEmojiSmileFill />
                      <RiFileGifFill />
                    </div>
                    <div>
                      <button
                        className="btn btn-sm btn-primary capitalize"
                        disabled
                      >
                        Tickl
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default TopPost;
