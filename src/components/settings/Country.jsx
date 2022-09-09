import React, { useState } from "react";

const Country = () => {
  const [countryValue, setCountryValue] = useState("");

  const changeCountry = (e) => {
    setCountryValue(e.target.value);
  };

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
