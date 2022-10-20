import React, { useState, useContext, useEffect } from "react";
import UserContext from "../../context/UserContext";
import Checks from "../Checks";

const Username = () => {
  const { login, changeLogin } = useContext(UserContext);

  const [usernameValue, setUsernameValue] = useState(
    login ? login.user.username : "loading..."
  );
  const [firstnameValue, setFirstnameValue] = useState(
    login ? login.user.firstname : "loading..."
  );
  const [lastnameValue, setLastnameValue] = useState(
    login ? login.user.lastname : "loading..."
  );
  const [displaynameValue, setDisplaynameValue] = useState(
    login ? login.user.name : "loading..."
  );

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

  // reset values on login state change
  useEffect(() => {
    if (login) {
      setUsernameValue(login.user.username);
      setFirstnameValue(login.user.firstname);
      setLastnameValue(login.user.lastname);
      setDisplaynameValue(login.user.name);
    }
  }, [login]);

  return (
    <>
      <Checks />
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
              placeholder="Type first name"
            />
          </div>
          <div className="field">
            <p>Last Name</p>
            <input
              type="text"
              onChange={(e) => changeLastname(e)}
              value={lastnameValue}
              placeholder="Type last name"
            />
          </div>
          <div className="field">
            <p>Display Name</p>
            <input
              type="text"
              onChange={(e) => changeDisplayname(e)}
              value={displaynameValue}
              placeholder="Type your public name"
            />
          </div>

          <button>Update</button>
        </form>
      </div>
    </>
  );
};

export default Username;
