import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginFormsContext from "../context/LoginPagesContext";
import notif from "../helpers/notif";

const Login = () => {
  const { active } = useContext(LoginFormsContext);
  const { changeActive } = useContext(LoginFormsContext);

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (email !== "" && password !== "") {
      const data = { email, password };

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

  if (active === "login") {
    return (
      <>
        <h2>Login</h2>
        <form className="login-form" onSubmit={(e) => handleLogin(e)}>
          <input
            type="text"
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="text"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {!isLoading && <button>Login</button>}
          {isLoading && <button disabled>Loading...</button>}
          <p className="no-account">
            Don't have an account yet?{" "}
            <a
              onClick={() => changeActive("register")}
              className="switch-views"
              href="#"
            >
              Register
            </a>
          </p>
        </form>
      </>
    );
  }
};

export default Login;
