import React, { useState, useContext, useEffect } from "react";
import { BsImage } from "react-icons/bs";

// contexts
import UserContext from "../../context/UserContext";
import HomeReRenderContext from "../../context/HomeRerenderContext";
import ImagesUploadedContext from "../../context/ImagesUploadedContext";

// helpers
import notif from "../../helpers/notif";
import notifLoading from "../../helpers/notifLoading";

// components
import ImagesBox from "./../images/ImagesBox";

const CommentsForm = ({ postData }) => {
  const { login, changeLogin } = useContext(UserContext);
  let { reRender, changeRerender } = useContext(HomeReRenderContext);
  const [commentText, setCommentText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  // images array state
  const { images, setImages } = useContext(ImagesUploadedContext);
  const [uploadTracker, setUploadTracker] = useState(0);

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
  const newComment = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!commentText && images.length === 0) {
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
      postId: postData._id,
      userId: login.user.id,
      commentText,
      commentImages: imagesUrls,
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
        `${process.env.REACT_APP_DOMAIN}/twitter/api/post/newcomment`,
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
        notif(serverMessage.message);
        console.log(serverMessage.message);
      }

      if (serverMessage.code === "ok") {
        // reset form
        setCommentText("");
        // success message
        notif(serverMessage.message);
        // refresh posts component
        changeRerender(reRender + 1);
        // reset images state
        setImages([]);
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
      <div className="top-post">
        <div className="new-post">
          <div className="comment-form top">
            <div className="top-elms">
              {/* texts form */}
              <form onSubmit={newComment}>
                <textarea
                  rows="1"
                  className="w-full text-lg tickltextarea"
                  placeholder="Type your comment here"
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                ></textarea>
                {/* submit btn */}
                <div className="submitbtn">
                  {isLoading ? (
                    <button className="btn btn-sm btn-primary capitalize loading">
                      Posting...
                    </button>
                  ) : (
                    <button className="btn btn-sm btn-primary capitalize">
                      Post
                    </button>
                  )}
                </div>
              </form>

              {/* images box */}
              {images.length >= 1 && <ImagesBox />}

              <div className="top-elms-container">
                <div className="top-elm-actions">
                  <span className="tooltip tooltip-bottom" data-tip="image">
                    <label htmlFor="imageupload" className="btn btn-sm">
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CommentsForm;
