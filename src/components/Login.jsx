import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import notif from "../helpers/notif";
import LoginFormsContext from "../context/LoginPagesContext";

const Login = () => {
  const { active, changeActive } = useContext(LoginFormsContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (email !== "" && password !== "") {
      const data = {
        email: email.toLowerCase().trim(),
        password: password.trim(),
      };

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
          `${process.env.REACT_APP_DOMAIN}/twitter/api/user/login`,
          {
            mode: "cors",
            method: "POST",
            headers: headers,
            body: JSON.stringify(data),
            credentials: "include",
          }
        );

        const serverMessage = await response.json();
        notif(serverMessage.message);
        setIsLoading(false);

        if (serverMessage.code === "ok") {
          navigate("/home");
        }
      } catch (err) {
        notif("server error try again later");
        console.log(err);
        setIsLoading(false);
      }
    } else {
      setIsLoading(false);
      return notif("Verify your fields");
    }
  };

  return (
    <>
      <h2>Login</h2>
      <form className="login-form" onSubmit={(e) => handleLogin(e)}>
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input input-primary input-bordered w-full"
          autoFocus
        />
        <input
          type="text"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="input input-primary input-bordered w-full"
        />
        {!isLoading && (
          <button className="btn btn-primary capitalize">Login</button>
        )}
        {isLoading && (
          <button className="btn btn-primary loading capitalize">
            Loading...
          </button>
        )}
        <p className="no-account">
          Don't have an account yet?
          <a className="switch-views" onClick={() => changeActive(false)}>
            {" "}
            Register
          </a>
        </p>
      </form>
    </>
  );
};

export default Login;
