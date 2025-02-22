import { Dispatch } from "redux";
import { request } from "../../utils/request";
export const GET_INGREDIENTS_REQUEST = "GET_INGREDIENTS_REQUEST";
export const GET_INGREDIENTS_ERROR = "GET_INGREDIENTS_ERROR";
export const GET_INGREDIENTS_SUCCESS = "GET_INGREDIENTS_SUCCESS";

export function getIngredients() {
  return function (dispatch: Dispatch) {
    dispatch({
      type: GET_INGREDIENTS_REQUEST,
    });
    request("ingredients", {})
      .then((item) => {
        dispatch({
          type: GET_INGREDIENTS_SUCCESS,
          items: item.data,
        });
      })
      .catch(() => {
        dispatch({
          type: GET_INGREDIENTS_ERROR,
        });
      });
  };
}
