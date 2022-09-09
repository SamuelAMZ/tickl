import React, { useState } from "react";

const Description = () => {
  const [bioValue, setBioValue] = useState("");
  const [websiteValue, setWebsiteValue] = useState("");

  const changeBio = (e) => {
    setBioValue(e.target.value);
  };
  const changeWebsite = (e) => {
    setWebsiteValue(e.target.value);
  };

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
            placeholder="Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi, repellat"
          ></textarea>
        </div>
        <div className="field">
          <p>Website</p>
          <input
            type="text"
            onChange={(e) => changeWebsite(e)}
            value={websiteValue}
            placeholder="lorem.com"
          />
        </div>
        <button>Update</button>
      </form>
    </div>
  );
};

export default Description;
