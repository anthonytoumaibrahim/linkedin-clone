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

// Components
import Skills from "./Components/Skills";
import Education from "./Components/Education";

// Utils
import { setLocalUser } from "../../utils/user";

const ProfileEditor = () => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(AuthContext);
  useEffect(() => {
    if (user.id === 0) {
      navigate("/auth");
    }
  }, [user]);

  const [userInfo, setUserInfo] = useState({
    is_company: false,
    name: "",
    bio: "",
    education: [],
    skills: [],
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
          is_company: data.is_company ?? false,
          name: data.name ?? "",
          bio: data.biography ?? "",
          education: data.education ?? {},
          skills: data.skills ?? [],
        });
      })
      .catch((error) => console.error(error));
  }, []);

  const saveProfile = (e) => {
    e.preventDefault();
    axios
      .post(
        process.env.REACT_APP_API_URL + "/profile/saveProfile.php",
        {
          id: user.id,
          ...userInfo,
        },
        {
          headers: {
            "content-type": "application/x-www-form-urlencoded",
          },
        }
      )
      .then((response) => {
        const { success, message } = response.data;
        setResponse({
          success: success,
          message: message,
        });
        setUser({
          ...user,
          id: user.id,
          name: userInfo.name,
          email: user.email,
          is_company: userInfo.is_company,
        });
        setLocalUser(user.id, userInfo.name, user.email, userInfo.is_company);
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
          <label htmlFor="bio">
            {user.is_company ? "About Company" : "Biography"}
          </label>
          <textarea
            id="bio"
            cols="30"
            rows="10"
            className="form-input"
            placeholder={
              user.is_company
                ? "Write a description of your company!"
                : "Write your biography. You can outline your work experience, skills, hobbies, and whatever comes to mind!"
            }
            value={userInfo.bio}
            onChange={(e) =>
              setUserInfo({
                ...userInfo,
                bio: e.target.value,
              })
            }
          ></textarea>
        </div>
        {!userInfo.is_company && (
          <>
            <div className="form-input-wrapper margin-b">
              <label>Skills</label>
              <Skills
                selected_skills={userInfo.skills}
                update_skills={(skill) => {
                  if (userInfo.skills.includes(skill)) {
                    setUserInfo({
                      ...userInfo,
                      skills: [...userInfo.skills].filter((sk) => sk !== skill),
                    });
                    return;
                  }
                  setUserInfo({
                    ...userInfo,
                    skills: [...userInfo.skills, skill],
                  });
                }}
              />
            </div>
            <div className="form-input-wrapper margin-b">
              <label>Education</label>
              <Education
                education={userInfo?.education}
                update={(data) =>
                  setUserInfo({
                    ...userInfo,
                    education: {
                      ...userInfo.education,
                      ...data,
                    },
                  })
                }
              />
            </div>
          </>
        )}
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
          <button className="button button-primary" type="submit">
            Save profile
          </button>{" "}
          <Link to="/profile" target="_blank">
            <FaRegEye /> View profile
          </Link>
        </div>
      </form>
    </div>
  );
};

export default ProfileEditor;
