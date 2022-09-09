import React, { useState } from "react";

const Email = () => {
  const [emailValue, setEmailValue] = useState("");

  const changeEmail = (e) => {
    setEmailValue(e.target.value);
  };

  return (
    <div className="_settings-email form-style">
      <form className="fields">
        <div className="field">
          <p>Email</p>
          <input
            type="text"
            onChange={(e) => changeEmail(e)}
            value={emailValue}
            placeholder="lorem@gmail.com"
          />
        </div>
        <button>Update</button>
      </form>
    </div>
  );
};

export default Email;
