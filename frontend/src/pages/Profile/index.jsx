// React stuff
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Context
import { AuthContext } from "../../context/AuthContext";

// Assets
import profile_cover_user from "../../assets/images/profile-covers/user.jpg";
import profile_cover_company from "../../assets/images/profile-covers/company.jpg";

const Profile = () => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(AuthContext);

  useEffect(() => {
    console.log(user);
    if (user.id === 0) {
      navigate("/auth");
    }
  }, [user]);
  return (
    <>
      <div className="profile-card">
        <img
          src={user.is_company ? profile_cover_company : profile_cover_user}
          alt=""
        />
      </div>
    </>
  );
};

export default Profile;
