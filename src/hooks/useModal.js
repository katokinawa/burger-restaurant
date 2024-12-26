import { useState, useCallback } from "react";

export const useModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedIngredient, setSelectedIngredient] = useState(null);

  const openModal = useCallback((item) => {
    setSelectedIngredient(item);
    setIsModalOpen(true);
  }, []);
  const closeModal = useCallback(() => {
    setSelectedIngredient(null);
    setIsModalOpen(false);
  }, []);

  return {
    isModalOpen,
    selectedIngredient,
    openModal,
    closeModal,
  };
};