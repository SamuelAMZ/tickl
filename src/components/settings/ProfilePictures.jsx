import React, { useState, useEffect, useContext, useRef } from "react";
import { useOutletContext } from "react-router-dom";
import notifLoading from "../../helpers/notifLoading";
import notif from "../../helpers/notif";

// context
import UserContext from "../../context/UserContext";
import CloudResultContext from "../../context/CloudResultContext";

const ProfilePictures = () => {
  const [uploading, setUploading] = useState(false);
  const [removing, setRemoving] = useState(false);
  const [type, setType] = useState("");
  const [removeData, setRemoveData] = useState(null);

  // context
  const { login, changeLogin } = useContext(UserContext);
  const { cloudResult, setCloudResult } = useContext(CloudResultContext);
  const [cloudinaryWidget] = useOutletContext(); //cloudinary widget from setting page (parent)

  const cloudinary = useRef();
  cloudinary.current = window.cloudinary;

  // upload files main
  const handleUploadMain = () => {
    setType("icon");
    cloudinaryWidget.current.open();
  };
  // upload files back
  const handleUploadBack = () => {
    setType("back");
    cloudinaryWidget.current.open();
  };

  // sending files to server
  useEffect(() => {
    const sendUpdate = async () => {
      if (cloudResult) {
        // set uploading
        notifLoading("uploading...", "updatepro");
        // sending file to server
        const data = {
          uid: login.user.id,
          imageType: type,
          imageUri: cloudResult.info.url,
          imageUriSmall: cloudResult.info.thumbnail_url,
        };

        // send update to server
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
            `${process.env.REACT_APP_DOMAIN}/twitter/api/settings/profileimg`,
            {
              mode: "cors",
              method: "POST",
              headers: headers,
              body: JSON.stringify(data),
              credentials: "include",
            }
          );

          const serverMessage = await response.json();
          notifLoading("", "updatepro");
          notif(serverMessage.message);

          if (serverMessage.status === "ok") {
            // reload component
            changeLogin({
              message: serverMessage.message,
              user: serverMessage.user,
            });
          }

          // reload component
        } catch (err) {
          notif("server error try again later");
          console.log(err);
          setUploading(false);
        }
      }
    };

    sendUpdate();
  }, [cloudResult]);

  // remove files
  const removeIcon = () => {
    setType("icon");
    setRemoveData({
      default:
        "https://res.cloudinary.com/dm7pcraut/image/upload/v1669652946/profiles/Untitled_design_46_1_s9rdj8.jpg",
      thumb:
        "https://res.cloudinary.com/dm7pcraut/image/upload/v1669652946/profiles/Untitled_design_46_1_s9rdj8.jpg",
    });
  };

  const removeBack = () => {
    setType("back");
    setRemoveData({
      default:
        "https://res.cloudinary.com/dm7pcraut/image/upload/v1669652946/profiles/Untitled_design_18_1_oatvts.jpg",
      thumb:
        "https://res.cloudinary.com/dm7pcraut/image/upload/v1669652946/profiles/Untitled_design_18_1_oatvts.jpg",
    });
  };

  useEffect(() => {
    (async () => {
      if (removeData) {
        notifLoading("removing...", "removepro");
        // sending file to server
        const data = {
          uid: login.user.id,
          imageType: type,
          imageUri: removeData.default,
          imageUriSmall: removeData.thumb,
        };

        // send update to server
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
            `${process.env.REACT_APP_DOMAIN}/twitter/api/settings/profileimg`,
            {
              mode: "cors",
              method: "POST",
              headers: headers,
              body: JSON.stringify(data),
              credentials: "include",
            }
          );

          const serverMessage = await response.json();
          notifLoading("", "removepro");
          notif(serverMessage.message);

          // update the component
          setRemoving(false);

          if (serverMessage.status === "ok") {
            // reload component
            changeLogin({
              message: serverMessage.message,
              user: serverMessage.user,
            });
          }
        } catch (err) {
          notif("server error try again later");
          console.log(err);
        }
      }
    })();
  }, [removeData]);

  return (
    <>
      <div className="_settings-profil-pictures">
        {/* main image */}
        <div className="main-picture">
          <p>Main Image</p>
          {login ? (
            <div
              className="item"
              style={{
                backgroundImage: `url(${login.user.profileicon.normal})`,
              }}
            ></div>
          ) : (
            <div
              className="item"
              style={{ backgroundImage: "url(/img/random1.jpg)" }}
            ></div>
          )}
          <div className="actions">
            <form>
              <label
                id="u_main"
                htmlFor="main-picture"
                className="btn btn-primary capitalize"
                onClick={handleUploadMain}
              >
                Change
              </label>
            </form>
            <button
              className="btn btn-error capitalize text-white"
              onClick={removeIcon}
            >
              Remove
            </button>
          </div>
        </div>

        {/* background image */}
        <div className="back-picture">
          <p>Background Image</p>
          {login ? (
            <div
              className="item"
              style={{
                backgroundImage: `url(${login.user.profileback.normal})`,
              }}
            ></div>
          ) : (
            <div
              className="item"
              style={{ backgroundImage: "url(/img/random.jpg)" }}
            ></div>
          )}
          <div className="actions">
            <form>
              <label
                className="btn btn-primary capitalize"
                htmlFor="back-picture"
                onClick={handleUploadBack}
              >
                Change
              </label>
            </form>
            <button
              className="btn btn-error capitalize text-white"
              onClick={removeBack}
            >
              Remove
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePictures;
