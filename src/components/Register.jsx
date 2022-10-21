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

  const [isLoading, setIsLoading] = useState(false);

  // handling registration function
  const handleRegistration = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (username !== "" && name !== "" && email !== "" && password !== "") {
      const data = { username, name, email, password };

      try {
        const response = await fetch(
          "https://dead-cyan-vulture-yoke.cyclic.app/twitter/api/user/register",
          {
            method: "POST",
            headers: { "Content-Type": "Application/json" },
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
          />
          <input
            type="text"
            placeholder="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
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
          {!isLoading && <button>Register</button>}
          {isLoading && <button disabled>Loading...</button>}

          <p className="no-account">
            Already have an account?{" "}
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
