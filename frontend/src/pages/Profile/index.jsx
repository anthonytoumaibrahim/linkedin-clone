// React stuff
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import axios from "axios";

// Context
import { AuthContext } from "../../context/AuthContext";

// Assets
import profile_cover_user from "../../assets/images/profile-covers/user.jpg";
import profile_cover_company from "../../assets/images/profile-covers/company.jpg";

// Styles
import "./styles.css";

// Components
import Avatar from "../../components/Avatar";

// Icons
import { CiEdit } from "react-icons/ci";
import { FaUserPlus, FaUserMinus } from "react-icons/fa";

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

  const [isOwner, setIsOwner] = useState(false);

  // Get shown profile
  useEffect(() => {
    if (!shownId) shownId = user.id;
    setIsOwner(shownId === user.id ? true : false);
    axios
      .get(
        process.env.REACT_APP_API_URL +
          "/profile/getProfile.php?id=" +
          shownId +
          "&viewerId=" +
          user.id
      )
      .then((response) => {
        setShownProfile(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [shownId]);

  const followUser = () => {
    axios
      .post(
        process.env.REACT_APP_API_URL + "/profile/follow.php",
        {
          id: user.id,
          follow_id: shownProfile.id,
        },
        {
          headers: {
            "content-type": "application/x-www-form-urlencoded",
          },
        }
      )
      .then((response) => {
        const { unfollow } = response.data.data;
        setShownProfile({
          ...shownProfile,
          is_following: !unfollow,
        });
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="profile-card">
      <div className="profile-cover">
        <img
          src={
            shownProfile?.is_company
              ? profile_cover_company
              : profile_cover_user
          }
        />
        <Avatar is_company={shownProfile?.is_company} />
      </div>

      <div className="profile-content">
        <h1>
          {shownProfile?.name ? shownProfile?.name : "Anonymous"}{" "}
          {isOwner ? (
            <Link to="/edit-profile">
              <CiEdit /> Edit Profile
            </Link>
          ) : (
            <button
              className={`button ${
                shownProfile?.is_following
                  ? "button-outlined button-outlined-primary"
                  : "button-primary"
              } button-small follow-button`}
              onClick={followUser}
            >
              {shownProfile?.is_following ? (
                <>
                  <FaUserMinus />
                  Unfollow
                </>
              ) : (
                <>
                  <FaUserPlus /> Follow
                </>
              )}
            </button>
          )}
        </h1>
        <h4>{shownProfile?.is_company ? "Company" : "User"}</h4>

        <div
          className={`margin-y ${
            shownProfile?.is_company ? "" : "bio-and-skills"
          }`}
        >
          <div className="biography">
            <h4>{shownProfile?.is_company ? "About Company" : "Biography"}</h4>
            <p
              className={`${
                shownProfile?.biography ? "" : "text-muted italic"
              }`}
            >
              {shownProfile?.biography ?? (
                <>
                  This {shownProfile?.is_company ? "company" : "user"} did not
                  write their biography yet.
                </>
              )}
            </p>
          </div>
          {!shownProfile?.is_company && (
            <div>
              <div className="margin-b">
                <h4>Skills</h4>
                {shownProfile?.skills?.length > 0 ? (
                  <div className="skills">
                    {shownProfile?.skills?.map((skill, index) => (
                      <span key={index}>{skill}</span>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted italic">No skills to show.</p>
                )}
              </div>
              <div>
                <h4>Education</h4>
                {shownProfile?.education?.school ? (
                  <p>
                    <span className="font-bold">
                      {shownProfile?.education?.school}
                    </span>{" "}
                    ({shownProfile?.education?.start_year}-
                    {shownProfile?.education?.end_year})
                    <br />
                    {shownProfile?.education?.field}
                  </p>
                ) : (
                  <p className="text-muted italic">No education to show.</p>
                )}
              </div>
            </div>
          )}
        </div>

        <section className="margin-y">
          <h2 className="margin-b">Latest Posts</h2>
          <section className="posts">
            {shownProfile?.posts?.map((post) => {
              const { id, content, created_at } = post;
              return (
                <div key={id} className="post">
                  <div className="post-header">
                    <Avatar
                      size={64}
                      imgSize={32}
                      is_company={shownProfile?.is_company}
                    />
                    <div className="post-info">
                      <h4>{shownProfile?.name}</h4>
                      <p className="date">{created_at}</p>
                    </div>
                  </div>
                  <div className="post-content">{content}</div>
                </div>
              );
            })}
          </section>
        </section>
      </div>
    </div>
  );
};

export default Profile;
