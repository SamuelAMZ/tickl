import React, { useContext } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginFormsContext from "../context/LoginPagesContext";
import notif from "../helpers/notif";

const Register = () => {
  const { active } = useContext(LoginFormsContext);
  const { changeActive } = useContext(LoginFormsContext);

  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [secret, setSecret] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  // handling registration function
  const handleRegistration = async (e) => {
    e.preventDefault();

    // check secret pass (temp)
    if (String(secret) !== "258357") {
      notif("invalid secret pass");
      return;
    }

    setIsLoading(true);

    if (username !== "" && name !== "" && email !== "" && password !== "") {
      const data = { username, name, email, password };

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
          `${process.env.REACT_APP_DOMAIN}/twitter/api/user/register`,
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

  if (active === "register") {
    return (
      <>
        <h2>Register</h2>
        <form onSubmit={(e) => handleRegistration(e)} className="register-form">
          <input
            type="text"
            placeholder="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="input input-bordered w-full"
            autoFocus
          />
          <input
            type="text"
            placeholder="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input input-bordered w-full"
          />
          <input
            type="text"
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input input-bordered w-full"
          />
          <input
            type="text"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input input-bordered w-full"
          />
          <input
            type="text"
            placeholder="secret pass"
            value={secret}
            onChange={(e) => setSecret(e.target.value)}
            className="input input-bordered w-full"
          />
          {!isLoading && (
            <button className="btn btn-primary capitalize">Register</button>
          )}
          {isLoading && (
            <button className="btn btn-primary loading capitalize">
              Loading...
            </button>
          )}

          <p className="no-account">
            Already have an account?
            <a
              onClick={() => changeActive("login")}
              className="switch-views"
              href="#"
            >
              Login
            </a>
          </p>
        </form>
      </>
    );
  }
};

export default Register;
