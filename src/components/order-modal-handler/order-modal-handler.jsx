import Modal from "../modal/modal";
import { useModal } from "../../hooks/useModal";

import OrderDetails from "../order-details/order-details";
import { useSelector } from "../../utils/reduxCustomBoilerplate";

export default function OrderModalHandler() {
  const { closeModal } = useModal();

  const { isModalOpen } = useSelector((state) => state.ingredient);

  return (
    <Modal isModalOpen={isModalOpen} handleClose={closeModal}>
      <OrderDetails />
    </Modal>
  );
}
