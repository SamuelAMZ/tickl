import React from "react";

const Register = () => {
  return (
    <>
      <h2>Register</h2>
      <form className="register-form">
        <input type="text" placeholder="name" />
        <input type="text" placeholder="email" />
        <input type="text" placeholder="password" />
        <button>Register</button>
        <p className="no-account">
          Already have an account?{" "}
          <a className="switch-views" href="#">
            Login
          </a>
        </p>
      </form>
    </>
  );
};

export default Register;
