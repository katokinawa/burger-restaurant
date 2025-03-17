import { AppDispatch, IId, IItem, IItemsResponseOrders } from "../../utils/types";
import { request } from "../../utils/request";

export const SET_SELECTED_INGREDIENT: 'SET_SELECTED_INGREDIENT' =
  "SET_SELECTED_INGREDIENT";
export const DELETE_SELECTED_INGREDIENT: 'DELETE_SELECTED_INGREDIENT' =
  "DELETE_SELECTED_INGREDIENT";
export const CLEAR_INGREDIENT_DATA: 'CLEAR_INGREDIENT_DATA' =
  "CLEAR_INGREDIENT_DATA";
export const GET_ORDER_REQUEST: 'GET_ORDER_REQUEST' = "GET_ORDER_REQUEST";
export const GET_ORDER_SUCCESS: 'GET_ORDER_SUCCESS' = "GET_ORDER_SUCCESS";
export const GET_ORDER_ERROR: 'GET_ORDER_ERROR' = "GET_ORDER_ERROR";

export interface ISetSelectedIngredient {
  readonly type: typeof SET_SELECTED_INGREDIENT;
  readonly item: IItem| IItemsResponseOrders | IId;
  readonly ingredientType: string;
}
export interface IDeleteSelectedIngredient {
  readonly type: typeof DELETE_SELECTED_INGREDIENT;
}

export interface IClearIngredientData {
  readonly type: typeof CLEAR_INGREDIENT_DATA;
}

export interface IGetOrderRequest {
  readonly type: typeof GET_ORDER_REQUEST;
}
export interface IGetOrderSuccess {
  readonly type: typeof GET_ORDER_SUCCESS;
  readonly payload: IItemsResponseOrders;
}
export interface IGetOrderError {
  readonly type: typeof GET_ORDER_ERROR;
}

export type TIngredientDetailActions =
  | ISetSelectedIngredient
  | IDeleteSelectedIngredient
  | IClearIngredientData
  | IGetOrderRequest
  | IGetOrderSuccess
  | IGetOrderError

export const getOrder = (orderId: number) => (dispatch: AppDispatch) => {
  dispatch({
    type: GET_ORDER_REQUEST,
  });
  request(`orders/${orderId}`, {})
    .then((item) => {
      if (item.orders) {
        dispatch({
          type: GET_ORDER_SUCCESS,
          payload: item.orders[0]
        });
      } else {
        dispatch({
          type: GET_ORDER_ERROR,
        });
      }
    })
    .catch(() => {
      dispatch({
        type: GET_ORDER_ERROR,
      });
    });
};
