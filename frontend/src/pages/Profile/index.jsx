// React stuff
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

// Context
import { AuthContext } from "../../context/AuthContext";

// Assets
import profile_cover_user from "../../assets/images/profile-covers/user.jpg";
import profile_cover_company from "../../assets/images/profile-covers/company.jpg";
import avatar_user from "../../assets/images/icons/user.svg";
import avatar_company from "../../assets/images/icons/company.svg";

// Styles
import "./styles.css";

// Components
import NewPost from "./components/NewPost";

const Profile = () => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(AuthContext);

  const [shownProfile, setShownProfile] = useState({});

  useEffect(() => {
    if (user.id === 0) {
      navigate("/auth");
    }
  }, [user]);

  let { shownId } = useParams();

  // Get shown profile
  useEffect(() => {
    axios
      .get(
        process.env.REACT_APP_API_URL + "/profile/getProfile.php?id=" + shownId
      )
      .then((response) => {
        setShownProfile(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <>
      <div className="profile-card">
        <div className="profile-cover">
          <img
            src={
              shownProfile.is_company
                ? profile_cover_company
                : profile_cover_user
            }
          />
          <div className="profile-image">
            <img src={shownProfile.is_company ? avatar_company : avatar_user} />
          </div>
        </div>

        <div className="profile-content">
          <h1>{shownProfile.name ? shownProfile.name : "Anonymous"}</h1>
          <h4>{shownProfile.is_company ? "Company" : "User"}</h4>
          {shownProfile.id === user.id && <NewPost />}
        </div>
      </div>
    </>
  );
};

export default Profile;
