const NewPost = () => {
  return (
    <div className="post-container margin-y">
      <h2>Create a new post</h2>
      <form action="">
        <div className="form-input-wrapper margin-b">
          <textarea
            rows="5"
            className="form-input"
            placeholder="What do you want to talk about?"
          ></textarea>
        </div>
        <button className="button button-outlined button-outlined-primary">
          Create post
        </button>
      </form>
    </div>
  );
};

export default NewPost;
