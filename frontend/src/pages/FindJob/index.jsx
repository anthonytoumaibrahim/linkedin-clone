// React stuff
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import axios from "axios";

// Context
import { AuthContext } from "../../context/AuthContext";

// Styles
import "./styles.css";

const FindJob = () => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(AuthContext);

  useEffect(() => {
    if (user.id === 0) {
      navigate("/auth");
    }
  }, [user]);

  return <div>find job</div>;
};

export default FindJob;
