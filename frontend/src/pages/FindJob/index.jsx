// React stuff
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import axios from "axios";

// Context
import { AuthContext } from "../../context/AuthContext";

// Styles
import "./styles.css";

// Components
import Avatar from "../../components/Avatar";

// Icons
import { AiOutlineMail } from "react-icons/ai";

const FindJob = () => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(AuthContext);

  useEffect(() => {
    if (user.id === 0) {
      navigate("/auth");
    }
  }, [user]);

  const [jobs, setJobs] = useState([]);
  const [loadingState, setLoadingState] = useState(
    "Please wait, loading jobs..."
  );

  // Get jobs
  useEffect(() => {
    axios
      .get(process.env.REACT_APP_API_URL + "/jobs/get.php?id=" + user.id)
      .then((response) => {
        const loadedJobs = response.data.data.jobs;
        setJobs(loadedJobs);
        if (loadedJobs.length === 0) {
          setLoadingState("There are no job postings yet.");
        }
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <>
      <h2 className="margin-b">Latest Jobs</h2>
      {jobs.length === 0 && <p>{loadingState}</p>}
      <div className="posts">
        {jobs.map((job) => {
          const {
            id,
            title,
            description,
            company_id,
            created_at,
            company_name,
            email,
          } = job;

          return (
            <div className="post" key={id}>
              <Link to={`/profile/${company_id}`} className="post-header">
                <Avatar size={64} imgSize={32} is_company={true} />
                <div className="post-info">
                  <h4>{company_name}</h4>
                  <p className="date">{created_at}</p>
                </div>
              </Link>
              <div className="post-content">
                <h1 className="margin-b">{title}</h1>
                <p className="margin-b">{description}</p>
                <a
                  href={`mailto:${email}`}
                  className="button button-primary button-icon"
                >
                  <AiOutlineMail size={24} />
                  Apply Now
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default FindJob;
