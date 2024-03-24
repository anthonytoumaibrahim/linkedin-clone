import "./Education.css";

const Education = ({ education = {}, update = () => {} }) => {
  return (
    <div className="education">
      <input
        type="text"
        className="form-input"
        placeholder="School/University Name"
        value={education?.school ?? ""}
        onChange={(e) =>
          update({
            school: e.target.value,
          })
        }
      />
      <input
        type="text"
        className="form-input"
        placeholder="Field of Study"
        value={education?.field ?? ""}
        onChange={(e) =>
          update({
            field: e.target.value,
          })
        }
      />
      <input
        type="number"
        className="form-input"
        placeholder="Year Started"
        value={education?.start_year ?? ""}
        onChange={(e) =>
          update({
            start_year: e.target.value,
          })
        }
      />
      <input
        type="number"
        className="form-input"
        placeholder="Year Ended"
        value={education?.end_year ?? ""}
        onChange={(e) =>
          update({
            end_year: e.target.value,
          })
        }
      />
    </div>
  );
};

export default Education;
