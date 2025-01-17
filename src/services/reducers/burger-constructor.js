import {
  ADD_BURGER_INGREDIENT,
  DELETE_BURGER_INGREDIENT,
  SWAP_BURGER_INGREDIENT,
  ADD_BURGER_BUN,
  RESET_BURGER_CONSTRUCTOR,
} from "../actions/burger-constructor";
import { v4 as uuidv4 } from "uuid";

const initialState = {
  items: [],
  bun: [],
};

export const burgerConstructor = (state = initialState, action) => {
  switch (action.type) {
    case ADD_BURGER_BUN: {
      return {
        ...state,
        bun: [action.item],
      };
    }
    case SWAP_BURGER_INGREDIENT: {
      return {
        ...state,
        items: action.item,
      };
    }
    case ADD_BURGER_INGREDIENT: {
      return {
        ...state,
        items: [...state.items, { ...action.item, uniqueId: uuidv4() }],
      };
    }
    case DELETE_BURGER_INGREDIENT: {
      return {
        ...state,
        items: action.item,
      };
    }
    case RESET_BURGER_CONSTRUCTOR: {
      return {
        ...state,
        items: [],
        bun: []
      }
    }
    default: {
      return state;
    }
  }
};
