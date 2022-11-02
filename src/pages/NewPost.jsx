import React, { useContext } from "react";
import Checks from "../components/Checks";
import Loading from "../components/Loading";
import { Link } from "react-router-dom";
import {
  BsImage,
  BsFillCameraVideoFill,
  BsFillEmojiSmileFill,
} from "react-icons/bs";
import { RiFileGifFill } from "react-icons/ri";
import SingleHeader from "../components/SingleHeader";
import UserContext from "../context/UserContext";

const NewPost = () => {
  const { login, changeLogin } = useContext(UserContext);
  return (
    <>
      <SingleHeader title={"New Post"} />
      <div className="home md:max-w-7xl xl:max-w-screen-xl mx-auto p-4 md:px-10 xl:px-5">
        <Checks />
        {login && (
          <>
            <div className="actual-home">
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
                              autoFocus
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

export default NewPost;
