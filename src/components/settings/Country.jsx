import React, { useState, useContext, useEffect } from "react";
import UserContext from "../../context/UserContext";

const Country = () => {
  const { login, changeLogin } = useContext(UserContext);
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

  return (
    <div className="_settings-country form-style">
      <form className="fields">
        <div className="field">
          <p>Country</p>
          <input
            type="text"
            onChange={(e) => changeCountry(e)}
            value={countryValue}
            placeholder="canada"
          />
        </div>
        <button>Update</button>
      </form>
    </div>
  );
};

export default Country;
