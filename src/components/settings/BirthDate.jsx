import React, { useState, useContext, useEffect } from "react";
import UserContext from "../../context/UserContext";

const Birthdate = () => {
  const { login, changeLogin } = useContext(UserContext);
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

  return (
    <div className="_settings-birthdate form-style">
      <form className="fields">
        <div className="field">
          <p>Birthdate</p>
          <input
            type="date"
            onChange={(e) => changeBirthdate(e)}
            value={birthdateValue}
            placeholder="12-12-2022"
          />
        </div>
        <button>Update</button>
      </form>
    </div>
  );
};

export default Birthdate;
