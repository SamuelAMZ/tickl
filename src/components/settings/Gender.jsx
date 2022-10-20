import React, { useState, useContext, useEffect } from "react";
import UserContext from "../../context/UserContext";

const Gender = () => {
  const { login, changeLogin } = useContext(UserContext);
  const [genderValue, setGenderValue] = useState(
    login ? login.user.gender : ""
  );

  const changeGender = (e) => {
    setGenderValue(e.target.value);
  };

  // reset values on login state change
  useEffect(() => {
    if (login) {
      setGenderValue(login.user.gender);
    }
  }, [login]);

  return (
    <div className="_settings-gender form-style">
      <form className="fields">
        <div className="field">
          <p>Gender</p>
          <select
            id="gender"
            value={genderValue}
            onChange={(e) => changeGender(e)}
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="transsexual ">Transsexual</option>
            <option value="private">Private</option>
          </select>
        </div>
        <button>Update</button>
      </form>
    </div>
  );
};

export default Gender;
