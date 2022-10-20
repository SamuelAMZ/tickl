import React, { useState, useContext, useEffect } from "react";
import UserContext from "../../context/UserContext";

const Email = () => {
  const { login, changeLogin } = useContext(UserContext);
  const [emailValue, setEmailValue] = useState(login ? login.user.email : "");

  const changeEmail = (e) => {
    setEmailValue(e.target.value);
  };

  // reset values on login state change
  useEffect(() => {
    if (login) {
      setEmailValue(login.user.email);
    }
  }, [login]);

  return (
    <div className="_settings-email form-style">
      <form className="fields">
        <div className="field">
          <p>Email</p>
          <input
            type="text"
            onChange={(e) => changeEmail(e)}
            value={emailValue}
            placeholder="youremail@exemple.tld"
          />
        </div>
        <button>Update</button>
      </form>
    </div>
  );
};

export default Email;
