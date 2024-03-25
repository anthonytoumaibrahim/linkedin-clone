// React stuff
import { useState, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// Context
import { AuthContext } from "../../../context/AuthContext";

// Utilities
import { setLocalUser } from "../../../utils/user";

const LoginForm = () => {
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const button = useRef(null);

  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const [response, setResponse] = useState({
    success: false,
    message: "",
  });

  const login = (event) => {
    event.preventDefault();
    button.current.disabled = true;
    axios
      .post(
        process.env.REACT_APP_API_URL + "/auth/login.php",
        {
          email: credentials.email,
          password: credentials.password,
        },
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        const { success, message, data } = response.data;
        setResponse({
          success: success,
          message: message,
        });
        if (success) {
          setUser({
            ...user,
            id: data.id,
            name: data.name,
            email: data.email,
            is_company: data.is_company,
          });
          setLocalUser(data.id, data.name, data.email, data.is_company);
          return navigate("/");
        }
      })
      .catch((error) => {
        setResponse({
          success: false,
          message:
            "Sorry, something went wrong. The error was logged to the console.",
        });
        console.error(error);
      })
      .finally(() => (button.current.disabled = false));
  };

  return (
    <form action="" onSubmit={login}>
      <div className="form-input-wrapper">
        <label htmlFor="email">Email address</label>
        <input
          type="email"
          id="email"
          className="form-input"
          value={credentials.email}
          onChange={(e) =>
            setCredentials({
              ...credentials,
              email: e.target.value,
            })
          }
        />
      </div>
      <div className="form-input-wrapper">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          className="form-input"
          value={credentials.password}
          onChange={(e) =>
            setCredentials({
              ...credentials,
              password: e.target.value,
            })
          }
        />
      </div>
      {response.message !== "" ? (
        <p className={`${response.success ? "text-success" : "text-error"}`}>
          {response.message}
        </p>
      ) : (
        ""
      )}
      <button className="button button-primary" ref={button}>
        Sign in
      </button>
    </form>
  );
};

export default LoginForm;
