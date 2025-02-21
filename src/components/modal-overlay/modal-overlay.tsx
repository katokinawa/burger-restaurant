import { TModal } from "../../utils/types";
import styles from "./modal-overlay.module.css";
import PropTypes from "prop-types";

export default function ModalOverlay({ handleClose, children }: TModal) {
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
