import { API_URL_GET_INGREDIENTS } from "../../utils/constants";
export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST'
export const GET_INGREDIENTS_ERROR = 'GET_INGREDIENTS_ERROR'
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS'

export function getIngredients() {
  return function (dispatch) {
    dispatch({
      type: GET_INGREDIENTS_REQUEST,
    });
    fetch(API_URL_GET_INGREDIENTS)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        dispatch({
          type: GET_INGREDIENTS_ERROR,
        });
      })
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
