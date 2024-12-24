import { createPortal } from "react-dom";
import styles from "./modal.module.css";
import ModalOverlay from "../modal-overlay/modal-overlay";
import closeImage from "../../images/close.svg";
import { useEffect } from "react";

export default function Modal({ children, isModalOpen, handleClose }) {
  useEffect(() => {
    document.addEventListener("keydown", handlePressKey);
    return () => document.removeEventListener("keydown", handlePressKey);
  }, [isModalOpen]);

  function handlePressKey(evt) {
    if (evt.key === "Escape") {
      handleClose();
    }
  }
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
