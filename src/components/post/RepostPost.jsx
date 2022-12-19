import React, { useState, useEffect, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

// icons
import { IoClose } from "react-icons/io5";

// context
import UserContext from "../../context/UserContext";
import HomeReRenderContext from "../../context/HomeRerenderContext";
import RepostPostActiveContext from "../../context/RepostPostActiveContext";
import ImagesUploadedContext from "../../context/ImagesUploadedContext";
import CurrentRepostPostIdContext from "../../context/CurrentRepostPostId";

// helpers
import notif from "../../helpers/notif";

// components
import ImagesBox from "../images/ImagesBox";

const RepostPost = ({ postData, ownerData }) => {
  // contextes
  const { login, changeLogin } = useContext(UserContext);
  let { reRender, changeRerender } = useContext(HomeReRenderContext);
  const { repostActive, changeRepostActive } = useContext(
    RepostPostActiveContext
  );
  const { currentRepostPostId, setCurrentRepostPostId } = useContext(
    CurrentRepostPostIdContext
  );

  //   states
  const [repostNote, setRepostNote] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // images array state
  const { images, setImages } = useContext(ImagesUploadedContext);

  const location = useLocation();
  const navigate = useNavigate();

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

  // submit btn tweek
  useEffect(() => {
    const submitBtn = document.querySelector(".repostbtn");
    if (submitBtn) {
      submitBtn.style.bottom = "-2rem";
    }
  }, []);

  // repost tickl request
  const rePost = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // getting data
    const data = {
      postId: currentRepostPostId,
      userId: login.user.id,
      repostNote,
    };

    console.log(data);

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
        `${process.env.REACT_APP_DOMAIN}/twitter/api/post/repost`,
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

      if (serverMessage.code === "bad") {
        notif("error reposting");
        console.log(serverMessage.message);
        changeRepostActive(false);
      }

      if (serverMessage.code === "ok") {
        // reset form
        setRepostNote("");
        // success message
        notif(serverMessage.message);
        // reset images state
        setImages([]);
        // close desktop uploader
        changeRepostActive(false);

        // refresh posts component
        if (location.pathname !== "/home") {
          navigate("/home");
        } else {
          changeRerender(reRender + 1);
        }
      }
    } catch (err) {
      notif("server error try again later");
      console.log(err);
      setIsLoading(false);
      changeRepostActive(false);
    }
  };

  //   images setting
  useEffect(() => {
    // set images for the imagebox
    if (postData) {
      // construct image box data
      const imageData = [];
      postData.postImages.forEach((elm) => {
        imageData.push({ imgUrl: elm });
      });
      setImages(imageData);
    }

    // reset images when unmonting
    return () => {
      return setImages([]);
    };
  }, [postData]);

  return (
    <>
      <div
        className="more-container"
        onClick={() => changeRepostActive(false)}
      ></div>

      <div className="more-content">
        <div className="actual-content">
          {/* actual content */}
          <div className="top-post hidden md:block">
            <div className="new-post">
              <div className="top">
                {login && (
                  <>
                    <Link to={`/${login.user.username}`}>
                      <img
                        className="profile-img"
                        src={`${login.user.profileicon.thumb}`}
                        alt="profile icon"
                      />
                    </Link>

                    <div className="top-elms">
                      {/* texts form */}
                      <form onSubmit={rePost}>
                        <textarea
                          rows="1"
                          className="w-full text-lg tickltextarea"
                          placeholder="Type your repost comment here"
                          value={repostNote}
                          onChange={(e) => setRepostNote(e.target.value)}
                        ></textarea>
                        {/* submit btn */}
                        <div className="submitbtn repostbtn">
                          {isLoading ? (
                            <button className="btn btn-sm btn-primary capitalize loading">
                              Posting...
                            </button>
                          ) : (
                            <button className="btn btn-sm btn-primary capitalize">
                              Repost
                            </button>
                          )}
                        </div>
                      </form>

                      <div className="repost-data-container">
                        {/* original owner */}
                        {ownerData && (
                          <div className="user-data-repost">
                            <img src={ownerData.profileicon.thumb} />
                            <p>{ownerData.name}</p>
                          </div>
                        )}

                        {/* post data */}
                        <p>{postData && postData.postText}</p>

                        {/* images box */}
                        {images.length >= 1 && <ImagesBox />}
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="close" onClick={() => changeRepostActive(false)}>
          <IoClose />
        </div>
      </div>
    </>
  );
};

export default RepostPost;
