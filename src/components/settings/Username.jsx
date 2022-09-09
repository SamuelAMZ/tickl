import React, { useState } from "react";

const Username = () => {
  const [usernameValue, setUsernameValue] = useState("");
  const [firstnameValue, setFirstnameValue] = useState("");
  const [lastnameValue, setLastnameValue] = useState("");
  const [displaynameValue, setDisplaynameValue] = useState("");

  const changeUsername = (e) => {
    setUsernameValue(e.target.value);
  };
  const changeFirstname = (e) => {
    setFirstnameValue(e.target.value);
  };
  const changeLastname = (e) => {
    setLastnameValue(e.target.value);
  };
  const changeDisplayname = (e) => {
    setDisplaynameValue(e.target.value);
  };

  return (
    <div className="_settings-username form-style">
      <form className="fields">
        <div className="field">
          <p>Username</p>
          <input
            type="text"
            onChange={(e) => changeUsername(e)}
            value={usernameValue}
            placeholder="lorem"
          />
        </div>
        <div className="field">
          <p>First Name</p>
          <input
            type="text"
            onChange={(e) => changeFirstname(e)}
            value={firstnameValue}
            placeholder="Ipsum"
          />
        </div>
        <div className="field">
          <p>Last Name</p>
          <input
            type="text"
            onChange={(e) => changeLastname(e)}
            value={lastnameValue}
            placeholder="Dolor"
          />
        </div>
        <div className="field">
          <p>Display Name</p>
          <input
            type="text"
            onChange={(e) => changeDisplayname(e)}
            value={displaynameValue}
            placeholder="Ipsum Dolor"
          />
        </div>

        <button>Update</button>
      </form>
    </div>
  );
};

export default Username;
