// React stuff
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Context
import { AuthContext } from "../../context/AuthContext";

// Styles
import "./styles.css";

// Components
import NewPost from "./components/NewPost";

const Homepage = () => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(AuthContext);

  useEffect(() => {
    if (user.id === 0) {
      navigate("/auth");
    }
  }, [user]);

  return (
    <>
      <NewPost />
    </>
  );
};

export default Homepage;
