import React, { useState, useEffect, useContext } from "react";
import Checks from "../../components/Checks";
import notifLoading from "../../helpers/notifLoading";
import notif from "../../helpers/notif";
import UserContext from "../../context/UserContext";

const ProfilePictures = () => {
  const { login, changeLogin } = useContext(UserContext);
  const [uploading, setUploading] = useState(false);
  const [need, setNeed] = useState([]);

  // upload files func
  const uploadFiles = (folder, type) => {
    const cloudName = "dm7pcraut"; // replace with your own cloud name
    const uploadPreset = "rqrjioh3"; // replace with your own upload preset

    const myWidget = window.cloudinary.createUploadWidget(
      {
        cloudName: cloudName,
        uploadPreset: uploadPreset,
        cropping: true, //add a cropping step
        // showAdvancedOptions: true, //add advanced options (public_id and tag)
        sources: ["local"], // restrict the upload sources to URL and local files
        multiple: false, //restrict upload to a single file
        folder: `${folder}`, //upload files to the specified folder
        // tags: ["users", "profile"], //add the given tags to the uploaded files
        // context: {alt: "user_uploaded"}, //add the given context data to the uploaded files
        clientAllowedFormats: ["jpg", "jpeg", "png"], //restrict uploading to image files only
        maxImageFileSize: 5000000, //restrict file size to less than 2MB
        maxImageWidth: 2000, //Scales the image down to a width of 2000 pixels before uploading
        theme: "blue", //change to a purple theme
      },
      async (error, result) => {
        if (error) {
          console.log(error);
        }
        if (!error && result && result.event === "success") {
          console.log(result);
          // set uploading
          setUploading(true);
          setNeed([]);
          // sending file to server
          const data = {
            uid: login.user.id,
            imageType: type,
            imageUri: result.info.url,
            imageUriSmall: result.info.thumbnail_url,
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
            setUploading(false);
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
      }
    );
    myWidget.open();
  };

  // upload files main
  const handleUploadMain = () => {
    uploadFiles("u_profile_main", "icon");
  };
  // upload files back
  const handleUploadBack = () => {
    uploadFiles("u_profile_back", "back");
  };

  useEffect(() => {
    if (uploading) {
      notifLoading("uploading...");
    }
  }, [uploading]);

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
            <button>Remove</button>
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
            <button>Remove</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePictures;
