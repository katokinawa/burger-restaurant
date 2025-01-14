import { useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { DELETE_SELECTED_INGREDIENT, SET_SELECTED_INGREDIENT } from "../services/actions/ingredient-detail";

export const useModal = () => {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = useCallback((item) => {
    dispatch({
      type: SET_SELECTED_INGREDIENT,
      item,
    });
    setIsModalOpen(true);
  }, [dispatch]);
  const closeModal = useCallback(() => {
    dispatch({
      type: DELETE_SELECTED_INGREDIENT,
    });
    setIsModalOpen(false);
  }, [dispatch]);

  return {
    isModalOpen,
    openModal,
    closeModal,
  };
};