import styles from "./modal-overlay.module.css";

export default function ModalOverlay({ children, isModalOpen, handleClose }) {
  return (
    <div onClick={handleClose} className={isModalOpen ? styles.modal_overlay : styles.hidden}>
      {children}
    </div>
  );
}
