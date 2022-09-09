import React, { useState } from "react";

const Gender = () => {
  const [genderValue, setGenderValue] = useState("male");

  const changeGender = (e) => {
    setGenderValue(e.target.value);
  };

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
