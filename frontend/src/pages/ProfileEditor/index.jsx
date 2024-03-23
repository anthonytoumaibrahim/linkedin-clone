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
              <div className="education">
                <input
                  type="text"
                  className="form-input"
                  placeholder="School/University Name"
                  value={userInfo.education?.school}
                  onChange={(e) =>
                    setUserInfo({
                      ...userInfo,
                      education: {
                        ...userInfo.education,
                        school: e.target.value,
                      },
                    })
                  }
                />
                <input
                  type="text"
                  className="form-input"
                  placeholder="Field of Study"
                  value={userInfo.education?.field}
                  onChange={(e) =>
                    setUserInfo({
                      ...userInfo,
                      education: {
                        ...userInfo.education,
                        field: e.target.value,
                      },
                    })
                  }
                />
                <input
                  type="number"
                  className="form-input"
                  placeholder="Year Started"
                  value={userInfo.education?.start_year}
                  onChange={(e) =>
                    setUserInfo({
                      ...userInfo,
                      education: {
                        ...userInfo.education,
                        start_year: e.target.value,
                      },
                    })
                  }
                />
                <input
                  type="number"
                  className="form-input"
                  placeholder="Year Ended"
                  value={userInfo.education?.end_year}
                  onChange={(e) =>
                    setUserInfo({
                      ...userInfo,
                      education: {
                        ...userInfo.education,
                        end_year: e.target.value,
                      },
                    })
                  }
                />
              </div>
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
