import styles from "./modal.module.css";
import { createPortal } from "react-dom";
import { useEffect } from "react";
import ModalOverlay from "../modal-overlay/modal-overlay";
import closeImage from "../../images/close.svg";
import PropTypes from "prop-types";

export default function Modal({ children, handleClose }) {
  useEffect(() => {
    function handlePressKey(evt) {
      if (evt.key === "Escape") {
        handleClose();
      }
    }
    document.addEventListener("keydown", handlePressKey);
    return () => document.removeEventListener("keydown", handlePressKey);
  }, [handleClose]);

  return createPortal(
    <ModalOverlay handleClose={handleClose}>
      <div onClick={(evt) => evt.stopPropagation()} className={styles.modal}>
        <button className={styles.modal_close_button} onClick={handleClose}>
          <img src={closeImage} alt="Крестик" />
        </button>
        {children}
      </div>
    </ModalOverlay>,
    document.getElementById("modal")
  );
}

Modal.propTypes = {
  children: PropTypes.element.isRequired,
  handleClose: PropTypes.func.isRequired,
};
