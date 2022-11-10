import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import notif from "../helpers/notif";
import LoginFormsContext from "../context/LoginPagesContext";

const Register = () => {
  const { active, changeActive } = useContext(LoginFormsContext);
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
    if (String(secret) !== "454350") {
      notif("invalid secret pass");
      return;
    }

    // verify if username don't have spaces and special caracters
    let format = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    if (format.test(username)) {
      return notif("verify username no space, no special characters");
    }

    setIsLoading(true);

    if (username !== "" && name !== "" && email !== "" && password !== "") {
      const data = { username, name, email: email.toLowerCase(), password };

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

  return (
    <>
      <h2>Register</h2>
      <form onSubmit={(e) => handleRegistration(e)} className="register-form">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="input input-primary input-bordered w-full"
          autoFocus
        />
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="input input-primary input-bordered w-full"
        />
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input input-primary input-bordered w-full"
        />
        <input
          type="text"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="input input-primary input-bordered w-full"
        />
        <input
          type="text"
          placeholder="Secret pass"
          value={secret}
          onChange={(e) => setSecret(e.target.value)}
          className="input input-primary input-bordered w-full"
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
          <a className="switch-views" onClick={() => changeActive(true)}>
            {" "}
            Login
          </a>
        </p>
      </form>
    </>
  );
};

export default Register;
