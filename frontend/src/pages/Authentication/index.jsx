// React stuff
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

// Assets
import authImg from "../../assets/images/auth_image.svg";

// Styles
import "./styles.css";

// Components
import LoginForm from "./components/LoginForm";
import SignupForm from "./components/SignupForm";

const Authentication = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isLogin, setIsLogin] = useState(true);

  useEffect(() => {
    const authType = searchParams.get("authType");
    if (authType === "signup") {
      setIsLogin(false);
    } else {
      setIsLogin(true);
    }
  }, [searchParams]);

  return (
    <div className="auth-container">
      <div className="auth-intro">
        <h1 className="display-1 font-thin">
          Welcome to your professional community
        </h1>
        <div className="auth-form">
          {isLogin ? <LoginForm /> : <SignupForm />}
          <button
            className="button button-outlined"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? "New to LinkedIn? Join now" : "Already have an account?"}
          </button>
        </div>
      </div>
      <div className="auth-img">
        <img src={authImg} alt="" />
      </div>
    </div>
  );
};

export default Authentication;
