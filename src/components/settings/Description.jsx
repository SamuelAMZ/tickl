import React, { useState, useContext, useEffect } from "react";
import UserContext from "../../context/UserContext";
import notif from "../../helpers/notif";

const Description = () => {
  const { login, changeLogin } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);

  const [bioValue, setBioValue] = useState(login ? login.user.desc : "");
  const [websiteValue, setWebsiteValue] = useState(
    login ? login.user.website : ""
  );

  const changeBio = (e) => {
    setBioValue(e.target.value);
  };
  const changeWebsite = (e) => {
    setWebsiteValue(e.target.value);
  };

  // reset values on login state change
  useEffect(() => {
    if (login) {
      setBioValue(login.user.desc);
      setWebsiteValue(login.user.website);
    }
  }, [login]);

  // handle update sunmit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // getting data from field
    const data = {
      uid: login.user.id,
      bioValue,
      websiteValue,
    };

    // send update request to backend

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
        `${process.env.REACT_APP_DOMAIN}/twitter/api/settings/description`,
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
      notif(serverMessage.message);

      // reload component
    } catch (err) {
      notif("server error try again later");
      console.log(err);
      setIsLoading(false);
    }
  };

  return (
    <div className="_settings-description form-style">
      <form className="fields" onSubmit={handleSubmit}>
        <div className="field">
          <p>Bio</p>
          <textarea
            id="description"
            rows="3"
            onChange={(e) => changeBio(e)}
            value={bioValue}
            placeholder="Type your description here"
          ></textarea>
        </div>
        <div className="field">
          <p>Website</p>
          <input
            type="text"
            onChange={(e) => changeWebsite(e)}
            value={websiteValue}
            placeholder="yourwebsite.tld"
          />
        </div>
        {isLoading && <button>Updating ...</button>}
        {!isLoading && <button>Update</button>}
      </form>
    </div>
  );
};

export default Description;
