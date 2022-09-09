import Login from "../components/Login";
import Register from "../components/Register";

const login = () => {
  return (
    <div className="login">
      <div className="login-elm-parent">
        <div
          className="image"
          style={{ backgroundImage: "url(/img/login-img.jpg)" }}
        ></div>
        <div className="account-content">
          <div className="login-content">
            <Login />
          </div>
          <div className="register-content">
            <Register />
          </div>
        </div>
      </div>
    </div>
  );
};

export default login;
