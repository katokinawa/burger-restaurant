import styles from "./modal-overlay.module.css";
import PropTypes from "prop-types";

export default function ModalOverlay({ children, isModalOpen, handleClose }) {

  // JSX
  return (
    <div
      onClick={handleClose}
      className={isModalOpen ? styles.modal_overlay : styles.hidden}
    >
      {children}
    </div>
  );
}

ModalOverlay.propTypes = {
  children: PropTypes.element.isRequired,
  isModalOpen: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};
