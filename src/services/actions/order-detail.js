import { request } from "../../utils/request";
export const POST_ORDER_REQUEST = "POST_ORDER_REQUEST";
export const POST_ORDER_ERROR = "POST_ORDER_ERROR";
export const POST_ORDER_SUCCESS = "POST_ORDER_SUCCESS";
export const ORDER_SET_INITIAL_STATE = "ORDER_SET_INITIAL_STATE";

export function postOrder(ingredients) {
  return function (dispatch) {
    dispatch({
      type: POST_ORDER_REQUEST,
    });
    request("orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(ingredients),
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
