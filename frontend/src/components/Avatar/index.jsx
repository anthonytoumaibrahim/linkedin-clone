// Styles
import "./styles.css";

// Assets
import avatar_user from "../../assets/images/icons/user.svg";
import avatar_company from "../../assets/images/icons/company.svg";

const Avatar = ({
  is_company = false,
  size = 180,
  imgSize = 80,
  style = {},
}) => {
  return (
    <div
      className="profile-image"
      style={{
        width: `${size}px`,
        height: `${size}px`,
        backgroundColor: is_company
          ? "var(--primary-lighter-col)"
          : "var(--primary-lightest-col)",
      }}
    >
      <img src={is_company ? avatar_company : avatar_user} width={imgSize} />
    </div>
  );
};

export default Avatar;
