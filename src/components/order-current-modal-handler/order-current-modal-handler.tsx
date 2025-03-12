import Modal from "../modal/modal";
import { useModal } from "../../hooks/useModal";

import { useLocation } from "react-router-dom";
import { useSelector } from "../../utils/reduxCustomBoilerplate";
import OrderCurrent from "../order-current/order-current";

export default function OrderCurrentModalHandler() {
  const { closeModal } = useModal();

  const { isModalOpen } = useSelector((state) => state.ingredient);
  const location = useLocation();
  const isModal: { background: boolean } = location.state?.background;
  console.log(isModal, isModalOpen)
  if (isModalOpen || isModal) {
    return (
      <Modal isModalOpen={isModalOpen} handleClose={closeModal}>
        <OrderCurrent />
      </Modal>
    );
  }
  return <OrderCurrent />;
}
