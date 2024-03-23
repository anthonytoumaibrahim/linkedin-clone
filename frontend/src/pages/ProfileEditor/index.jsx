// React stuff
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import axios from "axios";

// Context
import { AuthContext } from "../../context/AuthContext";

// Icons
import { FaRegEye } from "react-icons/fa";

// Styles
import "./styles.css";

const ProfileEditor = () => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(AuthContext);
  useEffect(() => {
    if (user.id === 0) {
      navigate("/auth");
    }
  }, [user]);

  const [userInfo, setUserInfo] = useState({
    name: "",
    bio: "",
  });
  const [response, setResponse] = useState({
    success: false,
    message: "",
  });

  useEffect(() => {
    axios
      .get(
        process.env.REACT_APP_API_URL + "/profile/getProfile.php?id=" + user.id
      )
      .then((response) => {
        const data = response.data.data;
        setUserInfo({
          ...userInfo,
          name: data.name ?? "",
          bio: data.biography ?? "",
        });
      })
      .catch((error) => console.error(error));
  }, []);

  const saveProfile = (e) => {
    e.preventDefault();
    axios
      .post(process.env.REACT_APP_API_URL + "/profile/saveProfile.php", {
        id: user.id,
        ...userInfo,
      })
      .then((response) => {
        const { success, message } = response.data;
        setResponse({
          success: success,
          message: message,
        });
      })
      .catch((error) => {
        setResponse({
          success: false,
          message: "Sorry, something went wrong.",
        });
        console.error(error);
      });
  };

  return (
    <div>
      <h1 className="margin-b">Edit Profile</h1>
      <form action="" onSubmit={saveProfile}>
        <div className="form-input-wrapper margin-b">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            className="form-input"
            value={userInfo.name}
            onChange={(e) =>
              setUserInfo({
                ...userInfo,
                name: e.target.value,
              })
            }
          />
        </div>
        <div className="form-input-wrapper margin-b">
          <label htmlFor="bio">Biography</label>
          <textarea
            id="bio"
            cols="30"
            rows="10"
            className="form-input"
            placeholder="Write your biography. You can outline your work experience, skills, hobbies, and whatever comes to mind!"
            value={userInfo.bio}
            onChange={(e) =>
              setUserInfo({
                ...userInfo,
                bio: e.target.value,
              })
            }
          ></textarea>
        </div>
        {response.message !== "" ? (
          <p
            className={`margin-b ${
              response.success ? "text-success" : "text-error"
            }`}
          >
            {response.message}
          </p>
        ) : (
          ""
        )}
        <div className="save-container">
          <button className="button button-primary">Save profile</button>{" "}
          <Link to="/profile" target="_blank">
            <FaRegEye /> View profile
          </Link>
        </div>
      </form>
    </div>
  );
};

export default ProfileEditor;
