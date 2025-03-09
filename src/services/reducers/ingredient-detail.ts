import { IItem } from "../../utils/types";
import {
  SET_SELECTED_INGREDIENT,
  DELETE_SELECTED_INGREDIENT,
  TIngredientDetailActions,
} from "../actions/ingredient-detail";

type TIngredientDetailState = {
  data: IItem | object;
  isModalOpen: boolean;
  ingredientType: string;
}

const initialState: TIngredientDetailState = {
  data: {},
  isModalOpen: false,
  ingredientType: "",
};

export const ingredientDetail = (state = initialState, action: TIngredientDetailActions) => {
  switch (action.type) {
    case SET_SELECTED_INGREDIENT: {
      return {
        ...state,
        data: action.item,
        isModalOpen: true,
        ingredientType: action.ingredientType,
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
