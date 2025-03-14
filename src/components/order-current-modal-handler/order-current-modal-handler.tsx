import Modal from "../modal/modal";
import { OrderCurrent } from "../order-current/order-current";
import { useModal } from "../../hooks/useModal";
import { useLocation } from "react-router-dom";
import { useSelector } from "../../utils/reduxCustomBoilerplate";
export default function OrderCurrentModalHandler() {
  const { closeModal } = useModal();
  const { isModalOpen } = useSelector((state) => state.ingredient);
  const location = useLocation();
  const isModal: { background: boolean } = location.state?.background;

  if (isModalOpen || isModal) {
    return (
      <Modal isModalOpen={isModalOpen} handleClose={closeModal}>
        <OrderCurrent />
      </Modal>
    );
  }
  return <OrderCurrent />;
}
