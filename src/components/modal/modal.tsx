// typescript ✅
import styles from "./modal.module.css";
import { createPortal } from "react-dom";
import { useEffect, ReactNode } from "react";
import ModalOverlay from "../modal-overlay/modal-overlay";
import closeImage from "../../images/close.svg";
import { AnimatePresence, motion } from "motion/react";

interface TModal {
  handleClose: () => void;
  children: ReactNode;
};

export default function Modal({ handleClose, children }: TModal) {
  useEffect(() => {
    function handlePressKey(evt: KeyboardEvent) {
      if (evt.key === "Escape") {
        handleClose();
      }
    }
    document.addEventListener("keydown", handlePressKey);
    return () => document.removeEventListener("keydown", handlePressKey);
  }, [handleClose]);

  return createPortal(
    <AnimatePresence>
      <motion.div
        key="modal"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <ModalOverlay handleClose={handleClose}>
          <div
            onClick={(evt) => evt.stopPropagation()}
            className={styles.modal}
          >
            <button className={styles.modal_close_button} onClick={handleClose}>
              <img src={closeImage} alt="Крестик" />
            </button>
            {children}
          </div>
        </ModalOverlay>
      </motion.div>
    </AnimatePresence>,
    document.getElementById("modal")!
  );
}