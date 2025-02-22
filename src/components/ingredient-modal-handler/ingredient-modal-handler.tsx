import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import { useModal } from "../../hooks/useModal";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

export default function IngredientModalHandler() {
  const { closeModal } = useModal();
  // @ts-expect-error Пока игнорируем redux типизацию
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
