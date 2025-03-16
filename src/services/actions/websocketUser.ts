export const WS_USER_ORDERS_CONNECTION_START: 'WS_USER_ORDERS_CONNECTION_START' =
  "WS_USER_ORDERS_CONNECTION_START";
export const WS_USER_ORDERS_SEND_ITEMS: 'WS_USER_ORDERS_SEND_ITEMS' =
  "WS_USER_ORDERS_SEND_ITEMS";
export const WS_USER_ORDERS_CONNECTION_SUCCESS: 'WS_USER_ORDERS_CONNECTION_SUCCESS' =
  "WS_USER_ORDERS_CONNECTION_SUCCESS";
export const WS_USER_ORDERS_CONNECTION_CLOSED: 'WS_USER_ORDERS_CONNECTION_CLOSED' =
  "WS_USER_ORDERS_CONNECTION_CLOSED";
export const WS_USER_ORDERS_CONNECTION_ERROR: 'WS_USER_ORDERS_CONNECTION_ERROR' =
  "WS_USER_ORDERS_CONNECTION_ERROR";
export const WS_USER_ORDERS_GET_ITEMS: 'WS_USER_ORDERS_GET_ITEMS' =
  "WS_USER_ORDERS_GET_ITEMS";
import { getCookie } from "../../utils/getCookieValue";
import {
  AppDispatch,
  IItemsResponse,
  RootState,
  TWebsocketActionsUser,
} from "../../utils/types";
import { Middleware, MiddlewareAPI } from "redux";

// Интерфейс для юзерского feed-а
interface IWsUserOrdersConnectionStart {
  readonly type: typeof WS_USER_ORDERS_CONNECTION_START;
}

interface IWsUserOrdersConnectionSuccess {
  readonly type: typeof WS_USER_ORDERS_CONNECTION_SUCCESS;
}

interface IWsUserOrdersConnectionError {
  readonly type: typeof WS_USER_ORDERS_CONNECTION_ERROR;
  readonly payload: Event;
}
interface IWsUserOrdersConnectionClosed {
  readonly type: typeof WS_USER_ORDERS_CONNECTION_CLOSED;
}
interface IWsUserOrdersGetItems {
  readonly type: typeof WS_USER_ORDERS_GET_ITEMS;
  readonly payload: IItemsResponse;
}

export type TWebsocketUser =
  | IWsUserOrdersConnectionStart
  | IWsUserOrdersConnectionSuccess
  | IWsUserOrdersConnectionClosed
  | IWsUserOrdersConnectionError
  | IWsUserOrdersGetItems;

export const socketMiddlewareUser = (
  wsUrl: string,
  wsActions: TWebsocketActionsUser
): Middleware => {
  return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
    let socket: WebSocket | null = null;

    return (next) => (action: TWebsocketUser) => {
      const { dispatch } = store;
      const { type } = action;
      const { wsInit, onOpen, onClose, onError, onMessage } = wsActions;
      const token = getCookie()?.accessToken?.replace("Bearer ", "") || "";
      if (type === wsInit && token) {
        socket = new WebSocket(`${wsUrl}?token=${token}`);
      }
      if (socket) {
        socket.onopen = (event) => {
          console.log("WebSocket соединение установлено!");
          dispatch({ type: onOpen, payload: event });
        };

        socket.onerror = (event) => {
          console.error("Ошибка WebSocket:", event);
          dispatch({ type: onError, payload: event });
        };

        socket.onmessage = (event) => {
          console.log("Получено сообщение");
          const { data } = event;
          const parsedData: IItemsResponse = JSON.parse(data);
          const { ...restParsedData } = parsedData;
          dispatch({
            type: onMessage,
            payload: { ...restParsedData },
          });
        };

        socket.onclose = (event) => {
          console.log("WebSocket соединение закрыто");
          dispatch({ type: onClose, payload: event });
          socket = null;
        };
      }

      next(action);
    };
  }) as Middleware;
};
