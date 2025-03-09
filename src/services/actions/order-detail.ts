import { request } from "../../utils/request";
import { AppDispatch, AppThunk, IOrderDetailValues } from "../../utils/types";
export const POST_ORDER_REQUEST: 'POST_ORDER_REQUEST' = "POST_ORDER_REQUEST";
export const POST_ORDER_ERROR: 'POST_ORDER_ERROR' = "POST_ORDER_ERROR";
export const POST_ORDER_SUCCESS: 'POST_ORDER_SUCCESS' = "POST_ORDER_SUCCESS";
export const ORDER_SET_INITIAL_STATE: 'ORDER_SET_INITIAL_STATE' =
  "ORDER_SET_INITIAL_STATE";

interface IPostOrderRequest {
  readonly type: typeof POST_ORDER_REQUEST
}

interface IPostOrderError {
  readonly type: typeof POST_ORDER_ERROR
}

interface IPostOrderSuccess {
  readonly type: typeof POST_ORDER_SUCCESS;
  readonly item: IOrderDetailValues;
}

interface IOrderSetInitialValues {
  readonly type: typeof ORDER_SET_INITIAL_STATE
}

export type TOrderDetail =
  | IPostOrderRequest
  | IPostOrderError
  | IPostOrderSuccess
  | IOrderSetInitialValues;

export const postOrder =
  (ingredients: { ingredients: string[] }): AppThunk => (dispatch: AppDispatch) => {
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
        if (item.order !== undefined) {
          document.cookie = `orderNumber=${item.order.number};`;
        }
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
