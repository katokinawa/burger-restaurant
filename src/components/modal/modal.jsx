import { useRef } from "react";
import { createPortal } from "react-dom";
import styles from "./modal.module.css";

export default function Modal({ children, open }) {
  const dialog = useRef();

  return createPortal(
    <div ref={dialog} className={open ? styles.modal : styles.hidden}>
      {children}
    </div>,
    document.getElementById("modal")
  );
}

