import React, { useState, useContext, useEffect } from "react";
import UserContext from "../../context/UserContext";
import notif from "../../helpers/notif";

const Username = () => {
  const { login, changeLogin } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);

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

  // update username
  const updateHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // getting data from field
    const data = {
      uid: login.user.id,
      usernameValue,
      firstnameValue,
      lastnameValue,
      displaynameValue,
    };

    // send update request to backend

    try {
      let headers = new Headers();
      headers.append("Content-Type", "application/json");
      headers.append("Accept", "application/json");
      headers.append("GET", "POST", "OPTIONS");
      headers.append(
        "Access-Control-Allow-Origin",
        `${process.env.REACT_APP_DOMAIN}`
      );
      headers.append("Access-Control-Allow-Credentials", "true");

      const response = await fetch(
        `${process.env.REACT_APP_DOMAIN}/twitter/api/settings/username`,
        {
          mode: "cors",
          method: "POST",
          headers: headers,
          body: JSON.stringify(data),
          credentials: "include",
        }
      );

      const serverMessage = await response.json();
      setIsLoading(false);
      notif(serverMessage.message);

      if (serverMessage.status === "ok") {
        // reload component
        changeLogin({
          message: serverMessage.message,
          user: serverMessage.user,
        });
      }
    } catch (err) {
      notif("server error try again later");
      console.log(err);
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="_settings-username form-style">
        <form className="fields" onSubmit={updateHandler}>
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

          {isLoading && <button>Updating ...</button>}
          {!isLoading && <button>Update</button>}
        </form>
      </div>
    </>
  );
};

export default Username;
