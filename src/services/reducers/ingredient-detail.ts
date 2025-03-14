import { IItem } from "../../utils/types";
import {
  SET_SELECTED_INGREDIENT,
  DELETE_SELECTED_INGREDIENT,
  CLEAR_INGREDIENT_DATA,
  TIngredientDetailActions,
  GET_ORDER_ERROR,
  GET_ORDER_SUCCESS,
  GET_ORDER_REQUEST,
} from "../actions/ingredient-detail";

type TIngredientDetailState = {
  data: IItem | object;
  isModalOpen: boolean;
  ingredientType: string;
  OrderRequest: boolean;
  OrderFailed: boolean;
};

const initialState: TIngredientDetailState = {
  data: {},
  isModalOpen: false,
  ingredientType: "",
  OrderRequest: false,
  OrderFailed: false,
};

export const ingredientDetail = (
  state = initialState,
  action: TIngredientDetailActions
) => {
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
        isModalOpen: false,
        ingredientType: null,
      };
    }
    case CLEAR_INGREDIENT_DATA: {
      return {
        ...state,
        data: {},
      };
    }
    case GET_ORDER_REQUEST: {
      return {
        ...state,
        OrderRequest: true,
      };
    }
    case GET_ORDER_SUCCESS: {
      return {
        ...state,
        data: action.payload,
      };
    }
    case GET_ORDER_ERROR: {
      return {
        ...state,
        OrderRequest: false,
        OrderFailed: true,
      };
    }
    default: {
      return state;
    }
  }
};
