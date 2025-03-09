import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import { useModal } from "../../hooks/useModal";

import { useLocation } from "react-router-dom";
import { useSelector } from "../../utils/reduxCustomBoilerplate";

export default function IngredientModalHandler() {
  const { closeModal } = useModal();

  const { isModalOpen } = useSelector((state) => state.ingredient);
  const location = useLocation();
  const isModal: { background: boolean } = location.state?.background;

  if (isModalOpen || isModal) {
    return (
      <Modal isModalOpen={isModalOpen} handleClose={closeModal}>
        <IngredientDetails />
      </Modal>
    );
  }
  return <IngredientDetails />;
}
