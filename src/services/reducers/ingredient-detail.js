import {
  SET_SELECTED_INGREDIENT,
  DELETE_SELECTED_INGREDIENT,
  SET_MODAL_OPEN,
} from "../actions/ingredient-detail";

const initialState = {
  data: {},
  isModalOpen: false,
  ingredientType: '',
};

export const ingredientDetail = (state = initialState, action) => {
  switch (action.type) {
    case SET_SELECTED_INGREDIENT: {
      return {
        ...state,
        data: action.item,
        isModalOpen: true,
        ingredientType: action.ingredientType,
      };
    }
    case SET_MODAL_OPEN: {
      return {
        ...state,
        isModalOpen: true,
      };
    }
    case DELETE_SELECTED_INGREDIENT: {
      return {
        ...state,
        data: {},
        isModalOpen: false,
        ingredientType: null,
      };
    }
    default: {
      return state;
    }
  }
};
