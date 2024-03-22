// React stuff
import { useState } from "react";

// Assets
import authImg from "../../assets/images/auth_image.svg";

// Styles
import "./styles.css";

// Components
import LoginForm from "./components/LoginForm";
import SignupForm from "./components/SignupForm";

const Authentication = () => {
  const [isLogin, setIsLogin] = useState(true);
  return (
    <div className="auth-container">
      <div className="auth-form">
        <h1 className="display-1 font-thin">
          Welcome to your professional community
        </h1>
        {isLogin ? <LoginForm /> : <SignupForm />}
      </div>
      <div className="auth-img">
        <img src={authImg} alt="" />
      </div>
    </div>
  );
};

export default Authentication;
