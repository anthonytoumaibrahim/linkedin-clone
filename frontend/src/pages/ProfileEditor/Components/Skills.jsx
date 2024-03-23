import "./Skills.css";

const Skills = ({ selected_skills = [], update_skills = () => {} }) => {
  const skills_set = [
    "PHP",
    "Laravel",
    "JS",
    "CSS",
    "HTML",
    "SQL",
    "NoSQL",
    "React",
    "Next.js",
    "Graphic Design",
    "Java",
    "C++",
    "C",
    "C#",
    "Python",
  ];
  return (
    <div className="skills-box">
      {skills_set.map((skill, index) => (
        <button
          key={index}
          type="button"
          className={`button button-outlined button-small button-outlined-primary ${
            selected_skills.includes(skill) ? "button-primary" : ""
          }`}
          onClick={() => update_skills(skill)}
        >
          {skill}
        </button>
      ))}
    </div>
  );
};

export default Skills;
