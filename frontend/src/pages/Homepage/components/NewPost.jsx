// React stuff
import { useState } from "react";

// Components
import Avatar from "../../../components/Avatar";

// Styles
import "./styles.css";

// Components
import Modal from "../../../components/Modal";

const NewPost = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <>
      {isModalOpen && (
        <Modal close={() => setIsModalOpen(false)}>Hello World</Modal>
      )}
      <div className="create-post-container">
        <Avatar size={64} imgSize={32} />
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
