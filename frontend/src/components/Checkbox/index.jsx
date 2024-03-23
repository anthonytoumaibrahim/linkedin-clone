import "./styles.css";

const Checkbox = ({ label = "", isChecked = false, onCheck = () => {} }) => {
  return (
    <div className="form-check-wrapper">
      <label>
        <input
          type="checkbox"
          checked={isChecked}
          onChange={(e) => onCheck(e.target.value)}
        />
        <span>{label}</span>
      </label>
    </div>
  );
};

export default Checkbox;
