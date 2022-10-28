import React, { useState, useContext, useEffect } from "react";
import UserContext from "../../context/UserContext";
import notif from "../../helpers/notif";

const Gender = () => {
  const { login, changeLogin } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);

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

  // handle update sunmit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // getting data from field
    const data = {
      uid: login.user.id,
      genderValue,
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
        `${process.env.REACT_APP_DOMAIN}/twitter/api/settings/gender`,
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

      // reload component
    } catch (err) {
      notif("server error try again later");
      console.log(err);
      setIsLoading(false);
    }
  };

  return (
    <div className="_settings-gender form-style">
      <form className="fields" onSubmit={handleSubmit}>
        <div className="field">
          <p>Gender</p>
          <select
            id="gender"
            className="select select-bordered w-full"
            value={genderValue}
            onChange={(e) => changeGender(e)}
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="transsexual ">Transsexual</option>
            <option value="private">Private</option>
          </select>
        </div>
        {isLoading && (
          <button className="btn btn-primary loading capitalize">
            Updating ...
          </button>
        )}
        {!isLoading && (
          <button className="btn btn-primary capitalize">Update</button>
        )}
      </form>
    </div>
  );
};

export default Gender;
