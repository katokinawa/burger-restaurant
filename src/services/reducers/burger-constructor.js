import {
  ADD_BURGER_INGREDIENT,
  DELETE_BURGER_INGREDIENT,
  INGREDIENT_DRAGGING,
  INGREDIENT_DROP,
} from "../actions/burger-constructor";

const initialState = {
  items: [],
  isDragging: false,
};

export const burgerConstructor = (state = initialState, action) => {
  switch (action.type) {
    case INGREDIENT_DRAGGING: {
      return {
        ...state,
        isDragging: true,
      };
    }
    case INGREDIENT_DROP: {
      return {
        ...state,
        isDragging: false,
      };
    }
    case ADD_BURGER_INGREDIENT: {
      return {
        ...state,
        items: [...state.items, action.item],
      };
    }
    case DELETE_BURGER_INGREDIENT: {
      return {
        ...state,
        items: [],
      };
    }
    default: {
      return state;
    }
  }
};
