// Styles
import "./styles.css";

// Icons
import { LiaTimesSolid } from "react-icons/lia";

const Modal = ({ children, close = () => {} }) => {
  return (
    <div className="modal">
      <div className="overlay" onClick={close}></div>
      <div className="body">
        <LiaTimesSolid size={28} className="close-icon" onClick={close} />
        {children}
      </div>
    </div>
  );
};

export default Modal;
