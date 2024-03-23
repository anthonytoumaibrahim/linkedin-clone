// React stuff
import { useEffect, useState, useRef } from "react";
import { redirect } from "react-router-dom";
import axios from "axios";

// Components
import Checkbox from "../../../components/Checkbox";

// Utilities
import { setLoggedInUser } from "../utils";

const SignupForm = () => {
  const button = useRef(null);
  const [isCompany, setIsCompany] = useState(false);

  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    name: false,
    email: false,
    password: false,
  });

  const [response, setResponse] = useState({
    success: false,
    message: "",
  });

  useEffect(() => {
    setErrors({
      ...errors,
      name: false,
      email: false,
      password: false,
    });
  }, [credentials]);

  const signup = (event) => {
    event.preventDefault();
    const { email, name, password } = credentials;
    // Validate email
    if (
      email === "" ||
      !/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/.test(email)
    ) {
      setErrors({
        ...errors,
        email: true,
      });
      return;
    }
    // Validate password
    if (password.length < 8) {
      setErrors({
        ...errors,
        password: true,
      });
      return;
    }
    // Validate company name
    if (isCompany && name.length < 2) {
      setErrors({
        ...errors,
        name: true,
      });
      return;
    }

    let requestData = {
      email: email,
      password: password,
      is_company: isCompany,
    };
    if (isCompany) {
      requestData = {
        ...requestData,
        name: name,
      };
    }
    button.current.disabled = true;
    axios
      .post(process.env.REACT_APP_API_URL + "/signup.php", requestData)
      .then((response) => {
        const { success, message, data } = response.data;
        setResponse({
          success: success,
          message: message,
        });
        if (success) {
          setLoggedInUser(data.id);
          return redirect("/");
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
    <form action="" onSubmit={signup}>
      <div className={`form-input-wrapper ${errors.email ? "form-error" : ""}`}>
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
        {errors.email && (
          <p className="text-error">Please enter a valid email address.</p>
        )}
      </div>
      <div
        className={`form-input-wrapper ${errors.password ? "form-error" : ""}`}
      >
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
        {errors.password && (
          <p className="text-error">
            Please make sure your password is at least 8 characters long.
          </p>
        )}
      </div>
      {isCompany && (
        <div
          className={`form-input-wrapper ${errors.name ? "form-error" : ""}`}
        >
          <label htmlFor="company">Company Name</label>
          <input
            type="text"
            id="company"
            className="form-input"
            value={credentials.name}
            onChange={(e) =>
              setCredentials({
                ...credentials,
                name: e.target.value,
              })
            }
          />
          {errors.name && (
            <p className="text-error">Please enter a valid company name.</p>
          )}
        </div>
      )}
      <Checkbox
        label="Sign up as a company"
        isChecked={isCompany}
        onCheck={() => setIsCompany(!isCompany)}
      />
      {response.message !== "" ? (
        <p className={`${response.success ? "text-success" : "text-error"}`}>
          {response.message}
        </p>
      ) : (
        ""
      )}
      <button className="button button-primary" ref={button}>
        Create {isCompany ? "company" : ""} account
      </button>
    </form>
  );
};

export default SignupForm;
