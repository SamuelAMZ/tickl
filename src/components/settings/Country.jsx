import React, { useState, useContext, useEffect } from "react";
import UserContext from "../../context/UserContext";
import notif from "../../helpers/notif";

const Country = () => {
  const { login, changeLogin } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);

  const [countryValue, setCountryValue] = useState(
    login ? login.user.country : ""
  );

  const changeCountry = (e) => {
    setCountryValue(e.target.value);
  };

  // reset values on login state change
  useEffect(() => {
    if (login) {
      setCountryValue(login.user.country);
    }
  }, [login]);

  // handle update sunmit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // getting data from field
    const data = {
      uid: login.user.id,
      countryValue,
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
        `${process.env.REACT_APP_DOMAIN}/twitter/api/settings/country`,
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
    <div className="_settings-country form-style">
      <form className="fields" onSubmit={handleSubmit}>
        <div className="field">
          <p>Country</p>
          <input
            type="text"
            onChange={(e) => changeCountry(e)}
            value={countryValue}
            placeholder="canada"
          />
        </div>
        {isLoading && <button>Updating ...</button>}
        {!isLoading && <button>Update</button>}
      </form>
    </div>
  );
};

export default Country;
