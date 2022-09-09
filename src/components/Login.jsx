import React from "react";

const Login = () => {
  return (
    <>
      <h2>Login</h2>
      <form className="login-form">
        <input type="text" placeholder="email" />
        <input type="text" placeholder="password" />
        <button>Login</button>
        <p className="no-account">
          Don't registered yet?{" "}
          <a className="switch-views" href="#">
            Create an account
          </a>
        </p>
      </form>
    </>
  );
};

export default Login;
