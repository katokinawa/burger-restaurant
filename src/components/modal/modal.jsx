import styles from "./modal.module.css";
import { createPortal } from "react-dom";
import { useEffect } from "react";
import ModalOverlay from "../modal-overlay/modal-overlay";
import closeImage from "../../images/close.svg";
import PropTypes from "prop-types";

export default function Modal({ children, isModalOpen, handleClose }) {
  // useEffects
  useEffect(() => {
    function handlePressKey(evt) {
      if (evt.key === "Escape") {
        handleClose();
      }
    }
    document.addEventListener("keydown", handlePressKey);
    return () => document.removeEventListener("keydown", handlePressKey);
  }, [isModalOpen, handleClose]);

  // JSX
  return createPortal(
    <ModalOverlay isModalOpen={isModalOpen} handleClose={handleClose}>
      <div
        onClick={(evt) => evt.stopPropagation()}
        className={isModalOpen ? styles.modal : styles.hidden}
      >
        <button className={styles.modal_close_button} onClick={handleClose}>
          <img src={closeImage} />
        </button>
        {children}
      </div>
    </ModalOverlay>,
    document.getElementById("modal")
  );
}

Modal.propTypes = {
  children: PropTypes.element.isRequired,
  isModalOpen: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};
