// React stuff
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import axios from "axios";

// Context
import { AuthContext } from "../../context/AuthContext";

// Styles
import "./styles.css";

const PostJob = () => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(AuthContext);

  useEffect(() => {
    if (user.id === 0) {
      navigate("/auth");
    }
  }, [user]);

  const [jobDetails, setJobDetails] = useState({
    title: "",
    description: "",
  });

  const [response, setResponse] = useState({
    success: false,
    message: "",
  });

  const submit = (e) => {
    e.preventDefault();
    axios
      .post(process.env.REACT_APP_API_URL + "/jobs/post.php", {
        company_id: user.id,
        title: jobDetails.title,
        description: jobDetails.description,
      })
      .then((response) => {
        setResponse({
          success: response.data.success,
          message: response.data.message,
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
      <h2 className="margin-b">Post a job</h2>
      <form action="" onSubmit={submit}>
        <div className="form-input-wrapper margin-b">
          <label htmlFor="title">Job Title</label>
          <input
            type="text"
            id="title"
            className="form-input"
            placeholder="The job's title, keep it brief; e.g 'Junior Web Developer Position'"
            value={jobDetails.title}
            onChange={(e) =>
              setJobDetails({
                ...jobDetails,
                title: e.target.value,
              })
            }
          />
        </div>
        <div className="form-input-wrapper margin-b">
          <label htmlFor="desc">Job Description</label>
          <textarea
            id="desc"
            rows="10"
            className="form-input"
            placeholder="The job's description. Feel free to be as detailed as possible. You should mention the job requirements, ideal candidates, etc..."
            value={jobDetails.description}
            onChange={(e) =>
              setJobDetails({
                ...jobDetails,
                description: e.target.value,
              })
            }
          ></textarea>
        </div>
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
        <button type="submit" className="button button-primary">
          Post Job
        </button>
      </form>
    </>
  );
};

export default PostJob;
