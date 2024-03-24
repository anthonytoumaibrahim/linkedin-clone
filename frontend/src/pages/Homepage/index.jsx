// React stuff
import { useContext, useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

// Context
import { AuthContext } from "../../context/AuthContext";

// Styles
import "./styles.css";

// Components
import NewPost from "./components/NewPost";
import Avatar from "../../components/Avatar";

// Icons
import { FaPlus } from "react-icons/fa6";

const Homepage = () => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (user.id === 0) {
      navigate("/auth");
    }
  }, [user]);

  // Get posts
  useEffect(() => {
    axios
      .get(process.env.REACT_APP_API_URL + "/post/get.php")
      .then((response) => {
        setPosts(response.data.data.posts);
        setUsers(response.data.data.users);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <NewPost name={user?.name} id={user?.id} />
      <section className="margin-y discover-section">
        <div className="cols-2">
          <h2 className="margin-b">Your feed</h2>
          <section className="posts">
            {posts.map((post) => {
              const {
                user_id,
                user_name,
                is_company,
                post_id,
                content,
                created_at,
              } = post;
              return (
                <div key={post_id} className="post">
                  <Link to={`/profile/${user_id}`} className="post-header">
                    <Avatar
                      size={64}
                      imgSize={32}
                      is_company={is_company === "0" ? false : true}
                    />
                    <div className="post-info">
                      <h4>{user_name}</h4>
                      <p className="date">{created_at}</p>
                    </div>
                  </Link>
                  <div className="post-content">{content}</div>
                </div>
              );
            })}
          </section>
        </div>
        <div>
          <h2 className="margin-b">Add to your feed</h2>
          <div className="users">
            {users.map((user) => {
              const { id, name, is_company } = user;
              return (
                <div className="user">
                  <Link to={`/profile/${id}`} className="user">
                    <Avatar
                      size={54}
                      imgSize={28}
                      is_company={is_company !== "1" ? false : true}
                    />
                    <div>
                      <p>{name ?? "Anonymous"}</p>
                      <p className="text-sm">
                        {is_company === "1" ? "Company" : ""}
                      </p>
                    </div>
                  </Link>
                  <button className="button button-outlined button-outlined-primary button-small">
                    <FaPlus />
                    Follow
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};

export default Homepage;
