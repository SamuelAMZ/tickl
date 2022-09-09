import React, { useState } from "react";

const Birthdate = () => {
  const [birthdateValue, setBirthdateValue] = useState("");

  const changeBirthdate = (e) => {
    setBirthdateValue(e.target.value);
  };

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
