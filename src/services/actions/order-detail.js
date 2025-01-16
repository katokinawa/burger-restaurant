import { API_URL_POST_ORDER } from "../../utils/constants";
export const POST_ORDER_REQUEST = "POST_ORDER_REQUEST";
export const POST_ORDER_ERROR = "POST_ORDER_ERROR";
export const POST_ORDER_SUCCESS = "POST_ORDER_SUCCESS";
export const ORDER_SET_INITIAL_STATE = "ORDER_SET_INITIAL_STATE";

export function postOrder(ingredients) {
  return function (dispatch) {
    dispatch({
      type: POST_ORDER_REQUEST,
    });
    fetch(API_URL_POST_ORDER, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(ingredients),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        dispatch({
          type: POST_ORDER_ERROR,
        });
      })
      .then((item) => {
        dispatch({
          type: POST_ORDER_SUCCESS,
          item,
        });
      })
      .catch(() => {
        dispatch({
          type: POST_ORDER_ERROR,
        });
      });
  };
}
