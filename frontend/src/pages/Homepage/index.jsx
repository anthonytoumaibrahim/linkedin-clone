// React stuff
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Context
import { AuthContext } from "../../context/AuthContext";

// Styles
import "./styles.css";

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
      <div className="create-post-container"></div>
    </>
  );
};

export default Homepage;