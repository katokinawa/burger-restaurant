// typescript ✅
import { ReactNode } from "react";
import styles from "./modal-overlay.module.css";
import PropTypes from "prop-types";

interface TModalOverlay {
  handleClose: () => void;
  children: ReactNode;
}
export default function ModalOverlay({ handleClose, children }: TModalOverlay) {
  return (
    <div onClick={handleClose} className={styles.modal_overlay}>
      {children}
    </div>
  );
}

ModalOverlay.propTypes = {
  children: PropTypes.element.isRequired,
  handleClose: PropTypes.func.isRequired,
};
