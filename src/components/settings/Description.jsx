import React, { useState, useContext, useEffect } from "react";
import UserContext from "../../context/UserContext";

const Description = () => {
  const { login, changeLogin } = useContext(UserContext);

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

  return (
    <div className="_settings-description form-style">
      <form className="fields">
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
        <button>Update</button>
      </form>
    </div>
  );
};

export default Description;
