import React, { useState } from "react";

const Password = () => {
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

  return (
    <div className="_settings-password form-style">
      <form className="fields">
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
        <button>Update</button>
      </form>
    </div>
  );
};

export default Password;
