import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

// icons
import {
  BsImage,
  BsFillCameraVideoFill,
  BsFillEmojiSmileFill,
} from "react-icons/bs";
import { RiFileGifFill } from "react-icons/ri";

// context
import UserContext from "../context/UserContext";
import ImagesUploadedContext from "../context/ImagesUploadedContext";

// helpers
import notif from "../helpers/notif";
import notifLoading from "../helpers/notifLoading";

// componenes
import Checks from "../components/Checks";
import Loading from "../components/Loading";
import SingleHeader from "../components/SingleHeader";
import ImagesBox from "../components/images/ImagesBox";

const NewPost = () => {
  const { login, changeLogin } = useContext(UserContext);
  const [newPostText, setNewPostText] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // images array state
  const { images, setImages } = useContext(ImagesUploadedContext);
  const [uploadTracker, setUploadTracker] = useState(0);

  const navigate = useNavigate();

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

  // post new tickl request
  const newPost = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!newPostText && images.length === 0) {
      setIsLoading(false);
      return notif("Verify the post field");
    }

    // extract images url from images state
    const imagesUrls = [];
    images.forEach((img) => {
      imagesUrls.push(img.imgUrl);
    });

    // getting data
    const data = {
      ownerId: login.user.id,
      newPostText,
      newPostImages: imagesUrls,
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
        // reset images state
        setImages([]);
        // navigate to home
        navigate("/home");
      }
    } catch (err) {
      notif("server error try again later");
      console.log(err);
      setIsLoading(false);
    }
  };

  // upload images
  const uploadImages = async (e) => {
    e.preventDefault();

    const url = "https://api.cloudinary.com/v1_1/dm7pcraut/image/upload";

    const files = document.querySelector("[type=file]").files;

    // restrict files size
    let MAXFILESIZE = 5;
    let found = [];
    Array.from(files).forEach((elm) => {
      if (elm.size / 1024 / 1000 > MAXFILESIZE) {
        found.push(1);
      }
    });
    if (found.length >= 1) {
      notif(`files must be less than ${MAXFILESIZE}MB`);
      return;
    }

    // restrict to four max images
    let MAXFILES = 4;
    if (Array.from(files).length + images.length > MAXFILES) {
      notif(`you can have only ${MAXFILES} images per post`);
      return;
    }

    // start loader
    notifLoading(`uploading.. ${uploadTracker} done!`, "upload");

    const formData = new FormData();

    try {
      let imagesArr = [];
      for (let i = 0; i < files.length; i++) {
        let file = files[i];
        formData.append("file", file);
        formData.append("upload_preset", "g12k3hld");

        const send = await fetch(url, {
          method: "POST",
          body: formData,
        });
        const data = await send.json();
        imagesArr.push({
          imgName: data.original_filename,
          imgUrl: data.secure_url,
          imgId: data.asset_id,
        });

        // tracker value
        setUploadTracker(uploadTracker + 1);
      }

      // update images state
      setImages([...images, ...imagesArr]);
    } catch (error) {
      console.log(error);
    } finally {
      // stop uploading message
      notifLoading("", "upload");
      // reset upload tracker
      setUploadTracker(0);
    }
  };

  useEffect(() => {
    if (uploadTracker > 0) {
      notifLoading(``, "upload");
      notifLoading(`uploading.. ${uploadTracker} done!`, "upload");
    }
  }, [uploadTracker]);

  return (
    <>
      <SingleHeader title={"New Post"} />
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
                          <form onSubmit={newPost}>
                            <textarea
                              rows="1"
                              className="w-full text-md tickltextarea"
                              placeholder="What's happening?"
                              value={newPostText}
                              onChange={(e) => setNewPostText(e.target.value)}
                            ></textarea>
                            {/* submit btn */}
                            <div className="submitbtn">
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
                          </form>

                          {/* images box */}
                          {images.length >= 1 && <ImagesBox />}

                          <div className="top-elms-container ">
                            <div className="top-elm-actions mt-2">
                              <span
                                className="tooltip tooltip-bottom"
                                data-tip="image"
                              >
                                <label
                                  htmlFor="imageupload"
                                  className="btn btn-sm"
                                >
                                  <BsImage />
                                </label>

                                {/* images form */}
                                <form encType="multipart/form-data">
                                  <input
                                    id="imageupload"
                                    type="file"
                                    name="files[]"
                                    multiple
                                    onChange={uploadImages}
                                  />
                                </form>
                              </span>
                              <span className="btn btn-sm">
                                <BsFillCameraVideoFill />
                              </span>
                              <span className="btn btn-sm">
                                <BsFillEmojiSmileFill />
                              </span>
                              <span className="btn btn-sm">
                                <RiFileGifFill />
                              </span>
                            </div>
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

export default NewPost;
