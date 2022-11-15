import React, { useState, useEffect, useContext } from "react";
import { IoClose } from "react-icons/io5";
import { Link } from "react-router-dom";
import {
  BsImage,
  BsFillCameraVideoFill,
  BsFillEmojiSmileFill,
} from "react-icons/bs";
import { RiFileGifFill } from "react-icons/ri";
import notif from "../../helpers/notif";
import UserContext from "../../context/UserContext";
import HomeReRenderContext from "../../context/HomeRerenderContext";
import DesktopPostActiveContext from "../../context/DesktopPostContext";

const DesktopPost = () => {
  const { login, changeLogin } = useContext(UserContext);
  const { deskActive, changeDeskActive } = useContext(DesktopPostActiveContext);
  let { reRender, changeRerender } = useContext(HomeReRenderContext);
  const [newPostText, setNewPostText] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function OnInput(e) {
    this.style.height = 0;
    this.style.height = this.scrollHeight + "px";
  }

  useEffect(() => {
    // auto scall textarea height
    const txHeight = 87;
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

  // post new tickl request
  const newPost = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!newPostText) {
      setIsLoading(false);
      return notif("Verify the post field");
    }

    // getting data
    const data = {
      ownerId: login.user.id,
      newPostText,
    };

    // sending request
    try {
      let headers = new Headers();
      headers.append("Content-Type", "application/json");
      headers.append("Accept", "application/json");
      headers.append("GET", "POST", "OPTIONS");
      headers.append(
        "Access-Control-Allow-Origin",
        `${process.env.REACT_APP_DOMAIN}`
      );
      headers.append("Access-Control-Allow-Credentials", "true");

      const response = await fetch(
        `${process.env.REACT_APP_DOMAIN}/twitter/api/post/newpost`,
        {
          mode: "cors",
          method: "POST",
          headers: headers,
          body: JSON.stringify(data),
          credentials: "include",
        }
      );

      const serverMessage = await response.json();

      setIsLoading(false);

      if (serverMessage.code === "500") {
        notif(serverMessage.error.message);
        console.log(serverMessage.error.message);
      }

      if (serverMessage.code === "ok") {
        // reset form
        setNewPostText("");
        // success message
        notif(serverMessage.message);
        // close and rerender posts
        changeDeskActive(false);
        changeRerender(reRender + 1);
      }
    } catch (err) {
      notif("server error try again later");
      console.log(err);
      setIsLoading(false);
    }
  };

  return (
    <>
      <div
        className="more-container"
        onClick={() => changeDeskActive(false)}
      ></div>

      <div className="more-content">
        <div className="actual-content">
          {/* actual content */}
          <div className="top-post hidden md:block">
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
                    <form onSubmit={newPost}>
                      <div className="top-elms">
                        <textarea
                          rows="1"
                          className="w-full text-lg tickltextarea"
                          placeholder="What's happening?"
                          value={newPostText}
                          onChange={(e) => setNewPostText(e.target.value)}
                        ></textarea>
                        <div className="top-elms-container">
                          <div>
                            <BsImage />
                            <BsFillCameraVideoFill />
                            <BsFillEmojiSmileFill />
                            <RiFileGifFill />
                          </div>
                          <div>
                            {isLoading ? (
                              <button className="btn btn-sm btn-primary capitalize loading">
                                Posting...
                              </button>
                            ) : (
                              <button className="btn btn-sm btn-primary capitalize">
                                Tickl
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </form>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="close" onClick={() => changeDeskActive(false)}>
          <IoClose />
        </div>
      </div>
    </>
  );
};

export default DesktopPost;
