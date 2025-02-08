import Modal from "./modal/modal";
import IngredientDetails from "./ingredient-details/ingredient-details";
import { useModal } from "../hooks/useModal";
import { useSelector } from "react-redux";

export default function IngredientModalHandler() {
  const { closeModal } = useModal();
  const { isModalOpen } = useSelector((state) => state.ingredient);

  if (!isModalOpen) {
    return <IngredientDetails />;
  }
  return (
    <Modal isModalOpen={isModalOpen} handleClose={closeModal}>
      <IngredientDetails />
    </Modal>
  );
}
