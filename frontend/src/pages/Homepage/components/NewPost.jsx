// React stuff
import { useState } from "react";
import axios from "axios";

// Components
import Avatar from "../../../components/Avatar";

// Styles
import "./styles.css";

// Components
import Modal from "../../../components/Modal";

const NewPost = ({ name = "Anonymous", id = 0, is_company = false }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [postContent, setPostContent] = useState("");

  const [response, setResponse] = useState({
    success: false,
    message: "",
  });

  const submitPost = (e) => {
    e.preventDefault();
    axios
      .post(
        process.env.REACT_APP_API_URL + "/post/create.php",
        {
          id: id,
          content: postContent,
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
    <>
      {isModalOpen && (
        <Modal close={() => setIsModalOpen(false)}>
          <div className="flex align-center gap margin-b">
            <Avatar
              size={64}
              imgSize={32}
              is_company={is_company === 1 ? true : false}
            />
            <h3>{name}</h3>
          </div>
          <form action="" className="post-form" onSubmit={submitPost}>
            <textarea
              className="form-input"
              rows="10"
              placeholder="What do you want to talk about?"
              value={postContent}
              onChange={(e) => setPostContent(e.target.value)}
            ></textarea>
            {response.message !== "" ? (
              <p
                className={`${
                  response.success ? "text-success" : "text-error"
                }`}
              >
                {response.message}
              </p>
            ) : (
              ""
            )}
            <button className="button button-primary">Post</button>
          </form>
        </Modal>
      )}
      <div className="create-post-container">
        <Avatar
          size={64}
          imgSize={32}
          is_company={is_company === 1 ? true : false}
        />
        <button
          className="button button-outlined"
          onClick={() => setIsModalOpen(true)}
        >
          Start a post, try writing with AI
        </button>
      </div>
    </>
  );
};

export default NewPost;
