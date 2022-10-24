import React, { useState, useContext, useEffect } from "react";
import UserContext from "../../context/UserContext";
import notif from "../../helpers/notif";

const Birthdate = () => {
  const { login, changeLogin } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);

  const [birthdateValue, setBirthdateValue] = useState(
    login ? login.user.bdate : ""
  );

  const changeBirthdate = (e) => {
    setBirthdateValue(e.target.value);
  };

  // reset values on login state change
  useEffect(() => {
    if (login) {
      setBirthdateValue(login.user.bdate);
    }
  }, [login]);

  // handle update sunmit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // getting data from field
    const data = {
      uid: login.user.id,
      birthdateValue,
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
        `${process.env.REACT_APP_DOMAIN}/twitter/api/settings/birthdate`,
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
    <div className="_settings-birthdate form-style">
      <form className="fields" onSubmit={handleSubmit}>
        <div className="field">
          <p>Birthdate</p>
          <input
            type="date"
            onChange={(e) => changeBirthdate(e)}
            value={birthdateValue}
            placeholder="12-12-2022"
          />
        </div>
        {isLoading && <button>Updating ...</button>}
        {!isLoading && <button>Update</button>}
      </form>
    </div>
  );
};

export default Birthdate;
