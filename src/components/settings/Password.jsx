import React, { useState, useContext } from "react";
import UserContext from "../../context/UserContext";
import notif from "../../helpers/notif";

const Password = () => {
  const { login, changeLogin } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);

  const [oldPasswordValue, setOldPasswordValue] = useState("");
  const [newPasswordValue, setNewPasswordValue] = useState("");
  const [comfirmNewPasswordValue, setComfirmNewPasswordValue] = useState("");

  const changeOldPassword = (e) => {
    setOldPasswordValue(e.target.value);
  };
  const changeNewPassword = (e) => {
    setNewPasswordValue(e.target.value);
  };
  const changeComfirmNewPassword = (e) => {
    setComfirmNewPasswordValue(e.target.value);
  };

  // handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    // no empty allowed
    if (!(newPasswordValue && comfirmNewPasswordValue && oldPasswordValue))
      return notif("verify fields");
    // check if new and comfirm psw are  the same
    if (newPasswordValue !== comfirmNewPasswordValue)
      return notif("New and comfirmation password are not the same");

    // check if new psw !== to old psw
    if (newPasswordValue === oldPasswordValue)
      return notif("New cannot be the same as the old password");

    // send request to backend
    setIsLoading(true);

    // getting data from field
    const data = {
      uid: login.user.id,
      oldPasswordValue,
      newPasswordValue,
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
        `${process.env.REACT_APP_DOMAIN}/twitter/api/settings/password`,
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
    <div className="_settings-password form-style">
      <form className="fields" onSubmit={handleSubmit}>
        <div className="field">
          <p>Current Password</p>
          <input
            type="text"
            onChange={(e) => changeOldPassword(e)}
            value={oldPasswordValue}
            placeholder="*******"
          />
        </div>
        <div className="field">
          <p>New Password</p>
          <input
            type="text"
            onChange={(e) => changeNewPassword(e)}
            value={newPasswordValue}
            placeholder="*******"
          />
        </div>{" "}
        <div className="field">
          <p>Comfirm New Password</p>
          <input
            type="text"
            onChange={(e) => changeComfirmNewPassword(e)}
            value={comfirmNewPasswordValue}
            placeholder="*******"
          />
        </div>
        {isLoading && <button>Updating ...</button>}
        {!isLoading && <button>Update</button>}
      </form>
    </div>
  );
};

export default Password;
