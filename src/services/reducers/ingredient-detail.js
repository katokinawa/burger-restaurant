import {
  SET_SELECTED_INGREDIENT,
  DELETE_SELECTED_INGREDIENT,
} from "../actions/ingredient-detail";

const initialState = {
  data: {},
};

export const ingredientDetail = (state = initialState, action) => {
  switch (action.type) {
    case SET_SELECTED_INGREDIENT: {
      return {
        ...state,
        data: action.item,
      };
    }
    case DELETE_SELECTED_INGREDIENT: {
      return {
        ...state,
        data: [],
      };
    }
    default: {
      return state;
    }
  }
};
