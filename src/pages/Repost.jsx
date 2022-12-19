import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

// context
import UserContext from "../context/UserContext";
import ImagesUploadedContext from "../context/ImagesUploadedContext";
import RepostStateMobileContext from "../context/RepostStateMobileContext";
import CurrentRepostPostIdContext from "../context/CurrentRepostPostId";

// componenes
import Checks from "../components/Checks";
import Loading from "../components/Loading";
import SingleHeader from "../components/SingleHeader";
import ImagesBox from "../components/images/ImagesBox";

// helpers
import notif from "../helpers/notif";

const Repost = () => {
  const { login, changeLogin } = useContext(UserContext);
  const [repostNote, setRepostNote] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  //   context
  const { repostData, changeRepostMobile } = useContext(
    RepostStateMobileContext
  );
  const { currentRepostPostId, setCurrentRepostPostId } = useContext(
    CurrentRepostPostIdContext
  );

  // images array state
  const { images, setImages } = useContext(ImagesUploadedContext);

  const navigate = useNavigate();

  //   redirect if no state of repost found
  useEffect(() => {
    if (!repostData) {
      return navigate(-1);
    }
  }, []);

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

  // submit btn tweek
  useEffect(() => {
    const submitBtn = document.querySelector(".repostbtn");
    if (submitBtn) {
      submitBtn.style.bottom = "0rem";
    }
  }, []);

  //   images setting
  useEffect(() => {
    // set images for the imagebox
    if (repostData) {
      // construct image box data
      const imageData = [];
      repostData.postData.postImages.forEach((elm) => {
        imageData.push({ imgUrl: elm });
      });
      setImages(imageData);
    }

    // reset images when unmonting
    return () => {
      return setImages([]);
    };
  }, [repostData]);

  //   handle repost
  const rePost = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // getting data
    const data = {
      postId: currentRepostPostId,
      userId: login.user.id,
      repostNote,
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
        changeRepostMobile(null);
      }

      if (serverMessage.code === "ok") {
        // reset form
        setRepostNote("");
        // success message
        notif(serverMessage.message);
        // reset images state
        setImages([]);
        // reset repost mobile state
        changeRepostMobile(null);

        // refresh posts component
        navigate("/home");
      }
    } catch (err) {
      notif("server error try again later");
      console.log(err);
      setIsLoading(false);
      changeRepostMobile(null);
    }
  };

  return (
    <>
      <SingleHeader title={"Repost"} />
      <div className="home md:max-w-7xl xl:max-w-screen-xl mx-auto p-4 md:px-10 xl:px-5">
        <Checks />
        {login && (
          <>
            <div className="actual-home">
              <div className="top-post md:hidden">
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
                              className="w-full text-md tickltextarea"
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
                            {repostData && (
                              <div className="user-data-repost">
                                <img
                                  src={repostData.ownerData.profileicon.thumb}
                                />
                                <p>{repostData.ownerData.name}</p>
                              </div>
                            )}

                            {/* post data */}
                            <p>{repostData && repostData.postData.postText}</p>

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
          </>
        )}

        {!login && (
          <>
            <Loading />
          </>
        )}
      </div>
    </>
  );
};

export default Repost;
