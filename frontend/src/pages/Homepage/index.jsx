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

const Homepage = () => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (user.id === 0) {
      navigate("/auth");
    }
  }, [user]);

  // Get posts
  useEffect(() => {
    axios
      .get(process.env.REACT_APP_API_URL + "/post/get.php")
      .then((response) => setPosts(response.data.data.posts))
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <NewPost name={user?.name} id={user?.id} />
      <section className="margin-y">
        <h2 className="margin-b">Latest Posts</h2>
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
      </section>
    </>
  );
};

export default Homepage;
