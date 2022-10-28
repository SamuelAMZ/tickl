import React, { useState, useContext, useEffect } from "react";
import UserContext from "../../context/UserContext";
import notif from "../../helpers/notif";

const Email = () => {
  const { login, changeLogin } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);

  const [emailValue, setEmailValue] = useState(login ? login.user.email : "");

  const changeEmail = (e) => {
    setEmailValue(e.target.value);
  };

  // reset values on login state change
  useEffect(() => {
    if (login) {
      setEmailValue(login.user.email);
    }
  }, [login]);

  // handle update sunmit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // getting data from field
    const data = {
      uid: login.user.id,
      emailValue,
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
        `${process.env.REACT_APP_DOMAIN}/twitter/api/settings/email`,
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
    <div className="_settings-email form-style">
      <form className="fields" onSubmit={handleSubmit}>
        <div className="field">
          <p>Email</p>
          <input
            type="text"
            className="input input-bordered w-full"
            onChange={(e) => changeEmail(e)}
            value={emailValue}
            placeholder="youremail@exemple.tld"
          />
        </div>
        {isLoading && (
          <button className="btn btn-primary loading capitalize">
            Updating ...
          </button>
        )}
        {!isLoading && (
          <button className="btn btn-primary capitalize">Update</button>
        )}
      </form>
    </div>
  );
};

export default Email;
