import React, { useState, useEffect, useContext, useRef } from "react";
import Checks from "../../components/Checks";
import notifLoading from "../../helpers/notifLoading";
import notif from "../../helpers/notif";
import UserContext from "../../context/UserContext";

const ProfilePictures = () => {
  const { login, changeLogin } = useContext(UserContext);
  const [uploading, setUploading] = useState(false);
  const [removing, setRemoving] = useState(false);
  const [need, setNeed] = useState([]);
  const [type, setType] = useState("");
  const [cloudResult, setCloudResult] = useState(null);
  const [removeData, setRemoveData] = useState(null);

  const cloudinary = useRef();
  cloudinary.current = window.cloudinary;
  const cloudinaryWidget = useRef();

  // upload files func
  const uploadFiles = () => {
    const cloudName = "dm7pcraut"; // replace with your own cloud name
    const uploadPreset = "rqrjioh3"; // replace with your own upload preset

    cloudinaryWidget.current = cloudinary.current.createUploadWidget(
      {
        cloudName: cloudName,
        uploadPreset: uploadPreset,
        cropping: true, //add a cropping step
        folder: "profiles",
        sources: ["local"], // restrict the upload sources to URL and local files
        multiple: false, //restrict upload to a single file
        clientAllowedFormats: ["jpg", "jpeg", "png"], //restrict uploading to image files only
        maxImageFileSize: 5000000, //restrict file size to less than 2MB
        maxImageWidth: 2000, //Scales the image down to a width of 2000 pixels before uploading
        theme: "blue", //change to a purple theme
      },
      (error, result) => {
        if (error) {
          console.log(error);
        }
        if (!error && result && result.event === "success") {
          console.log(result);
          setCloudResult(result);
        }
      }
    );
    // myWidget.open();
  };

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

  // creating widget on comp mount
  useEffect(() => {
    uploadFiles();

    // remove widget from dome on unmount
    return () => {
      cloudinaryWidget.current.destroy({ removeThumbnails: true });
    };
  }, []);

  // sending files to server
  useEffect(() => {
    const sendUpdate = async () => {
      if (cloudResult) {
        // set uploading
        notifLoading("uploading...", "updatepro");
        setNeed([]);
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

          // update the component
          setNeed(["now"]);

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
        "https://res.cloudinary.com/dm7pcraut/image/upload/v1666499517/u_profile_main/1946429_dpitlh.png",
      thumb:
        "https://res.cloudinary.com/dm7pcraut/image/upload/c_limit,h_60,w_90/v1666499517/u_profile_main/1946429_dpitlh.png",
    });
  };

  const removeBack = () => {
    setType("back");
    setRemoveData({
      default:
        "https://res.cloudinary.com/dm7pcraut/image/upload/v1666500653/u_profile_main/dvux_fyhbql.png",
      thumb:
        "https://res.cloudinary.com/dm7pcraut/image/upload/c_limit,h_60,w_90/v1666499517/u_profile_main/1946429_dpitlh.png",
    });
  };

  useEffect(() => {
    (async () => {
      if (removeData) {
        notifLoading("removing...", "removepro");
        setNeed([]);
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
          setNeed(["now"]);

          // reload component
        } catch (err) {
          notif("server error try again later");
          console.log(err);
        }
      }
    })();
  }, [removeData]);

  return (
    <>
      {need.map((elm, idx) => (
        <div key={idx}>
          <Checks />
        </div>
      ))}
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
                onClick={handleUploadMain}
              >
                Change
              </label>
            </form>
            <button onClick={removeIcon}>Remove</button>
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
              <label htmlFor="back-picture" onClick={handleUploadBack}>
                Change
              </label>
            </form>
            <button onClick={removeBack}>Remove</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePictures;
